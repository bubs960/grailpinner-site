#!/usr/bin/env node

import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import vm from 'node:vm'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || '6d21e3af4a7a44f9a1a0c0fba6518a49'
const RUN_STARTED = new Date()
const SHOULD_SUBMIT = process.argv.includes('--submit-indexnow')
const LOCAL_ONLY = process.argv.includes('--local-only')

const SITES = [
  {
    key: 'hub',
    name: 'GrailPulse',
    baseUrl: 'https://grailpulse.com',
    repoPath: ROOT,
    pitch: 'Collector price-guide hub across coins, die cast, figures, and games next.',
  },
  {
    key: 'coins',
    name: 'CoinSpinner',
    baseUrl: 'https://coins.grailpulse.com',
    repoPath: path.resolve(ROOT, '..', 'coinspinner-site'),
    pitch: 'U.S. coin value guides built around real sold comps and grade bands.',
  },
  {
    key: 'diecast',
    name: 'GrailPulse Die Cast',
    baseUrl: 'https://diecast.grailpulse.com',
    repoPath: path.resolve(ROOT, '..', 'diecast-site'),
    pitch: 'Hot Wheels, Matchbox, and premium die-cast casting value guides.',
  },
  {
    key: 'figures',
    name: 'FigurePinner',
    baseUrl: 'https://figurepinner.com',
    repoPath: path.resolve(ROOT, '..', 'figurepinner-site'),
    pitch: 'Action figure price guides and collection surfaces by fandom and line.',
  },
]

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function extractLocs(xml) {
  return Array.from(xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)).map(match => normalizeUrl(match[1].trim()))
}

function normalizeUrl(url) {
  const parsed = new URL(url)
  const path = parsed.pathname === '/' ? '' : parsed.pathname.replace(/\/+$/, '')
  return `${parsed.origin}${path}${parsed.search}`
}

async function loadText(urlOrPath) {
  if (/^https?:\/\//.test(urlOrPath)) {
    const response = await fetch(urlOrPath, {
      headers: {
        'user-agent': 'GrailPulseTrafficPulse/1.0 (+https://grailpulse.com)',
      },
    })
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`)
    return await response.text()
  }
  return await readFile(urlOrPath, 'utf8')
}

async function loadSitemap(site) {
  const localPath = path.join(site.repoPath, 'out', 'sitemap.xml')
  const sources = []
  if (existsSync(localPath)) sources.push({ type: 'local', locator: localPath })
  if (!LOCAL_ONLY) sources.push({ type: 'live', locator: `${site.baseUrl}/sitemap.xml` })

  const errors = []
  for (const source of sources) {
    try {
      const xml = await loadText(source.locator)
      const urls = extractLocs(xml).filter(url => url.startsWith(site.baseUrl))
      return { source: source.type, locator: source.locator, urls, errors }
    } catch (error) {
      errors.push(`${source.type}: ${error.message}`)
    }
  }
  const fallbackUrls = await fallbackUrlsForSite(site)
  if (fallbackUrls.length) {
    return { source: 'source-fallback', locator: site.repoPath, urls: fallbackUrls, errors }
  }
  return { source: 'missing', locator: null, urls: [], errors }
}

function slugPart(value) {
  return String(value ?? 'unknown')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'unknown'
}

async function fallbackUrlsForSite(site) {
  if (site.key === 'diecast') return diecastFallbackUrls(site)
  if (site.key === 'figures') return figureFallbackUrls(site)
  return []
}

async function diecastFallbackUrls(site) {
  const kbPath = path.join(site.repoPath, 'src', 'data', 'diecast-kb.json')
  if (!existsSync(kbPath)) return []
  const payload = JSON.parse(await readFile(kbPath, 'utf8'))
  const records = Array.isArray(payload.records) ? payload.records : []
  const priced = records.filter(record => record.condition_values && Object.values(record.condition_values).some(value => typeof value === 'number'))
  const series = [...new Set(priced.map(record => [record.brand, record.line, record.casting].map(slugPart).join('__')))].sort()
  return [
    `${site.baseUrl}`,
    `${site.baseUrl}/browse/`,
    `${site.baseUrl}/garage/`,
    `${site.baseUrl}/privacy/`,
    ...series.map(slug => `${site.baseUrl}/series/${slug}/`),
    ...priced.map(record => `${site.baseUrl}/coin/${record.diecast_id}/`),
  ]
}

// ── FigurePinner URL-form rules (2026-07-24) ─────────────────────────────────
// MUST MIRROR figurepinner-site/src/data/kbTypes.ts:158-178 (SLUG_TO_FANDOM /
// genreSlugForFandom), NECA_FANDOMS in src/lib/genreFigures.ts:21, and the
// GENRE_META key set in src/app/[genre]/page.tsx:20-108.
//
// WHY: every URL emitted for figurepinner.com must use the GENRE-SLUG form.
// Emitting the raw KB `fandom` field mints a duplicate namespace with no hub
// and no internal links — the 2026-07 index collapse (22K→6K), see
// kbTypes.ts:150-156 and Bridge/WEBAUDIT-TO-WEB-GOOGLE-ZERO-ROOTCAUSE-2026-07-12.md.
//
// These three tables are a REPLICATION of another repo's source of truth and
// will silently drift if that repo changes. assertFigurePinnerUrlForms() below
// fails the run loudly if the KB grows a fandom this file doesn't know about.
const FP_FANDOM_TO_GENRE_SLUG = {
  'tmnt': 'teenage-mutant-ninja-turtles',
  'gi-joe': 'gijoe',
  'marvel-comics': 'marvel',
  'dungeons-dragons': 'dungeons-and-dragons',
}
// NECA-rollup fandoms have no hub of their own; they live under /neca.
const FP_NECA_ROLLUP = new Set(['horror', 'aliens-predator', 'terminator', 'robocop'])
// Genre hubs that actually exist as routes (GENRE_META keys). A fandom that
// maps to nothing here has NO hub page — emitting /<fandom> for it is a 404.
const FP_GENRE_HUBS = new Set([
  'action-force', 'dc', 'dungeons-dragons', 'ghostbusters', 'gijoe',
  'indiana-jones', 'marvel', 'masters-of-the-universe', 'mythic-legions',
  'neca', 'power-rangers', 'spawn', 'star-wars',
  'teenage-mutant-ninja-turtles', 'thundercats', 'transformers', 'wrestling',
])

// Genre slug for figure and line URLs (identity for most fandoms).
function fpGenreSlug(fandom) {
  return FP_FANDOM_TO_GENRE_SLUG[fandom] ?? fandom
}

// Hub slug for top-level /<genre> URLs, or null when the fandom has no hub.
// generic-fantasy, pop-culture and scifi are real KB fandoms with no hub route;
// they must be dropped, not emitted. genreSlugForFandom() alone does NOT cover
// this — it is an alias map, not a route-existence check.
function fpHubSlug(fandom) {
  if (FP_NECA_ROLLUP.has(fandom)) return 'neca'
  const slug = fpGenreSlug(fandom)
  return FP_GENRE_HUBS.has(slug) ? slug : null
}

// Loud failure if the KB grows a fandom whose hub mapping is unknown here.
// Silent drift in these tables is exactly how the 7/12 defect class recurs.
function assertFigurePinnerUrlForms(fandoms) {
  const unmapped = fandoms.filter(f => fpHubSlug(f) === null)
  const known = new Set(['generic-fantasy', 'pop-culture', 'scifi'])
  const surprising = unmapped.filter(f => !known.has(f))
  if (surprising.length) {
    throw new Error(
      `[traffic-pulse] FigurePinner KB has fandom(s) with no known genre hub: ${surprising.join(', ')}. ` +
      `Update FP_GENRE_HUBS / FP_NECA_ROLLUP in this file against ` +
      `figurepinner-site/src/app/[genre]/page.tsx GENRE_META before running.`,
    )
  }
}

async function figureFallbackUrls(site) {
  const kbPath = path.join(site.repoPath, 'src', 'data', 'figures-reference-v2.slim.js')
  if (!existsSync(kbPath)) return []
  const source = await readFile(kbPath, 'utf8')
  const context = { module: { exports: {} }, exports: {} }
  vm.createContext(context)
  vm.runInContext(`${source}\nthis.FIGURES_V2 = FIGURES_V2;`, context, { timeout: 30000 })
  const figures = Array.isArray(context.FIGURES_V2)
    ? context.FIGURES_V2
    : Array.isArray(context.module.exports.FIGURES_V2)
      ? context.module.exports.FIGURES_V2
      : []
  const fandoms = [...new Set(figures.map(figure => figure.fandom).filter(Boolean))]
  assertFigurePinnerUrlForms(fandoms)

  const lineUrls = new Set()
  const prettyCounts = new Map()
  for (const figure of figures) {
    if (figure.fandom && figure.product_line) {
      lineUrls.add(`${site.baseUrl}/${fpGenreSlug(figure.fandom)}/${figure.product_line}`)
    }
    // NOTE: the uniqueness KEY keeps the RAW fandom on purpose — it must mirror
    // prettyFigureUrlKey() (kbTypes.ts:144-148). Only the emitted URL is slugged.
    const key = `${figure.fandom}/${figure.product_line}/${figure.character_canonical}`
    prettyCounts.set(key, (prettyCounts.get(key) ?? 0) + 1)
  }

  const figureUrls = figures.map(figure => {
    const key = `${figure.fandom}/${figure.product_line}/${figure.character_canonical}`
    if (prettyCounts.get(key) === 1) {
      return `${site.baseUrl}/${fpGenreSlug(figure.fandom)}/${figure.product_line}/${figure.character_canonical}`
    }
    return `${site.baseUrl}/figure/${figure.figure_id}`
  })

  // Hub URLs: slug-mapped and filtered to hubs that actually exist. Fandoms with
  // no hub route (generic-fantasy, pop-culture, scifi) are dropped, and the four
  // NECA-rollup fandoms collapse onto /neca — hence the dedupe.
  const hubUrls = [...new Set(fandoms.map(fpHubSlug).filter(Boolean))]
    .map(slug => `${site.baseUrl}/${slug}`)

  return [
    `${site.baseUrl}`,
    `${site.baseUrl}/search`,
    `${site.baseUrl}/about`,
    `${site.baseUrl}/privacy`,
    `${site.baseUrl}/terms`,
    ...hubUrls,
    ...lineUrls,
    ...figureUrls,
  ]
}

function pickPriorityUrls(site, urls) {
  const home = normalizeUrl(site.baseUrl)
  const important = urls.map(normalizeUrl).filter(url => {
    const parsed = new URL(url)
    const parts = parsed.pathname.split('/').filter(Boolean)
    if (parts.some(part => ['api', 'app', 'sign-in', 'login', 'account'].includes(part))) return false
    return (
      url === home ||
      parts.length <= 2 ||
      parts.includes('browse') ||
      parts.includes('verticals') ||
      parts.includes('methodology') ||
      parts.includes('trust') ||
      parts.includes('news')
    )
  })
  return [...new Set([home, ...important, ...urls.slice(0, 25)])].slice(0, 75)
}

function buildRss(results) {
  const items = results.flatMap(result => {
    const sampleUrls = pickPriorityUrls(result.site, result.urls).slice(0, 8)
    return sampleUrls.map(url => ({
      title: `${result.site.name}: ${new URL(url).pathname === '/' ? 'home' : new URL(url).pathname}`,
      url,
      description: result.site.pitch,
    }))
  })

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>GrailPulse Collector Market Pulse</title>
    <link>https://grailpulse.com</link>
    <description>Fresh collector price-guide surfaces and crawlable market pages across GrailPulse verticals.</description>
    <lastBuildDate>${RUN_STARTED.toUTCString()}</lastBuildDate>
${items.map(item => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.url)}</link>
      <guid>${escapeXml(item.url)}</guid>
      <pubDate>${RUN_STARTED.toUTCString()}</pubDate>
      <description>${escapeXml(item.description)}</description>
    </item>`).join('\n')}
  </channel>
</rss>
`
}

function buildMarkdown(results, indexNowUrls, submitResults) {
  const rows = results.map(result => {
    const status = result.urls.length ? 'OK' : 'CHECK'
    const issue = result.errors.length ? result.errors.join('; ') : ''
    return `| ${result.site.name} | ${status} | ${result.urls.length} | ${result.source} | ${issue || 'None'} |`
  }).join('\n')

  const next = [
    '- Deploy any repo with a new or changed sitemap/robots/IndexNow key file before submitting URLs.',
    '- Submit `/sitemap.xml` for each live host in Google Search Console and Bing Webmaster Tools.',
    '- Run `npm run traffic:pulse -- --submit-indexnow` after deploys or catalog refreshes.',
    '- Keep thin or zero-comp pages out of high-priority indexing until they show data source, comp count, confidence, methodology, and a correction path.',
  ].join('\n')

  const submissions = submitResults.length
    ? submitResults.map(item => `- ${item.host}: ${item.status}`).join('\n')
    : '- Not submitted in this run. Add `-- --submit-indexnow` after the key files are live.'

  return `# GrailPulse Traffic Pulse

Generated: ${RUN_STARTED.toISOString()}

| Site | Status | Sitemap URLs | Source | Notes |
| --- | --- | ---: | --- | --- |
${rows}

## IndexNow Queue

Queued URLs: ${indexNowUrls.length}

\`public/traffic/indexnow-urls.txt\` contains the current priority queue.

## Submission

${submissions}

## Next Operator Steps

${next}
`
}

async function submitIndexNow(results, indexNowUrls) {
  const byHost = new Map()
  for (const url of indexNowUrls) {
    const { origin } = new URL(url)
    if (!byHost.has(origin)) byHost.set(origin, [])
    byHost.get(origin).push(url)
  }

  const outcomes = []
  for (const [host, urls] of byHost.entries()) {
    const keyLocation = `${host}/${INDEXNOW_KEY}.txt`
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: new URL(host).hostname,
        key: INDEXNOW_KEY,
        keyLocation,
        urlList: urls.slice(0, 10000),
      }),
    })
    outcomes.push({ host, status: `${response.status} ${response.statusText}` })
  }
  return outcomes
}

async function main() {
  const results = []
  for (const site of SITES) {
    const loaded = await loadSitemap(site)
    results.push({ site, ...loaded })
  }

  const indexNowUrls = results.flatMap(result => pickPriorityUrls(result.site, result.urls))
  const uniqueIndexNowUrls = [...new Set(indexNowUrls)]

  const submitResults = SHOULD_SUBMIT
    ? await submitIndexNow(results, uniqueIndexNowUrls)
    : []

  const publicTrafficDir = path.join(ROOT, 'public', 'traffic')
  const publicFeedDir = path.join(ROOT, 'public', 'feeds')
  await mkdir(publicTrafficDir, { recursive: true })
  await mkdir(publicFeedDir, { recursive: true })

  await writeFile(
    path.join(publicTrafficDir, 'market-pulse.json'),
    JSON.stringify({
      generatedAt: RUN_STARTED.toISOString(),
      sites: results.map(result => ({
        key: result.site.key,
        name: result.site.name,
        baseUrl: result.site.baseUrl,
        source: result.source,
        sitemapUrlCount: result.urls.length,
        priorityUrls: pickPriorityUrls(result.site, result.urls),
        errors: result.errors,
      })),
      indexNow: {
        keyLocationPath: `/${INDEXNOW_KEY}.txt`,
        queuedUrlCount: uniqueIndexNowUrls.length,
        submitted: SHOULD_SUBMIT,
        submitResults,
      },
    }, null, 2) + '\n',
  )
  await writeFile(path.join(publicTrafficDir, 'indexnow-urls.txt'), uniqueIndexNowUrls.join('\n') + '\n')
  await writeFile(path.join(publicFeedDir, 'collector-market-pulse.xml'), buildRss(results))
  await writeFile(path.join(ROOT, 'docs', 'traffic-pulse-last-run.md'), buildMarkdown(results, uniqueIndexNowUrls, submitResults))

  console.log(`Traffic pulse complete: ${uniqueIndexNowUrls.length} priority URLs queued.`)
  for (const result of results) {
    console.log(`${result.site.name}: ${result.urls.length} sitemap URLs from ${result.source}`)
  }
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})

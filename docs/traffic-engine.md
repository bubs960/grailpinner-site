# GrailPulse Traffic Engine

The traffic engine is deliberately search-first. It does not auto-post to Reddit, forums, or community sites. It turns GrailPulse's own catalog updates into crawlable signals that can be submitted through normal search channels.

## Run It

```powershell
npm run traffic:pulse
```

The default run audits the hub plus live vertical sitemaps and writes:

- `public/feeds/collector-market-pulse.xml`
- `public/traffic/market-pulse.json`
- `public/traffic/indexnow-urls.txt`
- `docs/traffic-pulse-last-run.md`

After the `6d21e3af4a7a44f9a1a0c0fba6518a49.txt` key file is deployed on every live host, submit the priority queue:

```powershell
npm run traffic:pulse -- --submit-indexnow
```

## Operator Rules

- Search Console and Bing Webmaster Tools remain the source of truth for indexing issues.
- Deploy changed sitemap, robots, feed, and IndexNow key files before submission.
- Keep thin or zero-comp pages out of priority indexing until they show data source, comp count, confidence, methodology, and a correction path.
- Use the feed and JSON output for owned channels, newsletters, status widgets, and market-pulse pages.
- Auto-generate community posts only as drafts for human review. Direct auto-posting to Reddit-like communities is intentionally out of scope.

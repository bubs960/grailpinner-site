# PARKED -- grailpinner-site (grailpulse.com hub)

Ruling: `Bridge/GRAILPULSE-COMING-SOON-PARK-RULING-2026-10-29.md` (Steve 2026-10-29 07:13 ET, calls A/A/A 07:40 ET).
Spec: `Bridge/relay/STANDALONE-TO-MATCHER-PARK-VERTICAL-REPOS-PARKEDMD-TAG-2026-10-29.md`.
Un-park trigger (text, not a date): FigurePinner 50/day sustained AND a vertical with a named first 10 users.
Stamps: OBSERVED = seen in a command/file on 2026-10-29. UNVERIFIED = not seen.

## What it did
- Static site built to `out/` (Next 15 / React 19, OBSERVED package.json), served as Cloudflare Pages project `grailpulse-hub` (grailpulse.com). Direct-upload: a git push never deploys. OBSERVED wrangler.toml.
- Parked state: `park/` bundle (`_worker.js` serves only `/`, `/robots.txt`, `/sitemap.xml`; every other path and query string 302s to `/`; sitemap holds the single URL). `wrangler.toml` `pages_build_output_dir` = `park` at HEAD, `out` at the tag. OBSERVED `git diff --stat parked-2026-10-29 HEAD` = park/* + wrangler.toml only.
- Only data job: manual `npm run traffic:pulse` (`scripts/grailpulse-traffic-pulse.mjs`). Audits the 4 sitemaps (hub, coins, diecast, figurepinner), writes the feed/JSON/IndexNow queue below. `--submit-indexnow` is opt-in. Do not run it while parked (advice; behaviour against single-URL sitemaps UNVERIFIED).

## Scheduled task(s)
- NONE FOUND. OBSERVED: searched Windows task actions, `Bridge/scripts`, `~/.claude/scheduled-tasks`, cloud task list; nothing calls traffic:pulse. Refs exist only in package.json (hub, coinspinner-site, diecast-site) and docs.
- Not a feeder: `FP-HubDataRefresh` (Ready, weekly Sun 08:00) feeds figurepinner-site only (OBSERVED `Bridge/scripts/run-hub-data-refresh.ps1`, `$SiteDir` = figurepinner-site). Leave it alone.

## Data locations
- Repo: `C:\Users\bubs9\FigurePinner-Ecosystem\grailpinner-site` (remote github.com/bubs960/grailpinner-site).
- Generated, tracked: `public/feeds/collector-market-pulse.xml`, `public/traffic/market-pulse.json`, `public/traffic/indexnow-urls.txt`, `docs/traffic-pulse-last-run.md`. `public/6d21e3af4a7a44f9a1a0c0fba6518a49.txt` = IndexNow key file. `src/app/components/CollectorPulse.tsx` reads `/traffic/market-pulse.json`.
- Cloudflare D1/KV/R2: none bound (OBSERVED wrangler.toml). Nothing to unbind.
- Cloudflare project state (domain, last deploy id/date): UNVERIFIED (no wrangler/API call made).

## Last successful run
- Manual traffic-pulse: generated 2026-07-25T03:21:38Z (OBSERVED `docs/traffic-pulse-last-run.md`): GrailPulse OK 6, CoinSpinner OK 6131, Die Cast OK 143, FigurePinner 23045 (source fallback, live 403). Queue 231 URLs, not submitted.
- No scheduler involved. Last deploy of the pre-park app: UNVERIFIED (local `out/` is dated 07-23, the tag is 07-25).

## Un-park steps
1. `cd C:\Users\bubs9\FigurePinner-Ecosystem\grailpinner-site`; `git status --short` must be clean.
2. `git checkout parked-2026-10-29` (detached HEAD; this tag has no PARKED.md and no park/ bundle).
3. `npm ci` (node_modules absent when parked, OBSERVED), then `npm run build` -> `out/`.
4. `npx wrangler pages deploy out --project-name=grailpulse-hub --branch=main`
   NEVER `npm run deploy` while parked or when un-parking: at HEAD it deploys the `park/` bundle (web, audit P2 fix `1cc5b44`), and the tagged script is `npm run build` + a deploy with no `--branch` (web rule 2026-10-29 08:55 ET).
5. Re-enable scheduled tasks: none.
6. Probe grailpulse.com root and one deep URL (expect 200, no 302). UNVERIFIED until run.
7. `git switch main` re-applies the park commit; making the un-park permanent (revert or branch off the park commit) is a web/Steve decision.

## Tag
`parked-2026-10-29` (annotated, tagger bubs960, 2026-10-29 08:31:13 -0400) -> `03cee3e2c7200ef66439524a44fab44f38f520c3` "traffic-pulse: emit genre-slug URLs" (2026-07-25) = web's expected last app commit (OBSERVED `git rev-parse "parked-2026-10-29^{commit}"`). Web's park commits sit above it: `a5de156` coming-soon page; `1cc5b44` security headers in `park/_worker.js` + `npm run deploy` repointed to `park` (audit P1/P2). `1cc5b44` was HEAD when this file was committed (this file is one commit above it). Remote push of the tag: UNVERIFIED (branch is ahead of origin by 2 before this commit).

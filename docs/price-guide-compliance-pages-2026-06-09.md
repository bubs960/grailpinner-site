# Price Guide Compliance Pages - 2026-06-09

## Source Reports

- `C:\Users\bubs9\Downloads\Price Guide Research Report.md`
- `C:\Users\bubs9\Downloads\Gap Analysis by Vertical.md`

## What Was Added

The GrailPulse hub now has the platform-level trust pages needed by the research and vertical gap analysis:

- `/methodology/` - price guide methodology, condition normalization, confidence/freshness rules, and examples from FigurePinner, CoinSpinner, GrailGamer, and Die Cast.
- `/verticals/` - concrete examples from other verticals and what each teaches the Passport system.
- `/trust/` - source attribution, affiliate-link policy, eBay disclaimer, correction path, and thin-data strategy.
- `/terms/` - MVP terms surface including user-submitted factual data license language.
- `/privacy/` - MVP privacy surface for Passport, collection tracking, corrections, and public/private expectations.
- `/sitemap.xml` - static sitemap for the hub pages.
- `/robots.txt` - static robots route; Cloudflare appends managed bot/content-signal rules on the live domain.

## Layout Changes

- Homepage now includes an "Examples from the verticals" section with four cards:
  - FigurePinner: mature pattern
  - CoinSpinner: trust retrofit
  - Die Cast: catalog scale
  - GrailGamer: day-one checklist
- Header links now expose:
  - Examples
  - Methodology
  - Trust
- Footer now links to:
  - Methodology
  - Vertical examples
  - Trust
  - Terms
  - Privacy
- Footer includes the platform disclaimer:
  - GrailPulse is not affiliated with or endorsed by eBay Inc.

## Verification

- `npm run build` passed.
- Static export now uses `trailingSlash: true`, producing folder routes like `/methodology/index.html`.
- Local static preview verified:
  - `/`
  - `/methodology/`
  - `/verticals/`
  - `/trust/`
  - `/terms/`
  - `/privacy/`
  - `/sitemap.xml`
  - `/robots.txt`
- Passport interaction still works after the page additions.
- Deployed to Cloudflare Pages project `grailpulse-hub`.
- Live routes verified on `https://grailpulse.com`.

## Notes

- `next.config.ts` now sets `outputFileTracingRoot: process.cwd()` and `trailingSlash: true`.
- Cloudflare currently serves managed robots content before the app robots rules; the sitemap line is still present.
- The legal/privacy text is MVP operational copy and should be reviewed by counsel before paid accounts, marketplace features, or large-scale user data collection.

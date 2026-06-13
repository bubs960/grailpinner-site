# GrailPulse Passport Homepage Progress - 2026-06-09

## Summary

Replaced the old GrailPulse vault-picker homepage with a Passport Control MVP. The goal is to make the main site explain GrailPulse quickly while giving collectors a more fun entry point into Coins, Die Cast, and Figures.

## What Changed

- Updated `src/app/page.tsx` from "Choose Your Vault" to "GrailPulse Passport Control".
- Added a Passport preview panel with starter stats, missions, and engagement signals.
- Corrected the main-brand metaphor so GrailPulse leads with the Passport, not Die Cast garage-door language.
- Added a more explicit Passport cover and lane-stamp visual for Coin Vault, Die Cast, and Figure Shelf.
- Added `src/app/passport-setup.tsx` as the interactive Passport setup module.
- Added lane toggles, live stamp progress, a mock claim state, and a first-lane handoff link.
- Added a three-step visitor journey:
  - Pick your lanes
  - Stamp your passport
  - Open your first mission
- Added live lane cards for:
  - Coins: `https://coins.grailpulse.com`
  - Die Cast: `https://diecast.grailpulse.com`
  - Figures: `https://figurepinner.com`
- Updated `package.json` deploy flow from OpenNext/Workers to Cloudflare Pages static deploy:
  - `npm run build`
  - `npx wrangler pages deploy out --project-name=grailpulse-hub`

## Verification

- `npm run build` passed.
- Static export preview from `out` passed local browser checks.
- Desktop and mobile layout checks showed no horizontal overflow and no text overflow.
- Interactive Passport setup verified locally:
  - Lane toggles update stamp progress.
  - `Claim Passport` changes state to `Passport claimed`.
  - Claimed state reveals a first-lane continue link.
- Deployed successfully to Cloudflare Pages project `grailpulse-hub`.
- Verified live:
  - Preview: `https://e7ca48dc.grailpulse-hub.pages.dev`
  - Custom domain: `https://grailpulse.com`

## Known Notes

- Next.js still warns about multiple lockfiles and workspace root inference:
  - `C:\Users\bubs9\package-lock.json`
  - `C:\Users\bubs9\grailpinner-site\package-lock.json`
- This warning does not block build or deploy.
- The old OpenNext deploy path failed on Windows because this repo is configured as a static export. Cloudflare Pages static deploy is the correct path for this app.

## Next Ideas

- Add real Passport signup/auth handoff once the account model is ready.
- Turn "Start Passport" into an interactive lane picker.
- Add a shareable Passport card preview.
- Add live "what's hot" signals once vertical data pipelines are stable.

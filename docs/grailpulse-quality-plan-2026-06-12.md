# GrailPulse Hub — Quality Upgrade Plan (2026-06-12)

**Author:** WEB chat · **Repo:** `C:\Users\bubs9\grailpinner-site` (CF Pages static, project `grailpulse-hub`)
**Bar:** "Looks like a $10k agency build." Match the FigurePinner redesign quality — adapted to a static umbrella hub (no catalog/search/auth).
**Method:** 9-agent parallel review (home, verticals, credibility, legal/utility, design-system, SEO/infra, spec-docs, FP-reference distill, synthesis), cross-checked against firsthand reads.

---

## Verdict

The hub is competently styled (dark-glass aesthetic) but **shipped as the wrong product and is missing the credibility/consistency/polish that reads as "expensive."** Three structural failures, all fixable:

1. **It sells a product that doesn't exist.** The homepage is a "GrailPulse Passport" signup — collector identity `GP-000184`, "Founding collector", "3 active lanes / 12 starter missions / 0 sign-in friction", "Welcome back…", a mock "Claim Passport" flow. Clerk/auth was *removed* (commit `d4ab600`). At a $10k bar, fabricated data is **disqualifying** — the moment a visitor senses it's fake, the whole site reads as a template.
2. **It doesn't route honestly or consistently.** `/verticals` — the page whose literal job is routing — has **zero outbound links** and reads as an internal strategy memo ("Keep / Close gaps / Scale carefully"). The vertical roster is hand-authored in **three places that have already drifted** (Coins/Die Cast/Figures here, FigurePinner/CoinSpinner/Die Cast/GrailGamer there).
3. **It wears different chrome on every page.** Homepage has a rich sticky header + footer (inline); every sub-page (`/methodology`, `/trust`, `/terms`, `/privacy`, `/verticals`) is **headerless** (just a "Back to Passport" pill); the 404 is off-system inline-hex in a different font. A $10k site is seamless page-to-page.

Plus a layer of "cheap tells": no OG/social image at all, no favicon, no JSON-LD, dead OpenNext/ISR/Clerk config contradicting the static build, AdSense render-blocking in `<head>`, and ~670 lines of inline CSS per page with a token system that's declared but never used.

### Liveness facts (my curl check — overrides agent guesses)
| Subdomain | Status |
|---|---|
| coins.grailpulse.com | **200 — live** |
| diecast.grailpulse.com | **200 — live** |
| figures (figurepinner.com) | **200 — live** |
| games.grailpulse.com | **000 — down / not deployed** |

So: no dead links on the homepage today. Die Cast *is* live (just not in the stated roster). Games is the only one that can't be linked yet.

---

## Workstreams

| ID | Title | Priority | Effort |
|---|---|---|---|
| WS1 | Single source of truth for verticals + kill all fabricated/dishonest data | **P0** | M |
| WS2 | Re-found homepage + `/verticals` as an umbrella price-guide hub | **P0** | L |
| WS3 | Extract one unified SiteHeader + Footer; mount globally; fix 404 | **P0** | M |
| WS4 | Delete dead OpenNext / ISR / Clerk / Tailwind config debt | **P0** | S |
| WS5 | Unify design system: tokens, typography, kill duplicated inline CSS | P1 | L |
| WS6 | SEO + perf scaffolding: JSON-LD, OG image, favicon, sitemap shape, AdSense defer | P1 | M |
| WS7 | Tighten legal copy to static-hub reality + add dates | P2 | M |

### WS1 — Single source of truth + honesty
- New `src/app/verticals-data.ts`: typed roster `{key, name, room, href, status:'live'|'soon', blurb}`. Imported by homepage, `/verticals`, `/methodology` — the three drifting literals deleted.
- Render `soon` lanes non-clickable with an honest "Coming Soon" badge (mirror commit `48076a6`).
- Strip every fabricated datum: `GP-000184`, the 3/12/0/1 stat tiles, "Founding collector", "Welcome back", decorative "Signals" chips. Replace with real build-computed facts or remove.
- Remove `useState(['diecast'])` default-on selection so no CTA routes to an unintended subdomain.
- **FP pattern:** `src/data/kb-stats.ts` (computed, never-overstate facts).

### WS2 — Re-found as an umbrella hub (depends on Passport decision)
- Hero → editorial eyebrow + confident headline positioning GrailPulse as the cross-collectible price-guide authority; one honest primary CTA.
- Lane grid = primary routing surface, fed by `verticals-data.ts`.
- `/verticals` rebuilt as a real linked directory (reuse the `LaneCard` anchor pattern).
- Rewrite methodology/trust copy from prescriptive **"should"** → declarative **"we do"**, scoped to the live verticals only; remove leaked internal strategy.
- Metadata reframed from "Passport Control" to a directory-hub title.
- Collector-voice gate (`action-figure-expert`) before ship.

### WS3 — Unified chrome
- `src/app/components/SiteHeader.tsx` (port FP: 56px sticky, blur, brand mark + wordmark, `crumbs[]` variant) + `Footer.tsx` (link row + eBay disclaimer + dynamic year), mounted in `layout.tsx`.
- Rebuild `not-found.tsx` on the shared shell; fix off-brand voice.
- **FP pattern:** `components/SiteHeader.tsx` + `Footer.tsx` (global mount).

### WS4 — Config hygiene (quick, zero-risk)
- Delete `open-next.config.ts` + `.open-next/`; drop `@opennextjs/cloudflare` + `@clerk/nextjs` deps.
- Prune `wrangler.toml`: remove ISR queue producer, `NEXT_INC_CACHE_KV` binding, `NEXT_PUBLIC_CLERK_*` vars.
- Decide Tailwind in/out (installed, never wired → default: remove).
- Set `wrangler.toml name = 'grailpulse-hub'` to match deploy flag; fix `globals.css` "GrailPinner" comment.

### WS5 — Design system unification
- **Early/S:** typography decision (adopt FP Bebas+Inter, or keep Outfit as a deliberate token); self-host via `next/font`; wire the declared `--gp-font-display`.
- **Early/S:** reconcile to ONE accent palette (declared gold/blue vs rendered rose).
- **Later/L:** move the ~670-line inline `<style>` blocks into token-driven `globals.css`; de-dup the 3× eyebrow style; fix heading levels for outline/a11y.
- Contrast-check muted greys for WCAG AA (commit `9e453a7` shows a prior failure).

### WS6 — SEO + perf
- Organization JSON-LD (sameAs → live verticals) in layout; BreadcrumbList on info pages; ItemList on `/verticals`.
- **Create a real OG image (~1200×630) + favicon** — currently none exists (a cheap-site tell). Or port FP's code-gen `opengraph-image.tsx`.
- `sitemap.ts` → per-route changeFrequency/priority + build-time `lastModified` (kill the frozen `2026-06-09`).
- Move AdSense to `next/script strategy="lazyOnload"` in `<body>`.

### WS7 — Legal copy
- Rewrite Privacy/Terms to describe only what the static hub does today; scope the "perpetual license" clause to real submission surfaces; drop "should be reviewed by counsel" from the public surface; add a single-source "Last updated" date.

---

## Sequencing

- **Phase 0 (ship immediately):** WS4 full — config hygiene. Independent, near-zero-risk, removes traps. Verify `npm run build` still emits the static export.
- **Phase 1 (foundation):** WS1 (data source + strip fake data) + WS5 early subtasks (type/palette) + WS3 (shared chrome, 404). These land together — WS3 depends on WS1's roster and WS5's tokens.
- **Phase 2 (re-founding):** WS2 — hero rebuild, real `/verticals` directory, declarative copy, metadata. Biggest lift; only sensible once data + chrome + tokens exist.
- **Phase 3 (authority + polish):** WS6 (JSON-LD, OG image, sitemap, AdSense) + WS5 later subtask (inline-CSS consolidation), in parallel.
- **Phase 4 (cleanup):** WS7 legal copy + dates.

## Quick wins (cheap, high-impact)
- Delete `open-next.config.ts` + drop OpenNext/Clerk deps (one commit).
- Strip `GP-000184` literals + `useState(['diecast'])` default-on (kills the worst fake-data tell in minutes).
- Set `wrangler.toml name='grailpulse-hub'` (deploy footgun).
- AdSense → `lazyOnload`.
- `sitemap.ts` build-time date + priorities.

## Open questions (gate the build)
1. **Passport concept** — still in scope? (retire / "coming soon" teaser / real near-term product). Gates WS2 size.
2. **Die Cast** — live at 200 but not in stated roster: feature as live / demote to "soon" / remove.
3. **Games timing** — render as "Coming Soon" lane now, or stay example-only until closer to launch?
4. **Typography/brand** — sibling of FigurePinner (Bebas+Inter, vitrine) or its own premium identity?
5. **Robots** — does Cloudflare's managed robots override the app `robots.ts` in prod? (spec doc records this unresolved.)
6. **Legal** — is the "perpetual license" clause intentional/counsel-reviewed or placeholder?

## Repo guardrails
- `page.tsx` is large — edit via python3 rewrite, not the Edit tool (repo HARD RULE 2). Verify parse after each rewrite.
- Author + commit here; Steve runs `cd "C:\Users\bubs9\grailpinner-site"` then `npm run deploy` (static CF Pages, `grailpulse-hub`).

import type { Metadata } from 'next';
import PassportSetup from './passport-setup';

export const metadata: Metadata = {
  title: 'GrailPulse — Passport Control',
  description: 'Start your collector passport and build your vault, garage, and shelf across every fandom.',
  alternates: {
    canonical: '/',
  },
};

type Lane = {
  title: string;
  short: string;
  detail: string;
  href: string;
  accent: string;
  badge: string;
  status: 'Live' | 'Coming Soon';
};

const lanes: Lane[] = [
  {
    title: 'Coins',
    short: 'Vault',
    detail: 'Track your key dates, varieties, condition, and recent comps in a single clean vault.',
    href: 'https://coins.grailpulse.com',
    accent: '#f87171',
    badge: 'Live',
    status: 'Live',
  },
  {
    title: 'Die Cast',
    short: 'Garage',
    detail: 'Park Hot Wheels, Matchbox, premium 1:64, and chase lines without losing the fun.',
    href: 'https://diecast.grailpulse.com',
    accent: '#fb7185',
    badge: 'Live',
    status: 'Live',
  },
  {
    title: 'Figures',
    short: 'Shelf',
    detail: 'Pin your figures, build wishlists, and keep your display moving with the market.',
    href: 'https://figurepinner.com',
    accent: '#fda4af',
    badge: 'Live',
    status: 'Live',
  },
];

const missions = [
  {
    title: 'Pick your lanes',
    body: 'Choose the fandoms you actually collect so the site speaks your language from the start.',
  },
  {
    title: 'Stamp your passport',
    body: 'Create a collector identity and start earning progress across your vault, garage, and shelf.',
  },
  {
    title: 'Open your first mission',
    body: 'Add one item, watch one comp, or complete one family to get the first dopamine hit.',
  },
];

const signals = [
  'Fresh comps',
  'Hot families',
  'Watchlist alerts',
  'Collection streaks',
];

const verticalExamples = [
  {
    title: 'FigurePinner',
    label: 'Mature pattern',
    body: 'Collection tracking, scan flow, confidence labels, deal tools, and condition pricing prove the full collector loop.',
  },
  {
    title: 'CoinSpinner',
    label: 'Trust retrofit',
    body: 'Grade pricing is strong; methodology, freshness, source attribution, sitemap, and confidence tiers are the next layer.',
  },
  {
    title: 'Die Cast',
    label: 'Catalog scale',
    body: 'Family pages keep huge variant catalogs usable while exact listings carry photos, condition, chase status, and comps.',
  },
  {
    title: 'GrailGamer',
    label: 'Day-one checklist',
    body: 'Games should launch with loose/CIB/sealed pricing, variant handling, noindex for thin pages, and AggregateOffer schema.',
  },
];

function LaneCard({ title, short, detail, href, accent, badge, status }: Lane) {
  return (
    <a className="lane-card" href={href} target="_blank" rel="noopener noreferrer" style={{ ['--lane-accent' as never]: accent }}>
      <div className="lane-card__top">
        <div>
          <p className="lane-card__eyebrow">{short}</p>
          <h2>{title}</h2>
        </div>
        <span className="lane-card__badge">{badge}</span>
      </div>

      <p className="lane-card__body">{detail}</p>

      <div className="lane-card__footer">
        <span className="lane-card__status">{status}</span>
        <span className="lane-card__cta">Open lane →</span>
      </div>
    </a>
  );
}

export default function Home() {
  return (
    <>
      <style>{`
        :root {
          color-scheme: dark;
        }

        * { box-sizing: border-box; }

        html, body {
          min-height: 100%;
          background:
            radial-gradient(circle at 20% 0%, rgba(248, 113, 113, 0.12), transparent 28%),
            radial-gradient(circle at 80% 18%, rgba(255, 255, 255, 0.08), transparent 24%),
            linear-gradient(180deg, #020305 0%, #05070b 55%, #020305 100%);
        }

        body {
          margin: 0;
          color: #f8fafc;
          font-family: var(--font-outfit, system-ui, sans-serif);
        }

        a { color: inherit; text-decoration: none; }

        .page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .shell {
          width: min(1180px, calc(100% - 32px));
          margin: 0 auto;
        }

        .topbar {
          position: sticky;
          top: 0;
          z-index: 20;
          backdrop-filter: blur(14px);
          background: rgba(2, 3, 5, 0.72);
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
        }

        .topbar__inner {
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .brand {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }

        .brand__mark {
          width: 40px;
          height: 40px;
          border-radius: 11px;
          background:
            linear-gradient(135deg, rgba(255,255,255,0.16), rgba(255,255,255,0.02)),
            linear-gradient(180deg, rgba(248,113,113,0.9), rgba(180,18,35,0.88));
          box-shadow: 0 0 0 1px rgba(255,255,255,0.08), 0 12px 30px rgba(248,113,113,0.18);
          position: relative;
        }

        .brand__mark::after {
          content: '';
          position: absolute;
          inset: 8px 10px 8px 10px;
          border: 1px solid rgba(255,255,255,0.55);
          border-left-width: 3px;
          border-right-width: 2px;
          border-radius: 8px;
          opacity: 0.75;
        }

        .brand__name {
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .brand__sub {
          margin-top: 2px;
          font-size: 12px;
          color: rgba(226, 232, 240, 0.64);
        }

        .topbar__actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .pill, .button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.12);
          transition: transform 160ms ease, border-color 160ms ease, background 160ms ease;
          white-space: nowrap;
        }

        .pill {
          padding: 10px 14px;
          background: rgba(255,255,255,0.03);
          color: rgba(226,232,240,0.84);
          font-size: 13px;
        }

        .button {
          padding: 12px 16px;
          background: linear-gradient(180deg, rgba(255,255,255,0.09), rgba(255,255,255,0.03));
          color: #f8fafc;
          font-size: 14px;
          font-weight: 600;
          box-shadow: 0 8px 24px rgba(0,0,0,0.24);
        }

        .button:hover, .pill:hover, .lane-card:hover {
          transform: translateY(-2px);
          border-color: rgba(255,255,255,0.2);
        }

        .hero {
          padding: 56px 0 34px;
        }

        .hero__grid {
          display: grid;
          grid-template-columns: 1.12fr 0.88fr;
          gap: 24px;
          align-items: stretch;
        }

        .hero__copy {
          padding: 18px 0 0;
        }

        .kicker {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 999px;
          background: rgba(255,255,255,0.03);
          color: rgba(226,232,240,0.78);
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .kicker__dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #fb7185;
          box-shadow: 0 0 14px rgba(251, 113, 133, 0.6);
        }

        .hero h1 {
          margin: 20px 0 16px;
          font-size: clamp(44px, 6vw, 84px);
          line-height: 0.95;
          letter-spacing: -0.05em;
          max-width: 11ch;
        }

        .hero h1 span {
          color: transparent;
          background: linear-gradient(90deg, #f8fafc 0%, #fb7185 50%, #ffffff 100%);
          -webkit-background-clip: text;
          background-clip: text;
        }

        .hero__lede {
          max-width: 58ch;
          font-size: 18px;
          line-height: 1.7;
          color: rgba(226, 232, 240, 0.74);
        }

        .hero__cta {
          margin-top: 28px;
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          align-items: center;
        }

        .button--primary {
          background: linear-gradient(180deg, rgba(251,113,133,0.96), rgba(180,18,35,0.92));
          border-color: rgba(255,255,255,0.15);
          box-shadow: 0 16px 34px rgba(251, 113, 133, 0.22);
        }

        .button--ghost {
          background: rgba(255,255,255,0.03);
        }

        .passport {
          position: relative;
          overflow: hidden;
          border-radius: 28px;
          border: 1px solid rgba(255,255,255,0.1);
          background:
            linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02)),
            linear-gradient(180deg, rgba(5,8,12,0.88), rgba(5,8,12,0.96));
          box-shadow: 0 28px 80px rgba(0,0,0,0.38);
          min-height: 520px;
          padding: 24px;
        }

        .passport::before {
          content: '';
          position: absolute;
          inset: -1px;
          background:
            radial-gradient(circle at 50% 0%, rgba(251,113,133,0.18), transparent 28%),
            radial-gradient(circle at 90% 18%, rgba(255,255,255,0.14), transparent 18%),
            linear-gradient(180deg, rgba(255,255,255,0.08), transparent 38%);
          pointer-events: none;
        }

        .passport__frame {
          position: relative;
          z-index: 1;
          display: grid;
          gap: 18px;
        }

        .passport__header {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          align-items: flex-start;
        }

        .passport__cover {
          position: relative;
          overflow: hidden;
          min-height: 164px;
          border-radius: 22px;
          border: 1px solid rgba(255,255,255,0.12);
          background:
            linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.02)),
            linear-gradient(160deg, rgba(132,18,33,0.92), rgba(34,6,12,0.98) 58%, rgba(8,10,14,0.98));
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.04), 0 18px 44px rgba(0,0,0,0.3);
          padding: 22px;
        }

        .passport__cover::before {
          content: '';
          position: absolute;
          inset: 14px;
          border: 1px solid rgba(255,255,255,0.16);
          border-radius: 18px;
          pointer-events: none;
        }

        .passport__cover-title {
          position: relative;
          z-index: 1;
          margin: 34px 0 0;
          font-size: 34px;
          line-height: 0.95;
          font-weight: 800;
          letter-spacing: 0;
          text-transform: uppercase;
        }

        .passport__cover-sub {
          position: relative;
          z-index: 1;
          margin-top: 10px;
          color: rgba(248,250,252,0.72);
          font-size: 13px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .passport__seal {
          position: absolute;
          right: 22px;
          top: 22px;
          width: 74px;
          height: 74px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.34);
          background:
            radial-gradient(circle, rgba(255,255,255,0.24), rgba(255,255,255,0.05) 58%, transparent 60%),
            conic-gradient(from 0deg, rgba(255,255,255,0.08), rgba(255,255,255,0.28), rgba(255,255,255,0.08));
          box-shadow: 0 0 28px rgba(251,113,133,0.18);
        }

        .passport__seal::after {
          content: 'GP';
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          font-size: 19px;
          font-weight: 800;
          color: rgba(255,255,255,0.88);
        }

        .stamp-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
        }

        .stamp {
          min-height: 78px;
          border-radius: 14px;
          border: 1px dashed rgba(255,255,255,0.24);
          background: rgba(255,255,255,0.035);
          display: grid;
          align-content: center;
          gap: 5px;
          padding: 12px;
        }

        .stamp__code {
          color: rgba(248,250,252,0.54);
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .stamp__label {
          color: rgba(248,250,252,0.9);
          font-size: 14px;
          font-weight: 700;
        }

        .passport__title {
          font-size: 14px;
          color: rgba(226,232,240,0.68);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .passport__id {
          margin-top: 8px;
          font-size: 30px;
          font-weight: 800;
          letter-spacing: -0.04em;
        }

        .passport__chip {
          padding: 9px 12px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.04);
          color: rgba(248,250,252,0.82);
          font-size: 12px;
          white-space: nowrap;
        }

        .passport__panel {
          border-radius: 24px;
          padding: 18px;
          border: 1px solid rgba(255,255,255,0.08);
          background:
            linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015));
        }

        .passport__stats {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }

        .stat {
          border-radius: 18px;
          padding: 16px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
        }

        .stat__value {
          font-size: 28px;
          font-weight: 800;
          letter-spacing: -0.03em;
        }

        .stat__label {
          margin-top: 6px;
          font-size: 12px;
          color: rgba(226,232,240,0.68);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .lane-grid {
          padding: 24px 0 8px;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .lane-card {
          position: relative;
          overflow: hidden;
          border-radius: 24px;
          border: 1px solid rgba(255,255,255,0.1);
          background:
            linear-gradient(180deg, rgba(255,255,255,0.055), rgba(255,255,255,0.02)),
            linear-gradient(180deg, rgba(9,12,17,0.95), rgba(7,10,14,0.92));
          padding: 20px;
          min-height: 210px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 16px 50px rgba(0,0,0,0.22);
          transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
        }

        .lane-card::before {
          content: '';
          position: absolute;
          inset: auto 0 0 0;
          height: 120px;
          background: radial-gradient(circle at center, color-mix(in srgb, var(--lane-accent) 30%, transparent), transparent 70%);
          opacity: 0.38;
          pointer-events: none;
          filter: blur(14px);
        }

        .lane-card__top, .lane-card__footer {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .lane-card__eyebrow {
          margin: 0 0 8px;
          font-size: 12px;
          color: color-mix(in srgb, var(--lane-accent) 72%, white);
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .lane-card h2 {
          margin: 0;
          font-size: 28px;
          letter-spacing: -0.04em;
        }

        .lane-card__badge {
          padding: 8px 10px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.04);
          color: rgba(248,250,252,0.82);
          font-size: 12px;
          white-space: nowrap;
        }

        .lane-card__body {
          position: relative;
          z-index: 1;
          margin: 14px 0 0;
          color: rgba(226,232,240,0.72);
          line-height: 1.65;
          font-size: 15px;
          max-width: 28ch;
        }

        .lane-card__footer {
          margin-top: 20px;
        }

        .lane-card__status {
          font-size: 12px;
          color: rgba(226,232,240,0.64);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .lane-card__cta {
          font-size: 13px;
          font-weight: 700;
          color: #fff;
        }

        .guide {
          padding: 20px 0 48px;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }

        .guide__card {
          border-radius: 22px;
          padding: 18px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
        }

        .guide__card p {
          margin: 0;
          color: rgba(226,232,240,0.74);
          line-height: 1.6;
        }

        .guide__card h3 {
          margin: 0 0 8px;
          font-size: 16px;
          letter-spacing: -0.02em;
        }

        .signals {
          margin-top: 12px;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .signals span {
          padding: 9px 12px;
          border-radius: 999px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(248,250,252,0.78);
          font-size: 13px;
        }

        .footer {
          margin-top: auto;
          border-top: 1px solid rgba(255,255,255,0.07);
          padding: 20px 0 28px;
          color: rgba(226,232,240,0.58);
          font-size: 13px;
        }

        .vertical-proof {
          padding: 6px 0 52px;
        }

        .vertical-proof__header {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 18px;
          flex-wrap: wrap;
          margin-bottom: 18px;
        }

        .vertical-proof__header h2 {
          margin: 10px 0 0;
          font-size: clamp(28px, 3vw, 42px);
          line-height: 1.05;
          letter-spacing: 0;
        }

        .vertical-proof__header p {
          max-width: 48ch;
          margin: 0;
          color: rgba(226,232,240,0.68);
          line-height: 1.65;
        }

        .vertical-proof__grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
        }

        .vertical-example {
          min-height: 220px;
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 22px;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.055), rgba(255,255,255,0.018)),
            rgba(7,10,14,0.88);
          padding: 18px;
          display: grid;
          align-content: start;
          gap: 10px;
        }

        .vertical-example__label {
          color: rgba(248,250,252,0.56);
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .vertical-example h3 {
          margin: 0;
          font-size: 22px;
          letter-spacing: 0;
        }

        .vertical-example p {
          margin: 0;
          color: rgba(226,232,240,0.72);
          line-height: 1.62;
          font-size: 14px;
        }

        .footer__links {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .footer__links a {
          color: rgba(248,250,252,0.76);
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .footer__disclaimer {
          width: 100%;
          color: rgba(226,232,240,0.48);
          line-height: 1.5;
        }

        @media (max-width: 980px) {
          .hero__grid,
          .lane-grid,
          .guide,
          .vertical-proof__grid {
            grid-template-columns: 1fr;
          }

          .passport {
            min-height: auto;
          }
        }

        @media (max-width: 640px) {
          .shell {
            width: min(100% - 20px, 1180px);
          }

          .topbar__inner {
            height: auto;
            padding: 14px 0;
            align-items: flex-start;
            flex-direction: column;
          }

          .hero {
            padding-top: 34px;
          }

          .hero h1 {
            max-width: none;
          }

          .passport__stats {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="page">
        <div className="topbar">
          <div className="shell topbar__inner">
            <a className="brand" href="/" aria-label="GrailPulse home">
              <span className="brand__mark" aria-hidden="true" />
              <span>
                <div className="brand__name">GrailPulse</div>
                <div className="brand__sub">Collector passport for every lane</div>
              </span>
            </a>

            <div className="topbar__actions">
              <a className="pill" href="#lanes">
                Explore lanes
              </a>
              <a className="pill" href="/verticals">
                Examples
              </a>
              <a className="pill" href="/methodology">
                Methodology
              </a>
              <a className="pill" href="/trust">
                Trust
              </a>
              <a className="button" href="#passport-setup">
                Start Passport
              </a>
            </div>
          </div>
        </div>

        <main className="shell">
          <section className="hero" id="passport">
            <div className="hero__grid">
              <div className="hero__copy">
                <span className="kicker">
                  <span className="kicker__dot" />
                  Passport Control
                </span>

                <h1>
                  GrailPulse <span>Passport</span>
                </h1>

                <p className="hero__lede">
                  A collector identity for every fandom you care about. Start with one Passport, stamp
                  the lanes you collect, then build your vault, garage, and shelf from the same home base.
                </p>

                <div className="hero__cta">
                  <a className="button button--primary" href="#passport-setup">
                    Start your Passport
                  </a>
                  <a className="button button--ghost" href="#missions">
                    See the first mission
                  </a>
                </div>
              </div>

              <aside className="passport" aria-label="Passport preview">
                <div className="passport__frame">
                  <div className="passport__cover">
                    <div className="passport__seal" aria-hidden="true" />
                    <div className="passport__cover-title">GrailPulse Passport</div>
                    <div className="passport__cover-sub">Access / progress / collection identity</div>
                  </div>

                  <div className="passport__header">
                    <div>
                      <div className="passport__title">Collector Passport</div>
                      <div className="passport__id">GP-000184</div>
                    </div>
                    <div className="passport__chip">Founding collector</div>
                  </div>

                  <div className="passport__panel">
                    <div className="passport__title" style={{ marginBottom: '12px' }}>Lane stamps</div>
                    <div className="stamp-grid">
                      <div className="stamp">
                        <div className="stamp__code">CV-01</div>
                        <div className="stamp__label">Coin Vault</div>
                      </div>
                      <div className="stamp">
                        <div className="stamp__code">DG-01</div>
                        <div className="stamp__label">Die Cast</div>
                      </div>
                      <div className="stamp">
                        <div className="stamp__code">FS-01</div>
                        <div className="stamp__label">Figure Shelf</div>
                      </div>
                    </div>
                  </div>

                  <div className="passport__panel">
                    <div className="passport__stats">
                      <div className="stat">
                        <div className="stat__value">3</div>
                        <div className="stat__label">active lanes</div>
                      </div>
                      <div className="stat">
                        <div className="stat__value">12</div>
                        <div className="stat__label">starter missions</div>
                      </div>
                      <div className="stat">
                        <div className="stat__value">0</div>
                        <div className="stat__label">sign-in friction</div>
                      </div>
                      <div className="stat">
                        <div className="stat__value">1</div>
                        <div className="stat__label">first win away</div>
                      </div>
                    </div>
                  </div>

                  <div className="passport__panel">
                    <div className="passport__title">Signals that keep it fun</div>
                    <div className="signals">
                      {signals.map((signal) => (
                        <span key={signal}>{signal}</span>
                      ))}
                    </div>
                  </div>

                  <div className="passport__panel">
                    <div className="passport__title">Current status</div>
                    <p style={{ margin: '10px 0 0', color: 'rgba(226,232,240,0.82)', lineHeight: 1.65 }}>
                      Welcome back. Your Passport is ready for its first stamp. Choose a lane, add one
                      item, and turn the visit into a saved collection.
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </section>

          <PassportSetup />

          <section className="vertical-proof" aria-labelledby="vertical-proof-title">
            <div className="vertical-proof__header">
              <div>
                <p className="kicker">Examples from the verticals</p>
                <h2 id="vertical-proof-title">The Passport learns from every price guide.</h2>
              </div>
              <p>
                The research points to the same operating system across collectibles: condition pricing,
                source freshness, confidence labels, correction paths, and collection loops.
              </p>
            </div>

            <div className="vertical-proof__grid">
              {verticalExamples.map((example) => (
                <article className="vertical-example" key={example.title}>
                  <div className="vertical-example__label">{example.label}</div>
                  <h3>{example.title}</h3>
                  <p>{example.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="guide" id="missions">
            {missions.map((mission) => (
              <article className="guide__card" key={mission.title}>
                <h3>{mission.title}</h3>
                <p>{mission.body}</p>
              </article>
            ))}
          </section>

          <section id="lanes">
            <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
              <div>
                <p className="kicker" style={{ marginBottom: '14px' }}>
                  Choose your room
                </p>
                <h2 style={{ margin: 0, fontSize: 'clamp(28px, 3vw, 42px)', letterSpacing: '-0.04em' }}>
                  Open a lane that already feels like home.
                </h2>
              </div>
              <p style={{ maxWidth: '46ch', margin: 0, color: 'rgba(226,232,240,0.68)', lineHeight: 1.65 }}>
                Each vertical should feel like a doorway, not a menu. The site should guide the user
                into one clear first action and make that action feel rewarding.
              </p>
            </div>

            <div className="lane-grid">
              {lanes.map((lane) => (
                <LaneCard key={lane.title} {...lane} />
              ))}
            </div>
          </section>
        </main>

        <footer className="footer">
          <div className="shell" style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
            <span>GrailPulse · collector passport, vault, garage, and shelf</span>
            <span className="footer__links">
              <a href="/methodology">Methodology</a>
              <a href="/verticals">Vertical examples</a>
              <a href="/trust">Trust</a>
              <a href="/terms">Terms</a>
              <a href="/privacy">Privacy</a>
            </span>
            <span className="footer__disclaimer">
              Built to guide the first win, then keep the user coming back. GrailPulse is not affiliated
              with or endorsed by eBay Inc. Marketplace and brand names are used for identification.
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '@/app/components/SiteHeader';
import { Footer } from '@/app/components/Footer';
import { LaneCard } from '@/app/components/LaneCard';
import { CollectorObject } from '@/app/components/CollectorObject';
import { HubAd } from '@/app/components/HubAd';
import { VERTICALS, LIVE_COUNT, LIVE_NAMES_PHRASE, SOON_NAMES_PHRASE } from '@/data/verticals';

export const metadata: Metadata = {
  title: 'GrailPulse — Collector Price Guides for Every Shelf',
  description:
    'Collector price guides for coins, die cast, and figures, built from source-fit market evidence with each guide’s methodology shown clearly.',
  alternates: { canonical: '/' },
};

const HOW = [
  {
    title: 'Evidence that fits the category',
    body: 'Sold comps where the market supports them; source-tagged guide estimates where published references are the stronger signal.',
  },
  {
    title: 'Collector context included',
    body: 'Grade, condition, completeness, variant, and release details stay attached to the number instead of being averaged away.',
  },
  {
    title: 'The method stays visible',
    body: 'Each guide explains its sources, pricing model, limits, and correction path so you can judge the evidence for yourself.',
  },
];

const TRUST_POINTS = [
  { label: 'Sources', value: 'Evidence named' },
  { label: 'Methodology', value: 'Guide-specific' },
  { label: 'Context', value: 'Condition aware' },
  { label: 'Corrections', value: 'Open channel' },
];

export default function Home() {
  return (
    <div className="gp-page gp-home">
      <SiteHeader />

      <main>
        <section className="gp-hero">
          <div className="gp-shell gp-hero__inner">
            <div className="gp-hero__copy">
              <p className="gp-hero__eyebrow">
                <span className="gp-hero__dot" aria-hidden="true" />
                The collector-price-guide network
              </p>
              <h1 className="gp-hero__title">Know what belongs on every shelf.</h1>
              <p className="gp-hero__lede">
                Coins in the vault. Cars in the garage. Figures on the shelf. GrailPulse brings
                each collection its own purpose-built guide and shows the evidence behind the number.
              </p>
              <div className="gp-hero__cta">
                <a className="gp-btn gp-btn--primary" href="#guides">
                  Browse the price guides
                </a>
                <Link className="gp-btn gp-btn--ghost" href="/methodology">
                  How the guides work
                </Link>
              </div>
              <p className="gp-hero__trust">
                {LIVE_COUNT} guides live · {LIVE_NAMES_PHRASE}
                {SOON_NAMES_PHRASE ? ` · ${SOON_NAMES_PHRASE}` : ''}
              </p>
            </div>

            <div className="gp-cabinet" aria-label="The GrailPulse collector cabinet">
              <div className="gp-cabinet__rail" aria-hidden="true" />
              {VERTICALS.map((v) => (
                <div
                  className={`gp-cabinet__cell${v.status === 'soon' ? ' is-soon' : ''}`}
                  style={{ ['--lane-accent' as never]: v.accent }}
                  key={v.key}
                >
                  <CollectorObject kind={v.key} />
                  <span className="gp-cabinet__product">{v.product}</span>
                  <span className="gp-cabinet__room">{v.room}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="gp-proof" aria-label="GrailPulse trust standards">
          <div className="gp-shell gp-proof__inner">
            {TRUST_POINTS.map((point) => (
              <div className="gp-proof__item" key={point.label}>
                <span>{point.label}</span>
                <strong>{point.value}</strong>
              </div>
            ))}
            <Link className="gp-proof__link" href="/trust">
              See our trust standard →
            </Link>
          </div>
        </section>

        <section className="gp-guides" id="guides">
          <div className="gp-shell">
            <div className="gp-section-head">
              <p className="gp-eyebrow">The price guides</p>
              <h2>Enter the corner of the hobby you know.</h2>
              <p className="gp-section-sub">
                Each product has its own collector culture, evidence model, and vocabulary. The hub
                keeps them connected without sanding those differences away.
              </p>
            </div>
            <div className="gp-lane-grid">
              {VERTICALS.map((v) => (
                <LaneCard key={v.key} v={v} />
              ))}
            </div>
          </div>
        </section>

        <div className="gp-shell">
          <HubAd />
        </div>

        <section className="gp-how">
          <div className="gp-shell">
            <div className="gp-section-head">
              <p className="gp-eyebrow">How GrailPulse prices things</p>
              <h2>Evidence first. Collector context always.</h2>
            </div>
            <div className="gp-how-grid">
              {HOW.map((item) => (
                <article className="gp-how-card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
            <div className="gp-how__more">
              <Link className="gp-btn gp-btn--ghost" href="/methodology">
                See the full methodology &rarr;
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

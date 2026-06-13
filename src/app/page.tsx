import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '@/app/components/SiteHeader';
import { Footer } from '@/app/components/Footer';
import { VERTICALS, LIVE_COUNT, type Vertical } from '@/data/verticals';

export const metadata: Metadata = {
  title: 'GrailPulse — Real-Comp Price Guides for Collectors',
  description:
    'Honest, condition-aware price guides built from real public sold listings — coins, die cast, and action figures. Not asking prices. What things actually sold for.',
  alternates: { canonical: '/' },
};

const HOW = [
  {
    title: 'Real solds, not asking prices',
    body: 'Every guide is built from completed public sales — what collectors actually paid — never hopeful list prices.',
  },
  {
    title: 'Priced by condition',
    body: 'Loose, complete, sealed, graded. We split comps by condition so the number matches the item in your hand.',
  },
  {
    title: 'Confidence, labeled',
    body: 'Thin data is marked thin. Every guide shows how many comps back a price and how fresh they are.',
  },
];

function LaneCard({ v }: { v: Vertical }) {
  const live = v.status === 'live';
  const accentStyle = { ['--lane-accent' as never]: v.accent };

  const inner = (
    <>
      <div className="gp-lane__top">
        <span className="gp-lane__room">{v.room}</span>
        <span className={`gp-lane__badge ${live ? 'is-live' : 'is-soon'}`}>
          {live ? 'Live' : 'Coming soon'}
        </span>
      </div>
      <h3 className="gp-lane__name">{v.name}</h3>
      <p className="gp-lane__cat">{v.category}</p>
      <p className="gp-lane__blurb">{v.blurb}</p>
      <span className="gp-lane__cta">{live ? `Open ${v.product} →` : 'In the works'}</span>
    </>
  );

  return live && v.href ? (
    <a className="gp-lane" href={v.href} target="_blank" rel="noopener noreferrer" style={accentStyle}>
      {inner}
    </a>
  ) : (
    <div className="gp-lane gp-lane--soon" style={accentStyle} aria-disabled="true">
      {inner}
    </div>
  );
}

export default function Home() {
  return (
    <div className="gp-page gp-home">
      <SiteHeader />

      <main>
        <section className="gp-hero">
          <div className="gp-shell gp-hero__inner">
            <p className="gp-hero__eyebrow">
              <span className="gp-hero__dot" aria-hidden="true" />
              Collector price guides
            </p>
            <h1 className="gp-hero__title">Real prices for the grails you chase.</h1>
            <p className="gp-hero__lede">
              GrailPulse turns millions of public sold listings into honest, condition-aware price
              guides — across coins, die cast, and action figures. No asking-price guesswork. Just
              what things actually sold for.
            </p>
            <div className="gp-hero__cta">
              <a className="gp-btn gp-btn--primary" href="#guides">
                Browse the price guides
              </a>
              <Link className="gp-btn gp-btn--ghost" href="/methodology">
                How we price
              </Link>
            </div>
            <p className="gp-hero__trust">
              {LIVE_COUNT} guides live · coins, die cast &amp; figures · video games next
            </p>
          </div>
        </section>

        <section className="gp-guides" id="guides">
          <div className="gp-shell">
            <div className="gp-section-head">
              <p className="gp-eyebrow">The price guides</p>
              <h2>Pick the shelf you collect.</h2>
              <p className="gp-section-sub">
                Each guide is its own home — built for how that corner of the hobby actually trades.
              </p>
            </div>
            <div className="gp-lane-grid">
              {VERTICALS.map((v) => (
                <LaneCard key={v.key} v={v} />
              ))}
            </div>
          </div>
        </section>

        <section className="gp-how">
          <div className="gp-shell">
            <div className="gp-section-head">
              <p className="gp-eyebrow">How GrailPulse prices things</p>
              <h2>A number you can actually act on.</h2>
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

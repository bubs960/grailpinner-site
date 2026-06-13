import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '@/app/components/SiteHeader';
import { Footer } from '@/app/components/Footer';
import { LaneCard } from '@/app/components/LaneCard';
import { VERTICALS, LIVE_COUNT } from '@/data/verticals';

export const metadata: Metadata = {
  title: 'GrailPulse — Real-Comp Price Guides for Collectors',
  description:
    'Price everything you collect in one place — coins, die cast, and figures — from real public sold listings, not asking prices. Most collectors keep more than one shelf; GrailPulse prices them all.',
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
            <h1 className="gp-hero__title">Real prices for everything you collect.</h1>
            <p className="gp-hero__lede">
              Most collectors keep more than one shelf. GrailPulse is the one place to price them
              all — coins, die cast, and figures, built from real sold listings, not hopeful asking
              prices. Video games next.
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

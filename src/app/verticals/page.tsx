import type { Metadata } from 'next';
import { InfoCallout, InfoShell } from '../info-page';
import { LaneCard } from '@/app/components/LaneCard';
import { JsonLd } from '@/app/components/JsonLd';
import { VERTICALS, LIVE_VERTICALS } from '@/data/verticals';

export const metadata: Metadata = {
  title: 'Price Guides',
  description:
    'Every GrailPulse price guide in one place — coins, die cast, and figures live now, with video games on the way. Each one prices its market on its own terms.',
  alternates: {
    canonical: '/verticals',
  },
};

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'GrailPulse price guides',
  itemListElement: LIVE_VERTICALS.map((v, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: `${v.name} — ${v.product}`,
    url: v.href,
  })),
};

export default function VerticalsPage() {
  return (
    <InfoShell
      eyebrow="The price guides"
      title="Every GrailPulse guide, one directory."
      lede="GrailPulse runs a dedicated price guide for each corner of the hobby. Coins, die cast, and figures are live now; video games are next. Each product explains its sources, context, and pricing method — open the one you collect."
    >
      <JsonLd data={itemListSchema} />
      <section className="gp-lane-grid" aria-label="GrailPulse price guides">
        {VERTICALS.map((v) => (
          <LaneCard key={v.key} v={v} />
        ))}
      </section>

      <InfoCallout>
        <p className="info-eyebrow">Why separate guides</p>
        <h2>Not one login. A network of them.</h2>
        <p>
          GrailPulse isn&rsquo;t a single vault for everything you own — it&rsquo;s a network of guides, each
          built for one category. A coin collector and a figure collector don&rsquo;t want the same tools,
          the same vocabulary, or the same trust signals. Open the one you collect; each keeps its own
          login, its own data, and its own method.
        </p>
      </InfoCallout>
    </InfoShell>
  );
}

import type { Metadata } from 'next';
import { InfoShell } from '../info-page';
import { LaneCard } from '@/app/components/LaneCard';
import { VERTICALS } from '@/data/verticals';

export const metadata: Metadata = {
  title: 'Price Guides',
  description:
    'Every GrailPulse price guide in one place — coins, die cast, and figures live now, with video games on the way. Each one prices real sold listings by condition.',
  alternates: {
    canonical: '/verticals',
  },
};

export default function VerticalsPage() {
  return (
    <InfoShell
      eyebrow="The price guides"
      title="Every GrailPulse guide, one directory."
      lede="GrailPulse runs a dedicated price guide for each corner of the hobby. Coins, die cast, and figures are live now; video games are next. Each one prices real sold listings by condition — open the one you collect."
    >
      <section className="gp-lane-grid" aria-label="GrailPulse price guides">
        {VERTICALS.map((v) => (
          <LaneCard key={v.key} v={v} />
        ))}
      </section>
    </InfoShell>
  );
}

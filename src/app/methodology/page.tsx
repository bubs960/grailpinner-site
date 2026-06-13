import type { Metadata } from 'next';
import { InfoCallout, InfoCard, InfoGrid, InfoShell } from '../info-page';

export const metadata: Metadata = {
  title: 'Methodology',
  description:
    'How GrailPulse builds a price guide: real completed sales, normalized by condition, filtered for noise, and labeled with comp count, freshness, and confidence.',
  alternates: {
    canonical: '/methodology',
  },
};

export default function MethodologyPage() {
  return (
    <InfoShell
      eyebrow="Price guide methodology"
      title="How GrailPulse turns comps into collector signals."
      lede="We don't republish marketplace noise. Every GrailPulse price is built from real completed sales, split by condition, cleaned of junk, and labeled with how much evidence stands behind it — so the number you read is one you can act on."
    >
      <InfoGrid>
        <InfoCard kicker="Step 01" title="We start from real sold prices">
          <p>
            Each guide is built from completed public sales — what collectors actually paid, not what a
            seller is hoping for. Active asking prices are treated as weak signals at most, and never
            counted as sales.
          </p>
        </InfoCard>

        <InfoCard kicker="Step 02" title="We price by condition">
          <p>
            A single average hides too much. We split comps by condition — loose, complete, and sealed for
            figures and games; grade bands for coins; carded, loose, and chase for die cast — so the price
            matches the item in your hand instead of blurring every grade together.
          </p>
        </InfoCard>

        <InfoCard kicker="Step 03" title="We filter the noise">
          <p>
            Lots, reproductions, customs, damaged listings, mislabeled items, and obvious outliers distort a
            guide fast. We strip them out before a price is calculated, and we keep the comp set honest
            rather than padded.
          </p>
        </InfoCard>

        <InfoCard kicker="Step 04" title="We label confidence and freshness">
          <p>
            Every guide shows how many comps back a price and how recent they are. When the evidence is
            thin, we say so plainly — and we hold low-data pages back from search until they have enough
            real comps to be useful.
          </p>
        </InfoCard>
      </InfoGrid>

      <InfoCallout>
        <p className="info-eyebrow">The same standard, every shelf</p>
        <h2>One method across coins, die cast, and figures.</h2>
        <p>
          Each live GrailPulse guide runs this same pipeline, tuned to how its corner of the hobby trades.
          A coin&rsquo;s grade matters the way a figure&rsquo;s seal does, so the method bends to the
          category — without ever bending the honesty of where a number came from.
        </p>
      </InfoCallout>
    </InfoShell>
  );
}

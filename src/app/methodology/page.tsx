import type { Metadata } from 'next';
import { InfoCallout, InfoCard, InfoGrid, InfoShell } from '../info-page';

export const metadata: Metadata = {
  title: 'Methodology',
  description:
    'How GrailPulse fits real pricing evidence to each collector category, keeps condition context attached, and gives you an open way to flag mistakes.',
  alternates: {
    canonical: '/methodology',
  },
};

export default function MethodologyPage() {
  return (
    <InfoShell
      eyebrow="Price guide methodology"
      title="One trust standard. A method fitted to each shelf."
      lede="A useful coin estimate and a useful figure comp do not come from identical evidence. GrailPulse keeps the standard consistent — name the source, preserve collector context, explain the method, and show the limits — while letting each guide use the evidence that fits its market."
    >
      <InfoGrid>
        <InfoCard kicker="Step 01" title="We start with evidence that fits the category">
          <p>
            Figure guides lean on completed public sold comps. Die-cast guides use modeled seed estimates
            with casting and condition context. CoinSpinner combines published-guide estimates with grade,
            melt, and source context. The source is identified so you know what kind of number you are
            reading.
          </p>
        </InfoCard>

        <InfoCard kicker="Step 02" title="We preserve collector context">
          <p>
            A single average hides too much. Grade bands for coins, carded versus loose for die cast,
            and loose versus sealed for figures keep unlike examples from being blurred into one
            misleading number.
          </p>
        </InfoCard>

        <InfoCard kicker="Step 03" title="We clean and label the signal">
          <p>
            Where sold listings are used, lots, reproductions, customs, damaged listings, mislabeled
            items, and obvious outliers are filtered. Where guide estimates are used, the guide and
            relevant qualifiers stay attached.
          </p>
        </InfoCard>

        <InfoCard kicker="Step 04" title="We show the method and its limits">
          <p>
            Each product explains its own pricing model, evidence labels, update cadence, and correction
            path. Thin or incomplete evidence should be identified rather than dressed up as certainty.
          </p>
        </InfoCard>
      </InfoGrid>

      <InfoCallout>
        <p className="info-eyebrow">The same trust standard, every shelf</p>
        <h2>Different evidence. The same obligation to explain it.</h2>
        <p>
          A coin&rsquo;s grade matters the way a figure&rsquo;s seal does, but their markets do not produce
          identical data. The method bends to the category without bending the honesty of where a number
          came from.
        </p>
      </InfoCallout>
    </InfoShell>
  );
}

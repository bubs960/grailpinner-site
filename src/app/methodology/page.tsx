import type { Metadata } from 'next';
import { InfoCallout, InfoCard, InfoGrid, InfoShell } from '../info-page';

export const metadata: Metadata = {
  title: 'GrailPulse Methodology',
  description: 'How GrailPulse price guides normalize sold comps, condition grades, confidence labels, and vertical-specific collector context.',
  alternates: {
    canonical: '/methodology',
  },
};

export default function MethodologyPage() {
  return (
    <InfoShell
      eyebrow="Price guide methodology"
      title="How GrailPulse turns comps into collector signals."
      lede="The goal is not to republish marketplace data. GrailPulse adds condition grading, data cleaning, confidence labels, and vertical-specific context so collectors can make faster, better decisions."
    >
      <InfoGrid>
        <InfoCard kicker="Step 01" title="Collect public market signals">
          <p>
            Each vertical starts with recent sold-market evidence such as completed marketplace sales,
            auction records, and approved partner data where available. Active asking prices are treated
            as weak signals unless they are clearly marked as listings rather than sales.
          </p>
        </InfoCard>

        <InfoCard kicker="Step 02" title="Normalize by condition">
          <p>
            A single average is not enough. Figures use loose, complete, and carded tiers. Coins use
            grade bands and melt-floor logic where relevant. Games use loose, complete, and sealed tiers.
            Die cast separates loose, carded, premium, chase, and variant-sensitive records.
          </p>
        </InfoCard>

        <InfoCard kicker="Step 03" title="Filter bad inputs">
          <p>
            Lots, reproductions, customs, damaged listings, mislabeled items, and extreme outliers can
            distort a guide quickly. GrailPulse pages should disclose what was excluded and why confidence
            changes when the comp count is thin.
          </p>
        </InfoCard>

        <InfoCard kicker="Step 04" title="Publish confidence and freshness">
          <p>
            Every price guide page should show last-updated timing, number of comps, and confidence tiers
            such as Reliable, Limited, and Sparse. Low-data pages should be held back from indexing until
            they have enough unique evidence.
          </p>
        </InfoCard>
      </InfoGrid>

      <InfoCallout>
        <p className="info-eyebrow">Vertical examples</p>
        <div className="info-callout__grid">
          <div>
            <h2>FigurePinner</h2>
            <p>
              The mature pattern: condition pricing, sparkline history, confidence labels, scan and deal
              tools, and item-page editorial context.
            </p>
          </div>
          <div>
            <h2>CoinSpinner</h2>
            <p>
              The next trust push: methodology, visible freshness, confidence labels, sitemap, JSON-LD,
              and a clear eBay/platform disclaimer.
            </p>
          </div>
          <div>
            <h2>GrailGamer</h2>
            <p>
              Build from day one with loose, complete, sealed, regional variants, noindex for thin pages,
              and AggregateOffer schema on price ranges.
            </p>
          </div>
          <div>
            <h2>Die Cast</h2>
            <p>
              Keep family pages for scale, but enrich variant pages with carded/loose state, chase badges,
              source freshness, and photo confidence.
            </p>
          </div>
        </div>
      </InfoCallout>
    </InfoShell>
  );
}

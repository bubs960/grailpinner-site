import type { Metadata } from 'next';
import { InfoCallout, InfoCard, InfoGrid, InfoShell } from '../info-page';

export const metadata: Metadata = {
  title: 'GrailPulse Vertical Examples',
  description: 'Examples from FigurePinner, CoinSpinner, Die Cast, and GrailGamer that guide the GrailPulse Passport and price-guide platform.',
  alternates: {
    canonical: '/verticals',
  },
};

const priorityRows = [
  ['FigurePinner', 'Keep', 'Condition tiers, collection panel, scan page, deals page, confidence labels.'],
  ['CoinSpinner', 'Close gaps', 'Methodology, sitemap, freshness, JSON-LD, confidence tiers, report links.'],
  ['Die Cast', 'Scale carefully', 'Group by family, enrich exact variants, preserve photo/source confidence.'],
  ['GrailGamer', 'Bake in early', 'Loose/CIB/sealed, region variants, noindex thin pages, AggregateOffer schema.'],
];

export default function VerticalsPage() {
  return (
    <InfoShell
      eyebrow="Cross-vertical examples"
      title="What the other verticals teach the Passport."
      lede="The hub should not invent every pattern from scratch. FigurePinner shows the mature collector workflow, CoinSpinner shows the trust gaps to close, Die Cast shows how to group massive catalogs, and GrailGamer shows what to bake in before launch."
    >
      <InfoGrid>
        <InfoCard kicker="Mature pattern" title="FigurePinner">
          <p>
            FigurePinner is the strongest example for the Passport journey: users can search, scan,
            track a collection, view confidence labels, and move into deals. Its remaining hub-level
            lesson is legal polish: visible platform disclaimers and AggregateOffer ranges.
          </p>
        </InfoCard>

        <InfoCard kicker="Trust retrofit" title="CoinSpinner">
          <p>
            CoinSpinner proves the data surface can work lean, but the next stage needs a methodology
            page, source attribution, freshness timestamps, confidence labels, sitemap, and correction
            links before scaling further.
          </p>
        </InfoCard>

        <InfoCard kicker="Catalog strategy" title="Die Cast">
          <p>
            Die Cast shows why every exact variant cannot be the only browsing surface. Family pages
            create a sane collector path, while variant pages can carry exact photo coverage, condition,
            chase status, and recent comp confidence.
          </p>
        </InfoCard>

        <InfoCard kicker="Day-one rules" title="GrailGamer">
          <p>
            GrailGamer should launch with the hard stuff already present: condition tiers, variant
            handling, noindex for sparse data, JSON-LD, methodology links, and report-an-issue routes
            on item pages.
          </p>
        </InfoCard>
      </InfoGrid>

      <InfoCallout>
        <p className="info-eyebrow">Priority matrix</p>
        <div className="info-table" role="table" aria-label="Vertical examples priority matrix">
          {priorityRows.map(([vertical, status, action]) => (
            <div className="info-table__row" role="row" key={vertical}>
              <div role="cell">
                <strong>{vertical}</strong>
              </div>
              <div role="cell">{status}</div>
              <div role="cell">{action}</div>
            </div>
          ))}
        </div>
      </InfoCallout>
    </InfoShell>
  );
}

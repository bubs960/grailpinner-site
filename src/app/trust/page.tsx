import type { Metadata } from 'next';
import { InfoCallout, InfoCard, InfoGrid, InfoShell } from '../info-page';

export const metadata: Metadata = {
  title: 'GrailPulse Trust & Data Policy',
  description: 'GrailPulse trust signals, data source disclosures, affiliate policy, correction process, and indexing standards.',
  alternates: {
    canonical: '/trust',
  },
};

export default function TrustPage() {
  return (
    <InfoShell
      eyebrow="Trust and compliance"
      title="The rules every GrailPulse vertical should follow."
      lede="Collectors need quick answers, but price guides only earn trust when they show where prices came from, how they were cleaned, and when the data is too thin to trust."
    >
      <InfoGrid>
        <InfoCard kicker="Disclosure" title="Source attribution">
          <p>
            Item pages should state whether prices are based on recent eBay sold listings, Mercari comps,
            auction results, user submissions, or first-party marketplace data. Active asking prices must
            not be presented as completed sales.
          </p>
        </InfoCard>

        <InfoCard kicker="Affiliate hygiene" title="Sponsored links">
          <p>
            Purchase and affiliate links should use <code>rel=&quot;sponsored nofollow&quot;</code>.
            GrailPulse should send collectors back to marketplaces as a helpful buying path, not imply
            official endorsement.
          </p>
        </InfoCard>

        <InfoCard kicker="Legal clarity" title="Marketplace disclaimer">
          <p>
            GrailPulse is not affiliated with or endorsed by eBay Inc. Brand names are used only to
            identify collectible items and data sources. Logos should not be used unless a vertical has
            explicit rights.
          </p>
        </InfoCard>

        <InfoCard kicker="Quality control" title="Corrections and thin data">
          <p>
            Each price page should include a report link. Pages with sparse or zero comps should show a
            clear confidence label and can be noindexed until they have enough unique data to be useful.
          </p>
        </InfoCard>
      </InfoGrid>

      <InfoCallout>
        <p className="info-eyebrow">Correction route</p>
        <h2>Report bad data before it becomes a trust problem.</h2>
        <p>
          Collectors should be able to flag wrong variants, bad photos, suspicious comps, missing
          condition context, and stale prices. For now, use{' '}
          <a href="mailto:hello@grailpulse.com?subject=GrailPulse%20data%20correction">hello@grailpulse.com</a>.
        </p>
      </InfoCallout>
    </InfoShell>
  );
}

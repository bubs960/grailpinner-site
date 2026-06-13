import type { Metadata } from 'next';
import { InfoCard, InfoGrid, InfoShell } from '../info-page';

export const metadata: Metadata = {
  title: 'Terms',
  description:
    'Terms for using the GrailPulse price-guide hub: informational pricing, marketplace references, and corrections. Each linked guide has its own terms.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
  return (
    <InfoShell
      eyebrow="Terms"
      title="Terms for using GrailPulse."
      lede="GrailPulse.com is a free directory and price-guide hub. These terms cover this site; each linked guide — CoinSpinner, FigurePinner, and the rest — has its own. Last updated June 13, 2026."
    >
      <InfoGrid>
        <InfoCard title="Informational price guide">
          <p>
            GrailPulse provides collectible pricing and market context for information only. Values move
            fast and are not financial, investment, tax, or appraisal advice.
          </p>
        </InfoCard>

        <InfoCard title="Marketplace and brand references">
          <p>
            Marketplace, product, brand, and grading-company names are used for identification. GrailPulse
            is not affiliated with or endorsed by eBay Inc. or any other marketplace unless a specific
            partnership is stated.
          </p>
        </InfoCard>

        <InfoCard title="Separate guides, separate terms">
          <p>
            Each GrailPulse guide (coins, die cast, figures) is its own site, with its own accounts and
            terms. This hub links you to them &mdash; it doesn&rsquo;t host your collection or an account.
          </p>
        </InfoCard>

        <InfoCard title="Corrections">
          <p>
            If a price or record looks wrong, email us and we&rsquo;ll review it. We may update, merge,
            remove, or reclassify data that appears inaccurate, duplicated, manipulated, or misidentified.
          </p>
        </InfoCard>
      </InfoGrid>
    </InfoShell>
  );
}

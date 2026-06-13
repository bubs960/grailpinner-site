import type { Metadata } from 'next';
import { InfoCard, InfoGrid, InfoShell } from '../info-page';

export const metadata: Metadata = {
  title: 'GrailPulse Terms',
  description: 'Basic GrailPulse terms for collection tracking, price-guide data, marketplace references, and user-submitted factual data.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
  return (
    <InfoShell
      eyebrow="Terms"
      title="Terms for using GrailPulse."
      lede="This page is a practical MVP terms surface for the Passport hub. It should be reviewed by counsel before GrailPulse accepts payments, stores user collections at scale, or launches marketplace features."
    >
      <InfoGrid>
        <InfoCard title="Informational price guide">
          <p>
            GrailPulse provides collectible pricing, collection organization, and market context for
            informational purposes only. Values can change quickly and should not be treated as financial,
            investment, tax, or appraisal advice.
          </p>
        </InfoCard>

        <InfoCard title="Marketplace and brand references">
          <p>
            Marketplace names, product names, brands, and grading-company names are used for identification.
            GrailPulse is not affiliated with or endorsed by eBay Inc. or any other marketplace unless a
            specific partnership is stated.
          </p>
        </InfoCard>

        <InfoCard title="User-submitted facts">
          <p>
            If users submit sale price, date, condition, platform, item ID, or correction data, those
            factual submissions may be used to improve the GrailPulse database. Users grant GrailPulse a
            perpetual, worldwide license to store, transform, display, and analyze submitted factual data.
          </p>
        </InfoCard>

        <InfoCard title="Corrections">
          <p>
            GrailPulse may update, remove, merge, or reclassify data when records appear inaccurate,
            duplicated, manipulated, misidentified, or inconsistent with the relevant vertical methodology.
          </p>
        </InfoCard>
      </InfoGrid>
    </InfoShell>
  );
}

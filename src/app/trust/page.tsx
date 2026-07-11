import type { Metadata } from 'next';
import { InfoCallout, InfoCard, InfoGrid, InfoShell } from '../info-page';

export const metadata: Metadata = {
  title: 'Trust & Data',
  description:
    'How GrailPulse earns trust through named evidence, guide-specific methodologies, honest outbound links, visible limits, and an open correction path.',
  alternates: {
    canonical: '/trust',
  },
};

export default function TrustPage() {
  return (
    <InfoShell
      eyebrow="Trust & data"
      title="How GrailPulse earns your trust."
      lede="A price guide is only worth reading if you can understand what kind of evidence sits behind the number. Every GrailPulse product names its sources, explains its method, keeps outbound links honest, and provides a correction path."
    >
      <InfoGrid>
        <InfoCard kicker="Where prices come from" title="The evidence is named">
          <p>
            Figure guides use completed public sold comps where available. Die-cast guides use modeled seed
            estimates with casting and condition context. CoinSpinner uses published-guide estimates with
            grade and source context. We do not describe one evidence type as another.
          </p>
        </InfoCard>

        <InfoCard kicker="Affiliate hygiene" title="Honest buying links">
          <p>
            This hub contains no marketplace or affiliate links at all — every door here leads into one of
            our own guides. Buying paths, and their disclosures, live inside the guides themselves.
          </p>
        </InfoCard>

        <InfoCard kicker="Legal clarity" title="Marketplace disclaimer">
          <p>
            GrailPulse is not affiliated with or endorsed by eBay Inc. Brand and marketplace names are used
            only to identify collectible items and the sources of our data.
          </p>
        </InfoCard>

        <InfoCard kicker="Quality control" title="Limits stay visible">
          <p>
            When sold-comp evidence is thin, it should be labeled. When a guide estimate depends on grade
            or another qualifier, that context should stay beside it. We would rather show a limitation
            than imply certainty the source cannot support.
          </p>
        </InfoCard>
      </InfoGrid>

      <InfoCallout>
        <p className="info-eyebrow">Corrections</p>
        <h2>Spot bad data? Tell us.</h2>
        <p>
          If you see a wrong variant, a bad photo, a suspicious comp, or a stale price, flag it and we&rsquo;ll
          fix it. For now, email{' '}
          <a href="mailto:hello@grailpulse.com?subject=GrailPulse%20data%20correction">hello@grailpulse.com</a>.
        </p>
      </InfoCallout>
    </InfoShell>
  );
}

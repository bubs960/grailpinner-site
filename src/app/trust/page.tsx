import type { Metadata } from 'next';
import { InfoCallout, InfoCard, InfoGrid, InfoShell } from '../info-page';

export const metadata: Metadata = {
  title: 'Trust & Data',
  description:
    'How GrailPulse earns trust: real sold-listing sources, honest affiliate links, a clear eBay disclaimer, labeled thin data, and an open correction path.',
  alternates: {
    canonical: '/trust',
  },
};

export default function TrustPage() {
  return (
    <InfoShell
      eyebrow="Trust & data"
      title="How GrailPulse earns your trust."
      lede="A price guide is only worth reading if you can see where the numbers came from. Here's what we do on every guide — show the source, keep the links honest, and admit when the data is too thin to trust."
    >
      <InfoGrid>
        <InfoCard kicker="Where prices come from" title="Real sold listings">
          <p>
            Every price is built from completed public sales — primarily recent eBay sold listings. We label
            the source, and we never present an active asking price as a completed sale.
          </p>
        </InfoCard>

        <InfoCard kicker="Affiliate hygiene" title="Honest buying links">
          <p>
            Outbound buying links are marked <code>rel=&quot;sponsored nofollow&quot;</code>. We point you back
            to the marketplace as a buying path — never as an endorsement — and a guide&rsquo;s price never
            changes because a link is on the page.
          </p>
        </InfoCard>

        <InfoCard kicker="Legal clarity" title="Marketplace disclaimer">
          <p>
            GrailPulse is not affiliated with or endorsed by eBay Inc. Brand and marketplace names are used
            only to identify collectible items and the sources of our data.
          </p>
        </InfoCard>

        <InfoCard kicker="Quality control" title="Thin data, labeled">
          <p>
            When a page has too few comps to trust, we say so with a clear confidence label and keep it out
            of search until it has enough real evidence. We&rsquo;d rather show you less than show you a
            number we can&rsquo;t stand behind.
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

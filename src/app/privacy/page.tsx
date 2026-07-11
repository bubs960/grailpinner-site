import type { Metadata } from 'next';
import { InfoCard, InfoGrid, InfoShell } from '../info-page';

export const metadata: Metadata = {
  title: 'Privacy',
  description:
    'Privacy on the GrailPulse hub: no logins, no stored collections; standard request logs and third-party ads. Your collection lives on each individual guide.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <InfoShell
      eyebrow="Privacy"
      title="Privacy on GrailPulse."
      lede="GrailPulse.com is a static directory — it has no logins and doesn&rsquo;t store your collection. Here&rsquo;s what that means for you. Last updated June 13, 2026."
    >
      <InfoGrid>
        <InfoCard title="What this hub collects">
          <p>
            Almost nothing. This site has no accounts and stores no collection data. We serve ads through
            Adsterra, a third-party ad network that may set cookies as described in its policies, and
            standard request logs may record basic data for security and performance.
          </p>
        </InfoCard>

        <InfoCard title="Your collection lives on the guides">
          <p>
            When you track a collection, that happens on the individual guide — for example FigurePinner —
            each with its own privacy policy and controls. This hub only points you there.
          </p>
        </InfoCard>

        <InfoCard title="Cookies and ads">
          <p>
            The main third party on this hub is Adsterra. You can manage ad personalization through your
            browser&rsquo;s own cookie controls.
          </p>
        </InfoCard>

        <InfoCard title="Contact">
          <p>
            For privacy or data-correction requests, email{' '}
            <a href="mailto:hello@grailpulse.com?subject=GrailPulse%20privacy%20request">hello@grailpulse.com</a>.
          </p>
        </InfoCard>
      </InfoGrid>
    </InfoShell>
  );
}

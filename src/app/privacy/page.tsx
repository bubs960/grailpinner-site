import type { Metadata } from 'next';
import { InfoCard, InfoGrid, InfoShell } from '../info-page';

export const metadata: Metadata = {
  title: 'GrailPulse Privacy',
  description: 'GrailPulse privacy overview for Passport, collection tracking, submitted corrections, and analytics.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <InfoShell
      eyebrow="Privacy"
      title="Privacy for collectors using GrailPulse."
      lede="The Passport hub is designed around collection utility, not social-media exposure. Public collection sharing should be opt-in when real accounts are connected."
    >
      <InfoGrid>
        <InfoCard title="What may be collected">
          <p>
            GrailPulse may collect account details, selected Passport lanes, collection entries, correction
            reports, device analytics, and email preferences when those features are enabled.
          </p>
        </InfoCard>

        <InfoCard title="How data is used">
          <p>
            Data is used to save collections, improve price confidence, identify stale or incorrect comps,
            personalize collector missions, and maintain site security and performance.
          </p>
        </InfoCard>

        <InfoCard title="What should stay private">
          <p>
            Collection value, exact inventory, watchlists, and contact details should be private by default.
            Any public Passport or showcase feature should clearly label what will be shared.
          </p>
        </InfoCard>

        <InfoCard title="Contact">
          <p>
            For privacy or data correction requests, contact{' '}
            <a href="mailto:hello@grailpulse.com?subject=GrailPulse%20privacy%20request">hello@grailpulse.com</a>.
          </p>
        </InfoCard>
      </InfoGrid>
    </InfoShell>
  );
}

import Link from 'next/link';
import { SiteHeader } from '@/app/components/SiteHeader';
import { Footer } from '@/app/components/Footer';

export default function NotFound() {
  return (
    <div className="gp-page">
      <SiteHeader />

      <main className="info-page gp-404">
        <div className="info-page__shell gp-404__inner">
          <div className="gp-404__code" aria-hidden="true">
            404
          </div>
          <h1>This page isn&rsquo;t on the shelf.</h1>
          <p>The page you&rsquo;re after doesn&rsquo;t exist or has moved. Head back and pick a price guide.</p>
          <div className="gp-404__actions">
            <Link className="gp-btn gp-btn--primary" href="/">
              Back to GrailPulse
            </Link>
            <Link className="gp-btn gp-btn--ghost" href="/verticals">
              Browse the guides
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

import type { ReactNode } from 'react';
import { SiteHeader } from '@/app/components/SiteHeader';
import { Footer } from '@/app/components/Footer';

type InfoShellProps = {
  eyebrow: string;
  title: string;
  lede: string;
  children: ReactNode;
};

type InfoCardProps = {
  kicker?: string;
  title: string;
  children: ReactNode;
};

export function InfoShell({ eyebrow, title, lede, children }: InfoShellProps) {
  return (
    <div className="gp-page">
      <SiteHeader />

      <main className="info-page">
        <div className="info-page__shell">
          <section className="info-hero">
            <p className="info-eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
            <p>{lede}</p>
          </section>

          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export function InfoGrid({ children }: { children: ReactNode }) {
  return <section className="info-grid">{children}</section>;
}

export function InfoCard({ kicker, title, children }: InfoCardProps) {
  return (
    <article className="info-card">
      {kicker && <p className="info-card__kicker">{kicker}</p>}
      <h2>{title}</h2>
      <div className="info-card__body">{children}</div>
    </article>
  );
}

export function InfoCallout({ children }: { children: ReactNode }) {
  return <section className="info-callout">{children}</section>;
}

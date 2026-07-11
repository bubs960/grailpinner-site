import Link from 'next/link';

// One sticky header for every page.
// Server component — no client JS; the mobile collapse is pure CSS.

const NAV = [
  { label: 'Price Guides', href: '/verticals' },
  { label: 'Methodology', href: '/methodology' },
  { label: 'Trust', href: '/trust' },
];

export function SiteHeader() {
  return (
    <header className="gp-header">
      <div className="gp-header__inner">
        <Link className="gp-brand" href="/" aria-label="GrailPulse home">
          <span className="gp-brand__mark" aria-hidden="true" />
          <span className="gp-brand__text">
            <span className="gp-brand__name">GrailPulse</span>
            <span className="gp-brand__sub">Collector price guides</span>
          </span>
        </Link>

        <nav className="gp-header__nav" aria-label="Main">
          {NAV.map((link) => (
            <Link key={link.href} href={link.href} className="gp-header__link">
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href="/verticals" className="gp-header__cta">
          Browse the guides
        </Link>
      </div>
    </header>
  );
}

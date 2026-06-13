import Link from 'next/link';

// One shared footer for every page. Year is computed at build time (static export).

const LINKS = [
  { label: 'Price Guides', href: '/verticals' },
  { label: 'Methodology', href: '/methodology' },
  { label: 'Trust', href: '/trust' },
  { label: 'Terms', href: '/terms' },
  { label: 'Privacy', href: '/privacy' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="gp-footer">
      <div className="gp-footer__inner">
        <span className="gp-footer__brand">
          <span className="gp-brand__mark gp-brand__mark--sm" aria-hidden="true" />
          GrailPulse — real-comp price guides for collectors
        </span>

        <nav className="gp-footer__links" aria-label="Footer">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="gp-footer__legal">
          © {year} GrailPulse. Prices are estimates derived from public sold-listing data — not offers,
          appraisals, or financial advice. GrailPulse is not affiliated with or endorsed by eBay Inc.
          Marketplace and brand names are used for identification only.
        </p>
      </div>
    </footer>
  );
}

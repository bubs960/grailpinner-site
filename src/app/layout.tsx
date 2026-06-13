import type { Metadata, Viewport } from 'next';
import { Outfit } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { JsonLd } from '@/app/components/JsonLd';
import { LIVE_VERTICALS } from '@/data/verticals';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-outfit',
  display: 'swap',
});

const SITE_URL = 'https://grailpulse.com';
const SITE_DESC =
  'Honest, condition-aware price guides built from real public sold listings — coins, die cast, and action figures. The home for every GrailPulse price guide.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'GrailPulse — Real-Comp Price Guides for Collectors',
    template: '%s | GrailPulse',
  },
  description: SITE_DESC,
  openGraph: {
    title: 'GrailPulse — Real-Comp Price Guides for Collectors',
    description:
      'Honest, condition-aware price guides built from real public sold listings — coins, die cast, and action figures.',
    type: 'website',
    url: SITE_URL,
    siteName: 'GrailPulse',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GrailPulse — Real-Comp Price Guides for Collectors',
    description:
      'Honest, condition-aware price guides built from real public sold listings — coins, die cast, and action figures.',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#030508',
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'GrailPulse',
  url: SITE_URL,
  description:
    'Real-comp price guides for collectors — coins, die cast, and action figures, built from real public sold listings.',
  sameAs: LIVE_VERTICALS.map((v) => v.href).filter((href): href is string => Boolean(href)),
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'GrailPulse',
  url: SITE_URL,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={outfit.variable}>
      <body>
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
        {children}
        <Script
          id="adsbygoogle-init"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1062337951127266"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}

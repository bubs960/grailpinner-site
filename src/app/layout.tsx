import type { Metadata, Viewport } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import { JsonLd } from '@/app/components/JsonLd';
import { LIVE_VERTICALS, LIVE_NAMES_PHRASE } from '@/data/verticals';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-outfit',
  display: 'swap',
});

const SITE_URL = 'https://grailpulse.com';
const SITE_DESC = `Collector price guides for ${LIVE_NAMES_PHRASE} — priced from real sales and named sources, with the method shown on every guide.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'GrailPulse — Collector Price Guides for Every Shelf',
    template: '%s | GrailPulse',
  },
  description: SITE_DESC,
  openGraph: {
    title: 'GrailPulse — Collector Price Guides for Every Shelf',
    description: SITE_DESC,
    type: 'website',
    url: SITE_URL,
    siteName: 'GrailPulse',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GrailPulse — Collector Price Guides for Every Shelf',
    description: SITE_DESC,
  },
  alternates: {
    types: {
      'application/rss+xml': [
        {
          url: '/feeds/collector-market-pulse.xml',
          title: 'GrailPulse Collector Market Pulse',
        },
      ],
    },
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
  description: SITE_DESC,
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
      <head>
        <link rel="preconnect" href="https://coins.grailpulse.com" />
        <link rel="preconnect" href="https://diecast.grailpulse.com" />
        <link rel="preconnect" href="https://figurepinner.com" />
      </head>
      <body>
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
        {children}
      </body>
    </html>
  );
}

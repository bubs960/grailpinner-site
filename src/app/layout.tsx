import type { Metadata, Viewport } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://grailpulse.com'),
  title: {
    default: 'GrailPulse — Real-Comp Price Guides for Collectors',
    template: '%s | GrailPulse',
  },
  description:
    'Honest, condition-aware price guides built from real public sold listings — coins, die cast, and action figures. The home for every GrailPulse price guide.',
  openGraph: {
    title: 'GrailPulse — Real-Comp Price Guides for Collectors',
    description:
      'Honest, condition-aware price guides built from real public sold listings — coins, die cast, and action figures.',
    type: 'website',
    url: 'https://grailpulse.com',
    siteName: 'GrailPulse',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={outfit.variable}>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1062337951127266"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

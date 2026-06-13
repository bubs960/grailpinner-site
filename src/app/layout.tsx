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
    default: 'GrailPulse — Passport for Collectors',
    template: '%s | GrailPulse',
  },
  description: 'One collector passport for coins, die cast, figures, games, and every grail you track.',
  openGraph: {
    title: 'GrailPulse — Passport for Collectors',
    description: 'One collector passport for coins, die cast, figures, games, and every grail you track.',
    type: 'website',
    url: 'https://grailpulse.com',
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
      <body style={{ background: '#030508', color: '#ffffff', fontFamily: 'var(--font-outfit, sans-serif)' }}>
        {children}
      </body>
    </html>
  );
}

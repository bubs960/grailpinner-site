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
  title: 'GrailPulse — Your Collectibles Universe',
  description: 'One vault for every collectible you love. Action figures, coins, and more.',
  openGraph: {
    title: 'GrailPulse — Your Collectibles Universe',
    description: 'One vault for every collectible you love. Action figures, coins, and more.',
    type: 'website',
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

import type { Metadata, Viewport } from 'next';
import { Outfit } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
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
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en" className={outfit.variable}>
        <body style={{ background: '#030508', color: '#ffffff', fontFamily: 'var(--font-outfit, sans-serif)' }}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

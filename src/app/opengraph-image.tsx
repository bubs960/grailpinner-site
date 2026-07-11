import { ImageResponse } from 'next/og';
import { VERTICALS, HERO_TITLE } from '@/data/verticals';

// Build-time OG/social card. The opengraph-image convention auto-wires the
// og:image + twitter:image meta tags, so no manual metadata wiring is needed.

export const dynamic = 'force-static';
export const alt = 'GrailPulse — collector price guides for every shelf';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
          padding: '84px',
          background: 'linear-gradient(135deg, #0c0d12 0%, #050608 62%)',
          color: '#f8fafc',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              background: 'linear-gradient(180deg, #f87171, #b41223)',
              marginRight: '18px',
            }}
          />
          <div style={{ fontSize: '32px', fontWeight: 700, letterSpacing: '5px' }}>GRAILPULSE</div>
        </div>

        <div
          style={{
            fontSize: '74px',
            fontWeight: 800,
            marginTop: '44px',
            maxWidth: '940px',
            lineHeight: '1.04',
            letterSpacing: '-2px',
          }}
        >
          {HERO_TITLE}
        </div>

        <div style={{ fontSize: '28px', color: '#9aa6b6', marginTop: '40px' }}>
          {`${VERTICALS.map((v) => v.name).join(' · ')} — real prices, sources named`}
        </div>
      </div>
    ),
    { ...size },
  );
}

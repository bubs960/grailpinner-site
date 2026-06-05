import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GrailPulse — Choose Your Vault',
  description: 'One collection. Every collectible you love.',
};

interface VaultCardProps {
  emoji: string;
  title: string;
  stat?: string;
  sub?: string;
  accent: string;
  href?: string;
  status: 'live' | 'coming-soon' | 'request';
  index: number;
}

function VaultCard({ emoji, title, stat, sub, accent, href, status, index }: VaultCardProps) {
  const isLive = status === 'live';
  const isComingSoon = status === 'coming-soon';
  const isRequest = status === 'request';

  const cardStyle: React.CSSProperties = {
    position: 'relative',
    background: 'rgba(255,255,255,0.03)',
    border: `1px solid rgba(255,255,255,0.08)`,
    borderRadius: '16px',
    padding: '32px 28px',
    cursor: isLive ? 'pointer' : isComingSoon ? 'default' : 'pointer',
    opacity: isComingSoon ? 0.7 : 1,
    animation: `cardFadeIn 0.5s ease forwards`,
    animationDelay: `${index * 0.08}s`,
    animationFillMode: 'both',
    overflow: 'hidden',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease, background 0.2s ease',
    minHeight: '200px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  };

  const wrapperClass = isLive
    ? 'vault-card vault-card--live'
    : isComingSoon
    ? 'vault-card vault-card--soon'
    : 'vault-card vault-card--request';

  const inner = (
    <div
      className={wrapperClass}
      style={cardStyle}
      data-accent={accent}
    >
      {/* Glow layer — revealed on hover via CSS */}
      <div
        className="card-glow"
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '16px',
          background: `radial-gradient(ellipse at 50% 120%, ${accent}22 0%, transparent 70%)`,
          opacity: 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
        }}
      />

      {/* Coming-soon overlay */}
      {isComingSoon && (
        <div
          className="coming-soon-overlay"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '16px',
            background: 'rgba(3,5,8,0.75)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            opacity: 0,
            transition: 'opacity 0.25s ease',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        >
          <span style={{ fontSize: '28px' }}>🔒</span>
          <span
            style={{
              fontSize: '13px',
              fontWeight: 600,
              color: '#9ca3af',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            Coming Soon
          </span>
          <button
            style={{
              marginTop: '4px',
              padding: '8px 20px',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '8px',
              color: '#e5e7eb',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              letterSpacing: '0.02em',
            }}
          >
            Notify Me
          </button>
        </div>
      )}

      {/* Emoji */}
      <div
        className="vault-emoji"
        style={{
          fontSize: '40px',
          lineHeight: 1,
          display: 'inline-block',
          transition: 'transform 0.3s ease',
          animation: `floatEmoji 3s ease-in-out infinite`,
          animationDelay: `${index * 0.4}s`,
          width: 'fit-content',
        }}
      >
        {emoji}
      </div>

      {/* Title */}
      <div style={{ marginTop: '8px' }}>
        <h2
          style={{
            fontSize: '20px',
            fontWeight: 700,
            color: '#f9fafb',
            margin: 0,
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </h2>
        {stat && (
          <p
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: accent,
              margin: '4px 0 0',
              letterSpacing: '0.01em',
            }}
          >
            {stat}
          </p>
        )}
        {sub && (
          <p
            style={{
              fontSize: '13px',
              color: '#9ca3af',
              margin: '4px 0 0',
              lineHeight: 1.4,
            }}
          >
            {sub}
          </p>
        )}
      </div>

      {/* Live badge */}
      {isLive && (
        <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11px',
              fontWeight: 600,
              color: '#4ade80',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#4ade80',
                display: 'inline-block',
                boxShadow: '0 0 6px #4ade80',
                animation: 'pulseDot 2s ease-in-out infinite',
              }}
            />
            Live
          </span>
        </div>
      )}

      {/* Request arrow */}
      {isRequest && (
        <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
          <span
            style={{
              fontSize: '20px',
              color: '#9ca3af',
              transition: 'transform 0.2s ease, color 0.2s ease',
            }}
            className="request-arrow"
          >
            →
          </span>
        </div>
      )}
    </div>
  );

  if (isLive && href) {
    return (
      <a
        href={href}
        style={{ textDecoration: 'none', display: 'block' }}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {inner}
      </a>
    );
  }

  return <div style={{ display: 'block' }}>{inner}</div>;
}

export default function Home() {
  const vaults: Omit<VaultCardProps, 'index'>[] = [
    {
      emoji: '🤼',
      title: 'Action Figures',
      stat: '22,000+ figures',
      sub: 'Real eBay sold prices',
      accent: '#3b82f6',
      href: 'https://figurepinner.com',
      status: 'live',
    },
    {
      emoji: '🪙',
      title: 'US Coins',
      stat: '3,300 coins',
      sub: 'Grade-stratified pricing + melt floor',
      accent: '#f59e0b',
      status: 'coming-soon',
    },
    {
      emoji: '🪆',
      title: 'Fashion Dolls',
      accent: '#ec4899',
      status: 'coming-soon',
    },
    {
      emoji: '📚',
      title: 'Graded Comics',
      accent: '#f97316',
      status: 'coming-soon',
    },
    {
      emoji: '🚗',
      title: 'Die Cast',
      accent: '#8b5cf6',
      status: 'coming-soon',
    },
    {
      emoji: '✨',
      title: 'Request a Vault',
      sub: 'What do you collect?',
      accent: '#6b7280',
      href: 'mailto:hello@grailpulse.com',
      status: 'request',
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #030508;
          color: #f9fafb;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        @keyframes cardFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes floatEmoji {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-5px); }
        }

        @keyframes pulseDot {
          0%,100% { opacity: 1; box-shadow: 0 0 6px #4ade80; }
          50%      { opacity: 0.6; box-shadow: 0 0 12px #4ade80; }
        }

        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        /* Live card hover */
        a:hover .vault-card--live,
        .vault-card--live:hover {
          transform: translateY(-8px) scale(1.01);
          border-color: rgba(255,255,255,0.18) !important;
        }
        a:hover .vault-card--live .card-glow,
        .vault-card--live:hover .card-glow {
          opacity: 1;
        }
        a:hover .vault-card--live .vault-emoji,
        .vault-card--live:hover .vault-emoji {
          transform: scale(1.2);
          animation: none !important;
        }

        /* Per-accent box-shadows on live hover */
        a:hover .vault-card--live[data-accent="#3b82f6"],
        .vault-card--live[data-accent="#3b82f6"]:hover {
          box-shadow: 0 8px 40px rgba(59,130,246,0.25), 0 0 0 1px rgba(59,130,246,0.3);
          border-color: rgba(59,130,246,0.4) !important;
        }
        a:hover .vault-card--live[data-accent="#f59e0b"],
        .vault-card--live[data-accent="#f59e0b"]:hover {
          box-shadow: 0 8px 40px rgba(245,158,11,0.25), 0 0 0 1px rgba(245,158,11,0.3);
          border-color: rgba(245,158,11,0.4) !important;
        }

        /* Coming-soon overlay on hover */
        .vault-card--soon:hover .coming-soon-overlay {
          opacity: 1 !important;
          pointer-events: auto !important;
        }

        /* Request card hover */
        .vault-card--request:hover {
          transform: translateY(-4px);
          border-color: rgba(255,255,255,0.14) !important;
          background: rgba(255,255,255,0.05) !important;
        }
        .vault-card--request:hover .request-arrow {
          transform: translateX(4px);
          color: #9ca3af !important;
        }

        /* Active press */
        a:active .vault-card--live {
          transform: translateY(-4px) scale(0.97);
        }

        /* Responsive grid */
        .vault-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        @media (max-width: 900px) {
          .vault-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 580px) {
          .vault-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div
        style={{
          minHeight: '100vh',
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(30,35,60,0.6) 0%, #030508 65%)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 40px',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '15px',
              fontWeight: 700,
              color: '#f9fafb',
              letterSpacing: '-0.01em',
            }}
          >
            <span style={{ fontSize: '18px' }}>🔮</span>
            GRAILPULSE
          </div>
          <button
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              padding: '8px 18px',
              color: '#d1d5db',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              letterSpacing: '0.01em',
              transition: 'background 0.15s ease, border-color 0.15s ease',
            }}
          >
            Sign In
          </button>
        </header>

        {/* Main */}
        <main
          style={{
            flex: 1,
            maxWidth: '1100px',
            width: '100%',
            margin: '0 auto',
            padding: '72px 40px 80px',
          }}
        >
          {/* Hero */}
          <div
            style={{
              textAlign: 'center',
              marginBottom: '64px',
            }}
          >
            <h1
              style={{
                fontSize: 'clamp(36px, 6vw, 64px)',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                color: '#f9fafb',
                margin: '0 0 16px',
              }}
            >
              Choose Your{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #f59e0b 0%, #fbbf24 30%, #fde68a 50%, #f59e0b 70%, #d97706 100%)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'shimmer 3s linear infinite',
                  display: 'inline-block',
                }}
              >
                Vault
              </span>
            </h1>
            <p
              style={{
                fontSize: '18px',
                color: '#9ca3af',
                fontWeight: 400,
                letterSpacing: '0.01em',
              }}
            >
              One collection. Every collectible you love.
            </p>
          </div>

          {/* Vault grid */}
          <div className="vault-grid">
            {vaults.map((vault, i) => (
              <VaultCard key={vault.title} {...vault} index={i} />
            ))}
          </div>

          {/* Portfolio strip (signed-out placeholder) */}
          <div
            style={{
              marginTop: '60px',
              padding: '24px 28px',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <p
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#9ca3af',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '4px',
                }}
              >
                Your Portfolio
              </p>
              <p
                style={{
                  fontSize: '16px',
                  color: '#9ca3af',
                  fontWeight: 400,
                }}
              >
                Sign in to track your collection across all vaults
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                gap: '32px',
                alignItems: 'center',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <p
                  style={{
                    fontSize: '22px',
                    fontWeight: 800,
                    color: '#9ca3af',
                    letterSpacing: '-0.02em',
                  }}
                >
                  — items
                </p>
                <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '2px' }}>
                  Tracked
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p
                  style={{
                    fontSize: '22px',
                    fontWeight: 800,
                    color: '#9ca3af',
                    letterSpacing: '-0.02em',
                  }}
                >
                  $—
                </p>
                <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '2px' }}>
                  Est. Value
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer
          style={{
            borderTop: '1px solid rgba(255,255,255,0.05)',
            padding: '20px 40px',
            textAlign: 'center',
            fontSize: '13px',
            color: '#9ca3af',
            letterSpacing: '0.02em',
          }}
        >
          GrailPulse &copy; 2026 &middot; All your collectibles, one place
        </footer>
      </div>
    </>
  );
}

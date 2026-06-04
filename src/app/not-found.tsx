import Link from 'next/link';

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: '#0a0a0a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        color: '#e5e5e5',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <div
        style={{
          fontSize: '6rem',
          fontWeight: 800,
          letterSpacing: '-0.04em',
          lineHeight: 1,
          color: '#2a2a2a',
          marginBottom: '1rem',
          userSelect: 'none',
        }}
      >
        404
      </div>
      <h1
        style={{
          fontSize: '1.5rem',
          fontWeight: 600,
          margin: '0 0 0.5rem',
          color: '#e5e5e5',
        }}
      >
        Vault Not Found
      </h1>
      <p
        style={{
          fontSize: '1rem',
          color: '#6b6b6b',
          marginBottom: '2rem',
          maxWidth: '360px',
        }}
      >
        This page doesn&apos;t exist or was moved. Head back to the vault.
      </p>
      <Link
        href="/"
        style={{
          display: 'inline-block',
          padding: '0.65rem 1.5rem',
          backgroundColor: '#1a1a1a',
          border: '1px solid #2e2e2e',
          borderRadius: '8px',
          color: '#e5e5e5',
          textDecoration: 'none',
          fontSize: '0.9rem',
          fontWeight: 500,
          transition: 'border-color 0.15s',
        }}
      >
        Back to GrailPinner
      </Link>
    </main>
  );
}

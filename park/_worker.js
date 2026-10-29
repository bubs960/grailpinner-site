// GrailPulse coming-soon router (parked 2026-10-29; un-park = redeploy tag parked-2026-10-29).
// Only "/", "/robots.txt" and "/sitemap.xml" are served; every other path 302s to "/".
const SERVE = new Set(['/', '/robots.txt', '/sitemap.xml']);

// Security headers (audit P1, 2026-10-29): the old apps shipped these via _headers / Next
// middleware; the park bundle must not regress them. The page has no scripts and one inline
// <style>, so the CSP is enforced, not report-only.
const SECURITY_HEADERS = {
  'Content-Security-Policy':
    "default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; " +
    "base-uri 'self'; frame-ancestors 'none'; object-src 'none'; form-action 'self'",
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
};

function withHeaders(response) {
  const headers = new Headers(response.headers);
  for (const [k, v] of Object.entries(SECURITY_HEADERS)) headers.set(k, v);
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

function redirect(location) {
  return withHeaders(new Response(null, { status: 302, headers: { Location: location } }));
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (!SERVE.has(url.pathname)) {
      return redirect(url.origin + '/');
    }
    if (url.search) {
      return redirect(url.origin + url.pathname);
    }
    return withHeaders(await env.ASSETS.fetch(request));
  },
};

// GrailPulse coming-soon router (parked 2026-10-29; un-park = redeploy tag parked-2026-10-29).
// Only "/", "/robots.txt" and "/sitemap.xml" are served; every other path 302s to "/".
const SERVE = new Set(['/', '/robots.txt', '/sitemap.xml']);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (!SERVE.has(url.pathname)) {
      return Response.redirect(url.origin + '/', 302);
    }
    if (url.search) {
      return Response.redirect(url.origin + url.pathname, 302);
    }
    return env.ASSETS.fetch(request);
  },
};

import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const baseUrl = 'https://grailpulse.com';
const lastModified = new Date('2026-06-09');

export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', '/methodology', '/verticals', '/trust', '/terms', '/privacy'].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified,
  }));
}

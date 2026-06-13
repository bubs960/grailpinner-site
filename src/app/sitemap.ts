import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const baseUrl = 'https://grailpulse.com';

type SitemapEntry = MetadataRoute.Sitemap[number];

const PAGES: Array<{
  path: string;
  changeFrequency: SitemapEntry['changeFrequency'];
  priority: number;
}> = [
  { path: '/', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/verticals', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/methodology', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/trust', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Build-time date so the sitemap reflects each deploy rather than a frozen literal.
  const lastModified = new Date();
  return PAGES.map(({ path, changeFrequency, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}

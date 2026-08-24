import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

/** Landing page de página única: o sitemap tem uma única entrada. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}

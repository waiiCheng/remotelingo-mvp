import { MetadataRoute } from 'next';
import JOBS_DATA from '@/lib/jobsData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://remotelingo.com';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/apply`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/apply-info`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Dynamic job pages - ALL active jobs from JOBS_DATA
  const jobPages: MetadataRoute.Sitemap = JOBS_DATA.map((job) => ({
    url: `${baseUrl}/jobs/${job.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: job.featured ? 0.9 : 0.8, // Featured jobs get higher priority
  }));

  // Combine all pages
  return [...staticPages, ...jobPages];
}

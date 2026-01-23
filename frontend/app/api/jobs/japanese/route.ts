import { NextResponse } from 'next/server';
import JOBS_DATA from '@/lib/jobsData';

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

export async function GET(request: Request) {
  try {
    // Filter only Japanese language jobs
    const japaneseJobs = JOBS_DATA.filter(job =>
      job.languages.some(lang =>
        lang.toLowerCase().includes('japanese') || lang.toLowerCase().includes('日本語')
      )
    );

    // Transform to Sekaidaisuki-friendly format
    const cleanJobs = japaneseJobs.map(job => ({
      id: job.id,
      title: job.title,
      company: job.company,
      location: {
        full: job.location,
        country: job.location.includes('Cyprus') ? 'Cyprus' :
                 job.location.includes('Malta') ? 'Malta' :
                 job.location.includes('Remote') ? 'Remote' : 'International',
        relocation_support: job.location.toLowerCase().includes('relocation') ||
                           job.location.toLowerCase().includes('visa') ||
                           job.tags?.some(t => t.toLowerCase().includes('visa'))
      },
      salary: {
        min: job.salary_min,
        max: job.salary_max,
        currency: job.currency,
        period: 'annual',
        display: `${job.currency === 'EUR' ? '€' : '$'}${job.salary_min.toLocaleString()} - ${job.salary_max.toLocaleString()}`
      },
      employment_type: job.type,
      languages: job.languages.map(lang => ({
        name: lang,
        required: true,
        level: lang.toLowerCase().includes('japanese') ? 'native' : 'business'
      })),
      description: job.summary || job.title,
      tags: job.tags || [],
      benefits: job.tags?.filter(tag =>
        tag.toLowerCase().includes('visa') ||
        tag.toLowerCase().includes('relocation') ||
        tag.toLowerCase().includes('insurance') ||
        tag.toLowerCase().includes('car')
      ) || [],
      posted_date: job.posted_at,
      featured: job.featured,
      verified: job.ai_verified,
      priority: job.status === 'priority',
      apply_url: job.apply_url,
      source: job.source
    }));

    // Sort: Priority first, then featured, then by match score
    cleanJobs.sort((a, b) => {
      if (a.priority && !b.priority) return -1;
      if (!a.priority && b.priority) return 1;
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });

    return NextResponse.json(
      {
        meta: {
          total_jobs: cleanJobs.length,
          language: 'Japanese',
          last_updated: new Date().toISOString(),
          feed_url: `${request.url}`,
          note: 'Jobs requiring Japanese language skills - curated by RemoteLingo'
        },
        jobs: cleanJobs
      },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200'
        }
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to fetch Japanese jobs',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

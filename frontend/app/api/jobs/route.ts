import { NextResponse } from 'next/server';
import JOBS_DATA from '@/lib/jobsData';

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

export async function GET(request: Request) {
  try {
    // Get URL params for filtering
    const { searchParams } = new URL(request.url);
    const langFilter = searchParams.get('lang');
    const statusFilter = searchParams.get('status');
    const featured = searchParams.get('featured');

    // Start with all jobs
    let filteredJobs = [...JOBS_DATA];

    // Filter by language if specified
    if (langFilter && langFilter !== 'all') {
      filteredJobs = filteredJobs.filter(job =>
        job.languages.some(lang =>
          lang.toLowerCase().includes(langFilter.toLowerCase())
        )
      );
    }

    // Filter by status if specified
    if (statusFilter) {
      filteredJobs = filteredJobs.filter(job => job.status === statusFilter);
    }

    // Filter featured only if specified
    if (featured === 'true') {
      filteredJobs = filteredJobs.filter(job => job.featured === true);
    }

    // Transform data to clean API format
    const cleanJobs = filteredJobs.map(job => ({
      id: job.id,
      title: job.title,
      company: job.company,
      location: job.location,
      employment_type: job.type,
      languages: job.languages,
      level: job.level,
      salary: {
        min: job.salary_min,
        max: job.salary_max,
        currency: job.currency,
        period: 'annual'
      },
      description: job.summary || '',
      tags: job.tags || [],
      posted_at: job.posted_at,
      featured: job.featured,
      ai_verified: job.ai_verified,
      status: job.status || null,
      source: job.source,
      match_score: job.match_score,
      apply_url: job.apply_url
    }));

    // Return JSON response with metadata
    return NextResponse.json(
      {
        meta: {
          total_jobs: cleanJobs.length,
          last_updated: new Date().toISOString(),
          feed_url: `${request.url}`,
          filters_applied: {
            language: langFilter || 'all',
            status: statusFilter || 'all',
            featured_only: featured === 'true'
          }
        },
        jobs: cleanJobs
      },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200'
        }
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to fetch jobs',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

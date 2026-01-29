import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JOBS_DATA from '@/lib/jobsData';
import JobDetailClient from './JobDetailClient';

// Generate static params for all jobs (SSG)
export async function generateStaticParams() {
  return JOBS_DATA.map((job) => ({
    id: job.id.toString(),
  }));
}

// Generate dynamic metadata for SEO (English default, will be enhanced client-side)
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const job = JOBS_DATA.find((j) => j.id.toString() === params.id);

  if (!job) {
    return {
      title: 'Job Not Found | RemoteLingo',
    };
  }

  const description = typeof job.summary === 'string'
    ? job.summary
    : job.summary?.en || `Hiring ${job.title} for ${job.location}. Full relocation package provided. Apply now.`;

  return {
    title: `${job.title} - High Salary & Visa Support | RemoteLingo`,
    description: description.slice(0, 160),
    openGraph: {
      title: `${job.title} at ${job.company}`,
      description: description.slice(0, 160),
      type: 'website',
      url: `https://remotelingo.com/jobs/${job.id}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${job.title} at ${job.company}`,
      description: description.slice(0, 160),
    },
  };
}

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const job = JOBS_DATA.find((j) => j.id.toString() === params.id);

  if (!job) {
    notFound();
  }

  // Pass full job data to client component
  // Client component will handle language-specific JSON-LD injection
  return <JobDetailClient job={job} />;
}

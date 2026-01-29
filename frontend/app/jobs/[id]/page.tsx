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

  // Generate Google Jobs JSON-LD for server-side rendering (English default for SEO)
  const description = typeof job.summary === 'string'
    ? job.summary
    : job.summary?.en || `Join ${job.company} as ${job.title}. Location: ${job.location}. Languages required: ${job.languages.join(', ')}.`;

  // Extract location (remove parentheses content)
  const cleanLocation = job.location.split('(')[0].trim();

  // Generate datePosted
  const datePosted = new Date().toISOString().split('T')[0];

  const jobPostingSchema = {
    '@context': 'https://schema.org/',
    '@type': 'JobPosting',
    title: job.title,
    description: description,
    datePosted: datePosted,
    validThrough: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    hiringOrganization: {
      '@type': 'Organization',
      name: 'RemoteLingo',
      sameAs: 'https://remotelingo.com',
      logo: 'https://remotelingo.com/logo.png',
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: cleanLocation.split(',')[0].trim(),
        addressCountry: cleanLocation.split(',')[1]?.trim() || cleanLocation,
      },
    },
    employmentType: job.type === 'Full-time' ? 'FULL_TIME' : job.type === 'Part-time' ? 'PART_TIME' : 'CONTRACTOR',
    ...(job.salary_min && job.salary_max && {
      baseSalary: {
        '@type': 'MonetaryAmount',
        currency: job.currency,
        value: {
          '@type': 'QuantitativeValue',
          minValue: job.salary_min,
          maxValue: job.salary_max,
          unitText: 'YEAR',
        },
      },
    }),
    ...(job.apply_url && {
      directApply: true,
      applicationContact: {
        '@type': 'ContactPoint',
        url: job.apply_url,
      },
    }),
    inLanguage: 'en', // Default to English for server-side rendering
  };

  return (
    <>
      {/* Server-side rendered JSON-LD for Google crawlers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }}
      />

      {/* Client component for interactive UI and language switching */}
      <JobDetailClient job={job} />
    </>
  );
}

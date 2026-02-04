import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLandingPageBySlug, getAllLandingPageSlugs } from '@/config/seo-landing-pages';
import SEOLandingPageView from './SEOLandingPageView';

// ========================================
// STATIC SITE GENERATION
// ========================================
export async function generateStaticParams() {
  const slugs = getAllLandingPageSlugs();
  return slugs.map((slug) => ({
    topic: slug,
  }));
}

// ========================================
// DYNAMIC METADATA GENERATION
// ========================================
export async function generateMetadata({ params }: { params: { topic: string } }): Promise<Metadata> {
  const config = getLandingPageBySlug(params.topic);

  if (!config) {
    return {
      title: 'Page Not Found',
    };
  }

  return {
    title: config.title,
    description: config.description,
    keywords: [config.targetKeyword, ...(config.secondaryKeywords || [])].join(', '),
    openGraph: {
      title: config.title,
      description: config.description,
      type: 'website',
      locale: 'ko_KR',
      url: `https://remotelingo.com/ko/${params.topic}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
    },
    alternates: {
      canonical: `https://remotelingo.com/ko/${params.topic}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

// ========================================
// PAGE COMPONENT
// ========================================
export default function SEOLandingPage({ params }: { params: { topic: string } }) {
  const config = getLandingPageBySlug(params.topic);

  // 404 handling
  if (!config) {
    notFound();
  }

  // Render the view component
  return <SEOLandingPageView config={config} />;
}

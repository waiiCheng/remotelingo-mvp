import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, MapPin, Briefcase } from 'lucide-react';
import { getLandingPageBySlug, getAllLandingPageSlugs } from '@/config/seo-landing-pages';
import JOBS_DATA from '@/lib/jobsData';
import JobCard from '@/components/JobCard';

// ========================================
// GENERATE STATIC PARAMS (SSG)
// ========================================
export async function generateStaticParams() {
  const slugs = getAllLandingPageSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

// ========================================
// GENERATE METADATA (SEO)
// ========================================
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const config = getLandingPageBySlug(params.slug);

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
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
    },
    alternates: {
      canonical: `https://remotelingo.com/ko/${params.slug}`,
    },
  };
}

// ========================================
// FILTER JOBS BASED ON CONFIG
// ========================================
function filterJobs(config: ReturnType<typeof getLandingPageBySlug>) {
  if (!config) return [];

  return JOBS_DATA.filter((job) => {
    // Safety check
    if (!job) return false;

    switch (config.contentFilter.type) {
      case 'location':
        return job.location?.toLowerCase().includes(config.contentFilter.value.toLowerCase()) || false;

      case 'tag':
        return job.tags?.some(tag =>
          tag?.toLowerCase().includes(config.contentFilter.value.toLowerCase())
        ) || false;

      case 'language':
        return job.languages?.some(lang =>
          lang?.toLowerCase().includes(config.contentFilter.value.toLowerCase())
        ) || false;

      case 'perk':
        // Check if job has relocation support or visa sponsorship
        if (config.contentFilter.value.toLowerCase() === 'relocation') {
          const hasPerkInTags = job.tags?.some(tag =>
            tag?.toLowerCase().includes('visa') ||
            tag?.toLowerCase().includes('relocation')
          ) || false;

          const hasPerkInLocation = job.location?.toLowerCase().includes('sponsorship') || false;

          return hasPerkInTags || hasPerkInLocation;
        }
        return false;

      default:
        return false;
    }
  });
}

// ========================================
// LANDING PAGE COMPONENT
// ========================================
export default function SEOLandingPage({ params }: { params: { slug: string } }) {
  const config = getLandingPageBySlug(params.slug);

  if (!config) {
    notFound();
  }

  const filteredJobs = filterJobs(config);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Back to Home Link */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft size={16} />
            메인 페이지로 돌아가기
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          {/* Breadcrumb */}
          <div className="text-sm text-slate-600 mb-4">
            <Link href="/" className="hover:text-blue-600">홈</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-900 font-medium">{config.targetKeyword}</span>
          </div>

          {/* H1 Title */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight" style={{ wordBreak: 'keep-all', lineHeight: '1.3' }}>
            {config.title.split('|')[0].trim()}
          </h1>

          {/* Hero Copy */}
          <p className="text-lg md:text-xl text-slate-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            {config.heroCopy}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">{filteredJobs.length}개</div>
              <div className="text-sm text-slate-600">채용 공고</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">100%</div>
              <div className="text-sm text-slate-600">비자 지원</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">무료</div>
              <div className="text-sm text-slate-600">항공권·숙소</div>
            </div>
          </div>

          {/* CTA Button */}
          <a
            href="#jobs"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
          >
            채용 공고 보기
            <CheckCircle2 size={20} />
          </a>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white border-b border-slate-200 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
            RemoteLingo를 통한 혜택
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle2 className="text-blue-600" size={24} />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">비자 스폰서십</h3>
              <p className="text-sm text-slate-600">
                복잡한 비자 신청 절차를 기업이 전액 지원. 합법적인 취업 비자로 안심하고 근무하세요.
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="text-emerald-600" size={24} />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">정착 지원 패키지</h3>
              <p className="text-sm text-slate-600">
                항공권, 초기 숙소, 현지 오리엔테이션까지. 걱정 없이 새로운 시작을 준비하세요.
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Briefcase className="text-purple-600" size={24} />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">정규직 계약</h3>
              <p className="text-sm text-slate-600">
                단순 아르바이트가 아닌 정규직 포지션. 안정적인 커리어를 쌓으세요.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Jobs Section */}
      <div id="jobs" className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            {config.targetKeyword} 채용 공고
          </h2>
          <p className="text-slate-600">
            총 {filteredJobs.length}개의 포지션이 당신을 기다리고 있습니다
          </p>
        </div>

        {/* Job Cards */}
        <div className="space-y-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} language="kr" />
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
              <p className="text-slate-600 mb-4">
                현재 이 카테고리에 해당하는 채용 공고가 없습니다.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                전체 채용 공고 보기
              </Link>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            지금 바로 지원하세요
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            모든 포지션은 비자, 항공권, 숙소를 100% 지원합니다. 한국어 네이티브라면 누구나 지원 가능합니다.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-lg"
          >
            전체 채용 공고 보기
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-slate-500">
          <p>&copy; 2025 RemoteLingo Inc. • Premium Global Career Platform</p>
        </div>
      </div>
    </div>
  );
}

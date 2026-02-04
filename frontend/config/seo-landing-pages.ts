// Programmatic SEO Landing Pages Configuration
// Scalable, data-driven approach for Korean market SEO

export interface SEOLandingPage {
  slug: string;                    // URL path (e.g., 'malta-jobs')
  targetKeyword: string;           // Primary SEO keyword
  title: string;                   // H1 and Meta Title (optimized for CTR)
  description: string;             // Meta Description (150-160 chars)
  contentFilter: {
    type: 'location' | 'tag' | 'language' | 'perk';
    value: string;                 // Filter value to match job data
  };
  heroCopy: string;                // Compelling intro text for hero section
  secondaryKeywords?: string[];    // Additional keywords for content optimization
}

// ========================================
// SEO LANDING PAGES - KOREAN MARKET
// ========================================
export const SEO_LANDING_PAGES: SEOLandingPage[] = [
  // 1. Malta Jobs (몰타 취업)
  {
    slug: 'malta-jobs',
    targetKeyword: '몰타 취업',
    title: '몰타 취업 완벽 가이드 | 한국어 가능 정규직 채용 (비자/숙소 지원)',
    description: '몰타 현지 기업 한국어 채용 정보. 비자 스폰서십, 항공권, 숙소 100% 지원. 게임/IT/고객지원 분야 정규직 포지션. 지금 지원하세요!',
    contentFilter: {
      type: 'location',
      value: 'Malta'
    },
    heroCopy: '지중해의 보석 몰타에서 시작하는 글로벌 커리어. 영어권 국가, 낮은 세율, 완벽한 날씨. 한국어를 사용하는 정규직 포지션을 지금 확인하세요.',
    secondaryKeywords: ['몰타 일자리', '몰타 한국인 채용', '몰타 이민', '몰타 워킹홀리데이']
  },

  // 2. Cyprus Jobs (키프로스 취업)
  {
    slug: 'cyprus-jobs',
    targetKeyword: '키프로스 취업',
    title: '키프로스 취업 | 유럽 IT/미디어 기업 한국어 채용 (비자 지원)',
    description: '키프로스 현지 글로벌 기업 채용. 연봉 €30k-€50k, 비자/항공/숙소 전액 지원. IT, 게임, 고객지원 분야. 한국어 네이티브 우대.',
    contentFilter: {
      type: 'location',
      value: 'Cyprus'
    },
    heroCopy: '유럽연합 회원국 키프로스에서 글로벌 커리어를 쌓으세요. 낮은 생활비, 따뜻한 기후, 영어 사용 환경. 한국어 인재를 찾는 글로벌 기업들이 기다립니다.',
    secondaryKeywords: ['키프로스 채용', '키프로스 한국인', '키프로스 이민', '키프로스 일자리']
  },

  // 3. Europe Working Holiday (유럽 워홀)
  {
    slug: 'working-holiday-europe',
    targetKeyword: '유럽 워킹홀리데이',
    title: '유럽 워킹홀리데이 대안 | 정규직 취업으로 장기 체류 (비자 지원)',
    description: '워홀 대신 정규직 취업! 비자 스폰서십으로 장기 체류 가능. 몰타/키프로스 글로벌 기업 채용. 항공권, 숙소, 정착 지원 포함.',
    contentFilter: {
      type: 'perk',
      value: 'Relocation'
    },
    heroCopy: '워킹홀리데이보다 더 나은 선택. 정규직 계약으로 안정적인 유럽 생활을 시작하세요. 비자 걱정 없이, 커리어를 쌓으며, 유럽에서 장기 체류할 수 있습니다.',
    secondaryKeywords: ['유럽 워홀', '해외 워킹홀리데이', '유럽 장기체류', '유럽 취업']
  },

  // 4. Overseas Internship (해외 인턴십)
  {
    slug: 'overseas-internship',
    targetKeyword: '해외 인턴십',
    title: '유럽 해외 인턴십 | 글로벌 기업 정규직 전환 프로그램 (비자 지원)',
    description: '유럽 현지 기업 인턴십 프로그램. 정규직 전환 가능. 비자, 항공권, 숙소 지원. IT, 게임, 미디어 분야. 한국어 가능자 우대.',
    contentFilter: {
      type: 'tag',
      value: 'Entry Level'
    },
    heroCopy: '글로벌 커리어의 첫 걸음을 유럽에서 시작하세요. 실무 경험, 정규직 전환 기회, 완벽한 정착 지원. 한국어를 사용하는 인턴십 포지션을 확인하세요.',
    secondaryKeywords: ['해외 인턴', '유럽 인턴십', '글로벌 인턴', '해외 취업 준비']
  },

  // 5. Visa Sponsorship (비자 스폰서십)
  {
    slug: 'visa-sponsorship-jobs',
    targetKeyword: '비자 스폰서십',
    title: '비자 스폰서십 제공 해외 취업 | 유럽 정규직 채용 (100% 지원)',
    description: '비자 걱정 없는 해외 취업! 유럽 기업이 비자 신청부터 발급까지 전액 지원. 몰타, 키프로스 정규직 포지션. 한국어 네이티브 환영.',
    contentFilter: {
      type: 'tag',
      value: 'Visa'
    },
    heroCopy: '복잡한 비자 절차, 기업이 모두 해결해드립니다. 비자 신청, 서류 준비, 발급까지 전액 지원. 합법적인 취업 비자로 안심하고 유럽 생활을 시작하세요.',
    secondaryKeywords: ['비자 지원', '취업 비자', '해외 비자', '유럽 비자']
  },

  // 6. Game Presenter (게임 프리젠터)
  {
    slug: 'game-presenter-jobs',
    targetKeyword: '게임 프리젠터',
    title: '게임 프리젠터 채용 | 라이브 딜러 한국어 포지션 (몰타/키프로스)',
    description: '라이브 게임 진행자 모집. 연봉 €30k-€48k, 보너스 별도. 미경험 환영, 완벽한 연수 제공. 비자, 항공권, 숙소 전액 지원. 한국어 네이티브 필수.',
    contentFilter: {
      type: 'tag',
      value: 'Gaming'
    },
    heroCopy: '카메라 앞에서 게임을 진행하는 특별한 직업. 프로그래밍 불필요, 한국어만 잘하면 OK. 글로벌 게임 기업에서 경력을 쌓으세요. 미경험자도 환영합니다.',
    secondaryKeywords: ['라이브 딜러', '온라인 카지노 채용', '게임 호스트', '라이브 게임 진행자']
  }
];

// ========================================
// HELPER FUNCTIONS
// ========================================

/**
 * Get landing page config by slug
 */
export function getLandingPageBySlug(slug: string): SEOLandingPage | undefined {
  return SEO_LANDING_PAGES.find(page => page.slug === slug);
}

/**
 * Get all landing page slugs (for sitemap generation)
 */
export function getAllLandingPageSlugs(): string[] {
  return SEO_LANDING_PAGES.map(page => page.slug);
}

/**
 * Get landing pages by filter type
 */
export function getLandingPagesByFilterType(type: SEOLandingPage['contentFilter']['type']): SEOLandingPage[] {
  return SEO_LANDING_PAGES.filter(page => page.contentFilter.type === type);
}

// ========================================
// EXPORT DEFAULT FOR EASY IMPORT
// ========================================
export default SEO_LANDING_PAGES;

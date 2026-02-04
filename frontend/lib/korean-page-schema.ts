// JSON-LD Schema for Korean Main Page
// Tells Google this page covers multiple job categories

export const KOREAN_PAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "RemoteLingo | 유럽 해외취업 & 한국어 정규직 채용",
  "description": "몰타, 키프로스, 유럽 전역의 한국어 채용 정보. 비자/항공/숙소 100% 지원.",
  "url": "https://remotelingo.com/ko",
  "inLanguage": "ko-KR",
  "about": [
    {
      "@type": "JobPosting",
      "title": "몰타 취업 기회",
      "description": "몰타 현지 기업 한국어 채용. 비자 스폰서십, 항공권, 숙소 지원.",
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "MT",
          "addressLocality": "Malta"
        }
      },
      "hiringOrganization": {
        "@type": "Organization",
        "name": "RemoteLingo"
      }
    },
    {
      "@type": "JobPosting",
      "title": "키프로스 취업 기회",
      "description": "키프로스 현지 글로벌 기업 채용. 연봉 €30k-€50k, 비자/항공/숙소 지원.",
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "CY",
          "addressLocality": "Cyprus"
        }
      },
      "hiringOrganization": {
        "@type": "Organization",
        "name": "RemoteLingo"
      }
    },
    {
      "@type": "JobPosting",
      "title": "유럽 워킹홀리데이 대안",
      "description": "정규직 취업으로 장기 체류. 비자 스폰서십 제공.",
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressRegion": "Europe"
        }
      },
      "hiringOrganization": {
        "@type": "Organization",
        "name": "RemoteLingo"
      }
    },
    {
      "@type": "JobPosting",
      "title": "해외 인턴십 프로그램",
      "description": "유럽 현지 기업 인턴십. 정규직 전환 가능.",
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressRegion": "Europe"
        }
      },
      "hiringOrganization": {
        "@type": "Organization",
        "name": "RemoteLingo"
      }
    },
    {
      "@type": "JobPosting",
      "title": "비자 스폰서십 제공 채용",
      "description": "비자 신청부터 발급까지 전액 지원. 합법적인 취업 비자.",
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressRegion": "Europe"
        }
      },
      "hiringOrganization": {
        "@type": "Organization",
        "name": "RemoteLingo"
      }
    },
    {
      "@type": "JobPosting",
      "title": "게임 프리젠터 채용",
      "description": "라이브 게임 진행자 모집. 연봉 €30k-€48k, 미경험 환영.",
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "MT",
          "addressLocality": "Malta"
        }
      },
      "hiringOrganization": {
        "@type": "Organization",
        "name": "RemoteLingo"
      }
    }
  ],
  "keywords": "몰타 취업, 키프로스 취업, 유럽 워킹홀리데이, 해외 인턴십, 비자 스폰서십, 게임 프리젠터, 해외취업, 유럽취업, 한국어채용"
};

export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "RemoteLingo",
  "url": "https://remotelingo.com",
  "logo": "https://remotelingo.com/logo.png",
  "description": "Premium global career platform connecting Korean speakers with European opportunities",
  "sameAs": [
    "https://twitter.com/remotelingo",
    "https://linkedin.com/company/remotelingo"
  ]
};

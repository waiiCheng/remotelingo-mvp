// JSON-LD Schema for Korean Main Page
// Optimized with professional keyword matrix

export const KOREAN_PAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "RemoteLingo | 유럽 글로벌 미디어 전문가 커리어 & 정규직 채용",
  "description": "몰타, 키프로스, 아르메니아 글로벌 미디어 기업 정규직 채용. 비자 스폰서십, 항공권, 숙식 제공. 영어 실력 향상, 세금 혜택, 워라밸 보장.",
  "url": "https://remotelingo.com/ko",
  "inLanguage": "ko-KR",
  "about": [
    {
      "@type": "JobPosting",
      "title": "몰타 글로벌 미디어 전문가 채용",
      "description": "유럽 게이밍 그룹 정규직 포지션. 비자 스폰서십, 항공권, 숙식 제공. 영어 실력 향상 기회.",
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
      },
      "employmentType": "FULL_TIME",
      "baseSalary": {
        "@type": "MonetaryAmount",
        "currency": "EUR",
        "value": {
          "@type": "QuantitativeValue",
          "minValue": 30000,
          "maxValue": 50000,
          "unitText": "YEAR"
        }
      }
    },
    {
      "@type": "JobPosting",
      "title": "키프로스 글로벌 미디어 전문가 채용",
      "description": "유럽 현지 기업 정규직. 세금 혜택, 워라밸 보장. 비자/항공/숙식 100% 지원.",
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
      },
      "employmentType": "FULL_TIME"
    },
    {
      "@type": "JobPosting",
      "title": "아르메니아 글로벌 미디어 전문가 채용",
      "description": "유럽 게이밍 그룹 정규직. 낮은 생활비, 높은 저축률. 비자 스폰서십 제공.",
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "AM",
          "addressLocality": "Armenia"
        }
      },
      "hiringOrganization": {
        "@type": "Organization",
        "name": "RemoteLingo"
      },
      "employmentType": "FULL_TIME"
    },
    {
      "@type": "Service",
      "name": "해외 취업 커리어 매칭",
      "description": "유럽 생활과 글로벌 커리어를 위한 프리미엄 매칭 서비스"
    }
  ],
  "keywords": "유럽 워킹홀리데이, 해외 취업, 유럽 생활, 몰타 취업, 키프로스 취업, 아르메니아 취업, 숙식 제공, 항공권 지원, 글로벌 미디어 전문가, 유럽 게이밍 그룹, 영어 실력 향상, 세금 혜택, 워라밸, 비자 스폰서십, 정규직, 커리어 발전"
};

export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "RemoteLingo",
  "url": "https://remotelingo.com",
  "logo": "https://remotelingo.com/logo.png",
  "description": "유럽 글로벌 미디어 기업 프리미엄 커리어 매칭 플랫폼. 정규직 채용, 비자/항공/숙식 100% 지원.",
  "sameAs": [
    "https://twitter.com/remotelingo",
    "https://linkedin.com/company/remotelingo"
  ]
};

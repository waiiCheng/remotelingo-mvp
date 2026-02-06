import './globals.css'
import { Inter } from 'next/font/google'
import { KOREAN_PAGE_SCHEMA, ORGANIZATION_SCHEMA } from '@/lib/korean-page-schema'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

// Google Analytics ID - Replace with your actual GA4 ID
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'

export const metadata = {
  title: 'RemoteLingo | 유럽 글로벌 미디어 전문가 커리어 (정규직·비자·숙식 제공)',
  description: '몰타·키프로스·아르메니아 유럽 게이밍 그룹 정규직 채용. 비자 스폰서십, 항공권, 숙식 제공. 영어 실력 향상, 세금 혜택, 워라밸 보장. 한국보다 빠른 자산 축적.',
  keywords: '유럽 워킹홀리데이, 해외 취업, 유럽 생활, 몰타 취업, 키프로스 취업, 아르메니아 취업, 숙식 제공, 항공권 지원, 글로벌 미디어 전문가, 유럽 게이밍 그룹, 영어 실력 향상, 세금 혜택, 워라밸, 비자 스폰서십, 정규직, 커리어 발전, 자산 축적',
  openGraph: {
    title: 'RemoteLingo | 유럽 글로벌 미디어 전문가 커리어',
    description: '몰타·키프로스·아르메니아 유럽 게이밍 그룹 정규직. 비자/항공/숙식 제공. 영어 실력 향상, 세금 혜택, 워라밸 보장.',
    type: 'website',
    locale: 'ko_KR',
    url: 'https://remotelingo.com/ko',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RemoteLingo | 유럽 글로벌 미디어 전문가 커리어',
    description: '몰타·키프로스·아르메니아 유럽 게이밍 그룹 정규직. 비자/항공/숙식 제공.',
  },
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="%232563eb"/><text x="50" y="50" font-family="Arial,sans-serif" font-size="45" font-weight="bold" text-anchor="middle" dominant-baseline="middle" fill="white">RL</text></svg>',
        type: 'image/svg+xml',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />

        {/* JSON-LD Schema for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(KOREAN_PAGE_SCHEMA),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ORGANIZATION_SCHEMA),
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

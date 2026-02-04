import './globals.css'
import { Inter } from 'next/font/google'
import { KOREAN_PAGE_SCHEMA, ORGANIZATION_SCHEMA } from '@/lib/korean-page-schema'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

// Google Analytics ID - Replace with your actual GA4 ID
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'

export const metadata = {
  title: 'RemoteLingo | 유럽 해외취업 & 한국어 정규직 채용 (비자/숙소 지원)',
  description: '몰타 취업, 키프로스 취업, 유럽 워킹홀리데이, 해외 인턴십, 비자 스폰서십, 게임 프리젠터. 삼성전자, CreedRoomz 등 유럽 현지 IT/미디어 기업 채용 정보. 한국어 가능자 모집, 항공권 및 숙소 100% 지원.',
  keywords: '몰타 취업, 키프로스 취업, 유럽 워킹홀리데이, 해외 인턴십, 비자 스폰서십, 게임 프리젠터, 해외취업, 유럽취업, 한국어채용, 몰타 일자리, 키프로스 채용, 라이브 딜러, 온라인 카지노 채용',
  openGraph: {
    title: 'RemoteLingo | 유럽 해외취업 & 한국어 정규직 채용',
    description: '몰타, 키프로스, 유럽 전역의 한국어 채용 정보. 비자/항공/숙소 100% 지원.',
    type: 'website',
    locale: 'ko_KR',
    url: 'https://remotelingo.com/ko',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RemoteLingo | 유럽 해외취업 & 한국어 정규직 채용',
    description: '몰타, 키프로스, 유럽 전역의 한국어 채용 정보. 비자/항공/숙소 100% 지원.',
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

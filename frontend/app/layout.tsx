import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '한국어 하나로 시작하는 유럽 글로벌 커리어 | 디지털 미디어 & IT',
  description: '삼성전자, CreedRoomz 등 유럽 Top-tier 미디어/IT 기업 공식 파트너. 비자/항공/숙소 100% 지원. 프리미엄 글로벌 커리어 매칭 플랫폼.',
  keywords: '해외취업, 유럽취업, IT채용, 미디어산업, 글로벌커리어, 비자지원, 해외이직, 프리미엄채용',
  openGraph: {
    title: '한국어 하나로 시작하는 유럽 글로벌 커리어',
    description: '삼성전자, CreedRoomz 등 유럽 Top-tier 미디어/IT 기업 공식 파트너. 비자/항공/숙소 100% 지원.',
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '한국어 하나로 시작하는 유럽 글로벌 커리어',
    description: '삼성전자, CreedRoomz 등 유럽 Top-tier 미디어/IT 기업 공식 파트너. 비자/항공/숙소 100% 지원.',
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
      <body className={inter.className}>{children}</body>
    </html>
  )
}

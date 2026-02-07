'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MapPin, Briefcase, Shield, Globe, Plane, Home } from 'lucide-react';

interface AccordionItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: string;
  keywords: string[];
}

type Language = 'en' | 'jp' | 'kr';

const SEO_ACCORDION_DATA: Record<Language, { header: string; subtitle: string; popularKeywords: string; items: AccordionItem[] }> = {
  jp: {
    header: 'ヨーロッパ グローバルメディア キャリア機会',
    subtitle: 'マルタ・キプロス・アルメニア 正社員採用 | ビザ・航空券・住居提供',
    popularKeywords: '人気検索キーワード',
    items: [
      {
        id: 'malta',
        title: 'マルタ グローバルメディア専門家 採用',
        icon: <MapPin size={20} className="text-blue-600" />,
        content: '地中海の金融ハブ、マルタでグローバルキャリアをスタート。ヨーロッパゲーミンググループ正社員ポジション。ビザスポンサーシップ、航空券、住居100%提供。英語力向上機会、低税率(15%)、ワークライフバランス保証(週5日勤務)。韓国より2倍速い資産形成可能。',
        keywords: ['マルタ就職', 'グローバルメディア専門家', '住居提供', 'ビザスポンサーシップ', '税制優遇']
      },
      {
        id: 'cyprus',
        title: 'キプロス 正社員キャリア機会',
        icon: <Globe size={20} className="text-emerald-600" />,
        content: 'EU加盟国キプロスでグローバルキャリアを構築。ヨーロッパゲーミンググループ正社員契約。年収€30k-€50k、ビザ/航空券/住居全額支援。英語業務環境、低生活費、高貯蓄率。合法的な就労ビザで安定したヨーロッパ生活。',
        keywords: ['キプロス就職', '正社員', '航空券支援', '英語力向上', '資産形成']
      },
      {
        id: 'armenia',
        title: 'アルメニア グローバルメディア キャリア',
        icon: <Briefcase size={20} className="text-purple-600" />,
        content: 'ヨーロッパゲーミンググループのアルメニア支社正社員採用。低生活費(韓国の1/3)、高貯蓄率、速い資産形成。ビザスポンサーシップ、航空券、住居提供。英語業務環境、グローバルチーム協業経験。キャリア発展機会。',
        keywords: ['アルメニア就職', '低生活費', '資産形成', 'グローバルキャリア']
      },
      {
        id: 'working-holiday',
        title: 'ヨーロッパ ワーキングホリデー代替 - 正社員',
        icon: <Plane size={20} className="text-orange-600" />,
        content: 'ワーキングホリデーより良い選択。正社員契約で安定したヨーロッパ生活。ビザ心配なく長期滞在、キャリア発展、資産形成。ヨーロッパゲーミンググループ正社員ポジション。ビザスポンサーシップ、航空券、住居100%支援。',
        keywords: ['ヨーロッパワーホリ', '正社員', 'キャリア発展', 'ヨーロッパ生活']
      },
      {
        id: 'benefits',
        title: '主要福利厚生 - ビザ・航空券・住居提供',
        icon: <Shield size={20} className="text-red-600" />,
        content: 'ビザスポンサーシップ: 申請から発給まで全額支援。航空券支援: 往復航空券提供。住居提供: 初期住居無料提供または住居手当。税制優遇: マルタ15%、キプロス12.5%低税率。ワークライフバランス: 週5日勤務、年次休暇25日以上。',
        keywords: ['ビザスポンサーシップ', '航空券支援', '住居提供', '税制優遇', 'ワークライフバランス']
      },
      {
        id: 'career',
        title: 'グローバルメディア専門家 キャリアパス',
        icon: <Home size={20} className="text-indigo-600" />,
        content: 'ヨーロッパゲーミンググループでグローバルキャリアを構築。英語力向上、国際チーム協業経験、ヨーロッパ市場理解。正社員契約、昇進機会、キャリア発展。韓国より速い資産形成可能。合法的で安定したヨーロッパ生活。',
        keywords: ['グローバルメディア専門家', 'キャリア発展', '英語力向上', 'ヨーロッパゲーミンググループ']
      }
    ]
  },
  kr: {
    header: '유럽 글로벌 미디어 커리어 기회',
    subtitle: '몰타·키프로스·아르메니아 정규직 채용 | 비자·항공·숙식 제공',
    popularKeywords: '인기 검색어',
    items: [
      {
        id: 'malta',
        title: '몰타 글로벌 미디어 전문가 채용',
        icon: <MapPin size={20} className="text-blue-600" />,
        content: '지중해의 금융 허브 몰타에서 글로벌 커리어를 시작하세요. 유럽 게이밍 그룹 정규직 포지션. 비자 스폰서십, 항공권, 숙식 100% 제공. 영어 실력 향상 기회, 낮은 세율(15%), 워라밸 보장(주 5일 근무). 한국보다 2배 빠른 자산 축적 가능.',
        keywords: ['몰타 취업', '글로벌 미디어 전문가', '숙식 제공', '비자 스폰서십', '세금 혜택']
      },
      {
        id: 'cyprus',
        title: '키프로스 정규직 커리어 기회',
        icon: <Globe size={20} className="text-emerald-600" />,
        content: '유럽연합 회원국 키프로스에서 글로벌 커리어를 쌓으세요. 유럽 게이밍 그룹 정규직 계약. 연봉 €30k-€50k, 비자/항공/숙식 전액 지원. 영어 업무 환경, 낮은 생활비, 높은 저축률. 합법적인 취업 비자로 안정적인 유럽 생활.',
        keywords: ['키프로스 취업', '정규직', '항공권 지원', '영어 실력 향상', '자산 축적']
      },
      {
        id: 'armenia',
        title: '아르메니아 글로벌 미디어 커리어',
        icon: <Briefcase size={20} className="text-purple-600" />,
        content: '유럽 게이밍 그룹의 아르메니아 지사 정규직 채용. 낮은 생활비(한국의 1/3), 높은 저축률, 빠른 자산 축적. 비자 스폰서십, 항공권, 숙식 제공. 영어 업무 환경, 글로벌 팀 협업 경험. 커리어 발전 기회.',
        keywords: ['아르메니아 취업', '낮은 생활비', '자산 축적', '글로벌 커리어']
      },
      {
        id: 'working-holiday',
        title: '유럽 워킹홀리데이 대안 - 정규직',
        icon: <Plane size={20} className="text-orange-600" />,
        content: '워킹홀리데이보다 더 나은 선택. 정규직 계약으로 안정적인 유럽 생활. 비자 걱정 없이 장기 체류, 커리어 발전, 자산 축적. 유럽 게이밍 그룹 정규직 포지션. 비자 스폰서십, 항공권, 숙식 100% 지원.',
        keywords: ['유럽 워킹홀리데이', '정규직', '커리어 발전', '유럽 생활']
      },
      {
        id: 'benefits',
        title: '핵심 혜택 - 비자·항공·숙식 제공',
        icon: <Shield size={20} className="text-red-600" />,
        content: '비자 스폰서십: 신청부터 발급까지 전액 지원. 항공권 지원: 왕복 항공권 제공. 숙식 제공: 초기 숙소 무료 제공 또는 주거 수당. 세금 혜택: 몰타 15%, 키프로스 12.5% 낮은 세율. 워라밸: 주 5일 근무, 연차 25일 이상.',
        keywords: ['비자 스폰서십', '항공권 지원', '숙식 제공', '세금 혜택', '워라밸']
      },
      {
        id: 'career',
        title: '글로벌 미디어 전문가 커리어 패스',
        icon: <Home size={20} className="text-indigo-600" />,
        content: '유럽 게이밍 그룹에서 글로벌 커리어를 쌓으세요. 영어 실력 향상, 국제 팀 협업 경험, 유럽 시장 이해. 정규직 계약, 승진 기회, 커리어 발전. 한국보다 빠른 자산 축적 가능. 합법적이고 안정적인 유럽 생활.',
        keywords: ['글로벌 미디어 전문가', '커리어 발전', '영어 실력 향상', '유럽 게이밍 그룹']
      }
    ]
  },
  en: {
    header: 'European Global Media Career Opportunities',
    subtitle: 'Malta · Cyprus · Armenia Full-time Positions | Visa · Flight · Accommodation Provided',
    popularKeywords: 'Popular Keywords',
    items: [
      {
        id: 'malta',
        title: 'Malta Global Media Professional Recruitment',
        icon: <MapPin size={20} className="text-blue-600" />,
        content: 'Start your global career in Malta, the Mediterranean financial hub. European gaming group full-time positions. Visa sponsorship, flight tickets, accommodation 100% provided. English improvement opportunities, low tax rate (15%), work-life balance guaranteed (5-day work week). 2x faster wealth accumulation than Korea.',
        keywords: ['Malta Jobs', 'Global Media Professional', 'Accommodation Provided', 'Visa Sponsorship', 'Tax Benefits']
      },
      {
        id: 'cyprus',
        title: 'Cyprus Full-time Career Opportunities',
        icon: <Globe size={20} className="text-emerald-600" />,
        content: 'Build your global career in Cyprus, an EU member state. European gaming group full-time contract. Salary €30k-€50k, visa/flight/accommodation fully supported. English work environment, low cost of living, high savings rate. Stable European life with legal work visa.',
        keywords: ['Cyprus Jobs', 'Full-time', 'Flight Support', 'English Skills', 'Wealth Building']
      },
      {
        id: 'armenia',
        title: 'Armenia Global Media Career',
        icon: <Briefcase size={20} className="text-purple-600" />,
        content: 'European gaming group Armenia branch full-time recruitment. Low cost of living (1/3 of Korea), high savings rate, fast wealth accumulation. Visa sponsorship, flight tickets, accommodation provided. English work environment, global team collaboration experience. Career development opportunities.',
        keywords: ['Armenia Jobs', 'Low Cost of Living', 'Wealth Building', 'Global Career']
      },
      {
        id: 'working-holiday',
        title: 'European Working Holiday Alternative - Full-time',
        icon: <Plane size={20} className="text-orange-600" />,
        content: 'Better choice than working holiday. Stable European life with full-time contract. Long-term stay without visa worries, career development, wealth accumulation. European gaming group full-time positions. Visa sponsorship, flight tickets, accommodation 100% supported.',
        keywords: ['Europe Working Holiday', 'Full-time', 'Career Development', 'European Life']
      },
      {
        id: 'benefits',
        title: 'Core Benefits - Visa · Flight · Accommodation',
        icon: <Shield size={20} className="text-red-600" />,
        content: 'Visa Sponsorship: Full support from application to issuance. Flight Support: Round-trip flight tickets provided. Accommodation: Free initial accommodation or housing allowance. Tax Benefits: Malta 15%, Cyprus 12.5% low tax rates. Work-Life Balance: 5-day work week, 25+ days annual leave.',
        keywords: ['Visa Sponsorship', 'Flight Support', 'Accommodation', 'Tax Benefits', 'Work-Life Balance']
      },
      {
        id: 'career',
        title: 'Global Media Professional Career Path',
        icon: <Home size={20} className="text-indigo-600" />,
        content: 'Build your global career with European gaming groups. English improvement, international team collaboration experience, European market understanding. Full-time contract, promotion opportunities, career development. Faster wealth accumulation than Korea. Legal and stable European life.',
        keywords: ['Global Media Professional', 'Career Development', 'English Skills', 'European Gaming Groups']
      }
    ]
  }
};

export default function SEOAccordion({ language = 'en' }: { language?: Language }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const data = SEO_ACCORDION_DATA[language];

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="bg-slate-50 border-t border-slate-200 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">
          {data.header}
        </h2>
        <p className="text-slate-600 text-center mb-8">
          {data.subtitle}
        </p>

        <div className="space-y-3">
          {data.items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg border border-slate-200 overflow-hidden transition-all duration-200 hover:border-blue-300"
            >
              <button
                onClick={() => toggleAccordion(item.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="font-semibold text-slate-900">{item.title}</span>
                </div>
                {openId === item.id ? (
                  <ChevronUp size={20} className="text-slate-400" />
                ) : (
                  <ChevronDown size={20} className="text-slate-400" />
                )}
              </button>

              {openId === item.id && (
                <div className="px-4 pb-4 pt-2 border-t border-slate-100">
                  <p className="text-slate-700 leading-relaxed mb-3">
                    {item.content}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.keywords.map((keyword, idx) => (
                      <span
                        key={idx}
                        className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Tag Cloud for SEO */}
        <div className="mt-8 pt-8 border-t border-slate-200">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4 text-center">
            {data.popularKeywords}
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {data.items.flatMap(item => item.keywords).map((keyword, idx) => (
              <span
                key={idx}
                className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-sm rounded-full hover:bg-slate-200 transition-colors cursor-default"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

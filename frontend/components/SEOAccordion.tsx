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

const SEO_ACCORDION_DATA: AccordionItem[] = [
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
];

export default function SEOAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="bg-slate-50 border-t border-slate-200 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">
          유럽 글로벌 미디어 커리어 기회
        </h2>
        <p className="text-slate-600 text-center mb-8">
          몰타·키프로스·아르메니아 정규직 채용 | 비자·항공·숙식 제공
        </p>

        <div className="space-y-3">
          {SEO_ACCORDION_DATA.map((item) => (
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
            인기 검색어
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {SEO_ACCORDION_DATA.flatMap(item => item.keywords).map((keyword, idx) => (
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

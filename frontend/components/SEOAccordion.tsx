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
    title: '몰타 취업 완벽 가이드',
    icon: <MapPin size={20} className="text-blue-600" />,
    content: '지중해의 보석 몰타에서 시작하는 글로벌 커리어. 영어권 국가, 낮은 세율, 완벽한 날씨. 한국어를 사용하는 정규직 포지션을 지금 확인하세요. 비자 스폰서십, 항공권, 숙소 100% 지원. 게임/IT/고객지원 분야 정규직 채용.',
    keywords: ['몰타 취업', '몰타 일자리', '몰타 한국인 채용', '몰타 이민', '몰타 워킹홀리데이']
  },
  {
    id: 'cyprus',
    title: '키프로스 취업 기회',
    icon: <Globe size={20} className="text-emerald-600" />,
    content: '유럽연합 회원국 키프로스에서 글로벌 커리어를 쌓으세요. 낮은 생활비, 따뜻한 기후, 영어 사용 환경. 한국어 인재를 찾는 글로벌 기업들이 기다립니다. 연봉 €30k-€50k, 비자/항공/숙소 전액 지원.',
    keywords: ['키프로스 취업', '키프로스 채용', '키프로스 한국인', '키프로스 이민']
  },
  {
    id: 'working-holiday',
    title: '유럽 워킹홀리데이 대안',
    icon: <Plane size={20} className="text-purple-600" />,
    content: '워킹홀리데이보다 더 나은 선택. 정규직 계약으로 안정적인 유럽 생활을 시작하세요. 비자 걱정 없이, 커리어를 쌓으며, 유럽에서 장기 체류할 수 있습니다. 비자 스폰서십으로 장기 체류 가능.',
    keywords: ['유럽 워킹홀리데이', '유럽 워홀', '해외 워킹홀리데이', '유럽 장기체류']
  },
  {
    id: 'internship',
    title: '해외 인턴십 프로그램',
    icon: <Briefcase size={20} className="text-orange-600" />,
    content: '글로벌 커리어의 첫 걸음을 유럽에서 시작하세요. 실무 경험, 정규직 전환 기회, 완벽한 정착 지원. 한국어를 사용하는 인턴십 포지션. 비자, 항공권, 숙소 지원. IT, 게임, 미디어 분야.',
    keywords: ['해외 인턴십', '해외 인턴', '유럽 인턴십', '글로벌 인턴']
  },
  {
    id: 'visa',
    title: '비자 스폰서십 제공',
    icon: <Shield size={20} className="text-red-600" />,
    content: '복잡한 비자 절차, 기업이 모두 해결해드립니다. 비자 신청, 서류 준비, 발급까지 전액 지원. 합법적인 취업 비자로 안심하고 유럽 생활을 시작하세요. 몰타, 키프로스 정규직 포지션.',
    keywords: ['비자 스폰서십', '비자 지원', '취업 비자', '해외 비자', '유럽 비자']
  },
  {
    id: 'game-presenter',
    title: '게임 프리젠터 채용',
    icon: <Home size={20} className="text-pink-600" />,
    content: '카메라 앞에서 게임을 진행하는 특별한 직업. 프로그래밍 불필요, 한국어만 잘하면 OK. 글로벌 게임 기업에서 경력을 쌓으세요. 연봉 €30k-€48k, 보너스 별도. 미경험 환영, 완벽한 연수 제공.',
    keywords: ['게임 프리젠터', '라이브 딜러', '온라인 카지노 채용', '게임 호스트']
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
          다양한 해외 취업 기회
        </h2>
        <p className="text-slate-600 text-center mb-8">
          몰타, 키프로스, 유럽 전역의 한국어 채용 정보
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

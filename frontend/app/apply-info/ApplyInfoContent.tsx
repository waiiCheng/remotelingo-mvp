'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle2, ShieldCheck, Plane, Users, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function ApplyInfoContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [agreed1, setAgreed1] = useState(false);
  const [agreed2, setAgreed2] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  const [companyLabel, setCompanyLabel] = useState('');
  const [applyUrl, setApplyUrl] = useState('');
  const [language, setLanguage] = useState<'en' | 'jp' | 'kr'>('en');

  // Sync language from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('language') as 'en' | 'jp' | 'kr';
    if (savedLang && (savedLang === 'en' || savedLang === 'jp' || savedLang === 'kr')) {
      setLanguage(savedLang);
    }
  }, []);

  useEffect(() => {
    // Get job info from URL parameters
    setJobTitle(searchParams.get('job') || 'this position');
    setCompanyLabel(searchParams.get('company') || 'our exclusive partner');
    setApplyUrl(searchParams.get('url') || 'https://tally.so/r/zxjRGR');
  }, [searchParams]);

  const canProceed = agreed1 && agreed2;

  const handleProceed = () => {
    if (canProceed) {
      // Redirect to Official Selection Portal
      const params = new URLSearchParams({
        job: jobTitle,
        company: companyLabel
      });
      window.location.href = `/apply?${params.toString()}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">{language === 'jp' ? '求人一覧に戻る' : language === 'kr' ? '채용 목록으로 돌아가기' : 'Back to Job Board'}</span>
        </Link>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white text-center">
            <div className="inline-flex p-3 bg-white/20 rounded-full mb-4">
              <ShieldCheck size={40} />
            </div>
            <h1 className="text-3xl font-bold mb-2">{language === 'jp' ? '応募に関する同意事項' : language === 'kr' ? '지원 동의서' : 'Application Agreement'}</h1>
            <p className="text-blue-100 text-sm max-w-xl mx-auto">
              {language === 'jp' ? '応募に進む前に、以下の内容をご確認ください。' : language === 'kr' ? '진행하기 전에 다음 내용을 확인해 주세요.' : 'Please review the following before proceeding.'}
            </p>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Job Info */}
            <div className="mb-8 p-4 bg-blue-50 border-l-4 border-blue-600 rounded-r-lg">
              <p className="text-sm text-slate-600 mb-1">{language === 'jp' ? '応募職種' : language === 'kr' ? '지원 직종' : 'Applying for'}</p>
              <h2 className="text-xl font-bold text-slate-900">{jobTitle}</h2>
              <p className="text-sm text-slate-600 mt-1">
                {language === 'jp' ? '企業' : language === 'kr' ? '회사' : 'at'} <span className="font-semibold text-blue-700">{companyLabel}</span>
              </p>
            </div>

            {/* Benefits Section */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <CheckCircle2 size={20} className="text-emerald-500" />
                {language === 'jp' ? 'あなたのメリット' : language === 'kr' ? '귀하의 이점' : 'Your Advantages'}
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <Users size={20} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{language === 'jp' ? '優先面接トラック' : language === 'kr' ? '우선 면접 트랙' : 'Priority Interview Track'}</p>
                    <p className="text-xs text-slate-600 mt-1">
                      {language === 'jp' ? 'RemoteLingoを通じて応募すると、優先的に面接のご案内をいたします。' : language === 'kr' ? 'RemoteLingo를 통해 지원하면 우선적으로 면접 안내를 드립니다.' : 'Applications through RemoteLingo receive priority interview scheduling.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-xl border border-purple-100">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Plane size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{language === 'jp' ? '完全な移住サポート' : language === 'kr' ? '완전한 이주 지원' : 'Full Relocation Support'}</p>
                    <p className="text-xs text-slate-600 mt-1">
                      {language === 'jp' ? 'ビザ取得、航空券、初期滞在費用など、全面的にサポートいたします。' : language === 'kr' ? '비자 취득, 항공권, 초기 체류 비용 등을 전면적으로 지원합니다.' : 'Complete support for visa, flights, and initial accommodation costs.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <ShieldCheck size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{language === 'jp' ? '内部紹介ステータス' : language === 'kr' ? '내부 추천 상태' : 'Internal Referral Status'}</p>
                    <p className="text-xs text-slate-600 mt-1">
                      {language === 'jp' ? '通常の応募者より優遇される、社内紹介と同等の扱いを受けられます。' : language === 'kr' ? '일반 지원자보다 우대받는 사내 추천과 동등한 대우를 받을 수 있습니다.' : 'Treated as an internal referral with preferential consideration.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Agreement Checkboxes */}
            <div className="mb-8 p-6 bg-amber-50 border-2 border-amber-200 rounded-xl">
              <div className="flex items-start gap-2 mb-3">
                <AlertCircle size={18} className="text-amber-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm font-semibold text-amber-900">
                  {language === 'jp' ? '必須同意事項' : language === 'kr' ? '필수 동의 사항' : 'Required Agreements'}
                </p>
              </div>

              <div className="space-y-4 mt-4">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={agreed1}
                    onChange={(e) => setAgreed1(e.target.checked)}
                    className="w-5 h-5 rounded border-2 border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500 mt-0.5 cursor-pointer"
                  />
                  <span className="text-sm text-slate-700 group-hover:text-slate-900 transition-colors">
                    {language === 'jp' ? '提供した情報が正確であることを確認しました。' : language === 'kr' ? '제공한 정보가 정확함을 확인했습니다.' : 'I confirm that the information I provide is accurate.'}
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={agreed2}
                    onChange={(e) => setAgreed2(e.target.checked)}
                    className="w-5 h-5 rounded border-2 border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500 mt-0.5 cursor-pointer"
                  />
                  <span className="text-sm text-slate-700 group-hover:text-slate-900 transition-colors">
                    {language === 'jp' ? 'RemoteLingoとパートナー企業との間で私の情報を共有することに同意します。' : language === 'kr' ? 'RemoteLingo와 파트너 회사 간에 내 정보를 공유하는 것에 동의합니다.' : 'I agree to share my information between RemoteLingo and partner companies.'}
                  </span>
                </label>
              </div>
            </div>

            {/* Proceed Button */}
            <button
              onClick={handleProceed}
              disabled={!canProceed}
              className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-200 flex items-center justify-center gap-2 ${
                canProceed
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                  : 'bg-slate-300 cursor-not-allowed'
              }`}
            >
              {canProceed ? (
                <>
                  {language === 'jp' ? '応募フォームに進む' : language === 'kr' ? '지원 양식으로 진행' : 'Proceed to Application Form'}
                  <ArrowRight size={20} />
                </>
              ) : (
                <>{language === 'jp' ? '規約に同意してください' : language === 'kr' ? '약관에 동의해 주세요' : 'Please agree to the terms'}</>
              )}
            </button>

            {/* Disclaimer */}
            <p className="text-xs text-slate-400 text-center mt-4">
              {language === 'jp' ? '続行することで、利用規約とプライバシーポリシーに同意したことになります。' : language === 'kr' ? '계속 진행하면 이용 약관 및 개인정보 보호정책에 동의한 것으로 간주됩니다.' : 'By proceeding, you agree to our Terms of Service and Privacy Policy.'}
            </p>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-6 text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span>{language === 'jp' ? '認証済みパートナー' : language === 'kr' ? '인증된 파트너' : 'Verified Partner'}</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span>{language === 'jp' ? '安全なプロセス' : language === 'kr' ? '안전한 프로세스' : 'Secure Process'}</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span>{language === 'jp' ? '無料サービス' : language === 'kr' ? '무료 서비스' : 'Free Service'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

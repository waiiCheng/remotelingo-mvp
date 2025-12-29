'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle2, ShieldCheck, Plane, Users, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { translations, Language } from '@/lib/translations';

export default function ApplyInfoPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [agreed1, setAgreed1] = useState(false);
  const [agreed2, setAgreed2] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  const [companyLabel, setCompanyLabel] = useState('');
  const [applyUrl, setApplyUrl] = useState('');
  const [language, setLanguage] = useState<Language>('en');
  const t = translations[language];

  // Sync language from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
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
          <span className="text-sm font-medium">{t.backToJobBoard}</span>
        </Link>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white text-center">
            <div className="inline-flex p-3 bg-white/20 rounded-full mb-4">
              <ShieldCheck size={40} />
            </div>
            <h1 className="text-3xl font-bold mb-2">{t.applicationAgreement}</h1>
            <p className="text-blue-100 text-sm max-w-xl mx-auto">
              {t.beforeProceeding}
            </p>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Job Info */}
            <div className="mb-8 p-4 bg-blue-50 border-l-4 border-blue-600 rounded-r-lg">
              <p className="text-sm text-slate-600 mb-1">{t.applyingFor}</p>
              <h2 className="text-xl font-bold text-slate-900">{jobTitle}</h2>
              <p className="text-sm text-slate-600 mt-1">
                {t.at} <span className="font-semibold text-blue-700">{companyLabel}</span>
              </p>
            </div>

            {/* Benefits Section */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <CheckCircle2 size={20} className="text-emerald-500" />
                {t.yourAdvantages}
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <Users size={20} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{t.priorityInterviewTrack}</p>
                    <p className="text-xs text-slate-600 mt-1">
                      {t.priorityInterviewDesc}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-xl border border-purple-100">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Plane size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{t.fullRelocationSupport}</p>
                    <p className="text-xs text-slate-600 mt-1">
                      {t.fullRelocationDesc}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <ShieldCheck size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{t.internalReferralStatus}</p>
                    <p className="text-xs text-slate-600 mt-1">
                      {t.internalReferralDesc}
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
                  {t.requiredAgreements}
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
                    {t.agreement1}
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
                    {t.agreement2}
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
                  {t.proceedToForm}
                  <ArrowRight size={20} />
                </>
              ) : (
                <>{t.pleaseAgreeToTerms}</>
              )}
            </button>

            {/* Disclaimer */}
            <p className="text-xs text-slate-400 text-center mt-4">
              {t.byProceeding}
            </p>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-6 text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span>{t.verifiedPartner}</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span>{t.secureProcess}</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span>{t.freeService}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

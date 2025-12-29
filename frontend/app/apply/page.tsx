'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { translations, Language } from '@/lib/translations';

export default function ApplyPage() {
  const searchParams = useSearchParams();
  const [tallyUrl, setTallyUrl] = useState('');
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
    // Get job and company info from URL params
    const jobTitle = searchParams.get('job') || '';
    const companyLabel = searchParams.get('company') || '';

    // Build Tally URL with prefilled data
    const url = new URL('https://tally.so/r/zxjRGR');

    // Add hidden fields to Tally form
    if (jobTitle) {
      url.searchParams.append('job_title', jobTitle);
    }
    if (companyLabel) {
      url.searchParams.append('company', companyLabel);
    }
    url.searchParams.append('source', 'remotelingo_priority');

    setTallyUrl(url.toString());
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">{t.backToJobs}</span>
          </Link>

          <div className="flex items-center gap-2 text-sm">
            <ShieldCheck size={16} className="text-emerald-500" />
            <span className="font-semibold text-slate-700">{t.officialSelectionPortal}</span>
          </div>
        </div>
      </header>

      {/* Embedded Tally Form */}
      <main className="flex-1 flex flex-col">
        {tallyUrl && (
          <iframe
            src={tallyUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="RemoteLingo Application Form"
            className="flex-1 min-h-screen"
            allow="payment"
          />
        )}
      </main>

      {/* Trust Footer */}
      <footer className="bg-white border-t border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs text-slate-500">
            {t.secureApplicationFooter}
          </p>
        </div>
      </footer>
    </div>
  );
}

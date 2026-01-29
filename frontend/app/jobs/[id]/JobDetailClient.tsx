'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin, DollarSign, Briefcase, Clock, Globe, CheckCircle2, Sparkles, ExternalLink } from 'lucide-react';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  languages: string[];
  level: string;
  salary_min?: number;
  salary_max?: number;
  currency?: string;
  tags: string[];
  posted_at: string;
  featured: boolean;
  ai_verified: boolean;
  status?: string;
  summary: string | { en: string; jp?: string; kr?: string };
  apply_url?: string;
  logoBg?: string;
  initials?: string;
}

export default function JobDetailClient({ job }: { job: Job }) {
  const [language, setLanguage] = useState<'en' | 'jp' | 'kr'>('en');
  const [mounted, setMounted] = useState(false);

  // Sync language from localStorage
  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem('language') as 'en' | 'jp' | 'kr';
    if (savedLang && (savedLang === 'en' || savedLang === 'jp' || savedLang === 'kr')) {
      setLanguage(savedLang);
    }
  }, []);

  // Get localized summary
  const getLocalizedSummary = () => {
    if (typeof job.summary === 'string') {
      return job.summary;
    }
    return job.summary[language] || job.summary.en;
  };

  // Dynamically inject Google Jobs JSON-LD based on current language
  useEffect(() => {
    if (!mounted) return;

    // Remove existing job posting schema if any
    const existingScript = document.getElementById('job-posting-schema');
    if (existingScript) {
      existingScript.remove();
    }

    // Get localized description
    const description = getLocalizedSummary();

    // Extract location (remove parentheses content)
    const cleanLocation = job.location.split('(')[0].trim();

    // Generate datePosted
    const datePosted = new Date().toISOString().split('T')[0];

    // Create JSON-LD schema with localized content
    const jobPostingSchema = {
      '@context': 'https://schema.org/',
      '@type': 'JobPosting',
      title: job.title,
      description: description,
      datePosted: datePosted,
      validThrough: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      hiringOrganization: {
        '@type': 'Organization',
        name: 'RemoteLingo',
        sameAs: 'https://remotelingo.com',
        logo: 'https://remotelingo.com/logo.png',
      },
      jobLocation: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          addressLocality: cleanLocation.split(',')[0].trim(),
          addressCountry: cleanLocation.split(',')[1]?.trim() || cleanLocation,
        },
      },
      employmentType: job.type === 'Full-time' ? 'FULL_TIME' : job.type === 'Part-time' ? 'PART_TIME' : 'CONTRACTOR',
      ...(job.salary_min && job.salary_max && {
        baseSalary: {
          '@type': 'MonetaryAmount',
          currency: job.currency,
          value: {
            '@type': 'QuantitativeValue',
            minValue: job.salary_min,
            maxValue: job.salary_max,
            unitText: 'YEAR',
          },
        },
      }),
      ...(job.apply_url && {
        directApply: true,
        applicationContact: {
          '@type': 'ContactPoint',
          url: job.apply_url,
        },
      }),
      // Add language-specific metadata
      inLanguage: language === 'kr' ? 'ko' : language === 'jp' ? 'ja' : 'en',
    };

    // Inject the script tag
    const script = document.createElement('script');
    script.id = 'job-posting-schema';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(jobPostingSchema);
    document.head.appendChild(script);

    // Update page title dynamically based on language
    if (language === 'kr') {
      document.title = `${job.title} - 고액 연봉 & 비자 지원 | RemoteLingo`;
    } else if (language === 'jp') {
      document.title = `${job.title} - 高給与 & ビザサポート | RemoteLingo`;
    } else {
      document.title = `${job.title} - High Salary & Visa Support | RemoteLingo`;
    }

    // Cleanup on unmount
    return () => {
      const scriptToRemove = document.getElementById('job-posting-schema');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [language, mounted, job]);

  const handleApply = () => {
    if (job.apply_url) {
      // Check if this is a special job that needs /apply-info flow
      const title = job.title.toLowerCase();
      const company = job.company.toLowerCase();
      const tags = job.tags.map(t => t.toLowerCase()).join(' ');
      const combined = `${title} ${company} ${tags}`;

      const isGamblingJob =
        combined.includes('game presenter') ||
        combined.includes('game host') ||
        combined.includes('casino') ||
        combined.includes('igaming') ||
        combined.includes('dealer') ||
        combined.includes('live game') ||
        combined.includes('broadcasting host') ||
        combined.includes('creedroomz');

      const isPremiumFinanceJob =
        combined.includes('exness') ||
        combined.includes('xm') ||
        combined.includes('ic markets') ||
        combined.includes('fx trading') ||
        combined.includes('forex') ||
        combined.includes('fx broker') ||
        combined.includes('retention agent') ||
        (combined.includes('account manager') && combined.includes('financial')) ||
        (combined.includes('relationship manager') && combined.includes('fintech'));

      if (isGamblingJob || isPremiumFinanceJob) {
        const params = new URLSearchParams({
          job: job.title,
          company: job.company,
          url: job.apply_url
        });
        window.location.href = `/apply-info?${params.toString()}`;
      } else {
        window.open(job.apply_url, '_blank');
      }
    }
  };

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">
              {language === 'jp' ? '求人一覧に戻る' : language === 'kr' ? '채용 목록으로 돌아가기' : 'Back to Job Board'}
            </span>
          </Link>

          {/* Company Logo */}
          <div className="flex items-start gap-4 mb-6">
            <div className={`w-16 h-16 ${job.logoBg || 'bg-slate-800'} rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0`}>
              {job.initials || job.company.substring(0, 2).toUpperCase()}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">{job.title}</h1>
              <p className="text-lg text-slate-600">{job.company}</p>
            </div>
          </div>

          {/* Quick Info */}
          <div className="flex flex-wrap gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-blue-600" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase size={16} className="text-blue-600" />
              <span>{job.type}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-blue-600" />
              <span>{job.posted_at}</span>
            </div>
            {job.salary_min && job.salary_max && (
              <div className="flex items-center gap-2">
                <DollarSign size={16} className="text-blue-600" />
                <span>
                  {job.currency} {job.salary_min.toLocaleString()} - {job.salary_max.toLocaleString()}
                </span>
              </div>
            )}
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mt-4">
            {job.featured && (
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full">
                ⭐ Featured
              </span>
            )}
            {job.ai_verified && (
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full flex items-center gap-1">
                <Sparkles size={12} /> AI Verified
              </span>
            )}
            {job.status === 'urgent' && (
              <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full">
                🔥 Urgent
              </span>
            )}
            {job.languages.map((lang) => (
              <span key={lang} className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full">
                <Globe size={12} className="inline mr-1" />
                {lang}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          {/* Job Description */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              {language === 'jp' ? '職務内容' : language === 'kr' ? '직무 내용' : 'Job Description'}
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                {getLocalizedSummary()}
              </p>
            </div>
          </div>

          {/* Requirements */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              {language === 'jp' ? '必須スキル' : language === 'kr' ? '필수 기술' : 'Requirements'}
            </h2>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={20} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700">
                  {language === 'jp' ? `${job.languages.join('、')}の流暢なスキル` : language === 'kr' ? `${job.languages.join(', ')} 유창한 능력` : `Fluent in ${job.languages.join(' and ')}`}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={20} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700">
                  {language === 'jp' ? `${job.level}レベルの経験` : language === 'kr' ? `${job.level} 수준의 경험` : `${job.level} experience`}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={20} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700">
                  {language === 'jp' ? '海外勤務可能な方' : language === 'kr' ? '해외 근무 가능한 분' : 'Willing to relocate internationally'}
                </span>
              </li>
            </ul>
          </div>

          {/* Tags */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              {language === 'jp' ? 'タグ' : language === 'kr' ? '태그' : 'Tags'}
            </h2>
            <div className="flex flex-wrap gap-2">
              {job.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Apply Button */}
          <div className="pt-6 border-t border-slate-200">
            <button
              onClick={handleApply}
              className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-blue-600 transition-colors shadow-lg flex items-center justify-center gap-2 group"
            >
              {language === 'jp' ? 'この職種に応募する' : language === 'kr' ? '이 직종에 지원하기' : 'Apply for this Position'}
              <ExternalLink size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

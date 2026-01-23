'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Search, MapPin, Globe, DollarSign, Clock, Briefcase, ChevronRight, CheckCircle2, Menu, X, Filter, Bot, Sparkles, RefreshCw, ExternalLink, ArrowUpRight, XCircle, CreditCard, Check, Loader2, Lock, ArrowLeft, ShieldCheck, Zap, BadgeCheck, Gamepad2, Code, Languages, Megaphone } from 'lucide-react';
import JOBS_DATA from '@/lib/jobsData';
import { translations, Language } from '@/lib/translations';
import { getLocalizedJob } from '@/lib/jobTranslations';
import CandidatePipelineStats from '@/components/CandidatePipelineStats';


// --- Constants ---
const AUTO_COLORS = [
  'bg-slate-800', // 黑色 (保留质感)
  'bg-blue-600',
  'bg-green-600',
  'bg-red-600',
  'bg-yellow-500',
  'bg-purple-600',
  'bg-pink-600',
  'bg-indigo-600',
  'bg-orange-500',
  'bg-teal-600',
  'bg-cyan-600'
];

const LANGUAGES = [
  { code: 'all', name: 'All Languages', flag: '🌍' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵', translationKey: 'langJapanese' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷', translationKey: 'langKorean' },
  { code: 'de', name: 'German', flag: '🇩🇪', translationKey: 'langGerman' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸', translationKey: 'langSpanish' },
  { code: 'fr', name: 'French', flag: '🇫🇷', translationKey: 'langFrench' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹', translationKey: 'langPortuguese' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦', translationKey: 'langArabic' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺', translationKey: 'langRussian' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳', translationKey: 'langChinese' },
];

const JOB_TYPES = ["Full-time", "Contract", "Freelance", "Part-time"];

// --- Helper function to get category icon (Monochromatic Professional Style) ---
const getCategoryIcon = (job) => {
  const title = job.title.toLowerCase();
  const tags = job.tags.map(t => t.toLowerCase()).join(' ');
  const combined = `${title} ${tags}`;

  const iconClass = "text-slate-700"; // Professional dark slate color
  const iconSize = 28;

  // Game/Host positions
  if (combined.includes('game') || combined.includes('presenter') || combined.includes('host') || combined.includes('dealer') || combined.includes('igaming') || combined.includes('casino')) {
    return <Gamepad2 size={iconSize} className={iconClass} strokeWidth={1.5} />;
  }
  // Software/Backend positions
  if (combined.includes('engineer') || combined.includes('developer') || combined.includes('backend') || combined.includes('software') || combined.includes('qa') || combined.includes('tech')) {
    return <Code size={iconSize} className={iconClass} strokeWidth={1.5} />;
  }
  // Language/Translation positions
  if (combined.includes('translation') || combined.includes('localization') || combined.includes('bilingual') || combined.includes('language') || combined.includes('interpreter')) {
    return <Languages size={iconSize} className={iconClass} strokeWidth={1.5} />;
  }
  // Marketing/CS positions
  if (combined.includes('marketing') || combined.includes('support') || combined.includes('customer') || combined.includes('success') || combined.includes('sales') || combined.includes('coordinator')) {
    return <Megaphone size={iconSize} className={iconClass} strokeWidth={1.5} />;
  }

  // Default to generic briefcase icon
  return <Briefcase size={iconSize} className={iconClass} strokeWidth={1.5} />;
};

// --- 2. B2B Invoice Checkout Component (English & Professional) ---
function InvoiceCheckout({ planName, price, onCancel, onSuccess }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    try {
      const response = await fetch('https://formspree.io/f/meoyrjbz', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setLoading(false);
        onSuccess();
      } else {
        setLoading(false);
        alert('Failed to submit invoice request. Please try again.');
      }
    } catch (error) {
      setLoading(false);
      alert('Network error. Please check your connection and try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row animate-fade-in" lang="en">
      {/* Left Column: Product Info */}
      <div className="w-full md:w-1/2 bg-slate-900 text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>

        <div>
          <div className="flex items-center gap-2 mb-8 text-slate-300 cursor-pointer hover:text-white transition" onClick={onCancel}>
            <ArrowLeft size={16} /> Back
          </div>

          <div className="mb-8">
            <h3 className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
              <Zap size={14} /> Corporate Invoice
            </h3>
            <h1 className="text-3xl font-bold mb-2">RemoteLingo {planName}</h1>
            <div className="text-5xl font-bold text-white mb-2">{price}</div>
            <p className="text-slate-400 text-sm">Flat fee for 30 days. No recurring charges.</p>
          </div>

          <div className="space-y-4 border-t border-slate-700 pt-6">
            <div className="flex items-start gap-3">
              <div className="p-1 bg-emerald-500/10 rounded-full text-emerald-400 mt-1"><Check size={14} /></div>
              <div>
                <p className="font-medium text-slate-200">Instant Activation</p>
                <p className="text-sm text-slate-400">Post goes live immediately after payment.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-1 bg-emerald-500/10 rounded-full text-emerald-400 mt-1"><Check size={14} /></div>
              <div>
                <p className="font-medium text-slate-200">Guaranteed Reach</p>
                <p className="text-sm text-slate-400">Sent to 500+ verified bilingual candidates.</p>
              </div>
            </div>
             <div className="flex items-start gap-3">
              <div className="p-1 bg-emerald-500/10 rounded-full text-emerald-400 mt-1"><Check size={14} /></div>
              <div>
                <p className="font-medium text-slate-200">VAT Invoice Included</p>
                <p className="text-sm text-slate-400">Automated invoice generation for expensing.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-700 text-sm text-slate-500 flex items-center gap-2">
           <ShieldCheck size={14} /> Bank Transfer / Payoneer
        </div>
      </div>

      {/* Right Column: Invoice Form (English) */}
      <div className="w-full md:w-1/2 bg-white p-8 md:p-12 flex flex-col justify-center" lang="en">
        <form onSubmit={handleSubmit} className="max-w-md w-full mx-auto space-y-6" autoComplete="off" lang="en">
          <div className="flex justify-between items-center mb-6">
             <h2 className="text-xl font-bold text-slate-900">Billing Information</h2>
          </div>

          <div className="space-y-4">
            <input type="hidden" name="plan" value={planName} />
            <input type="hidden" name="price" value={price} />

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input required type="email" name="email" placeholder="hr@company.com" autoComplete="off" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Company Name *</label>
              <input required type="text" name="company_name" placeholder="Acme Corporation" autoComplete="off" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Billing Address *</label>
              <textarea required name="billing_address" placeholder="123 Main St, Suite 100&#10;San Francisco, CA 94105" autoComplete="off" rows={3} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tax ID / VAT Number (Optional)</label>
              <input type="text" name="tax_id" placeholder="EU123456789" autoComplete="off" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white font-bold py-4 rounded-lg hover:bg-slate-800 transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : (
              <>
                Request Invoice & Continue
              </>
            )}
          </button>

          <div className="text-center text-xs text-slate-400 mt-4">
            <Lock size={10} className="inline mr-1" />
            Payment details will be sent to your email within 24 hours.
          </div>
        </form>
      </div>
    </div>
  );
}

// --- 3. Job Submission Form (English) ---
function JobSubmissionForm({ onFinish }) {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.target);

    try {
      const response = await fetch('https://formspree.io/f/meoyrjbz', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setSubmitting(false);
        onFinish(); // Switch back to home view with success message
      } else {
        setSubmitting(false);
        alert('Submission failed. Please try again.');
      }
    } catch (error) {
      setSubmitting(false);
      alert('Network error. Please check your connection and try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 animate-fade-in" lang="en">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 p-6 text-white text-center">
          <div className="inline-flex p-2 bg-emerald-500/20 rounded-full mb-3 text-emerald-400">
            <CheckCircle2 size={32} />
          </div>
          <h2 className="text-2xl font-bold">Invoice Requested Successfully!</h2>
          <p className="text-slate-400 text-sm">We have sent payment details to your email. Please proceed to fill in the job details.</p>
        </div>

        {/* Form Content */}
        <div className="p-8">
          <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-lg flex gap-3 text-sm text-blue-800">
             <Bot size={20} className="flex-shrink-0" />
             <div>
               <b>Concierge Service Active:</b> Our team will verify and index this job to Google Jobs within 24 hours.
             </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off" lang="en">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Job Title</label>
              <input required type="text" name="job_title" placeholder="e.g. Senior Software Engineer" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Company Name</label>
              <input required type="text" name="company" placeholder="e.g. Acme Corp" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Primary Language</label>
              <select name="language" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                <option>Chinese (Mandarin)</option>
                <option>Chinese (Cantonese)</option>
                <option>Korean</option>
                <option>Japanese</option>
                <option>German</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Apply URL / Email</label>
              <p className="text-xs text-slate-500 mb-2">Where should candidates send their applications?</p>
              <input required type="text" name="apply_url" placeholder="https://..." className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit & Publish <ArrowUpRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// --- 4. Success View (Transaction Closure) ---
const SuccessView = ({ onHome }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 animate-fade-in">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-emerald-400 to-teal-500 w-full" />
        <div className="p-8 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6 ring-4 ring-emerald-100/50">
            <CheckCircle2 size={40} className="text-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Submission Received</h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Your job listing is securely queued. Our AI agents are verifying details.
          </p>

          {/* System Log Simulation */}
          <div className="w-full bg-slate-50 rounded-xl border border-slate-200 p-4 mb-8">
            <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-200/60">
              <Bot size={16} className="text-blue-600" />
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">System Log</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-sm text-slate-600 font-medium">Payment Verified</span>
                </div>
                <BadgeCheck size={16} className="text-emerald-500" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-sm text-slate-600 font-medium">Indexing for SEO</span>
                </div>
                <Loader2 size={14} className="text-blue-500 animate-spin" />
              </div>
            </div>
          </div>

          <button onClick={onHome} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2">
            <ArrowLeft size={18} /> Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---
export default function RemoteLingoMVP() {
  const [view, setView] = useState('home'); // 'home' | 'checkout' | 'submission' | 'success'
  const [selectedPlan, setSelectedPlan] = useState(null);

  const [language, setLanguage] = useState<Language>('en');
  const [selectedLang, setSelectedLang] = useState('all');
  const [selectedType, setSelectedType] = useState('All');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("Just now");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;

  const [showPricingModal, setShowPricingModal] = useState(false);
  const [redirectingJob, setRedirectingJob] = useState(null);
  const [toast, setToast] = useState(null);
  const [showRelocationOnly, setShowRelocationOnly] = useState(false);

  const t = translations[language];

  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && (savedLang === 'en' || savedLang === 'jp' || savedLang === 'kr')) {
      setLanguage(savedLang);
    }
  }, []);

  // Persist language preference to localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // --- Filtering Logic ---
  const filteredJobs = useMemo(() => {
    let jobs = JOBS_DATA;

    // Language-based filtering (EN shows all, JP shows only Japanese jobs, KR shows only Korean jobs)
    if (language === 'jp') {
      jobs = jobs.filter(job => job.languages.some(l => l.includes('Japanese')));
    } else if (language === 'kr') {
      jobs = jobs.filter(job => job.languages.some(l => l.includes('Korean')));
    }

    // Existing filters
    return jobs.filter(job => {
      const langMatch = selectedLang === 'all' || job.languages.some(l => {
        if (selectedLang === 'zh') return l.includes('Chinese');
        if (selectedLang === 'ko') return l.includes('Korean');
        if (selectedLang === 'ja') return l.includes('Japanese');
        if (selectedLang === 'de') return l.includes('German');
        if (selectedLang === 'es') return l.includes('Spanish');
        if (selectedLang === 'fr') return l.includes('French');
        if (selectedLang === 'pt') return l.includes('Portuguese');
        if (selectedLang === 'ar') return l.includes('Arabic');
        if (selectedLang === 'ru') return l.includes('Russian');
        return false;
      });
      const typeMatch = selectedType === 'All' || job.type === selectedType;
      const relocationMatch = !showRelocationOnly || job.tags.some(t => t.includes('Relocation') || t.includes('Visa'));
      return langMatch && typeMatch && relocationMatch;
    });
  }, [selectedLang, selectedType, showRelocationOnly, language]);

  // Pagination calculations
  const totalJobs = filteredJobs.length;
  const totalPages = Math.ceil(totalJobs / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedLang, selectedType, showRelocationOnly, language]);

  // --- Helpers ---
  const showToastMessage = (msg, type = 'success') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top of job list
    const jobListElement = document.getElementById('job-list');
    if (jobListElement) {
      jobListElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Helper: Get localized job title
  const getLocalizedTitle = (job) => {
    if ((language === 'jp' || language === 'kr') && t.jobTitles) {
      // Try exact match first
      if (t.jobTitles[job.title]) {
        return t.jobTitles[job.title];
      }
      // Try partial match
      for (const [key, value] of Object.entries(t.jobTitles)) {
        if (job.title.includes(key)) {
          return value;
        }
      }
    }
    return job.title;
  };

  // Helper: Get localized description based on category
  const getLocalizedDescription = (job) => {
    if (language !== 'jp' || !t.jobDescriptions) {
      return typeof job.summary === 'string'
        ? job.summary
        : (job.summary?.[language] || job.summary?.en || '');
    }

    // Categorize job and return appropriate template
    const title = job.title.toLowerCase();
    const tags = job.tags.map(t => t.toLowerCase()).join(' ');
    const combined = `${title} ${tags}`;

    if (combined.includes('game') || combined.includes('presenter') || combined.includes('casino')) {
      return language === 'jp' ? '未経験から挑戦できる海外就職。渡航サポート完備で安心。' : language === 'kr' ? '경험 없이도 도전 가능한 해외 취업. 이주 지원 완비로 안심.' : 'Entry-level overseas career opportunity with full relocation support.';
    }
    if (combined.includes('language') || combined.includes('translation') || combined.includes('bilingual') || combined.includes('ai')) {
      return language === 'jp' ? 'AIモデルの回答品質を評価・修正するお仕事です。ネイティブレベルの日本語力が必須です。' : language === 'kr' ? 'AI 모델의 응답 품질을 평가·수정하는 업무입니다. 원어민 수준의 언어 능력이 필수입니다.' : 'Evaluate and refine AI model responses. Native-level language proficiency required.';
    }
    if (combined.includes('engineer') || combined.includes('developer') || combined.includes('backend') || combined.includes('software') || combined.includes('qa')) {
      return language === 'jp' ? '日本発のグローバル製造業プラットフォーム開発。Go/Rust/Python経験者優遇。' : language === 'kr' ? '일본 기반 글로벌 제조업 플랫폼 개발. Go/Rust/Python 경험자 우대.' : 'Global manufacturing platform development. Experience with Go/Rust/Python preferred.';
    }
    if (combined.includes('support') || combined.includes('customer') || combined.includes('success')) {
      return language === 'jp' ? 'グローバル企業でのカスタマーサポート業務。母国語を活かして活躍できます。' : language === 'kr' ? '글로벌 기업의 고객 지원 업무. 모국어를 활용하여 활약할 수 있습니다.' : 'Customer support role at global companies. Leverage your native language skills.';
    }

    return language === 'jp' ? '詳細は応募フォームをご確認ください。' : language === 'kr' ? '자세한 내용은 지원 양식을 확인해 주세요.' : 'Please refer to the application form for details.';
  };

  // Helper: Get localized location
  const getLocalizedLocation = (location) => {
    if ((language === 'jp' || language === 'kr') && t.locationLabels) {
      // Extract main location (e.g., "Malta (Flight + Housing Included)" -> "Malta")
      const mainLocation = location.split('(')[0].trim();
      const benefitsMatch = location.match(/\(([^)]+)\)/);
      const benefits = benefitsMatch ? benefitsMatch[1] : '';

      const localizedLocation = t.locationLabels[mainLocation] || mainLocation;

      if (benefits && t.metadataLabels && t.metadataLabels[benefits]) {
        const localizedBenefits = t.metadataLabels[benefits];
        return language === 'jp'
          ? `${localizedLocation}（${localizedBenefits}）`
          : `${localizedLocation} (${localizedBenefits})`;
      }

      return localizedLocation;
    }
    return location;
  };

  // Helper: Get localized tag
  const getLocalizedTag = (tag) => {
    if ((language === 'jp' || language === 'kr') && t.metadataLabels && t.metadataLabels[tag]) {
      return t.metadataLabels[tag];
    }
    return tag;
  };

  // Helper: Get localized job type
  const getLocalizedType = (type) => {
    if ((language === 'jp' || language === 'kr') && t.metadataLabels && t.metadataLabels[type]) {
      return t.metadataLabels[type];
    }
    return type;
  };

  // Helper: Get localized timestamp
  const getLocalizedTimestamp = (timestamp) => {
    if ((language === 'jp' || language === 'kr') && t.metadataLabels) {
      // Check for exact match first
      if (t.metadataLabels[timestamp]) {
        return t.metadataLabels[timestamp];
      }

      // Handle dynamic timestamps like "2h ago", "3 days ago"
      const hourMatch = timestamp.match(/(\d+)h ago/);
      if (hourMatch && language === 'jp') {
        return `${hourMatch[1]}時間前`;
      }

      const dayMatch = timestamp.match(/(\d+) days? ago/);
      if (dayMatch && language === 'jp') {
        return `${dayMatch[1]}日前`;
      }

      const weekMatch = timestamp.match(/(\d+) weeks? ago/);
      if (weekMatch && language === 'jp') {
        return `${weekMatch[1]}週間前`;
      }

      const monthMatch = timestamp.match(/(\d+) months? ago/);
      if (monthMatch && language === 'jp') {
        return `${monthMatch[1]}ヶ月前`;
      }
    }
    return timestamp;
  };

  // --- Action Handlers ---
  const handleApply = (job) => {
    // Check if this is an iGaming / gambling industry position OR premium FX/Finance position
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
      combined.includes('live game');

    const isPremiumFinanceJob =
      combined.includes('exness') ||
      combined.includes('xm') ||
      combined.includes('ic markets') ||
      combined.includes('fx trading') ||
      combined.includes('forex') ||
      combined.includes('retention agent') ||
      (combined.includes('account manager') && combined.includes('financial'));

    if (isGamblingJob || isPremiumFinanceJob) {
      // iGaming & Premium Finance positions: Redirect to custom application form
      const params = new URLSearchParams({
        job: job.title,
        company: job.company,
        url: job.apply_url
      });
      window.location.href = `/apply-info?${params.toString()}`;
    } else {
      // All other positions: Redirect to original job URL
      if (job.apply_url && job.apply_url !== '/apply') {
        window.open(job.apply_url, '_blank');
      } else {
        // Fallback if no valid URL
        showToastMessage('No application URL available', 'error');
      }
    }
  };

  const handlePostJob = () => {
    setShowPricingModal(true);
  };

  const initiateCheckout = (name, price) => {
    console.log('🔵 initiateCheckout called:', { name, price });
    setSelectedPlan({ name, price });
    console.log('🟢 selectedPlan set');
    setShowPricingModal(false);
    console.log('🟠 modal closed');
    setView('checkout');
    console.log('🟣 view changed to checkout');
    window.scrollTo(0, 0);
  };

  const handleCheckoutSuccess = () => {
    setView('submission');
    window.scrollTo(0, 0);
  };

  const handleSubmissionFinish = () => {
    setView('success');
    window.scrollTo(0, 0);
  };

  // --- RENDER VIEWS ---
  if (view === 'checkout' && selectedPlan) {
    return (
      <InvoiceCheckout
        planName={selectedPlan.name}
        price={selectedPlan.price}
        onCancel={() => setView('home')}
        onSuccess={handleCheckoutSuccess}
      />
    );
  }

  if (view === 'submission') {
    return <JobSubmissionForm onFinish={handleSubmissionFinish} />;
  }

  if (view === 'success') {
    return <SuccessView onHome={() => setView('home')} />;
  }

  // --- RENDER HOME VIEW ---
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 relative">

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[110] animate-fade-in-up">
          <div className={`px-4 py-3 rounded-lg shadow-xl flex items-center gap-3 ${toast.type === 'success' ? 'bg-slate-900 text-white' : 'bg-red-500 text-white'}`}>
            {toast.type === 'success' ? <CheckCircle2 size={20} className="text-emerald-400" /> : <XCircle size={20} />}
            <span className="font-medium text-sm">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Redirect Overlay */}
      {redirectingJob && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-fade-in">
           <div className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full text-center">
             <div className="w-12 h-12 mx-auto mb-4 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center animate-spin">
               <Loader2 size={24} />
             </div>
             <h3 className="text-lg font-bold text-slate-900 mb-1">Connecting to {redirectingJob.company}...</h3>
             <p className="text-sm text-slate-500 mb-4">Redirecting you to their official career page.</p>
             <div className="text-xs text-slate-400 bg-slate-50 p-2 rounded truncate">
               {redirectingJob.apply_url}
             </div>
           </div>
        </div>
      )}

      {/* Pricing Modal */}
      {showPricingModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden relative border border-slate-200">
            <button onClick={() => setShowPricingModal(false)} className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full transition">
              <X size={20} className="text-slate-500" />
            </button>

            <div className="p-8 text-center">
              <div className="inline-flex p-3 bg-blue-50 text-blue-600 rounded-full mb-4">
                <Globe size={32} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Reach 10,000+ Multilingual Talent</h2>
              <p className="text-slate-500 mb-8">Pay once. Hire forever.</p>

              <div className="space-y-4">
                {/* Professional Plan */}
                <div
                  onClick={() => initiateCheckout('Professional', '€599')}
                  className="border border-slate-200 rounded-xl p-4 hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer group text-left relative"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-slate-900 group-hover:text-blue-600">Professional Listing</h3>
                    <span className="text-lg font-bold text-slate-900">€599</span>
                  </div>
                  <ul className="text-sm text-slate-500 space-y-1">
                    <li className="flex items-center gap-2"><Check size={14} className="text-emerald-500" /> <b>One-time</b> flat fee</li>
                    <li className="flex items-center gap-2"><Check size={14} className="text-emerald-500" /> <b>30 Days</b> Active Listing</li>
                    <li className="flex items-center gap-2"><Check size={14} className="text-emerald-500" /> <b>AI-Verified</b> Badge included</li>
                  </ul>
                </div>

                {/* Enterprise Plan */}
                <div
                  onClick={() => initiateCheckout('Enterprise Spotlight', '€999')}
                  className="border-2 border-yellow-400 bg-yellow-50/30 rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer group text-left relative"
                >
                  <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-1 rounded-bl-lg">BEST ROI</div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-slate-900 group-hover:text-yellow-700">Enterprise Spotlight</h3>
                    <span className="text-lg font-bold text-slate-900">€999</span>
                  </div>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> <b>Pinned to Top</b> (7 Days)</li>
                    <li className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> <b>2x</b> Social Media Blasts (LinkedIn/X)</li>
                    <li className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> <b>Direct Email</b> to Top Candidates</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 text-xs text-slate-400">
                Secure payment via Stripe. No subscription. No hidden fees.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- System Status Bar --- */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 border-b border-slate-800 hidden md:flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Crawler Status: <span className="text-emerald-400 font-mono">Active</span>
          </span>
          <span className="flex items-center gap-1">
            <Globe size={10} /> Sources Scanned: <span className="text-white font-mono">142</span>
          </span>
          <span className="flex items-center gap-1">
            <RefreshCw size={10} /> Last Update: <span className="text-white font-mono">{lastUpdated}</span>
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Bot size={12} className="text-blue-400" />
          <span>AI Filtering Engine v1.2.0</span>
        </div>
      </div>

      {/* --- Header / Navigation --- */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2" onClick={() => { setView('home'); window.scrollTo(0,0); }} style={{cursor: 'pointer'}}>
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-blue-200 shadow-lg">
                RL
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">RemoteLingo</span>
            </div>

            {/* Language Switcher */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-200">
              <Globe size={14} className="text-slate-500" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="text-sm border-none bg-transparent cursor-pointer font-medium text-slate-700 focus:outline-none"
              >
                <option value="en">EN</option>
                <option value="jp">日本語</option>
                <option value="kr">한국어</option>
              </select>
            </div>

            {/* Functional Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => scrollToSection('job-feed')}
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
              >
                {t.navForTalent}
              </button>
              <a
                href="https://tally.so/r/zxjRGR"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors font-semibold"
              >
                {t.navJoinPool}
              </a>
              <button
                onClick={() => setShowPricingModal(true)}
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
              >
                {t.navPricing}
              </button>
              <button
                onClick={handlePostJob}
                className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-slate-800 transition-colors shadow-lg shadow-blue-500/20 flex items-center gap-2 hover:scale-105 active:scale-95 duration-200"
              >
                {t.navPostJob} <span className="bg-slate-700 px-1.5 py-0.5 rounded text-[10px] text-blue-200">{t.navHiring}</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-600">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 p-4 space-y-4 shadow-xl absolute w-full z-40">
            {/* Language Switcher for Mobile */}
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg border border-slate-200">
              <Globe size={14} className="text-slate-500" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="text-sm border-none bg-transparent cursor-pointer font-medium text-slate-700 focus:outline-none w-full"
              >
                <option value="en">EN - English</option>
                <option value="jp">JP - 日本語</option>
                <option value="kr">KR - 한국어</option>
              </select>
            </div>

            <button
              onClick={() => { scrollToSection('job-feed'); setIsMobileMenuOpen(false); }}
              className="block w-full text-left font-medium text-slate-600 p-2 hover:bg-slate-50 rounded"
            >
              {t.navForTalent}
            </button>
            <a
              href="https://tally.so/r/zxjRGR"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-left font-bold text-blue-600 p-2 hover:bg-slate-50 rounded"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.navJoinPool}
            </a>
            <button
              onClick={() => { setShowPricingModal(true); setIsMobileMenuOpen(false); }}
              className="block w-full text-left font-medium text-slate-600 p-2 hover:bg-slate-50 rounded"
            >
              {t.navPricing}
            </button>
            <button
              onClick={() => { setShowPricingModal(true); setIsMobileMenuOpen(false); }}
              className="block w-full text-center bg-blue-600 text-white font-bold py-3 rounded-lg"
            >
              {t.navPostJob}
            </button>
          </div>
        )}
      </nav>

      {/* --- Hero Section --- */}
      <div className="bg-white relative overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] bg-[size:20px_20px]" />
        <div className="max-w-4xl mx-auto px-4 pt-16 pb-12 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wide mb-6 border border-blue-100 animate-fade-in-up">
            <Bot size={12} /> {t.aiVerified}
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
            {t.heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            {t.heroSubtitle}
          </p>

          {/* Language Pills (Quick Filter) */}
          <div className="flex flex-wrap justify-center gap-3 relative z-20">
            {LANGUAGES.slice(1).map(lang => (
              <button
                key={lang.code}
                onClick={() => setSelectedLang(lang.code === selectedLang ? 'all' : lang.code)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedLang === lang.code
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105 ring-2 ring-offset-2 ring-blue-600'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                {lang.translationKey ? t[lang.translationKey] : lang.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- Candidate Pipeline Stats Bar --- */}
      <CandidatePipelineStats />

      {/* --- Main Content: Sidebar + Job Feed --- */}
      <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">

        {/* Sidebar Filters (Desktop) */}
        <aside className="hidden md:block w-64 flex-shrink-0 space-y-8">
          <div>
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Filter size={18} /> {t.smartFilters}
            </h3>

            <div className="space-y-6">
              {/* Job Type Filter */}
              <div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">{t.jobType}</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="jobType"
                      className="accent-blue-600"
                      checked={selectedType === 'All'}
                      onChange={() => setSelectedType('All')}
                    />
                    <span className="text-sm text-slate-600 group-hover:text-blue-600 transition-colors">{t.anyType}</span>
                  </label>
                  {JOB_TYPES.map(type => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="jobType"
                        className="accent-blue-600"
                        checked={selectedType === type}
                        onChange={() => setSelectedType(type)}
                      />
                      <span className="text-sm text-slate-600 group-hover:text-blue-600 transition-colors">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Perks Filter */}
              <div className="pt-6 border-t border-slate-200">
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">{t.perks}</h4>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    checked={showRelocationOnly}
                    onChange={(e) => setShowRelocationOnly(e.target.checked)}
                  />
                  <span className="text-sm text-slate-700 font-medium group-hover:text-blue-600 transition-colors">
                    {t.relocationSupport}
                  </span>
                </label>
              </div>

              {/* Newsletter Box (Lead Gen) */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-10">
                  <Bot size={64} />
                </div>
                <h4 className="font-bold text-blue-900 text-sm mb-2 flex items-center gap-2">
                  <Sparkles size={14} className="text-yellow-500" />
                  {t.dailyAlerts}
                </h4>
                <p className="text-xs text-blue-700 mb-3 leading-relaxed">
                  {t.newsletterDesc}
                </p>
                <input type="email" placeholder={t.emailPlaceholder} className="w-full px-3 py-2 rounded-lg border border-blue-200 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
                <button className="w-full bg-blue-600 text-white text-xs font-bold py-2 rounded-lg hover:bg-blue-700 transition shadow-md">
                  {t.activateAlerts}
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Job List Feed - Added ID for Scrolling */}
        <main id="job-feed" className="flex-1 scroll-mt-24">
          <div id="job-list" className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              {t.latestMatches}
              <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded-full">{totalJobs}</span>
            </h2>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span className="hidden sm:inline">{t.sortedBy}</span>
              <select className="bg-transparent font-medium text-slate-900 focus:outline-none cursor-pointer">
                <option>{t.sortNewest}</option>
                <option>{t.sortHighestSalary}</option>
                <option>{t.sortBestMatch}</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {currentJobs.map(originalJob => {
              // Apply client-side localization (data/presentation separation)
              const job = getLocalizedJob(originalJob, language);

              return (
              <div
                key={job.id}
                data-company={job.company}
                data-status={job.status}
                className={`group relative bg-white rounded-xl p-5 sm:p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border ${job.featured ? 'border-yellow-400 shadow-yellow-100 ring-1 ring-yellow-400/20' : 'border-slate-200 shadow-sm'}`}
              >
                {job.featured && (
                  <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg">
                    {t.featured}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-5">
                  {/* Professional Monochromatic Icon */}
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shadow-sm flex-shrink-0">
                    {getCategoryIcon(job)}
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {job.title}
                          </h3>
                          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full whitespace-nowrap">
                            {t.partnershipTag}
                          </span>
                          {job.ai_verified && (
                             <div className="group/tooltip relative">
                               <CheckCircle2 size={16} className="text-emerald-500 cursor-help" />
                             </div>
                          )}
                        </div>
                        <div className="text-sm font-medium text-slate-600 mb-1 flex items-center gap-2 flex-wrap">
                          {t.companyLabels[job.company] || job.company}
                          {/* Status Badges */}
                          {job.status === 'priority' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-emerald-50 to-blue-50 text-emerald-700 border border-emerald-200 shadow-sm">
                              <Zap size={12} className="text-emerald-600" />
                              {language === 'jp' ? '優先採用 / 即日対応' : language === 'kr' ? '우선 채용 / 즉시 대응' : 'High Priority / Fast Track'}
                            </span>
                          )}
                          {job.status === 'delayed' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-orange-50 text-orange-700 border border-orange-200">
                              <Clock size={12} className="text-orange-600" />
                              {language === 'jp' ? '採用保留中 / プロセス遅延' : language === 'kr' ? '대기 명단 / 프로세스 지연' : 'Waitlist / Process Delayed'}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center text-sm font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg self-start whitespace-nowrap">
                        <DollarSign size={14} className="mr-1 text-green-600" />
                        {job.currency === 'EUR' ? '€' : '$'}{job.salary_min.toLocaleString()} - {job.salary_max.toLocaleString()}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500 mb-3">
                      <div className="flex items-center gap-1"><MapPin size={14} /> {job.location}</div>
                      <div className="flex items-center gap-1"><Briefcase size={14} /> {getLocalizedType(job.type)}</div>
                      <div className="flex items-center gap-1"><Clock size={14} /> {getLocalizedTimestamp(job.posted_at)}</div>
                    </div>

                    {/* AI Summary Box */}
                    {job.summary && (
                      <div className="mb-4 text-xs text-slate-500 italic bg-slate-50 p-2 rounded border border-slate-100 flex items-start gap-2">
                        <Bot size={14} className="text-blue-400 flex-shrink-0 mt-0.5" />
                        {typeof job.summary === 'string'
                          ? job.summary
                          : (job.summary[language] || job.summary.en || '')}
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-slate-100">
                      <div className="flex flex-wrap gap-2">
                        {job.languages.map((lang, idx) => (
                           <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
                             {getLocalizedTag(lang)}
                           </span>
                        ))}
                        {job.tags && job.tags.map((tag, idx) => (
                          <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-600">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="hidden sm:flex flex-col items-end mr-2">
                          <span className="text-[10px] text-slate-400 font-bold uppercase">{t.matchScore}</span>
                          <span className={`text-sm font-bold ${job.match_score > 90 ? 'text-emerald-600' : 'text-blue-600'}`}>
                            {job.match_score}%
                          </span>
                        </div>
                        <button onClick={() => handleApply(job)} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors shadow-lg shadow-slate-200">
                          {t.applyNow} <ArrowUpRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              );
            })}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-8 pt-6 border-t border-slate-200">
                {/* Showing text */}
                <div className="text-center text-sm text-slate-600 mb-4">
                  {t.showing} {indexOfFirstJob + 1}-{Math.min(indexOfLastJob, totalJobs)} {t.of} {totalJobs} {t.jobs}
                </div>

                {/* Pagination buttons */}
                <div className="flex items-center justify-center gap-2">
                  {/* Previous button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      currentPage === 1
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 hover:border-slate-400'
                    }`}
                  >
                    ← {t.previous}
                  </button>

                  {/* Page numbers */}
                  <div className="flex gap-1">
                    {[...Array(totalPages)].map((_, index) => {
                      const pageNum = index + 1;
                      // Show first page, last page, current page and adjacent pages
                      if (
                        pageNum === 1 ||
                        pageNum === totalPages ||
                        (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                              currentPage === pageNum
                                ? 'bg-blue-600 text-white shadow-lg scale-105'
                                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 hover:border-blue-400'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      } else if (
                        pageNum === currentPage - 2 ||
                        pageNum === currentPage + 2
                      ) {
                        return <span key={pageNum} className="flex items-center px-2 text-slate-400">...</span>;
                      }
                      return null;
                    })}
                  </div>

                  {/* Next button */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      currentPage === totalPages
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 hover:border-slate-400'
                    }`}
                  >
                    {t.next} →
                  </button>
                </div>
              </div>
            )}

            {/* Empty State */}
            {filteredJobs.length === 0 && (
              <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
                <div className="inline-flex p-4 bg-slate-50 rounded-full mb-4">
                  <Search size={32} className="text-slate-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">No jobs found for this filter.</h3>
                <p className="text-slate-500 mb-6">Our bots are scanning. Set an alert?</p>
                <button className="text-blue-600 font-bold hover:underline">Create Alert</button>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* --- Footer & Manifesto --- */}
      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t.footerTitle}</h2>

            {/* Thesis Statement */}
            <p className="text-slate-900 font-bold text-lg mb-4">
              {t.footerThesis} <span className="text-blue-600">{t.footerThesisHighlight}</span>
            </p>

            {/* Market Problem */}
            <p className="text-slate-600 mb-6 leading-relaxed">
              {t.footerProblem}
              <span className="font-semibold text-slate-900"> {t.footerProblemHighlight} </span>
              {t.footerProblemEnd}
            </p>

            {/* Solution Box */}
            <div className="bg-slate-50 border-l-4 border-blue-600 p-4 mb-6 text-left max-w-2xl mx-auto">
              <p className="text-slate-800 font-medium mb-1">
                {t.footerSolutionTitle} <span className="text-blue-700">{t.footerSolutionHighlight}</span>.
              </p>
              <p className="text-slate-600 text-sm">
                {t.footerSolutionDesc} <strong>{t.footerSolutionBridge}</strong> {t.footerSolutionEnd}
              </p>
            </div>
            <div className="flex justify-center gap-8">
               <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">500+</div>
                  <div className="text-sm text-slate-500 uppercase tracking-wide">{t.statsSources}</div>
               </div>
               <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">24h</div>
                  <div className="text-sm text-slate-500 uppercase tracking-wide">{t.statsUpdateCycle}</div>
               </div>
               <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">0%</div>
                  <div className="text-sm text-slate-500 uppercase tracking-wide">{t.statsSpamTolerance}</div>
               </div>
            </div>
        </div>

        <div className="border-t border-slate-100 py-8">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-slate-400 text-sm mb-4">
              &copy; 2025 RemoteLingo Inc. • The Global Arbitrage Engine.
            </p>
            <div className="flex justify-center gap-6 text-sm text-slate-400">
              <a href="#" className="hover:text-slate-900">Twitter (Founder)</a>
              <a href="#" className="hover:text-slate-900">Terms of Service</a>
              <a href="#" className="hover:text-slate-900">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

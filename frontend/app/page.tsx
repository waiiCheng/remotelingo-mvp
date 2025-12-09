'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Search, MapPin, Globe, DollarSign, Clock, Briefcase, ChevronRight, CheckCircle2, Menu, X, Filter, Bot, Sparkles, RefreshCw, ExternalLink, ArrowUpRight, XCircle, CreditCard, Check, Loader2, Lock, ArrowLeft, ShieldCheck } from 'lucide-react';
import { api } from '@/lib/api';
import type { Job } from '@/lib/supabase';

// --- Mock Data (FALLBACK ONLY) ---
const JOBS_DATA = [
  {
    id: 1,
    title: "Bilingual Language Expert (English-Japanese)",
    company: "Mercor",
    logoBg: "bg-blue-500",
    initials: "ME",
    languages: ["Japanese", "English"],
    salary_min: 46000,
    salary_max: 64400,
    currency: "EUR",
    location: "Remote",
    type: "Full-time",
    tags: ["Bilingual", "Translation", "AI"],
    posted_at: "Today",
    featured: true,
    ai_verified: true,
    source: "Partner Network",
    match_score: 92,
    summary: "Assess the quality and naturalness of translations, focusing on fluency, local phrasing, and cultural relevance in Japanese.",
    apply_url: "https://benture.io/job/bilingual-language-expert-english-japanese-at-mercor"
  },
  {
    id: 2,
    title: "Senior Software Engineer (Backend)",
    company: "CADDi",
    logoBg: "bg-green-500",
    initials: "CA",
    languages: ["Japanese", "English"],
    salary_min: 37200,
    salary_max: 74400,
    currency: "EUR",
    location: "Remote",
    type: "Full-time",
    tags: ["Software Engineering", "Backend"],
    posted_at: "Today",
    featured: true,
    ai_verified: true,
    source: "Partner Network",
    match_score: 88,
    summary: "Senior Software Engineer position at CADDi with basic Japanese OK, work from anywhere in Japan, salary up to ¥12M.",
    apply_url: "https://japan-dev.com/jobs/caddi/caddi-senior-software-engineer-backend---english-i6b8nk"
  },
  {
    id: 3,
    title: "QA Automation Lead Engineer",
    company: "Money Forward",
    logoBg: "bg-red-500",
    initials: "MF",
    languages: ["Japanese", "English"],
    salary_min: 30000,
    salary_max: 58900,
    currency: "EUR",
    location: "Remote",
    type: "Full-time",
    tags: ["QA", "Automation", "Engineering"],
    posted_at: "Today",
    featured: false,
    ai_verified: true,
    source: "Partner Network",
    match_score: 85,
    summary: "Money Forward is looking for a QA Automation Lead Engineer with basic Japanese OK, partial remote work, salary up to ¥9.5M.",
    apply_url: "https://japan-dev.com/jobs/money-forward/money-forward-qa-automation-lead-engineer-money-forward-x-tokyo-aycmvk"
  },
  {
    id: 4,
    title: "Highly Skilled IT Engineer",
    company: "MORABU Hanshin Industrial",
    logoBg: "bg-yellow-500",
    initials: "MH",
    languages: ["Japanese", "English"],
    salary_min: 40000,
    salary_max: 60000,
    currency: "EUR",
    location: "Remote",
    type: "Full-time",
    tags: ["IT", "Engineering"],
    posted_at: "Today",
    featured: false,
    ai_verified: true,
    source: "Partner Network",
    match_score: 83,
    summary: "Recruiting highly skilled IT engineers with JLPT N2, wishing to live and work in Japan for many years.",
    apply_url: "https://recruit.morabu.com/en/"
  },
  {
    id: 5,
    title: "English Localization Helper for Mobile App",
    company: "Panory",
    logoBg: "bg-purple-500",
    initials: "PA",
    languages: ["Japanese", "English"],
    salary_min: 30000,
    salary_max: 50000,
    currency: "EUR",
    location: "Remote",
    type: "Full-time",
    tags: ["Localization", "Translation", "Mobile App"],
    posted_at: "Today",
    featured: false,
    ai_verified: true,
    source: "Partner Network",
    match_score: 80,
    summary: "Looking for native English speaker who can communicate in Japanese to help with English localization of a mobile app, compensation available.",
    apply_url: "https://x.com/ObataGenta/status/1995705890683654410"
  },
  {
    id: 6,
    title: "Player Support KR/JP/EN: Night shift",
    company: "Side",
    logoBg: "bg-indigo-500",
    initials: "SI",
    languages: ["Japanese", "English"],
    salary_min: 30000,
    salary_max: 50000,
    currency: "EUR",
    location: "Remote",
    type: "Full-time",
    tags: ["Customer Service", "Support", "Gaming"],
    posted_at: "Today",
    featured: false,
    ai_verified: true,
    source: "Partner Network",
    match_score: 78,
    summary: "Remote, entry-level multilingual support role for player support in Korean, Japanese, and English during night shift.",
    apply_url: "https://x.com/HitmarkerJobs/status/1997776889218486767"
  },
  {
    id: 7,
    title: "Cloud Engineer",
    company: "Large Japanese IT Company",
    logoBg: "bg-teal-500",
    initials: "LJ",
    languages: ["Japanese", "English"],
    salary_min: 24800,
    salary_max: 31000,
    currency: "EUR",
    location: "Remote",
    type: "Full-time",
    tags: ["Cloud", "Engineering", "AWS", "Azure", "GCP"],
    posted_at: "Today",
    featured: false,
    ai_verified: true,
    source: "Partner Network",
    match_score: 82,
    summary: "Participate in cloud environment building, monitoring, and fault handling for AWS/Azure/GCP, with business Japanese required.",
    apply_url: "https://x.com/watomirai/status/1995721144574640161"
  },
  {
    id: 8,
    title: "Java Developer",
    company: "Ark Wiz Consulting",
    logoBg: "bg-cyan-500",
    initials: "AW",
    languages: ["Japanese", "English"],
    salary_min: 40000,
    salary_max: 60000,
    currency: "EUR",
    location: "Remote",
    type: "Full-time",
    tags: ["Java", "Spring", "SQL"],
    posted_at: "Today",
    featured: false,
    ai_verified: true,
    source: "Partner Network",
    match_score: 84,
    summary: "Java basic remote job with requirements for Java (Spring) experience 3 years, basic design, SQL tuning, batch development.",
    apply_url: "https://x.com/awc_sekine/status/1996466008513777927"
  },
  {
    id: 9,
    title: "Bilingual Interpreter Translator and Assistant",
    company: "Interesse International Inc",
    logoBg: "bg-lime-500",
    initials: "II",
    languages: ["Japanese", "English"],
    salary_min: 30000,
    salary_max: 50000,
    currency: "EUR",
    location: "Remote",
    type: "Full-time",
    tags: ["Interpreter", "Translator"],
    posted_at: "Today",
    featured: false,
    ai_verified: true,
    source: "Partner Network",
    match_score: 81,
    summary: "Candidates who enjoy helping others using Japanese are highly welcome.",
    apply_url: "https://nihongojobs.com/job/interesse-international-inc-washington-in-full-time-j-e-bilingual-interpreter-translator-and-assistant/"
  },
  {
    id: 10,
    title: "Assoc Business Administration Specialist (Bilingual Japanese)",
    company: "Nintendo of America",
    logoBg: "bg-pink-500",
    initials: "NA",
    languages: ["Japanese", "English"],
    salary_min: 40000,
    salary_max: 60000,
    currency: "EUR",
    location: "Remote",
    type: "Full-time",
    tags: ["Business Administration", "Bilingual"],
    posted_at: "Today",
    featured: true,
    ai_verified: true,
    source: "Partner Network",
    match_score: 90,
    summary: "Assoc Business Administration Specialist with bilingual Japanese skills.",
    apply_url: "https://app.careerarc.com/job_postings/6604843"
  },
  {
    id: 11,
    title: "Bilingual Language Expert (English-Korean)",
    company: "Mercor",
    logoBg: "bg-blue-500",
    initials: "ME",
    languages: ["Korean", "English"],
    salary_min: 64400,
    salary_max: 73600,
    currency: "EUR",
    location: "Remote",
    type: "Full-time",
    tags: ["Bilingual", "Translation", "AI"],
    posted_at: "Today",
    featured: true,
    ai_verified: true,
    source: "Partner Network",
    match_score: 95,
    summary: "Bilingual Language Expert (English-Korean) for remote work worldwide.",
    apply_url: "https://benture.io/job/bilingual-language-expert-english-korean-at-mercor"
  },
  {
    id: 12,
    title: "Back End / Full Stack Developer",
    company: "SpaceVision AI, Inc.",
    logoBg: "bg-green-500",
    initials: "SA",
    languages: ["Korean", "English"],
    salary_min: 50000,
    salary_max: 100000,
    currency: "EUR",
    location: "Remote",
    type: "Full-time",
    tags: ["Backend", "Full Stack", "Python"],
    posted_at: "Today",
    featured: false,
    ai_verified: true,
    source: "Partner Network",
    match_score: 87,
    summary: "Back End / Full Stack Developer position requiring business Korean.",
    apply_url: "https://dev-korea.com/jobs/spacevision-ai-inc-back-end-full-stack-developer"
  },
  {
    id: 13,
    title: "Engineering Manager, ML Data",
    company: "Twelve Labs",
    logoBg: "bg-red-500",
    initials: "TL",
    languages: ["Korean", "English"],
    salary_min: 80000,
    salary_max: 120000,
    currency: "EUR",
    location: "Remote",
    type: "Full-time",
    tags: ["Engineering", "Machine Learning", "Data"],
    posted_at: "Today",
    featured: true,
    ai_verified: true,
    source: "Partner Network",
    match_score: 93,
    summary: "Engineering Manager for ML Data requiring business Korean, hybrid in Seoul.",
    apply_url: "https://dev-korea.com/jobs/twelve-labs-engineering-manager-ml-data-3b79cf3b"
  },
  {
    id: 14,
    title: "Growth Lead, Korea",
    company: "OpenAI",
    logoBg: "bg-yellow-500",
    initials: "OA",
    languages: ["Korean", "English"],
    salary_min: 100000,
    salary_max: 150000,
    currency: "EUR",
    location: "Remote",
    type: "Full-time",
    tags: ["Growth", "Marketing"],
    posted_at: "Today",
    featured: true,
    ai_verified: true,
    source: "Partner Network",
    match_score: 96,
    summary: "Remote Growth Lead for Korea at OpenAI.",
    apply_url: "https://jobicy.com/jobs/137311-growth-lead-korea"
  },
  {
    id: 15,
    title: "Assistant/Associate/Full Professor of Computational Linguistics",
    company: "Seoul National University",
    logoBg: "bg-purple-500",
    initials: "SN",
    languages: ["Korean", "English"],
    salary_min: 60000,
    salary_max: 100000,
    currency: "EUR",
    location: "Remote",
    type: "Full-time",
    tags: ["Computational Linguistics", "Professor"],
    posted_at: "Today",
    featured: false,
    ai_verified: true,
    source: "Partner Network",
    match_score: 89,
    summary: "Open-rank, tenure-track position in computational linguistics at Seoul National University.",
    apply_url: "https://linguistlist.org/issues/36/3725/"
  },
  {
    id: 16,
    title: "Player Support KR/JP/EN: Night shift",
    company: "Side",
    logoBg: "bg-indigo-500",
    initials: "SI",
    languages: ["Korean", "English"],
    salary_min: 30000,
    salary_max: 50000,
    currency: "EUR",
    location: "Remote",
    type: "Full-time",
    tags: ["Customer Service", "Support", "Gaming"],
    posted_at: "Today",
    featured: false,
    ai_verified: true,
    source: "Partner Network",
    match_score: 78,
    summary: "Remote, entry-level multilingual support role for player support in Korean, Japanese, and English during night shift.",
    apply_url: "https://x.com/HitmarkerJobs/status/1997776889218486767"
  },
  {
    id: 17,
    title: "Localization Quality Assurance (Korean)",
    company: "Amber Studio",
    logoBg: "bg-teal-500",
    initials: "AS",
    languages: ["Korean", "English"],
    salary_min: 40000,
    salary_max: 60000,
    currency: "EUR",
    location: "Remote",
    type: "Full-time",
    tags: ["Localization", "QA", "Game Development"],
    posted_at: "Today",
    featured: false,
    ai_verified: true,
    source: "Partner Network",
    match_score: 85,
    summary: "Localization Quality Assurance role for Korean, presencial or remote at Amber Studio.",
    apply_url: "https://jobs.jobvite.com/amber-studio"
  },
  {
    id: 18,
    title: "Translation and Content Planning",
    company: "Incheon Sondo",
    logoBg: "bg-cyan-500",
    initials: "IS",
    languages: ["Korean", "English"],
    salary_min: 30000,
    salary_max: 50000,
    currency: "EUR",
    location: "Remote",
    type: "Full-time",
    tags: ["Translation", "Content Planning"],
    posted_at: "Today",
    featured: false,
    ai_verified: true,
    source: "Partner Network",
    match_score: 79,
    summary: "Job for translation and content planning, F visa holders, interested contact DM.",
    apply_url: "https://x.com/arinchang00/status/1996548736378704041"
  },
  {
    id: 19,
    title: "Staff for Korean Study Abroad Agent",
    company: "GOGO KOREA",
    logoBg: "bg-lime-500",
    initials: "GK",
    languages: ["Korean", "English"],
    salary_min: 30000,
    salary_max: 50000,
    currency: "EUR",
    location: "Remote",
    type: "Full-time",
    tags: ["Staff", "Remote Work", "Study Abroad"],
    posted_at: "Today",
    featured: false,
    ai_verified: true,
    source: "Partner Network",
    match_score: 77,
    summary: "Recruiting staff for business expansion, Korean study abroad experience, work with Korean language, remote possible.",
    apply_url: "https://x.com/gogo__korea/status/1996504757125419463"
  },
  {
    id: 20,
    title: "Developer Support Engineer",
    company: "RevenueCat",
    logoBg: "bg-pink-500",
    initials: "RC",
    languages: ["Korean", "English"],
    salary_min: 50000,
    salary_max: 80000,
    currency: "EUR",
    location: "Remote",
    type: "Full-time",
    tags: ["Developer Support", "Android", "iOS"],
    posted_at: "Today",
    featured: false,
    ai_verified: true,
    source: "Partner Network",
    match_score: 86,
    summary: "Developer Support Engineer position, no Korean required but including as per schema.",
    apply_url: "https://dev-korea.com/jobs/revenuecat-developer-support-engineer-8c0f2b99"
  }
];

// --- Constants ---
const LANGUAGES = [
  { code: 'all', name: 'All Languages', flag: '🌍' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
];

const JOB_TYPES = ["Full-time", "Contract", "Freelance", "Part-time"];

// --- Programmatic Color & Logo Generation (Fault Tolerant) ---
const COMPANY_COLORS = ['bg-blue-600', 'bg-emerald-500', 'bg-purple-600', 'bg-orange-500', 'bg-red-500', 'bg-slate-800', 'bg-teal-500', 'bg-indigo-600', 'bg-pink-600', 'bg-yellow-600'];

/**
 * Generate deterministic color from company name using hash
 */
function getCompanyColor(companyName: string): string {
  if (!companyName) return 'bg-blue-600';

  // Simple hash function
  let hash = 0;
  for (let i = 0; i < companyName.length; i++) {
    hash = companyName.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Pick color from array using hash
  const index = Math.abs(hash) % COMPANY_COLORS.length;
  return COMPANY_COLORS[index];
}

/**
 * Generate company initials from name
 */
function getInitials(companyName: string): string {
  if (!companyName) return 'CO';

  // Take first letter of each word (max 2)
  const words = companyName.trim().split(/\s+/);
  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  }
  return (words[0][0] + words[1][0]).toUpperCase();
}

// --- Google Sheets CSV URL ---
const GOOGLE_SHEET_CSV_URL: string | null = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSnipiSuYcsDgie5R9lZ4AB01ebQJ1VQv8m-Z-EI3G47eMn5opxigZOYZdFFDtvuYonkqJ2aqrKZ32G/pub?output=csv";

// --- Job Submission Form (Invoice Model - No Payment Required) ---
function JobSubmissionForm({ onFinish, planName }) {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    work_email: '',
    languages: '',
    location: 'Remote (Global)',
    type: 'Full-time',
    salary_min: '',
    salary_max: '',
    apply_url: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    // Clear any previous custom validation messages first
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.setCustomValidity('');
    });

    // Check validity and set custom English messages
    let isValid = true;
    inputs.forEach(input => {
      if (input.hasAttribute('required') && !input.value.trim()) {
        input.setCustomValidity('This field is required');
        isValid = false;
      } else if (input.type === 'email' && input.value && !input.validity.valid) {
        input.setCustomValidity('Please enter a valid email address');
        isValid = false;
      } else if (input.type === 'url' && input.value && !input.validity.valid) {
        input.setCustomValidity('Please enter a valid URL');
        isValid = false;
      }
    });

    // If form is invalid, show validation messages
    if (!isValid) {
      form.reportValidity();
      return;
    }

    setIsSubmitting(true);
    // Simulate API call to Supabase
    setTimeout(() => {
      setIsSubmitting(false);
      onFinish();
    }, 2000);
  };

  const clearValidation = (e) => {
    e.target.setCustomValidity('');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 animate-fade-in">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white">
              <Briefcase size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Submit Your Job Listing</h2>
              <p className="text-slate-500">Package: {planName}</p>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
              <DollarSign size={16} />
              Standard Listing Fee: €599
            </h3>
            <p className="text-sm text-blue-800">
              <b>Due after approval.</b> We will review your submission and send an invoice to your work email within 24 hours.
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-sm text-slate-600">
            <Bot size={16} className="inline mr-2" />
            Your job will be <b>AI-verified</b> and published within 24 hours after payment confirmation.
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-6" lang="en">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Job Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">Job Title *</label>
              <input
                required
                type="text"
                placeholder="e.g. Senior Frontend Engineer"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                onInput={clearValidation}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Company Name *</label>
              <input
                required
                type="text"
                placeholder="Your Company"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                onInput={clearValidation}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Work Email *</label>
              <input
                required
                type="email"
                placeholder="hr@company.com"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.work_email}
                onChange={(e) => setFormData({...formData, work_email: e.target.value})}
                onInput={clearValidation}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Languages Required *</label>
              <input
                required
                type="text"
                placeholder="e.g. Chinese (Mandarin), English"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.languages}
                onChange={(e) => setFormData({...formData, languages: e.target.value})}
                onInput={clearValidation}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
              <input
                type="text"
                placeholder="Remote (EU Timezone)"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Job Type</label>
              <select
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
              >
                <option>Full-time</option>
                <option>Contract</option>
                <option>Freelance</option>
                <option>Part-time</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Min Salary (EUR/USD)</label>
              <input
                type="number"
                placeholder="60000"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.salary_min}
                onChange={(e) => setFormData({...formData, salary_min: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Max Salary (EUR/USD)</label>
              <input
                type="number"
                placeholder="90000"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.salary_max}
                onChange={(e) => setFormData({...formData, salary_max: e.target.value})}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">Application URL *</label>
              <input
                required
                type="url"
                placeholder="https://yourcompany.com/careers/apply"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.apply_url}
                onChange={(e) => setFormData({...formData, apply_url: e.target.value})}
                onInput={clearValidation}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">Job Description (Optional)</label>
              <textarea
                rows={4}
                placeholder="Brief description of the role and requirements..."
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => onFinish()}
              className="flex-1 bg-slate-200 text-slate-700 font-bold py-4 rounded-lg hover:bg-slate-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 text-white font-bold py-4 rounded-lg hover:bg-blue-700 transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <CheckCircle2 size={20} />
                  Submit Application
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// 🔥 Broad-spectrum Color Registry - Handles all possible input formats
const COLOR_REGISTRY: Record<string, string> = {
  // Core color names (simple format)
  blue: "bg-blue-500",
  green: "bg-green-500",
  red: "bg-red-500",
  yellow: "bg-yellow-500",
  purple: "bg-purple-500",
  indigo: "bg-indigo-500",
  teal: "bg-teal-500",
  cyan: "bg-cyan-500",
  lime: "bg-lime-500",
  pink: "bg-pink-500",
  orange: "bg-orange-500",
  slate: "bg-slate-800",
  emerald: "bg-emerald-500",

  // Full Tailwind class names (for direct mapping)
  "bg-blue-500": "bg-blue-500",
  "bg-blue-600": "bg-blue-600",
  "bg-green-500": "bg-green-500",
  "bg-emerald-500": "bg-emerald-500",
  "bg-red-500": "bg-red-500",
  "bg-yellow-500": "bg-yellow-500",
  "bg-yellow-600": "bg-yellow-600",
  "bg-purple-500": "bg-purple-500",
  "bg-purple-600": "bg-purple-600",
  "bg-indigo-500": "bg-indigo-500",
  "bg-indigo-600": "bg-indigo-600",
  "bg-teal-500": "bg-teal-500",
  "bg-cyan-500": "bg-cyan-500",
  "bg-lime-500": "bg-lime-500",
  "bg-pink-500": "bg-pink-500",
  "bg-pink-600": "bg-pink-600",
  "bg-orange-500": "bg-orange-500",
  "bg-slate-800": "bg-slate-800",
};

// Data sanitizer - Normalizes any color input to valid Tailwind class
const getSafeColorClass = (input?: string): string => {
  if (!input) return "bg-slate-800";

  // Try exact match first
  if (COLOR_REGISTRY[input]) {
    return COLOR_REGISTRY[input];
  }

  // Extract core color name: "bg-blue-500" -> "blue"
  const coreColor = input.replace('bg-', '').replace(/-\d+$/, '');

  // Try core color match
  return COLOR_REGISTRY[coreColor] || "bg-slate-800";
};

export default function RemoteLingoMVP() {
  const [view, setView] = useState('home'); // 'home' | 'submission'
  const [selectedPlan, setSelectedPlan] = useState(null); // { name: string, price: string }

  const [selectedLang, setSelectedLang] = useState('all');
  const [selectedType, setSelectedType] = useState('All');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("Just now");

  const [showPricingModal, setShowPricingModal] = useState(false);
  const [redirectingJob, setRedirectingJob] = useState(null);
  const [toast, setToast] = useState(null);

  // --- Newsletter State ---
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterLoading, setNewsletterLoading] = useState(false);

  // --- Supabase Data State ---
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- Load Jobs (Priority: Google Sheets → Supabase → Mock Data) ---
  useEffect(() => {
    const loadJobs = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // PRIORITY 1: Try to fetch from Google Sheets CSV
        if (GOOGLE_SHEET_CSV_URL && GOOGLE_SHEET_CSV_URL.length > 0) {
          try {
            const response = await fetch(GOOGLE_SHEET_CSV_URL);
            const csvText = await response.text();

            // Check if response is HTML (error page) instead of CSV
            if (csvText.trim().startsWith('<') || csvText.includes('<!DOCTYPE') || csvText.includes('<html')) {
              console.warn('⚠️ Google Sheets returned HTML instead of CSV, using fallback data...');
              throw new Error('Invalid CSV format - received HTML');
            }

            // Robust CSV Parser (handles quoted values correctly)
            const parseJobsFromCSV = (csvText: string) => {
              try {
                const lines = csvText.trim().split('\n');
                if (lines.length < 2) return [];

                // Helper to parse CSV line respecting quotes
                const parseLine = (line: string) => {
                  const values: string[] = [];
                  let current = '';
                  let inQuotes = false;
                  for (let i = 0; i < line.length; i++) {
                    const char = line[i];
                    if (char === '"') { inQuotes = !inQuotes; }
                    else if (char === ',' && !inQuotes) { values.push(current.trim()); current = ''; }
                    else { current += char; }
                  }
                  values.push(current.trim());
                  return values.map(v => v.replace(/^"|"$/g, '').replace(/""/g, '"'));
                };

                return lines.slice(1).map((line, index) => {
                  const cols = parseLine(line);
                  if (cols.length < 5) return null;

                  const company = cols[2] || 'Company';

                  // Map columns - IGNORE logo/color, generate them programmatically
                  return {
                    id: index + 1,
                    title: cols[1] || 'Untitled Position',
                    company: company,
                    // GENERATED FIELDS (Fault Tolerant)
                    logo: getInitials(company),
                    initials: getInitials(company),
                    logoBg: getCompanyColor(company),
                    color: getCompanyColor(company),
                    // DATA FROM SHEET
                    languages: (cols[5] || '').split('|').map(s => s.trim()).filter(Boolean),
                    level: cols[6] || 'Fluent',
                    salary_min: parseInt(cols[7]) || 0,
                    salary_max: parseInt(cols[8]) || 0,
                    currency: cols[9] || 'EUR',
                    location: cols[10] || 'Remote',
                    type: cols[11] || 'Full-time',
                    tags: (cols[12] || '').split('|').map(s => s.trim()).filter(Boolean),
                    posted_at: cols[13] || '1d ago',
                    featured: cols[14]?.toUpperCase() === 'TRUE',
                    ai_verified: cols[15]?.toUpperCase() === 'TRUE',
                    source: cols[16] || 'Partner Network',
                    match_score: parseInt(cols[17]) || 80,
                    summary: cols[18] || '',
                    apply_url: cols[19]?.trim() || 'https://tally.so/r/LZ9Gk2' // Fallback to default form
                  };
                }).filter(Boolean);
              } catch (err) {
                console.error("CSV Parse Error:", err);
                return [];
              }
            };

            const parsedJobs = parseJobsFromCSV(csvText);

            if (parsedJobs.length > 0) {
              console.log(`✅ Loaded ${parsedJobs.length} jobs from Google Sheets`);
              setJobs(parsedJobs);
              setLastUpdated(new Date().toLocaleTimeString());
              setIsLoading(false);
              return; // Success, exit early
            }
          } catch (csvError) {
            console.warn('⚠️ Google Sheets fetch failed, trying Supabase...', csvError);
          }
        }

        // PRIORITY 2: Try Supabase (if Google Sheets failed or not configured)
        try {
          const response = await api.getJobs({
            lang: selectedLang,
            job_type: selectedType === 'All' ? undefined : selectedType,
          });

          if (response.jobs && response.jobs.length > 0) {
            console.log(`✅ Loaded ${response.jobs.length} jobs from Supabase`);
            setJobs(response.jobs);
            setLastUpdated(new Date().toLocaleTimeString());
            setIsLoading(false);
            return; // Success, exit early
          }
        } catch (supabaseError) {
          console.warn('⚠️ Supabase fetch failed, using mock data...', supabaseError);
        }

        // PRIORITY 3: Fallback to Mock Data
        console.log('📦 Using mock data as fallback');
        setJobs(JOBS_DATA);
        setLastUpdated(new Date().toLocaleTimeString());

      } catch (err: any) {
        console.error('❌ Error loading jobs:', err);
        setError(err.message || 'Failed to load jobs');
        // Final fallback to mock data
        setJobs(JOBS_DATA);
      } finally {
        setIsLoading(false);
      }
    };

    loadJobs();
  }, [selectedLang, selectedType]);

  // --- Filtering Logic (works with all data sources) ---
  const filteredJobs = useMemo(() => {
    let filtered = jobs;

    // Filter by language
    if (selectedLang && selectedLang !== 'all') {
      const langMap: { [key: string]: string } = {
        zh: 'Chinese',
        ko: 'Korean',
        ja: 'Japanese',
        de: 'German',
        es: 'Spanish',
        fr: 'French',
      };
      const targetLang = langMap[selectedLang];

      if (targetLang) {
        filtered = filtered.filter(job =>
          job.languages?.some(lang => lang.includes(targetLang))
        );
      }
    }

    // Filter by job type
    if (selectedType && selectedType !== 'All') {
      filtered = filtered.filter(job => job.type === selectedType);
    }

    return filtered;
  }, [jobs, selectedLang, selectedType]);

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

  // --- Action Handlers ---
  const handleApply = (job) => {
    // 1. Get base URL from sheet (e.g. https://tally.so/r/LZ9Gk2)
    let url = job.apply_url;

    // 2. Check if it's a Tally link and append Company Name
    if (url && url.includes('tally.so')) {
      const separator = url.includes('?') ? '&' : '?';
      // Tally uses "Company+Name" for "Company Name" label
      url = `${url}${separator}Company+Name=${encodeURIComponent(job.company)}`;
    }

    // 3. Show loading animation then open in new tab
    setRedirectingJob(job);
    setTimeout(() => {
      setRedirectingJob(null);
      if (url) {
        window.open(url, '_blank');
        showToastMessage(`Opening application for ${job.company}...`);
      } else {
        showToastMessage("Error: No apply link found", "error");
      }
    }, 2000);
  };

  const handlePostJob = () => {
    setShowPricingModal(true);
  };

  const initiateCheckout = (name, price) => {
    setSelectedPlan({ name, price });
    setShowPricingModal(false);
    setView('submission');
    // Scroll to top
    window.scrollTo(0, 0);
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();

    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToastMessage('Please enter a valid email address', 'error');
      return;
    }

    setNewsletterLoading(true);
    try {
      await api.subscribeNewsletter(newsletterEmail, selectedLang);
      showToastMessage('Successfully subscribed! Check your inbox.');
      setNewsletterEmail(''); // Clear input
    } catch (error: any) {
      showToastMessage(error.message || 'Failed to subscribe. Please try again.', 'error');
    } finally {
      setNewsletterLoading(false);
    }
  };

  // --- RENDER JOB SUBMISSION VIEW ---
  if (view === 'submission' && selectedPlan) {
    return (
      <JobSubmissionForm
        planName={selectedPlan.name}
        onFinish={() => {
          setView('home');
          showToastMessage(`Success! We have received your job. Check your email within 24 hours for the invoice.`);
        }}
      />
    );
  }

  // --- RENDER MAIN HOME VIEW ---
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
              <p className="text-slate-500 mb-8">Select a package to start hiring immediately.</p>

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
                    <li className="flex items-center gap-2"><Check size={14} className="text-emerald-500" /> <b>30 Days</b> Active Listing</li>
                    <li className="flex items-center gap-2"><Check size={14} className="text-emerald-500" /> <b>AI-Verified</b> Badge included</li>
                    <li className="flex items-center gap-2"><Check size={14} className="text-emerald-500" /> Shared in Weekly Newsletter</li>
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
                    <li className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> <b>Yellow Highlight</b> & Logo Boost</li>
                    <li className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> <b>2x</b> Social Media Blasts (LinkedIn/X)</li>
                    <li className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> <b>Direct Email</b> to Top Candidates</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 text-xs text-slate-400">
                Secure payment via Stripe. VAT invoice provided automatically.
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

            {/* Functional Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => scrollToSection('job-feed')}
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
              >
                For Talent
              </button>
              <button
                onClick={() => setShowPricingModal(true)}
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
              >
                Pricing
              </button>
              <button
                onClick={handlePostJob}
                className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-slate-800 transition-colors shadow-lg shadow-blue-500/20 flex items-center gap-2 hover:scale-105 active:scale-95 duration-200"
              >
                Submit Job for Review <span className="bg-slate-700 px-1.5 py-0.5 rounded text-[10px] text-blue-200">HIRING?</span>
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
            <button
              onClick={() => { scrollToSection('job-feed'); setIsMobileMenuOpen(false); }}
              className="block w-full text-left font-medium text-slate-600 p-2 hover:bg-slate-50 rounded"
            >
              For Talent
            </button>
            <button
              onClick={() => { setShowPricingModal(true); setIsMobileMenuOpen(false); }}
              className="block w-full text-left font-medium text-slate-600 p-2 hover:bg-slate-50 rounded"
            >
              Pricing
            </button>
            <button
              onClick={() => { setShowPricingModal(true); setIsMobileMenuOpen(false); }}
              className="block w-full text-center bg-blue-600 text-white font-bold py-3 rounded-lg"
            >
              Submit Job for Review
            </button>
          </div>
        )}
      </nav>

      {/* --- Hero Section --- */}
      <div className="bg-white relative overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] bg-[size:20px_20px]" />
        <div className="max-w-4xl mx-auto px-4 pt-16 pb-12 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wide mb-6 border border-blue-100 animate-fade-in-up">
            <Bot size={12} /> AI-Curated Job Feed
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
            Monetize Your <span className="text-blue-600">Language Skills</span>.<br/>
            <span className="relative inline-block">
              <span className="absolute inset-x-0 bottom-2 h-3 bg-yellow-200 -z-10 opacity-60 transform -rotate-1"></span>
              Precision Matched
            </span> by AI.
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            We scan 100+ career pages so you don&apos;t have to. Only <b>verified</b> multilingual remote roles. Zero spam.
          </p>

          {/* Language Pills (Quick Filter) */}
          <div className="flex flex-wrap justify-center gap-3">
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
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- Main Content: Sidebar + Job Feed --- */}
      <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">

        {/* Sidebar Filters (Desktop) */}
        <aside className="hidden md:block w-64 flex-shrink-0 space-y-8">
          <div>
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Filter size={18} /> Smart Filters
            </h3>

            <div className="space-y-6">
              {/* Job Type Filter */}
              <div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Job Type</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="jobType"
                      className="accent-blue-600"
                      checked={selectedType === 'All'}
                      onChange={() => setSelectedType('All')}
                    />
                    <span className="text-sm text-slate-600 group-hover:text-blue-600 transition-colors">Any Type</span>
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

              {/* Newsletter Box (Lead Gen) */}
              <form onSubmit={handleNewsletterSubmit} className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-10">
                  <Bot size={64} />
                </div>
                <h4 className="font-bold text-blue-900 text-sm mb-2 flex items-center gap-2">
                  <Sparkles size={14} className="text-yellow-500" />
                  Daily AI Alerts
                </h4>
                <p className="text-xs text-blue-700 mb-3 leading-relaxed">
                  Our bot scans 500+ sources daily. Get the top 5 {selectedLang === 'all' ? '' : 'Chinese/Korean'} jobs in your inbox.
                </p>
                <input
                  type="email"
                  placeholder="email@address.com"
                  className="w-full px-3 py-2 rounded-lg border border-blue-200 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  disabled={newsletterLoading}
                  required
                />
                <button
                  type="submit"
                  disabled={newsletterLoading}
                  className="w-full bg-blue-600 text-white text-xs font-bold py-2 rounded-lg hover:bg-blue-700 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {newsletterLoading ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Subscribing...
                    </>
                  ) : (
                    'Activate Alerts'
                  )}
                </button>
              </form>
            </div>
          </div>
        </aside>

        {/* Job List Feed - Added ID for Scrolling */}
        <main id="job-feed" className="flex-1 scroll-mt-24">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              Latest Matches
              <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded-full">{filteredJobs.length}</span>
            </h2>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span className="hidden sm:inline">Sorted by:</span>
              <select className="bg-transparent font-medium text-slate-900 focus:outline-none cursor-pointer">
                <option>Newest (AI Sourced)</option>
                <option>Highest Salary</option>
                <option>Best Match Score</option>
              </select>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-slate-200">
              <Loader2 size={48} className="text-blue-600 animate-spin mb-4" />
              <p className="text-slate-600 font-medium">Loading jobs from database...</p>
            </div>
          )}

          {/* Job List */}
          <div className="space-y-4">
            {!isLoading && filteredJobs.map(job => (
              <div
                key={job.id}
                className={`group relative bg-white rounded-xl p-5 sm:p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border ${job.featured ? 'border-yellow-400 shadow-yellow-100 ring-1 ring-yellow-400/20' : 'border-slate-200 shadow-sm'}`}
              >
                {job.featured && (
                  <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg">
                    FEATURED
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-5">
                  {/* Dynamic Colored Logo */}
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl ${getSafeColorClass(job.logoBg || job.color)} flex items-center justify-center text-white font-bold text-lg sm:text-2xl shadow-inner flex-shrink-0`}>
                    {job.initials || job.logo || job.company.substring(0,2)}
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {job.title}
                          </h3>
                          {/* AI Verification Badge */}
                          {job.ai_verified && (
                             <div className="group/tooltip relative">
                               <CheckCircle2 size={16} className="text-emerald-500 cursor-help" />
                               <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity">
                                 Verified by AI
                               </div>
                             </div>
                          )}
                        </div>
                        <div className="text-sm font-medium text-slate-600 mb-1 flex items-center gap-2">
                          {job.company}
                          <span className="text-slate-300">•</span>
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            Source: {job.source?.includes('Manual') ? 'Partner Network' : job.source}
                          </span>
                        </div>
                      </div>

                      {/* Salary Tag - FIXED HERE */}
                      <div className="flex items-center text-sm font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg self-start whitespace-nowrap">
                        <DollarSign size={14} className="mr-1 text-green-600" />
                        {job.currency === 'EUR' ? '€' : '$'}{job.salary_min.toLocaleString()} - {job.salary_max.toLocaleString()}
                      </div>
                    </div>

                    {/* Metadata Row */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500 mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin size={14} /> {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase size={14} /> {job.type}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} /> {job.posted_at}
                      </div>
                    </div>

                    {/* AI Summary */}
                    {job.summary && (
                      <div className="mb-4 text-xs text-slate-500 italic bg-slate-50 p-2 rounded border border-slate-100 flex items-start gap-2">
                        <Bot size={14} className="text-blue-400 flex-shrink-0 mt-0.5" />
                        {job.summary}
                      </div>
                    )}

                    {/* Tags & Actions */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-slate-100">

                      {/* Language & Skill Tags */}
                      <div className="flex flex-wrap gap-2">
                        {/* Primary Language Tag */}
                        {job.languages && job.languages.map((lang, idx) => (
                           <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
                             {lang}
                           </span>
                        ))}
                        {/* Skill Tags */}
                        {job.tags && job.tags.map((tag, idx) => (
                          <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-600">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-3 w-full sm:w-auto">
                         {/* Match Score */}
                        <div className="hidden sm:flex flex-col items-end mr-2">
                          <span className="text-[10px] text-slate-400 font-bold uppercase">Match Score</span>
                          <span className={`text-sm font-bold ${job.match_score > 90 ? 'text-emerald-600' : 'text-blue-600'}`}>
                            {job.match_score}%
                          </span>
                        </div>
                        <button
                          onClick={() => handleApply(job)}
                          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors shadow-lg shadow-slate-200 active:transform active:scale-95"
                        >
                          Apply Now <ArrowUpRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Empty State */}
            {!isLoading && filteredJobs.length === 0 && (
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

      {/* --- Footer & Manifesto (Why Us?) --- */}
      <footer className="bg-white border-t border-slate-200 mt-12">
        {/* Manifesto Section (The About Us) */}
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Why RemoteLingo Exists?</h3>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              We noticed a massive <b>market inefficiency</b>. Asian tech giants are expanding globally, but they can&apos;t find bilingual talent.
              Western developers want high-paying remote roles but can&apos;t filter through the noise.
              <br/><br/>
              We are not a recruitment agency. We are an <b>arbitrage engine</b> connecting supply and demand where the language premium is highest.
            </p>
            <div className="flex justify-center gap-8">
               <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">500+</div>
                  <div className="text-sm text-slate-500 uppercase tracking-wide">Sources Scanned</div>
               </div>
               <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">24h</div>
                  <div className="text-sm text-slate-500 uppercase tracking-wide">Update Cycle</div>
               </div>
               <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">0%</div>
                  <div className="text-sm text-slate-500 uppercase tracking-wide">Spam Tolerance</div>
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

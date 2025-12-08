'use client';

import React from 'react';
import { CheckCircle2, MapPin, Briefcase, Clock, DollarSign, Bot, ArrowUpRight } from 'lucide-react';
import { Job } from '@/lib/api';

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <div
      className={`group relative bg-white rounded-xl p-5 sm:p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border ${
        job.featured
          ? 'border-yellow-400 shadow-yellow-100 ring-1 ring-yellow-400/20'
          : 'border-slate-200 shadow-sm'
      }`}
    >
      {job.featured && (
        <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg">
          FEATURED
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-5">
        {/* Company Logo */}
        <div
          className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl ${job.color} flex items-center justify-center text-white font-bold text-lg sm:text-2xl shadow-inner flex-shrink-0`}
        >
          {job.logo}
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
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-10">
                      Verified by AI
                    </div>
                  </div>
                )}
              </div>
              <div className="text-sm font-medium text-slate-600 mb-1 flex items-center gap-2 flex-wrap">
                <span>{job.company}</span>
                <span className="text-slate-300">•</span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  Source: {job.source}
                </span>
              </div>
            </div>

            {/* Salary Tag */}
            <div className="flex items-center text-sm font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg self-start whitespace-nowrap">
              <DollarSign size={14} className="mr-1 text-green-600" />
              {job.currency === 'EUR' ? '€' : '$'}
              {job.salary_min.toLocaleString()} - {job.salary_max.toLocaleString()}
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
              {/* Language Tags */}
              {job.languages.map((lang, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100"
                >
                  {lang}
                </span>
              ))}
              {/* Skill Tags */}
              {job.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-600"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* Match Score */}
              <div className="hidden sm:flex flex-col items-end mr-2">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Match Score</span>
                <span
                  className={`text-sm font-bold ${
                    job.match_score > 90 ? 'text-emerald-600' : 'text-blue-600'
                  }`}
                >
                  {job.match_score}%
                </span>
              </div>
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors shadow-lg shadow-slate-200">
                Apply Now <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

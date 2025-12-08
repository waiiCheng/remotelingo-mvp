'use client';

import React from 'react';
import { Filter, Sparkles, Bot } from 'lucide-react';

interface FiltersProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
  selectedLang: string;
}

const JOB_TYPES = ['Full-time', 'Contract', 'Freelance', 'Part-time'];

export default function Filters({ selectedType, onTypeChange, selectedLang }: FiltersProps) {
  return (
    <aside className="hidden md:block w-64 flex-shrink-0 space-y-8">
      <div>
        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Filter size={18} /> Smart Filters
        </h3>

        <div className="space-y-6">
          {/* Job Type Filter */}
          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Job Type
            </h4>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="jobType"
                  className="accent-blue-600"
                  checked={selectedType === 'All'}
                  onChange={() => onTypeChange('All')}
                />
                <span className="text-sm text-slate-600 group-hover:text-blue-600 transition-colors">
                  Any Type
                </span>
              </label>
              {JOB_TYPES.map((type) => (
                <label key={type} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="jobType"
                    className="accent-blue-600"
                    checked={selectedType === type}
                    onChange={() => onTypeChange(type)}
                  />
                  <span className="text-sm text-slate-600 group-hover:text-blue-600 transition-colors">
                    {type}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Salary Range Mockup */}
          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Min. Salary
            </h4>
            <input
              type="range"
              className="w-full accent-blue-600 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-2">
              <span>€30k</span>
              <span>€150k+</span>
            </div>
          </div>

          {/* Newsletter Box (Lead Gen) */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-10">
              <Bot size={64} />
            </div>
            <h4 className="font-bold text-blue-900 text-sm mb-2 flex items-center gap-2 relative">
              <Sparkles size={14} className="text-yellow-500" />
              Daily AI Alerts
            </h4>
            <p className="text-xs text-blue-700 mb-3 leading-relaxed relative">
              Our bot scans 500+ sources daily. Get the top 5{' '}
              {selectedLang === 'all' ? '' : 'Chinese/Korean'} jobs in your inbox.
            </p>
            <input
              type="email"
              placeholder="email@address.com"
              className="w-full px-3 py-2 rounded-lg border border-blue-200 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white relative"
            />
            <button className="w-full bg-blue-600 text-white text-xs font-bold py-2 rounded-lg hover:bg-blue-700 transition shadow-md relative">
              Activate Alerts
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

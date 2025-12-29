'use client';

import React from 'react';
import { Users, Plane, Briefcase, Calendar } from 'lucide-react';

export default function CandidatePipelineStats() {
  return (
    <div className="w-full bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 py-4 px-4 shadow-lg">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          {/* Header Text */}
          <div className="text-white font-bold text-sm sm:text-base flex items-center gap-2">
            <span className="inline-flex p-1.5 bg-white/20 rounded-full">
              <Users size={18} />
            </span>
            <span className="hidden sm:inline">Current Pipeline:</span>
            <span className="sm:hidden">Live Pipeline:</span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:flex sm:flex-row gap-3 sm:gap-6">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
              <Users size={16} className="text-white flex-shrink-0" />
              <div>
                <div className="text-white font-bold text-lg leading-none">8</div>
                <div className="text-white/80 text-xs whitespace-nowrap">Japanese/Korean</div>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
              <Plane size={16} className="text-white flex-shrink-0" />
              <div>
                <div className="text-white font-bold text-lg leading-none">5</div>
                <div className="text-white/80 text-xs whitespace-nowrap">Ready to Relocate</div>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
              <Briefcase size={16} className="text-white flex-shrink-0" />
              <div>
                <div className="text-white font-bold text-lg leading-none">2</div>
                <div className="text-white/80 text-xs whitespace-nowrap">iGaming Exp.</div>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
              <Calendar size={16} className="text-white flex-shrink-0" />
              <div>
                <div className="text-white font-bold text-lg leading-none">3</div>
                <div className="text-white/80 text-xs whitespace-nowrap">Available Q1 2025</div>
              </div>
            </div>
          </div>
        </div>

        {/* Optional: Real-time indicator */}
        <div className="flex justify-center mt-2">
          <div className="flex items-center gap-1.5 text-white/70 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span>Updated live</span>
          </div>
        </div>
      </div>
    </div>
  );
}

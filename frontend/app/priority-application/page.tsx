'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Loader2, Star } from 'lucide-react';

export default function PriorityApplicationPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get job and company info from URL params
    const jobTitle = searchParams.get('job') || '';
    const companyLabel = searchParams.get('company') || '';

    // Build Tally URL with prefilled data
    const tallyUrl = new URL('https://tally.so/r/zxjRGR');

    // Mark as priority application
    tallyUrl.searchParams.append('source', 'remotelingo_priority');

    if (jobTitle) {
      tallyUrl.searchParams.append('job_title', jobTitle);
    }
    if (companyLabel) {
      tallyUrl.searchParams.append('company', companyLabel);
    }

    // Redirect immediately
    window.location.href = tallyUrl.toString();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex p-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-4">
          <Star className="w-12 h-12 text-white" fill="white" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Priority Application Portal</h2>
        <div className="flex items-center justify-center gap-2 mb-4">
          <Loader2 className="w-5 h-5 text-orange-600 animate-spin" />
          <p className="text-sm text-slate-600">Forwarding to VIP application track...</p>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 border border-amber-300 rounded-full text-xs font-semibold text-amber-900">
          <Star size={14} className="text-amber-600" />
          RemoteLingo Verified Partnership
        </div>
      </div>
    </div>
  );
}

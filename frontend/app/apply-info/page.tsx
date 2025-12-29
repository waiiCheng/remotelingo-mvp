import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import ApplyInfoContent from './ApplyInfoContent';

export default function ApplyInfoPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    }>
      <ApplyInfoContent />
    </Suspense>
  );
}

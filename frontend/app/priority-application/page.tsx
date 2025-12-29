import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import PriorityApplicationContent from './PriorityApplicationContent';

export default function PriorityApplicationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-orange-600 animate-spin" />
      </div>
    }>
      <PriorityApplicationContent />
    </Suspense>
  );
}

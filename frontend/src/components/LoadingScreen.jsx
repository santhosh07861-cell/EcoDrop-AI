import React from 'react';
import { RefreshCw } from 'lucide-react';

export default function LoadingScreen({ message = 'Loading GVMC E-Waste Network...' }) {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center space-y-3 text-slate-500 dark:text-slate-400">
      <RefreshCw className="w-8 h-8 text-emerald-500 animate-spin" />
      <p className="text-xs font-semibold">{message}</p>
    </div>
  );
}

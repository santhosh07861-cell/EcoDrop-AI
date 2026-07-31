import React from 'react';
import { FolderOpen } from 'lucide-react';

export default function EmptyState({ title = 'No Data Available', description = 'There are no records matching your current request.' }) {
  return (
    <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
      <FolderOpen className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
      <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">{title}</h4>
      <p className="text-[11px] text-slate-400 max-w-xs mx-auto">{description}</p>
    </div>
  );
}

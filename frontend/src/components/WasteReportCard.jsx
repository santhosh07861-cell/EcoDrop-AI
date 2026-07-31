import React from 'react';
import { Tag, MapPin, Calendar, CheckCircle } from 'lucide-react';

export default function WasteReportCard({ report }) {
  if (!report) return null;
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
      <div className="flex justify-between items-start">
        <div>
          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
            {report.reportId || 'REP-001'}
          </span>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">{report.category || 'E-Waste Item'}</h4>
        </div>
        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
          {report.status || 'Pending'}
        </span>
      </div>

      <p className="text-xs text-slate-600 dark:text-slate-400">{report.description || 'No description provided.'}</p>

      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
        <span className="flex items-center space-x-1">
          <MapPin className="w-3.5 h-3.5 text-emerald-500" />
          <span>{report.ward || 'Ward 12'}</span>
        </span>
        <span className="flex items-center space-x-1">
          <Calendar className="w-3.5 h-3.5" />
          <span>{report.date || 'Today'}</span>
        </span>
      </div>
    </div>
  );
}

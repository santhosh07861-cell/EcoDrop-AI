import React from 'react';

export default function StatisticsCard({ title, value, subtitle, icon: Icon, color = 'emerald' }) {
  const colorMap = {
    emerald: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    blue: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    amber: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    purple: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
    rose: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-between">
      <div>
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">{title}</p>
        <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">{value}</h3>
        {subtitle && <p className="text-[11px] text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
      {Icon && (
        <div className={`p-3 rounded-2xl border ${colorMap[color] || colorMap.emerald}`}>
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
}

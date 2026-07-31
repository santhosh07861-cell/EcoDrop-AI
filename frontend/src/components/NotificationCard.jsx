import React from 'react';
import { Bell, CheckCircle, AlertTriangle, Info } from 'lucide-react';

export default function NotificationCard({ title, message, time, type = 'info', onDismiss }) {
  const iconMap = {
    info: <Info className="w-4 h-4 text-sky-500" />,
    success: <CheckCircle className="w-4 h-4 text-emerald-500" />,
    warning: <AlertTriangle className="w-4 h-4 text-amber-500" />
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start space-x-3">
      <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 mt-0.5">
        {iconMap[type] || <Bell className="w-4 h-4 text-emerald-500" />}
      </div>
      <div className="flex-1">
        <h4 className="text-xs font-bold text-slate-900 dark:text-white">{title}</h4>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">{message}</p>
        {time && <span className="text-[10px] text-slate-400 mt-1 block">{time}</span>}
      </div>
    </div>
  );
}

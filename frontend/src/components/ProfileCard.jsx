import React from 'react';
import { User, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';
import { ROLE_LABELS } from '../constants/roles';

export default function ProfileCard({ user }) {
  if (!user) return null;
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-md border border-slate-200 dark:border-slate-800 space-y-4">
      <div className="flex items-center space-x-4">
        <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-extrabold text-xl">
          {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">{user.name || 'GVMC User'}</h3>
          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200">
            {ROLE_LABELS[user.role] || user.role}
          </span>
        </div>
      </div>

      <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
        <div className="flex items-center space-x-2">
          <Mail className="w-4 h-4 text-emerald-500" />
          <span>{user.email || 'N/A'}</span>
        </div>
        {user.phone && (
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4 text-teal-500" />
            <span>{user.phone}</span>
          </div>
        )}
        {user.ward && (
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-sky-500" />
            <span>{user.ward}</span>
          </div>
        )}
      </div>
    </div>
  );
}

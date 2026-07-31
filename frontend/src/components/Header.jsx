import React from 'react';
import { Leaf, Bell, ShieldCheck, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ROLE_LABELS } from '../constants/roles';

export default function Header({ title = 'GVMC Smart E-Waste Portal' }) {
  const { user } = useAuth();

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex justify-between items-center">
      <div>
        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 uppercase">
          Visakhapatnam Smart City Drive
        </span>
        <h1 className="text-lg font-extrabold text-slate-900 dark:text-white mt-1">{title}</h1>
      </div>

      {user && (
        <div className="flex items-center space-x-3">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 hidden sm:inline">
            {user.name} ({ROLE_LABELS[user.role] || user.role})
          </span>
          <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 font-extrabold text-xs">
            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
        </div>
      )}
    </header>
  );
}

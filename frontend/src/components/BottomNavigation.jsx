import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, MapPin, QrCode, Upload, FileText, User } from 'lucide-react';

export default function BottomNavigation() {
  const items = [
    { to: '/dashboard/citizen', label: 'Home', icon: Home },
    { to: '/find', label: 'Drop Points', icon: MapPin },
    { to: '/scan', label: 'Scan Bin', icon: QrCode },
    { to: '/upload', label: 'Report', icon: Upload },
    { to: '/history', label: 'Activity', icon: FileText },
    { to: '/profile', label: 'Profile', icon: User }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 md:hidden px-2 py-1.5 flex justify-around items-center">
      {items.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex flex-col items-center py-1 px-2 rounded-xl text-[10px] font-bold transition-all ${
              isActive
                ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`
          }
        >
          <Icon className="w-5 h-5 mb-0.5" />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

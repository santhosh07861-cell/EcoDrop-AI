import React from 'react';
import { Recycle, AlertOctagon, CheckCircle2, Users, MapPin, Scale } from 'lucide-react';

export default function DashboardCards({ stats = {} }) {
  const cards = [
    {
      title: 'Total E-Waste Collected',
      value: stats.totalWeightKg || '512.4 kg',
      subtitle: `${stats.totalCollectionsCount || 89} Registered Submissions`,
      icon: Recycle,
      color: 'from-gvmc-600 to-emerald-700',
      textColor: 'text-gvmc-600 dark:text-gvmc-400'
    },
    {
      title: 'Total Complaints',
      value: stats.totalComplaints || 14,
      subtitle: 'Citizen Reports Registered',
      icon: AlertOctagon,
      color: 'from-amber-500 to-orange-600',
      textColor: 'text-amber-500'
    },
    {
      title: 'Pending Action',
      value: stats.pendingComplaints || 3,
      subtitle: 'Assigned to Ward Inspectors',
      icon: Scale,
      color: 'from-rose-600 to-pink-700',
      textColor: 'text-rose-600'
    },
    {
      title: 'Resolved Complaints',
      value: stats.resolvedComplaints || 11,
      subtitle: '100% Verified Cleanups',
      icon: CheckCircle2,
      color: 'from-ocean-600 to-blue-700',
      textColor: 'text-ocean-600'
    },
    {
      title: 'Registered Citizens',
      value: stats.activeCitizens || 248,
      subtitle: 'Vizag Eco-Network Members',
      icon: Users,
      color: 'from-purple-600 to-indigo-700',
      textColor: 'text-purple-600'
    },
    {
      title: 'Active Drop Points',
      value: stats.activeDropPoints || 6,
      subtitle: 'Visakhapatnam Ward Bins',
      icon: MapPin,
      color: 'from-teal-600 to-emerald-800',
      textColor: 'text-teal-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {cards.map((c, i) => {
        const Icon = c.icon;
        return (
          <div
            key={i}
            className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-lg border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between hover:shadow-xl transition-all group"
          >
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{c.title}</p>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1 tracking-tight">{c.value}</h3>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">{c.subtitle}</p>
            </div>
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${c.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
              <Icon className="w-6 h-6" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, HardHat, ShieldCheck, ArrowRight, Leaf } from 'lucide-react';

export default function LoginSelection() {
  const navigate = useNavigate();

  const options = [
    {
      title: 'Citizen Login',
      description: 'Report household e-waste, scan bin QRs, locate drop points & earn Green Points',
      icon: User,
      color: 'from-emerald-500 to-teal-600',
      textColor: 'text-emerald-500',
      badge: 'Public Portal',
      route: '/login/citizen'
    },
    {
      title: 'Worker Login',
      description: 'Sanitation workers & drivers log bin pick-ups, scan QRs & update status',
      icon: HardHat,
      color: 'from-amber-500 to-orange-600',
      textColor: 'text-amber-500',
      badge: 'Field Operations',
      route: '/login/worker'
    },
    {
      title: 'Admin Login',
      description: 'Single portal for Field Officers, Commissioner Analysts & System Supervisors',
      icon: ShieldCheck,
      color: 'from-sky-600 to-indigo-600',
      textColor: 'text-sky-500',
      badge: 'GVMC Command Console',
      route: '/login/admin'
    }
  ];

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8">
        
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
            <Leaf className="w-4 h-4" />
            <span>Greater Visakhapatnam Municipal Corporation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Select Access Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
            Choose your role to enter the GVMC Smart E-Waste Collection & Role-Based Access Control Network.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {options.map((opt) => {
            const Icon = opt.icon;
            return (
              <div
                key={opt.title}
                onClick={() => navigate(opt.route)}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between space-y-6 hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${opt.color} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {opt.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                      {opt.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed font-medium">
                      {opt.description}
                    </p>
                  </div>
                </div>

                <div className={`flex items-center text-xs font-bold ${opt.textColor} group-hover:translate-x-1 transition-transform`}>
                  <span>Proceed to Portal</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

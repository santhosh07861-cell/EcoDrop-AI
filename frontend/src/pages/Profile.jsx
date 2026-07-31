import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Award, Recycle, ShieldCheck, MapPin, Mail, Phone, Settings, LogOut, Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const citizen = user || {
    name: 'Ravi Teja',
    email: 'citizen@gvmc.gov.in',
    phone: '+91 98765 43210',
    address: 'Siripuram, Ward 12, Visakhapatnam',
    greenPoints: 340,
    totalSubmissions: 5,
    co2SavedKg: 14.2
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Profile Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-gvmc-600 to-ocean-500 text-white font-black flex items-center justify-center text-3xl shadow-lg">
            {citizen.name ? citizen.name.charAt(0) : 'R'}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{citizen.name}</h2>
              <span className="px-2 py-0.5 rounded bg-gvmc-100 dark:bg-gvmc-950 text-gvmc-700 dark:text-gvmc-300 font-bold text-[10px] uppercase">Verified Vizag Citizen</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-gvmc-500" />
              <span>{citizen.address || 'Visakhapatnam, Andhra Pradesh'}</span>
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 text-xs font-bold border border-rose-200 dark:border-rose-800 hover:bg-rose-100 transition-colors flex items-center space-x-1.5"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Impact Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl p-6 text-white shadow-xl space-y-1">
          <Award className="w-8 h-8 text-amber-200 mb-2" />
          <p className="text-xs font-bold uppercase tracking-wider text-amber-100">Green Eco-Points</p>
          <h3 className="text-3xl font-black">{citizen.greenPoints || 340} pts</h3>
          <p className="text-[11px] text-amber-100 pt-1 font-medium">Redeemable for GVMC Civic Tax Rebates</p>
        </div>

        <div className="bg-gradient-to-br from-gvmc-600 to-emerald-700 rounded-3xl p-6 text-white shadow-xl space-y-1">
          <Recycle className="w-8 h-8 text-gvmc-200 mb-2" />
          <p className="text-xs font-bold uppercase tracking-wider text-gvmc-100">Total Submissions</p>
          <h3 className="text-3xl font-black">{citizen.totalSubmissions || 5} Drops</h3>
          <p className="text-[11px] text-gvmc-100 pt-1 font-medium">Verified by Gemini AI Scanner</p>
        </div>

        <div className="bg-gradient-to-br from-ocean-600 to-blue-700 rounded-3xl p-6 text-white shadow-xl space-y-1">
          <Leaf className="w-8 h-8 text-ocean-200 mb-2" />
          <p className="text-xs font-bold uppercase tracking-wider text-ocean-100">CO₂ Toxic Offset</p>
          <h3 className="text-3xl font-black">{citizen.co2SavedKg || 14.2} kg</h3>
          <p className="text-[11px] text-ocean-100 pt-1 font-medium">Lead & Cadmium Prevented from Landfill</p>
        </div>
      </div>

      {/* Account Details & Settings */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center space-x-2">
          <Settings className="w-4 h-4 text-gvmc-500" />
          <span>Account Settings & Contact Information</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Email Address</span>
            <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-1.5">
              <Mail className="w-3.5 h-3.5 text-gvmc-500" />
              <span>{citizen.email}</span>
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Phone Number</span>
            <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-1.5">
              <Phone className="w-3.5 h-3.5 text-ocean-500" />
              <span>{citizen.phone || '+91 98765 43210'}</span>
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, Recycle, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SplashScreen() {
  const navigate = useNavigate();
  const { user, redirectToDashboard } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (user) {
        navigate(redirectToDashboard());
      } else {
        navigate('/login-selection');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [user, navigate, redirectToDashboard]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950/40 via-slate-950 to-teal-950/40" />

      <div className="relative z-10 text-center space-y-6 animate-fadeIn">
        <div className="w-24 h-24 rounded-3xl bg-emerald-500/20 border border-emerald-500/30 backdrop-blur-xl flex items-center justify-center mx-auto shadow-2xl animate-pulse">
          <Recycle className="w-12 h-12 text-emerald-400" />
        </div>

        <div>
          <div className="flex items-center justify-center space-x-2">
            <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              GVMC Smart City Drive
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-white mt-2">EcoDrop AI</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-sm">
            Visakhapatnam Municipal Corporation E-Waste Collection & Role-Based Tracking Platform
          </p>
        </div>

        <div className="pt-8">
          <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-[11px] text-slate-500 mt-3 font-semibold">Initializing Secure Gateway...</p>
        </div>
      </div>
    </div>
  );
}

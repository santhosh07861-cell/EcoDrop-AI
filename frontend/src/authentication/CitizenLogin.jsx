import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ROLES } from '../constants/roles';
import toast from 'react-hot-toast';

export default function CitizenLogin() {
  const [email, setEmail] = useState('citizen@gvmc.gov.in');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const userData = {
        id: 'usr_citizen_101',
        name: email.split('@')[0] || 'Ravi Teja',
        email,
        role: ROLES.CITIZEN,
        ward: 'Ward 12 (Siripuram)',
        greenPoints: 340
      };
      loginUser(userData, 'token_citizen_demo');
      toast.success('Welcome back, Citizen!');
      navigate('/dashboard/citizen');
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        
        <Link to="/login-selection" className="inline-flex items-center space-x-1 text-xs font-bold text-slate-500 hover:text-emerald-500">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Select Portal</span>
        </Link>

        <div>
          <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
            Citizen Portal
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">Citizen Login</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Enter credentials to manage household e-waste & rewards</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="citizen@gvmc.gov.in"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white font-medium outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white font-medium outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Link to="/forgot-password" className="text-[11px] font-bold text-emerald-600 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold shadow-md transition-all disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Login as Citizen'}
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
          New to Visakhapatnam E-Waste Drive?{' '}
          <Link to="/register" className="font-bold text-emerald-600 hover:underline">
            Register Citizen Account
          </Link>
        </div>

      </div>
    </div>
  );
}

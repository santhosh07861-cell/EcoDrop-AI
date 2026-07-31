import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { adminLoginApi } from '../services/api';
import { ShieldCheck, Lock, ArrowRight, Building2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminLogin() {
  const [employeeId, setEmployeeId] = useState('GVMC-EMP-8842');
  const [password, setPassword] = useState('adminpassword');
  const [loading, setLoading] = useState(false);

  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await adminLoginApi({ employeeId, password });
      if (res.data.success) {
        loginUser(res.data.user, res.data.token);
        toast.success(`GVMC Command Console unlocked! Welcome ${res.data.user.name}`);
        navigate('/admin');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Admin authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-10">
      <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-2xl border border-slate-800 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gvmc-500 to-emerald-700 text-white font-black flex items-center justify-center mx-auto shadow-xl">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded bg-gvmc-950 text-gvmc-400 border border-gvmc-800 uppercase tracking-wider">
            GVMC Official Access
          </span>
          <h2 className="text-2xl font-black tracking-tight">Admin & Field Command Login</h2>
          <p className="text-xs text-slate-400">
            For Public Health Officers, Supervisors & City Operations Analysts
          </p>
        </div>

        <form onSubmit={handleAdminLogin} className="space-y-4">
          
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">Employee ID / Email</label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                placeholder="GVMC-EMP-8842"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-white text-xs font-semibold focus:ring-2 focus:ring-gvmc-500 outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-white text-xs font-semibold focus:ring-2 focus:ring-gvmc-500 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gvmc-600 hover:bg-gvmc-500 text-white font-extrabold text-xs shadow-lg shadow-gvmc-950/60 transition-transform active:scale-95 flex items-center justify-center space-x-2"
          >
            {loading ? (
              <span>Authenticating GVMC Credentials...</span>
            ) : (
              <>
                <span>Unlock Command Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-[11px] text-slate-400 text-center">
          <p className="font-semibold text-gvmc-400">Demo Admin Credentials:</p>
          <p className="mt-0.5">Employee ID: <code className="text-white">GVMC-EMP-8842</code> | Pass: <code className="text-white">adminpassword</code></p>
        </div>

      </div>
    </div>
  );
}

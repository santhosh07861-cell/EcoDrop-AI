import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HardHat, Lock, ArrowLeft, BadgeCheck, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ROLES } from '../constants/roles';
import { AuthService, ADMIN_ROLE_ACCOUNTS } from '../services/AuthService';
import toast from 'react-hot-toast';

export default function WorkerLogin() {
  const [email, setEmail] = useState(ADMIN_ROLE_ACCOUNTS.worker.email);
  const [password, setPassword] = useState(ADMIN_ROLE_ACCOUNTS.worker.password);
  const [loading, setLoading] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await AuthService.loginAdmin(email, password, ROLES.WORKER);
      if (!res.success) {
        toast.error(res.error || 'Authentication failed. Please check credentials.');
        setLoading(false);
        return;
      }

      const user = res.user;
      loginUser(user, 'token_worker_gvmc');
      toast.success(`Welcome ${user.name}! Logged in as Sanitation Worker.`);
      navigate('/dashboard/worker');
    } catch (err) {
      toast.error('Worker login error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        
        <Link to="/login-selection" className="inline-flex items-center space-x-1 text-xs font-bold text-slate-500 hover:text-amber-500">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portal Selection</span>
        </Link>

        <div>
          <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
            Sanitation Staff Portal
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">Worker Login</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Field crew login for bin pickup, QR scanning & collection verification</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Official Worker Email</label>
            <div className="relative">
              <BadgeCheck className="w-4 h-4 text-amber-500 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="worker@gvmc.gov.in"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white font-medium outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Access Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white font-medium outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-extrabold shadow-md transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            {loading ? (
              <span>Verifying Crew Credentials...</span>
            ) : (
              <>
                <UserCheck className="w-4 h-4" />
                <span>Login as Worker</span>
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HardHat, Lock, ArrowLeft, BadgeCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ROLES } from '../constants/roles';
import toast from 'react-hot-toast';

export default function WorkerLogin() {
  const [workerId, setWorkerId] = useState('WRK-GVMC-881');
  const [password, setPassword] = useState('workerpass');
  const [loading, setLoading] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const userData = {
        id: 'usr_worker_01',
        name: 'K. Srinivasa Rao (Sanitation Crew)',
        workerId,
        role: ROLES.WORKER,
        assignedWard: 'Ward 12 (Siripuram)'
      };
      loginUser(userData, 'token_worker_demo');
      toast.success('Authenticated as Sanitation Worker!');
      navigate('/dashboard/worker');
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        
        <Link to="/login-selection" className="inline-flex items-center space-x-1 text-xs font-bold text-slate-500 hover:text-amber-500">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Select Portal</span>
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
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Worker ID / Badge Code</label>
            <div className="relative">
              <BadgeCheck className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={workerId}
                onChange={(e) => setWorkerId(e.target.value)}
                placeholder="WRK-GVMC-881"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white font-medium outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Access PIN / Password</label>
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
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-extrabold shadow-md transition-all disabled:opacity-50"
          >
            {loading ? 'Verifying Crew Badge...' : 'Login as Worker'}
          </button>
        </form>

      </div>
    </div>
  );
}

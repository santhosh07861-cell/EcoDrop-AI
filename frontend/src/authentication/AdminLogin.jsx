import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, ArrowLeft, Building2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ROLES, ROLE_LABELS } from '../constants/roles';
import toast from 'react-hot-toast';

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@gvmc.gov.in');
  const [password, setPassword] = useState('adminpassword');
  const [selectedRole, setSelectedRole] = useState(ROLES.FIELD_OFFICER);
  const [loading, setLoading] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      let dashboardRoute = '/dashboard/field-officer';
      let name = 'M. Rajesh (Field Officer)';

      if (selectedRole === ROLES.COMMISSIONER) {
        dashboardRoute = '/dashboard/commissioner';
        name = 'Dr. K. V. Satyanarayana (Commissioner Analyst)';
      } else if (selectedRole === ROLES.SUPERVISOR) {
        dashboardRoute = '/dashboard/supervisor';
        name = 'GVMC System Supervisor';
      }

      const userData = {
        id: 'usr_admin_' + selectedRole,
        name,
        email,
        role: selectedRole,
        department: 'GVMC Public Health & Solid Waste Management'
      };

      loginUser(userData, 'token_admin_demo');
      toast.success(`Logged in as ${ROLE_LABELS[selectedRole]}`);
      navigate(dashboardRoute);
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        
        <Link to="/login-selection" className="inline-flex items-center space-x-1 text-xs font-bold text-slate-500 hover:text-sky-500">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Select Portal</span>
        </Link>

        <div>
          <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300">
            GVMC Management Console
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">Admin Login</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Single entry portal for Field Officers, Analysts & Supervisors
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Select Administrative Role</label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white font-bold outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value={ROLES.FIELD_OFFICER}>GVMC Field Officer</option>
                <option value={ROLES.COMMISSIONER}>GVMC Commissioner Analyst</option>
                <option value={ROLES.SUPERVISOR}>GVMC System Supervisor</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Official GVMC Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@gvmc.gov.in"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white font-medium outline-none focus:ring-2 focus:ring-sky-500"
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
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white font-medium outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-extrabold shadow-md transition-all disabled:opacity-50"
          >
            {loading ? 'Authenticating Role...' : `Enter as ${ROLE_LABELS[selectedRole]}`}
          </button>
        </form>

      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, ArrowLeft, Building2, Key, CheckCircle2, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ROLES, ROLE_LABELS } from '../constants/roles';
import { AuthService, ADMIN_ROLE_ACCOUNTS } from '../services/AuthService';
import toast from 'react-hot-toast';

export default function AdminLogin() {
  const [selectedRole, setSelectedRole] = useState(ROLES.FIELD_OFFICER);
  const [email, setEmail] = useState(ADMIN_ROLE_ACCOUNTS.field_officer.email);
  const [password, setPassword] = useState(ADMIN_ROLE_ACCOUNTS.field_officer.password);
  const [loading, setLoading] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  // Auto-populate role credentials when dropdown selection changes
  const handleRoleSelect = (roleKey) => {
    setSelectedRole(roleKey);
    const account = ADMIN_ROLE_ACCOUNTS[roleKey];
    if (account) {
      setEmail(account.email);
      setPassword(account.password);
    }
  };

  useEffect(() => {
    // Seed admin role accounts to Firebase Firestore on load
    AuthService.seedAdminAccountsToFirebase();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await AuthService.loginAdmin(email, password, selectedRole);

      if (!res.success) {
        toast.error(res.error || 'Authentication failed. Please check credentials.');
        setLoading(false);
        return;
      }

      const user = res.user;
      let dashboardRoute = '/dashboard/field-officer';
      if (selectedRole === ROLES.COMMISSIONER) {
        dashboardRoute = '/dashboard/commissioner';
      } else if (selectedRole === ROLES.SUPERVISOR) {
        dashboardRoute = '/dashboard/supervisor';
      }

      loginUser(user, 'token_admin_gvmc');
      toast.success(`Welcome ${user.name}! Access Granted.`);
      navigate(dashboardRoute);
    } catch (err) {
      toast.error('Login error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        
        <Link to="/login-selection" className="inline-flex items-center space-x-1 text-xs font-bold text-slate-500 hover:text-sky-500">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portal Selection</span>
        </Link>

        <div>
          <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300">
            GVMC Management Console
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">Admin Portal Login</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Firebase Firestore Authenticated Roles with Unique Passwords
          </p>
        </div>

        {/* Form Input */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          
          {/* Role Selector */}
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Select Administrative Role</label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-sky-500 absolute left-3 top-3" />
              <select
                value={selectedRole}
                onChange={(e) => handleRoleSelect(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white font-bold outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value={ROLES.FIELD_OFFICER}>GVMC Field Officer</option>
                <option value={ROLES.COMMISSIONER}>GVMC Commissioner Analyst</option>
                <option value={ROLES.SUPERVISOR}>GVMC System Supervisor</option>
              </select>
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Official Member Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="member@gvmc.gov.in"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white font-medium outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Role Password (Stored in Firebase)</label>
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-extrabold shadow-md transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            {loading ? (
              <span>Authenticating with Firebase...</span>
            ) : (
              <>
                <UserCheck className="w-4 h-4" />
                <span>Enter as {ROLE_LABELS[selectedRole]}</span>
              </>
            )}
          </button>
        </form>

        {/* Registered Role Credentials Hint Box */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2 text-[11px]">
          <h4 className="font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-1.5">
            <Key className="w-3.5 h-3.5 text-amber-500" />
            <span>Firebase Stored Member Credentials:</span>
          </h4>
          <div className="space-y-1 text-slate-600 dark:text-slate-400 font-medium">
            <div className={`p-1.5 rounded-lg flex justify-between items-center ${selectedRole === ROLES.FIELD_OFFICER ? 'bg-sky-100/80 dark:bg-sky-950 font-bold text-sky-900 dark:text-sky-200' : ''}`}>
              <span>• Field Officer:</span>
              <code className="text-[10px]">field.officer@gvmc.gov.in / fieldpass123</code>
            </div>
            <div className={`p-1.5 rounded-lg flex justify-between items-center ${selectedRole === ROLES.COMMISSIONER ? 'bg-purple-100/80 dark:bg-purple-950 font-bold text-purple-900 dark:text-purple-200' : ''}`}>
              <span>• Commissioner:</span>
              <code className="text-[10px]">commissioner@gvmc.gov.in / commpass123</code>
            </div>
            <div className={`p-1.5 rounded-lg flex justify-between items-center ${selectedRole === ROLES.SUPERVISOR ? 'bg-emerald-100/80 dark:bg-emerald-950 font-bold text-emerald-900 dark:text-emerald-200' : ''}`}>
              <span>• System Supervisor:</span>
              <code className="text-[10px]">supervisor@gvmc.gov.in / superpass123</code>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

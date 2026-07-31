import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Recycle, MapPin, QrCode, UploadCloud, AlertTriangle, 
  History, User, Sun, Moon, Bell, LogOut, ShieldCheck, Menu, X, CheckCircle 
} from 'lucide-react';

export default function Navbar() {
  const { user, darkMode, toggleDarkMode, logoutUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const isCurrent = (path) => location.pathname === path;

  const citizenNavItems = [
    { name: 'Home', path: '/', icon: Recycle },
    { name: 'Drop Points', path: '/find', icon: MapPin },
    { name: 'Scan QR', path: '/scan', icon: QrCode },
    { name: 'AI Upload', path: '/upload', icon: UploadCloud },
    { name: 'Report Issue', path: '/complaint', icon: AlertTriangle },
    { name: 'History', path: '/history', icon: History },
  ];

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 shadow-sm transition-colors">
      
      {/* Official Government Top Header Ribbon */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-950 to-emerald-950 text-white text-[11px] font-medium py-1.5 px-4 sm:px-8 flex justify-between items-center border-b border-emerald-900/50">
        <div className="flex items-center space-x-2">
          <span className="text-emerald-400 font-extrabold tracking-wide">🇮🇳 GVMC SWM PORTAL</span>
          <span className="hidden md:inline text-slate-600">|</span>
          <span className="hidden md:inline text-slate-300 font-medium">Greater Visakhapatnam Municipal Corporation — Public Health & Solid Waste Management</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1 text-emerald-400 font-bold text-[10px] bg-emerald-950/90 px-2.5 py-0.5 rounded-full border border-emerald-700/50">
            <CheckCircle className="w-3 h-3 text-emerald-400" />
            <span>APPCB Certified Recycler Network</span>
          </span>
          <span className="hidden sm:inline text-slate-400 font-medium">Toll Free: 1800-425-0001</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Emblem */}
          <Link to="/" className="flex items-center space-x-3 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-emerald-900/20 group-hover:scale-105 transition-transform">
              <Recycle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-black text-xl text-slate-900 dark:text-white tracking-tight">EcoDrop <span className="text-emerald-600 dark:text-emerald-400">AI</span></span>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-extrabold uppercase tracking-wider border border-emerald-200 dark:border-emerald-800">
                  GVMC SMART
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wide">Visakhapatnam Smart City E-Waste Drive</p>
            </div>
          </Link>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-2.5">
            {user ? (
              <div className="flex items-center space-x-2">
                <Link
                  to={user.role === 'admin' ? '/admin' : '/profile'}
                  className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-800"
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-600 to-teal-700 text-white font-black flex items-center justify-center text-xs shadow-sm">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="text-left hidden sm:block pr-1">
                    <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight truncate max-w-[100px]">{user.name}</p>
                    <p className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">{user.role === 'admin' ? 'GVMC Officer' : `${user.greenPoints || 0} Pts`}</p>
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition-colors"
                >
                  Citizen Login
                </Link>
                <Link
                  to="/admin-login"
                  className="flex items-center space-x-1 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 shadow-sm transition-colors border border-slate-700"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Admin</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Drawer Trigger */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-4 space-y-1">
          {citizenNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                  isCurrent(item.path)
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
            {user ? (
              <div className="flex justify-between items-center w-full">
                <Link to="/profile" className="font-semibold text-sm text-emerald-700 dark:text-emerald-300">
                  Profile ({user.name})
                </Link>
                <button onClick={handleLogout} className="text-xs text-rose-600 font-bold">Logout</button>
              </div>
            ) : (
              <div className="flex space-x-2 w-full pt-1">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="flex-1 text-center py-2 bg-emerald-600 text-white rounded-xl font-medium text-xs">Citizen Login</Link>
                <Link to="/admin-login" onClick={() => setMobileMenuOpen(false)} className="flex-1 text-center py-2 bg-slate-800 text-white rounded-xl font-medium text-xs">GVMC Admin</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

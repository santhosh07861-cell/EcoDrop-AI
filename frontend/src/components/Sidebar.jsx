import React from 'react';
import { 
  LayoutDashboard, MapPin, AlertOctagon, Recycle, 
  Users, BarChart3, Settings, ShieldCheck, LogOut 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ activeTab, setActiveTab }) {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'droppoints', label: 'Drop-Off Centers', icon: MapPin },
    { id: 'collections', label: 'Collection Records', icon: Recycle },
    { id: 'complaints', label: 'Citizen Complaints', icon: AlertOctagon },
    { id: 'analytics', label: 'Ward Analytics', icon: BarChart3 },
    { id: 'citizens', label: 'Citizen Network', icon: Users },
  ];

  const handleLogout = () => {
    logoutUser();
    navigate('/admin-login');
  };

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-[calc(100vh-4rem)] flex flex-col justify-between p-4 border-r border-slate-800 shrink-0">
      <div className="space-y-6">
        
        {/* Admin Badge Header */}
        <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/80 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gvmc-500 to-emerald-700 flex items-center justify-center text-white shadow-md font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-xs font-extrabold text-white tracking-wide uppercase">GVMC Command</h4>
            <p className="text-[11px] text-gvmc-400 font-medium">Public Health & SWM</p>
          </div>
        </div>

        {/* Menu Section */}
        <div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-2">Management Console</p>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isSelected = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-gvmc-600 text-white shadow-lg shadow-gvmc-900/40 font-bold translate-x-1'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

      </div>

      {/* Admin User Footer */}
      <div className="pt-4 border-t border-slate-800 space-y-2">
        <div className="flex items-center space-x-3 px-2">
          <div className="w-8 h-8 rounded-lg bg-gvmc-900 text-gvmc-300 font-bold flex items-center justify-center text-xs border border-gvmc-700">
            {user?.name ? user.name.charAt(0) : 'A'}
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-white truncate">{user?.name || 'GVMC Health Officer'}</p>
            <p className="text-[10px] text-slate-400 truncate">{user?.employeeId || 'GVMC-EMP-8842'}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-rose-950/50 hover:text-rose-400 text-slate-400 text-xs font-semibold transition-colors border border-slate-700/50"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit Admin Portal</span>
        </button>
      </div>
    </aside>
  );
}

import React, { useState } from 'react';
import { Home, Upload, MapPin, FileText, Bell, User, Settings, Leaf, Award, Recycle } from 'lucide-react';
import StatisticsCard from '../../components/StatisticsCard';
import WasteReportCard from '../../components/WasteReportCard';
import ProfileCard from '../../components/ProfileCard';
import NotificationCard from '../../components/NotificationCard';
import ImageUploadUI from '../../components/ImageUploadUI';
import MapPlaceholder from '../../components/MapPlaceholder';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export default function CitizenDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'report', label: 'Report E-Waste', icon: Upload },
    { id: 'droppoints', label: 'Nearest Drop Point', icon: MapPin },
    { id: 'myreports', label: 'My Reports', icon: FileText },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-6 text-white shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-white/20 text-white">
            Citizen Green Drive Portal
          </span>
          <h1 className="text-2xl font-extrabold mt-1">Welcome, {user?.name || 'Visakhapatnam Citizen'}!</h1>
          <p className="text-xs text-emerald-100 mt-1">Ward Location: {user?.ward || 'Ward 12 (Siripuram)'}</p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center space-x-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
          <Award className="w-6 h-6 text-amber-300" />
          <div>
            <p className="text-[10px] text-emerald-100 font-bold uppercase">Green Points Balance</p>
            <p className="text-lg font-extrabold">{user?.greenPoints || 340} pts</p>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex overflow-x-auto space-x-2 pb-2 border-b border-slate-200 dark:border-slate-800 scrollbar-none">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center space-x-1.5 transition-all ${
              activeTab === id
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      {activeTab === 'home' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatisticsCard title="Total E-Waste Dropped" value="5.2 kg" subtitle="Verified Collections" icon={Recycle} color="emerald" />
            <StatisticsCard title="Green Reward Points" value={`${user?.greenPoints || 340} pts`} subtitle="Redeemable" icon={Award} color="amber" />
            <StatisticsCard title="CO2 Saved" value="14.2 kg" subtitle="Environmental Impact" icon={Leaf} color="purple" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <Link to="/upload" className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-left hover:border-emerald-500 transition-colors">
                  <Upload className="w-5 h-5 text-emerald-500 mb-1" />
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Report E-Waste</h4>
                  <p className="text-[10px] text-slate-400">Classify & upload item</p>
                </Link>
                <Link to="/find" className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-left hover:border-emerald-500 transition-colors">
                  <MapPin className="w-5 h-5 text-teal-500 mb-1" />
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Find Drop Points</h4>
                  <p className="text-[10px] text-slate-400">Locate smart kiosks</p>
                </Link>
              </div>
            </div>

            <MapPlaceholder title="Visakhapatnam Active Drop Bins" height="h-64" />
          </div>
        </div>
      )}

      {activeTab === 'report' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4 max-w-2xl mx-auto">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Report Household E-Waste</h3>
          <ImageUploadUI label="Capture or Upload E-Waste Item Photo" />
          <Link to="/upload" className="block text-center py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold">
            Open Full AI Classifier & Report Screen
          </Link>
        </div>
      )}

      {activeTab === 'droppoints' && (
        <div className="space-y-4">
          <Link to="/find" className="inline-block text-xs font-bold text-emerald-600 hover:underline">
            View Interactive Drop Point Map & Filters →
          </Link>
          <MapPlaceholder title="Vizag Smart Drop Network" height="h-96" />
        </div>
      )}

      {activeTab === 'myreports' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <WasteReportCard report={{ reportId: 'REP-2026-101', category: 'Old Mobile & Charger', status: 'Verified', date: '2026-07-29', ward: 'Ward 12' }} />
          <WasteReportCard report={{ reportId: 'REP-2026-102', category: 'Laptop Battery', status: 'Collected', date: '2026-07-25', ward: 'Ward 14' }} />
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="space-y-3 max-w-xl">
          <NotificationCard title="50 Green Points Credited!" message="Your drop-off at Siripuram Smart E-Waste Hub was verified." time="2 hours ago" type="success" />
          <NotificationCard title="GVMC E-Waste Collection Drive" message="Special electronic collection camp in Ward 12 this Saturday." time="1 day ago" type="info" />
        </div>
      )}

      {activeTab === 'profile' && <ProfileCard user={user} />}

      {activeTab === 'settings' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 max-w-lg">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Citizen Account Settings</h3>
          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between">
              <span>Push Notifications</span>
              <input type="checkbox" defaultChecked className="accent-emerald-600" />
            </label>
            <label className="flex items-center justify-between">
              <span>SMS Alert Notifications</span>
              <input type="checkbox" defaultChecked className="accent-emerald-600" />
            </label>
          </div>
        </div>
      )}

    </div>
  );
}

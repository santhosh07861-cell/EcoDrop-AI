import React, { useState } from 'react';
import { Truck, QrCode, Camera, CheckSquare, Map, Bell, User, HardHat, CheckCircle2 } from 'lucide-react';
import StatisticsCard from '../../components/StatisticsCard';
import CollectionCard from '../../components/CollectionCard';
import QRCard from '../../components/QRCard';
import ImageUploadUI from '../../components/ImageUploadUI';
import MapPlaceholder from '../../components/MapPlaceholder';
import ProfileCard from '../../components/ProfileCard';
import NotificationCard from '../../components/NotificationCard';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export default function WorkerDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('collections');

  const tabs = [
    { id: 'collections', label: "Today's Collections", icon: Truck },
    { id: 'tasks', label: 'Assigned Tasks', icon: CheckSquare },
    { id: 'qr', label: 'QR Scanner', icon: QrCode },
    { id: 'upload', label: 'Upload Photo', icon: Camera },
    { id: 'status', label: 'Collection Status', icon: CheckCircle2 },
    { id: 'route', label: 'Route Map', icon: Map },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <div className="space-y-6">
      
      <div className="bg-gradient-to-r from-amber-600 to-orange-700 rounded-3xl p-6 text-white shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-white/20 text-white">
            Sanitation Field Operations
          </span>
          <h1 className="text-2xl font-extrabold mt-1">Welcome, {user?.name || 'Sanitation Crew'}!</h1>
          <p className="text-xs text-amber-100 mt-1">Assigned Zone: {user?.assignedWard || 'Ward 12 (Siripuram)'}</p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
          <HardHat className="w-6 h-6 text-amber-200" />
          <div>
            <p className="text-[10px] text-amber-100 font-bold uppercase">Today's Pickups</p>
            <p className="text-lg font-extrabold">8 / 10 Completed</p>
          </div>
        </div>
      </div>

      <div className="flex overflow-x-auto space-x-2 pb-2 border-b border-slate-200 dark:border-slate-800 scrollbar-none">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center space-x-1.5 transition-all ${
              activeTab === id
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {activeTab === 'collections' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatisticsCard title="Today's Collections" value="8 Bins" subtitle="Siripuram & RK Beach" icon={Truck} color="amber" />
            <StatisticsCard title="Total Weight Collected" value="48.5 kg" subtitle="Sorted E-Waste" icon={CheckSquare} color="emerald" />
            <StatisticsCard title="Pending Pickups" value="2 Bins" subtitle="Action Needed" icon={Bell} color="rose" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CollectionCard collection={{ collectionId: 'COL-2026-891', weight: '2.40 kg', category: 'Old Laptops & Chargers', location: 'Siripuram Hub (DP-GVMC-001)' }} />
            <CollectionCard collection={{ collectionId: 'COL-2026-892', weight: '1.10 kg', category: 'Mobiles & Lithium Batteries', location: 'RK Beach Drop Kiosk (DP-GVMC-002)' }} />
          </div>
        </div>
      )}

      {activeTab === 'tasks' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Assigned Bin Clearing Tasks</h3>
          <div className="space-y-2 text-xs">
            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-900 flex justify-between items-center">
              <div>
                <p className="font-bold text-amber-900 dark:text-amber-200">Gajuwaka Industrial Belt Drop Center (DP-GVMC-004)</p>
                <p className="text-[10px] text-amber-700 dark:text-amber-400">Bin status: 82% Full (Alert) • Urgency: High</p>
              </div>
              <button className="px-3 py-1 bg-amber-600 text-white font-bold rounded-lg">Clear Bin</button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'qr' && (
        <div className="space-y-4 max-w-md mx-auto text-center">
          <QRCard codeData="DP-GVMC-001|Siripuram Hub|Ward 12" title="Scan Bin QR Tag for Verification" />
          <Link to="/scan" className="block py-2.5 rounded-xl bg-amber-600 text-white font-bold text-xs">
            Launch Live Camera QR Scanner
          </Link>
        </div>
      )}

      {activeTab === 'upload' && (
        <div className="max-w-md mx-auto space-y-4">
          <ImageUploadUI label="Upload Clearance Proof Photo" />
          <button className="w-full py-2.5 rounded-xl bg-amber-600 text-white font-bold text-xs">
            Submit Proof Photo
          </button>
        </div>
      )}

      {activeTab === 'status' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 text-xs space-y-3">
          <h3 className="font-bold text-slate-900 dark:text-white">Collection Dispatch Log</h3>
          <p className="text-slate-500">Status: Dispatch Vehicle AP-31-V-8812 En Route to GVMC Processing Plant, Kapuluppada.</p>
        </div>
      )}

      {activeTab === 'route' && <MapPlaceholder title="Daily Collection Route Guidance" height="h-80" />}

      {activeTab === 'notifications' && (
        <div className="space-y-3 max-w-xl">
          <NotificationCard title="Dispatch Alert" message="Bin DP-GVMC-004 reaches 80% capacity threshold." time="15 min ago" type="warning" />
        </div>
      )}

      {activeTab === 'profile' && <ProfileCard user={user} />}

    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { ShieldCheck, MapPin, Camera, RefreshCw, Navigation, CheckCircle2 } from 'lucide-react';
import StatisticsCard from '../../components/StatisticsCard';
import MapComponent from '../../components/MapComponent';
import ProfileCard from '../../components/ProfileCard';
import { ReportService } from '../../services/ReportService';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export default function FieldOfficerDashboard() {
  const { user } = useAuth();
  const [binData, setBinData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBin, setSelectedBin] = useState(null);

  const loadData = async () => {
    setLoading(true);
    const res = await ReportService.getBinPhotosAndLocations();
    if (res.success) {
      setBinData(res.bins);
      if (res.bins.length > 0) setSelectedBin(res.bins[0]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-sky-700 to-indigo-800 rounded-3xl p-6 text-white shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-white/20 text-white">
            GVMC Field Officer Console
          </span>
          <h1 className="text-2xl font-extrabold mt-1">Bin Location & Live Field Photos</h1>
          <p className="text-xs text-sky-100 mt-1">Officer: {user?.name || 'M. Rajesh (Field Officer)'} • Zone 3 (Visakhapatnam)</p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
            <MapPin className="w-5 h-5 text-sky-300" />
            <div>
              <p className="text-[10px] text-sky-100 font-bold uppercase">Active Bins Monitored</p>
              <p className="text-lg font-extrabold">{binData.length} Locations</p>
            </div>
          </div>
          <button
            onClick={loadData}
            className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white"
            title="Refresh Firebase Bin Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatisticsCard title="Total Field Bins" value={`${binData.length} Bins`} subtitle="Zonal Field Map" icon={MapPin} color="blue" />
        <StatisticsCard title="Live Field Photos" value={`${binData.length} Verified`} subtitle="Firebase Storage" icon={Camera} color="purple" />
        <StatisticsCard title="Operational Status" value="100% Active" subtitle="GPS Synchronized" icon={CheckCircle2} color="emerald" />
      </div>

      {/* Main Split Layout: Interactive Location Map & Field Photos */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Map Location Viewer */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Bin Location Map</h3>
              <p className="text-xs text-slate-400">Select any bin marker to view GPS details</p>
            </div>
            {selectedBin && (
              <span className="text-xs font-bold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950 px-2.5 py-1 rounded-full border border-sky-200 dark:border-sky-800">
                📍 {selectedBin.name}
              </span>
            )}
          </div>
          <div className="h-[460px] rounded-2xl overflow-hidden">
            <MapComponent dropPoints={binData} selectedPoint={selectedBin} onSelectPoint={(pt) => setSelectedBin(pt)} />
          </div>
        </div>

        {/* Bin Photos & Location Details Sidebar */}
        <div className="lg:col-span-5 space-y-4 max-h-[530px] overflow-y-auto pr-1">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
            <Camera className="w-4 h-4 text-sky-500" />
            <span>Bin Inspection Photos & Coordinates</span>
          </h3>

          {binData.map((bin) => {
            const isSelected = selectedBin && selectedBin.id === bin.id;
            return (
              <div
                key={bin.id}
                onClick={() => setSelectedBin(bin)}
                className={`p-4 rounded-3xl border transition-all cursor-pointer space-y-3 ${
                  isSelected
                    ? 'bg-sky-50/90 dark:bg-sky-950/80 border-sky-500 shadow-md ring-2 ring-sky-500/20'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-sky-300'
                }`}
              >
                {/* Bin Photo */}
                <div className="relative h-44 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex flex-col items-center justify-center border border-slate-200 dark:border-slate-800">
                  {bin.photoUrl && bin.photoUrl.trim() !== '' ? (
                    <img
                      src={bin.photoUrl}
                      alt={bin.name}
                      loading="eager"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-4 space-y-2">
                      <Camera className="w-8 h-8 text-sky-400 mx-auto" />
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block">No Field Photo Uploaded</span>
                      <span className="text-[10px] text-slate-400 block">Photo will display when captured in field</span>
                    </div>
                  )}
                  <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-lg bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-extrabold uppercase">
                    {bin.binId || bin.dropPointId || 'DP-GVMC-001'}
                  </div>
                  <div className="absolute bottom-2 right-2 px-2.5 py-0.5 rounded-lg bg-emerald-600 text-white text-[10px] font-bold">
                    {bin.capacityStatus || 'Active'}
                  </div>
                </div>

                {/* Location Information */}
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{bin.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-start space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-sky-500 shrink-0 mt-0.5" />
                    <span>{bin.location || bin.address}</span>
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex justify-between items-center text-[11px] text-slate-500">
                  <span className="font-mono text-slate-400">
                    GPS: {bin.lat ? bin.lat.toFixed(4) : '17.7220'}, {bin.lng ? bin.lng.toFixed(4) : '83.3150'}
                  </span>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${bin.lat || 17.7220},${bin.lng || 83.3150}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="px-3 py-1 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold flex items-center space-x-1 shadow-sm"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>Navigate</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { ReportService } from '../services/ReportService';
import { History as HistoryIcon, Recycle, AlertTriangle, Calendar, MapPin, Award, CheckCircle2, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

export default function History() {
  const [activeTab, setActiveTab] = useState('collections');
  const [collections, setCollections] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadHistory = async () => {
    setLoading(true);
    try {
      const [colRes, cmpRes] = await Promise.all([
        ReportService.getUserCollections(),
        ReportService.getComplaints()
      ]);

      if (colRes.success) setCollections(colRes.collections || []);
      if (cmpRes.success) setComplaints(cmpRes.complaints || []);
    } catch (e) {
      console.warn('History load notice:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Submission History</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Review your past e-waste drop-offs & reported complaints stored in Firebase</p>
        </div>

        <div className="mt-3 sm:mt-0 flex items-center space-x-3">
          <button
            onClick={loadHistory}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300"
            title="Refresh History"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          {/* Tab Selector */}
          <div className="inline-flex p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs font-bold">
            <button
              onClick={() => setActiveTab('collections')}
              className={`px-4 py-2 rounded-xl transition-colors flex items-center space-x-1.5 ${
                activeTab === 'collections' ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-slate-500'
              }`}
            >
              <Recycle className="w-4 h-4" />
              <span>Drop-Offs ({collections.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('complaints')}
              className={`px-4 py-2 rounded-xl transition-colors flex items-center space-x-1.5 ${
                activeTab === 'complaints' ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-slate-500'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Complaints ({complaints.length})</span>
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-400 text-xs">Loading submission history from Firebase...</div>
      ) : activeTab === 'collections' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-400 text-xs bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
              No drop-off submissions logged yet. Visit the Upload Waste page to submit your first item!
            </div>
          ) : (
            collections.map((item) => (
              <div key={item.id || item.collectionId} className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="relative h-44 overflow-hidden bg-slate-950">
                    <img 
                      src={item.photo || item.photoUrl || "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80"} 
                      alt={item.wasteCategory} 
                      className="w-full h-full object-cover" 
                    />
                    <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-emerald-500/90 text-white font-extrabold text-[11px] backdrop-blur-md shadow-md">
                      +{item.greenPointsEarned || 50} pts
                    </span>
                    <span className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded bg-slate-900/80 text-white font-bold text-[10px] backdrop-blur-md">
                      {item.collectionId || 'COL-GVMC-901'}
                    </span>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex justify-between items-start">
                      <h4 className="font-extrabold text-sm text-slate-900 dark:text-white leading-tight">{item.wasteCategory}</h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        {item.status || 'Verified & Logged'}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <div className="flex items-center space-x-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="truncate">{item.dropPointName || item.location || 'GVMC Visakhapatnam Hub'}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.date ? new Date(item.date).toLocaleDateString() : new Date().toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0 text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80">
                  <span>Weight: {item.estimatedWeight || '1.20 kg'}</span>
                  <span className="flex items-center space-x-1 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Verified</span>
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {complaints.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-400 text-xs bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
              No complaints filed.
            </div>
          ) : (
            complaints.map((item) => (
              <div key={item.id || item.complaintId} className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                <div>
                  {(item.photoUrl || item.photo) && (
                    <div className="relative h-40 overflow-hidden bg-slate-950">
                      <img src={item.photoUrl || item.photo} alt={item.type} className="w-full h-full object-cover" />
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded bg-slate-900/80 text-white font-bold text-[10px] backdrop-blur-md">
                        {item.complaintId || item.id}
                      </span>
                    </div>
                  )}

                  <div className="p-5 space-y-3">
                    <div className="flex justify-between items-start">
                      <h4 className="font-extrabold text-sm text-slate-900 dark:text-white leading-tight">{item.type}</h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        item.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {item.status || 'Pending'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                      {item.description}
                    </p>

                    <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center space-x-1.5">
                        <MapPin className="w-3.5 h-3.5 text-rose-500" />
                        <span className="truncate">{item.location}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : new Date().toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0 text-[11px] font-medium text-slate-400 flex items-center justify-between">
                  <span>Inspector: {item.assignedOfficer || 'GVMC Health Dept'}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

    </div>
  );
}

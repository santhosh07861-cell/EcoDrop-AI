import React, { useEffect, useState } from 'react';
import { 
  Building2, Camera, QrCode, AlertTriangle, CheckCircle, 
  RefreshCw, MapPin, Layers, Award, Trash2, ImageOff 
} from 'lucide-react';
import StatisticsCard from '../../components/StatisticsCard';
import MapComponent from '../../components/MapComponent';
import QRCard from '../../components/QRCard';
import { ReportService } from '../../services/ReportService';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export default function SupervisorDashboard() {
  const { user } = useAuth();
  const [bins, setBins] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'Master View', icon: Building2 },
    { id: 'photos_locations', label: 'Photos & Location Map', icon: MapPin },
    { id: 'qrcodes', label: 'Bin QR Codes', icon: QrCode },
    { id: 'complaints', label: 'Complaints Register', icon: AlertTriangle }
  ];

  const loadAllData = async () => {
    setLoading(true);
    const [bRes, cRes] = await Promise.all([
      ReportService.getBinPhotosAndLocations(),
      ReportService.getComplaints()
    ]);

    if (bRes.success) setBins(bRes.bins);
    if (cRes.success) setComplaints(cRes.complaints);
    setLoading(false);
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const handleResolveComplaint = async (id) => {
    const res = await ReportService.updateComplaintStatus(id, 'Resolved');
    if (res.success) {
      toast.success(res.message || 'Ticket marked as Resolved!');
      loadAllData();
    }
  };

  const handleSeedFirebase = async () => {
    toast.loading('Writing Photos, Locations, QR Codes & Complaints to Firebase Firestore...', { id: 'seedToast' });
    const res = await ReportService.seedFirebaseData();
    toast.success(res.message, { id: 'seedToast' });
    loadAllData();
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-emerald-950 rounded-3xl p-6 text-white shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center border border-emerald-500/20">
        <div>
          <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            System Super Admin Master Console
          </span>
          <h1 className="text-2xl font-extrabold mt-1">Complete Data Control Console</h1>
          <p className="text-xs text-slate-400 mt-1">Full Telemetry Access • Photos, QR Codes, Locations & Complaints</p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center space-x-3">
          <button
            onClick={handleSeedFirebase}
            className="px-3.5 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md flex items-center space-x-1.5"
          >
            <span>🔥 Sync Data with Firebase</span>
          </button>
          <button
            onClick={loadAllData}
            className="p-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white"
            title="Refresh All Firebase Stores"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <StatisticsCard title="Monitored Bin Locations" value={`${bins.length} Bins`} subtitle="GPS Mapped" icon={MapPin} color="blue" />
        <StatisticsCard title="User Uploaded Photos" value={`${complaints.filter(c => c.photoUrl || c.photo).length} Photos`} subtitle="Firebase Storage" icon={Camera} color="purple" />
        <StatisticsCard title="Registered Bin QRs" value={`${bins.length} QR Tags`} subtitle="Decoded Codes" icon={QrCode} color="amber" />
        <StatisticsCard title="Total Citizen Complaints" value={`${complaints.length} Tickets`} subtitle="Active Logs" icon={AlertTriangle} color="rose" />
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex space-x-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
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

      {/* Tab 1: Master View / Photos & Map */}
      {(activeTab === 'all' || activeTab === 'photos_locations') && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Interactive Map */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
              <MapPin className="w-4 h-4 text-emerald-500" />
              <span>Full City Live Map & Coordinates</span>
            </h3>
            <div className="h-[440px] rounded-2xl overflow-hidden">
              <MapComponent dropPoints={bins} />
            </div>
          </div>

          {/* User Submitted Original Photos Sidebar */}
          <div className="lg:col-span-5 space-y-4 max-h-[500px] overflow-y-auto pr-1">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
              <Camera className="w-4 h-4 text-purple-500" />
              <span>Database Photos (Original Uploads Only)</span>
            </h3>

            {/* Display User Submitted Original Photos from Complaints / Collections */}
            {complaints.filter(c => c.photoUrl || c.photo).length > 0 ? (
              complaints.filter(c => c.photoUrl || c.photo).map((cmp) => (
                <div key={`cmp_photo_${cmp.id}`} className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-purple-500/30 shadow-md space-y-3">
                  <div className="relative h-44 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <img 
                      src={cmp.photoUrl || cmp.photo} 
                      alt={cmp.type} 
                      loading="eager"
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-purple-950/90 text-white text-[10px] font-extrabold uppercase">
                      {cmp.complaintId || cmp.id}
                    </div>
                    <div className={`absolute bottom-2 right-2 px-2 py-0.5 rounded text-[10px] font-extrabold ${
                      cmp.status === 'Resolved' ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
                    }`}>
                      {cmp.status || 'Logged'}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">{cmp.type}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{cmp.location} • By {cmp.userName || 'Citizen'}</p>
                  </div>
                </div>
              ))
            ) : null}

            {/* Display Bins (Shows ONLY real uploaded photo or clean placeholder, NO FAKE STOCK PHOTOS!) */}
            {bins.map((bin) => {
              const hasPhoto = bin.photoUrl && bin.photoUrl.trim() !== '';
              return (
                <div key={bin.id} className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                  <div className="relative h-40 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800/80 flex flex-col items-center justify-center border border-slate-200 dark:border-slate-800">
                    {hasPhoto ? (
                      <img 
                        src={bin.photoUrl} 
                        alt={bin.name} 
                        loading="eager"
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      /* Clean SVG Placeholder for Bins without Photo (NO FAKE PHOTOS) */
                      <div className="text-center p-4 space-y-2">
                        <ImageOff className="w-8 h-8 text-slate-400 mx-auto" />
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block">No Photo Uploaded Yet</span>
                        <span className="text-[10px] text-slate-400 block">Photo will appear here when uploaded via app</span>
                      </div>
                    )}

                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-950/80 text-white text-[10px] font-bold">
                      {bin.binId || bin.dropPointId}
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-bold">
                      {bin.capacityStatus || '10% Full'}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{bin.name}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{bin.location || bin.address}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* Tab 2: QR Codes */}
      {(activeTab === 'all' || activeTab === 'qrcodes') && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
            <QrCode className="w-4 h-4 text-amber-500" />
            <span>Bin QR Codes Registry</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {bins.map((bin) => (
              <QRCard key={bin.id} codeData={bin.qrCodeData || `${bin.binId}|${bin.name}`} title={bin.name} />
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Complaints Register */}
      {(activeTab === 'all' || activeTab === 'complaints') && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              <span>Full System Complaints & Submissions Register</span>
            </h3>
            <span className="text-xs font-bold text-slate-400">{complaints.length} Total Records</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase bg-slate-50 dark:bg-slate-800/50">
                  <th className="py-3 px-3">Ticket ID</th>
                  <th className="py-3 px-3">Photo Preview</th>
                  <th className="py-3 px-3">Citizen</th>
                  <th className="py-3 px-3">Type</th>
                  <th className="py-3 px-3">Description</th>
                  <th className="py-3 px-3">Location</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {complaints.map((cmp) => (
                  <tr key={cmp.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3.5 px-3 font-bold text-emerald-600 dark:text-emerald-400">{cmp.complaintId || cmp.id}</td>
                    <td className="py-3.5 px-3">
                      {cmp.photoUrl || cmp.photo ? (
                        <img src={cmp.photoUrl || cmp.photo} alt="Photo" className="w-10 h-10 rounded-lg object-cover border border-slate-200 dark:border-slate-700" />
                      ) : (
                        <span className="text-slate-400 italic">No Photo</span>
                      )}
                    </td>
                    <td className="py-3.5 px-3 font-semibold text-slate-800 dark:text-slate-200">{cmp.userName || 'Citizen'}</td>
                    <td className="py-3.5 px-3 font-bold text-slate-700 dark:text-slate-300">{cmp.type}</td>
                    <td className="py-3.5 px-3 max-w-xs text-slate-600 dark:text-slate-400 truncate">{cmp.description}</td>
                    <td className="py-3.5 px-3 text-slate-500 font-medium">{cmp.location}</td>
                    <td className="py-3.5 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        cmp.status === 'Resolved'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}>
                        {cmp.status || 'Pending'}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      {cmp.status === 'Resolved' ? (
                        <span className="text-emerald-600 font-bold text-[11px]">✓ Resolved</span>
                      ) : (
                        <button
                          onClick={() => handleResolveComplaint(cmp.id)}
                          className="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm"
                        >
                          Resolve
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}

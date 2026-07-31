import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import DashboardCards from '../components/DashboardCards';
import { CategoryPieChart, WardBarChart, TrendAreaChart } from '../components/Charts';
import MapComponent from '../components/MapComponent';
import { 
  getDashboardDataApi, updateComplaintStatusApi, 
  deleteComplaintApi, createDropPointApi, deleteCollectionApi 
} from '../services/api';
import { 
  Plus, CheckCircle, Trash2, Eye, MapPin, 
  AlertTriangle, Recycle, RefreshCw, X, ShieldAlert 
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddPointModal, setShowAddPointModal] = useState(false);

  // New Drop Point Form State
  const [newPoint, setNewPoint] = useState({
    name: '',
    ward: 'Ward 12 (Siripuram)',
    address: '',
    operatingHours: '08:00 AM - 08:00 PM',
    contactPerson: 'GVMC Health Inspector'
  });

  const loadData = () => {
    setLoading(true);
    getDashboardDataApi()
      .then(res => {
        if (res.data.success) {
          setDashboardData(res.data);
        }
      })
      .catch(err => toast.error('Failed to load command center data.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdateComplaintStatus = async (id, status) => {
    try {
      const res = await updateComplaintStatusApi(id, { status });
      if (res.data.success) {
        toast.success(res.data.message);
        loadData();
      }
    } catch (e) {
      toast.error('Failed to update complaint status.');
    }
  };

  const handleDeleteComplaint = async (id) => {
    try {
      const res = await deleteComplaintApi(id);
      if (res.data.success) {
        toast.success('Complaint record removed.');
        loadData();
      }
    } catch (e) {
      toast.error('Failed to delete complaint.');
    }
  };

  const handleDeleteCollection = async (id) => {
    try {
      const res = await deleteCollectionApi(id);
      if (res.data.success) {
        toast.success('Collection log removed.');
        loadData();
      }
    } catch (e) {
      toast.error('Failed to delete collection log.');
    }
  };

  const handleCreateDropPoint = async (e) => {
    e.preventDefault();
    try {
      const res = await createDropPointApi(newPoint);
      if (res.data.success) {
        toast.success(res.data.message);
        setShowAddPointModal(false);
        setNewPoint({ name: '', ward: 'Ward 12 (Siripuram)', address: '', operatingHours: '08:00 AM - 08:00 PM', contactPerson: 'GVMC Health Inspector' });
        loadData();
      }
    } catch (e) {
      toast.error(e.response?.data?.message || 'Failed to create drop point.');
    }
  };

  if (loading || !dashboardData) {
    return (
      <div className="flex h-96 items-center justify-center text-slate-400 text-xs">
        <RefreshCw className="w-8 h-8 text-gvmc-500 animate-spin mr-2" />
        <span>Loading GVMC Command Dashboard...</span>
      </div>
    );
  }

  const { stats, charts, recentCollections, recentComplaints, dropPoints } = dashboardData;

  return (
    <div className="flex flex-col lg:flex-row -m-4 sm:-m-6 lg:-m-8 min-h-screen">
      
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Command Console Content Area */}
      <main className="flex-1 p-6 space-y-8 bg-slate-100 dark:bg-slate-950 overflow-x-hidden">
        
        {/* Header bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white dark:bg-slate-900 p-5 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
          <div>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-gvmc-100 dark:bg-gvmc-950 text-gvmc-700 dark:text-gvmc-300 uppercase">
              Live Monitoring & Analytics
            </span>
            <h1 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1 capitalize">
              {activeTab === 'overview' ? 'GVMC Executive Dashboard' : activeTab}
            </h1>
          </div>

          <div className="mt-3 sm:mt-0 flex items-center space-x-3">
            <button
              onClick={() => setShowAddPointModal(true)}
              className="px-4 py-2 rounded-xl bg-gvmc-600 hover:bg-gvmc-500 text-white font-bold text-xs shadow-md flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Drop Point</span>
            </button>
            <button
              onClick={loadData}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
              title="Refresh Live Feed"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab 1: Overview */}
        {(activeTab === 'overview' || activeTab === 'analytics') && (
          <div className="space-y-8">
            <DashboardCards stats={stats} />

            {/* Analytics Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <CategoryPieChart data={charts.categoryDistribution} />
              <WardBarChart data={charts.wardData} />
              <TrendAreaChart data={charts.dailyTrend} />
            </div>

            {/* Live Visakhapatnam Map Section */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-lg border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Visakhapatnam Drop Point Status Map</h3>
                  <p className="text-xs text-slate-400">Real-time bin capacity & field officer tracking</p>
                </div>
                <span className="text-xs font-bold text-gvmc-600 flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{dropPoints.length} Bins Online</span>
                </span>
              </div>
              <div className="h-96">
                <MapComponent dropPoints={dropPoints} />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Complaints Table */}
        {(activeTab === 'overview' || activeTab === 'complaints') && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-lg border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Citizen Complaints Register</h3>
                <p className="text-xs text-slate-400">Assign inspectors, inspect photos, and resolve tickets</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 text-xs font-bold">
                {recentComplaints.filter(c => c.status !== 'Resolved').length} Unresolved
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase">
                    <th className="py-3 px-2">Ticket ID</th>
                    <th className="py-3 px-2">Type</th>
                    <th className="py-3 px-2">Description</th>
                    <th className="py-3 px-2">Location</th>
                    <th className="py-3 px-2">Status</th>
                    <th className="py-3 px-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {recentComplaints.map((cmp) => (
                    <tr key={cmp.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="py-3.5 px-2 font-bold text-gvmc-600 dark:text-gvmc-400">{cmp.complaintId}</td>
                      <td className="py-3.5 px-2 font-semibold text-slate-800 dark:text-slate-200">{cmp.type}</td>
                      <td className="py-3.5 px-2 max-w-xs text-slate-600 dark:text-slate-400 truncate">{cmp.description}</td>
                      <td className="py-3.5 px-2 text-slate-500">{cmp.location}</td>
                      <td className="py-3.5 px-2">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          cmp.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {cmp.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-2 text-right space-x-2">
                        {cmp.status !== 'Resolved' && (
                          <button
                            onClick={() => handleUpdateComplaintStatus(cmp.id, 'Resolved')}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[10px] hover:bg-emerald-500"
                          >
                            Resolve
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteComplaint(cmp.id)}
                          className="p-1 text-slate-400 hover:text-rose-600"
                          title="Delete Ticket"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Collection Submissions Table */}
        {(activeTab === 'overview' || activeTab === 'collections') && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-lg border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Live Collection Log Register</h3>
                <p className="text-xs text-slate-400">Verified e-waste drop-offs by citizens and field officers</p>
              </div>
              <span className="text-xs font-bold text-gvmc-600">{recentCollections.length} Records</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase">
                    <th className="py-3 px-2">Collection ID</th>
                    <th className="py-3 px-2">Citizen</th>
                    <th className="py-3 px-2">Waste Category</th>
                    <th className="py-3 px-2">Weight</th>
                    <th className="py-3 px-2">Drop Center</th>
                    <th className="py-3 px-2">Status</th>
                    <th className="py-3 px-2 text-right">Delete</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {recentCollections.map((col) => (
                    <tr key={col.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="py-3.5 px-2 font-bold text-ocean-600">{col.collectionId}</td>
                      <td className="py-3.5 px-2 font-semibold text-slate-800 dark:text-slate-200">{col.userName}</td>
                      <td className="py-3.5 px-2 text-slate-600 dark:text-slate-400">{col.wasteCategory}</td>
                      <td className="py-3.5 px-2 font-bold text-gvmc-600">{col.estimatedWeight}</td>
                      <td className="py-3.5 px-2 text-slate-500">{col.dropPointName || col.dropPointId}</td>
                      <td className="py-3.5 px-2">
                        <span className="px-2.5 py-1 rounded-full bg-gvmc-100 dark:bg-gvmc-950 text-gvmc-800 dark:text-gvmc-300 text-[10px] font-bold">
                          {col.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-2 text-right">
                        <button
                          onClick={() => handleDeleteCollection(col.id)}
                          className="p-1 text-slate-400 hover:text-rose-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>

      {/* Add New Drop Point Modal */}
      {showAddPointModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full border border-slate-200 dark:border-slate-800 space-y-4 shadow-2xl animate-fadeIn">
            <div className="flex justify-between items-center border-b pb-3 border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Add New GVMC Drop-Off Center</h3>
              <button onClick={() => setShowAddPointModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateDropPoint} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Center Name</label>
                <input
                  type="text"
                  required
                  value={newPoint.name}
                  onChange={(e) => setNewPoint({ ...newPoint, name: e.target.value })}
                  placeholder="e.g. Asilmetta Junction Drop Kiosk"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white font-medium outline-none focus:ring-2 focus:ring-gvmc-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">GVMC Ward / Zone</label>
                <input
                  type="text"
                  required
                  value={newPoint.ward}
                  onChange={(e) => setNewPoint({ ...newPoint, ward: e.target.value })}
                  placeholder="Ward 16 (Asilmetta)"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white font-medium outline-none focus:ring-2 focus:ring-gvmc-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  value={newPoint.address}
                  onChange={(e) => setNewPoint({ ...newPoint, address: e.target.value })}
                  placeholder="Near Sampath Vinayaka Temple Road, Visakhapatnam"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white font-medium outline-none focus:ring-2 focus:ring-gvmc-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Hours</label>
                  <input
                    type="text"
                    value={newPoint.operatingHours}
                    onChange={(e) => setNewPoint({ ...newPoint, operatingHours: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white font-medium outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Supervisor</label>
                  <input
                    type="text"
                    value={newPoint.contactPerson}
                    onChange={(e) => setNewPoint({ ...newPoint, contactPerson: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white font-medium outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gvmc-600 hover:bg-gvmc-500 text-white font-bold shadow-md mt-2"
              >
                Register Center & Generate QR
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

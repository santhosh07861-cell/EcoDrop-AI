import React, { useEffect, useState } from 'react';
import { 
  Building2, BarChart2, Calendar, Flame, TrendingUp, 
  FileSpreadsheet, Download, Bell, AlertTriangle, CheckCircle, 
  RefreshCw, CheckCircle2, FileText, ArrowUpRight 
} from 'lucide-react';
import StatisticsCard from '../../components/StatisticsCard';
import ChartsPlaceholder from '../../components/ChartsPlaceholder';
import MapPlaceholder from '../../components/MapPlaceholder';
import NotificationCard from '../../components/NotificationCard';
import DataTable from '../../components/DataTable';
import { ReportService } from '../../services/ReportService';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export default function CommissionerDashboard() {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('city');

  const tabs = [
    { id: 'city', label: 'City Dashboard', icon: Building2 },
    { id: 'comparison', label: 'Ward Comparison', icon: BarChart2 },
    { id: 'monthly', label: 'Monthly Statistics', icon: Calendar },
    { id: 'heatmap', label: 'Heat Map', icon: Flame },
    { id: 'analytics', label: 'Performance Analytics', icon: TrendingUp },
    { id: 'reports', label: 'Complaints & Reports', icon: FileSpreadsheet },
    { id: 'downloads', label: 'Downloads & Exports', icon: Download },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ];

  const loadComplaints = async () => {
    setLoading(true);
    const res = await ReportService.getComplaints();
    if (res.success) {
      setComplaints(res.complaints);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadComplaints();
  }, []);

  const handleResolveComplaint = async (id) => {
    const res = await ReportService.updateComplaintStatus(id, 'Resolved');
    if (res.success) {
      toast.success(res.message || 'Ticket marked as Resolved in Firebase!');
      loadComplaints();
    } else {
      toast.error('Failed to update complaint status.');
    }
  };

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,Ticket ID,Complainant,Type,Location,Status\n" + 
      complaints.map(e => `${e.complaintId || e.id},"${e.userName}","${e.type}","${e.location}",${e.status}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `GVMC_EWaste_Report_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('GVMC City E-Waste Analytics Report exported as CSV!');
  };

  const pendingCount = complaints.filter(c => c.status !== 'Resolved').length;
  const resolvedCount = complaints.filter(c => c.status === 'Resolved').length;

  const wardComparisonData = [
    { ward: 'Ward 12 (Siripuram)', collections: 142, weightKg: '284.5 kg', recyclingRate: '98.2%' },
    { ward: 'Ward 14 (RK Beach)', collections: 118, weightKg: '212.0 kg', recyclingRate: '96.5%' },
    { ward: 'Ward 8 (MVP Colony)', collections: 156, weightKg: '310.2 kg', recyclingRate: '99.0%' },
    { ward: 'Ward 65 (Gajuwaka)', collections: 164, weightKg: '495.8 kg', recyclingRate: '94.0%' },
    { ward: 'Ward 92 (Pendurthi)', collections: 89, weightKg: '148.0 kg', recyclingRate: '95.1%' }
  ];

  const wardColumns = [
    { header: 'GVMC Ward Zone', accessor: 'ward' },
    { header: 'Collection Logs', accessor: 'collections' },
    { header: 'E-Waste Weight', accessor: 'weightKg' },
    { header: 'Recycling Efficiency', accessor: 'recyclingRate' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-800 to-indigo-900 rounded-3xl p-6 text-white shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-white/20 text-white">
            GVMC Executive Analytics Console
          </span>
          <h1 className="text-2xl font-extrabold mt-1">Commissioner Analyst Dashboard</h1>
          <p className="text-xs text-purple-100 mt-1">Analyst: {user?.name || 'Dr. K. V. Satyanarayana (GVMC Commissioner)'} • Visakhapatnam City</p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
            <Building2 className="w-5 h-5 text-purple-200" />
            <div>
              <p className="text-[10px] text-purple-100 font-bold uppercase">City Target</p>
              <p className="text-lg font-extrabold">12.4 Tons / Month</p>
            </div>
          </div>
          <button
            onClick={loadComplaints}
            className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white"
            title="Refresh Data from Firebase"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
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
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: City Dashboard */}
      {activeTab === 'city' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <StatisticsCard title="City Total Collection" value="14.8 Tons" subtitle="Year 2026 To Date" icon={Building2} color="purple" />
            <StatisticsCard title="Active Smart Bins" value="128 Bins" subtitle="Across 98 Wards" icon={BarChart2} color="emerald" />
            <StatisticsCard title="Citizen Participation" value="24,500+" subtitle="Registered Accounts" icon={TrendingUp} color="blue" />
            <StatisticsCard title="Recycling Rate" value="94.2%" subtitle="APPCB Certified" icon={Calendar} color="amber" />
          </div>

          <ChartsPlaceholder type="all" />
        </div>
      )}

      {/* TAB 2: Ward Comparison */}
      {activeTab === 'comparison' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">GVMC Ward Performance Comparison</h3>
            <button onClick={handleExportCSV} className="px-3 py-1.5 rounded-xl bg-purple-600 text-white text-xs font-bold flex items-center space-x-1">
              <Download className="w-3.5 h-3.5" />
              <span>Export Ward Metrics</span>
            </button>
          </div>
          <ChartsPlaceholder type="bar" />
          <DataTable columns={wardColumns} data={wardComparisonData} />
        </div>
      )}

      {/* TAB 3: Monthly Statistics */}
      {activeTab === 'monthly' && (
        <div className="space-y-6">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Visakhapatnam Monthly E-Waste Tonnage Trend</h3>
          <ChartsPlaceholder type="area" />
        </div>
      )}

      {/* TAB 4: Heat Map Placeholder */}
      {activeTab === 'heatmap' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">City E-Waste Density Heat Map</h3>
            <span className="text-xs text-purple-600 font-bold bg-purple-50 dark:bg-purple-950 px-3 py-1 rounded-full">
              Live Zonal Density
            </span>
          </div>
          <MapPlaceholder title="Visakhapatnam E-Waste Accumulation Heat Map" height="h-[500px]" />
        </div>
      )}

      {/* TAB 5: Performance Analytics */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">E-Waste Category Distribution & Recycling Performance</h3>
          <ChartsPlaceholder type="pie" />
        </div>
      )}

      {/* TAB 6: Reports & Complaints Register (With Direct Resolve Button) */}
      {activeTab === 'reports' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-lg border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">City E-Waste Complaints Register</h3>
              <p className="text-xs text-slate-400">Review citizen reports & mark problem resolution status directly in Firebase</p>
            </div>
            <button
              onClick={handleExportCSV}
              className="px-3 py-1.5 rounded-xl bg-purple-600 text-white font-bold text-xs flex items-center space-x-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase bg-slate-50 dark:bg-slate-800/50">
                  <th className="py-3 px-3">Ticket ID</th>
                  <th className="py-3 px-3">Complainant</th>
                  <th className="py-3 px-3">Issue Type</th>
                  <th className="py-3 px-3">Description</th>
                  <th className="py-3 px-3">Location</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {complaints.map((cmp) => {
                  const isResolved = cmp.status === 'Resolved';
                  return (
                    <tr key={cmp.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="py-4 px-3 font-bold text-purple-600 dark:text-purple-400">{cmp.complaintId || cmp.id}</td>
                      <td className="py-4 px-3 font-semibold text-slate-800 dark:text-slate-200">{cmp.userName || 'Citizen'}</td>
                      <td className="py-4 px-3 font-bold text-slate-700 dark:text-slate-300">{cmp.type}</td>
                      <td className="py-4 px-3 max-w-xs text-slate-600 dark:text-slate-400 truncate">{cmp.description}</td>
                      <td className="py-4 px-3 text-slate-500 font-medium">{cmp.location}</td>
                      <td className="py-4 px-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                          isResolved
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        }`}>
                          {cmp.status || 'Pending'}
                        </span>
                      </td>
                      <td className="py-4 px-3 text-center">
                        {isResolved ? (
                          <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 inline-flex items-center space-x-1">
                            <CheckCircle className="w-4 h-4 text-emerald-500" />
                            <span>Resolved</span>
                          </span>
                        ) : (
                          <button
                            onClick={() => handleResolveComplaint(cmp.id)}
                            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-sm flex items-center space-x-1 mx-auto transition-all"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Resolve</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 7: Downloads & Exports */}
      {activeTab === 'downloads' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 max-w-lg">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Download Executive Datasets</h3>
          <p className="text-xs text-slate-500">Export city collection reports, ward statistics, and complaint logs directly to CSV.</p>
          <button
            onClick={handleExportCSV}
            className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-md"
          >
            <Download className="w-4 h-4" />
            <span>Export Full E-Waste Complaints CSV</span>
          </button>
        </div>
      )}

      {/* TAB 8: Notifications */}
      {activeTab === 'notifications' && (
        <div className="space-y-3 max-w-xl">
          <NotificationCard title="Monthly Audit Ready" message="July 2026 E-Waste recycling certification report generated." time="1 hour ago" type="success" />
          <NotificationCard title="Gajuwaka Industrial Alert" message="Bin DP-GVMC-004 reaches 82% capacity limit." time="3 hours ago" type="warning" />
        </div>
      )}

    </div>
  );
}

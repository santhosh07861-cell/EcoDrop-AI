import React from 'react';
import { 
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, AreaChart, Area 
} from 'recharts';

const COLORS = ['#059669', '#0284c7', '#f59e0b', '#ec4899', '#8b5cf6', '#14b8a6'];

export function CategoryPieChart({ data = [] }) {
  const chartData = data.length > 0 ? data : [
    { name: 'Mobile Phones & Accessories', value: 45 },
    { name: 'Laptops & Hardware', value: 25 },
    { name: 'Lithium Batteries', value: 18 },
    { name: 'Monitors & Displays', value: 12 },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-lg border border-slate-200 dark:border-slate-800 h-80 flex flex-col justify-between">
      <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">E-Waste Category Breakdown</h4>
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function WardBarChart({ data = [] }) {
  const chartData = data.length > 0 ? data : [
    { ward: 'Siripuram', collections: 42, weightKg: 84.5 },
    { ward: 'RK Beach', collections: 38, weightKg: 62.0 },
    { ward: 'MVP Colony', collections: 56, weightKg: 110.2 },
    { ward: 'Gajuwaka', collections: 64, weightKg: 195.8 },
    { ward: 'Pendurthi', collections: 29, weightKg: 48.0 },
    { ward: 'Dwaraka', collections: 47, weightKg: 91.4 }
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-lg border border-slate-200 dark:border-slate-800 h-80 flex flex-col justify-between">
      <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Ward-Wise Collection Volume (kg)</h4>
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.3} />
            <XAxis dataKey="ward" tick={{ fontSize: 10, fill: '#94a3b8' }} />
            <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} />
            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
            <Bar dataKey="weightKg" fill="#059669" radius={[6, 6, 0, 0]} name="Weight (kg)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function TrendAreaChart({ data = [] }) {
  const chartData = data.length > 0 ? data : [
    { date: 'Mon', dropOffs: 18, kg: 34 },
    { date: 'Tue', dropOffs: 25, kg: 49 },
    { date: 'Wed', dropOffs: 30, kg: 61 },
    { date: 'Thu', dropOffs: 22, kg: 42 },
    { date: 'Fri', dropOffs: 41, kg: 88 },
    { date: 'Sat', dropOffs: 58, kg: 124 },
    { date: 'Sun', dropOffs: 64, kg: 140 }
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-lg border border-slate-200 dark:border-slate-800 h-80 flex flex-col justify-between">
      <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Weekly Collection & Diversion Trend</h4>
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorDropOffs" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0284c7" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#0284c7" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.3} />
            <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} />
            <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} />
            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
            <Area type="monotone" dataKey="kg" stroke="#0284c7" fillOpacity={1} fill="url(#colorDropOffs)" name="E-Waste Diverted (kg)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

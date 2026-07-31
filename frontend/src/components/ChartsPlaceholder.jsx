import React from 'react';
import { CategoryPieChart, WardBarChart, TrendAreaChart } from './Charts';

export default function ChartsPlaceholder({ type = 'all', data }) {
  const sampleCategory = [
    { name: 'Mobiles', value: 40 },
    { name: 'Laptops', value: 25 },
    { name: 'Batteries', value: 20 },
    { name: 'Appliances', value: 15 }
  ];

  const sampleWard = [
    { ward: 'Ward 12', collections: 42 },
    { ward: 'Ward 14', collections: 38 },
    { ward: 'Ward 8', collections: 56 }
  ];

  const sampleTrend = [
    { date: 'Mon', dropOffs: 18, kg: 34 },
    { date: 'Tue', dropOffs: 25, kg: 49 },
    { date: 'Wed', dropOffs: 30, kg: 61 }
  ];

  if (type === 'pie') return <CategoryPieChart data={data || sampleCategory} />;
  if (type === 'bar') return <WardBarChart data={data || sampleWard} />;
  if (type === 'area') return <TrendAreaChart data={data || sampleTrend} />;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <CategoryPieChart data={sampleCategory} />
      <WardBarChart data={sampleWard} />
      <TrendAreaChart data={sampleTrend} />
    </div>
  );
}

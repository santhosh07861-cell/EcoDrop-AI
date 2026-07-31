import React from 'react';
import MapComponent from './MapComponent';

export default function MapPlaceholder({ title = 'Visakhapatnam Coverage Map', height = 'h-72', dropPoints = [] }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
      {title && <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">{title}</h3>}
      <div className={`${height} w-full rounded-2xl overflow-hidden`}>
        <MapComponent dropPoints={dropPoints} />
      </div>
    </div>
  );
}

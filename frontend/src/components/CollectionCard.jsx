import React from 'react';
import { Package, MapPin, Scale } from 'lucide-react';

export default function CollectionCard({ collection }) {
  if (!collection) return null;
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400">{collection.collectionId || 'COL-001'}</span>
        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{collection.weight || '1.2 kg'}</span>
      </div>
      <h4 className="text-xs font-bold text-slate-900 dark:text-white">{collection.category || 'Household Electronics'}</h4>
      <div className="flex items-center space-x-1 text-[11px] text-slate-500">
        <MapPin className="w-3.5 h-3.5 text-emerald-500" />
        <span className="truncate">{collection.location || 'Siripuram Hub'}</span>
      </div>
    </div>
  );
}

import React from 'react';
import { UploadCloud, Image as ImageIcon } from 'lucide-react';

export default function ImageUploadUI({ onSelectImage, label = 'Upload Photo of E-Waste' }) {
  return (
    <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-3xl p-6 text-center bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer space-y-2">
      <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
        <UploadCloud className="w-6 h-6" />
      </div>
      <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{label}</p>
      <p className="text-[10px] text-slate-400">Click or drag & drop PNG, JPG up to 10MB</p>
    </div>
  );
}

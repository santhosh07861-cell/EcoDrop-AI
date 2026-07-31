import React from 'react';
import { QrCode, Copy } from 'lucide-react';

export default function QRCard({ codeData = 'DP-GVMC-001|Siripuram|Ward 12', title = 'Drop Point Bin QR Code' }) {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md text-center space-y-4 max-w-sm mx-auto">
      <h3 className="text-sm font-bold text-slate-900 dark:text-white">{title}</h3>
      <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl inline-block border border-slate-200 dark:border-slate-700">
        <QrCode className="w-32 h-32 text-slate-800 dark:text-white mx-auto" />
      </div>
      <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-[11px] font-mono text-slate-600 dark:text-slate-400 break-all">
        {codeData}
      </div>
    </div>
  );
}

import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function ConfirmationDialog({ isOpen, title = 'Confirm Action', message = 'Are you sure you want to proceed?', onConfirm, onCancel, confirmText = 'Confirm', confirmColor = 'bg-rose-600' }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-sm w-full border border-slate-200 dark:border-slate-800 space-y-4 shadow-2xl animate-fadeIn">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 text-amber-500">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">{title}</h3>
          </div>
          <button onClick={onCancel} className="text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400">{message}</p>

        <div className="flex space-x-3 pt-2">
          <button
            onClick={onCancel}
            className="flex-1 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-2 rounded-xl ${confirmColor} text-white font-bold text-xs hover:opacity-90 shadow-md`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

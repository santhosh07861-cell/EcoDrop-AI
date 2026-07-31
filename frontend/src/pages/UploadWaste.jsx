import React from 'react';
import UploadCard from '../components/UploadCard';
import { useLocation } from 'react-router-dom';
import { MapPin } from 'lucide-react';

export default function UploadWaste() {
  const location = useLocation();
  const centerFromState = location.state?.center;

  return (
    <div className="space-y-6">
      
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Gemini AI Waste Classification</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Upload an image of your electronic item for automated classification, weight estimation, and Green Points calculation
        </p>

        {centerFromState && (
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-gvmc-100 dark:bg-gvmc-950 text-gvmc-700 dark:text-gvmc-300 text-xs font-bold border border-gvmc-200 dark:border-gvmc-800">
            <MapPin className="w-3.5 h-3.5" />
            <span>Target Bin: {centerFromState.name} ({centerFromState.dropPointId})</span>
          </div>
        )}
      </div>

      <UploadCard dropPointId={centerFromState?.dropPointId || "DP-GVMC-001"} />

    </div>
  );
}

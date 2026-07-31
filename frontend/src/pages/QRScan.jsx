import React, { useState } from 'react';
import QRScanner from '../components/QRScanner';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

export default function QRScan() {
  const [verifiedCenter, setVerifiedCenter] = useState(null);
  const navigate = useNavigate();

  const handleScanSuccess = (center) => {
    setVerifiedCenter(center);
  };

  const handleContinueToUpload = () => {
    navigate('/upload', { state: { center: verifiedCenter } });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Scan Drop Bin QR Code</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Scan the QR tag posted at any Visakhapatnam drop-off point to verify bin location before submitting e-waste
        </p>
      </div>

      <QRScanner onScanSuccess={handleScanSuccess} />

      {verifiedCenter && (
        <div className="bg-gradient-to-r from-gvmc-600 to-ocean-600 rounded-3xl p-6 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-fadeIn">
          <div>
            <div className="flex items-center space-x-2 text-gvmc-200 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-gvmc-300" />
              <span>Center Ready for Drop-Off</span>
            </div>
            <h3 className="text-lg font-black mt-1">{verifiedCenter.name}</h3>
            <p className="text-xs text-slate-200 mt-0.5">{verifiedCenter.address}</p>
          </div>

          <button
            onClick={handleContinueToUpload}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white text-gvmc-700 font-extrabold text-xs shadow-lg hover:bg-slate-100 transition-transform active:scale-95 flex items-center justify-center space-x-2 shrink-0"
          >
            <span>Proceed to AI Waste Classifier</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
}

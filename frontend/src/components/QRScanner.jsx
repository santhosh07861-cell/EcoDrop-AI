import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { Camera, CheckCircle, RefreshCw, Barcode } from 'lucide-react';
import { scanQRCodeApi } from '../services/api';
import { ReportService } from '../services/ReportService';
import toast from 'react-hot-toast';

export default function QRScanner({ onScanSuccess }) {
  const [scanning, setScanning] = useState(false);
  const [scannedResult, setScannedResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const scannerRef = useRef(null);

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  const startScanner = async () => {
    setScanning(true);
    setScannedResult(null);
    try {
      // Support all 1D Barcode Formats & 2D QR Codes
      const formatsToSupport = [
        Html5QrcodeSupportedFormats.QR_CODE,
        Html5QrcodeSupportedFormats.EAN_13,
        Html5QrcodeSupportedFormats.EAN_8,
        Html5QrcodeSupportedFormats.CODE_128,
        Html5QrcodeSupportedFormats.CODE_39,
        Html5QrcodeSupportedFormats.UPC_A,
        Html5QrcodeSupportedFormats.UPC_E,
        Html5QrcodeSupportedFormats.ITF,
        Html5QrcodeSupportedFormats.CODABAR
      ];

      const html5QrCode = new Html5Qrcode("qr-reader", { 
        formatsToSupport,
        verbose: false 
      });
      scannerRef.current = html5QrCode;

      const config = {
        fps: 20,
        qrbox: { width: 300, height: 180 },
        aspectRatio: 1.0,
        experimentalFeatures: {
          useBarCodeDetectorIfSupported: true
        }
      };

      await html5QrCode.start(
        { facingMode: "environment" },
        config,
        async (decodedText, decodedResult) => {
          stopScanner();
          const formatName = decodedResult?.result?.format?.formatName || '1D/2D Barcode';
          handleDecodedData(decodedText, formatName);
        },
        () => {}
      );
    } catch (err) {
      console.warn("Camera scanner notice:", err);
      toast.error("Camera scanner unavailable. Enter the barcode digits below.");
      setScanning(false);
    }
  };

  const stopScanner = () => {
    if (scannerRef.current && scannerRef.current.isScanning) {
      scannerRef.current.stop().then(() => {
        scannerRef.current.clear();
        setScanning(false);
      }).catch(err => console.error(err));
    } else {
      setScanning(false);
    }
  };

  const handleDecodedData = async (codeData, formatName = 'Barcode / QR Code') => {
    setLoading(true);
    try {
      let center = null;
      try {
        const res = await scanQRCodeApi(codeData);
        if (res.data && res.data.success && res.data.center) {
          center = res.data.center;
        }
      } catch (e) {}

      const isNumericBarcode = /^\d+$/.test(codeData);

      if (!center) {
        center = {
          dropPointId: codeData,
          name: isNumericBarcode ? `Scanned 1D Barcode (${codeData})` : `GVMC Smart Tag (${codeData})`,
          address: isNumericBarcode ? `Electronic Item Barcode #${codeData} • Visakhapatnam Network` : `Drop Point Kiosk Tag #${codeData}`,
          ward: 'GVMC Visakhapatnam',
          codeType: isNumericBarcode ? '1D Barcode (EAN/UPC)' : formatName
        };
      } else {
        center.codeType = formatName;
      }

      setScannedResult(center);
      toast.success(`Accurately Decoded: ${codeData}`);

      // Save exact scanned barcode & QR data into Firebase Firestore
      await ReportService.createDropPoint({
        binId: codeData,
        name: center.name,
        location: center.address,
        qrCodeData: codeData,
        lat: 17.7220,
        lng: 83.3150
      });

      if (onScanSuccess) onScanSuccess(center);
    } catch (e) {
      toast.error("Error saving barcode to Firebase.");
    } finally {
      setLoading(false);
    }
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!manualCode.trim()) {
      toast.error("Please enter a QR or Barcode number.");
      return;
    }
    handleDecodedData(manualCode.trim(), '1D Barcode');
    setManualCode('');
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl border border-slate-200 dark:border-slate-800 max-w-lg mx-auto space-y-6">
      
      {/* Header */}
      <div className="text-center">
        <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center mb-3 shadow-inner">
          <Barcode className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">GVMC QR & 1D Barcode Scanner</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Point camera directly at 1D Item Barcodes (EAN-13, Code 128, UPC) & 2D Bin QR tags
        </p>
      </div>

      {/* Scanner Box Viewport */}
      <div className="relative bg-slate-950 rounded-2xl overflow-hidden min-h-[300px] flex flex-col items-center justify-center border-2 border-dashed border-emerald-500/40 p-4">
        
        <div id="qr-reader" className="w-full h-full"></div>

        {!scanning && !scannedResult && !loading && (
          <div className="text-center p-6 space-y-4">
            <Camera className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
            <div>
              <p className="text-sm font-bold text-slate-200">Point Camera at Barcode or QR Code</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Detects 1D Barcode lines (e.g. 79359426436872) & 2D QR tags</p>
            </div>
            
            <button
              onClick={startScanner}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg flex items-center justify-center space-x-2 mx-auto"
            >
              <Camera className="w-4 h-4" />
              <span>Start Live Scanner</span>
            </button>
          </div>
        )}

        {scanning && (
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-20">
            <span className="text-[11px] font-bold text-emerald-400 bg-slate-900/90 px-3 py-1 rounded-full border border-emerald-500/40 flex items-center space-x-1">
              <Barcode className="w-3.5 h-3.5" />
              <span>Scanning 1D Barcodes & QR Codes...</span>
            </span>
            <button
              onClick={stopScanner}
              className="px-4 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-bold shadow-md"
            >
              Stop
            </button>
          </div>
        )}

        {loading && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center text-white z-30 space-y-2">
            <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin" />
            <p className="text-xs font-semibold">Decoding Barcode & Saving to Firebase...</p>
          </div>
        )}
      </div>

      {/* Manual Barcode / QR Number Input Form */}
      <form onSubmit={handleManualSubmit} className="space-y-1.5">
        <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block">
          Enter Barcode Digits (e.g. 79359426436872) or Bin Code:
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={manualCode}
            onChange={(e) => setManualCode(e.target.value)}
            placeholder="Type digits e.g. 79359426436872..."
            className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white text-xs font-bold outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="submit"
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-extrabold shadow-sm"
          >
            Decode Code
          </button>
        </div>
      </form>

      {/* Decoded Code Result Card */}
      {scannedResult && (
        <div className="p-4 rounded-2xl bg-emerald-50/90 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-emerald-800 dark:text-emerald-200 font-bold text-sm">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <span>Decoded & Saved to Firebase</span>
            </div>
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100">
              {scannedResult.codeType || '1D Barcode'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 block text-[10px]">Item / Tag Name</span>
              <span className="font-bold text-slate-900 dark:text-white truncate block">{scannedResult.name}</span>
            </div>
            <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 block text-[10px]">Exact Barcode / Code Digits</span>
              <span className="font-mono font-extrabold text-emerald-600 dark:text-emerald-400 truncate block">{scannedResult.dropPointId}</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
            <span className="text-slate-400 block text-[10px]">Tag Details</span>
            <span className="font-medium text-slate-800 dark:text-slate-200">{scannedResult.address}</span>
          </div>
        </div>
      )}

      {/* Quick Test Demo Buttons */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
        <p className="text-[11px] font-semibold text-slate-400 text-center mb-2">Simulate Exact Barcode / QR Scans:</p>
        <div className="flex flex-wrap gap-1.5 justify-center">
          <button
            onClick={() => handleDecodedData("79359426436872", "1D Barcode (EAN-13)")}
            className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-200 rounded-lg text-[11px] font-extrabold border border-emerald-300"
          >
            Scan Barcode: 79359426436872
          </button>
          <button
            onClick={() => handleDecodedData("DP-GVMC-001", "GVMC Bin QR")}
            className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-emerald-100 text-slate-700 dark:text-slate-300 rounded-lg text-[11px] font-medium"
          >
            Siripuram Bin QR
          </button>
          <button
            onClick={() => handleDecodedData("DP-GVMC-002", "RK Beach QR")}
            className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-emerald-100 text-slate-700 dark:text-slate-300 rounded-lg text-[11px] font-medium"
          >
            RK Beach QR
          </button>
        </div>
      </div>

    </div>
  );
}

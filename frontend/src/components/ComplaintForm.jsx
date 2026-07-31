import React, { useState } from 'react';
import { AlertTriangle, MapPin, Camera, Send, CheckCircle } from 'lucide-react';
import { ReportService } from '../services/ReportService';
import { StorageService } from '../services/StorageService';
import toast from 'react-hot-toast';

export default function ComplaintForm({ dropPoints = [] }) {
  const [type, setType] = useState('Overflowing Bin');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [selectedDropPoint, setSelectedDropPoint] = useState('');
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleGeolocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLocation(`Visakhapatnam Lat: ${pos.coords.latitude.toFixed(4)}, Lng: ${pos.coords.longitude.toFixed(4)}`);
        toast.success("Location coordinates captured!");
      }, () => {
        setLocation("Ward 12, Siripuram, Visakhapatnam");
        toast.success("Default location set to Vizag Central");
      });
    } else {
      setLocation("Siripuram, Visakhapatnam");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) {
      toast.error("Please enter a brief description of the issue.");
      return;
    }

    setLoading(true);
    try {
      let uploadedPhotoUrl = "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=400&q=80";
      
      if (photoFile) {
        toast.loading("Uploading photo to Firebase Storage...", { id: 'fbStorageToast' });
        const uploadRes = await StorageService.uploadImage(photoFile, 'complaint_photos');
        if (uploadRes.url) uploadedPhotoUrl = uploadRes.url;
        toast.dismiss('fbStorageToast');
      }

      // Store in Firebase Firestore
      const res = await ReportService.createComplaint({
        type,
        description,
        location: location || 'Visakhapatnam City Area',
        dropPointId: selectedDropPoint || null,
        photoUrl: uploadedPhotoUrl,
        userName: 'Citizen User'
      });

      if (res.success) {
        toast.success(res.message || 'Complaint stored in Firebase Firestore!');
        setSubmitted(true);
      }
    } catch (err) {
      toast.error('Failed to submit complaint.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-800 text-center space-y-4 max-w-lg mx-auto">
        <div className="w-16 h-16 rounded-full bg-gvmc-100 dark:bg-gvmc-950 text-gvmc-600 dark:text-gvmc-400 mx-auto flex items-center justify-center">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Complaint Registered with GVMC</h3>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Thank you for helping keep Visakhapatnam clean. A ticket has been dispatched to the Ward Health Inspector.
        </p>
        <button
          onClick={() => { setSubmitted(false); setDescription(''); setPhotoFile(null); setPhotoPreview(null); }}
          className="px-6 py-2.5 rounded-xl bg-gvmc-600 text-white font-bold text-xs hover:bg-gvmc-500 shadow-md"
        >
          Submit Another Report
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl border border-slate-200 dark:border-slate-800 max-w-lg mx-auto space-y-5">
      
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center shadow-inner">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Report E-Waste Issue</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">GVMC Public Health & Solid Waste Complaint Portal</p>
        </div>
      </div>

      {/* Complaint Category Dropdown */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Complaint Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-gvmc-500 outline-none"
        >
          <option value="Overflowing Bin">🗑️ Overflowing E-Waste Drop Bin</option>
          <option value="Damaged Bin">🛠️ Damaged / Vandalized Drop Point</option>
          <option value="Unregistered E-Waste Dumping">⚠️ Illegal Commercial E-Waste Dumping</option>
          <option value="Hazardous Battery Leakage">🔋 Battery Leakage / Hazardous Spills</option>
          <option value="Other Issue">📝 Other Solid Waste Issue</option>
        </select>
      </div>

      {/* Associated Drop-off Point Selector */}
      {dropPoints.length > 0 && (
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Related Drop Point (Optional)</label>
          <select
            value={selectedDropPoint}
            onChange={(e) => setSelectedDropPoint(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-gvmc-500 outline-none"
          >
            <option value="">Select a specific Visakhapatnam drop point...</option>
            {dropPoints.map(dp => (
              <option key={dp.id} value={dp.dropPointId}>
                {dp.name} ({dp.ward})
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Description Textarea */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Description of Issue</label>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Provide details about location, bin condition, or hazardous materials..."
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white text-xs focus:ring-2 focus:ring-gvmc-500 outline-none"
        ></textarea>
      </div>

      {/* Location Input with Geolocate Button */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Location / Ward</label>
        <div className="flex space-x-2">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Near Siripuram Circle, Ward 12"
            className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white text-xs focus:ring-2 focus:ring-gvmc-500 outline-none"
          />
          <button
            type="button"
            onClick={handleGeolocate}
            className="px-3 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-gvmc-100 text-gvmc-700 dark:text-gvmc-300 rounded-xl text-xs font-bold flex items-center space-x-1 border border-slate-200 dark:border-slate-700"
          >
            <MapPin className="w-4 h-4" />
            <span>GPS</span>
          </button>
        </div>
      </div>

      {/* Photo Upload */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Upload Photo Evidence</label>
        <div className="flex items-center space-x-3">
          <label className="cursor-pointer flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors">
            <Camera className="w-4 h-4 text-rose-500" />
            <span>Attach Photo</span>
            <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
          </label>
          {photoPreview && (
            <img src={photoPreview} alt="Preview" className="w-12 h-12 rounded-xl object-cover border border-rose-400 shadow-sm" />
          )}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-sm shadow-lg shadow-rose-950/30 transition-transform active:scale-95 flex items-center justify-center space-x-2"
      >
        {loading ? (
          <span>Transmitting Ticket...</span>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Submit Complaint to GVMC</span>
          </>
        )}
      </button>
    </form>
  );
}

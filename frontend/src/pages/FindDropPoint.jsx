import React, { useEffect, useState } from 'react';
import MapComponent from '../components/MapComponent';
import { getDropPointsApi } from '../services/api';
import { MapPin, Navigation, Clock, ShieldCheck, Filter, Search, PhoneCall, QrCode } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

// Haversine formula to calculate distance in km
function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round((R * c) * 10) / 10;
}

const DEFAULT_DROP_POINTS = [
  {
    id: "dp_siripuram_12",
    dropPointId: "DP-GVMC-001",
    name: "Siripuram Smart E-Waste Hub",
    ward: "Ward 12 (Siripuram)",
    zone: "Zone 3 (Central Vizag)",
    address: "Opposite HSBC Building, Siripuram Circle, Visakhapatnam - 530003",
    lat: 17.7220,
    lng: 83.3150,
    operatingHours: "08:00 AM - 08:00 PM",
    contactPerson: "Field Officer M. Rajesh (GVMC)",
    acceptedTypes: ["Mobiles", "Laptops", "Batteries", "Chargers", "Small Appliances"],
    capacityStatus: "45% Full",
    capacityPercentage: 45,
    status: "Active",
    qrCodeData: "DP-GVMC-001|Siripuram Hub|Ward 12"
  },
  {
    id: "dp_rkbeach_14",
    dropPointId: "DP-GVMC-002",
    name: "RK Beach Promenade Drop Kiosk",
    ward: "Ward 14 (RK Beach)",
    zone: "Zone 3 (Central Vizag)",
    address: "Near Submarine Museum Promenade, Beach Road, Visakhapatnam - 530017",
    lat: 17.7125,
    lng: 83.3225,
    operatingHours: "06:00 AM - 09:00 PM",
    contactPerson: "Supervisor K. Srinivasa Rao",
    acceptedTypes: ["Mobiles", "Batteries", "Small Hardware", "Chargers"],
    capacityStatus: "70% Full",
    capacityPercentage: 70,
    status: "Active",
    qrCodeData: "DP-GVMC-002|RK Beach Kiosk|Ward 14"
  },
  {
    id: "dp_mvp_8",
    dropPointId: "DP-GVMC-003",
    name: "MVP Colony Sector-4 Recycling Station",
    ward: "Ward 8 (MVP Colony)",
    zone: "Zone 2 (North Vizag)",
    address: "Adjacent to Rythu Bazar, Sector 4, MVP Colony, Visakhapatnam - 530017",
    lat: 17.7440,
    lng: 83.3320,
    operatingHours: "07:30 AM - 07:30 PM",
    contactPerson: "Field Officer P. Lakshmi",
    acceptedTypes: ["All Household E-Waste", "Monitors", "TVs", "Batteries"],
    capacityStatus: "30% Full",
    capacityPercentage: 30,
    status: "Active",
    qrCodeData: "DP-GVMC-003|MVP Colony Station|Ward 8"
  },
  {
    id: "dp_gajuwaka_4",
    dropPointId: "DP-GVMC-004",
    name: "Gajuwaka Industrial Belt E-Waste Drop Center",
    ward: "Ward 65 (Gajuwaka)",
    zone: "Zone 4 (South Vizag)",
    address: "Near Gajuwaka Bus Depot Main Gate, Visakhapatnam - 530026",
    lat: 17.6900,
    lng: 83.2180,
    operatingHours: "08:00 AM - 06:00 PM",
    contactPerson: "GVMC Inspector T. Ramesh",
    acceptedTypes: ["Commercial & Industrial E-Waste", "PCBs", "Large Hardware"],
    capacityStatus: "82% Full (Alert)",
    capacityPercentage: 82,
    status: "Active",
    qrCodeData: "DP-GVMC-004|Gajuwaka Drop Center|Ward 65"
  },
  {
    id: "dp_pendurthi_5",
    dropPointId: "DP-GVMC-005",
    name: "Pendurthi Junction Smart E-Bin",
    ward: "Ward 92 (Pendurthi)",
    zone: "Zone 5 (West Vizag)",
    address: "GVMC Zonal Office Compound, Pendurthi Main Road, Visakhapatnam - 531173",
    lat: 17.7780,
    lng: 83.2120,
    operatingHours: "08:00 AM - 07:00 PM",
    contactPerson: "Field Officer S. Naidu",
    acceptedTypes: ["Mobiles", "Batteries", "Chargers", "Small IT Hardware"],
    capacityStatus: "20% Full",
    capacityPercentage: 20,
    status: "Active",
    qrCodeData: "DP-GVMC-005|Pendurthi Smart Bin|Ward 92"
  },
  {
    id: "dp_dwarakanagar_20",
    dropPointId: "DP-GVMC-006",
    name: "Dwaraka Nagar Commercial Hub Drop Point",
    ward: "Ward 20 (Dwaraka Nagar)",
    zone: "Zone 3 (Central Vizag)",
    address: "Near RTC Complex Road, 1st Lane, Dwaraka Nagar, Visakhapatnam - 530016",
    lat: 17.7280,
    lng: 83.3030,
    operatingHours: "09:00 AM - 08:30 PM",
    contactPerson: "GVMC Officer V. Anand",
    acceptedTypes: ["Laptops", "Mobiles", "Batteries", "Monitors"],
    capacityStatus: "55% Full",
    capacityPercentage: 55,
    status: "Active",
    qrCodeData: "DP-GVMC-006|Dwaraka Nagar Hub|Ward 20"
  }
];

export default function FindDropPoint() {
  const [dropPoints, setDropPoints] = useState(DEFAULT_DROP_POINTS);
  const [selectedPoint, setSelectedPoint] = useState(DEFAULT_DROP_POINTS[0]);
  const [userLocation, setUserLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWard, setSelectedWard] = useState('All');
  const [loading, setLoading] = useState(true);
  const [locating, setLocating] = useState(false);

  useEffect(() => {
    getDropPointsApi()
      .then(res => {
        if (res.data && res.data.success && Array.isArray(res.data.dropPoints) && res.data.dropPoints.length > 0) {
          setDropPoints(res.data.dropPoints);
          setSelectedPoint(res.data.dropPoints[0]);
        } else {
          setDropPoints(DEFAULT_DROP_POINTS);
          setSelectedPoint(DEFAULT_DROP_POINTS[0]);
        }
      })
      .catch(err => {
        setDropPoints(DEFAULT_DROP_POINTS);
        setSelectedPoint(DEFAULT_DROP_POINTS[0]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Detect User Location via Browser GPS & Sort Nearest Bins
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser.');
      return;
    }

    setLocating(true);
    toast.loading('Detecting your location...', { id: 'geoToast' });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const uLat = position.coords.latitude;
        const uLng = position.coords.longitude;
        setUserLocation({ lat: uLat, lng: uLng });

        // Calculate distance for all drop points & sort from nearest to farthest
        const updatedPoints = dropPoints.map(pt => ({
          ...pt,
          distanceKm: calculateDistanceKm(uLat, uLng, pt.lat, pt.lng)
        })).sort((a, b) => a.distanceKm - b.distanceKm);

        setDropPoints(updatedPoints);
        if (updatedPoints.length > 0) {
          setSelectedPoint(updatedPoints[0]);
          toast.success(`Nearest: ${updatedPoints[0].name} (${updatedPoints[0].distanceKm} km away)`, { id: 'geoToast' });
        } else {
          toast.dismiss('geoToast');
        }
        setLocating(false);
      },
      (error) => {
        // Fallback for demo: Use Siripuram Center Coordinates if GPS denied or unavailable
        const demoLat = 17.7230;
        const demoLng = 83.3160;
        setUserLocation({ lat: demoLat, lng: demoLng });

        const updatedPoints = dropPoints.map(pt => ({
          ...pt,
          distanceKm: calculateDistanceKm(demoLat, demoLng, pt.lat, pt.lng)
        })).sort((a, b) => a.distanceKm - b.distanceKm);

        setDropPoints(updatedPoints);
        if (updatedPoints.length > 0) {
          setSelectedPoint(updatedPoints[0]);
          toast.success(`Nearest drop point found: ${updatedPoints[0].name} (${updatedPoints[0].distanceKm} km away)`, { id: 'geoToast' });
        } else {
          toast.dismiss('geoToast');
        }
        setLocating(false);
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

  const filteredPoints = dropPoints.filter(dp => {
    const matchesSearch = dp.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          dp.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dp.ward.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesWard = selectedWard === 'All' || dp.ward.includes(selectedWard);
    return matchesSearch && matchesWard;
  });

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Find Visakhapatnam E-Waste Drop Points</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Locate official GVMC QR-coded drop bins across Vizag wards</p>
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-3 md:mt-0">
          <button
            onClick={handleDetectLocation}
            disabled={locating}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-md flex items-center space-x-1.5 transition-all group disabled:opacity-50"
          >
            <Navigation className={`w-4 h-4 text-emerald-100 ${locating ? 'animate-spin' : 'group-hover:rotate-45 transition-transform'}`} />
            <span>{locating ? 'Locating...' : '📍 Find Nearest To Me'}</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Controls */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-md border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by center name, street, or ward..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={selectedWard}
            onChange={(e) => setSelectedWard(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white text-xs font-semibold outline-none"
          >
            <option value="All">All Vizag Wards</option>
            <option value="Ward 12">Ward 12 (Siripuram)</option>
            <option value="Ward 14">Ward 14 (RK Beach)</option>
            <option value="Ward 8">Ward 8 (MVP Colony)</option>
            <option value="Gajuwaka">Zone 4 (Gajuwaka)</option>
            <option value="Pendurthi">Zone 5 (Pendurthi)</option>
          </select>
        </div>
      </div>

      {/* Main Content Layout: Split Map & Center Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Interactive Leaflet Map */}
        <div className="lg:col-span-7 h-[520px]">
          <MapComponent
            dropPoints={filteredPoints}
            selectedPoint={selectedPoint}
            userLocation={userLocation}
            onSelectPoint={(point) => setSelectedPoint(point)}
          />
        </div>

        {/* Drop Points List Sidebar */}
        <div className="lg:col-span-5 space-y-4 max-h-[520px] overflow-y-auto pr-1">
          {loading ? (
            <div className="p-8 text-center text-slate-400 text-xs">Loading Visakhapatnam drop points...</div>
          ) : filteredPoints.length === 0 ? (
            <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl text-center text-slate-400 text-xs border border-slate-200 dark:border-slate-800">
              No drop points matching your search criteria.
            </div>
          ) : (
            filteredPoints.map((point, index) => {
              const isSelected = selectedPoint && selectedPoint.id === point.id;
              const isNearest = index === 0 && point.distanceKm !== undefined;
              return (
                <div
                  key={point.id}
                  onClick={() => setSelectedPoint(point)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50/90 dark:bg-emerald-950/80 border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-300'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200">
                          {point.dropPointId}
                        </span>
                        {isNearest && (
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 flex items-center space-x-1">
                            <span>⭐ Nearest</span>
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">{point.name}</h4>
                    </div>
                    
                    {point.distanceKm !== undefined && (
                      <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/80 px-2 py-0.5 rounded-lg border border-sky-200 dark:border-sky-800">
                        📍 {point.distanceKm} km away
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 font-medium">
                    {point.address}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${point.lat},${point.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center space-x-1.5 shadow-sm transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Navigate to Center</span>
                    </a>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>

    </div>
  );
}

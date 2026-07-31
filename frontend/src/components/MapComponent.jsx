import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Navigation, Clock, ShieldCheck, PhoneCall } from 'lucide-react';

// Custom Marker Icons for Leaflet
const createCustomIcon = (color = '#059669') => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 drop-shadow-md"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3" fill="#ffffff"/></svg>`;
  return L.divIcon({
    html: svg,
    className: 'custom-leaflet-marker',
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -32]
  });
};

const defaultIcon = createCustomIcon('#059669'); // GVMC Green
const activeIcon = createCustomIcon('#0284c7');  // Ocean Blue

// User Current Location Icon
const userLocationIcon = L.divIcon({
  html: `<div className="relative flex items-center justify-center">
    <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-sky-400 opacity-75"></span>
    <span className="relative inline-flex rounded-full h-5 w-5 bg-sky-500 border-2 border-white shadow-lg"></span>
  </div>`,
  className: 'user-location-marker',
  iconSize: [32, 32],
  iconAnchor: [16, 16]
});

// Helper to center map view smoothly
function MapRecenter({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 14, { duration: 1.2 });
    }
  }, [center, map]);
  return null;
}

export default function MapComponent({ dropPoints = [], selectedPoint = null, userLocation = null, onSelectPoint = () => {} }) {
  // Default map position: Visakhapatnam (Siripuram Center)
  const defaultPos = [17.7220, 83.3150];

  const mapCenter = selectedPoint 
    ? [selectedPoint.lat, selectedPoint.lng] 
    : userLocation 
      ? [userLocation.lat, userLocation.lng] 
      : defaultPos;

  return (
    <div className="w-full h-full min-h-[420px] rounded-3xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 relative">
      <MapContainer
        center={defaultPos}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | GVMC'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapRecenter center={mapCenter} />

        {/* User Current Location Marker */}
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userLocationIcon}>
            <Popup>
              <div className="p-1 text-center font-bold text-xs text-sky-700">
                📍 You Are Here
              </div>
            </Popup>
          </Marker>
        )}

        {dropPoints.map((point) => {
          const isSelected = selectedPoint && selectedPoint.id === point.id;
          return (
            <Marker
              key={point.id}
              position={[point.lat, point.lng]}
              icon={isSelected ? activeIcon : defaultIcon}
              eventHandlers={{
                click: () => onSelectPoint(point),
              }}
            >
              <Popup className="gvmc-leaflet-popup">
                <div className="p-1 space-y-2 max-w-[220px]">
                  <div className="flex items-center space-x-1.5 text-gvmc-700 font-extrabold text-xs">
                    <MapPin className="w-4 h-4 text-gvmc-600" />
                    <span>{point.name}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 font-medium leading-tight">{point.address}</p>
                  
                  {point.distanceKm !== undefined && (
                    <span className="inline-block px-2 py-0.5 rounded bg-sky-100 text-sky-800 text-[10px] font-bold">
                      📍 {point.distanceKm} km away
                    </span>
                  )}

                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-100">
                    <span className="font-semibold text-emerald-800">{point.ward}</span>
                  </div>

                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${point.lat},${point.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full mt-2 py-1.5 rounded-lg bg-gvmc-600 hover:bg-gvmc-500 text-white text-[11px] font-bold flex items-center justify-center space-x-1 shadow-sm block text-center"
                  >
                    <Navigation className="w-3 h-3 inline mr-1" />
                    <span>Navigate (Google Maps)</span>
                  </a>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Floating Map Legend */}
      <div className="absolute bottom-4 left-4 z-[400] bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md text-xs flex items-center space-x-3">
        <div className="flex items-center space-x-1.5">
          <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block"></span>
          <span className="font-medium text-slate-700 dark:text-slate-300 text-[11px]">Active Center</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-3 h-3 rounded-full bg-sky-600 inline-block"></span>
          <span className="font-medium text-slate-700 dark:text-slate-300 text-[11px]">Selected Center</span>
        </div>
        {userLocation && (
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-sky-400 animate-pulse inline-block"></span>
            <span className="font-medium text-slate-700 dark:text-slate-300 text-[11px]">Your Location</span>
          </div>
        )}
      </div>
    </div>
  );
}

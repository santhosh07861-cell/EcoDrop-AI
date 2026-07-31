// Placeholder LocationService
// TODO: Integrate Geolocation API & Firestore location tracking

export const LocationService = {
  async getCurrentLocation() {
    // TODO: Get browser/device GPS coordinates
    console.log('[LocationService] Placeholder getCurrentLocation');
    return { success: true, coords: { lat: 17.7230, lng: 83.3160 } }; // Siripuram, Visakhapatnam
  },

  async getNearbyDropPoints(lat, lng) {
    // TODO: Query Firestore drop points with GeoPoint distance filter
    console.log('[LocationService] Placeholder getNearbyDropPoints around:', lat, lng);
    return { success: true, dropPoints: [] };
  }
};

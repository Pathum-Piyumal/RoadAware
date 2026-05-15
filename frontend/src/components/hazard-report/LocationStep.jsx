import { useState, useEffect } from 'react';
import { MapPin, Navigation, Loader2 } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in Leaflet + React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapUpdater = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, 15);
    }
  }, [center, map]);
  return null;
};

const LocationPicker = ({ onLocationChange }) => {
  useMapEvents({
    click(e) {
      onLocationChange(e.latlng);
    },
  });
  return null;
};

const LocationStep = ({ location, onLocationChange }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCurrentLocation = () => {
    setLoading(true);
    setError(null);
    
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        onLocationChange({ lat: latitude, lng: longitude });
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setError("Unable to retrieve your location. Please select it on the map.");
        setLoading(false);
      }
    );
  };

  const defaultCenter = [6.9271, 79.8612]; // Colombo, Sri Lanka as default

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-xl font-semibold mb-2">Where is the hazard located?</h2>
      <p className="text-gray-500 mb-6">Capture your current position or tap the map to adjust.</p>

      <div className="space-y-4">
        <button
          onClick={getCurrentLocation}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 p-4 bg-orange-50 text-orange-700 rounded-xl font-semibold border border-orange-100 hover:bg-orange-100 transition-colors disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <Navigation size={20} />
          )}
          {loading ? "Getting Location..." : "Use My Current Location"}
        </button>

        {error && (
          <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
            {error}
          </div>
        )}

        <div className="h-72 rounded-2xl overflow-hidden border-2 border-gray-100 shadow-inner relative">
          <MapContainer 
            center={location || defaultCenter} 
            zoom={13} 
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {location && <Marker position={location} />}
            <MapUpdater center={location || defaultCenter} />
            <LocationPicker onLocationChange={onLocationChange} />
          </MapContainer>
          
          {!location && (
            <div className="absolute inset-0 bg-gray-900/10 pointer-events-none flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-gray-700 shadow-sm">
                Tap map to pick location
              </div>
            </div>
          )}
        </div>
        
        {location && (
          <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
            <MapPin size={16} className="text-orange-500" />
            <span>
              Coordinates: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationStep;

import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { Navigation } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

const LocationPicker = ({ onLocationChange }) => {
  useMapEvents({
    click(e) {
      onLocationChange(e.latlng);
    },
  });
  return null;
};

const Step2Location = ({ formData, updateData }) => {
  const [loading, setLoading] = useState(false);
  const defaultCenter = [51.528, -0.076]; // Approx London/Shoreditch

  const handleGetCurrent = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        updateData({ location: { lat: pos.coords.latitude, lng: pos.coords.longitude } });
        setLoading(false);
      },
      () => setLoading(false)
    );
  };

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Where is it?</h2>
        <p className="text-gray-500 text-sm">Pinpoint the exact location on the map. Drag the map to refine.</p>
      </div>

      <button
        onClick={handleGetCurrent}
        className="mb-4 flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 text-gray-700 font-semibold text-sm rounded-xl hover:bg-gray-100 transition-colors"
      >
        <Navigation size={16} className="text-blue-600" />
        {loading ? 'Locating...' : 'Use my current location'}
      </button>

      <div className="h-64 rounded-xl overflow-hidden border-2 border-gray-200 mb-6 shadow-sm">
        <MapContainer center={formData.location || defaultCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {formData.location && <Marker position={formData.location} />}
          <LocationPicker onLocationChange={(loc) => updateData({ location: loc })} />
        </MapContainer>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Street address *</label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => updateData({ address: e.target.value })}
            placeholder="e.g. 124 Hackney Rd"
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:bg-white focus:shadow-sm transition-all text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">City / Neighborhood</label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => updateData({ city: e.target.value })}
            placeholder="e.g. Shoreditch"
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:bg-white focus:shadow-sm transition-all text-sm"
          />
        </div>
      </div>
    </div>
  );
};
export default Step2Location;

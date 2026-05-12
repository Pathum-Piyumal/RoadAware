import { useState, useEffect } from 'react';
import { useReport } from '../../../context/ReportContext';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import styles from '../ReportPage.module.css';

// Fix for default marker icon in Leaflet + React
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

function MapUpdater({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView(center, 15);
  }, [center, map]);
  return null;
}

function LocationPicker({ onPick }) {
  useMapEvents({ click(e) { onPick(e.latlng); } });
  return null;
}

export default function Step2Location({ onNext, onBack }) {
  const { state, updateField } = useReport();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const defaultCenter = [6.9271, 79.8612]; // Colombo, Sri Lanka

  const handleGPS = () => {
    setLoading(true);
    setError(null);
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        updateField('location', { lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLoading(false);
      },
      () => {
        setError('Unable to retrieve your location. Please select it on the map.');
        setLoading(false);
      }
    );
  };

  const handleMapClick = (latlng) => {
    updateField('location', { lat: latlng.lat, lng: latlng.lng });
  };

  const mapCenter = state.location
    ? [state.location.lat, state.location.lng]
    : defaultCenter;

  return (
    <div className={styles.card}>
      <h2 className={styles.cardTitle}>Where is the hazard?</h2>
      <p className={styles.cardSub}>Use GPS or tap the map to pinpoint the location.</p>

      <button
        className={styles.gpsBtn}
        onClick={handleGPS}
        disabled={loading}
        type="button"
      >
        {loading ? <span className={styles.spinner} /> : '📍'}
        {loading ? 'Detecting location…' : 'Use my current location'}
      </button>

      {error && <div className={styles.errorBox}>{error}</div>}

      <div className={styles.mapWrap}>
        <MapContainer
          center={mapCenter}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {state.location && (
            <Marker position={[state.location.lat, state.location.lng]} />
          )}
          <MapUpdater center={mapCenter} />
          <LocationPicker onPick={handleMapClick} />
        </MapContainer>
      </div>

      {state.location && (
        <div className={styles.coords}>
          📌 Coordinates: {state.location.lat.toFixed(6)}, {state.location.lng.toFixed(6)}
        </div>
      )}

      <div className={styles.actions}>
        <button className={styles.btnBack} onClick={onBack} type="button">
          ← Back
        </button>
        <button
          className={styles.btnNext}
          onClick={onNext}
          disabled={!state.location}
          type="button"
        >
          Next: Review →
        </button>
      </div>
    </div>
  );
}

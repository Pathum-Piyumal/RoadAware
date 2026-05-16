import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { AlertTriangle, MapPin, Clock, ThumbsUp } from 'lucide-react';

// Fix default marker icon for Leaflet + React
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Create colored marker icons for different severities
const createColorIcon = (color) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      width: 28px; height: 28px; border-radius: 50% 50% 50% 0;
      background: ${color}; transform: rotate(-45deg);
      border: 3px solid #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      display: flex; align-items: center; justify-content: center;
    "><div style="
      width: 8px; height: 8px; border-radius: 50%;
      background: #fff; transform: rotate(45deg);
    "></div></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28],
  });
};

const severityIcons = {
  Critical: createColorIcon('#EF4444'),
  High: createColorIcon('#F59E0B'),
  Medium: createColorIcon('#3B82F6'),
  Low: createColorIcon('#10B981'),
};

// Hazard data with Sri Lanka locations
const hazardData = [
  { id: 1, lat: 6.9271, lng: 79.8612, title: "Massive Pothole on Galle Road", location: "102 Galle Road, Colombo 03", type: "Pothole", status: "Reported", severity: "Critical", upvotes: 130, time: "2 hours ago" },
  { id: 2, lat: 6.9340, lng: 79.8500, title: "Street Flooding near Town Hall", location: "Town Hall, Colombo 07", type: "Flooding", status: "In Progress", severity: "High", upvotes: 98, time: "5 hours ago" },
  { id: 3, lat: 6.9157, lng: 79.8636, title: "Broken Streetlight Series", location: "Marine Drive, Colombo 03", type: "Streetlight", status: "Reported", severity: "Medium", upvotes: 45, time: "1 day ago" },
  { id: 4, lat: 6.9390, lng: 79.8700, title: "Construction Debris on Road", location: "Bauddhaloka Mawatha, Colombo 07", type: "Debris", status: "Reported", severity: "High", upvotes: 82, time: "12 hours ago" },
  { id: 5, lat: 6.9200, lng: 79.8750, title: "Open Manhole Cover", location: "Duplication Road, Colombo 04", type: "Construction", status: "In Progress", severity: "Critical", upvotes: 140, time: "3 hours ago" },
  { id: 6, lat: 6.9450, lng: 79.8580, title: "Minor Road Cracks", location: "Independence Avenue, Colombo 07", type: "Pothole", status: "Reported", severity: "Low", upvotes: 22, time: "3 days ago" },
  { id: 7, lat: 6.9100, lng: 79.8520, title: "Waterlogged Junction", location: "Bambalapitiya Junction, Colombo 04", type: "Flooding", status: "Reported", severity: "High", upvotes: 67, time: "8 hours ago" },
  { id: 8, lat: 6.9500, lng: 79.8650, title: "Fallen Tree Branch", location: "Horton Place, Colombo 07", type: "Debris", status: "Resolved", severity: "Medium", upvotes: 34, time: "2 days ago" },
  { id: 9, lat: 6.9050, lng: 79.8700, title: "Stray Animal Warning", location: "Wellawatte, Colombo 06", type: "Animal", status: "Reported", severity: "Low", upvotes: 18, time: "1 day ago" },
  { id: 10, lat: 6.9320, lng: 79.8400, title: "Unmarked Road Work Zone", location: "Baseline Road, Colombo 09", type: "Construction", status: "In Progress", severity: "High", upvotes: 71, time: "6 hours ago" },
  { id: 11, lat: 6.9550, lng: 79.8550, title: "Deep Pothole near Bridge", location: "Orugodawatte, Colombo 10", type: "Pothole", status: "Reported", severity: "Critical", upvotes: 112, time: "4 hours ago" },
  { id: 12, lat: 6.9230, lng: 79.8450, title: "Damaged Road Barrier", location: "Havelock Road, Colombo 05", type: "Construction", status: "Reported", severity: "Medium", upvotes: 56, time: "1 day ago" },
];

const severityColors = {
  Critical: { bg: 'rgba(239, 68, 68, 0.15)', text: '#EF4444', border: 'rgba(239, 68, 68, 0.3)' },
  High: { bg: 'rgba(245, 158, 11, 0.15)', text: '#F59E0B', border: 'rgba(245, 158, 11, 0.3)' },
  Medium: { bg: 'rgba(59, 130, 246, 0.15)', text: '#3B82F6', border: 'rgba(59, 130, 246, 0.3)' },
  Low: { bg: 'rgba(16, 185, 129, 0.15)', text: '#10B981', border: 'rgba(16, 185, 129, 0.3)' },
};

const statusColors = {
  Reported: { bg: 'rgba(59, 130, 246, 0.15)', text: '#3B82F6' },
  'In Progress': { bg: 'rgba(245, 158, 11, 0.15)', text: '#F59E0B' },
  Resolved: { bg: 'rgba(16, 185, 129, 0.15)', text: '#10B981' },
};

const MapMonitoring = () => {
  const [typeFilter, setTypeFilter] = useState('All types');
  const [statusFilter, setStatusFilter] = useState('All statuses');
  const [severityFilter, setSeverityFilter] = useState('All severities');

  const selectClasses = "bg-admin-input-bg border border-admin-border rounded-lg py-2 pl-4 pr-8 text-sm text-admin-text cursor-pointer appearance-none bg-no-repeat bg-[right_0.75rem_center] bg-[length:1rem] transition-all focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%236B7280%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%222%22%20d%3D%22M19%209l-7%207-7-7%22%2F%3E%3C%2Fsvg%3E')]";

  // Filter hazards based on selected filters
  const filteredHazards = useMemo(() => {
    return hazardData.filter(hazard => {
      const matchType = typeFilter === 'All types' || hazard.type === typeFilter;
      const matchStatus = statusFilter === 'All statuses' || hazard.status === statusFilter;
      const matchSeverity = severityFilter === 'All severities' || hazard.severity === severityFilter;
      return matchType && matchStatus && matchSeverity;
    });
  }, [typeFilter, statusFilter, severityFilter]);

  // Get unique types from data
  const types = ['All types', ...new Set(hazardData.map(h => h.type))];
  const statuses = ['All statuses', ...new Set(hazardData.map(h => h.status))];
  const severities = ['All severities', 'Critical', 'High', 'Medium', 'Low'];

  return (
    <div className="flex flex-col gap-6 h-full min-h-[calc(100vh-8rem)] animate-[fadeIn_0.5s_ease-in-out] p-4 lg:p-0 pb-8">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .custom-marker {
          background: transparent !important;
          border: none !important;
        }
        .leaflet-container {
          border-radius: 12px;
          z-index: 1;
        }
        .hazard-popup .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.15);
          padding: 0;
        }
        .hazard-popup .leaflet-popup-content {
          margin: 0;
          min-width: 240px;
        }
        .hazard-popup .leaflet-popup-tip {
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
      `}</style>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-0">
        <div>
          <h1 className="text-2xl font-bold text-admin-text tracking-tight m-0">Map view & hotspots</h1>
          <p className="text-admin-text-muted text-sm mt-1 mb-0">Visualize hazard density and patterns across the city.</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-4 bg-admin-card p-4 rounded-xl border border-admin-border shadow-sm">
        <select
          className={selectClasses}
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          {types.map(t => <option key={t}>{t}</option>)}
        </select>
        <select
          className={selectClasses}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          {statuses.map(s => <option key={s}>{s}</option>)}
        </select>
        <select
          className={selectClasses}
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
        >
          {severities.map(s => <option key={s}>{s}</option>)}
        </select>
        <span className="text-sm text-admin-text-muted ml-2">
          <strong className="text-admin-text">{filteredHazards.length}</strong> hazards visible
        </span>
      </div>

      {/* Map Container */}
      <div className="flex-1 bg-admin-card border border-admin-border rounded-xl overflow-hidden shadow-sm relative" style={{ minHeight: '500px' }}>
        <MapContainer
          center={[6.9271, 79.8612]}
          zoom={13}
          style={{ height: '100%', width: '100%', minHeight: '500px' }}
          zoomControl={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {filteredHazards.map(hazard => (
            <Marker
              key={hazard.id}
              position={[hazard.lat, hazard.lng]}
              icon={severityIcons[hazard.severity] || DefaultIcon}
            >
              <Popup className="hazard-popup">
                <div style={{ padding: '16px', fontFamily: "'Google Sans', sans-serif" }}>
                  {/* Badges */}
                  <div style={{ display: 'flex', gap: '6px', marginBottom: '10px', flexWrap: 'wrap' }}>
                    <span style={{
                      padding: '3px 8px', borderRadius: '6px', fontSize: '10px',
                      fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em',
                      background: severityColors[hazard.severity]?.bg,
                      color: severityColors[hazard.severity]?.text,
                      border: `1px solid ${severityColors[hazard.severity]?.border}`,
                    }}>
                      {hazard.severity}
                    </span>
                    <span style={{
                      padding: '3px 8px', borderRadius: '6px', fontSize: '10px',
                      fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em',
                      background: statusColors[hazard.status]?.bg,
                      color: statusColors[hazard.status]?.text,
                    }}>
                      {hazard.status}
                    </span>
                    <span style={{
                      padding: '3px 8px', borderRadius: '6px', fontSize: '10px',
                      fontWeight: 600, background: '#f3f4f6', color: '#6b7280',
                    }}>
                      {hazard.type}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 style={{ margin: '0 0 8px', fontSize: '14px', fontWeight: 700, color: '#111' }}>
                    {hazard.title}
                  </h3>

                  {/* Location */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#6b7280', marginBottom: '6px' }}>
                    <MapPin size={12} />
                    {hazard.location}
                  </div>

                  {/* Time */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#6b7280', marginBottom: '10px' }}>
                    <Clock size={12} />
                    {hazard.time}
                  </div>

                  {/* Footer */}
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    paddingTop: '10px', borderTop: '1px solid #f3f4f6',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 700, color: '#111' }}>
                      <ThumbsUp size={14} />
                      {hazard.upvotes}
                    </div>
                    <span style={{ fontSize: '11px', color: '#9ca3af' }}>
                      ID: #{hazard.id}
                    </span>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Map Legend Overlay */}
        <div className="absolute bottom-4 left-4 bg-admin-card/90 backdrop-blur-md border border-admin-border rounded-xl p-4 shadow-lg" style={{ zIndex: 1000 }}>
          <p className="text-xs font-semibold text-admin-text m-0 mb-2">Severity Legend</p>
          <div className="flex flex-col gap-1.5">
            {[
              { label: 'Critical', color: '#EF4444' },
              { label: 'High', color: '#F59E0B' },
              { label: 'Medium', color: '#3B82F6' },
              { label: 'Low', color: '#10B981' },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-admin-text-muted">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapMonitoring;

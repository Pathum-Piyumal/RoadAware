import React from 'react';
import { Map as MapIcon } from 'lucide-react';
import '../../css/Reports.css'; // Reusing header/filters
import '../../css/MapMonitoring.css';

const MapMonitoring = () => {
  return (
    <div className="admin-map-container">
      {/* Header */}
      <div className="admin-reports-header" style={{ marginBottom: '-0.5rem' }}>
        <div>
          <h1 className="admin-reports-title" style={{ color: 'var(--admin-text)', textTransform: 'none', letterSpacing: 'normal' }}>Map view & hotspots</h1>
          <p className="admin-reports-subtitle">Visualize hazard density and patterns across the city.</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="admin-reports-filters" style={{ alignItems: 'center' }}>
        <select className="admin-reports-select">
          <option>All types</option>
          <option>Infrastructure</option>
          <option>Lighting</option>
        </select>
        <select className="admin-reports-select">
          <option>All statuses</option>
          <option>Reported</option>
          <option>In Progress</option>
        </select>
        <select className="admin-reports-select">
          <option>All severities</option>
          <option>Critical</option>
          <option>High</option>
        </select>
        <span style={{ fontSize: '0.875rem', color: 'var(--admin-text-muted)', marginLeft: '0.5rem' }}>
          <strong>32</strong> hazards visible
        </span>
      </div>

      {/* Map Placeholder */}
      <div className="admin-map-placeholder">
        <MapIcon size={48} className="admin-map-icon" />
        <p>Interactive Map Component will be loaded here.</p>
        <p style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>Requires leaflet or google-maps-react</p>
      </div>
    </div>
  );
};

export default MapMonitoring;

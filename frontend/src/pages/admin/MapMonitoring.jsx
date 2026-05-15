import React from 'react';
import { Map as MapIcon } from 'lucide-react';

const MapMonitoring = () => {
  const selectClasses = "bg-admin-input-bg border border-admin-border rounded-lg py-2 pl-4 pr-8 text-sm text-admin-text cursor-pointer appearance-none bg-no-repeat bg-[right_0.75rem_center] bg-[length:1rem] transition-all focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%236B7280%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%222%22%20d%3D%22M19%209l-7%207-7-7%22%2F%3E%3C%2Fsvg%3E')]";

  return (
    <div className="flex flex-col gap-6 h-full min-h-[calc(100vh-8rem)] animate-[fadeIn_0.5s_ease-in-out] p-4 lg:p-0 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-0">
        <div>
          <h1 className="text-2xl font-bold text-admin-text tracking-tight m-0">Map view & hotspots</h1>
          <p className="text-admin-text-muted text-sm mt-1 mb-0">Visualize hazard density and patterns across the city.</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-4 bg-admin-card p-4 rounded-xl border border-admin-border shadow-sm">
        <select className={selectClasses}>
          <option>All types</option>
          <option>Infrastructure</option>
          <option>Lighting</option>
        </select>
        <select className={selectClasses}>
          <option>All statuses</option>
          <option>Reported</option>
          <option>In Progress</option>
        </select>
        <select className={selectClasses}>
          <option>All severities</option>
          <option>Critical</option>
          <option>High</option>
        </select>
        <span className="text-sm text-admin-text-muted ml-2">
          <strong className="text-admin-text">32</strong> hazards visible
        </span>
      </div>

      {/* Map Placeholder */}
      <div className="flex-1 bg-admin-card border border-admin-border rounded-xl flex flex-col items-center justify-center gap-4 text-admin-text-muted shadow-sm">
        <MapIcon size={48} className="text-blue-500 opacity-50" />
        <p className="m-0">Interactive Map Component will be loaded here.</p>
        <p className="text-xs text-admin-text-muted m-0">Requires leaflet or google-maps-react</p>
      </div>
    </div>
  );
};

export default MapMonitoring;

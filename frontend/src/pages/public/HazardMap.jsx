import { useState } from 'react';
import Navbar from '../../components/common/Navbar/Navbar';
import { Search, ChevronDown, Map, Grid, Filter, Flame } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import styles from './HazardMap.module.css';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const hazards = [
  { id: 1, lat: 51.556, lng: -0.297, title: "Pothole: A4006 Wembley" },
  { id: 2, lat: 51.565, lng: -0.285, title: "Flooding: High Road" },
  { id: 3, lat: 51.545, lng: -0.305, title: "Debris: Ealing Road" }
];

export default function HazardMap() {
  const [viewMode, setViewMode] = useState('map'); // 'map' or 'grid'

  return (
    <div className={styles.pageContainer}>
      {/* We use the homepage variant to show "Log in" and "Get started" as in the design */}
      <Navbar variant="homepage" />

      {/* Header Section */}
      <header className={styles.headerSection}>
        <div className={styles.container}>
          <span className={styles.liveBadge}>LIVE MAP</span>
          <h1 className={styles.title}>Hazards in your area</h1>
          <p className={styles.subtitle}>
            Browse every reported hazard. Filter by type, status, or severity. Click any pin for details.
          </p>
        </div>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.container}>
          
          {/* Filters Bar */}
          <div className={styles.filterBar}>
            <div className={styles.searchContainer}>
              <Search size={18} className={styles.searchIcon} />
              <input 
                type="text" 
                placeholder="Search address, area, or ID..." 
                className={styles.searchInput}
              />
            </div>

            <div className={styles.dropdownsContainer}>
              <div className={styles.dropdown}>
                <span>All types</span>
                <ChevronDown size={16} />
              </div>
              <div className={styles.dropdown}>
                <span>All statuses</span>
                <ChevronDown size={16} />
              </div>
              <div className={styles.dropdown}>
                <span>All severities</span>
                <ChevronDown size={16} />
              </div>
            </div>

            <div className={styles.viewToggle}>
              <button 
                className={`${styles.toggleBtn} ${viewMode === 'map' ? styles.activeToggle : ''}`}
                onClick={() => setViewMode('map')}
              >
                <Map size={16} />
              </button>
              <button 
                className={`${styles.toggleBtn} ${viewMode === 'grid' ? styles.activeToggle : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid size={16} />
              </button>
            </div>
          </div>

          {/* Map Info Bar */}
          <div className={styles.mapInfoBar}>
            <div className={styles.hazardCount}>
              <Filter size={14} />
              <strong>32</strong> of 32 hazards
            </div>
            <button className={styles.heatmapToggle}>
              <Flame size={14} />
              Heatmap OFF
            </button>
          </div>

          {/* Map Container */}
          <div className={styles.mapWrapper}>
            <MapContainer 
              center={[51.556, -0.297]} 
              zoom={13} 
              className={styles.map}
              zoomControl={false}
            >
              <TileLayer 
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {hazards.map(hazard => (
                <Marker key={hazard.id} position={[hazard.lat, hazard.lng]}>
                  <Popup>{hazard.title}</Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

        </div>
      </main>

      {/* Footer (Simplified matching design) */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerGrid}>
            <div>
              <div className={styles.footerLogo}>
                <div className={styles.footerLogoIcon}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M12 8v4" />
                    <path d="M12 16h.01" />
                  </svg>
                </div>
                <span className={styles.footerBrand}>RoadAware</span>
              </div>
              <p className={styles.footerDesc}>
                A civic platform connecting communities with road authorities.
              </p>
            </div>
            <div>
              <h4 className={styles.footerHeading}>Emergency</h4>
              <p className={styles.footerText}>
                For life-threatening hazards, always call <strong>911</strong> first.
                <br />support@roadsafe.com
                <br />+65 1234 5678
              </p>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>© 2026 RoadAware. All rights reserved.</p>
            <p>Report hazards. Stay informed. Save lives.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

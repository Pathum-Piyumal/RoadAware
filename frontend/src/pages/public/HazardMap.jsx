import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Search, ChevronDown, LayoutGrid, Map as MapIcon, ThumbsUp, MapPin, Clock } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import styles from './HazardMap.module.css';

// Fix Leaflet icon
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const MOCK_HAZARDS = [
  { id: 1, title: 'Wide pothole in bus lane', location: '124 Hackney Rd, Shoreditch', timeAgo: '2h ago', type: 'Pothole', severity: 'LOW', status: 'REPORTED', upvotes: 45, lat: 51.528, lng: -0.076 },
  { id: 2, title: 'Construction debris on road', location: '98 Bethnal Green Rd', timeAgo: '4h ago', type: 'Debris', severity: 'MEDIUM', status: 'REPORTED', upvotes: 22, lat: 51.525, lng: -0.065 },
  { id: 3, title: 'Flooded underpass', location: '155 Victoria Pk, Hackney', timeAgo: '5h ago', type: 'Flooding', severity: 'HIGH', status: 'IN PROGRESS', upvotes: 77, lat: 51.538, lng: -0.045 },
  { id: 4, title: 'Flickering traffic signal', location: 'Shoreditch High St', timeAgo: '6h ago', type: 'Signal', severity: 'CRITICAL', status: 'REPORTED', upvotes: 104, lat: 51.526, lng: -0.078 },
  { id: 5, title: 'Missing speed limit sign', location: '232 Kingsland Rd', timeAgo: '1d ago', type: 'Signage', severity: 'LOW', status: 'REPORTED', upvotes: 12, lat: 51.532, lng: -0.075 },
  { id: 6, title: 'Unmarked construction zone', location: 'Mile End Rd, Stepney', timeAgo: '1d ago', type: 'Construction', severity: 'HIGH', status: 'REPORTED', upvotes: 89, lat: 51.522, lng: -0.045 },
  { id: 7, title: 'Sinkhole forming on shoulder', location: 'Cambridge Heath Rd', timeAgo: '2d ago', type: 'Pothole', severity: 'CRITICAL', status: 'REPORTED', upvotes: 156, lat: 51.533, lng: -0.055 },
  { id: 8, title: 'Cluster of potholes on main road', location: 'Old Ford Rd, Bow', timeAgo: '2d ago', type: 'Pothole', severity: 'MEDIUM', status: 'REPORTED', upvotes: 34, lat: 51.535, lng: -0.030 },
  { id: 9, title: 'Severe flooding after rain', location: 'Mare St, Hackney', timeAgo: '3d ago', type: 'Flooding', severity: 'HIGH', status: 'REPORTED', upvotes: 112, lat: 51.545, lng: -0.055 },
  { id: 10, title: 'Missing pedestrian sign', location: 'Commercial St', timeAgo: '3d ago', type: 'Signage', severity: 'LOW', status: 'REPORTED', upvotes: 8, lat: 51.520, lng: -0.075 },
];

const HazardMap = () => {
  const [view, setView] = useState('grid'); // 'map' or 'grid'

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <div className={styles.liveBadge}>LIVE MAP</div>
        <h1 className={styles.title}>Hazards in your area</h1>
        <p className={styles.subtitle}>Browse newly reported hazards. Filter by type, status, or severity. Click any pin for details.</p>
      </div>

      <div className={styles.controlsContainer}>
        <div className={styles.searchBar}>
          <Search size={18} className={styles.searchIcon} />
          <input type="text" placeholder="Search address, area, or ID..." className={styles.searchInput} />
        </div>
        <div className={styles.filters}>
          <button className={styles.filterBtn}>All types <ChevronDown size={14}/></button>
          <button className={styles.filterBtn}>All statuses <ChevronDown size={14}/></button>
          <button className={styles.filterBtn}>All severities <ChevronDown size={14}/></button>
          
          <div className={styles.viewToggle}>
            <button className={`${styles.toggleBtn} ${view === 'map' ? styles.active : ''}`} onClick={() => setView('map')}>
              <MapIcon size={18} />
            </button>
            <button className={`${styles.toggleBtn} ${view === 'grid' ? styles.active : ''}`} onClick={() => setView('grid')}>
              <LayoutGrid size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.resultsCount}>
        <span className={styles.countText}>{MOCK_HAZARDS.length} items</span>
      </div>

      {view === 'map' ? (
        <div className={styles.mapWrapper}>
          <MapContainer center={[51.53, -0.06]} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {MOCK_HAZARDS.map(hazard => (
              <Marker key={hazard.id} position={[hazard.lat, hazard.lng]}>
                <Popup>
                  <div style={{ padding: '4px' }}>
                    <div style={{ fontWeight: 800, fontSize: '14px', marginBottom: '4px' }}>{hazard.title}</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>{hazard.type} • {hazard.severity} Severity</div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      ) : (
        <div className={styles.gridWrapper}>
          {MOCK_HAZARDS.map(hazard => (
            <div key={hazard.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.tags}>
                  <span className={`${styles.tag} ${styles[`tagStatus_${hazard.status.replace(' ', '')}`]}`}>{hazard.status}</span>
                  <span className={`${styles.tag} ${styles[`tagSeverity_${hazard.severity}`]}`}>{hazard.severity}</span>
                </div>
              </div>
              <h3 className={styles.cardTitle}>{hazard.title}</h3>
              <div className={styles.cardMeta}>
                <span className={styles.location}><MapPin size={12} /> {hazard.location}</span>
                <span className={styles.timeAgo}><Clock size={12} /> {hazard.timeAgo} • By User</span>
              </div>
              <div className={styles.cardFooter}>
                <div className={styles.upvotes}>
                  <ThumbsUp size={14} /> {hazard.upvotes}
                </div>
                <button className={styles.detailsBtn}>Details →</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HazardMap;

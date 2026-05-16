import { useState } from 'react';
import { Search, ChevronDown, Map, Grid, Filter, Flame, MapPin, Clock, ThumbsUp } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
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

const gridHazards = [
  { id: 1, type: "Pothole", severity: "Low", title: "Widespread Pothole Area", location: "102 Main Road, Colombo", time: "15 days ago by User A", upvotes: 28 },
  { id: 2, type: "Flooding", severity: "High", title: "Central station fully submerged", location: "15 Station Rd, Kandy", time: "2 days ago by User B", upvotes: 112 },
  { id: 3, type: "Pothole", severity: "High", title: "Massive Pothole...", location: "28 Galle Road, Bentota", time: "18 days ago by User C", upvotes: 14 },
  { id: 4, type: "Debris", severity: "Critical", title: "Hazardous debris on road", location: "44 Temple St, Anuradhapura", time: "12 days ago by User D", upvotes: 82 },
  { id: 5, type: "Pothole", severity: "Low", title: "Minor potholes near bridge", location: "Bridge Ave, Galle", time: "20 days ago by User E", upvotes: 34 },
  { id: 6, type: "Construction", severity: "Medium", title: "Unmarked construction zone", location: "40 Kandy Road, Kurunegala", time: "25 days ago by User F", upvotes: 71 },
  { id: 7, type: "Flooding", severity: "High", title: "Multiple flooding points in center", location: "Center St, Jaffna", time: "22 days ago by User G", upvotes: 18 },
  { id: 8, type: "Debris", severity: "Critical", title: "Boulder blocking mountain road", location: "Mountain Pass, Nuwara Eliya", time: "15 days ago by User H", upvotes: 140 },
  { id: 9, type: "Streetlight", severity: "Low", title: "Broken streetlight series", location: "Park Lane, Negombo", time: "5 days ago by User I", upvotes: 42 },
  { id: 10, type: "Animal", severity: "Medium", title: "Stray dog pack on highway", location: "Highway A1 exit, Kelaniya", time: "1 day ago by User J", upvotes: 56 },
  { id: 11, type: "Construction", severity: "High", title: "Open manhole left unattended", location: "700 South St, Matara", time: "6 days ago by User K", upvotes: 97 },
  { id: 12, type: "Pothole", severity: "Critical", title: "Deep pothole near junction", location: "88 Junction, Badulla", time: "10 days ago by User L", upvotes: 130 },
];


export default function HazardMap() {
  const [viewMode, setViewMode] = useState('grid'); // Default to 'grid' to match design step 2
  const [isHeatmap, setIsHeatmap] = useState(false);

  return (
    <div className={styles.pageContainer}>
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
            <button 
              className={styles.heatmapToggle} 
              onClick={() => setIsHeatmap(!isHeatmap)}
              style={{ background: isHeatmap ? '#fee2e2' : 'transparent', color: isHeatmap ? '#ef4444' : 'inherit' }}
            >
              <Flame size={14} color={isHeatmap ? '#ef4444' : 'currentColor'} />
              Heatmap {isHeatmap ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* Content Area (Map or Grid) */}
          {viewMode === 'map' ? (
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
                  isHeatmap ? (
                    <CircleMarker 
                      key={hazard.id} 
                      center={[hazard.lat, hazard.lng]} 
                      pathOptions={{ color: 'transparent', fillColor: '#ef4444', fillOpacity: 0.6 }} 
                      radius={35}
                    >
                      <Popup>{hazard.title} (Heat Zone)</Popup>
                    </CircleMarker>
                  ) : (
                    <Marker key={hazard.id} position={[hazard.lat, hazard.lng]}>
                      <Popup>{hazard.title}</Popup>
                    </Marker>
                  )
                ))}
              </MapContainer>
            </div>
          ) : (
            <div className={styles.gridWrapper}>
              {gridHazards.map(hazard => (
                <div key={hazard.id} className={styles.hazardCard}>
                  <div className={styles.cardBadges}>
                    <span className={`${styles.badge} ${styles['badge' + hazard.type]}`}>{hazard.type}</span>
                    <span className={`${styles.badge} ${styles['badge' + hazard.severity]}`}>{hazard.severity}</span>
                  </div>
                  <div className={styles.cardImagePlaceholder} />
                  <h3 className={styles.cardTitle}>{hazard.title}</h3>
                  <div className={styles.cardMeta}>
                    <MapPin size={12} /> {hazard.location}
                  </div>
                  <div className={styles.cardMeta}>
                    <Clock size={12} /> {hazard.time}
                  </div>
                  <div className={styles.cardFooter}>
                    <div className={styles.upvoteSection}>
                      <ThumbsUp size={14} /> {hazard.upvotes}
                    </div>
                    <a href="#" className={styles.detailsLink}>Details &gt;</a>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

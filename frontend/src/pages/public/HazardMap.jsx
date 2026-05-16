import { useState } from 'react';
import { Search, ChevronDown, Map, Grid, Filter, Flame, MapPin, Clock, X, AlertTriangle, MessageCircle } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import styles from './HazardMap.module.css';
import UpvoteButton from '../../components/hazard-report/UpvoteButton';
import CommentsSection from '../../components/hazard-report/CommentsSection';

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
  { id: 1, type: "Pothole", severity: "Low", title: "Widespread Pothole Area", location: "102 Main Road, Colombo", time: "15 days ago by User A", upvotes: 28, description: "Multiple potholes spanning a 200m stretch. Very dangerous for motorcycles and smaller vehicles, especially during rain." },
  { id: 2, type: "Flooding", severity: "High", title: "Central station fully submerged", location: "15 Station Rd, Kandy", time: "2 days ago by User B", upvotes: 112, description: "The central station underpass is completely flooded after yesterday's heavy rainfall. Water level is at knee height." },
  { id: 3, type: "Pothole", severity: "High", title: "Massive Pothole near junction", location: "28 Galle Road, Bentota", time: "18 days ago by User C", upvotes: 14, description: "A deep pothole has formed near the main junction. It's almost invisible at night and has caused several flat tires." },
  { id: 4, type: "Debris", severity: "Critical", title: "Hazardous debris on road", location: "44 Temple St, Anuradhapura", time: "12 days ago by User D", upvotes: 82, description: "Construction debris has been left on the road after building work. Includes nails, broken concrete, and metal rods." },
  { id: 5, type: "Pothole", severity: "Low", title: "Minor potholes near bridge", location: "Bridge Ave, Galle", time: "20 days ago by User E", upvotes: 34, description: "Several small potholes have appeared near the old bridge. Not dangerous yet but getting worse after each rain." },
  { id: 6, type: "Construction", severity: "Medium", title: "Unmarked construction zone", location: "40 Kandy Road, Kurunegala", time: "25 days ago by User F", upvotes: 71, description: "A construction zone on the main road has no proper signage or barriers. Especially dangerous at night." },
  { id: 7, type: "Flooding", severity: "High", title: "Multiple flooding points in center", location: "Center St, Jaffna", time: "22 days ago by User G", upvotes: 18, description: "Three separate flooding points have appeared in the town center after the drainage system failed." },
  { id: 8, type: "Debris", severity: "Critical", title: "Boulder blocking mountain road", location: "Mountain Pass, Nuwara Eliya", time: "15 days ago by User H", upvotes: 140, description: "A large boulder has rolled onto the mountain road after a landslide. Only one lane is passable." },
  { id: 9, type: "Streetlight", severity: "Low", title: "Broken streetlight series", location: "Park Lane, Negombo", time: "5 days ago by User I", upvotes: 42, description: "A series of 5 streetlights along Park Lane have all gone out, making the road very dark and unsafe at night." },
  { id: 10, type: "Animal", severity: "Medium", title: "Stray dog pack on highway", location: "Highway A1 exit, Kelaniya", time: "1 day ago by User J", upvotes: 56, description: "A large pack of stray dogs is congregating near the highway exit ramp, posing a danger to motorcyclists." },
  { id: 11, type: "Construction", severity: "High", title: "Open manhole left unattended", location: "700 South St, Matara", time: "6 days ago by User K", upvotes: 97, description: "An open manhole has been left without a cover or barriers after maintenance work. Extremely dangerous." },
  { id: 12, type: "Pothole", severity: "Critical", title: "Deep pothole near junction", location: "88 Junction, Badulla", time: "10 days ago by User L", upvotes: 130, description: "A very deep pothole has formed at a busy junction. Several vehicles have been damaged. Urgent repair needed." },
];


export default function HazardMap() {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedHazard, setSelectedHazard] = useState(null);

  const handleOpenPanel = (hazard) => {
    setSelectedHazard(hazard);
  };

  const handleClosePanel = () => {
    setSelectedHazard(null);
  };

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
            <button className={styles.heatmapToggle}>
              <Flame size={14} />
              Heatmap OFF
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
                  <Marker key={hazard.id} position={[hazard.lat, hazard.lng]}>
                    <Popup>{hazard.title}</Popup>
                  </Marker>
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
                    <UpvoteButton hazardId={hazard.id} initialUpvotes={hazard.upvotes} />
                    <button 
                      onClick={() => handleOpenPanel(hazard)} 
                      className={styles.detailsLink}
                    >
                      Details &gt;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>

      {/* ── Slide-Out Detail Panel ── */}
      {selectedHazard && (
        <>
          {/* Backdrop overlay */}
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
            onClick={handleClosePanel}
          />

          {/* Panel */}
          <div className="fixed top-0 right-0 h-full w-full max-w-xl bg-white shadow-2xl z-50 overflow-y-auto animate-slide-in-right flex flex-col">
            
            {/* Panel Header */}
            <div className="sticky top-0 bg-white z-10 px-8 pt-8 pb-4 border-b border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`${styles.badge} ${styles['badge' + selectedHazard.type]}`}>
                      {selectedHazard.type}
                    </span>
                    <span className={`${styles.badge} ${styles['badge' + selectedHazard.severity]}`}>
                      {selectedHazard.severity}
                    </span>
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">{selectedHazard.title}</h2>
                </div>
                <button 
                  onClick={handleClosePanel}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
            </div>

            {/* Panel Body */}
            <div className="flex-1 px-8 py-6 space-y-6">
              
              {/* Image Placeholder */}
              <div className="h-48 w-full bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
                <span className="text-sm font-semibold">Attached Image (Placeholder)</span>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-xl p-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Location</span>
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                    <MapPin size={14} className="text-blue-500" />
                    {selectedHazard.location}
                  </div>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Reported</span>
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                    <Clock size={14} className="text-blue-500" />
                    {selectedHazard.time}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Description</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {selectedHazard.description}
                </p>
              </div>

              {/* Upvote Section */}
              <div className="flex items-center gap-4 py-4 border-y border-gray-100">
                <UpvoteButton hazardId={selectedHazard.id} initialUpvotes={selectedHazard.upvotes} />
                <span className="text-sm text-slate-500">
                  Support this report to help prioritize it
                </span>
              </div>

              {/* Comments Section */}
              <CommentsSection hazardId={selectedHazard.id} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

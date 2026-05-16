import { useState, useMemo } from 'react';
import { Search, ChevronDown, Map, Grid, Filter, Flame, MapPin, Clock, ThumbsUp, X, AlertTriangle, MessageCircle } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
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

const initialHazards = [
  { id: 1, lat: 6.9271, lng: 79.8612, type: "Pothole", severity: "Critical", status: "Reported", title: "Massive Pothole on Galle Road", location: "102 Galle Road, Colombo", time: "2 hours ago by User A", upvotes: 130 },
  { id: 2, lat: 6.9340, lng: 79.8500, type: "Flooding", severity: "High", status: "In Progress", title: "Central station fully submerged", location: "Town Hall, Colombo", time: "5 hours ago by User B", upvotes: 98 },
  { id: 3, lat: 6.9157, lng: 79.8636, type: "Streetlight", severity: "Medium", status: "Reported", title: "Broken Streetlight Series", location: "Marine Drive, Colombo", time: "1 day ago by User C", upvotes: 45 },
  { id: 4, lat: 6.9390, lng: 79.8700, type: "Debris", severity: "High", status: "Reported", title: "Construction Debris on Road", location: "Bauddhaloka Mawatha, Colombo", time: "12 hours ago by User D", upvotes: 82 },
  { id: 5, lat: 6.9200, lng: 79.8750, type: "Construction", severity: "Critical", status: "In Progress", title: "Open Manhole Cover", location: "Duplication Road, Colombo", time: "3 hours ago by User E", upvotes: 140 },
  { id: 6, lat: 6.9450, lng: 79.8580, type: "Pothole", severity: "Low", status: "Reported", title: "Minor Road Cracks", location: "Independence Avenue, Colombo", time: "3 days ago by User F", upvotes: 22 },
  { id: 7, lat: 6.9100, lng: 79.8520, type: "Flooding", severity: "High", status: "Reported", title: "Waterlogged Junction", location: "Bambalapitiya Junction, Colombo", time: "8 hours ago by User G", upvotes: 67 },
  { id: 8, lat: 6.9500, lng: 79.8650, type: "Debris", severity: "Medium", status: "Resolved", title: "Fallen Tree Branch", location: "Horton Place, Colombo", time: "2 days ago by User H", upvotes: 34 },
  { id: 9, lat: 6.9050, lng: 79.8700, type: "Animal", severity: "Low", status: "Reported", title: "Stray Animal Warning", location: "Wellawatte, Colombo", time: "1 day ago by User I", upvotes: 18 },
  { id: 10, lat: 6.9320, lng: 79.8400, type: "Construction", severity: "High", status: "In Progress", title: "Unmarked Road Work Zone", location: "Baseline Road, Colombo", time: "6 hours ago by User J", upvotes: 71 },
  { id: 11, lat: 6.9550, lng: 79.8550, type: "Pothole", severity: "Critical", status: "Reported", title: "Deep Pothole near Bridge", location: "Orugodawatte, Colombo", time: "4 hours ago by User K", upvotes: 112 },
  { id: 12, lat: 6.9230, lng: 79.8450, type: "Construction", severity: "Medium", status: "Reported", title: "Damaged Road Barrier", location: "Havelock Road, Colombo", time: "1 day ago by User L", upvotes: 56, description: "A very deep pothole has formed at a busy junction. Several vehicles have been damaged. Urgent repair needed." },
];


export default function HazardMap() {
  const [viewMode, setViewMode] = useState('grid');
  const [isHeatmap, setIsHeatmap] = useState(false);
  const [selectedHazard, setSelectedHazard] = useState(null);

  const handleOpenPanel = (hazard) => {
    setSelectedHazard(hazard);
  };

  const handleClosePanel = () => {
    setSelectedHazard(null);
  };

  // Custom Dropdown Component
  const CustomDropdown = ({ options, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div 
        style={{ position: 'relative', outline: 'none' }} 
        tabIndex={0}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            setIsOpen(false);
          }
        }}
      >
        <div 
          className={styles.dropdown} 
          onClick={() => setIsOpen(!isOpen)}
          style={{ borderColor: isOpen ? '#2563eb' : '#e5e7eb', boxShadow: isOpen ? '0 0 0 3px rgba(37,99,235,0.1)' : 'none' }}
        >
          <span>{value}</span>
          <ChevronDown size={16} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
        </div>
        {isOpen && (
          <div style={{
            position: 'absolute', top: 'calc(100% + 6px)', left: 0, width: '100%', minWidth: 160, background: '#fff',
            border: '1px solid #e5e7eb', borderRadius: 12, boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
            zIndex: 100, maxHeight: 240, overflowY: 'auto', padding: '6px'
          }}>
            {options.map(opt => (
              <div 
                key={opt}
                style={{
                  padding: '10px 14px', fontSize: 13, fontWeight: value === opt ? 600 : 500, cursor: 'pointer',
                  background: value === opt ? '#f0f9ff' : 'transparent',
                  color: value === opt ? '#0369a1' : '#4b5563',
                  borderRadius: 8, transition: 'background 0.15s, color 0.15s',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                }}
                onClick={() => { onChange(opt); setIsOpen(false); }}
                onMouseEnter={(e) => { if (value !== opt) e.currentTarget.style.background = '#f9fafb'; }}
                onMouseLeave={(e) => { if (value !== opt) e.currentTarget.style.background = 'transparent'; }}
              >
                {opt}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All types');
  const [statusFilter, setStatusFilter] = useState('All statuses');
  const [severityFilter, setSeverityFilter] = useState('All severities');

  const filteredHazards = useMemo(() => {
    return initialHazards.filter(hazard => {
      const matchSearch = hazard.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          hazard.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          hazard.id.toString() === searchQuery;
      const matchType = typeFilter === 'All types' || hazard.type === typeFilter;
      const matchStatus = statusFilter === 'All statuses' || hazard.status === statusFilter;
      const matchSeverity = severityFilter === 'All severities' || hazard.severity === severityFilter;
      
      return matchSearch && matchType && matchStatus && matchSeverity;
    });
  }, [searchQuery, typeFilter, statusFilter, severityFilter]);

  const types = ['All types', ...new Set(initialHazards.map(h => h.type))];
  const statuses = ['All statuses', ...new Set(initialHazards.map(h => h.status))];
  const severities = ['All severities', 'Critical', 'High', 'Medium', 'Low'];

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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className={styles.dropdownsContainer}>
              <CustomDropdown options={types} value={typeFilter} onChange={setTypeFilter} />
              <CustomDropdown options={statuses} value={statusFilter} onChange={setStatusFilter} />
              <CustomDropdown options={severities} value={severityFilter} onChange={setSeverityFilter} />
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
              <strong>{filteredHazards.length}</strong> of {initialHazards.length} hazards
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
                center={[6.9271, 79.8612]} 
                zoom={13} 
                className={styles.map}
                zoomControl={false}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {filteredHazards.map(hazard => (
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
              {filteredHazards.map(hazard => (
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

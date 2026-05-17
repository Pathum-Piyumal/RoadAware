import { useState, useMemo } from 'react';
import { Search, ChevronDown, Map, Grid, Filter, Flame, MapPin, Clock, X } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import UpvoteButton from '../../components/hazard-report/UpvoteButton';
import CommentsSection from '../../components/hazard-report/CommentsSection';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Helper to resolve badge styles based on type or severity using Tailwind
const getBadgeStyles = (key) => {
  const mapping = {
    Pothole: "bg-sky-100 text-sky-700",
    Low: "bg-slate-100 text-slate-500",
    Flooding: "bg-blue-100 text-blue-800",
    High: "bg-yellow-100 text-yellow-700",
    Debris: "bg-green-100 text-green-700",
    Critical: "bg-red-100 text-red-600",
    Medium: "bg-orange-100 text-orange-600",
    Streetlight: "bg-purple-100 text-purple-700",
    Construction: "bg-orange-50 text-orange-700",
    Animal: "bg-pink-100 text-pink-700",
  };
  return `px-2 py-1 rounded text-[9px] font-extrabold uppercase tracking-wider ${mapping[key] || "bg-gray-100 text-gray-600"}`;
};

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
        className="relative outline-none"
        tabIndex={0}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            setIsOpen(false);
          }
        }}
      >
        <div 
          className={`flex items-center gap-2 py-2.5 px-4 bg-gray-50 border rounded-lg text-sm font-medium text-gray-700 cursor-pointer min-w-[140px] justify-between hover:bg-gray-100 transition-all ${
            isOpen ? 'border-blue-600 ring-4 ring-blue-600/10' : 'border-gray-200'
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{value}</span>
          <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
        {isOpen && (
          <div className="absolute top-[calc(100%+6px)] left-0 w-full min-w-[160px] bg-white border border-gray-200 rounded-xl shadow-xl z-[100] max-h-[240px] overflow-y-auto p-1.5">
            {options.map(opt => (
              <div 
                key={opt}
                className={`px-3.5 py-2 text-xs font-semibold cursor-pointer rounded-lg transition-colors flex items-center justify-between ${
                  value === opt ? 'bg-sky-50 text-sky-700' : 'text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => { onChange(opt); setIsOpen(false); }}
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
    <div className="font-sans bg-white min-h-screen flex flex-col">
      {/* Header Section */}
      <header className="bg-[#f4f6f9] pt-12 pb-16 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <span className="inline-block text-[11px] font-extrabold text-blue-600 tracking-widest uppercase mb-4">LIVE MAP</span>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">Hazards in your area</h1>
          <p className="text-[15px] text-gray-500 max-w-[600px]">
            Browse every reported hazard. Filter by type, status, or severity. Click any pin for details.
          </p>
        </div>
      </header>

      <main className="flex-1 pb-16">
        <div className="max-w-7xl mx-auto px-8 w-full">

          {/* Filters Bar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-md -mt-8 relative z-10">
            <div className="flex-1 flex items-center gap-3 py-2.5 px-4 bg-gray-50 border border-gray-200 rounded-lg">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search address, area, or ID..."
                className="border-none bg-transparent w-full text-sm text-gray-900 outline-none placeholder-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <CustomDropdown options={types} value={typeFilter} onChange={setTypeFilter} />
              <CustomDropdown options={statuses} value={statusFilter} onChange={setStatusFilter} />
              <CustomDropdown options={severities} value={severityFilter} onChange={setSeverityFilter} />
            </div>

            <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
              <button
                className={`flex items-center justify-center py-2 px-3 rounded-md cursor-pointer transition-all duration-200 ${
                  viewMode === 'map' ? 'bg-blue-900 text-white shadow-sm' : 'bg-transparent text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setViewMode('map')}
              >
                <Map size={16} />
              </button>
              <button
                className={`flex items-center justify-center py-2 px-3 rounded-md cursor-pointer transition-all duration-200 ${
                  viewMode === 'grid' ? 'bg-blue-900 text-white shadow-sm' : 'bg-transparent text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setViewMode('grid')}
              >
                <Grid size={16} />
              </button>
            </div>
          </div>

          {/* Map Info Bar */}
          <div className="flex justify-between items-center mt-6 mb-4 px-2">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Filter size={14} />
              <span><strong>{filteredHazards.length}</strong> of {initialHazards.length} hazards</span>
            </div>
            <button
              className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-md cursor-pointer transition-colors ${
                isHeatmap ? 'bg-red-100 text-red-500' : 'text-gray-500 hover:bg-gray-50'
              }`}
              onClick={() => setIsHeatmap(!isHeatmap)}
            >
              <Flame size={14} className={isHeatmap ? 'text-red-500' : 'text-gray-500'} />
              <span>Heatmap {isHeatmap ? 'ON' : 'OFF'}</span>
            </button>
          </div>

          {/* Content Area (Map or Grid) */}
          {viewMode === 'map' ? (
            <div className="h-[600px] rounded-2xl overflow-hidden border border-gray-200 shadow-lg">
              <MapContainer 
                center={[6.9271, 79.8612]} 
                zoom={13} 
                className="w-full h-full"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredHazards.map(hazard => (
                <div key={hazard.id} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex flex-col hover:shadow-md transition-all">
                  <div className="flex gap-2 mb-3">
                    <span className={getBadgeStyles(hazard.type)}>{hazard.type}</span>
                    <span className={getBadgeStyles(hazard.severity)}>{hazard.severity}</span>
                  </div>
                  <div className="h-[120px] rounded-lg bg-slate-50 mb-4" />
                  <h3 className="text-sm font-bold text-gray-900 mb-2 leading-snug">{hazard.title}</h3>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-1.5">
                    <MapPin size={12} /> {hazard.location}
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-1.5">
                    <Clock size={12} /> {hazard.time}
                  </div>
                  <div className="mt-auto pt-4 border-t border-slate-50 flex justify-between items-center">
                    <UpvoteButton hazardId={hazard.id} initialUpvotes={hazard.upvotes} />
                    <button
                      onClick={() => handleOpenPanel(hazard)}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-0.5 cursor-pointer bg-transparent border-none"
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
                    <span className={getBadgeStyles(selectedHazard.type)}>
                      {selectedHazard.type}
                    </span>
                    <span className={getBadgeStyles(selectedHazard.severity)}>
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


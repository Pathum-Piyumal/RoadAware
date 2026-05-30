import { useState, useMemo, useEffect, useRef } from 'react';
import { Search, ChevronDown, Map, Grid, Filter, Flame, MapPin, Clock, X, Loader2 } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import UpvoteButton from '../../components/hazard-report/UpvoteButton';
import CommentsSection from '../../components/hazard-report/CommentsSection';
import HazardService from '../../services/hazard.service';

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

// Viewport Scroll Reveal Component with Delay Staggering & Gentle 16px Offset
const ScrollReveal = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.02 });
    
    if (domRef.current) {
      observer.observe(domRef.current);
    }
    
    return () => {
      if (domRef.current) {
        observer.unobserve(domRef.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={domRef}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'opacity, transform'
      }}
    >
      {children}
    </div>
  );
};

export default function HazardMap() {
  const [hazards, setHazards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [isHeatmap, setIsHeatmap] = useState(false);
  const [selectedHazard, setSelectedHazard] = useState(null);

  // Fetch real hazard data from backend
  useEffect(() => {
    HazardService.getMapMarkers()
      .then(data => setHazards(data.markers || []))
      .catch(err => console.error('Failed to load hazards:', err))
      .finally(() => setLoading(false));
  }, []);

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
          <div className="absolute top-[calc(100%+6px)] left-0 w-full min-w-[160px] bg-white border border-gray-200 rounded-xl shadow-xl z-[100] max-h-[240px] overflow-y-auto p-1.5 animate-fade-in-up">
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
    return hazards.filter(hazard => {
      const matchSearch = hazard.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          hazard.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          hazard.id.toString() === searchQuery;
      const matchType = typeFilter === 'All types' || hazard.type === typeFilter;
      const matchStatus = statusFilter === 'All statuses' || hazard.status === statusFilter;
      const matchSeverity = severityFilter === 'All severities' || hazard.severity === severityFilter;
      return matchSearch && matchType && matchStatus && matchSeverity;
    });
  }, [hazards, searchQuery, typeFilter, statusFilter, severityFilter]);

  const types = ['All types', ...new Set(hazards.map(h => h.type))];
  const statuses = ['All statuses', ...new Set(hazards.map(h => h.status))];
  const severities = ['All severities', 'Critical', 'High', 'Medium', 'Low'];

  return (
    <div className="font-sans bg-white min-h-screen flex flex-col selection:bg-orange-100 selection:text-orange-950">
      {/* Header Section */}
      <header className="bg-gray-50 pt-16 pb-20 border-b border-gray-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[80px] -mr-48 -mt-48" />
        <div className="max-w-7xl mx-auto px-8 w-full relative z-10 animate-fade-in-up">
          <span className="inline-block text-[11px] font-extrabold text-blue-600 tracking-widest uppercase mb-4">LIVE MAP</span>
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">Hazards in your area.</h1>
          <p className="text-[16px] text-gray-500 max-w-[620px] leading-relaxed">
            Browse every active and reported hazard. Filter by category, action status, or threat level. Click any pin for detailed logs.
          </p>
        </div>
      </header>

      <main className="flex-1 pb-24">
        <div className="max-w-7xl mx-auto px-8 w-full">

          {/* Filters Bar */}
          <ScrollReveal delay={100} className="relative z-[1001]">
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xl shadow-slate-200/50 -mt-10 relative z-[1001] transition-shadow hover:shadow-2xl">
              <div className="flex-1 flex items-center gap-3 py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl focus-within:ring-2 focus-within:ring-blue-600/10 focus-within:border-blue-600 transition-all">
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

              <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200">
                <button
                  className={`flex items-center justify-center py-2.5 px-4 rounded-lg cursor-pointer transition-all duration-300 ${
                    viewMode === 'map' ? 'bg-slate-900 text-white shadow-md' : 'bg-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setViewMode('map')}
                >
                  <Map size={16} className="mr-2" /> Map
                </button>
                <button
                  className={`flex items-center justify-center py-2.5 px-4 rounded-lg cursor-pointer transition-all duration-300 ${
                    viewMode === 'grid' ? 'bg-slate-900 text-white shadow-md' : 'bg-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid size={16} className="mr-2" /> Grid
                </button>
              </div>
            </div>
          </ScrollReveal>

          {/* Map Info Bar */}
          <ScrollReveal delay={150}>
            <div className="flex justify-between items-center mt-8 mb-6 px-2">
              <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                <Filter size={15} />
                <span>Showing <strong>{filteredHazards.length}</strong> of {initialHazards.length} hazards</span>
              </div>
              <button
                className={`flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl cursor-pointer transition-all duration-300 ${
                  isHeatmap ? 'bg-red-50 text-red-500 border border-red-100' : 'text-gray-500 hover:bg-gray-100'
                }`}
                onClick={() => setIsHeatmap(!isHeatmap)}
              >
                <Flame size={14} className={isHeatmap ? 'text-red-500 animate-pulse' : 'text-gray-500'} />
                <span>Heatmap {isHeatmap ? 'ON' : 'OFF'}</span>
              </button>
            </div>
          </ScrollReveal>

          {/* Content Area (Map or Grid) */}
          {viewMode === 'map' ? (
            <ScrollReveal>
              <div className="h-[600px] rounded-3xl overflow-hidden border border-gray-200 shadow-2xl transition-all duration-500">
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
            </ScrollReveal>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredHazards.map((hazard, idx) => (
                <ScrollReveal key={hazard.id} delay={idx * 60}>
                  <div className="bg-white rounded-3xl border border-gray-100 p-5 shadow-lg shadow-slate-100/50 flex flex-col hover:shadow-2xl hover:border-slate-200 hover:-translate-y-1.5 transition-all duration-300 h-full group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-full opacity-60 pointer-events-none" />
                    <div className="flex gap-2 mb-4 relative z-10">
                      <span className={getBadgeStyles(hazard.type)}>{hazard.type}</span>
                      <span className={getBadgeStyles(hazard.severity)}>{hazard.severity}</span>
                    </div>
                    
                    {/* Atmospheric background graphic */}
                    <div className="h-28 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/80 mb-5 border border-slate-100 flex items-center justify-center">
                      <MapPin size={24} className="text-slate-400/80 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500" />
                    </div>

                    <h3 className="text-base font-bold text-gray-900 mb-3 leading-snug group-hover:text-blue-600 transition-colors">{hazard.title}</h3>
                    
                    <div className="space-y-2 mt-auto">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <MapPin size={13} className="text-blue-500 flex-shrink-0" /> <span className="truncate">{hazard.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                        <Clock size={13} className="text-blue-500 flex-shrink-0" /> {hazard.time}
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-50 flex justify-between items-center relative z-10">
                      <UpvoteButton hazardId={hazard.id} initialUpvotes={hazard.upvotes} />
                      <button
                        onClick={() => handleOpenPanel(hazard)}
                        className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-0.5 cursor-pointer bg-transparent border-none"
                      >
                        Details &gt;
                      </button>
                    </div>
                  </div>
                </ScrollReveal>
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
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998] transition-opacity duration-300 animate-fade-in"
            onClick={handleClosePanel}
          />

          {/* Panel */}
          <div className="fixed top-0 right-0 h-full w-full max-w-xl bg-white shadow-2xl z-[9999] overflow-y-auto animate-slide-in-right flex flex-col border-l border-slate-100">

            {/* Panel Header */}
            <div className="sticky top-0 bg-white z-10 px-8 pt-8 pb-5 border-b border-slate-100">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className={getBadgeStyles(selectedHazard.type)}>
                      {selectedHazard.type}
                    </span>
                    <span className={getBadgeStyles(selectedHazard.severity)}>
                      {selectedHazard.severity}
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">{selectedHazard.title}</h2>
                </div>
                <button
                  onClick={handleClosePanel}
                  className="p-2.5 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
            </div>

            {/* Panel Body */}
            <div className="flex-grow px-8 py-8 space-y-8">

              {/* Cover Photo */}
              <div className="h-56 w-full bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl flex flex-col items-center justify-center text-slate-400 border border-slate-100">
                <MapPin size={36} className="text-slate-300 mb-2" />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Live Coordinate View</span>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100/50">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">Location</span>
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                    <MapPin size={14} className="text-blue-500 shrink-0" />
                    <span className="truncate">{selectedHazard.location}</span>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100/50">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">Reported</span>
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                    <Clock size={14} className="text-blue-500 shrink-0" />
                    {selectedHazard.time}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="text-base font-black text-slate-900 uppercase tracking-wide">Description</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {selectedHazard.description || "No detailed description was provided by the reporter. Please exercise extreme caution when approaching this zone."}
                </p>
              </div>

              {/* Upvote Section */}
              <div className="flex items-center gap-4 py-6 border-y border-gray-100">
                <UpvoteButton hazardId={selectedHazard.id} initialUpvotes={selectedHazard.upvotes} />
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Support this report to help prioritize repairs
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

import React, { useState, useMemo, useEffect, useRef, Component } from 'react';
import { Search, ChevronDown, Map, Grid, Filter, Flame, MapPin, Clock, X, Loader2, AlertTriangle, Droplets, Lightbulb, AlertCircle, PawPrint, Construction, HelpCircle } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import UpvoteButton from '../../components/hazard-report/UpvoteButton';
import CommentsSection from '../../components/hazard-report/CommentsSection';
import HazardService from '../../services/hazard.service';
import AuthService from '../../services/auth.service';

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
        transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(24px)',
        filter: isVisible ? 'blur(0px)' : 'blur(4px)',
        transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'opacity, transform, filter'
      }}
    >
      {children}
    </div>
  );
};

// Helper for Category Cover Gradients & Icons
// Helper to render high-fidelity animated CSS vector illustrations for each category
const renderAnimatedIllustration = (type) => {
  const normalized = (type || '').toLowerCase().trim();

  // 1. Pothole / Road Crack
  if (normalized.includes('pothole') || normalized.includes('crack') || normalized.includes('hole') || normalized.includes('tarmac')) {
    return (
      <div className="w-full h-full relative flex flex-col items-center justify-center bg-gradient-to-br from-amber-500/10 to-orange-600/20 border border-orange-500/20 overflow-hidden">
        {/* Road strip */}
        <div className="absolute bottom-6 w-full h-4 bg-slate-800 flex items-center justify-around overflow-hidden opacity-90">
          <div className="w-4 h-0.5 bg-white opacity-60" />
          <div className="w-4 h-0.5 bg-white opacity-60" />
          <div className="w-4 h-0.5 bg-white opacity-60" />
        </div>
        {/* Pothole ring */}
        <div className="absolute bottom-6 w-6 h-3 bg-slate-950 rounded-full border border-orange-500/30 flex items-center justify-center">
          <div className="absolute w-12 h-6 border-2 border-orange-500/40 rounded-full animate-pulse-ring" />
        </div>
        {/* Bouncing Warning Sign */}
        <AlertTriangle size={32} className="text-orange-500 animate-bounce mb-3 relative z-10 filter drop-shadow-[0_2px_8px_rgba(249,115,22,0.3)]" />
      </div>
    );
  }

  // 2. Flooding / Water Accumulation
  if (normalized.includes('flood') || normalized.includes('water') || normalized.includes('rain') || normalized.includes('puddle') || normalized.includes('overflow')) {
    return (
      <div className="w-full h-full relative flex flex-col items-center justify-center bg-gradient-to-br from-blue-500/10 to-cyan-600/20 border border-blue-500/20 overflow-hidden">
        {/* Falling Raindrops */}
        <div className="absolute inset-0 flex justify-around opacity-60 pointer-events-none">
          <Droplets size={12} className="text-blue-400 animate-raindrop" style={{ animationDelay: '0.2s' }} />
          <Droplets size={10} className="text-blue-300 animate-raindrop" style={{ animationDelay: '0.8s' }} />
          <Droplets size={14} className="text-blue-400 animate-raindrop" style={{ animationDelay: '1.4s' }} />
        </div>
        {/* Animated swell wave */}
        <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-blue-500/40 to-cyan-400/20 rounded-t-xl animate-wave-swell" />
        {/* Main Icon */}
        <Droplets size={32} className="text-blue-500 mb-2 relative z-10 animate-pulse" />
      </div>
    );
  }

  // 3. Streetlight / Broken Light
  if (normalized.includes('light') || normalized.includes('bulb') || normalized.includes('lamp') || normalized.includes('darkness') || normalized.includes('streetlight')) {
    return (
      <div className="w-full h-full relative flex flex-col items-center justify-center bg-gradient-to-br from-purple-900/10 to-indigo-950/20 border border-purple-500/20 overflow-hidden">
        {/* Glowing aura */}
        <div className="absolute w-20 h-20 bg-yellow-500/10 rounded-full blur-xl animate-pulse" />
        {/* Lamp Post Head */}
        <div className="w-12 h-1 bg-slate-700 rounded-full mb-1 opacity-70" />
        {/* Flickering light bulb */}
        <div className="animate-flicker">
          <Lightbulb size={32} className="text-yellow-500 filter drop-shadow-[0_0_12px_rgba(234,179,8,0.7)]" />
        </div>
      </div>
    );
  }

  // 4. Debris / Road Blockage
  if (normalized.includes('debris') || normalized.includes('tree') || normalized.includes('branch') || normalized.includes('block') || normalized.includes('rock') || normalized.includes('stone') || normalized.includes('garbage') || normalized.includes('trash')) {
    return (
      <div className="w-full h-full relative flex flex-col items-center justify-center bg-gradient-to-br from-slate-500/10 to-zinc-600/20 border border-slate-500/20 overflow-hidden">
        {/* Spinning scanning ring */}
        <div className="absolute w-16 h-16 border border-dashed border-slate-400/40 rounded-full animate-spin" style={{ animationDuration: '8s' }} />
        {/* Blockage graphic */}
        <AlertCircle size={32} className="text-slate-500 mb-2 relative z-10 animate-pulse" />
      </div>
    );
  }

  // 5. Construction / Roadworks
  if (normalized.includes('construction') || normalized.includes('work') || normalized.includes('barrier') || normalized.includes('cone') || normalized.includes('excavation')) {
    return (
      <div className="w-full h-full relative flex flex-col items-center justify-center bg-gradient-to-br from-orange-500/10 to-yellow-600/20 border border-orange-500/20 overflow-hidden">
        {/* Safety hazard stripes bg */}
        <div 
          className="absolute inset-x-0 bottom-0 h-4 bg-yellow-500/20 animate-stripe-slide" 
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)',
            backgroundSize: '40px 40px'
          }}
        />
        {/* Construction cone */}
        <Construction size={32} className="text-orange-500 mb-4 relative z-10 filter drop-shadow-[0_2px_8px_rgba(249,115,22,0.2)]" />
      </div>
    );
  }

  // 6. Animal Hazard
  if (normalized.includes('animal') || normalized.includes('dog') || normalized.includes('cat') || normalized.includes('cow') || normalized.includes('stray') || normalized.includes('pet')) {
    return (
      <div className="w-full h-full relative flex flex-col items-center justify-center bg-gradient-to-br from-pink-500/10 to-rose-600/20 border border-pink-500/20 overflow-hidden">
        {/* Stepping paw tracks */}
        <div className="absolute inset-0 flex items-center justify-around opacity-30">
          <PawPrint size={12} className="animate-pulse" style={{ animationDelay: '0.1s' }} />
          <PawPrint size={10} className="animate-pulse" style={{ animationDelay: '0.5s' }} />
          <PawPrint size={14} className="animate-pulse" style={{ animationDelay: '0.9s' }} />
        </div>
        {/* Main Paw */}
        <PawPrint size={32} className="text-pink-500 mb-2 relative z-10 animate-bounce" style={{ animationDuration: '2.5s' }} />
      </div>
    );
  }

  // 7. General / Other Hazards
  return (
    <div className="w-full h-full relative flex flex-col items-center justify-center bg-gradient-to-br from-gray-500/10 to-slate-600/20 border border-gray-500/20 overflow-hidden">
      {/* Radar scanning line */}
      <div className="absolute top-0 w-full h-[1px] bg-sky-500/40 animate-[bounce_4s_infinite]" />
      <HelpCircle size={32} className="text-gray-500 mb-2 relative z-10 animate-pulse" />
    </div>
  );
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

const types = ['All types', 'Pothole', 'Debris', 'Flooding', 'Broken Light', 'Damaged Signage', 'Construction', 'Other'];
const statuses = ['All statuses', 'Reported', 'In Progress', 'Resolved'];
const severities = ['All severities', 'Critical', 'High', 'Medium', 'Low'];

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error in HazardMap:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '24px', background: '#fef2f2', border: '1px solid #fee2e2', borderRadius: '12px', margin: '24px', fontFamily: 'sans-serif' }}>
          <h2 style={{ color: '#991b1b', fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>Hazard Map Render Error:</h2>
          <p style={{ color: '#7f1d1d', fontSize: '14px', marginBottom: '16px' }}>{this.state.error?.toString()}</p>
          <pre style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '12px', color: '#334155', whiteSpace: 'pre-wrap' }}>
            {this.state.error?.stack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export function HazardMapContent() {
  const [hazards, setHazards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [isHeatmap, setIsHeatmap] = useState(false);
  const [selectedHazard, setSelectedHazard] = useState(null);

  const currentUser = AuthService.getCurrentUser();

  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All types');
  const [statusFilter, setStatusFilter] = useState('All statuses');
  const [severityFilter, setSeverityFilter] = useState('All severities');

  const filteredHazards = useMemo(() => {
    return hazards.filter(hazard => {
      if (!hazard) return false;
      const lat = parseFloat(hazard.lat);
      const lng = parseFloat(hazard.lng);
      if (isNaN(lat) || isNaN(lng)) return false; // Filter out invalid coordinates

      const title = hazard.title || '';
      const location = hazard.location || '';
      const id = hazard.id ? hazard.id.toString() : '';
      const type = hazard.type || '';
      const status = hazard.status || '';
      const severity = hazard.severity || '';

      const matchSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          id === searchQuery;
      const matchType = typeFilter === 'All types' || type === typeFilter;
      const matchStatus = statusFilter === 'All statuses' || status === statusFilter;
      const matchSeverity = severityFilter === 'All severities' || severity === severityFilter;
      return matchSearch && matchType && matchStatus && matchSeverity;
    });
  }, [hazards, searchQuery, typeFilter, statusFilter, severityFilter]);

  // Fetch real hazard data from backend
  useEffect(() => {
    HazardService.getMapMarkers()
      .then(data => setHazards(data.markers || []))
      .catch(err => console.error('Failed to load hazards:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const handleOpenPanel = async (hazard) => {
    // Show basic marker properties first with details loading flag
    setSelectedHazard({
      ...hazard,
      loadingDetails: true,
      description: '',
      imageUrl: null,
      hasUpvoted: false
    });

    try {
      const data = await HazardService.getHazardById(hazard.id);
      if (data && data.report) {
        setSelectedHazard({
          id: data.report.id,
          title: data.report.title,
          description: data.report.description,
          lat: parseFloat(data.report.latitude),
          lng: parseFloat(data.report.longitude),
          location: data.report.locationName,
          type: data.report.category?.name || 'Other',
          status: data.report.status === 'in_progress' ? 'In Progress' : data.report.status === 'resolved' ? 'Resolved' : 'Reported',
          severity: data.report.severity.charAt(0).toUpperCase() + data.report.severity.slice(1),
          upvotes: data.report.upvotes?.length || 0,
          time: new Date(data.report.createdAt).toLocaleDateString(),
          imageUrl: data.report.images?.[0]?.imageUrl || null,
          reporter: data.report.reporter,
          hasUpvoted: currentUser ? data.report.upvotes?.some(up => up.userId === currentUser.id) : false,
          loadingDetails: false
        });
      }
    } catch (err) {
      console.error('Failed to load full hazard details:', err);
      setSelectedHazard({
        ...hazard,
        loadingDetails: false
      });
    }
  };

  const handleClosePanel = () => {
    setSelectedHazard(null);
  };

  const handleUpvoteToggleInList = (id, upvoted) => {
    setHazards(prev => prev.map(h => {
      if (h.id === id) {
        return {
          ...h,
          upvotes: upvoted ? h.upvotes + 1 : Math.max(0, h.upvotes - 1),
          hasUpvoted: upvoted
        };
      }
      return h;
    }));

    if (selectedHazard && selectedHazard.id === id) {
      setSelectedHazard(prev => ({
        ...prev,
        upvotes: upvoted ? prev.upvotes + 1 : Math.max(0, prev.upvotes - 1),
        hasUpvoted: upvoted
      }));
    }
  };



  return (
    <div className="font-sans bg-white min-h-screen flex flex-col selection:bg-orange-100 selection:text-orange-950">
      <style>{`
        @keyframes wave-swell {
          0%, 100% { transform: translateY(0) scaleY(1); }
          50% { transform: translateY(-4px) scaleY(1.06); }
        }
        @keyframes raindrop-fall {
          0% { transform: translateY(-12px); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: translateY(16px); opacity: 0; }
        }
        @keyframes light-flicker {
          0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% { opacity: 0.99; filter: drop-shadow(0 0 8px rgba(234,179,8,0.6)); }
          20%, 21.999%, 63%, 63.999%, 65%, 69.999% { opacity: 0.25; filter: none; }
        }
        @keyframes stripe-slide {
          0% { background-position: 0 0; }
          100% { background-position: 40px 0; }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.65); opacity: 0.8; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        .animate-wave-swell {
          animation: wave-swell 3.5s ease-in-out infinite;
        }
        .animate-raindrop {
          animation: raindrop-fall 1.8s linear infinite;
        }
        .animate-flicker {
          animation: light-flicker 4s linear infinite;
        }
        .animate-stripe-slide {
          animation: stripe-slide 2s linear infinite;
        }
        .animate-pulse-ring {
          animation: pulse-ring 2s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }
      `}</style>
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
                <span>Showing <strong>{filteredHazards.length}</strong> of {hazards.length} hazards</span>
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
                        <Popup>
                          <div className="p-1 font-sans min-w-[150px]">
                            <strong className="text-slate-900 block mb-1 text-sm">{hazard.title}</strong>
                            <p className="text-xs text-slate-500 m-0 mb-2">{hazard.location}</p>
                            <button
                              onClick={() => handleOpenPanel(hazard)}
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-3 rounded-lg text-xs font-bold border-none cursor-pointer text-center block transition-colors"
                            >
                              View Details
                            </button>
                          </div>
                        </Popup>
                      </Marker>
                    )
                  ))}
                </MapContainer>
              </div>
            </ScrollReveal>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredHazards.map((hazard, idx) => (
                <ScrollReveal key={hazard.id} delay={(idx % 4) * 80}>
                  <div className="bg-white dark:bg-slate-900/60 rounded-3xl border border-gray-100 dark:border-slate-800/80 p-5 shadow-lg shadow-slate-100/50 dark:shadow-none flex flex-col hover:shadow-2xl hover:border-blue-200/60 dark:hover:border-blue-900/40 hover:-translate-y-1.5 transition-all duration-500 ease-out h-full group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-500/5 to-transparent rounded-bl-full opacity-60 pointer-events-none group-hover:scale-125 transition-transform duration-700 ease-out" />
                    <div className="flex gap-2 mb-4 relative z-10">
                      <span className={getBadgeStyles(hazard.type)}>{hazard.type}</span>
                      <span className={getBadgeStyles(hazard.severity)}>{hazard.severity}</span>
                    </div>
                    
                    {/* Dynamic cover photo or category-specific animated graphic */}
                    <div className="h-32 rounded-2xl mb-5 overflow-hidden relative flex items-center justify-center bg-gradient-to-br transition-all duration-300">
                      {hazard.imageUrl ? (
                        <img 
                          src={hazard.imageUrl} 
                          alt={hazard.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                        />
                      ) : (
                        renderAnimatedIllustration(hazard.type)
                      )}
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
                      <UpvoteButton hazardId={hazard.id} initialUpvotes={hazard.upvotes} initialHasUpvoted={hazard.hasUpvoted} onUpvoteToggle={handleUpvoteToggleInList} />
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
              {selectedHazard.loadingDetails ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                  <Loader2 size={36} className="animate-spin text-blue-500 mb-3" />
                  <span className="text-sm font-semibold">Loading details from coordinates...</span>
                </div>
              ) : (
                <>
                  {/* Cover Photo */}
                  {selectedHazard.imageUrl ? (
                    <div className="h-64 w-full rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                      <img src={selectedHazard.imageUrl} alt={selectedHazard.title} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="h-56 w-full bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl flex flex-col items-center justify-center text-slate-400 border border-slate-100">
                      <MapPin size={36} className="text-slate-300 mb-2" />
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Live Coordinate View</span>
                    </div>
                  )}

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

                  {/* Reporter details */}
                  {selectedHazard.reporter && (
                    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100/50 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                        {selectedHazard.reporter.avatar ? (
                          <img src={selectedHazard.reporter.avatar} alt={selectedHazard.reporter.name || 'Reporter'} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center font-bold text-slate-500 text-sm bg-blue-100 text-blue-700 uppercase">
                            {selectedHazard.reporter.name ? selectedHazard.reporter.name.split(' ').map(n => n[0]).join('').slice(0, 2) : 'U'}
                          </div>
                        )}
                      </div>
                      <div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-0.5">Reporter</span>
                        <span className="text-sm font-bold text-slate-800">{selectedHazard.reporter.name || 'Anonymous User'}</span>
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  <div className="space-y-2">
                    <h3 className="text-base font-black text-slate-900 uppercase tracking-wide">Description</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {selectedHazard.description || "No detailed description was provided by the reporter. Please exercise extreme caution when approaching this zone."}
                    </p>
                  </div>

                  {/* Upvote Section */}
                  <div className="flex items-center gap-4 py-6 border-y border-gray-100">
                    <UpvoteButton hazardId={selectedHazard.id} initialUpvotes={selectedHazard.upvotes} initialHasUpvoted={selectedHazard.hasUpvoted} onUpvoteToggle={handleUpvoteToggleInList} />
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Support this report to help prioritize repairs
                    </span>
                  </div>

                  {/* Comments Section */}
                  <CommentsSection hazardId={selectedHazard.id} />
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function HazardMap() {
  return (
    <ErrorBoundary>
      <HazardMapContent />
    </ErrorBoundary>
  );
}

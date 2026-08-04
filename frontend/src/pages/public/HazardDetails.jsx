import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
  ArrowLeft, MapPin, AlertTriangle, Calendar, CheckCircle2, 
  Clock, Eye, Truck, Image as ImageIcon, ShieldCheck
} from 'lucide-react';
import HazardService from '../../services/hazard.service';


export default function HazardDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [previewLightboxImage, setPreviewLightboxImage] = useState(null);

  useEffect(() => {
    HazardService.getHazardById(id)
      .then(data => setReport(data.report))
      .catch(err => console.error('Failed to load report:', err))
      .finally(() => setLoading(false));
  }, [id]);

  const buildTimeline = (status) => {
    const steps = [
      { id: 1, title: 'Report Submitted',  desc: 'Your report has been received by the system.', icon: CheckCircle2, color: 'bg-green-500', statuses: ['reported','in_progress','resolved','rejected'] },
      { id: 2, title: 'Under Review',      desc: 'Authorities are assessing the severity.', icon: Eye, color: 'bg-blue-500', statuses: ['in_progress','resolved'] },
      { id: 3, title: 'Crew Dispatched',   desc: 'Maintenance crew is heading to the location.', icon: Truck, color: 'bg-yellow-500', statuses: ['in_progress','resolved'] },
      { id: 4, title: 'Resolved',           desc: 'The hazard has been repaired. Road is safe.', icon: ShieldCheck, color: 'bg-emerald-500', statuses: ['resolved'] },
    ];
    return steps.map(s => ({ ...s, completed: s.statuses.includes(status) }));
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'resolved':    return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'in_progress': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'rejected':    return 'bg-red-500/10 text-red-600 border-red-500/20';
      default:            return 'bg-orange-500/10 text-orange-600 border-orange-500/20';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'resolved':    return 'Resolved';
      case 'in_progress': return 'In Progress';
      case 'rejected':    return 'Rejected';
      default:            return 'Reported';
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!report) return (
    <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
      <p className="text-slate-500 font-medium">Report not found.</p>
    </div>
  );

  const getCategoryFallbackImage = (categoryName) => {
    const name = (categoryName || '').toLowerCase().trim();
    if (name.includes('pothole') || name.includes('crack') || name.includes('hole')) {
      return 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=600&auto=format&fit=crop';
    }
    if (name.includes('flood') || name.includes('water') || name.includes('rain')) {
      return 'https://images.unsplash.com/photo-1547683905-f686c993aae5?q=80&w=600&auto=format&fit=crop';
    }
    if (name.includes('light') || name.includes('bulb') || name.includes('lamp') || name.includes('darkness') || name.includes('streetlight')) {
      return 'https://images.unsplash.com/photo-1509803874385-db7c23652552?q=80&w=600&auto=format&fit=crop';
    }
    if (name.includes('debris') || name.includes('tree') || name.includes('branch') || name.includes('block') || name.includes('road blockage')) {
      return 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop';
    }
    if (name.includes('construction') || name.includes('work') || name.includes('barrier') || name.includes('cone')) {
      return 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=600&auto=format&fit=crop';
    }
    if (name.includes('sign') || name.includes('signage') || name.includes('post') || name.includes('board') || name.includes('marker')) {
      return 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=600&auto=format&fit=crop';
    }
    return 'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?q=80&w=600&auto=format&fit=crop';
  };

  const timeline = buildTimeline(report.status);
  const reportImages = report.images && report.images.length > 0
    ? report.images.map(img => typeof img === 'string' ? img : img.imageUrl)
    : [getCategoryFallbackImage(report.category?.name)];
  
  const currentMainImage = reportImages[selectedImageIndex] || reportImages[0];
  const submittedDate = new Date(report.createdAt);

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col w-full pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 pt-10 pb-6 px-6 md:px-12 sticky top-16 z-20 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors cursor-pointer"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-sm font-bold text-gray-500 tracking-wider uppercase">
                  HZ-{report.id}
                </span>
                <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border ${getStatusStyle(report.status)}`}>
                  {getStatusLabel(report.status)}
                </span>
              </div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">{report.title}</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-6xl mx-auto w-full mt-8 px-6 md:px-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Details & Images */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Interactive Image Card */}
          <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm relative group">
            <div 
              className="h-80 sm:h-96 w-full bg-slate-900 flex flex-col items-center justify-center text-slate-400 overflow-hidden relative cursor-pointer"
              onClick={() => setPreviewLightboxImage(currentMainImage)}
            >
              <img 
                src={currentMainImage} 
                alt={report.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-2">
                <Eye size={20} /> Click to Enlarge
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent pointer-events-none" />
            
            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-white pointer-events-none">
              <div className="flex items-center gap-2 font-semibold text-sm drop-shadow-md">
                <MapPin size={16} className="text-orange-400" />
                {report.locationName}
              </div>
              <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-white/20">
                {report.severity} Severity
              </span>
            </div>
          </div>

          {/* Thumbnail Selection Strip */}
          {reportImages.length > 1 && (
            <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <ImageIcon size={14} className="text-orange-500" /> Evidence Photos ({reportImages.length})
                </span>
                <span className="text-[11px] font-semibold text-slate-400">Click photo to view</span>
              </div>
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {reportImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      selectedImageIndex === idx ? 'border-orange-500 scale-105 shadow-md shadow-orange-500/20' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    <span className="absolute bottom-0.5 right-0.5 bg-black/70 text-white text-[9px] font-bold px-1 rounded">
                      #{idx + 1}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Description Card */}
          <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Description</h2>
            <p className="text-slate-600 leading-relaxed">
              {report.description || 'No detailed description provided for this hazard report.'}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8 pt-6 border-t border-gray-100">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Type</span>
                <div className="flex items-center gap-2 font-semibold text-slate-800 text-sm">
                  <AlertTriangle size={16} className="text-blue-500" />
                  {report.category?.name || 'Other'}
                </div>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Date Submitted</span>
                <div className="flex items-center gap-2 font-semibold text-slate-800 text-sm">
                  <Calendar size={16} className="text-blue-500" />
                  {submittedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Time</span>
                <div className="flex items-center gap-2 font-semibold text-slate-800 text-sm">
                  <Clock size={16} className="text-blue-500" />
                  {submittedDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          </div>

          {/* Full Uploaded Evidence Gallery Grid */}
          <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <ImageIcon size={20} className="text-blue-500" /> All Evidence Photos
              </span>
              <span className="text-xs font-semibold text-slate-400">
                {report.images ? report.images.length : 1} photo(s) attached
              </span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {reportImages.map((imgUrl, idx) => (
                <div 
                  key={idx}
                  onClick={() => setPreviewLightboxImage(imgUrl)}
                  className="group relative aspect-square rounded-2xl overflow-hidden border border-slate-100 bg-slate-900 cursor-pointer shadow-sm hover:shadow-lg transition-all"
                >
                  <img 
                    src={imgUrl} 
                    alt={`Hazard evidence ${idx + 1}`} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1">
                    <Eye size={16} /> View
                  </div>
                  <span className="absolute top-2 left-2 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm border border-white/20">
                    Photo #{idx + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Tracking Timeline */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm sticky top-40">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Tracking Status</h2>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-[19px] top-4 bottom-8 w-[2px] bg-gray-100" />
              
              <div className="space-y-8 relative">
                {timeline.map((event) => (
                  <div key={event.id} className="flex gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10 shrink-0 ${event.completed ? event.color : 'bg-gray-100 border-2 border-dashed border-gray-300'}`}>
                      <event.icon size={18} className={event.completed ? 'text-white' : 'text-gray-400'} />
                    </div>
                    <div className="pt-1 pb-2">
                      <h3 className={`font-bold text-sm ${event.completed ? 'text-slate-900' : 'text-gray-400'}`}>
                        {event.title}
                      </h3>
                      <p className={`text-xs ${event.completed ? 'text-slate-500' : 'text-gray-300'} leading-relaxed mb-2`}>
                        {event.desc}
                      </p>
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${event.completed ? 'text-blue-500' : 'text-gray-300'}`}>
                        {event.completed ? 'Completed' : 'Pending'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      {previewLightboxImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setPreviewLightboxImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl border border-white/20 shadow-2xl bg-black">
            <button 
              type="button"
              onClick={() => setPreviewLightboxImage(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/60 text-white rounded-full hover:bg-black transition-colors cursor-pointer border-none"
            >
              ✕
            </button>
            <img 
              src={previewLightboxImage} 
              alt="Hazard Evidence Preview" 
              className="max-w-full max-h-[85vh] object-contain block mx-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
}

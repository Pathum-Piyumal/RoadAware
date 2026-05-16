import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, MapPin, AlertTriangle, Calendar, CheckCircle2, 
  Clock, Eye, Truck, Image as ImageIcon, ShieldCheck
} from 'lucide-react';

const MOCK_REPORT = {
  id: 'REP-1029',
  title: 'Massive Pothole on A4006',
  type: 'Pothole',
  severity: 'High',
  date: '2026-05-14T08:30:00Z',
  location: 'A4006 Wembley, London',
  description: 'There is a massive pothole in the left lane that spans almost a meter wide. Several cars have already hit it and it looks very deep. Needs urgent fixing before an accident occurs.',
  status: 'In Progress',
  statusColor: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
  timeline: [
    {
      id: 1,
      title: 'Report Submitted',
      description: 'Your report has been received by the system.',
      time: 'May 14, 2026 • 08:30 AM',
      icon: CheckCircle2,
      color: 'bg-green-500',
      completed: true
    },
    {
      id: 2,
      title: 'Under Review',
      description: 'Local authorities are assessing the severity and assigning a crew.',
      time: 'May 14, 2026 • 10:15 AM',
      icon: Eye,
      color: 'bg-blue-500',
      completed: true
    },
    {
      id: 3,
      title: 'Crew Dispatched',
      description: 'Maintenance crew is on their way to the location to begin repairs.',
      time: 'May 15, 2026 • 09:00 AM',
      icon: Truck,
      color: 'bg-yellow-500',
      completed: true
    },
    {
      id: 4,
      title: 'Resolved',
      description: 'The hazard has been successfully repaired and the road is safe.',
      time: 'Pending',
      icon: ShieldCheck,
      color: 'bg-gray-300',
      completed: false
    }
  ]
};

export default function HazardDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // In a real app, we would fetch the report data based on the ID.
  const report = MOCK_REPORT;

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col w-full pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 pt-10 pb-6 px-6 md:px-12 sticky top-16 z-20 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-sm font-bold text-gray-500 tracking-wider uppercase">
                  {id || report.id}
                </span>
                <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border ${report.statusColor}`}>
                  {report.status}
                </span>
              </div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">{report.title}</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-6xl mx-auto w-full mt-8 px-6 md:px-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image Placeholder */}
          <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm relative group">
            <div className="h-72 w-full bg-slate-100 flex flex-col items-center justify-center text-slate-400">
              <ImageIcon size={48} strokeWidth={1} className="mb-2" />
              <span className="text-sm font-semibold">Attached Image (Placeholder)</span>
            </div>
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-white">
              <div className="flex items-center gap-2 font-semibold text-sm">
                <MapPin size={16} />
                {report.location}
              </div>
              <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {report.severity} Severity
              </span>
            </div>
          </div>

          {/* Description Card */}
          <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Description</h2>
            <p className="text-slate-600 leading-relaxed">
              {report.description}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-6 border-t border-gray-100">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Type</span>
                <div className="flex items-center gap-2 font-semibold text-slate-800 text-sm">
                  <AlertTriangle size={16} className="text-blue-500" />
                  {report.type}
                </div>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Date Submitted</span>
                <div className="flex items-center gap-2 font-semibold text-slate-800 text-sm">
                  <Calendar size={16} className="text-blue-500" />
                  May 14, 2026
                </div>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Time</span>
                <div className="flex items-center gap-2 font-semibold text-slate-800 text-sm">
                  <Clock size={16} className="text-blue-500" />
                  08:30 AM
                </div>
              </div>
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
                {report.timeline.map((event, index) => (
                  <div key={event.id} className="flex gap-4">
                    {/* Timeline Node */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10 shrink-0 ${event.completed ? event.color : 'bg-gray-100 border-2 border-dashed border-gray-300'}`}>
                      <event.icon size={18} className={event.completed ? 'text-white' : 'text-gray-400'} />
                    </div>
                    
                    {/* Content */}
                    <div className="pt-1 pb-2">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-bold text-sm ${event.completed ? 'text-slate-900' : 'text-gray-400'}`}>
                          {event.title}
                        </h3>
                      </div>
                      <p className={`text-xs ${event.completed ? 'text-slate-500' : 'text-gray-300'} leading-relaxed mb-2`}>
                        {event.description}
                      </p>
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${event.completed ? 'text-blue-500' : 'text-gray-300'}`}>
                        {event.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

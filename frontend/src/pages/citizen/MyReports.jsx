import { useNavigate } from 'react-router-dom';
import { FileText, MapPin, Clock, ChevronRight, AlertTriangle } from 'lucide-react';

const MOCK_REPORTS = [
  {
    id: 'REP-1029',
    title: 'Massive Pothole on A4006',
    type: 'Pothole',
    date: '2026-05-14T08:30:00Z',
    location: 'A4006 Wembley, London',
    status: 'In Progress',
    statusColor: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20'
  },
  {
    id: 'REP-1025',
    title: 'Streetlight completely out',
    type: 'Infrastructure',
    date: '2026-05-10T19:45:00Z',
    location: 'High St & Park Ave',
    status: 'Resolved',
    statusColor: 'bg-green-500/10 text-green-600 border-green-500/20'
  },
  {
    id: 'REP-1031',
    title: 'Debris blocking left lane',
    type: 'Debris',
    date: '2026-05-15T14:20:00Z',
    location: 'M4 Eastbound, near J2',
    status: 'Pending',
    statusColor: 'bg-orange-500/10 text-orange-600 border-orange-500/20'
  }
];

export default function MyReports() {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    }).format(new Date(dateString));
  };

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col w-full">
      {/* Header Area */}
      <div className="bg-white border-b border-gray-200 pt-12 pb-8 px-6 md:px-12">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <span className="text-blue-600 font-bold text-[10px] tracking-[0.2em] uppercase mb-2 block">Tracking</span>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">My Reports</h1>
            <p className="text-slate-500 text-sm max-w-md">
              Follow the progress of every hazard you've submitted to the authorities.
            </p>
          </div>
          <button 
            className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-600 transition-colors shadow-sm flex items-center gap-2" 
            onClick={() => navigate('/report-hazard')}
          >
            <span className="text-lg leading-none">+</span> New report
          </button>
        </div>
      </div>

      {/* Content Area */}
      <main className="flex-grow p-6 md:p-12">
        <div className="max-w-5xl mx-auto">
          {MOCK_REPORTS.length === 0 ? (
            <div className="bg-white border border-dashed border-gray-300 rounded-3xl p-16 flex flex-col items-center text-center">
              <div className="bg-slate-50 p-4 rounded-full mb-6">
                <FileText size={40} className="text-slate-400" strokeWidth={1.5} />
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 mb-2">No reports yet</h2>
              <p className="text-slate-500 text-sm mb-8 max-w-xs">
                Submit your first hazard report and it'll appear here for you to track.
              </p>
              <button 
                className="bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-slate-800 transition-colors shadow-sm"
                onClick={() => navigate('/report-hazard')}
              >
                Report a hazard
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_REPORTS.map((report) => (
                <div 
                  key={report.id}
                  onClick={() => navigate(`/hazard/${report.id}`)}
                  className="bg-white border border-gray-100 rounded-2xl p-6 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-full opacity-50 pointer-events-none" />
                  
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border ${report.statusColor}`}>
                      {report.status}
                    </span>
                    <span className="text-xs font-semibold text-slate-400 bg-slate-50 px-2 py-1 rounded-md">
                      {report.id}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {report.title}
                  </h3>
                  
                  <div className="space-y-2 mt-auto pt-4 relative z-10">
                    <div className="flex items-center text-slate-500 text-sm">
                      <AlertTriangle size={14} className="mr-2 opacity-70" />
                      {report.type}
                    </div>
                    <div className="flex items-center text-slate-500 text-sm">
                      <MapPin size={14} className="mr-2 opacity-70" />
                      <span className="truncate">{report.location}</span>
                    </div>
                    <div className="flex items-center text-slate-500 text-sm">
                      <Clock size={14} className="mr-2 opacity-70" />
                      {formatDate(report.date)}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-50 flex justify-between items-center text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                    View Tracking Details
                    <ChevronRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
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

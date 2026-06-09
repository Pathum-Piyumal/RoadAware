import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, MapPin, Clock, ChevronRight, AlertTriangle } from 'lucide-react';
import HazardService from '../../services/hazard.service';
import RadarLoader from '../../components/common/RadarLoader';


// Viewport Scroll Reveal Component with Delay Staggering & Gentle 16px Offset
const ScrollReveal = ({ children, delay = 0 }) => {
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

export default function MyReports() {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    HazardService.getMyHazards()
      .then(data => setReports(data.reports || []))
      .catch(err => console.error('Failed to load reports:', err))
      .finally(() => setLoading(false));
  }, []);

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

  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    }).format(new Date(dateString));
  };

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col w-full selection:bg-orange-100 selection:text-orange-950">
      {/* Header Area */}
      <div className="bg-white border-b border-gray-200 pt-16 pb-12 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[80px] -mr-48 -mt-48 pointer-events-none" />
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative z-10 animate-fade-in-up">
          <div>
            <span className="text-blue-600 font-bold text-[10px] tracking-[0.2em] uppercase mb-2 block">Tracking</span>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">My Reports.</h1>
            <p className="text-slate-500 text-sm max-w-md leading-relaxed">
              Follow the resolution progress and official logs of every hazard you've submitted.
            </p>
          </div>
          <button 
            className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-orange-600 transition-all shadow-lg shadow-slate-900/10 hover:shadow-orange-600/20 hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer" 
            onClick={() => navigate('/report-hazard')}
          >
            <span className="text-lg leading-none">+</span> New report
          </button>
        </div>
      </div>

      {/* Content Area */}
      <main className="flex-grow p-6 md:p-12">
        <div className="max-w-5xl mx-auto">
      {loading ? (
        <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-[32px] p-16 shadow-xl shadow-gray-200/35 dark:shadow-none">
          <RadarLoader size="medium" message="Scanning local municipal hazard database..." />
        </div>
      ) : reports.length === 0 ? (
            <ScrollReveal>
              <div className="bg-white border border-dashed border-gray-300 rounded-[32px] p-20 flex flex-col items-center text-center shadow-sm">
                <div className="bg-slate-50 p-5 rounded-2xl mb-6 border border-slate-100">
                  <FileText size={40} className="text-slate-400" strokeWidth={1.5} />
                </div>
                <h2 className="text-xl font-black text-slate-900 mb-2">No reports yet</h2>
                <p className="text-slate-500 text-sm mb-8 max-w-xs leading-relaxed">
                  Submit your first hazard report coordinates and it'll appear here for real-time tracking.
                </p>
                <button 
                  className="bg-slate-900 text-white px-8 py-3.5 rounded-2xl font-bold text-sm hover:bg-orange-600 hover:-translate-y-0.5 transition-all shadow-md cursor-pointer"
                  onClick={() => navigate('/report-hazard')}
                >
                  Report a hazard
                </button>
              </div>
            </ScrollReveal>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reports.map((report, idx) => (
                <ScrollReveal key={report.id} delay={idx * 80}>
                  <div
                    onClick={() => navigate(`/hazard/${report.id}`)}
                    className="bg-white border border-gray-100 rounded-3xl p-6 cursor-pointer hover:shadow-2xl hover:border-slate-200 hover:-translate-y-1.5 transition-all duration-300 group flex flex-col h-full relative overflow-hidden shadow-md shadow-slate-100/45"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-full opacity-60 pointer-events-none" />

                    <div className="flex justify-between items-start mb-5 relative z-10">
                      <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-full border ${getStatusStyle(report.status)}`}>
                        {getStatusLabel(report.status)}
                      </span>
                      <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                        HZ-{report.id}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors leading-snug">
                      {report.title}
                    </h3>

                    <div className="space-y-2 mt-auto pt-5 border-t border-slate-50 relative z-10">
                      <div className="flex items-center text-slate-500 text-xs font-medium">
                        <AlertTriangle size={14} className="mr-2 opacity-70 text-blue-500 shrink-0" />
                        {report.category?.name || 'Uncategorized'}
                      </div>
                      <div className="flex items-center text-slate-500 text-xs font-medium">
                        <MapPin size={14} className="mr-2 opacity-70 text-blue-500 shrink-0" />
                        <span className="truncate">{report.locationName}</span>
                      </div>
                      <div className="flex items-center text-slate-500 text-xs font-medium">
                        <Clock size={14} className="mr-2 opacity-70 text-blue-500 shrink-0" />
                        {formatDate(report.createdAt)}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-50 flex justify-between items-center text-xs font-bold text-slate-800 uppercase tracking-wider group-hover:text-blue-600 transition-colors">
                      View Tracking Details
                      <ChevronRight size={15} className="transform group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { Activity, CheckCircle2, AlertCircle, Clock, Zap, Globe, Server, Database, ShieldCheck } from 'lucide-react';

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
    }, { threshold: 0.05 });
    
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

export default function Status() {
  const systems = [
    { name: "Global Hazard Map", status: "Operational", uptime: "99.98%", latency: "42ms", icon: Globe, color: "text-green-500", bg: "bg-green-50" },
    { name: "User API Services", status: "Operational", uptime: "100%", latency: "18ms", icon: Zap, color: "text-green-500", bg: "bg-green-50" },
    { name: "Reporting Pipeline", status: "Operational", uptime: "99.95%", latency: "120ms", icon: Activity, color: "text-green-500", bg: "bg-green-50" },
    { name: "Authentication Portal", status: "Operational", uptime: "100%", latency: "12ms", icon: ShieldCheck, color: "text-green-500", bg: "bg-green-50" },
    { name: "Database Clusters", status: "Operational", uptime: "99.99%", latency: "5ms", icon: Database, color: "text-green-500", bg: "bg-green-50" },
    { name: "Image Storage (S3)", status: "Operational", uptime: "100%", latency: "250ms", icon: Server, color: "text-green-500", bg: "bg-green-50" }
  ];

  const incidents = [
    { title: "Scheduled Maintenance", date: "May 10, 2026", status: "Resolved", desc: "Routine database optimization and security patches were successfully applied." },
    { title: "API Latency Spike", date: "May 02, 2026", status: "Resolved", desc: "Brief latency increase in the reporting pipeline due to high traffic from recent flooding events." }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-24 selection:bg-blue-100 selection:text-blue-900">
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden bg-[#0a0a0a] text-white">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -mr-64 -mt-64" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold tracking-widest uppercase mb-8">
            <CheckCircle2 size={14} /> All Systems Operational
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
            Platform <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Reliability.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Real-time status of RoadAware services. We're committed to transparency 
            and 24/7 infrastructure availability.
          </p>
        </div>
      </section>

      {/* Status Grid */}
      <section className="max-w-7xl mx-auto px-6 -mt-20 relative z-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {systems.map((sys, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl shadow-gray-200/30 hover:shadow-2xl transition-all duration-300 h-full flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className={`w-14 h-14 rounded-2xl ${sys.bg} ${sys.color} flex items-center justify-center`}>
                      <sys.icon size={28} />
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Uptime</div>
                      <div className="text-sm font-bold text-gray-900">{sys.uptime}</div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{sys.name}</h3>
                </div>
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-50">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs font-bold text-green-600 uppercase tracking-widest">{sys.status}</span>
                  </div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">{sys.latency}</div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Incident History */}
      <section className="max-w-4xl mx-auto px-6 py-32">
        <ScrollReveal>
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-black text-gray-900">Incident History</h2>
            <div className="flex items-center gap-2 text-sm font-bold text-gray-400">
              <Clock size={16} /> Past 30 Days
            </div>
          </div>
        </ScrollReveal>

        <div className="space-y-6">
          {incidents.map((incident, i) => (
            <ScrollReveal key={i} delay={i * 120}>
              <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{incident.title}</h3>
                    <p className="text-sm text-gray-400 font-medium">{incident.date}</p>
                  </div>
                  <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-green-100">
                    {incident.status}
                  </span>
                </div>
                <p className="text-gray-500 leading-relaxed">{incident.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Support CTA */}
      <section className="max-w-5xl mx-auto px-6">
        <ScrollReveal>
          <div className="bg-[#050505] rounded-[48px] p-12 md:p-20 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[80px] -mr-16 -mt-16" />
            <h2 className="text-4xl font-black mb-6">Experience an issue?</h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
              If you're noticing an issue that isn't reported here, please let our 
              technical team know immediately.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="/contact" className="px-10 py-4 bg-white text-black font-bold rounded-2xl hover:bg-gray-100 transition-all shadow-xl flex items-center gap-2">
                Report System Issue <AlertCircle size={20} />
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { Map, Camera, ThumbsUp, Activity, ShieldCheck, ArrowRight, Zap, Globe, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

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

export default function Features() {
  const features = [
    {
      title: "Interactive Hazard Map",
      description: "Explore reported road hazards in your area using our live, dynamic map. Switch between grid and map views, or use the heatmap to identify high-risk zones.",
      icon: Map,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
      tag: "Real-time Map",
      path: "/features/map"
    },
    {
      title: "Precision Reporting",
      description: "Quickly submit reports with pinpoint GPS accuracy, custom media attachments, and categorized details. Designed to take less than a minute.",
      icon: Camera,
      color: "text-orange-600",
      bg: "bg-orange-50",
      border: "border-orange-100",
      tag: "GPS Pinpoint",
      path: "/features/reporting"
    },
    {
      title: "Community Consensus",
      description: "Empower local voices. Upvote valid reports, add comments, and collaboratively verify hazard reports to prioritize road maintenance.",
      icon: ThumbsUp,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      tag: "Consensus",
      path: "/features/consensus"
    },
    {
      title: "Authorities Dashboard",
      description: "An enterprise-grade portal for local councils and public works. Manage, assign, update, and resolve reported road hazards with comprehensive analytics.",
      icon: Activity,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-100",
      tag: "Enterprise Portal",
      path: "/features/dashboard"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans text-gray-900 pb-24 selection:bg-blue-100 selection:text-blue-900">
      {/* Hero Section */}
      <section className="relative pt-44 pb-44 overflow-hidden bg-[#050505] text-white">
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-orange-600/10 rounded-full blur-[100px]" />
          <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[140px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase mb-8">
            <Zap size={14} className="fill-current" /> Empowering Cities
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.95] mb-8">
            Infrastructure <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400">Intelligence.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-12">
            RoadAware combines community vigilance with enterprise-grade data management 
            to create the world's most responsive road maintenance ecosystem.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/map" className="px-10 py-4 bg-white text-black font-bold rounded-2xl hover:bg-gray-100 transition-all shadow-xl flex items-center gap-2 group">
              View Live Map <Globe size={18} className="group-hover:rotate-12 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="max-w-7xl mx-auto px-6 -mt-20 relative z-20">
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <ScrollReveal key={idx} delay={idx * 120}>
                <div className="group bg-white rounded-[32px] p-10 border border-gray-100 shadow-xl shadow-gray-200/30 hover:shadow-2xl hover:border-blue-200/50 transition-all duration-500 flex flex-col items-start relative overflow-hidden h-full">
                  {/* Accent Background Glow on Hover */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none`} />

                  <div className="flex justify-between items-center w-full mb-8">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${feature.bg} ${feature.border} border group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                      <Icon className={feature.color} size={32} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                      {feature.tag}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                  <p className="text-slate-500 leading-relaxed mb-8 flex-grow text-sm">
                    {feature.description}
                  </p>
                  <Link 
                    to={feature.path}
                    className="w-full pt-6 border-t border-slate-50 flex items-center justify-between text-sm font-bold text-slate-400 group-hover:text-blue-600 transition-colors cursor-pointer text-left"
                  >
                    <span>Learn more</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                  </Link>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* Sleek Workflow Showcase Section */}
      <section className="py-24 bg-white border-y border-slate-100 overflow-hidden mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="text-xs font-bold tracking-[0.2em] text-blue-600 uppercase mb-4 block">The RoadAware Cycle</span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                A closed-loop system of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">accountability</span>
              </h2>
              <p className="text-slate-500 text-sm mt-4 leading-relaxed max-w-2xl mx-auto">
                Our architecture bridges the gap between active road users and public works crews to prioritize safety and repair efforts.
              </p>
            </div>
          </ScrollReveal>

          {/* Workflow Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {[
              { step: "01", label: "Identify & Locate", desc: "Citizen spots a hazard and snaps a photo. The system automatically tags GPS coordinates.", icon: Camera, color: "from-orange-500 to-amber-500" },
              { step: "02", label: "Community Upvote", desc: "Nearby users validate the report with upvotes, promoting urgency and filtering noise.", icon: ThumbsUp, color: "from-emerald-500 to-teal-500" },
              { step: "03", label: "Council Dispatch", desc: "Authorities receive the verified report, assign repair crews, and update statuses.", icon: Activity, color: "from-purple-500 to-indigo-500" },
              { step: "04", label: "Safe Resolution", desc: "Crews fix the road. Citizens get instantly updated. The hazard is resolved.", icon: ShieldCheck, color: "from-blue-500 to-cyan-500" }
            ].map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 100}>
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-100/20 flex flex-col items-center text-center hover:shadow-2xl transition-all duration-300 group h-full justify-between">
                  <div>
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 mx-auto`}>
                      <item.icon size={26} />
                    </div>
                    <span className="text-xs font-bold text-blue-600 mb-2 block">{item.step}</span>
                    <h3 className="text-lg font-bold text-slate-900 mb-3">{item.label}</h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Secondary CTA */}
      <section className="max-w-7xl mx-auto px-6 mt-24">
        <ScrollReveal>
          <div className="relative rounded-[48px] overflow-hidden bg-blue-600 p-12 md:p-20 text-white shadow-2xl shadow-blue-200">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[80px] -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-black/10 rounded-full blur-[60px] -ml-16 -mb-16" />
            
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
                Are you a local government official?
              </h2>
              <p className="text-lg text-blue-100 mb-10 leading-relaxed">
                Join dozens of cities already using RoadAware to optimize their public works 
                departments. Get access to the full suite of analytics and dispatch tools.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="px-8 py-4 bg-white text-blue-600 font-bold rounded-2xl hover:bg-blue-50 transition-all flex items-center gap-2 shadow-xl shadow-blue-900/20">
                  Partner with Us <Lock size={18} />
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}

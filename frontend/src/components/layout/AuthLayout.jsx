import React from 'react';
import { Shield, MapPin, Activity, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

const AuthLayout = ({ 
  children,
  badge = "Civic Engagement",
  title = "Making our streets",
  titleHighlight = "safer, together.",
  description = "RoadAware empowers citizens to report infrastructure issues directly to local authorities and track resolutions in real-time.",
  features
}) => {
  const defaultFeatures = [
    {
      icon: MapPin,
      title: "Quick Incident Reporting",
      desc: "Pinpoint potholes, broken lights, and other hazards in seconds.",
      colorClass: "bg-blue-500/10 border-blue-500/20 text-blue-400"
    },
    {
      icon: Activity,
      title: "Real-Time Tracking",
      desc: "Track progress live from submission to worker assignment to resolution.",
      colorClass: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400"
    },
    {
      icon: Award,
      title: "Community Impact",
      desc: "Gain reputation, earn badges, and rank on the leaderboard.",
      colorClass: "bg-indigo-500/10 border-indigo-500/20 text-indigo-400"
    }
  ];

  const featuresList = features || defaultFeatures;

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col justify-between p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Header */}
      <Link to="/" className="flex items-center gap-2.5 z-10 hover:opacity-90 transition-opacity" style={{ textDecoration: 'none' }}>
        <img src={logo} alt="RoadAware Logo" className="w-8 h-8 object-contain rounded-lg shadow-lg shadow-blue-500/20" />
        <span className="text-white font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">RoadAware</span>
      </Link>

      {/* Main Card */}
      <div className="flex-1 flex items-center justify-center z-10 py-6">
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl w-full max-w-5xl flex overflow-hidden shadow-2xl">
          
          {/* Left Visual Side (shown on md/lg) */}
          <div className="hidden md:flex w-1/2 bg-gradient-to-br from-slate-900 via-[#030712] to-blue-950/40 p-12 flex-col justify-between relative overflow-hidden border-r border-white/10">
            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
            
            {/* Radial Inner Glow */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

            {/* Content Top */}
            <div className="relative z-10">
              <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 uppercase">
                {badge}
              </span>
              <h1 className="text-3xl lg:text-4xl font-extrabold text-white mt-6 mb-4 leading-tight tracking-tight">
                {title} <br />
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">{titleHighlight}</span>
              </h1>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-8">
                {description}
              </p>

              {/* Feature Items */}
              <div className="space-y-6">
                {featuresList.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex gap-4 items-start">
                      <div className={`p-2.5 rounded-xl ${item.colorClass}`}>
                        <Icon size={18} />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-slate-200">{item.title}</h3>
                        <p className="text-xs text-slate-400 mt-1 leading-normal">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Tagline/Visual */}
            <div className="relative z-10 pt-6 border-t border-white/5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Shield size={20} className="text-white" />
              </div>
              <div>
                <p className="text-xs text-slate-400 m-0 leading-none">Secured & Verified by</p>
                <p className="text-xs font-bold text-slate-200 m-0 mt-1">RoadAware Civic Network</p>
              </div>
            </div>
          </div>

          {/* Right Form Side */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            {children}
          </div>

        </div>
      </div>

      {/* Footer */}
      <div className="text-gray-500 text-xs text-center md:text-left z-10">
        © 2026 RoadAware. All rights reserved.
      </div>
    </div>
  );
};

export default AuthLayout;

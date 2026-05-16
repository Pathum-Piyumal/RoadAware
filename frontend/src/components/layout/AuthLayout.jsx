import React from 'react';
import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#020617] flex flex-col justify-between p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Header */}
      <Link to="/" className="flex items-center gap-2 z-10 hover:opacity-80 transition-opacity" style={{ textDecoration: 'none' }}>
        <img src={logo} alt="RoadAware Logo" className="w-8 h-8 object-contain rounded-lg" />
        <span className="text-white font-bold text-xl tracking-tight">RoadAware</span>
      </Link>

      {/* Main Card */}
      <div className="flex-1 flex items-center justify-center z-10">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl w-full max-w-5xl flex overflow-hidden shadow-2xl">
          {/* Left Form Side */}
          <div className="w-full md:w-1/2 p-8 md:p-12">
            {children}
          </div>

          {/* Right Visual Side */}
          <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-900/40 to-black items-center justify-center relative">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-cyan-500/30 rounded-full blur-2xl group-hover:bg-cyan-500/50 transition duration-500"></div>
              <Shield size={180} className="text-cyan-400 relative drop-shadow-[0_0_25px_rgba(34,211,238,0.5)]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full p-4 border border-cyan-400/50">
                <div className="w-4 h-6 border-4 border-cyan-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-gray-500 text-sm text-center md:text-left z-10">
        © 2026 RoadAware. All rights reserved.
      </div>
    </div>
  );
};

export default AuthLayout;

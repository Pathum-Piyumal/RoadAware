import React from 'react';
import { ShieldAlert, Shield } from 'lucide-react';

const AuthLayout = ({ children, title, subtitle, footer }) => {
  return (
    <div className="min-h-screen bg-[#050B14] flex relative overflow-hidden font-sans text-white">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl pointer-events-none">
        {/* Subtle radial lines/mesh effect can be simulated with background images, but we'll use CSS glows here */}
        <div className="absolute right-[20%] top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/20 rounded-full blur-[120px]" />
        <div className="absolute right-[25%] top-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-600/30 rounded-full blur-[100px]" />
      </div>

      {/* Top Left Logo */}
      <div className="absolute top-8 left-8 flex items-center gap-2 z-20">
        <ShieldAlert className="text-orange-500" size={28} />
        <span className="text-xl font-bold tracking-wide">RoadAware</span>
      </div>

      {/* Main Content Container */}
      <div className="flex-1 flex w-full max-w-7xl mx-auto z-10 relative">
        
        {/* Left Side: Form Area */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 pt-24 pb-12">
          
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 tracking-tight text-white">{title}</h1>
            {subtitle && (
              <div className="text-sm text-gray-300">
                {subtitle}
              </div>
            )}
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
            {children}
          </div>

          {/* Optional Footer content directly under the card */}
          {footer && (
            <div className="mt-6 text-center text-sm">
              {footer}
            </div>
          )}

          {/* Footer Copyright */}
          <div className="mt-auto pt-16 text-xs text-gray-500">
            © 2026 RoadAware. All rights reserved.
          </div>
        </div>

        {/* Right Side: Glowing Shield Graphic */}
        <div className="hidden lg:flex w-1/2 items-center justify-center relative">
          {/* Simulated Graphic using Lucide and CSS drop-shadow */}
          <div className="relative flex items-center justify-center w-[400px] h-[400px]">
            {/* Outer Glows */}
            <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute inset-4 bg-blue-600/20 rounded-full blur-2xl" />
            
            {/* Inner Shield Compositing */}
            <Shield 
              size={280} 
              className="text-cyan-400 opacity-90 drop-shadow-[0_0_40px_rgba(34,211,238,0.8)] z-10 fill-cyan-400/20" 
              strokeWidth={1}
            />
            {/* Keyhole */}
            <div className="absolute z-20 flex flex-col items-center justify-center drop-shadow-[0_0_15px_rgba(0,0,0,1)]">
              <div className="w-12 h-12 bg-[#050B14] rounded-full" />
              <div className="w-6 h-12 bg-[#050B14] -mt-2 rounded-b-md" />
            </div>
            
            {/* Overlay tech lines (simulated with borders) */}
            <div className="absolute w-full h-full border-[1px] border-cyan-500/10 rounded-full rotate-45 scale-110" />
            <div className="absolute w-full h-full border-[1px] border-blue-500/10 rounded-full -rotate-45 scale-150" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthLayout;

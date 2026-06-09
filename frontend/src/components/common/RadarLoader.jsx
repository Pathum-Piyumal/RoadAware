import React from 'react';

const RadarLoader = ({ size = 'medium', message = 'Scanning infrastructure records...' }) => {
  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-24 h-24',
    large: 'w-36 h-36'
  };

  const coreSize = {
    small: 'inset-3.5',
    medium: 'inset-8',
    large: 'inset-12'
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 space-y-6">
      <div className={`relative ${sizeClasses[size]}`}>
        {/* Outer Pulsing Ping Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-orange-500/10 animate-ping" style={{ animationDuration: '2.5s' }} />
        
        {/* Secondary Concentric Wave */}
        <div className="absolute inset-4 rounded-full border-2 border-blue-500/10 animate-pulse" />
        
        {/* Third Concentric Ring */}
        <div className="absolute inset-8 rounded-full border border-orange-500/5" />
        
        {/* Sweeper Radar Overlay */}
        <div className="absolute inset-0 rounded-full border border-orange-500/10 overflow-hidden">
          <div 
            className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-orange-500/25 to-orange-500/50 animate-spin" 
            style={{ 
              animationDuration: '2.5s',
              transformOrigin: 'center center'
            }} 
          />
        </div>

        {/* Central Core Element */}
        <div className={`absolute ${coreSize[size]} rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/30`}>
          <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
        </div>
      </div>
      
      {message && (
        <p className="text-xs font-black uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500 animate-pulse text-center max-w-sm leading-relaxed">
          {message}
        </p>
      )}
    </div>
  );
};

export default RadarLoader;

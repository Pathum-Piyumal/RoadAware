import { Shield, Target, Users, Eye, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 pb-24 selection:bg-orange-100 selection:text-orange-900">
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden bg-[#050505] text-white">
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px] -mr-64 -mt-64 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -ml-64 -mb-64" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold tracking-widest uppercase mb-8">
              <Shield size={14} /> Our Story
            </span>
            <h1 className="text-6xl md:text-7xl font-black tracking-tight leading-[1.1] mb-8">
              Pioneering <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500">Road Safety</span> for everyone.
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed mb-10 max-w-2xl">
              RoadAware is more than just a reporting tool. We are building the world's most transparent 
              infrastructure intelligence platform, powered by the people who use it every day.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/report-hazard" className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-orange-900/20 flex items-center gap-2 group">
                Join the Mission <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Overlapping */}
      <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
        <div className="bg-white rounded-[40px] shadow-2xl shadow-gray-200/50 border border-gray-100 p-10 md:p-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { label: 'Reports Made', value: '12k+', color: 'text-orange-600' },
              { label: 'Hazards Fixed', value: '8.5k', color: 'text-blue-600' },
              { label: 'Avg Response', value: '24h', color: 'text-green-600' },
              { label: 'Active Users', value: '50k', color: 'text-purple-600' }
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className={`text-4xl md:text-5xl font-black ${stat.color} tracking-tighter`}>{stat.value}</div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-32 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
              A mission to make every journey <span className="text-orange-600">secure.</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              We believe that infrastructure maintenance shouldn't be a black box. By connecting 
              citizens directly with the authorities, we create a closed-loop system of 
              accountability and rapid response.
            </p>
            <div className="space-y-4">
              {[
                'Real-time verification of road conditions',
                'Transparent progress tracking for repairs',
                'Empowering local communities with data',
                'Reducing accidents through proactive reporting'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-700 font-semibold">
                  <CheckCircle2 size={20} className="text-orange-500" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 relative">
            {/* Decorative element */}
            <div className="absolute inset-0 bg-orange-100/50 blur-[100px] -z-10 rounded-full" />
            
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl shadow-gray-200/30 hover:shadow-2xl transition-all">
                <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center mb-6">
                  <Shield size={24} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Safety First</h3>
                <p className="text-sm text-gray-500">Prioritizing the well-being of all road users.</p>
              </div>
              <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl shadow-gray-200/30 hover:shadow-2xl transition-all">
                <div className="w-12 h-12 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center mb-6">
                  <Users size={24} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Community</h3>
                <p className="text-sm text-gray-500">Built on the vigilance of active citizens.</p>
              </div>
            </div>
            <div className="space-y-6 mt-12">
              <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl shadow-gray-200/30 hover:shadow-2xl transition-all">
                <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-6">
                  <Target size={24} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Precision</h3>
                <p className="text-sm text-gray-500">Pinpoint accuracy for repair crews.</p>
              </div>
              <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl shadow-gray-200/30 hover:shadow-2xl transition-all">
                <div className="w-12 h-12 bg-purple-50 text-purple-500 rounded-2xl flex items-center justify-center mb-6">
                  <Eye size={24} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Transparency</h3>
                <p className="text-sm text-gray-500">Open tracking for every hazard reported.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


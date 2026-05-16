import { Shield, Target, Users, Eye } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 pb-20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-gray-50 border-b border-gray-200">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100 opacity-60 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <span className="text-orange-600 font-bold text-xs tracking-widest uppercase mb-4 block">About RoadAware</span>
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 mb-6">
            Making our roads <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">safer together.</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            RoadAware is a community-driven initiative built to connect citizens with authorities.
            We provide real-time hazard data to improve infrastructure and prevent accidents.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-extrabold mb-6 text-gray-900">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              We believe that every road user deserves a safe journey. By empowering the community to report
              hazards like potholes, debris, and flooding, we give local governments the actionable data
              they need to fix issues faster.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Together, we are transforming road maintenance from a reactive process into a proactive,
              transparent, and community-led movement.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-orange-50 p-6 rounded-3xl border border-orange-100 hover:shadow-md transition-shadow">
              <Shield className="text-orange-500 mb-4" size={32} />
              <h3 className="font-bold text-gray-900 mb-2">Safety First</h3>
              <p className="text-sm text-gray-600">Prioritizing the well-being of all road users.</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 mt-8 hover:shadow-md transition-shadow">
              <Target className="text-blue-500 mb-4" size={32} />
              <h3 className="font-bold text-gray-900 mb-2">Actionable Data</h3>
              <p className="text-sm text-gray-600">Providing pinpoint accuracy for quick repairs.</p>
            </div>
            <div className="bg-green-50 p-6 rounded-3xl border border-green-100 hover:shadow-md transition-shadow">
              <Users className="text-green-500 mb-4" size={32} />
              <h3 className="font-bold text-gray-900 mb-2">Community Driven</h3>
              <p className="text-sm text-gray-600">Relying on the vigilance of citizens.</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-3xl border border-purple-100 mt-8 hover:shadow-md transition-shadow">
              <Eye className="text-purple-500 mb-4" size={32} />
              <h3 className="font-bold text-gray-900 mb-2">Transparency</h3>
              <p className="text-sm text-gray-600">Open progress tracking for every report.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#0f172a] text-white py-20 rounded-3xl max-w-6xl mx-auto shadow-xl">
        <div className="px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-extrabold text-orange-400 mb-2">12k+</div>
            <div className="text-xs text-gray-400 font-bold uppercase tracking-widest">Reports Made</div>
          </div>
          <div>
            <div className="text-4xl font-extrabold text-blue-400 mb-2">8,500</div>
            <div className="text-xs text-gray-400 font-bold uppercase tracking-widest">Hazards Fixed</div>
          </div>
          <div>
            <div className="text-4xl font-extrabold text-green-400 mb-2">24h</div>
            <div className="text-xs text-gray-400 font-bold uppercase tracking-widest">Avg Response</div>
          </div>
          <div>
            <div className="text-4xl font-extrabold text-purple-400 mb-2">50k</div>
            <div className="text-xs text-gray-400 font-bold uppercase tracking-widest">Active Users</div>
          </div>
        </div>
      </section>
    </div>
  );
}

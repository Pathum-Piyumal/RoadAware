import { Map, Camera, ThumbsUp, Activity, Bell, ShieldCheck } from 'lucide-react';

export default function Features() {
  const features = [
    {
      title: "Interactive Hazard Map",
      description: "Explore reported road hazards in your area using our live, dynamic map. Switch between grid and map views, or use the heatmap to identify high-risk zones.",
      icon: Map,
      color: "text-blue-500",
      bg: "bg-blue-50",
      border: "border-blue-100"
    },
    {
      title: "Real-time Reporting",
      description: "Quickly submit reports with pinpoint GPS accuracy and photo evidence. Our streamlined 3-step process ensures hazards are logged in under a minute.",
      icon: Camera,
      color: "text-orange-500",
      bg: "bg-orange-50",
      border: "border-orange-100"
    },
    {
      title: "Community Upvoting",
      description: "See a pothole that someone else already reported? Upvote it! High-vote hazards are escalated to local authorities faster for priority repairs.",
      icon: ThumbsUp,
      color: "text-green-500",
      bg: "bg-green-50",
      border: "border-green-100"
    },
    {
      title: "Authorities Dashboard",
      description: "A dedicated portal for local governments and repair crews to track, manage, and resolve hazards efficiently with comprehensive analytics.",
      icon: Activity,
      color: "text-purple-500",
      bg: "bg-purple-50",
      border: "border-purple-100"
    },
    {
      title: "Instant Notifications",
      description: "Receive updates when a hazard you reported gets assigned, is actively being worked on, or is successfully resolved by the authorities.",
      icon: Bell,
      color: "text-amber-500",
      bg: "bg-amber-50",
      border: "border-amber-100"
    },
    {
      title: "Verified Data Integrity",
      description: "Our system flags duplicate reports and uses community consensus to ensure that the data provided to authorities is clean, accurate, and reliable.",
      icon: ShieldCheck,
      color: "text-cyan-500",
      bg: "bg-cyan-50",
      border: "border-cyan-100"
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 pb-24">
      {/* Hero Section */}
      <section className="relative pt-32 pb-32 overflow-hidden bg-[#0f172a] text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-orange-900/20 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <span className="text-blue-400 font-bold text-xs tracking-widest uppercase mb-4 block">Platform Features</span>
          <h1 className="text-5xl font-extrabold tracking-tight mb-6">
            Everything you need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">drive safely.</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            RoadAware isn't just a map. It's a comprehensive ecosystem designed to bridge the gap between 
            everyday commuters and road maintenance authorities.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-6 -mt-16 relative z-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-200/40 hover:-translate-y-2 transition-transform duration-300">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${feature.bg} ${feature.border} border`}>
                  <Icon className={feature.color} size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-4xl mx-auto px-6 mt-32 text-center">
        <div className="bg-orange-50 rounded-3xl p-12 border border-orange-100 hover:shadow-lg transition-shadow">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Ready to make a difference?</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Join thousands of users who are already improving their local communities. 
            Report your first hazard today.
          </p>
          <a href="/report-hazard" className="inline-flex items-center justify-center px-8 py-3 bg-orange-600 text-white font-bold rounded-xl shadow-md hover:bg-orange-700 transition-colors">
            Start Reporting
          </a>
        </div>
      </section>
    </div>
  );
}

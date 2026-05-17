import { Map, Camera, ThumbsUp, Activity, Bell, ShieldCheck, ArrowRight, Zap, Globe, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Features() {
  const features = [
    {
      title: "Interactive Hazard Map",
      description: "Explore reported road hazards in your area using our live, dynamic map. Switch between grid and map views, or use the heatmap to identify high-risk zones.",
      icon: Map,
      color: "text-blue-500",
      bg: "bg-blue-50",
      border: "border-blue-100",
      tag: "Real-time",
      path: "/map"
    },
    {
      title: "Precision Reporting",
      description: "Quickly submit reports with pinpoint GPS accuracy and photo evidence. Our streamlined process ensures hazards are logged in under a minute.",
      icon: Camera,
      color: "text-orange-500",
      bg: "bg-orange-50",
      border: "border-orange-100",
      tag: "Mobile Ready",
      path: "/report-hazard"
    },
    {
      title: "Community Consensus",
      description: "Harness the power of the crowd. Upvote reports to increase visibility and help authorities prioritize critical repairs in your neighborhood.",
      icon: ThumbsUp,
      color: "text-green-500",
      bg: "bg-green-50",
      border: "border-green-100",
      tag: "Verified",
      path: "/my-reports"
    },
    {
      title: "Authorities Dashboard",
      description: "A professional portal for local governments to monitor, assign, and resolve hazards with deep analytics and resource management tools.",
      icon: Activity,
      color: "text-purple-500",
      bg: "bg-purple-50",
      border: "border-purple-100",
      tag: "Enterprise",
      path: "/admin/login"
    },
    {
      title: "Smart Notifications",
      description: "Stay in the loop. Get instant push and email updates as your reported hazards move from 'Submitted' to 'In Progress' and finally 'Resolved'.",
      icon: Bell,
      color: "text-amber-500",
      bg: "bg-amber-50",
      border: "border-amber-100",
      tag: "Automated",
      path: "/status"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-24 selection:bg-blue-100 selection:text-blue-900">
      {/* Hero Section */}
      <section className="relative pt-40 pb-40 overflow-hidden bg-[#0a0a0a] text-white">
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" />
          <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-orange-600/10 rounded-full blur-[100px]" />
          <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[140px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase mb-8">
            <Zap size={14} className="fill-current" /> Empowering Cities
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
            Infrastructure <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400">Intelligence.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-12">
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="group bg-white rounded-[32px] p-10 border border-gray-100 shadow-xl shadow-gray-200/40 hover:shadow-2xl hover:border-blue-100 transition-all duration-500 flex flex-col items-start">
                <div className="flex justify-between items-center w-full mb-8">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${feature.bg} ${feature.border} border group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                    <Icon className={feature.color} size={32} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
                    {feature.tag}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed mb-8 flex-grow">
                  {feature.description}
                </p>
                <Link 
                  to={feature.path}
                  className="w-full pt-6 border-t border-gray-50 flex items-center justify-between text-sm font-bold text-gray-400 group-hover:text-blue-500 transition-colors cursor-pointer text-left"
                >
                  <span>Learn more</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Secondary CTA */}
      <section className="max-w-7xl mx-auto px-6 mt-32">
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
      </section>
    </div>
  );
}


import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Map, Camera, ThumbsUp, Activity, ArrowLeft, ArrowRight, 
  CheckCircle2, Shield, Eye, Target, Sparkles, AlertCircle 
} from 'lucide-react';

const FEATURE_DATA = {
  map: {
    title: "Interactive Hazard Map",
    subtitle: "Real-time, dynamic monitoring of road safety hazards in your community.",
    longDesc: "The Interactive Hazard Map is the visual engine of RoadAware. It compiles crowdsourced data from all citizens into a single, high-fidelity Leaflet map, enabling both residents and public crews to view and filter road safety issues instantly.",
    themeColor: "text-blue-500",
    bgAccent: "bg-blue-500/5",
    borderAccent: "border-blue-500/20",
    gradient: "from-blue-600 to-cyan-500",
    shadow: "shadow-blue-500/20",
    badge: "Real-Time Map Layer",
    icon: Map,
    highlights: [
      { title: "Heatmap Visualization", desc: "Instantly identify high-frequency hazard zones with our custom red heatmap overlay, emphasizing danger zones for municipal crews." },
      { title: "Dynamic Filter System", desc: "Seamlessly query the database by hazard category (potholes, flooding, streetlight failure), urgency level, or repair status." },
      { title: "Interactive Card & List views", desc: "Prefer lists? Switch effortlessly between the fully responsive OpenStreetMap layer and a clean card grid layout." }
    ],
    steps: [
      "Open the live map screen via your sidebar or header.",
      "Explore the interactive pins or toggle the 'Heatmap ON' button.",
      "Click any pinpoint to slide out the detailed verification panel containing reports, photos, and comments."
    ],
    ctaPath: "/map"
  },
  reporting: {
    title: "Precision Reporting",
    subtitle: "Log road hazards in under 60 seconds with pinpoint GPS verification.",
    longDesc: "Reporting a road hazard should never be a slow municipal chore. Precision Reporting offers a streamlined, step-by-step submission form designed for mobile-first speeds, ensuring that anyone can log safety hazards securely on the fly.",
    themeColor: "text-orange-500",
    bgAccent: "bg-orange-500/5",
    borderAccent: "border-orange-500/20",
    gradient: "from-orange-600 to-amber-500",
    shadow: "shadow-orange-500/20",
    badge: "GPS Pinpoint Submissions",
    icon: Camera,
    highlights: [
      { title: "Pinpoint Location Tagging", desc: "Our system detects browser-level GPS coordinates automatically, guaranteeing that local crews know exactly where to travel." },
      { title: "Visual Photo Evidence", desc: "Attach high-quality photo evidence of the pothole or flood to provide crucial visual context to repair assignees." },
      { title: "Categorization Engine", desc: "Intuitively tag hazards across standardized categories including Infrastructure, Construction, Animal Warnings, or Debris." }
    ],
    steps: [
      "Select 'New Report' from your dashboard.",
      "Tag the coordinates by clicking on the custom map picker or let GPS identify it.",
      "Upload photo evidence, provide a description, and submit instantly."
    ],
    ctaPath: "/report-hazard"
  },
  consensus: {
    title: "Community Consensus",
    subtitle: "Crowdsourcing priority repair work through local citizen verification.",
    longDesc: "Leverage the power of community verification. RoadAware empowers local neighborhoods to upvote valid reports, flag duplicates, and comment on ongoing issues, ensuring public works departments receive clean, vetted, and high-impact reports.",
    themeColor: "text-emerald-500",
    bgAccent: "bg-emerald-505/5",
    borderAccent: "border-emerald-500/20",
    gradient: "from-emerald-600 to-teal-500",
    shadow: "shadow-emerald-500/20",
    badge: "Verified Consensus Engine",
    icon: ThumbsUp,
    highlights: [
      { title: "Democratic Upvoting", desc: "Citizens cast upvotes on critical issues, dynamically rearranging the municipal queue to address major safety concerns first." },
      { title: "Live Feedback Threads", desc: "Engage in transparent comment sections to share local updates, verify repairs, or alert neighbors of changes." },
      { title: "Zero Duplication Noise", desc: "The platform encourages verification of existing nearby pins over submitting identical reports, keeping map data completely clean." }
    ],
    steps: [
      "Browse active citizen hazard listings on the hazard feed.",
      "Support and upvote reports matching issues you've personally witnessed.",
      "Leave helpful comments or status updates on active threads."
    ],
    ctaPath: "/my-reports"
  },
  dashboard: {
    title: "Authorities Dashboard",
    subtitle: "Enterprise-grade council portal for real-time municipal dispatch.",
    longDesc: "Give municipal departments and public works teams the interface they need to streamline daily operations. The Authorities Dashboard converts crowdsourced citizen reporting into a high-octane dispatch, resource allocation, and tracking hub.",
    themeColor: "text-purple-500",
    bgAccent: "bg-purple-500/5",
    borderAccent: "border-purple-500/20",
    gradient: "from-purple-600 to-indigo-500",
    shadow: "shadow-purple-500/20",
    badge: "Municipal Control Room",
    icon: Activity,
    highlights: [
      { title: "Vibrant Workflows", desc: "Move hazards logically through custom states: 'Reported', 'Assigned', 'In Progress', and 'Resolved', updating citizens automatically." },
      { title: "Comprehensive Data Analytics", desc: "Track average response times, category frequencies, resolution trends, and public satisfaction rates." },
      { title: "Dispatch Coordination Map", desc: "Monitor reports on an administrative map layer, assigning repair crews to cluster zones to save fuel and travel time." }
    ],
    steps: [
      "Log in through the secure administrative council portal.",
      "Review the prioritised report queue curated by community upvotes.",
      "Assign internal repair assets and toggle statuses to update the public."
    ],
    ctaPath: "/login"
  }
};

export default function FeatureDetail() {
  const { featureKey } = useParams();
  const navigate = useNavigate();

  const data = FEATURE_DATA[featureKey];

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
        <AlertCircle size={48} className="text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Feature Not Found</h2>
        <p className="text-slate-500 mb-6">The requested detailed feature page does not exist or has been modified.</p>
        <button 
          onClick={() => navigate('/features')} 
          className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors"
        >
          Back to Features
        </button>
      </div>
    );
  }

  const Icon = data.icon;

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans text-gray-900 pb-24 selection:bg-blue-100 selection:text-blue-900">
      {/* Hero Section */}
      <section className="relative pt-40 pb-36 overflow-hidden bg-[#050505] text-white">
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-orange-600/10 rounded-full blur-[100px]" />
          <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[140px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <Link 
              to="/features" 
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors mb-8 group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Features
            </Link>
            
            <div className="flex items-center gap-3 mb-6">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${data.bgAccent} border ${data.borderAccent} ${data.themeColor} text-xs font-bold uppercase tracking-wider`}>
                <Sparkles size={12} /> {data.badge}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1] mb-6">
              Empowering road safety with <span className={`text-transparent bg-clip-text bg-gradient-to-r ${data.gradient}`}>{data.title}</span>.
            </h1>
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl">
              {data.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Detail Content Section */}
      <section className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Description & Highlights */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[32px] p-8 md:p-12 border border-slate-100 shadow-xl shadow-slate-100/20">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Deep Dive</h2>
              <p className="text-slate-600 leading-relaxed mb-10 text-base">
                {data.longDesc}
              </p>
              
              <div className="border-t border-slate-100 pt-10">
                <h3 className="text-xl font-bold text-slate-900 mb-8">Technical & Operational Highlights</h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  {data.highlights.map((hl, idx) => (
                    <div key={idx} className="bg-slate-50/50 rounded-2xl p-6 border border-slate-100/80 hover:bg-slate-50 transition-colors">
                      <div className={`w-10 h-10 rounded-xl ${data.bgAccent} ${data.borderAccent} border flex items-center justify-center mb-4`}>
                        <CheckCircle2 className={data.themeColor} size={20} />
                      </div>
                      <h4 className="font-bold text-slate-900 mb-2">{hl.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{hl.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Steps / Process */}
            <div className="bg-white rounded-[32px] p-8 md:p-12 border border-slate-100 shadow-xl shadow-slate-100/20">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">How It Works</h2>
              <div className="relative border-l-2 border-slate-100 pl-8 ml-4 space-y-10 py-2">
                {data.steps.map((step, idx) => (
                  <div key={idx} className="relative">
                    {/* Circle Pin */}
                    <div className={`absolute -left-[45px] top-1 w-8 h-8 rounded-full ${data.bgAccent} border ${data.borderAccent} border-2 flex items-center justify-center text-sm font-bold ${data.themeColor} bg-white shadow-sm`}>
                      {idx + 1}
                    </div>
                    <p className="text-slate-600 font-medium text-sm leading-relaxed md:text-base">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Info & Action */}
          <div className="space-y-8">
            <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-xl shadow-slate-100/20 text-center flex flex-col items-center">
              <div className={`w-20 h-20 rounded-3xl ${data.bgAccent} ${data.borderAccent} border flex items-center justify-center mb-6`}>
                <Icon className={data.themeColor} size={40} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{data.title}</h3>
              <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-6">{data.badge}</p>
              
              <div className="w-full bg-slate-50 rounded-2xl p-5 border border-slate-100 text-left space-y-4 mb-8">
                <div className="flex items-center gap-3 text-xs font-semibold text-slate-600">
                  <Shield className={`${data.themeColor} shrink-0`} size={16} />
                  <span>Secure & Vetted Datasets</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-semibold text-slate-600">
                  <Target className={`${data.themeColor} shrink-0`} size={16} />
                  <span>Pinpoint Accuracy Enabled</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-semibold text-slate-600">
                  <Eye className={`${data.themeColor} shrink-0`} size={16} />
                  <span>100% System Accountability</span>
                </div>
              </div>

              <Link 
                to={data.ctaPath} 
                className={`w-full py-4 bg-gradient-to-r ${data.gradient} text-white font-bold rounded-2xl ${data.shadow} shadow-lg hover:opacity-95 transition-opacity flex items-center justify-center gap-2 group`}
              >
                Experience Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="bg-[#050505] rounded-[32px] p-8 border border-white/5 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-[40px] pointer-events-none" />
              <h3 className="text-lg font-bold mb-4 relative z-10">Need Assistance?</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-6 relative z-10">
                If you have questions about how RoadAware collects, sanitises, or secures hazard reports, explore our Help Center.
              </p>
              <Link to="/help-center" className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 group relative z-10">
                Help Center Support <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

import { ShieldAlert, Car, CloudRain, Moon, Bike, Eye, PhoneCall } from 'lucide-react';

export default function SafetyTips() {
  const tips = [
    {
      title: "Rain & Flooding",
      icon: CloudRain,
      color: "text-blue-500",
      bg: "bg-blue-50",
      border: "border-blue-100",
      content: "Reduce speed significantly during heavy rain to prevent hydroplaning. Never attempt to drive through flooded roads—water depth is easily misjudged and can sweep vehicles away. Always use your headlights in low visibility."
    },
    {
      title: "Nighttime Driving",
      icon: Moon,
      color: "text-indigo-500",
      bg: "bg-indigo-50",
      border: "border-indigo-100",
      content: "Visibility is drastically reduced at night. Dim your dashboard lights to reduce glare, avoid looking directly at oncoming headlights, and increase your following distance. Watch carefully for unlit pedestrians or cyclists."
    },
    {
      title: "Navigating Construction Zones",
      icon: ShieldAlert,
      color: "text-orange-500",
      bg: "bg-orange-50",
      border: "border-orange-100",
      content: "Stay alert for sudden stops, lane shifts, and workers on the road. Strictly adhere to reduced speed limits. Merge early when lanes are closed and avoid passing in construction zones."
    },
    {
      title: "Sharing the Road",
      icon: Bike,
      color: "text-green-500",
      bg: "bg-green-50",
      border: "border-green-100",
      content: "Always leave at least 3 feet of clearance when passing cyclists. Yield to pedestrians at crosswalks and intersections. Check your blind spots before opening car doors to avoid 'dooring' cyclists."
    },
    {
      title: "Handling Potholes & Debris",
      icon: Car,
      color: "text-red-500",
      bg: "bg-red-50",
      border: "border-red-100",
      content: "Keep your eyes scanning the road ahead. If you cannot safely swerve to avoid a pothole, slow down as much as possible before hitting it, and release the brakes right before impact to lessen the shock."
    },
    {
      title: "Distraction-Free Driving",
      icon: Eye,
      color: "text-purple-500",
      bg: "bg-purple-50",
      border: "border-purple-100",
      content: "Taking your eyes off the road for just 5 seconds at 55 mph is like driving the length of a football field blindfolded. Put your phone on 'Do Not Disturb' mode while driving and program your GPS before starting your trip."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-24">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 bg-white border-b border-gray-200 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 opacity-40 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <span className="text-green-600 font-bold text-xs tracking-widest uppercase mb-4 flex items-center justify-center gap-2">
            <ShieldAlert size={16} /> RoadAware Guidelines
          </span>
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 mb-6">
            Essential <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">Safety Tips</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-2xl mx-auto">
            Your safety is our top priority. Review these expert guidelines to navigate hazards safely and protect yourself and others on the road.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-6 -mt-8 relative z-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tips.map((tip, i) => {
            const Icon = tip.icon;
            return (
              <div key={i} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg shadow-gray-200/40 hover:-translate-y-2 transition-transform duration-300">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${tip.bg} ${tip.border} border`}>
                  <Icon className={tip.color} size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{tip.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {tip.content}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Emergency Info Block */}
      <section className="max-w-4xl mx-auto px-6 mt-24">
        <div className="bg-[#0f172a] rounded-3xl p-10 shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <PhoneCall size={120} className="text-white" />
          </div>
          <div className="relative z-10 md:w-2/3">
            <h2 className="text-3xl font-extrabold text-white mb-4">In Case of Emergency</h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              If a road hazard has caused an accident with injuries, or poses an immediate, life-threatening danger, do not wait for a RoadAware report to be processed.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-red-500/20 border border-red-500/30 text-red-100 px-6 py-3 rounded-xl font-bold flex items-center gap-2">
                <PhoneCall size={20} className="text-red-400" /> Dial 119 for Police
              </div>
              <div className="bg-orange-500/20 border border-orange-500/30 text-orange-100 px-6 py-3 rounded-xl font-bold flex items-center gap-2">
                <PhoneCall size={20} className="text-orange-400" /> Dial 1990 for Ambulance
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before You Drive Checklist */}
      <section className="max-w-4xl mx-auto px-6 mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Quick Pre-Drive Checklist</h2>
        <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-600 font-bold flex items-center justify-center">1</div>
              <div>
                <strong className="text-gray-900 block mb-1 text-lg">Check the Hazard Map</strong>
                <span className="text-gray-600 text-base">Open RoadAware before leaving to identify any reported blockages, flooding, or severe potholes on your route.</span>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-600 font-bold flex items-center justify-center">2</div>
              <div>
                <strong className="text-gray-900 block mb-1 text-lg">Check Tire Pressure & Lights</strong>
                <span className="text-gray-600 text-base">Ensure your tires are properly inflated for optimal grip and all headlights/taillights are functioning.</span>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-600 font-bold flex items-center justify-center">3</div>
              <div>
                <strong className="text-gray-900 block mb-1 text-lg">Secure Loose Items</strong>
                <span className="text-gray-600 text-base">Loose items can become dangerous projectiles if you need to brake suddenly to avoid a hazard.</span>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

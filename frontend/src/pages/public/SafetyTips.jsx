import React, { useState } from 'react';
import { 
  AlertTriangle, CloudRain, Moon, Hammer, ShieldCheck, Heart, Info, 
  ArrowRight, CheckCircle2, PhoneCall, AlertCircle, ShieldAlert, Bike, X, HelpCircle, ArrowDown 
} from 'lucide-react';

const DETAILED_GUIDES = {
  "Rain & Flooding": [
    { title: "Reduce Your Velocity", desc: "Cut your average speed by at least 10–15 mph. Hydroplaning occurs when a layer of water builds between your tires and the road, causing a complete loss of traction. This can happen at speeds as low as 35 mph on wet asphalt." },
    { title: "Avoid Standing Water", desc: "Never attempt to drive through flooded roadways or deep puddles. Just six inches of standing water can stall your engine or sweep away small passenger vehicles. Turn around and seek an alternative route." },
    { title: "Maximize Distance Buffers", desc: "Increase your following distance to at least 5–6 seconds. Wet braking surfaces require double the stopping distance compared to dry roads, giving you much needed room to respond." },
    { title: "Activate Headlights", desc: "Turn on your low-beam headlights. This is legally required in most regions during rainfall and ensures other motorists can see your outline in low-contrast conditions." }
  ],
  "Nighttime Driving": [
    { title: "Dim Cabin Displays", desc: "Dim your digital instrument cluster and infotainment screens to their lowest comfortable settings. Bright interior lights restrict your eyes' natural ability to adjust to pitch-dark road conditions." },
    { title: "Avoid Direct Headlight Glare", desc: "When oncoming drivers fail to dim their high beams, look toward the solid white line on the left side of your lane rather than directly into the oncoming headlights to prevent flash blindness." },
    { title: "Keep Windshields Pristine", desc: "Regularly clean the interior and exterior of your windshield. Dust buildup scatters oncoming light and generates severe glare that heavily reduces visibility." },
    { title: "Monitor the Shoulders", desc: "Keep your eyes sweeping the roadsides. Look for the glint of wildlife eyes reflecting your headlights or pedestrians walking along dark shoulders." }
  ],
  "Construction Zones": [
    { title: "strictly Obey Speed Limits", desc: "Strictly adhere to posted construction speed limits. Fines are legally doubled or tripled in active zones to ensure the safety of road crews working close to traffic lanes." },
    { title: "Expect Sudden Merges & Stops", desc: "Expect lanes to merge early and abruptly. Watch for hand signals from traffic controllers or digital message boards, and leave extra space for lead vehicles to stop." },
    { title: "Maintain Concrete Buffers", desc: "Avoid tailgating heavy equipment or hugging concrete barriers closely. Construction sites feature visual obstructions and moving machinery that require large safety margins." },
    { title: "Watch for Active Workers", desc: "Keep your high beams down and scan carefully. Road workers often carry out repairs just inches from active travel lanes, especially during night shifts." }
  ],
  "Sharing the Road": [
    { title: "Provide 3 Feet Clearance", desc: "When passing or overtaking cyclists, always provide a minimum of three feet of lateral clearance. If the lane is too narrow, wait behind the cyclist until it is safe to pass." },
    { title: "Perform the 'Dutch Reach'", desc: "When parking on parallel streets, open your car door with your far hand (the left hand for drivers). This naturally forces you to turn your body and check your mirror for approaching cyclists." },
    { title: "Yield Fully at Pedestrian Crosswalks", desc: "Always stop completely before designated crosswalk lines when pedestrians are active. Check blind spots and make eye contact to verify their path is secure." },
    { title: "Avoid Dooring Hazards", desc: "Double check your side mirrors before opening passenger doors. A door opened into the path of an oncoming cyclist can result in critical, life-threatening collisions." }
  ],
  "Pothole Awareness": [
    { title: "Do Not Slam Your Brakes", desc: "If you cannot safely avoid a pothole, do not slam on your brakes directly over it. Braking compresses your front suspension, concentrating the impact forces and heavily damaging your rims and struts." },
    { title: "Secure a Two-Handed Grip", desc: "Hold your steering wheel firmly with both hands (10-and-2 or 9-and-3 position) when crossing rough roads. Heavy impacts can tear the wheel out of your hands, causing sudden lane drifts." },
    { title: "Maintain Optimal Tire Pressure", desc: "Underinflated tires leave your wheel rims vulnerable to direct metal impacts on potholes, causing pinch-flats, sidewall bubbles, and bent alloy structures." },
    { title: "Safely Report the Hazard", desc: "Pull over to a secure location when possible and use the RoadAware application to report the pothole coordinate location. Your ticket helps city crews schedule repairs." }
  ]
};

export default function SafetyTips() {
  const [selectedTip, setSelectedTip] = useState(null);

  const safetyTips = [
    {
      title: "Rain & Flooding",
      desc: "Turn on headlights, increase following distance, and avoid standing water. Hydroplaning can occur at speeds as low as 35mph.",
      icon: CloudRain,
      color: "text-blue-500",
      bg: "bg-blue-50",
      border: "border-blue-100",
      severity: "High Alert"
    },
    {
      title: "Nighttime Driving",
      desc: "Clean your windshield and headlights. Be extra vigilant for pedestrians and animals. Avoid looking directly at oncoming brights.",
      icon: Moon,
      color: "text-indigo-500",
      bg: "bg-indigo-50",
      border: "border-indigo-100",
      severity: "Vigilance"
    },
    {
      title: "Construction Zones",
      desc: "Stay alert for sudden stops and workers. Strictly adhere to reduced speed limits and merge early when lanes are closed.",
      icon: ShieldAlert,
      color: "text-orange-500",
      bg: "bg-orange-50",
      border: "border-orange-100",
      severity: "Caution"
    },
    {
      title: "Sharing the Road",
      desc: "Leave at least 3 feet of clearance when passing cyclists. Yield to pedestrians and check blind spots before opening doors.",
      icon: Bike,
      color: "text-green-500",
      bg: "bg-green-50",
      border: "border-green-100",
      severity: "Community"
    },
    {
      title: "Pothole Awareness",
      desc: "If you can't avoid a pothole, don't brake hard while driving over it. This can cause more damage to your suspension.",
      icon: Hammer,
      color: "text-red-500",
      bg: "bg-red-50",
      border: "border-red-100",
      severity: "Risk"
    }
  ];

  const handleClose = () => {
    setSelectedTip(null);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 pb-24 selection:bg-orange-100 selection:text-orange-900">
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden bg-[#050505] text-white">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px] -mr-64 -mt-64" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[100px] -ml-64 -mb-64" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold tracking-widest uppercase mb-8">
            <ShieldCheck size={14} /> Drive Safe
          </span>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
            Safety is our <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500">First Priority.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-12">
            Stay informed and prepared for any road condition. Our safety guidelines 
            are designed to keep you and your community protected.
          </p>
        </div>
      </section>

      {/* Main Tips Grid */}
      <section className="max-w-7xl mx-auto px-6 -mt-20 relative z-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {safetyTips.map((tip, i) => (
            <div 
              key={i} 
              onClick={() => setSelectedTip(tip)}
              className="group bg-white rounded-[32px] p-10 border border-gray-100 shadow-xl shadow-gray-200/40 hover:shadow-2xl hover:border-orange-100 transition-all duration-500 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-8">
                  <div className={`w-16 h-16 rounded-2xl ${tip.bg} ${tip.color} ${tip.border} border flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                    <tip.icon size={32} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-red-500 bg-red-50 px-3 py-1 rounded-full">
                    {tip.severity}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors">{tip.title}</h3>
                <p className="text-gray-500 leading-relaxed mb-8 text-sm">{tip.desc}</p>
              </div>
              <div className="pt-6 border-t border-gray-50 flex items-center gap-2 text-sm font-bold text-gray-400 group-hover:text-orange-600 transition-colors">
                <span>Read Detailed Guide</span> <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Checklist Section */}
      <section className="py-32 max-w-7xl mx-auto px-6">
        <div className="bg-gray-50 rounded-[48px] p-12 md:p-20 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-black text-gray-900 mb-8 leading-tight">
              The RoadAware <br />
              <span className="text-orange-600">Pre-Drive Checklist.</span>
            </h2>
            <div className="space-y-6">
              {[
                "Check tire pressure and tread depth.",
                "Verify all lights and signals are working.",
                "Ensure your windshield is clean and clear.",
                "Check fuel or battery levels before long trips.",
                "Open the RoadAware map to check your route."
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <CheckCircle2 className="text-green-500 mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-700 font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-orange-600/20 blur-[100px] -z-10 group-hover:bg-orange-600/30 transition-all" />
            <div className="bg-white p-12 rounded-[48px] border border-gray-100 shadow-2xl">
              <AlertCircle className="text-orange-500 mb-6" size={48} />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">See a Hazard?</h3>
              <p className="text-gray-500 mb-8 leading-relaxed text-sm">
                If you encounter a road hazard, safely pull over and report it using the 
                RoadAware app. Your report could prevent the next accident.
              </p>
              <a href="/report-hazard" className="inline-flex items-center justify-center px-8 py-4 bg-orange-600 text-white font-bold rounded-2xl hover:bg-orange-700 transition-all shadow-xl shadow-orange-900/20 text-center">
                Report a Hazard
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-red-600 rounded-[48px] p-12 md:p-20 text-white relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[80px] -mr-32 -mt-32" />
          <h2 className="text-4xl font-black mb-8">In Case of Emergency</h2>
          <p className="text-red-100 max-w-2xl mx-auto mb-12 text-lg leading-relaxed">
            If you've been involved in an accident or witness a life-threatening situation, 
            contact emergency services immediately. Do not use this app for emergencies.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="tel:119" className="px-10 py-5 bg-white text-red-600 font-black rounded-2xl hover:bg-red-50 transition-all flex items-center gap-3 shadow-2xl shadow-black/20">
              <PhoneCall size={24} /> Call Emergency (119)
            </a>
          </div>
        </div>
      </section>

      {/* Detailed Guide Drawer Modal */}
      {selectedTip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
          <div className="bg-white rounded-[32px] p-8 md:p-10 border border-gray-100 shadow-2xl max-w-2xl w-full relative max-h-[85vh] overflow-y-auto transform scale-100 transition-all duration-300">
            {/* Close Button */}
            <button 
              onClick={handleClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-colors"
            >
              <X size={20} />
            </button>

            <div>
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 rounded-2xl ${selectedTip.bg} ${selectedTip.color} ${selectedTip.border} border flex items-center justify-center`}>
                  {React.createElement(selectedTip.icon, { size: 28 })}
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-red-500 bg-red-50 px-2.5 py-0.5 rounded-full border border-red-100">
                    {selectedTip.severity} Protocol
                  </span>
                  <h3 className="text-2xl font-black text-gray-900 mt-0.5">{selectedTip.title} Guide</h3>
                </div>
              </div>

              {/* Main Content */}
              <div className="pt-6 border-t border-gray-100 space-y-6">
                <p className="text-slate-500 leading-relaxed font-medium text-sm md:text-base">
                  When driving during {selectedTip.title.toLowerCase()}, prioritizing safety keeps you and nearby drivers out of danger. Follow this official 4-step action plan carefully:
                </p>

                <div className="grid gap-6">
                  {DETAILED_GUIDES[selectedTip.title]?.map((item, idx) => (
                    <div key={idx} className="flex gap-4 p-5 rounded-2xl bg-slate-50/50 border border-slate-100/80">
                      <div className={`w-8 h-8 rounded-lg ${selectedTip.bg} ${selectedTip.color} ${selectedTip.border} border font-black text-sm flex items-center justify-center shrink-0`}>
                        {idx + 1}
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-gray-900 text-base">{item.title}</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 text-xs text-slate-400 flex items-center gap-3 mt-6">
                  <CheckCircle2 className="text-green-500 shrink-0" size={16} />
                  <span>Always check local traffic reports and weather advisories before starting your journey.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

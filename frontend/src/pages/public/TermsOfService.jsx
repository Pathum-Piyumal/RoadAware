import { Scale, FileText, CheckCircle2, AlertTriangle, ShieldAlert, Gavel, Hammer, ArrowRight } from 'lucide-react';

export default function TermsOfService() {
  const lastUpdated = "May 16, 2026";

  const pillars = [
    {
      title: "Responsible Use",
      desc: "Users must report only genuine hazards. False reporting or spamming is strictly prohibited and may result in account termination.",
      icon: CheckCircle2,
      color: "text-green-500",
      bg: "bg-green-50"
    },
    {
      title: "Data Ownership",
      desc: "By uploading images and reports, you grant RoadAware a license to share this data with authorities and the general public.",
      icon: FileText,
      color: "text-blue-500",
      bg: "bg-blue-50"
    },
    {
      title: "Liability Limit",
      desc: "RoadAware provides infrastructure information but is not responsible for road maintenance or accidents resulting from hazards.",
      icon: AlertTriangle,
      color: "text-orange-500",
      bg: "bg-orange-50"
    },
    {
      title: "Community Conduct",
      desc: "Respect other users and authorities. Harassment or abusive language in comments or reports will not be tolerated.",
      icon: Gavel,
      color: "text-purple-500",
      bg: "bg-purple-50"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-24 selection:bg-orange-100 selection:text-orange-900">
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden bg-[#050505] text-white text-center">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px] -mr-64 -mt-64" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold tracking-widest uppercase mb-8">
            <Scale size={14} /> Agreement
          </span>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
            Terms of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">Service.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-4">
            By using RoadAware, you agree to follow these rules and guidelines 
            to help us keep the community safe and informed.
          </p>
          <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">
            Last Updated: {lastUpdated}
          </div>
        </div>
      </section>

      {/* Pillar Cards */}
      <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => (
            <div key={i} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl shadow-gray-200/30 hover:shadow-2xl transition-all duration-300">
              <div className={`w-14 h-14 rounded-2xl ${pillar.bg} ${pillar.color} flex items-center justify-center mb-6`}>
                <pillar.icon size={28} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{pillar.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Detailed Content */}
      <section className="max-w-4xl mx-auto px-6 py-32">
        <div className="bg-white rounded-[48px] border border-gray-100 p-10 md:p-16 shadow-sm space-y-16">
          
          <div className="space-y-6">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">1. Acceptable Use</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                RoadAware is designed to improve road safety through community vigilance. You agree to use the platform only for its intended purpose. 
                Any misuse of the platform, including but not limited to the following, is strictly prohibited:
              </p>
              <ul className="list-disc pl-5 space-y-3">
                <li>Submit false, misleading, or duplicate hazard reports.</li>
                <li>Using the platform to harass, stalk, or harm another person.</li>
                <li>Attempting to bypass security protocols or reverse-engineer the application.</li>
                <li>Scraping data from the platform without explicit authorization.</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">2. Information Accuracy</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                While RoadAware strives for high data accuracy, we do not guarantee that the information on our platform is 100% correct. 
                The platform relies on user-generated content and third-party data providers.
              </p>
              <div className="p-6 bg-orange-50 rounded-[24px] border border-orange-100 flex items-start gap-4">
                <ShieldAlert className="text-orange-600 flex-shrink-0 mt-1" size={20} />
                <p className="text-sm text-orange-900 font-medium">
                  Disclaimer: Always follow local traffic laws and exercise extreme caution when navigating near reported hazards. 
                  RoadAware is an informational tool, not a substitute for safe driving.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">3. User Contributions</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                When you submit a report, you grant RoadAware a worldwide, royalty-free, and non-exclusive license 
                to use, reproduce, modify, and distribute that content. This is necessary for us to share your findings 
                with the community and local authorities.
              </p>
            </div>
          </div>

          <div className="pt-12 border-t border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Legal Inquiries</h2>
            <div className="bg-gray-50 rounded-[32px] p-8 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
              <p className="text-gray-500 font-medium text-center md:text-left">
                For any legal concerns, copyright claims, or partnership inquiries.
              </p>
              <a href="mailto:legal@roadaware.com" className="px-8 py-4 bg-[#050505] text-white font-bold rounded-2xl hover:bg-orange-600 transition-all flex items-center gap-2 whitespace-nowrap shadow-xl">
                legal@roadaware.com <ArrowRight size={18} />
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

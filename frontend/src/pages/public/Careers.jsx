import { Briefcase, MapPin, Clock, ArrowRight, Heart, Zap, Coffee, Globe } from 'lucide-react';

export default function Careers() {
  const jobs = [
    {
      title: "Senior Full-Stack Engineer",
      department: "Engineering",
      location: "Remote (Global)",
      type: "Full-time",
      description: "Help build the scalable infrastructure that powers real-time hazard mapping for millions of users."
    },
    {
      title: "Product Designer",
      department: "Design",
      location: "Colombo, Sri Lanka",
      type: "Full-time",
      description: "Create intuitive, accessible, and beautiful experiences that encourage citizens to report hazards easily."
    },
    {
      title: "Data Analyst",
      department: "Data Science",
      location: "Remote",
      type: "Full-time",
      description: "Analyze hazard patterns and community reporting behavior to provide actionable insights for local authorities."
    },
    {
      title: "Community Manager",
      department: "Marketing",
      location: "Colombo, Sri Lanka",
      type: "Part-time",
      description: "Engage with our active user base and help build trust between citizens and local government bodies."
    }
  ];

  const benefits = [
    { icon: Globe, title: "Work Anywhere", desc: "Remote-first culture with flexible hours." },
    { icon: Heart, title: "Health & Wellness", desc: "Comprehensive premium health coverage." },
    { icon: Zap, title: "Impactful Work", desc: "Build products that directly save lives." },
    { icon: Coffee, title: "Growth Budget", desc: "Annual stipend for courses and conferences." }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-24">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 bg-white border-b border-gray-200">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100 opacity-30 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <span className="text-orange-600 font-bold text-xs tracking-widest uppercase mb-4 block">Careers at RoadAware</span>
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 mb-6">
            Build technology that <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">saves lives.</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
            Join a passionate team dedicated to making our streets safer through transparency, 
            technology, and community collaboration.
          </p>
          <a href="#open-roles" className="inline-flex items-center px-6 py-3 bg-[#0f172a] text-white font-semibold rounded-xl shadow-md hover:bg-[#1e293b] transition-all">
            View Open Roles <ArrowRight className="ml-2" size={18} />
          </a>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why work with us?</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">We believe in taking care of our people so they can focus on doing the best work of their lives.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center">
                <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Icon size={24} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{b.title}</h3>
                <p className="text-sm text-gray-500">{b.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Open Roles Section */}
      <section id="open-roles" className="max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Open Roles</h2>
          <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold border border-orange-200">
            {jobs.length} Positions
          </span>
        </div>

        <div className="space-y-4">
          {jobs.map((job, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all group flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{job.department}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">{job.title}</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed max-w-2xl">{job.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={16} /> {job.location}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={16} /> {job.type}
                  </div>
                </div>
              </div>
              <div>
                <button className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-gray-50 text-gray-400 group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors">
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 mt-32 text-center">
        <div className="bg-[#0f172a] rounded-3xl p-12 shadow-xl">
          <h2 className="text-3xl font-extrabold text-white mb-4">Don't see a fit?</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            We are always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
          </p>
          <a href="mailto:careers@roadaware.com" className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#0f172a] font-bold rounded-xl shadow-sm hover:bg-gray-100 transition-colors">
            Email Resume
          </a>
        </div>
      </section>
    </div>
  );
}

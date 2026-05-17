import React, { useState } from 'react';
import { Briefcase, MapPin, Clock, ArrowRight, Star, Heart, Coffee, Globe, Rocket, Users, X, CheckCircle2 } from 'lucide-react';

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', portfolio: '', coverLetter: '' });
  const [submitted, setSubmitted] = useState(false);

  const jobs = [
    {
      title: "Senior Full Stack Engineer",
      department: "Engineering",
      location: "Colombo / Remote",
      type: "Full-time",
      salary: "$60k - $90k",
      tags: ["React", "Node.js", "PostgreSQL"]
    },
    {
      title: "Product Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      salary: "$45k - $70k",
      tags: ["Figma", "UI/UX", "User Research"]
    },
    {
      title: "Data Scientist (Geospatial)",
      department: "Data Science",
      location: "Colombo, SL",
      type: "Contract",
      salary: "$40/hr - $60/hr",
      tags: ["Python", "GIS", "Machine Learning"]
    },
    {
      title: "Community Outreach Lead",
      department: "Marketing",
      location: "Hybrid",
      type: "Full-time",
      salary: "$30k - $50k",
      tags: ["Strategy", "Events", "Public Relations"]
    }
  ];

  const perks = [
    { icon: Globe, title: "Remote First", desc: "Work from anywhere in the world." },
    { icon: Heart, title: "Health & Wellness", desc: "Full medical coverage for you and your family." },
    { icon: Coffee, title: "Work-Life Balance", desc: "Unlimited PTO and flexible working hours." },
    { icon: Star, title: "Growth Budget", desc: "$2,000 annual budget for courses and books." }
  ];

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setSubmitted(false);
    setFormData({ name: '', email: '', portfolio: '', coverLetter: '' });
  };

  const handleClose = () => {
    setSelectedJob(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 pb-24 selection:bg-orange-100 selection:text-orange-900">
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden bg-[#050505] text-white">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[120px] -mr-32 -mt-32" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold tracking-widest uppercase mb-8">
              <Rocket size={14} className="fill-current" /> Join the Revolution
            </span>
            <h1 className="text-6xl md:text-7xl font-black tracking-tighter leading-[1] mb-8">
              Help us build the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400 text-glow-orange">Future of Infrastructure.</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed mb-10">
              We're a team of designers, engineers, and dreamers building the 
              tools that keep cities moving and citizens safe.
            </p>
          </div>
        </div>
      </section>

      {/* Perks Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {perks.map((perk, i) => (
            <div key={i} className="p-8 rounded-[32px] bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <perk.icon className="text-orange-500" size={24} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{perk.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{perk.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-black text-gray-900 tracking-tight">
                Our culture is defined by <br />
                <span className="text-orange-600">Impact & Transparency.</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                At RoadAware, we don't just write code. We solve real-world problems 
                that affect millions of people every day. We value ownership, 
                radical candor, and the relentless pursuit of excellence.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-3xl font-black text-gray-900 mb-1">100%</div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Distributed Team</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-gray-900 mb-1">4.9/5</div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Glassdoor Rating</div>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-orange-600/20 blur-[80px] -z-10 group-hover:bg-orange-600/30 transition-all" />
              <div className="bg-white p-12 rounded-[48px] border border-gray-100 shadow-2xl relative overflow-hidden">
                <Users className="text-orange-500/10 absolute -right-8 -bottom-8 w-64 h-64" />
                <h3 className="text-2xl font-bold text-gray-900 mb-6">"I joined RoadAware to build things that actually matter. The mission is what gets me up every morning."</h3>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full" />
                  <div>
                    <div className="font-bold text-gray-900">Sarah Jenkins</div>
                    <div className="text-sm text-gray-500">Lead Product Designer</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job List */}
      <section className="py-32 max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 mb-4">Current Openings</h2>
          <p className="text-gray-500">Find your place in our growing team.</p>
        </div>

        <div className="space-y-6">
          {jobs.map((job, idx) => (
            <div key={idx} className="group bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                    {job.department}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {job.type}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">{job.title}</h3>
                <div className="flex items-center gap-6 text-sm text-gray-500 font-medium">
                  <div className="flex items-center gap-2"><MapPin size={16} className="text-gray-400" /> {job.location}</div>
                  <div className="flex items-center gap-2"><Clock size={16} className="text-gray-400" /> {job.salary}</div>
                </div>
              </div>
              <button 
                onClick={() => handleApplyClick(job)}
                className="px-8 py-3 bg-gray-900 text-white font-bold rounded-2xl hover:bg-orange-600 transition-all flex items-center gap-2 whitespace-nowrap"
              >
                Apply Now <ArrowRight size={18} />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Spontaneous Application */}
      <section className="max-w-7xl mx-auto px-6 mt-12">
        <div className="bg-[#050505] rounded-[48px] p-12 md:p-20 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-orange-600/10 rounded-full blur-[80px] -ml-16 -mt-16" />
          <h2 className="text-4xl font-black mb-6">Don't see a fit?</h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
            We're always looking for talented individuals to join our journey. 
            Send your resume to our talent team and we'll be in touch.
          </p>
          <a href="mailto:careers@roadaware.com" className="inline-flex items-center gap-2 px-10 py-4 bg-orange-600 text-white font-bold rounded-2xl hover:bg-orange-700 transition-all shadow-xl shadow-orange-900/20">
            Email Resume <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* Dynamic Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
          <div className="bg-white rounded-[32px] p-8 md:p-10 border border-gray-100 shadow-2xl max-w-lg w-full relative max-h-[90vh] overflow-y-auto transform scale-100 transition-transform duration-300">
            {/* Close Button */}
            <button 
              onClick={handleClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-colors"
            >
              <X size={20} />
            </button>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                    {selectedJob.department}
                  </span>
                  <h3 className="text-2xl font-black text-gray-900 mt-3">Apply for {selectedJob.title}</h3>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <MapPin size={12} /> {selectedJob.location} • {selectedJob.type}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Full Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-3 px-4 text-sm text-gray-900 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Email Address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-3 px-4 text-sm text-gray-900 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Resume / Portfolio Link</label>
                    <input 
                      type="url" 
                      required
                      placeholder="https://github.com/johndoe"
                      value={formData.portfolio}
                      onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-3 px-4 text-sm text-gray-900 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Why do you want to join RoadAware?</label>
                    <textarea 
                      rows="3"
                      required
                      placeholder="Tell us about your passion for safety and building infrastructure..."
                      value={formData.coverLetter}
                      onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-3 px-4 text-sm text-gray-900 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all resize-none"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-2xl shadow-lg shadow-orange-950/20 transition-all flex items-center justify-center gap-2"
                >
                  Submit Application <ArrowRight size={18} />
                </button>
              </form>
            ) : (
              <div className="py-8 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 mb-6">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">Application Received!</h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-sm mb-8">
                  Thank you for applying to be our next <strong className="text-gray-900">{selectedJob.title}</strong>. Our recruiting team will review your application and contact you soon!
                </p>
                <button 
                  onClick={handleClose}
                  className="px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl transition-colors"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

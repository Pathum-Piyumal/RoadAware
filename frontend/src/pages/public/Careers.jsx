import React, { useState, useEffect, useRef } from 'react';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Star, 
  Heart, 
  Coffee, 
  Globe, 
  Rocket, 
  Users, 
  X, 
  CheckCircle2, 
  UploadCloud, 
  FileText, 
  AlertCircle,
  Phone,
  Mail,
  User,
  Link as LinkIcon
} from 'lucide-react';
import toast from 'react-hot-toast';
import CareersService from '../../services/careers.service';
import { useAuthModal } from '../../context/AuthModalContext';
import AuthService from '../../services/auth.service';

// Viewport Scroll Reveal Component with Delay Staggering & Gentle 16px Offset
const ScrollReveal = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });
    
    if (domRef.current) {
      observer.observe(domRef.current);
    }
    
    return () => {
      if (domRef.current) {
        observer.unobserve(domRef.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={domRef}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'opacity, transform'
      }}
    >
      {children}
    </div>
  );
};

export default function Careers() {
  const { openLogin } = useAuthModal();
  const currentUser = AuthService.getCurrentUser();

  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: '',
    portfolio: '',
    coverLetter: '',
    cv: null
  });
  const [cvFile, setCvFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

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
    if (!currentUser) {
      toast.error('Please log in first to apply for a job position.');
      openLogin();
      return;
    }

    setSelectedJob(job);
    setSubmitted(false);
    setErrorMsg('');
    setCvFile(null);
    setFormData({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phone: '',
      portfolio: '',
      coverLetter: '',
      cv: null
    });
  };

  const handleSpontaneousApply = () => {
    if (!currentUser) {
      toast.error('Please log in first to submit your CV.');
      openLogin();
      return;
    }

    setSelectedJob({
      title: "General Application / Spontaneous",
      department: "General Talent Pool",
      location: "Remote / Hybrid",
      type: "Flexible"
    });
    setSubmitted(false);
    setErrorMsg('');
    setCvFile(null);
    setFormData({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phone: '',
      portfolio: '',
      coverLetter: '',
      cv: null
    });
  };

  const handleClose = () => {
    setSelectedJob(null);
    setErrorMsg('');
    setCvFile(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file type (PDF, DOC, DOCX)
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const isValidExt = file.name.match(/\.(pdf|doc|docx)$/i);

    if (!validTypes.includes(file.type) && !isValidExt) {
      toast.error('Please upload a valid PDF, DOC, or DOCX document.');
      return;
    }

    // Check file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size exceeds 10MB limit.');
      return;
    }

    setCvFile(file);
    setFormData(prev => ({ ...prev, cv: file }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      toast.error('Please log in first to submit your job application.');
      openLogin();
      return;
    }

    if (!formData.name || !formData.email || !formData.coverLetter) {
      setErrorMsg('Please fill in all required fields (Name, Email, Cover Letter).');
      return;
    }

    if (!cvFile) {
      setErrorMsg('Please attach your CV / Resume (PDF or DOC file).');
      toast.error('CV / Resume PDF attachment is required.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('phone', formData.phone || '');
      data.append('portfolio', formData.portfolio || '');
      data.append('coverLetter', formData.coverLetter);
      data.append('jobTitle', selectedJob?.title || 'General Application');
      data.append('department', selectedJob?.department || 'General');
      data.append('cv', cvFile);

      await CareersService.applyJob(data);

      setSubmitted(true);
      toast.success('Job application & CV submitted successfully!');
    } catch (error) {
      console.error('Job application submission error:', error);
      const message = error.response?.data?.message || 'Failed to submit application. Please try again.';
      setErrorMsg(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 pb-24 selection:bg-orange-100 selection:text-orange-900">
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden bg-[#050505] text-white">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[120px] -mr-32 -mt-32" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl animate-fade-in-up">
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
            <ScrollReveal key={i} delay={i * 100}>
              <div className="p-8 rounded-[32px] bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-xl transition-all duration-300 h-full">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <perk.icon className="text-orange-500" size={24} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{perk.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{perk.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <ScrollReveal>
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
            </ScrollReveal>
            
            <ScrollReveal delay={150}>
              <div className="relative group">
                <div className="absolute inset-0 bg-orange-600/20 blur-[80px] -z-10 group-hover:bg-orange-600/30 transition-all" />
                <div className="bg-white p-12 rounded-[48px] border border-gray-100 shadow-2xl relative overflow-hidden">
                  <Users className="text-orange-500/10 absolute -right-8 -bottom-8 w-64 h-64 pointer-events-none" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">"I joined RoadAware to build things that actually matter. The mission is what gets me up every morning."</h3>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center font-bold text-orange-600">
                      SJ
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Sarah Jenkins</div>
                      <div className="text-sm text-gray-500">Lead Product Designer</div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Job List */}
      <section className="py-32 max-w-5xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Current Openings</h2>
            <p className="text-gray-500">Find your place in our growing team.</p>
          </div>
        </ScrollReveal>

        <div className="space-y-6">
          {jobs.map((job, idx) => (
            <ScrollReveal key={idx} delay={idx * 80}>
              <div className="group bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-8 h-full">
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
                  className="px-8 py-3 bg-gray-900 text-white font-bold rounded-2xl hover:bg-orange-600 transition-all flex items-center gap-2 whitespace-nowrap shadow-md"
                >
                  Apply Now <ArrowRight size={18} />
                </button>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Spontaneous Application Banner */}
      <section className="max-w-7xl mx-auto px-6 mt-12">
        <ScrollReveal>
          <div className="bg-[#050505] rounded-[48px] p-12 md:p-20 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-orange-600/10 rounded-full blur-[80px] -ml-16 -mt-16" />
            <h2 className="text-4xl font-black mb-6">Don't see a fit?</h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
              We're always looking for talented individuals to join our journey. 
              Upload your CV PDF directly to our talent team and we'll be in touch.
            </p>
            <button 
              onClick={handleSpontaneousApply}
              className="inline-flex items-center gap-2 px-10 py-4 bg-orange-600 text-white font-bold rounded-2xl hover:bg-orange-700 transition-all shadow-xl shadow-orange-900/20"
            >
              Submit Your CV <UploadCloud size={18} />
            </button>
          </div>
        </ScrollReveal>
      </section>

      {/* Dynamic Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-fade-in">
          <div className="bg-white rounded-[32px] p-6 md:p-8 border border-gray-100 shadow-2xl max-w-lg w-full relative max-h-[90vh] overflow-y-auto transform scale-100 transition-transform duration-300">
            {/* Close Button */}
            <button 
              onClick={handleClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-colors"
            >
              <X size={20} />
            </button>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                    {selectedJob.department}
                  </span>
                  <h3 className="text-2xl font-black text-gray-900 mt-2">Apply for {selectedJob.title}</h3>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <MapPin size={12} /> {selectedJob.location} • {selectedJob.type}
                  </p>
                </div>

                {errorMsg && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold flex items-center gap-2">
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="space-y-4 pt-2 border-t border-gray-100">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <User size={14} className="text-orange-500" /> Full Name <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm text-gray-900 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                    />
                  </div>

                  {/* Email & Phone Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                        <Mail size={14} className="text-orange-500" /> Email Address <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="email" 
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm text-gray-900 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                        <Phone size={14} className="text-orange-500" /> Phone Number
                      </label>
                      <input 
                        type="tel" 
                        placeholder="+94 77 123 4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm text-gray-900 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Portfolio / LinkedIn */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <LinkIcon size={14} className="text-orange-500" /> Portfolio / LinkedIn Link
                    </label>
                    <input 
                      type="url" 
                      placeholder="https://linkedin.com/in/johndoe or https://github.com/johndoe"
                      value={formData.portfolio}
                      onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm text-gray-900 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                    />
                  </div>

                  {/* CV / PDF File Upload Box */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <FileText size={14} className="text-orange-500" /> Attach Resume / CV (PDF) <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="file" 
                      id="cv-upload-input"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    
                    {!cvFile ? (
                      <label 
                        htmlFor="cv-upload-input" 
                        className="flex flex-col items-center justify-center p-5 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50/70 hover:bg-orange-50/50 hover:border-orange-400 cursor-pointer transition-all text-center group"
                      >
                        <UploadCloud size={32} className="text-slate-400 group-hover:text-orange-500 transition-colors mb-2" />
                        <span className="text-xs font-bold text-gray-700 group-hover:text-orange-600">
                          Click to upload your CV (PDF, DOC, DOCX)
                        </span>
                        <span className="text-[11px] text-gray-400 mt-1">Maximum file size: 10MB</span>
                      </label>
                    ) : (
                      <div className="flex items-center justify-between p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                            <FileText size={18} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-emerald-950 truncate">{cvFile.name}</p>
                            <p className="text-[10px] text-emerald-700 font-medium">{(cvFile.size / (1024 * 1024)).toFixed(2)} MB • Ready to attach</p>
                          </div>
                        </div>
                        <button 
                          type="button" 
                          onClick={() => { setCvFile(null); setFormData(prev => ({ ...prev, cv: null })); }}
                          className="p-1.5 text-emerald-700 hover:text-red-600 hover:bg-emerald-100 rounded-lg transition-colors"
                          title="Remove attached file"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Cover Letter */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Why do you want to join RoadAware? <span className="text-red-500">*</span>
                    </label>
                    <textarea 
                      rows="3"
                      required
                      placeholder="Tell us about your experience, passion for infrastructure, and why you're a great fit..."
                      value={formData.coverLetter}
                      onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm text-gray-900 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all resize-none"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-2xl shadow-lg shadow-orange-950/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                  {loading ? 'Sending Application & CV...' : 'Submit Application & CV'} {!loading && <ArrowRight size={18} />}
                </button>
              </form>
            ) : (
              <div className="py-8 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 mb-6">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">Application & CV Received! 🎉</h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-sm mb-6">
                  Thank you for applying for <strong className="text-gray-900">{selectedJob.title}</strong>. Your CV has been sent to our talent acquisition team email and a confirmation receipt has been sent to <strong className="text-gray-900">{formData.email}</strong>.
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

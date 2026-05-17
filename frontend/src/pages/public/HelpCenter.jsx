import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Shield, User, MessageCircle, ChevronDown, 
  ArrowRight, ArrowLeft, LifeBuoy, Zap, FileText, X, CheckCircle2, Sparkles, Mail, Tag, FileCheck
} from 'lucide-react';

const KNOWLEDGE_BASE = {
  "Getting Started": [
    {
      title: "Introduction to RoadAware",
      summary: "Learn about the mission of RoadAware and how crowdsourcing safety makes roads safer for everyone.",
      content: "RoadAware is a community-driven civic infrastructure platform designed to bridge the gap between active road users and public works crews. By allowing everyday drivers and pedestrians to log hazards immediately, we eliminate the slow, traditional municipal reporting bureaucracies. Our mission is to reduce traffic accidents, save public budget through early repairs, and foster collaborative, safer communities."
    },
    {
      title: "How to Create an Account",
      summary: "A simple step-by-step guide to signing up as a citizen, securing your profile, and verifying your email.",
      content: "Creating a citizen account is quick and secure: 1. Click 'Register' or 'Get Started' on any public page. 2. Input your Full Name, Email Address, and a secure password. 3. Check your inbox for a verification email. 4. Log in to gain access to reporting tools, dynamic live hazard maps, and comment sections. Verification helps ensure all community reports are highly accountable and verified."
    },
    {
      title: "Navigating the User Dashboard",
      summary: "Understand where to find your reported hazards, upvotes, profile configuration, and settings.",
      content: "Your Personal Citizen Dashboard is your control center: - 'My Reports' displays all hazards you have logged along with their live statuses ('Pending', 'Verified', 'In Progress', 'Resolved'). - The Upvote Tracker shows how many community members have validated your reports. - Profile Settings allow you to adjust personal contact information and customize your active municipal region."
    }
  ],
  "Reporting Hazards": [
    {
      title: "How to File a Perfect Report",
      summary: "Tips on providing accurate photos, choosing the correct hazard category, and tagging your exact GPS location.",
      content: "A premium hazard report contains three main ingredients: 1. Clear Photos: Take high-contrast pictures showing both the hazard and a bit of the surrounding street for context. 2. Precise Geolocation: Always allow location services when prompted, or manually refine the pin location. 3. Honest Classification: Choose the correct tag (e.g., Pothole, Flooding) so the right specialized department receives your ticket."
    },
    {
      title: "Supported Hazard Categories Explained",
      summary: "Learn when to classify a report as a Pothole, Flooding, Debris, Animal Warning, or Streetlight failure.",
      content: "RoadAware supports 8 core hazard types: - Pothole: Depressions or cracks in asphalt. - Flooding: Severe standing water blocking traffic. - Debris: Rocks, tree branches, or cargo blocking roads. - Streetlight: Broken street lamps causing low night visibility. - Construction: Unmarked worksites or missing safety barrels. - Ice/Snow: Hazardous slippery surfaces. - Animal: Wildlife crossing hazards. - Other: Any custom hazard."
    },
    {
      title: "Using GPS Location Picker",
      summary: "Troubleshoot browser geolocation permissions or manually pin your reports on the map.",
      content: "When submitting, RoadAware will ask for location access. If denied: 1. You can manually drag the orange map pin to the exact spot. 2. Check your phone or browser settings to ensure 'Location Access' is enabled for this website. Precise coordinates ensure municipal dispatch crews travel directly to the hazard without search delays."
    }
  ],
  "Account & Safety": [
    {
      title: "Managing Your Profile",
      summary: "How to update your display name, contact information, password, and active region.",
      content: "Keeping your profile updated is easy. Head over to the Profile page in the top right menu. Here, you can change your display name, update your email address, or update your password. We recommend updating your active region to receive relevant alerts when safety hazards are reported near you."
    },
    {
      title: "Privacy & Data Confidentiality",
      summary: "Read about how your personal details are strictly hidden from the public and shared only with verified dispatch crews.",
      content: "Your privacy is our number one priority. While hazard details, locations, and photo evidence are fully public on the Interactive Hazard Map, your personal identity, email address, and phone number are strictly hidden. Only verified city officials can see contact info if they need to follow up regarding a critical safety issue."
    }
  ],
  "Authorities Portal": [
    {
      title: "Authorities Portal Overview",
      summary: "An introduction for city council administrators on managing municipal reports and repair statuses.",
      content: "The Authorities Portal gives municipal public works teams powerful dispatch tools. City administrators can view the entire real-time citizen ticket queue, sort tickets by community upvote priority, assign crews, track repair progress, and analyze municipal safety performance trends."
    },
    {
      title: "Dispatching Crews and Tracking Status",
      summary: "Learn how to update hazard reports from 'Submitted' to 'In Progress' to 'Resolved'.",
      content: "Managing a hazard report workflow is simple: 1. Click any ticket in the admin console. 2. Assign repair crews to the location. 3. Update the ticket status to 'In Progress' to automatically notify the citizen. 4. Mark as 'Resolved' once repaired, updating the live map pin instantly to green."
    }
  ]
};

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

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFaq, setActiveFaq] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Live Support Desk States
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [ticketForm, setTicketForm] = useState({ name: '', email: '', category: 'General Inquiry', message: '' });
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const categories = [
    { title: "Getting Started", icon: Zap, count: 3, bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-100" },
    { title: "Reporting Hazards", icon: FileText, count: 3, bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-100" },
    { title: "Account & Safety", icon: Shield, count: 2, bg: "bg-green-50", text: "text-green-600", border: "border-green-100" },
    { title: "Authorities Portal", icon: User, count: 2, bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-100" }
  ];

  const faqs = [
    {
      q: "How do I report a road hazard?",
      a: "Simply log in to your account, click the 'Report Hazard' button on the navigation bar, select the hazard type, pin the location on the map, and upload a photo if available."
    },
    {
      q: "What happens after I submit a report?",
      a: "Your report is instantly visible on the live map. Authorities are notified based on the severity and upvote count. You can track the progress (Submitted → In Progress → Resolved) in your dashboard."
    },
    {
      q: "Is my personal data visible to other users?",
      a: "No. While your report location and images are public, your personal contact information (email, phone) is only accessible to verified authorities for follow-up if needed."
    }
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedArticle(null);
  };

  const handleClose = () => {
    setSelectedCategory(null);
    setSelectedArticle(null);
  };

  const handleOpenSupport = () => {
    setIsSupportOpen(true);
    setTicketSubmitted(false);
    setTicketForm({ name: '', email: '', category: 'General Inquiry', message: '' });
  };

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    const generatedId = `RA-${Math.floor(Math.random() * 9000) + 1000}`;
    setTicketId(generatedId);
    setTicketSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans text-gray-900 pb-24 selection:bg-blue-100 selection:text-blue-900">
      {/* Hero Section */}
      <section className="relative pt-40 pb-40 overflow-hidden bg-[#050505] text-white">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-orange-600/5 rounded-full blur-[100px]" />
        </div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center animate-fade-in-up">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase mb-8">
            <LifeBuoy size={14} /> Knowledge Base
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-10">
            How can we <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">help you?</span>
          </h1>
          
          <div className="relative max-w-2xl mx-auto group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={24} />
            <input
              type="text"
              placeholder="Search for articles, guides, or FAQs..."
              className="w-full pl-16 pr-8 py-6 bg-white/5 border border-white/10 rounded-[24px] text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/10 transition-all text-lg placeholder:text-gray-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div 
                onClick={() => handleCategoryClick(cat)}
                className="group bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl shadow-gray-200/30 hover:shadow-2xl hover:border-blue-200/50 transition-all duration-500 cursor-pointer flex flex-col justify-between h-full"
              >
                <div>
                  <div className={`w-14 h-14 rounded-2xl ${cat.bg} ${cat.text} ${cat.border} border flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                    <cat.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{cat.title}</h3>
                  <p className="text-sm text-gray-500 font-medium mb-8">{cat.count} Articles</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest group-hover:text-blue-600 transition-colors">
                  <span>Explore</span> <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-3xl mx-auto px-6 py-32">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-500">Everything you need to know about the RoadAware platform.</p>
          </div>
        </ScrollReveal>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <div className="bg-white rounded-[24px] border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left group"
                >
                  <span className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{faq.q}</span>
                  <ChevronDown 
                    size={20} 
                    className={`text-gray-400 transition-transform duration-300 ${activeFaq === i ? 'rotate-180 text-blue-500' : ''}`} 
                  />
                </button>
                <div className={`transition-all duration-300 ease-in-out ${activeFaq === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-8 pb-8 text-gray-500 leading-relaxed">
                    {faq.a}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Support CTA */}
      <section className="max-w-5xl mx-auto px-6">
        <ScrollReveal>
          <div className="bg-[#050505] rounded-[48px] p-12 md:p-20 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[80px] -mr-16 -mt-16" />
            <h2 className="text-4xl font-black mb-6">Still need help?</h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
              Our support desk is active to assist you with any questions or technical 
              difficulties you might encounter.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <button 
                onClick={handleOpenSupport}
                className="px-10 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all flex items-center gap-2 shadow-xl shadow-blue-900/20"
              >
                <MessageCircle size={20} /> Open Support Desk
              </button>
              <a href="/contact" className="px-10 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-all flex items-center gap-2">
                Send an Email <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Category Explorer Drawer Modal */}
      {selectedCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-fade-in">
          <div className="bg-white rounded-[32px] p-8 md:p-10 border border-gray-100 shadow-2xl max-w-2xl w-full relative max-h-[85vh] overflow-y-auto transform scale-100 transition-transform duration-300">
            {/* Close Button */}
            <button 
              onClick={handleClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-colors"
            >
              <X size={20} />
            </button>

            {!selectedArticle ? (
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-xl ${selectedCategory.bg} ${selectedCategory.text} ${selectedCategory.border} border flex items-center justify-center`}>
                    {React.createElement(selectedCategory.icon, { size: 24 })}
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-100">
                      Vetted Guides
                    </span>
                    <h3 className="text-2xl font-black text-gray-900 mt-0.5">{selectedCategory.title} Articles</h3>
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-gray-100">
                  {KNOWLEDGE_BASE[selectedCategory.title]?.map((art, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => setSelectedArticle(art)}
                      className="group p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-lg hover:border-blue-200/50 cursor-pointer transition-all duration-300 flex items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5">
                        <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors text-base">{art.title}</h4>
                        <p className="text-xs text-gray-500 leading-relaxed line-clamp-1">{art.summary}</p>
                      </div>
                      <div className="shrink-0 w-8 h-8 rounded-full bg-white border border-slate-100 text-slate-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 flex items-center justify-center transition-colors">
                        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <button 
                    onClick={() => setSelectedArticle(null)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors mb-4 group"
                  >
                    <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" /> Back to Articles
                  </button>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full ${selectedCategory.bg} ${selectedCategory.text} ${selectedCategory.border} border text-[10px] font-black uppercase tracking-wider`}>
                      <Sparkles size={10} /> Knowledge Base
                    </span>
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 leading-tight">{selectedArticle.title}</h3>
                </div>

                <div className="pt-6 border-t border-gray-100 text-slate-600 leading-relaxed text-sm md:text-base space-y-4">
                  <p>{selectedArticle.content}</p>
                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100/80 text-xs text-slate-400 flex items-center gap-3">
                    <CheckCircle2 className="text-emerald-500 shrink-0" size={16} />
                    <span>Was this article helpful? If you need more detailed guidelines, contact support using the footer prompts.</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Dynamic Support Desk Ticket Modal Drawer */}
      {isSupportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-fade-in">
          <div className="bg-white rounded-[32px] p-8 md:p-10 border border-gray-100 shadow-2xl max-w-lg w-full relative max-h-[90vh] overflow-y-auto transform scale-100 transition-all duration-300">
            {/* Close Button */}
            <button 
              onClick={() => setIsSupportOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-colors"
            >
              <X size={20} />
            </button>

            {!ticketSubmitted ? (
              <form onSubmit={handleSupportSubmit} className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center">
                    <LifeBuoy size={20} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900">Support Desk</h3>
                    <p className="text-xs text-slate-400">File an official citizen inquiry ticket</p>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Full Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Jane Doe"
                      value={ticketForm.name}
                      onChange={(e) => setTicketForm({ ...ticketForm, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-3 px-4 text-sm text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Email Address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="jane@example.com"
                      value={ticketForm.email}
                      onChange={(e) => setTicketForm({ ...ticketForm, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-3 px-4 text-sm text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Support Category</label>
                    <div className="relative">
                      <select 
                        value={ticketForm.category}
                        onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-3 px-4 text-sm text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all appearance-none"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Reporting Geolocation Issue">Reporting Geolocation Issue</option>
                        <option value="Account & Profile Settings">Account & Profile Settings</option>
                        <option value="Municipal Portal Partnerships">Municipal Portal Partnerships</option>
                      </select>
                      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Detailed Message</label>
                    <textarea 
                      rows="4"
                      required
                      placeholder="Describe the question or issue you're facing in detail..."
                      value={ticketForm.message}
                      onChange={(e) => setTicketForm({ ...ticketForm, message: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-3 px-4 text-sm text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/10 transition-all flex items-center justify-center gap-2"
                >
                  Submit Ticket <ArrowRight size={18} />
                </button>
              </form>
            ) : (
              <div className="py-8 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 mb-6">
                  <FileCheck size={32} />
                </div>
                
                <h3 className="text-2xl font-black text-slate-900 mb-1">Ticket Submitted Successfully!</h3>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold tracking-wider mb-6 uppercase">
                  <Tag size={12} /> Ticket ID: {ticketId}
                </span>

                <p className="text-sm text-slate-500 leading-relaxed max-w-sm mb-8">
                  We have logged your issue under ID <strong className="text-slate-800">{ticketId}</strong>. A copies copy of this ticket log has been cached. Our support desk will contact you via <strong className="text-slate-800">{ticketForm.email}</strong> shortly.
                </p>
                
                <button 
                  onClick={() => setIsSupportOpen(false)}
                  className="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors"
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

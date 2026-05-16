import { Search, Book, Shield, User, MessageCircle, ChevronDown, ArrowRight, LifeBuoy, Zap, FileText } from 'lucide-react';
import { useState } from 'react';

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFaq, setActiveFaq] = useState(null);

  const categories = [
    { title: "Getting Started", icon: Zap, count: 12, bg: "bg-blue-50", text: "text-blue-600" },
    { title: "Reporting Hazards", icon: FileText, count: 8, bg: "bg-orange-50", text: "text-orange-600" },
    { title: "Account & Safety", icon: Shield, count: 5, bg: "bg-green-50", text: "text-green-600" },
    { title: "Authorities Portal", icon: User, count: 10, bg: "bg-purple-50", text: "text-purple-600" }
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

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-24 selection:bg-blue-100 selection:text-blue-900">
      {/* Hero Section */}
      <section className="relative pt-40 pb-40 overflow-hidden bg-[#0a0a0a] text-white">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
          <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-orange-600/5 rounded-full blur-[100px]" />
        </div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase mb-8">
            <LifeBuoy size={14} /> Knowledge Base
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-10">
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
            <div key={i} className="group bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl shadow-gray-200/30 hover:shadow-2xl hover:border-blue-100 transition-all duration-300">
              <div className={`w-14 h-14 rounded-2xl ${cat.bg} ${cat.text} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <cat.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{cat.title}</h3>
              <p className="text-sm text-gray-500 font-medium mb-4">{cat.count} Articles</p>
              <div className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest group-hover:text-blue-600 transition-colors">
                Explore <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-3xl mx-auto px-6 py-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-500">Everything you need to know about the RoadAware platform.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-[24px] border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
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
          ))}
        </div>
      </section>

      {/* Support CTA */}
      <section className="max-w-5xl mx-auto px-6">
        <div className="bg-[#050505] rounded-[48px] p-12 md:p-20 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[80px] -mr-16 -mt-16" />
          <h2 className="text-4xl font-black mb-6">Still need help?</h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
            Our support team is available 24/7 to assist you with any questions or 
            technical difficulties you might encounter.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <button className="px-10 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all flex items-center gap-2 shadow-xl shadow-blue-900/20">
              <MessageCircle size={20} /> Chat with Support
            </button>
            <a href="/contact" className="px-10 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-all flex items-center gap-2">
              Send an Email <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

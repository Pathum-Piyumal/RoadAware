import { Search, ChevronDown, MessageCircle, AlertTriangle, Shield, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function HelpCenter() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Reporting Hazards', 'Account & Privacy', 'Authorities & Actions'];

  const faqs = [
    {
      category: 'Reporting Hazards',
      question: "How do I report a new road hazard?",
      answer: "Click the 'Report Hazard' button on the homepage or in your dashboard. You will be guided through a simple 3-step process to provide the hazard details, select the exact location on the map, and optionally upload a photo. Once submitted, it will be visible to the community and local authorities."
    },
    {
      category: 'Reporting Hazards',
      question: "Can I report a hazard anonymously?",
      answer: "Currently, you need to be logged into your RoadAware account to report a hazard. This helps us prevent spam and ensures the integrity of the data provided to local authorities. However, your personal details are kept private and are not publicly linked to the report."
    },
    {
      category: 'Reporting Hazards',
      question: "What happens after I submit a report?",
      answer: "Your report is immediately added to the public Hazard Map. Other users can upvote it if they encounter the same issue. Local authorities use our dedicated dashboard to monitor these reports, assign repair crews, and update the status from 'Reported' to 'In Progress' and eventually 'Resolved'."
    },
    {
      category: 'Authorities & Actions',
      question: "How quickly are hazards fixed?",
      answer: "Repair times depend entirely on the local authority's schedule, resources, and the severity of the hazard. RoadAware acts as the communication bridge. Highly upvoted and 'Critical' severity reports are often prioritized by maintenance crews."
    },
    {
      category: 'Authorities & Actions',
      question: "Who updates the status of a hazard?",
      answer: "Only verified local authority accounts have the permission to update a hazard's status. They can mark it as 'In Progress' when a crew is dispatched, and 'Resolved' once the repair is complete."
    },
    {
      category: 'Account & Privacy',
      question: "How is my location data used?",
      answer: "When you use the 'Use My Current Location' feature, your GPS coordinates are strictly used to pin the hazard on the map. We do not track your location continuously, and your location is never shared with third parties."
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 pb-24">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 bg-[#0f172a] border-b border-gray-800 text-center px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-orange-900/20 pointer-events-none" />
        <div className="max-w-3xl mx-auto relative z-10">
          <span className="text-orange-500 font-bold text-xs tracking-widest uppercase mb-4 block">Support & FAQs</span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
            How can we help you?
          </h1>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mt-8">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="text-gray-400" size={20} />
            </div>
            <input
              type="text"
              placeholder="Search for articles, guides, or FAQs..."
              className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white/20 transition-all backdrop-blur-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Quick Links / Topic Cards */}
      <section className="max-w-5xl mx-auto px-6 -mt-10 relative z-20 mb-20">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/40 flex items-start gap-4 hover:border-orange-200 transition-colors cursor-pointer group">
            <div className="p-3 bg-orange-50 text-orange-600 rounded-xl group-hover:scale-110 transition-transform">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Reporting Guide</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Learn how to accurately report and categorize hazards.</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/40 flex items-start gap-4 hover:border-blue-200 transition-colors cursor-pointer group">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:scale-110 transition-transform">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Tracking Progress</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Understand hazard statuses and how updates work.</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/40 flex items-start gap-4 hover:border-green-200 transition-colors cursor-pointer group">
            <div className="p-3 bg-green-50 text-green-600 rounded-xl group-hover:scale-110 transition-transform">
              <Shield size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Account Security</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Manage your profile, data, and privacy settings.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Frequently Asked Questions</h2>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                activeCategory === cat 
                  ? 'bg-orange-100 text-orange-700 border-2 border-orange-200' 
                  : 'bg-gray-50 text-gray-600 border-2 border-transparent hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, i) => (
              <details key={i} className="group bg-white border border-gray-200 rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                  <h3 className="font-semibold text-gray-900 pr-6 text-lg">{faq.question}</h3>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-open:rotate-180 transition-transform duration-300">
                    <ChevronDown size={18} className="text-gray-500" />
                  </div>
                </summary>
                <div className="p-6 pt-0 text-gray-600 leading-relaxed">
                  <div className="pt-4 border-t border-gray-100">
                    {faq.answer}
                  </div>
                </div>
              </details>
            ))
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-200">
              <Search className="mx-auto text-gray-400 mb-4" size={32} />
              <h3 className="text-lg font-bold text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-500">We couldn't find any FAQs matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Support CTA */}
      <section className="max-w-4xl mx-auto px-6 mt-24">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-10 border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Still need help?</h2>
            <p className="text-gray-600 max-w-md">Our support team is always ready to assist you with any questions or technical issues.</p>
          </div>
          <a href="mailto:support@roadaware.com" className="whitespace-nowrap flex items-center px-6 py-3 bg-[#0f172a] text-white font-semibold rounded-xl shadow-md hover:bg-[#1e293b] transition-all">
            <MessageCircle size={18} className="mr-2" /> Contact Support
          </a>
        </div>
      </section>
    </div>
  );
}

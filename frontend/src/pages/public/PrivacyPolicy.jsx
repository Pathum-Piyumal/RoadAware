import React, { useState, useEffect, useRef } from 'react';
import { Shield, Lock, Eye, FileText, Globe, UserCheck, Bell, ArrowRight } from 'lucide-react';

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

export default function PrivacyPolicy() {
  const lastUpdated = "May 16, 2026";

  const sections = [
    {
      title: "Information Collection",
      desc: "We collect personal data like your name and email, but more importantly, precise GPS data when you report a hazard to ensure map accuracy.",
      icon: Lock,
      color: "text-blue-500",
      bg: "bg-blue-50"
    },
    {
      title: "Data Usage",
      desc: "Your data is used to provide, maintain, and improve our services, and to notify you of the progress on hazards you've reported.",
      icon: Eye,
      color: "text-orange-500",
      bg: "bg-orange-50"
    },
    {
      title: "Sharing with Authorities",
      desc: "Hazard reports (location and images) are shared with verified local authorities to facilitate rapid infrastructure repairs.",
      icon: Globe,
      color: "text-green-500",
      bg: "bg-green-50"
    },
    {
      title: "Your Privacy Rights",
      desc: "You have full control over your data. You can access, update, or delete your personal information through your account settings at any time.",
      icon: UserCheck,
      color: "text-purple-500",
      bg: "bg-purple-50"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-24 selection:bg-blue-100 selection:text-blue-900">
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden bg-[#050505] text-white text-center">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -mr-64 -mt-64" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 animate-fade-in-up">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase mb-8">
            <Shield size={14} /> Trust & Security
          </span>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
            Your Privacy <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">is Protected.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-4">
            At RoadAware, we are committed to being transparent about how we 
            collect and use your data to make roads safer.
          </p>
          <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">
            Last Updated: {lastUpdated}
          </div>
        </div>
      </section>

      {/* Overview Cards */}
      <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sections.map((section, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl shadow-gray-200/30 hover:shadow-2xl transition-all duration-300 h-full">
                <div className={`w-14 h-14 rounded-2xl ${section.bg} ${section.color} flex items-center justify-center mb-6`}>
                  <section.icon size={28} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{section.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{section.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Detailed Content */}
      <section className="max-w-4xl mx-auto px-6 py-32">
        <ScrollReveal>
          <div className="bg-white rounded-[48px] border border-gray-100 p-10 md:p-16 shadow-sm space-y-16">
            
            <div className="space-y-6">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">1. Data We Collect</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  To provide the best possible service, RoadAware collects information that identifies you or can be used to identify you. 
                  This includes your account profile, contact details, and most importantly, geospatial data.
                </p>
                <ul className="list-disc pl-5 space-y-3">
                  <li><strong>Geographic Location:</strong> Precise GPS coordinates are collected only when you submit a hazard report or use the live map features.</li>
                  <li><strong>Device Information:</strong> We collect data about the device you use to access RoadAware, including IP addresses and operating systems.</li>
                  <li><strong>Usage Logs:</strong> Information about how you interact with our platform, such as search queries and upvotes.</li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">2. How We Share Data</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  RoadAware's primary mission is to bridge the gap between citizens and authorities. To do this, we share specific data points 
                  with verified local government and infrastructure maintenance teams.
                </p>
                <div className="p-6 bg-blue-50 rounded-[24px] border border-blue-100 flex items-start gap-4">
                  <Bell className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                  <p className="text-sm text-blue-900 font-medium">
                    Important: We never sell your personal contact information to third-party advertisers or data brokers.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">3. Security Measures</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  We use industry-standard encryption (SSL/TLS) to protect your data in transit and at rest. 
                  Our team regularly audits our security protocols to ensure that your information remains safe from unauthorized access.
                </p>
              </div>
            </div>

            <div className="pt-12 border-t border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Privacy Team</h2>
              <div className="bg-gray-50 rounded-[32px] p-8 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
                <p className="text-gray-500 font-medium text-center md:text-left">
                  If you have questions about this policy or wish to exercise your data rights.
                </p>
                <a href="mailto:privacy@roadaware.com" className="px-8 py-4 bg-[#050505] text-white font-bold rounded-2xl hover:bg-blue-600 transition-all flex items-center gap-2 whitespace-nowrap shadow-xl">
                  privacy@roadaware.com <ArrowRight size={18} />
                </a>
              </div>
            </div>

          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}

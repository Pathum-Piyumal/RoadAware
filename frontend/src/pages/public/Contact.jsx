import { Mail, MapPin, Phone, MessageSquare, Send, ArrowRight, Globe, Clock, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 pb-24 selection:bg-blue-100 selection:text-blue-900">
      {/* Hero Section */}
      <section className="relative pt-40 pb-40 overflow-hidden bg-[#050505] text-white">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -mr-64 -mt-64" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[100px] -ml-64 -mb-64" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase mb-8">
            <MessageSquare size={14} className="fill-current" /> Contact Us
          </span>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
            Let's start a <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Conversation.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Have a question about our platform or want to partner with us? 
            Our team is here to help you move forward.
          </p>
        </div>
      </section>

      {/* Contact Cards & Form */}
      <section className="max-w-7xl mx-auto px-6 -mt-24 relative z-20">
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Info Side */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-2xl shadow-gray-200/50">
              <h3 className="text-2xl font-black text-gray-900 mb-8">Our Offices</h3>
              
              <div className="space-y-10">
                <div className="group">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                    <Mail size={24} />
                  </div>
                  <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-1">Email Us</h4>
                  <a href="mailto:hello@roadaware.com" className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors">hello@roadaware.com</a>
                </div>

                <div className="group">
                  <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                    <Phone size={24} />
                  </div>
                  <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-1">Call Us</h4>
                  <p className="text-lg font-bold text-gray-900">+94 11 234 5678</p>
                  <p className="text-xs text-gray-400 font-bold mt-1 uppercase tracking-wider">Mon - Fri, 9am - 6pm</p>
                </div>

                <div className="group">
                  <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                    <MapPin size={24} />
                  </div>
                  <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-1">Location</h4>
                  <p className="text-lg font-bold text-gray-900 leading-tight">
                    123 Digital Park, Level 4 <br />
                    Colombo 03, Sri Lanka
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#050505] p-10 rounded-[40px] text-white relative overflow-hidden group">
              <Globe className="absolute -right-12 -bottom-12 w-48 h-48 text-white/5 group-hover:scale-110 transition-transform duration-700" />
              <h3 className="text-xl font-bold mb-4 relative z-10">Global Support</h3>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed relative z-10">
                Operating in 12+ cities with dedicated local support teams for every municipality.
              </p>
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm relative z-10">
                View Coverage <ArrowRight size={16} />
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-8">
            <div className="bg-white p-10 md:p-16 rounded-[40px] border border-gray-100 shadow-2xl shadow-gray-200/50">
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl font-black text-gray-900">Send a Message</h2>
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full text-xs font-bold text-gray-400">
                  <ShieldCheck size={14} className="text-green-500" /> Secure Encryption
                </div>
              </div>
              
              {isSubmitted ? (
                <div className="py-20 text-center animate-in fade-in zoom-in duration-500">
                  <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-green-100">
                    <Send size={40} />
                  </div>
                  <h3 className="text-4xl font-black text-gray-900 mb-4">Message Received!</h3>
                  <p className="text-gray-500 text-lg max-w-sm mx-auto mb-10 leading-relaxed">
                    We've sent a confirmation to your email. Our team will reach out shortly.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="px-10 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-blue-600 transition-all"
                  >
                    Back to Form
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-[20px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-gray-900 font-semibold"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-[20px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-gray-900 font-semibold"
                        placeholder="john@roadaware.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-[20px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-gray-900 font-semibold"
                      placeholder="Partnership Inquiry"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Message Details</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows="6"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-[24px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-gray-900 font-semibold resize-none"
                      placeholder="Tell us how we can help..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-5 bg-gray-900 text-white font-black rounded-[24px] shadow-xl hover:bg-blue-600 hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
                  >
                    Send Message <Send size={20} />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}


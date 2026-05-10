import React from 'react';
import { Link } from 'react-router-dom';
import { 
  AlertTriangle, 
  MapPin, 
  CheckCircle2, 
  ChevronRight, 
  ShieldCheck, 
  Users, 
  Zap,
  Car,
  Truck,
  Construction,
  Wind,
  Droplets,
  Lightbulb,
  Snowflake,
  PawPrint
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16 items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <ShieldCheck className="text-white" size={20} />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            RoadAware
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-orange-600">Home</Link>
          <Link to="/map" className="text-sm font-medium text-gray-500 hover:text-orange-600 transition-colors">Hazard Map</Link>
          <Link to="/report-hazard" className="text-sm font-medium text-gray-500 hover:text-orange-600 transition-colors">Report</Link>
          <Link to="/my-reports" className="text-sm font-medium text-gray-500 hover:text-orange-600 transition-colors">My Reports</Link>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-sm font-medium text-gray-700 hover:text-orange-600">Login</button>
          <Link 
            to="/report-hazard" 
            className="bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-black transition-all shadow-md"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
    {/* Background Image with Overlay */}
    <div className="absolute inset-0 z-0">
      <img 
        src="C:\Users\pathu\.gemini\antigravity\brain\c0f3b2c4-422e-4be7-8773-467b19b0186f\road_hero_bg_1778441419328.png" 
        alt="Road background" 
        className="w-full h-full object-cover grayscale-[0.3]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/60 to-transparent" />
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 mb-6 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider">Live traffic safety monitoring</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
            Safer roads,<br />
            <span className="text-orange-500">built by the people</span><br />
            who use them.
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-lg leading-relaxed">
            Report potholes, street flooding, broken lights and more. Your assistance helps 
            prioritize road repairs in your community.
          </p>
          <div className="flex flex-wrap gap-4 mb-10">
            <Link 
              to="/report-hazard" 
              className="bg-orange-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20 flex items-center gap-2"
            >
              Get started <ChevronRight size={20} />
            </Link>
            <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all">
              How it works
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-gray-900 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" />
                </div>
              ))}
            </div>
            <div className="text-gray-300">
              <div className="flex items-center gap-1 text-orange-400">
                {'★'.repeat(5)}
              </div>
              <p className="text-sm font-medium">Joined by <span className="text-white font-bold">12k+ community active members</span></p>
            </div>
          </div>
        </div>

        {/* Hero Map Overlay */}
        <div className="hidden lg:block relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
          <div className="relative h-[450px] bg-white rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <MapContainer 
              center={[6.9271, 79.8612]} 
              zoom={13} 
              style={{ height: '100%', width: '100%' }}
              zoomControl={false}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[6.9319, 79.8478]}>
                <Popup>Pothole reported here</Popup>
              </Marker>
              <Marker position={[6.9150, 79.8700]}>
                <Popup>Flooding reported here</Popup>
              </Marker>
            </MapContainer>
            
            {/* Map UI Elements */}
            <div className="absolute top-6 right-6 bg-white shadow-lg rounded-xl p-3 border border-gray-100 animate-in fade-in slide-in-from-right-4 duration-1000 delay-500">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
                    <AlertTriangle size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-tight">Latest Hazard</p>
                    <p className="text-sm font-bold text-gray-900">Pothole near Town Hall</p>
                  </div>
               </div>
            </div>
            
            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md shadow-lg rounded-2xl p-4 border border-white/20">
               <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                      <CheckCircle2 size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">Active Monitoring</p>
                      <p className="text-xs text-gray-500">Reporting is currently live in Colombo</p>
                    </div>
                  </div>
                  <button className="bg-orange-500 text-white px-4 py-2 rounded-lg text-xs font-bold">View Full Map</button>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-1 md:max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 mt-16 shadow-2xl">
        <div className="text-center">
          <p className="text-3xl font-extrabold text-white">34</p>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Reports</p>
        </div>
        <div className="text-center border-x border-white/10">
          <p className="text-3xl font-extrabold text-white">9</p>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Resolved</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-extrabold text-white">5</p>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Waiting</p>
        </div>
      </div>
    </div>
  </section>
);

const HowItWorks = () => (
  <section className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <p className="text-orange-500 font-bold uppercase tracking-widest text-xs mb-4">How It Works</p>
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Three steps to a safer street</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">From reporting a hazard to getting it resolved — RoadAware keeps process flow transparent.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          { icon: MapPin, title: "1. Spot & Report", desc: "Identify a road issue, take a photo, and mark its location on the map.", color: "text-blue-500", bg: "bg-blue-50" },
          { icon: Users, title: "2. Community Validates", desc: "Other users upvote and confirm your report to build credibility.", color: "text-orange-500", bg: "bg-orange-50" },
          { icon: CheckCircle2, title: "3. Authorities Respond", desc: "Local authorities receive verified data and schedule repairs.", color: "text-green-500", bg: "bg-green-50" }
        ].map((step, i) => (
          <div key={i} className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all group">
            <div className={`w-14 h-14 ${step.bg} ${step.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <step.icon size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
            <p className="text-gray-500 leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const WhatYouCanReport = () => {
  const categories = [
    { name: 'Pothole', icon: Car },
    { name: 'Debris', icon: Truck },
    { name: 'Construction', icon: Construction },
    { name: 'Flooding', icon: Droplets },
    { name: 'Weather', icon: Wind },
    { name: 'Streetlight', icon: Lightbulb },
    { name: 'Snow/Ice', icon: Snowflake },
    { name: 'Animal', icon: PawPrint }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">What you can report</h2>
          <p className="text-gray-500">Every report makes a difference in road safety.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((cat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col items-center gap-3 hover:shadow-lg hover:border-orange-200 transition-all cursor-pointer group">
              <div className="text-gray-400 group-hover:text-orange-500 transition-colors">
                <cat.icon size={32} />
              </div>
              <span className="text-xs font-bold text-gray-700">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturedHazards = () => (
  <section className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-end mb-12">
        <div>
          <p className="text-orange-500 font-bold uppercase tracking-widest text-xs mb-4">Latest Reports</p>
          <h2 className="text-3xl font-extrabold text-gray-900">Most-upvoted hazards near you</h2>
        </div>
        <button className="text-sm font-bold text-orange-600 flex items-center gap-1 hover:underline">
          View All <ChevronRight size={16} />
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          { title: "Pothole near Kandy Road", location: "Kandy Road, Colombo 10", upvotes: 142, status: "Pending", type: "Pothole" },
          { title: "Broken Streetlight", location: "Marine Drive, Kollupitiya", upvotes: 89, status: "Verified", type: "Light" },
          { title: "Severe Flooding", location: "Main Street, Pettah", upvotes: 215, status: "Action Taken", type: "Flooding" }
        ].map((hazard, i) => (
          <div key={i} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all">
            <div className="h-48 bg-gray-200 animate-pulse" /> {/* Image Placeholder */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                  hazard.status === 'Verified' ? 'bg-blue-100 text-blue-600' : 
                  hazard.status === 'Action Taken' ? 'bg-green-100 text-green-600' : 
                  'bg-orange-100 text-orange-600'
                }`}>
                  {hazard.status}
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{hazard.title}</h3>
              <div className="flex items-center gap-1 text-gray-500 text-sm mb-6">
                <MapPin size={14} /> {hazard.location}
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 text-gray-700">
                    <Zap size={14} />
                  </div>
                  <span className="font-bold text-gray-900">{hazard.upvotes}</span>
                </div>
                <button className="text-sm font-bold text-orange-600">Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-gray-900 text-white py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-4 gap-12 mb-16 pb-16 border-b border-white/10">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <ShieldCheck className="text-white" size={20} />
            </div>
            <span className="text-2xl font-bold">RoadAware</span>
          </div>
          <p className="text-gray-400 max-w-sm leading-relaxed">
            Leading the way in community-driven road safety and infrastructure maintenance monitoring.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-6">Company</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6">Support</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-white">Help Center</a></li>
            <li><a href="#" className="hover:text-white">Safety Tips</a></li>
            <li><a href="#" className="hover:text-white">Partner with us</a></li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-xs">
        <p>© 2026 RoadAware. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">Facebook</a>
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
        </div>
      </div>
    </div>
  </footer>
);

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <WhatYouCanReport />
        <FeaturedHazards />
        
        {/* Final CTA Section */}
        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl shadow-blue-500/20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)]" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-8">
                  <ShieldCheck className="text-white" size={32} />
                </div>
                <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6">See something? Say something.</h2>
                <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                  Your report could prevent the next accident. Help build a better infrastructure 
                  for everyone in your community.
                </p>
                <Link 
                  to="/report-hazard" 
                  className="inline-block bg-white text-blue-700 px-10 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-lg"
                >
                  Submit report here
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;

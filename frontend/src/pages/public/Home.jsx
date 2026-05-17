import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  MapPin,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Zap,
  Car,
  Truck,
  Construction,
  Droplets,
  Lightbulb,
  Snowflake,
  PawPrint,
  Heart,
  Star,
  ArrowRight,
  Map as MapIcon,
  X,
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;



/* ─── HERO ────────────────────────────────────────────────── */
const Hero = () => (
  <section style={{ position: 'relative', minHeight: '100vh', background: '#0a0a0a', overflow: 'hidden', paddingTop: 64 }}>
    {/* Background Image */}
    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      <img
        src="/assets/hero-bg.png"
        alt="Road background"
        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45 }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.85) 60%, #0a0a0a 100%)' }} />
    </div>

    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 32px 80px', position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
      {/* Left column */}
      <div>
        {/* Live badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e' }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: '#4ade80', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Live traffic safety monitoring</span>
        </div>

        {/* Headline */}
        <h1 style={{ fontSize: 68, fontWeight: 900, color: '#fff', lineHeight: 1.05, letterSpacing: '-2px', marginBottom: 24, margin: '0 0 24px 0' }}>
          Safer roads,<br />
          built by the<br />
          <span style={{ color: '#fff' }}>people who use them.</span>
        </h1>

        {/* Subtext */}
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, maxWidth: 440, margin: '0 0 36px 0' }}>
          Report potholes, street flooding, broken lights and more. Your assistance helps
          prioritize road repairs in your community.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 36 }}>
          <Link to="/login" style={{
            background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
            color: '#fff',
            padding: '16px 36px',
            borderRadius: 999,
            fontWeight: 800,
            fontSize: 15,
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            boxShadow: '0 8px 24px rgba(249,115,22,0.3)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(249,115,22,0.4)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(249,115,22,0.3)'; }}
          >
            Get started <ArrowRight size={18} strokeWidth={2.5} />
          </Link>
          <Link to="/map" style={{
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)',
            color: '#fff',
            padding: '16px 36px',
            borderRadius: 999,
            fontWeight: 700,
            fontSize: 15,
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            border: '1px solid rgba(255,255,255,0.15)',
            transition: 'background 0.2s ease, border-color 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
          >
            <MapIcon size={18} /> Explore the map
          </Link>
        </div>

        {/* Avatars + Rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 36 }}>
          <div style={{ display: 'flex' }}>
            {[0, 1, 2, 3].map(i => (
              <div key={i} style={{
                width: 38, height: 38, borderRadius: '50%',
                background: `hsl(${i * 40 + 200},40%,40%)`,
                border: '2px solid #0a0a0a', marginLeft: i === 0 ? 0 : -10,
              }} />
            ))}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {[1,2,3,4,5].map(s => <Star key={s} size={13} fill="#f97316" color="#f97316" />)}
              <span style={{ fontSize: 13, fontWeight: 800, color: '#fff', marginLeft: 4 }}>5.0</span>
            </div>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', margin: 0 }}>
              Joined by <strong style={{ color: '#fff' }}>12k+ community active members</strong>
            </p>
          </div>
        </div>

        {/* Stats pill */}
        <div style={{
          display: 'inline-flex', background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)', borderRadius: 999,
          backdropFilter: 'blur(12px)', padding: '12px 4px',
        }}>
          {[{ val: '34', label: 'Reports' }, { val: '9', label: 'Resolved' }, { val: '5', label: 'Waiting' }].map((s, i) => (
            <div key={i} style={{
              padding: '0 28px', textAlign: 'center',
              borderRight: i < 2 ? '1px solid rgba(255,255,255,0.1)' : 'none',
            }}>
              <p style={{ fontSize: 24, fontWeight: 900, color: '#fff', margin: 0 }}>{s.val}</p>
              <p style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right column — Map */}
      <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 32px 80px rgba(0,0,0,0.6)' }}>
        <div style={{ height: 480 }}>
          <MapContainer center={[51.556, -0.297]} zoom={14} style={{ height: '100%', width: '100%' }} zoomControl={false}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[51.556, -0.297]}>
              <Popup>Hazard Reported: A4006 Wembley</Popup>
            </Marker>
          </MapContainer>
        </div>

        {/* Top badge */}
        <div style={{
          position: 'absolute', top: 20, left: 20, background: '#fff',
          borderRadius: 16, padding: '12px 16px', display: 'flex', alignItems: 'center',
          gap: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.15)', zIndex: 1000,
        }}>
          <div style={{ width: 44, height: 44, background: '#fee2e2', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AlertTriangle size={22} color="#ef4444" />
          </div>
          <div>
            <p style={{ fontSize: 10, fontWeight: 800, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Live Warning</p>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#111', margin: 0 }}>Pothole: A4006 Wembley</p>
          </div>
        </div>

        {/* Bottom badge */}
        <div style={{
          position: 'absolute', bottom: 20, right: 20, background: '#22c55e',
          borderRadius: 12, padding: '8px 14px', display: 'flex', alignItems: 'center',
          gap: 8, boxShadow: '0 4px 16px rgba(34,197,94,0.4)', zIndex: 1000,
        }}>
          <CheckCircle2 size={15} color="#fff" />
          <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>Live Updates</span>
        </div>
      </div>
    </div>
  </section>
);



/* ─── HOW IT WORKS ────────────────────────────────────────── */
const HowItWorks = () => (
  <section style={{ padding: '96px 32px', background: '#fff' }}>
    <div style={{ maxWidth: 1280, margin: '0 auto', textAlign: 'center' }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: '#f97316', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 12 }}>How it works</p>
      <h2 style={{ fontSize: 38, fontWeight: 900, color: '#111', letterSpacing: '-1px', marginBottom: 12 }}>Three steps to a safer street</h2>
      <p style={{ fontSize: 15, color: '#6b7280', marginBottom: 64, maxWidth: 520, margin: '0 auto 64px' }}>
        From reporting a hazard to getting it resolved — RoadAware keeps process flow transparent.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 32, textAlign: 'left' }}>
        {[
          { icon: MapPin,     title: '1. Spot & Report',        desc: 'Identify a road issue, take a photo, and mark its location on the map.' },
          { icon: Zap,        title: '2. Community Validates',  desc: 'Other users upvote and confirm your report to build credibility.' },
          { icon: ShieldCheck,title: '3. Authorities Respond',  desc: 'Local authorities receive verified data and schedule repairs.' },
        ].map((step, i) => (
          <div key={i} style={{ padding: '40px 36px', borderRadius: 28, border: '1px solid #f3f4f6', background: '#fff', cursor: 'default' }}>
            <div style={{ width: 52, height: 52, background: '#3b82f6', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, boxShadow: '0 8px 24px rgba(59,130,246,0.25)' }}>
              <step.icon size={24} color="#fff" />
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: '#111', marginBottom: 10 }}>{step.title}</h3>
            <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);



/* ─── WHAT YOU CAN REPORT ─────────────────────────────────── */
const WhatYouCanReport = () => {
  const categories = [
    { name: 'Pothole',      icon: Car },
    { name: 'Debris',       icon: Truck },
    { name: 'Construction', icon: Construction },
    { name: 'Streetlight',  icon: Lightbulb },
    { name: 'Flooding',     icon: Droplets },
    { name: 'Ice / Snow',   icon: Snowflake },
    { name: 'Animal',       icon: PawPrint },
    { name: 'Other',        icon: AlertTriangle },
  ];

  return (
    <section style={{ padding: '80px 32px', background: '#f9fafb' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <h2 style={{ fontSize: 30, fontWeight: 900, color: '#111', marginBottom: 6 }}>What you can report</h2>
        <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 40 }}>Every report makes a difference in road safety.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8,1fr)', gap: 16 }}>
          {categories.map((cat, i) => (
            <div key={i} style={{
              background: '#fff', padding: '24px 12px', borderRadius: 20,
              border: '1px solid #f3f4f6', display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 12, cursor: 'pointer',
              transition: 'box-shadow 0.2s, transform 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}
            >
              <cat.icon size={30} color="#111" />
              <span style={{ fontSize: 10, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em', textAlign: 'center' }}>{cat.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};



/* ─── HAZARD CARD ─────────────────────────────────────────── */
const HazardCard = ({ title, location, status, upvotes, category, image, onDetailsClick }) => (
  <div style={{ background: '#fff', borderRadius: 28, padding: '28px 28px 24px', border: '1px solid #f3f4f6', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
    <div>
      {/* Badges */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <span style={{
          padding: '4px 12px', borderRadius: 999, fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em',
          background: status === 'Verified' ? '#dcfce7' : '#fff7ed',
          color:      status === 'Verified' ? '#16a34a'  : '#ea580c',
        }}>{status}</span>
        <span style={{ padding: '4px 12px', borderRadius: 999, fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', background: '#fee2e2', color: '#dc2626' }}>{category}</span>
      </div>

      {/* Real Image instead of Placeholder */}
      <div style={{ height: 152, borderRadius: 16, overflow: 'hidden', marginBottom: 20 }}>
        <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      <h3 style={{ fontSize: 18, fontWeight: 800, color: '#111', marginBottom: 6 }}>{title}</h3>
      <p style={{ fontSize: 13, color: '#6b7280', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20 }}>
        <MapPin size={14} /> {location}
      </p>
    </div>

    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: '1px solid #f9fafb' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 32, height: 32, background: '#fef2f2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Heart size={14} color="#ef4444" fill="#ef4444" />
        </div>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#111' }}>{upvotes}</span>
      </div>
      <button 
        onClick={onDetailsClick}
        style={{ fontSize: 13, fontWeight: 700, color: '#111', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
      >
        Details <ChevronRight size={15} />
      </button>
    </div>
  </div>
);



/* ─── FEATURED HAZARDS ────────────────────────────────────── */
const FeaturedHazards = ({ hazards, onDetailsClick }) => (
  <section style={{ padding: '96px 32px', background: '#fff' }}>
    <div style={{ maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 52 }}>
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#f97316', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 8 }}>Live feed</p>
          <h2 style={{ fontSize: 36, fontWeight: 900, color: '#111', letterSpacing: '-1px', margin: 0 }}>Most-upvoted hazards near you</h2>
        </div>
        <Link to="/map" style={{ fontSize: 14, fontWeight: 700, color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, textDecoration: 'none' }}>
          View all <ChevronRight size={18} />
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 28 }}>
        {hazards.map((hazard) => (
          <HazardCard 
            key={hazard.id}
            title={hazard.title}
            location={hazard.location}
            status={hazard.status}
            upvotes={hazard.upvotes}
            category={hazard.category}
            image={hazard.image}
            onDetailsClick={() => onDetailsClick(hazard)}
          />
        ))}
      </div>
    </div>
  </section>
);



/* ─── CTA SECTION ─────────────────────────────────────────── */
const CTASection = () => (
  <section style={{ padding: '0 32px 80px' }}>
    <div style={{ maxWidth: 1280, margin: '0 auto' }}>
      <div style={{
        background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
        borderRadius: 48, padding: '80px 40px', textAlign: 'center',
        position: 'relative', overflow: 'hidden',
        boxShadow: '0 32px 80px rgba(37,99,235,0.35)',
      }}>
        {/* Subtle grid texture */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.07, backgroundImage: 'repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 40px)' }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ width: 60, height: 60, background: 'rgba(255,255,255,0.2)', borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
            <CheckCircle2 size={28} color="#fff" />
          </div>
          <h2 style={{ fontSize: 48, fontWeight: 900, color: '#fff', letterSpacing: '-1.5px', marginBottom: 16 }}>See something? Say something.</h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.75)', marginBottom: 36, maxWidth: 520, margin: '0 auto 36px' }}>
            Your report could prevent the next accident. Help build a better infrastructure for everyone in your community.
          </p>
          <Link to="/report-hazard" style={{
            display: 'inline-block', background: '#fff', color: '#1d4ed8',
            padding: '16px 44px', borderRadius: 16, fontWeight: 900, fontSize: 16,
            textDecoration: 'none', boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          }}>
            Submit report here
          </Link>
        </div>
      </div>
    </div>
  </section>
);



/* ─── PAGE ────────────────────────────────────────────────── */
export default function Home() {
  const [selectedHazard, setSelectedHazard] = useState(null);
  const [hazards, setHazards] = useState([
    {
      id: 1,
      title: "Pothole: Main Street",
      category: "Pothole",
      location: "102 Main Road, Colombo",
      description: "A deep, dangerous pothole measuring roughly 2 feet wide right in the middle of the active lane. Vehicles are swerving into oncoming traffic to avoid it, creating extreme collision risks.",
      status: "Pending",
      upvotes: 122,
      date: "Reported 2 hours ago",
      image: "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Flooding: A1 Highway",
      category: "Flooding",
      location: "A1 Highway km 45, Kandy",
      description: "Severe heavy drainage blockage causing water pooling across two lanes of the highway. Reduced speed limits are active, but hydroplaning hazards remain extremely high.",
      status: "Pending",
      upvotes: 150,
      date: "Reported 5 hours ago",
      image: "https://images.unsplash.com/photo-1547683905-f686c993aae5?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Hazardous Debris",
      category: "Debris",
      location: "88 Galle Road, Bentota",
      description: "Large container cargo fragments and wood debris blocking the shoulder and left lane. Needs immediate street sweeper crew dispatch.",
      status: "Verified",
      upvotes: 98,
      date: "Reported 1 day ago",
      image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=600&auto=format&fit=crop"
    }
  ]);

  const handleUpvote = (id) => {
    setHazards(prev => prev.map(h => h.id === id ? { ...h, upvotes: h.upvotes + 1 } : h));
    setSelectedHazard(prev => prev && prev.id === id ? { ...prev, upvotes: prev.upvotes + 1 } : prev);
  };

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background: '#fff' }}>
      <main>
        <Hero />
        <HowItWorks />
        <WhatYouCanReport />
        <FeaturedHazards hazards={hazards} onDetailsClick={setSelectedHazard} />
        <CTASection />
      </main>

      {/* Hazard Details Modal Overlay */}
      {selectedHazard && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16
        }}>
          <div style={{
            background: '#fff', borderRadius: 32, padding: 32, maxWidth: 540, w: '100%', width: '100%',
            position: 'relative', border: '1px solid #f3f4f6', boxShadow: '0 32px 80px rgba(0,0,0,0.3)',
            maxHeight: '90vh', overflowY: 'auto'
          }}>
            {/* Close button */}
            <button 
              onClick={() => setSelectedHazard(null)}
              style={{
                position: 'absolute', top: 24, right: 24, background: '#f3f4f6', border: 'none',
                borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center',
                justifyContent: 'center', cursor: 'pointer', color: '#6b7280', transition: 'background 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#e5e7eb'}
              onMouseLeave={e => e.currentTarget.style.background = '#f3f4f6'}
            >
              <X size={18} />
            </button>

            <div>
              {/* Image */}
              <div style={{ height: 220, borderRadius: 20, overflow: 'hidden', marginBottom: 24 }}>
                <img src={selectedHazard.image} alt={selectedHazard.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              {/* Status and Category */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                <span style={{
                  padding: '4px 12px', borderRadius: 999, fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em',
                  background: selectedHazard.status === 'Verified' ? '#dcfce7' : '#fff7ed',
                  color:      selectedHazard.status === 'Verified' ? '#16a34a'  : '#ea580c',
                }}>{selectedHazard.status}</span>
                <span style={{ padding: '4px 12px', borderRadius: 999, fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', background: '#fee2e2', color: '#dc2626' }}>{selectedHazard.category}</span>
              </div>

              {/* Title & Metadata */}
              <h3 style={{ fontSize: 24, fontWeight: 900, color: '#111', marginBottom: 8, letterSpacing: '-0.5px' }}>{selectedHazard.title}</h3>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: 13, color: '#6b7280', marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid #f3f4f6' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <MapPin size={14} /> {selectedHazard.location}
                </span>
                <span>•</span>
                <span>{selectedHazard.date}</span>
              </div>

              {/* Description */}
              <div style={{ marginBottom: 28 }}>
                <h4 style={{ fontSize: 12, fontWeight: 800, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Incident Description</h4>
                <p style={{ fontSize: 14, color: '#4b5563', lineHeight: 1.6, margin: 0 }}>{selectedHazard.description}</p>
              </div>

              {/* Action and upvotes */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 20, borderTop: '1px solid #f3f4f6' }}>
                <button 
                  onClick={() => handleUpvote(selectedHazard.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8, background: '#fef2f2', border: '1px solid #fee2e2',
                    borderRadius: 16, padding: '12px 24px', cursor: 'pointer', transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#ffe4e4'; e.currentTarget.style.borderColor = '#fecaca'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#fef2f2'; e.currentTarget.style.borderColor = '#fee2e2'; }}
                >
                  <Heart size={16} color="#ef4444" fill="#ef4444" />
                  <span style={{ fontSize: 14, fontWeight: 800, color: '#dc2626' }}>Upvote ({selectedHazard.upvotes})</span>
                </button>

                <Link 
                  to="/map"
                  onClick={() => setSelectedHazard(null)}
                  style={{
                    fontSize: 13, fontWeight: 800, color: '#3b82f6', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4
                  }}
                >
                  View on Live Map <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

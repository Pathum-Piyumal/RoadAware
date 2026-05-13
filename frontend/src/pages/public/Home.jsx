import { Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar/Navbar';
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
  ThumbsUp,
  Star,
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 36 }}>
          <Link to="/report-hazard" style={{
            background: '#fff', color: '#111', padding: '14px 32px',
            borderRadius: 12, fontWeight: 800, fontSize: 15, textDecoration: 'none',
            boxShadow: '0 8px 32px rgba(255,255,255,0.1)',
          }}>
            Get started
          </Link>
          <button style={{ color: '#fff', fontWeight: 700, fontSize: 15, background: 'none', border: 'none', cursor: 'pointer', borderBottom: '2px solid rgba(255,255,255,0.25)', paddingBottom: 2 }}>
            How it works
          </button>
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
          gap: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
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
          gap: 8, boxShadow: '0 4px 16px rgba(34,197,94,0.4)',
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
const HazardCard = ({ title, location, status, upvotes }) => (
  <div style={{ background: '#fff', borderRadius: 28, padding: '28px 28px 24px', border: '1px solid #f3f4f6', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
    {/* Badges */}
    <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
      <span style={{
        padding: '4px 12px', borderRadius: 999, fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em',
        background: status === 'Verified' ? '#dcfce7' : '#fff7ed',
        color:      status === 'Verified' ? '#16a34a'  : '#ea580c',
      }}>{status}</span>
      <span style={{ padding: '4px 12px', borderRadius: 999, fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', background: '#fee2e2', color: '#dc2626' }}>Pothole</span>
    </div>

    {/* Image placeholder */}
    <div style={{ height: 152, borderRadius: 16, background: 'linear-gradient(135deg,#e5e7eb,#d1d5db)', marginBottom: 20 }} />

    <h3 style={{ fontSize: 18, fontWeight: 800, color: '#111', marginBottom: 6 }}>{title}</h3>
    <p style={{ fontSize: 13, color: '#6b7280', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20 }}>
      <MapPin size={14} /> {location}
    </p>

    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: '1px solid #f9fafb' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 38, height: 38, background: '#f9fafb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ThumbsUp size={16} color="#111" />
        </div>
        <span style={{ fontSize: 20, fontWeight: 900, color: '#111' }}>{upvotes}</span>
      </div>
      <button style={{ fontSize: 13, fontWeight: 700, color: '#111', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
        Details <ChevronRight size={15} />
      </button>
    </div>
  </div>
);

/* ─── FEATURED HAZARDS ────────────────────────────────────── */
const FeaturedHazards = () => (
  <section style={{ padding: '96px 32px', background: '#fff' }}>
    <div style={{ maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 52 }}>
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#f97316', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 8 }}>Live feed</p>
          <h2 style={{ fontSize: 36, fontWeight: 900, color: '#111', letterSpacing: '-1px', margin: 0 }}>Most-upvoted hazards near you</h2>
        </div>
        <button style={{ fontSize: 14, fontWeight: 700, color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
          View all <ChevronRight size={18} />
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 28 }}>
        <HazardCard title="Pothole: Main Street"      location="102 Main Road, Colombo"        status="Pending"  upvotes={122} />
        <HazardCard title="Flooding: A1 Highway"      location="A1 Highway km 45, Kandy"       status="Pending"  upvotes={150} />
        <HazardCard title="Hazardous Debris"          location="88 Galle Road, Bentota"         status="Verified" upvotes={98}  />
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
const Home = () => (
  <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background: '#fff' }}>
    <main>
      <Hero />
      <HowItWorks />
      <WhatYouCanReport />
      <FeaturedHazards />
      <CTASection />
    </main>
  </div>
);

export default Home;

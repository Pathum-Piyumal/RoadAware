import React, { useState, useEffect, useRef } from 'react';
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
  Plus,
  Minus,
  Award,
  BookOpen,
  HelpCircle,
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



/* ─── DYNAMIC INTERACTION HELPERS ─────────────────────────── */

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

// Numerical Count Up Component
const CountUp = ({ end, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const domRef = useRef();

  useEffect(() => {
    let start = 0;
    const endVal = parseInt(end, 10);
    if (start === endVal) return;

    let timer;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const totalDuration = 1500;
          const incrementTime = Math.max(Math.floor(totalDuration / endVal), 24);
          
          timer = setInterval(() => {
            start += Math.ceil(endVal / 30);
            if (start >= endVal) {
              clearInterval(timer);
              setCount(endVal);
            } else {
              setCount(start);
            }
          }, incrementTime);
          
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });

    if (domRef.current) {
      observer.observe(domRef.current);
    }

    return () => {
      if (timer) clearInterval(timer);
      if (domRef.current) {
        observer.unobserve(domRef.current);
      }
    };
  }, [end]);

  return <span ref={domRef}>{count}{suffix}</span>;
};



/* ─── HERO ────────────────────────────────────────────────── */
const Hero = () => (
  <section style={{ position: 'relative', minHeight: '100vh', background: '#050505', overflow: 'hidden', paddingTop: 80, display: 'flex', alignItems: 'center' }}>
    {/* Glowing Mesh Blobs */}
    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-600/10 rounded-full blur-[140px] animate-pulse-glow pointer-events-none z-0" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-blue-600/10 rounded-full blur-[130px] animate-pulse-glow-reverse pointer-events-none z-0" />

    {/* Background Image Texture */}
    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      <img
        src="/assets/hero-bg.png"
        alt="Road background"
        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(5,5,5,0.9) 70%, #050505 100%)' }} />
    </div>

    <div 
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center px-6 md:px-8 py-16 lg:py-24"
      style={{ maxWidth: 1280, width: '100%', margin: '0 auto', position: 'relative', zIndex: 1 }}
    >
      {/* Left column */}
      <div className="space-y-8">
        {/* Live pulsing badge */}
        <div 
          className="animate-fade-in-up" 
          style={{ display: 'flex', alignItems: 'center', gap: 10, animationDelay: '0ms', animationFillMode: 'both' }}
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
          </span>
          <span style={{ fontSize: 11, fontWeight: 800, color: '#34d399', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Live traffic safety monitoring
          </span>
        </div>

        {/* Headline */}
        <h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-[950] tracking-tight leading-[1.02] text-white animate-fade-in-up"
          style={{ 
            margin: 0,
            animationDelay: '150ms', animationFillMode: 'both'
          }}
        >
          Safer roads,<br />
          built by the<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400">people who use them.</span>
        </h1>

        {/* Subtext */}
        <p 
          className="text-base sm:text-lg text-white/55 leading-relaxed max-w-lg animate-fade-in-up"
          style={{ 
            margin: 0,
            animationDelay: '300ms', animationFillMode: 'both'
          }}
        >
          Report potholes, street flooding, broken lights and more. Your reports alert 
          dispatch crews and protect other drivers in real time.
        </p>

        {/* CTAs */}
        <div 
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 animate-fade-in-up"
          style={{ animationDelay: '450ms', animationFillMode: 'both' }}
        >
          <Link to="/login" style={{
            background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
            color: '#fff',
            padding: '18px 40px',
            borderRadius: 20,
            fontWeight: 800,
            fontSize: 15,
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            boxShadow: '0 12px 32px rgba(249,115,22,0.35)',
            transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(249,115,22,0.45)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(249,115,22,0.35)'; }}
          >
            Get started <ArrowRight size={18} strokeWidth={2.5} />
          </Link>
          <Link to="/map" style={{
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(16px)',
            color: '#fff',
            padding: '18px 40px',
            borderRadius: 20,
            fontWeight: 700,
            fontSize: 15,
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            border: '1px solid rgba(255,255,255,0.12)',
            transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <MapIcon size={18} /> Explore the map
          </Link>
        </div>

        {/* Ratings and Stats Combined Row */}
        <div 
          className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-6 sm:gap-8 pt-4 animate-fade-in-up"
          style={{ animationDelay: '600ms', animationFillMode: 'both' }}
        >
          {/* Active members */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex' }}>
              {[0, 1, 2, 3].map(i => (
                <div key={i} style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: `hsl(${i * 40 + 200},45%,45%)`,
                  border: '2px solid #050505', marginLeft: i === 0 ? 0 : -10,
                }} />
              ))}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                {[1,2,3,4,5].map(s => <Star key={s} size={12} fill="#f97316" color="#f97316" />)}
                <span style={{ fontSize: 12, fontWeight: 900, color: '#fff', marginLeft: 4 }}>5.0</span>
              </div>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', margin: 0 }}>
                Loved by <strong style={{ color: '#fff' }}><CountUp end={12} suffix="k+" /> citizens</strong>
              </p>
            </div>
          </div>

          {/* Stats quick pill */}
          <div style={{
            display: 'inline-flex', background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20,
            backdropFilter: 'blur(12px)', padding: '8px 4px',
          }}>
            {[{ val: 34, label: 'Reports' }, { val: 9, label: 'Resolved' }].map((s, i) => (
              <div key={i} style={{
                padding: '0 18px', textAlign: 'center',
                borderRight: i === 0 ? '1px solid rgba(255,255,255,0.08)' : 'none',
              }}>
                <p style={{ fontSize: 18, fontWeight: 900, color: '#fff', margin: 0 }}>
                  <CountUp end={s.val} />
                </p>
                <p style={{ fontSize: 9, fontWeight: 800, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right column — Animated Floating Map Container */}
      <div 
        className="animate-float" 
        style={{ 
          position: 'relative', borderRadius: 32, overflow: 'hidden', 
          border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 40px 100px rgba(0,0,0,0.7)',
          animationDelay: '300ms'
        }}
      >
        <div className="h-[320px] sm:h-[400px] lg:h-[480px]">
          <MapContainer center={[51.556, -0.297]} zoom={14} style={{ height: '100%', width: '100%' }} zoomControl={false}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[51.556, -0.297]}>
              <Popup>Hazard Reported: A4006 Wembley</Popup>
            </Marker>
          </MapContainer>
        </div>

        {/* Floating Top Indicator Badge */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-white rounded-2xl p-3 sm:p-4 flex items-center gap-3 shadow-lg z-[1000]">
          <div style={{ width: 40, height: 40, background: '#fee2e2', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AlertTriangle size={20} color="#ef4444" />
          </div>
          <div>
            <p style={{ fontSize: 9, fontWeight: 800, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Live Alert</p>
            <p style={{ fontSize: 13, fontWeight: 800, color: '#111', margin: 0 }}>Pothole: A4006 Wembley</p>
          </div>
        </div>

        {/* Floating Bottom Tracker Badge */}
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-emerald-500 rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 flex items-center gap-2 shadow-emerald-500/40 shadow-lg z-[1000]">
          <CheckCircle2 size={16} color="#fff" />
          <span style={{ fontSize: 12, fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Verification Live</span>
        </div>
      </div>
    </div>
  </section>
);



/* ─── HOW IT WORKS ────────────────────────────────────────── */
const HowItWorks = () => {
  const [hoveredStep, setHoveredStep] = useState(null);

  const steps = [
    { icon: MapPin,     title: '1. Spot & Report',        desc: 'Identify a road safety issue, snap a high-resolution photo, and pin its coordinates on the live Leaflet map.', color: 'from-orange-500 to-amber-500', shadow: 'shadow-orange-500/20', border: 'hover:border-orange-500/30' },
    { icon: Zap,        title: '2. Community Validates',  desc: 'Nearby citizens review and upvote your active report, promoting urgency and prioritizing city dispatch lines.', color: 'from-blue-500 to-cyan-500', shadow: 'shadow-blue-500/20', border: 'hover:border-blue-500/30' },
    { icon: ShieldCheck,title: '3. Crews Respond',  desc: 'Verified municipal coordinates are dispatched directly to public works crews, updating the map instantly once resolved.', color: 'from-emerald-500 to-teal-500', shadow: 'shadow-emerald-500/20', border: 'hover:border-emerald-500/30' },
  ];

  return (
    <section 
      className="py-16 px-6 md:py-24 md:px-8"
      style={{ background: 'var(--color-admin-card-solid)', position: 'relative', overflow: 'hidden' }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}>
        
        <ScrollReveal>
          <p style={{ fontSize: 11, fontWeight: 800, color: '#f97316', textTransform: 'uppercase', letterSpacing: '0.25em', marginBottom: 12 }}>Workflow Engine</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-[950] text-[var(--color-admin-text)] tracking-tight mb-4">Three steps to a safer street</h2>
          <p style={{ fontSize: 16, color: 'var(--color-admin-text-muted)', maxWidth: 540, margin: '0 auto 80px', lineHeight: 1.7 }}>
            From initial citizen reporting to city works resolution, RoadAware bridges municipal gaps transparently.
          </p>
        </ScrollReveal>

        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
          style={{ position: 'relative' }}
        >
          {/* Background Connective Glow Line */}
          <div 
            style={{
              position: 'absolute', top: '78px', left: '15%', right: '15%', height: '4px',
              background: 'var(--color-admin-border)', zIndex: -1, borderRadius: 2
            }}
            className="hidden lg:block"
          />
          {/* Glowing fill line that dynamically responds to hover */}
          <div 
            style={{
              position: 'absolute', top: '78px', left: '15%', height: '4px',
              background: 'linear-gradient(90deg, #f97316 0%, #3b82f6 50%, #10b981 100%)', zIndex: -1, borderRadius: 2,
              width: hoveredStep === null ? '0%' : hoveredStep === 0 ? '25%' : hoveredStep === 1 ? '55%' : '70%',
              transition: 'width 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: '0 0 16px rgba(59,130,246,0.5)'
            }}
            className="hidden lg:block"
          />

          {steps.map((step, i) => (
            <ScrollReveal key={i} delay={i * 150}>
              <div 
                onMouseEnter={() => setHoveredStep(i)}
                onMouseLeave={() => setHoveredStep(null)}
                style={{ 
                  borderRadius: 32, border: '1px solid var(--color-admin-border)', background: 'var(--color-admin-card-solid)', cursor: 'default',
                  transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                className={`p-8 sm:p-10 hover:scale-[1.05] hover:shadow-2xl hover:shadow-slate-200/80 group ${step.border} h-full`}
              >
                <div 
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} ${step.shadow} flex items-center justify-center mb-8 mx-auto md:mx-0 transition-transform duration-500 group-hover:scale-115 group-hover:rotate-6`}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <step.icon size={26} color="#fff" className="group-hover:animate-pulse" />
                </div>
                <h3 style={{ fontSize: 21, fontWeight: 900, color: 'var(--color-admin-text)', marginBottom: 12 }}>{step.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--color-admin-text-muted)', lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};



/* ─── WHAT YOU CAN REPORT ─────────────────────────────────── */
const WhatYouCanReport = () => {
  const categories = [
    { name: 'Pothole',      icon: Car, color: 'hover:bg-red-50 hover:text-red-600 hover:border-red-200 hover:shadow-red-500/10 dark:hover:bg-red-950/20 dark:hover:text-red-400 dark:hover:border-red-900/50' },
    { name: 'Debris',       icon: Truck, color: 'hover:bg-amber-50 hover:text-amber-600 hover:border-amber-200 hover:shadow-amber-500/10 dark:hover:bg-amber-950/20 dark:hover:text-amber-400 dark:hover:border-amber-900/50' },
    { name: 'Construction', icon: Construction, color: 'hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 hover:shadow-orange-500/10 dark:hover:bg-orange-950/20 dark:hover:text-orange-400 dark:hover:border-orange-900/50' },
    { name: 'Streetlight',  icon: Lightbulb, color: 'hover:bg-yellow-50 hover:text-yellow-600 hover:border-yellow-200 hover:shadow-yellow-500/10 dark:hover:bg-yellow-950/20 dark:hover:text-yellow-400 dark:hover:border-yellow-900/50' },
    { name: 'Flooding',     icon: Droplets, color: 'hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 hover:shadow-blue-500/10 dark:hover:bg-blue-950/20 dark:hover:text-blue-400 dark:hover:border-blue-900/50' },
    { name: 'Ice / Snow',   icon: Snowflake, color: 'hover:bg-sky-50 hover:text-sky-600 hover:border-sky-200 hover:shadow-sky-500/10 dark:hover:bg-sky-950/20 dark:hover:text-sky-400 dark:hover:border-sky-900/50' },
    { name: 'Animal',       icon: PawPrint, color: 'hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 hover:shadow-emerald-500/10 dark:hover:bg-emerald-950/20 dark:hover:text-emerald-400 dark:hover:border-emerald-900/50' },
    { name: 'Other',        icon: AlertTriangle, color: 'hover:bg-slate-50 hover:text-slate-800 hover:border-slate-300 hover:shadow-slate-500/10 dark:hover:bg-slate-800/40 dark:hover:text-slate-200 dark:hover:border-slate-700/50' },
  ];

  return (
    <section 
      className="py-16 px-6 md:py-24 md:px-8"
      style={{ background: 'var(--color-admin-bg)' }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <ScrollReveal>
          <h2 style={{ fontSize: 32, fontWeight: 900, color: 'var(--color-admin-text)', marginBottom: 8, letterSpacing: '-0.5px' }}>What you can report</h2>
          <p style={{ fontSize: 15, color: 'var(--color-admin-text-muted)', marginBottom: 48 }}>Every logged coordinates ticket contributes directly to local municipal safety.</p>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 md:gap-5">
          {categories.map((cat, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <div 
                className={`bg-white p-6 rounded-2xl border border-slate-100 flex flex-col items-center gap-4 cursor-pointer transition-all duration-500 shadow-sm hover:-translate-y-2 hover:shadow-lg ${cat.color} group h-full justify-center`}
              >
                <cat.icon size={28} className="transition-transform duration-500 group-hover:scale-115" />
                <span style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', textAlign: 'center' }}>{cat.name}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};



/* ─── HAZARD CARD ─────────────────────────────────────────── */
const HazardCard = ({ title, location, status, upvotes, category, image, onDetailsClick }) => (
  <div 
    style={{ background: 'var(--color-admin-card-solid)', borderRadius: 32, padding: 32, border: '1px solid var(--color-admin-border)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)', height: '100%' }}
    className="group hover:shadow-2xl hover:shadow-slate-200/75 hover:border-orange-500/20 hover:-translate-y-1.5 animate-shimmer"
  >
    <div>
      {/* Badges */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <span style={{
          padding: '5px 14px', borderRadius: 999, fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em',
          background: status === 'Verified' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(249, 115, 22, 0.15)',
          color:      status === 'Verified' ? '#10b981'  : '#f97316',
        }}>{status}</span>
        <span style={{ padding: '5px 14px', borderRadius: 999, fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}>{category}</span>
      </div>

      {/* Real Zooming Image */}
      <div style={{ height: 160, borderRadius: 20, overflow: 'hidden', marginBottom: 24 }}>
        <img 
          src={image} 
          alt={title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)' }} 
          className="group-hover:scale-110"
        />
      </div>

      <h3 style={{ fontSize: 20, fontWeight: 900, color: 'var(--color-admin-text)', marginBottom: 8, transition: 'colors 0.3s' }} className="group-hover:text-orange-500">{title}</h3>
      <p style={{ fontSize: 13, color: 'var(--color-admin-text-muted)', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 24 }}>
        <MapPin size={14} className="text-slate-400" /> {location}
      </p>
    </div>

    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 20, borderTop: '1px solid var(--color-admin-border)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 34, height: 34, background: 'rgba(239, 68, 68, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.3s' }} className="flex items-center justify-center group-hover:scale-110">
          <Heart size={14} color="#ef4444" fill="#ef4444" />
        </div>
        <span style={{ fontSize: 15, fontWeight: 800, color: 'var(--color-admin-text)' }}>{upvotes}</span>
      </div>
      <button 
        onClick={onDetailsClick}
        style={{ fontSize: 13, fontWeight: 800, color: 'var(--color-admin-text)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
        className="hover:text-orange-500 transition-colors"
      >
        Details <ChevronRight size={16} />
      </button>
    </div>
  </div>
);



/* ─── FEATURED HAZARDS ────────────────────────────────────── */
const FeaturedHazards = ({ hazards, onDetailsClick }) => (
  <section 
    className="py-16 px-6 md:py-24 md:px-8"
    style={{ background: 'var(--color-admin-card-solid)' }}
  >
    <div style={{ maxWidth: 1280, margin: '0 auto' }}>
      
      <ScrollReveal>
        <div 
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-14"
        >
          <div>
            <p style={{ fontSize: 11, fontWeight: 800, color: '#f97316', textTransform: 'uppercase', letterSpacing: '0.25em', marginBottom: 8 }}>Live feed</p>
            <h2 style={{ fontSize: 40, fontWeight: 950, color: 'var(--color-admin-text)', letterSpacing: '-1.5px', margin: 0 }}>Most-upvoted hazards near you</h2>
          </div>
          <Link to="/map" style={{ fontSize: 14, fontWeight: 800, color: 'var(--color-admin-text-muted)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, textDecoration: 'none' }} className="hover:text-orange-500 transition-colors">
            View all <ChevronRight size={18} />
          </Link>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {hazards.map((hazard, i) => (
          <ScrollReveal key={hazard.id} delay={i * 150}>
            <HazardCard
              {...hazard}
              onDetailsClick={() => onDetailsClick(hazard)}
            />
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

const CommunityLeaderboard = () => {
  const users = [
    { rank: 1, name: 'Pathum Piyumal', score: '2,450', reports: 48, badge: 'Road Warden', color: 'from-amber-400 to-orange-500', text: 'text-amber-500' },
    { rank: 2, name: 'Tharusha Sangeeth', score: '1,980', reports: 36, badge: 'Safety Sentinel', color: 'from-slate-300 to-slate-400', text: 'text-slate-400' },
    { rank: 3, name: 'Lochani Ridimaliyadda', score: '1,420', reports: 22, badge: 'Active Observer', color: 'from-amber-600 to-amber-700', text: 'text-amber-700' },
  ];

  return (
    <section 
      className="py-16 px-6 md:py-24 md:px-8"
      style={{ background: 'var(--color-admin-bg)' }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <ScrollReveal>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{ width: 44, height: 44, background: 'rgba(239, 68, 68, 0.1)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Award size={22} className="text-red-500" />
                </div>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#f97316', textTransform: 'uppercase', letterSpacing: '0.25em' }}>Community Heroes</span>
              </div>
              <h2 style={{ fontSize: 42, fontWeight: 950, color: 'var(--color-admin-text)', letterSpacing: '-1.5px', marginBottom: 20 }}>Meet our top safety reporters</h2>
              <p style={{ fontSize: 16, color: 'var(--color-admin-text-muted)', lineHeight: 1.8, marginBottom: 36 }}>
                Road safety is a collaborative effort. Our gamified leaderboard celebrates active citizens who submit coordinates, upload photo evidence, and upvote hazards. 
              </p>
              <Link to="/register" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--color-admin-text)', color: 'var(--color-admin-card-solid)',
                padding: '16px 36px', borderRadius: 16, fontWeight: 800, fontSize: 14, textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)', transition: 'all 0.3s'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Join the leaderboard <Plus size={16} />
              </Link>
            </div>
          </ScrollReveal>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {users.map((u, i) => (
              <ScrollReveal key={u.rank} delay={i * 150}>
                <div 
                  className="p-5 sm:p-6 md:p-8 flex items-center justify-between gap-4 hover:scale-[1.03] hover:shadow-xl hover:border-slate-200/60 group duration-300"
                  style={{
                    background: 'var(--color-admin-card-solid)', borderRadius: 28,
                    border: '1px solid var(--color-admin-border)', transition: 'all 0.4s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                    {/* Rank Indicator */}
                    <div style={{
                      width: 44, height: 44, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 900, fontSize: 16, color: '#fff'
                    }} className={`bg-gradient-to-br ${u.color} shadow-sm group-hover:scale-110 transition-transform`}>
                      {u.rank}
                    </div>

                    {/* Meta info */}
                    <div>
                      <h4 style={{ fontSize: 17, fontWeight: 900, color: 'var(--color-admin-text)', margin: '0 0 4px 0' }}>{u.name}</h4>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 700, color: 'var(--color-admin-text-muted)' }}>
                        <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-md font-extrabold`}>{u.badge}</span>
                        <span>•</span>
                        <span>{u.reports} Reports</span>
                      </div>
                    </div>
                  </div>

                  {/* Reputation points */}
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: 18, fontWeight: 950, color: 'var(--color-admin-text)', margin: 0 }}>{u.score}</p>
                    <p style={{ fontSize: 9, fontWeight: 800, color: 'var(--color-admin-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>Reputation Pts</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};







/* ─── SAFETY INSIGHTS (New Resources Grid Section) ───────── */
const SafetyInsights = () => {
  const articles = [
    { 
      title: 'Navigating severe monsoon flooding safely', 
      category: 'Driving Tips', 
      date: 'May 16, 2026', 
      image: 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?q=80&w=600&auto=format&fit=crop',
      doc: 'Rain & Flooding'
    },
    { 
      title: 'How to claim insurance for pothole damage', 
      category: 'Citizen Guide', 
      date: 'May 12, 2026', 
      image: 'https://images.unsplash.com/photo-1584467541268-b040f83be3fd?q=80&w=600&auto=format&fit=crop',
      doc: 'Pothole Awareness'
    },
    { 
      title: 'Identifying road hazards in nighttime conditions', 
      category: 'Night Safety', 
      date: 'May 08, 2026', 
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5edd0cd9?q=80&w=600&auto=format&fit=crop',
      doc: 'Nighttime Driving'
    }
  ];

  return (
    <section 
      className="py-16 px-6 md:py-24 md:px-8"
      style={{ background: 'var(--color-admin-bg)' }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        
        <ScrollReveal>
          <div 
            className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-14"
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div style={{ width: 44, height: 44, background: 'rgba(59, 130, 246, 0.1)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <BookOpen size={22} className="text-blue-500" />
                </div>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.25em' }}>Safety Insights</span>
              </div>
              <h2 style={{ fontSize: 40, fontWeight: 950, color: 'var(--color-admin-text)', letterSpacing: '-1.5px', margin: 0 }}>Latest news & public bulletins</h2>
            </div>
            <Link to="/safety-tips" style={{ fontSize: 14, fontWeight: 800, color: 'var(--color-admin-text-muted)', display: 'flex', alignItems: 'center', gap: 4, textDecoration: 'none' }} className="hover:text-orange-500 transition-colors">
              Read all bulletins <ChevronRight size={18} />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((art, i) => (
            <ScrollReveal key={i} delay={i * 150}>
              <div 
                style={{ background: 'var(--color-admin-card-solid)', borderRadius: 32, overflow: 'hidden', border: '1px solid var(--color-admin-border)', display: 'flex', flexDirection: 'column', height: '100%', transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
                className="group hover:shadow-2xl hover:-translate-y-2 hover:border-slate-200"
              >
                {/* Photo cover zoom */}
                <div style={{ height: 180, overflow: 'hidden' }}>
                  <img 
                    src={art.image} 
                    alt={art.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)' }}
                    className="group-hover:scale-110"
                  />
                </div>

                <div style={{ padding: 32, flex: 1, display: 'flex', flexDirection: 'column', justifycontent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 800, color: '#f97316', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>
                      <span>{art.category}</span>
                      <span>•</span>
                      <span style={{ color: 'var(--color-admin-text-muted)' }}>{art.date}</span>
                    </div>
                    <h3 style={{ fontSize: 18, fontWeight: 900, color: 'var(--color-admin-text)', lineHeight: 1.4, margin: '0 0 24px 0', transition: 'colors 0.3s' }} className="group-hover:text-orange-500">
                      {art.title}
                    </h3>
                  </div>

                  <Link 
                    to="/safety-tips"
                    state={{ activeCategory: art.doc }}
                    style={{ fontSize: 13, fontWeight: 800, color: 'var(--color-admin-text)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}
                    className="group-hover:text-orange-500 transition-colors"
                  >
                    Read Detailed Guide <ChevronRight size={15} />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};



/* ─── CTA SECTION ─────────────────────────────────────────── */
const CTASection = () => (
  <section className="px-6 pb-16 md:px-8 md:pb-24">
    <ScrollReveal>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div 
          className="py-16 px-6 sm:py-20 sm:px-10 md:py-24 md:px-16 text-center rounded-[32px] sm:rounded-[48px] relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #1e40af 0%, #0f172a 100%)',
            boxShadow: '0 32px 80px rgba(30,64,175,0.3)',
          }}
        >
          {/* Subtle grid texture */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 40px)' }} />

          {/* Dynamic mesh glow inside CTA */}
          <div className="absolute top-[-20%] right-[-20%] w-[300px] h-[300px] bg-blue-600/20 rounded-full blur-[80px]" />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ width: 64, height: 64, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}>
              <CheckCircle2 size={30} color="#fff" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-[950] tracking-tight mb-4 text-white">See something? Say something.</h2>
            <p className="text-base sm:text-lg text-white/70 max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed">
              Your coordinates report could prevent the next accident. Help build safer roads and highly accountable civic infrastructure.
            </p>
            <Link to="/report-hazard" style={{
              display: 'inline-block', background: '#fff', color: '#1d4ed8',
              padding: '18px 48px', borderRadius: 20, fontWeight: 900, fontSize: 16,
              textDecoration: 'none', boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
              transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(255,255,255,0.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.25)'; }}
            >
              Submit report here
            </Link>
          </div>
        </div>
      </div>
    </ScrollReveal>
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
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background: 'var(--color-admin-bg)' }}>
      <main>
        <Hero />
        <HowItWorks />
        <WhatYouCanReport />
        <FeaturedHazards hazards={hazards} onDetailsClick={setSelectedHazard} />
        <CommunityLeaderboard />
        <SafetyInsights />
        <CTASection />
      </main>

      {/* Hazard Details Modal Overlay */}
      {selectedHazard && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16
        }}>
          <div 
            className="p-6 sm:p-8 max-w-[540px] w-full max-h-[90vh] overflow-y-auto relative rounded-[32px] border border-[var(--color-admin-border)] shadow-2xl"
            style={{
              background: 'var(--color-admin-card-solid)'
            }}
          >
            {/* Close button */}
            <button 
              onClick={() => setSelectedHazard(null)}
              style={{
                position: 'absolute', top: 24, right: 24, background: 'var(--color-admin-input-bg)', border: 'none',
                borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center',
                justifyContent: 'center', cursor: 'pointer', color: 'var(--color-admin-text-muted)', transition: 'background 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--color-admin-border)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--color-admin-input-bg)'}
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
                  background: selectedHazard.status === 'Verified' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(249, 115, 22, 0.15)',
                  color:      selectedHazard.status === 'Verified' ? '#10b981'  : '#f97316',
                }}>{selectedHazard.status}</span>
                <span style={{ padding: '4px 12px', borderRadius: 999, fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}>{selectedHazard.category}</span>
              </div>

              {/* Title & Metadata */}
              <h3 style={{ fontSize: 24, fontWeight: 900, color: 'var(--color-admin-text)', marginBottom: 8, letterSpacing: '-0.5px' }}>{selectedHazard.title}</h3>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: 13, color: 'var(--color-admin-text-muted)', marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid var(--color-admin-border)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <MapPin size={14} /> {selectedHazard.location}
                </span>
                <span>•</span>
                <span>{selectedHazard.date}</span>
              </div>

              {/* Description */}
              <div style={{ marginBottom: 28 }}>
                <h4 style={{ fontSize: 12, fontWeight: 800, color: 'var(--color-admin-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Incident Description</h4>
                <p style={{ fontSize: 14, color: 'var(--color-admin-text)', lineHeight: 1.6, margin: 0 }}>{selectedHazard.description}</p>
              </div>

              {/* Action and upvotes */}
              <div style={{ display: 'flex', alignItems: 'center', justifycontent: 'space-between', paddingTop: 20, borderTop: '1px solid var(--color-admin-border)' }} className="flex items-center justify-between">
                <button 
                  onClick={() => handleUpvote(selectedHazard.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.15)',
                    borderRadius: 16, padding: '12px 24px', cursor: 'pointer', transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)'; e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.25)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.08)'; e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.15)'; }}
                >
                  <Heart size={16} color="#ef4444" fill="#ef4444" />
                  <span style={{ fontSize: 14, fontWeight: 800, color: '#ef4444' }}>Upvote ({selectedHazard.upvotes})</span>
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

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Shield, 
  Trophy, 
  FileText, 
  CheckCircle2, 
  MapPin, 
  Map, 
  ArrowRight, 
  Flame, 
  Sparkles,
  ChevronRight,
  Clock,
  ThumbsUp,
  Plus,
  Compass
} from 'lucide-react';
import AuthService from '../../services/auth.service';
import HazardService from '../../services/hazard.service';
import UserService from '../../services/user.service';

// Viewport Scroll Reveal Component for Smooth Animations
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
        transition: 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'opacity, transform'
      }}
    >
      {children}
    </div>
  );
};

export default function CitizenDashboard() {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    setUser(currentUser);

    // Fetch live user profile data to connect real username dynamically
    UserService.getProfile()
      .then(data => {
        if (data.success && data.user) {
          setUser(data.user);
          localStorage.setItem('user', JSON.stringify(data.user));
        }
      })
      .catch(err => {
        console.error('Failed to load live profile data:', err);
      });

    HazardService.getMyHazards()
      .then(data => {
        setReports(data.reports || []);
      })
      .catch(err => {
        console.error('Failed to load reports:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const initial = user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'C';

  // Dynamic statistics calculations
  const totalReports = reports.length;
  const resolvedCount = reports.filter(r => r.status === 'resolved').length;
  const inProgressCount = reports.filter(r => r.status === 'in_progress').length;
  const upvotesCount = reports.reduce((acc, r) => acc + (r.upvotes ? r.upvotes.length : 0), 0);

  // Score formula: 100 points per report, 50 points per upvote, 200 points per resolved report
  const score = (totalReports * 100) + (upvotesCount * 50) + (resolvedCount * 200);

  // Badge thresholds
  let badge = 'Observer';
  let nextBadge = 'Community Helper';
  let nextBadgePoints = 100;
  let prevBadgePoints = 0;

  if (score >= 2000) {
    badge = 'Road Warden';
    nextBadge = 'Max Level';
    nextBadgePoints = 2000;
    prevBadgePoints = 2000;
  } else if (score >= 1000 || resolvedCount >= 30) {
    badge = 'Safety Sentinel';
    nextBadge = 'Road Warden';
    nextBadgePoints = 2000;
    prevBadgePoints = 1000;
  } else if (score >= 500 || totalReports >= 15) {
    badge = 'Active Observer';
    nextBadge = 'Safety Sentinel';
    nextBadgePoints = 1000;
    prevBadgePoints = 500;
  } else if (score >= 200 || totalReports >= 5) {
    badge = 'Pothole Patrol';
    nextBadge = 'Active Observer';
    nextBadgePoints = 500;
    prevBadgePoints = 200;
  } else if (score >= 100) {
    badge = 'Community Helper';
    nextBadge = 'Pothole Patrol';
    nextBadgePoints = 200;
    prevBadgePoints = 100;
  }

  const pointsInRange = score - prevBadgePoints;
  const rangeTotal = nextBadgePoints - prevBadgePoints;
  const progressPercent = rangeTotal > 0 ? Math.min(Math.max((pointsInRange / rangeTotal) * 100, 0), 100) : 100;

  const getBadgeColorStyles = (b) => {
    switch (b) {
      case 'Road Warden': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'Safety Sentinel': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Active Observer': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'Pothole Patrol': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'Community Helper': return 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20';
      default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'resolved':    return 'bg-green-500/10 text-green-600 border-green-500/20 dark:text-green-400';
      case 'in_progress': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20 dark:text-yellow-400';
      case 'rejected':    return 'bg-red-500/10 text-red-600 border-red-500/20 dark:text-red-400';
      default:            return 'bg-orange-500/10 text-orange-600 border-orange-500/20 dark:text-orange-400';
    }
  };

  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    }).format(new Date(dateString));
  };

  const recentReports = reports.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-slate-950 font-sans text-gray-900 dark:text-slate-100 pb-24 selection:bg-orange-100 selection:text-orange-950">
      {/* Banner Area */}
      <section className="relative pt-36 pb-28 overflow-hidden bg-[#050505] text-white">
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-orange-600/10 rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] -ml-48 -mb-48 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 animate-fade-in-up">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-orange-500/20">
                {initial}
              </div>
              <div className="space-y-1.5">
                <span className="text-orange-500 font-black text-[10px] tracking-[0.25em] uppercase block">Citizen Command Center</span>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none">
                  Hello, {user?.name || 'Citizen'}
                </h1>
                <div className="flex flex-wrap items-center gap-3 mt-2">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${getBadgeColorStyles(badge)}`}>
                    {badge}
                  </span>
                  <span className="text-xs text-gray-400 font-semibold">• {score} Reputation XP</span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => navigate('/report-hazard')}
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-orange-950/30 hover:shadow-orange-600/20 hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
            >
              <Plus size={18} strokeWidth={2.5} /> Report New Hazard
            </button>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stats & Progress Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gamification Progress Card */}
            <ScrollReveal delay={50}>
              <div className="bg-white dark:bg-slate-900 rounded-[32px] p-8 border border-gray-100 dark:border-slate-800 shadow-xl shadow-gray-200/40 dark:shadow-none flex flex-col justify-between h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-orange-500/5 to-transparent rounded-bl-full pointer-events-none" />
                
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                      <Sparkles size={20} className="text-orange-500" /> Milestone Progression
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Unlock tiers and boost your municipal validation weight.</p>
                  </div>
                  <Trophy className="text-orange-500 fill-orange-500/10" size={32} />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between text-xs font-black uppercase tracking-wider text-gray-500 dark:text-slate-400">
                    <span>Current: {badge}</span>
                    {nextBadge !== 'Max Level' ? (
                      <span>Next: {nextBadge}</span>
                    ) : (
                      <span className="text-orange-500">Maximum Tier Achieved</span>
                    )}
                  </div>

                  <div className="relative w-full h-3 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-1000 ease-out shadow-inner"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{score} XP</span>
                    {nextBadge !== 'Max Level' ? (
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                        {nextBadgePoints - score} XP needed for next rank
                      </span>
                    ) : (
                      <span className="text-xs text-orange-500 font-extrabold flex items-center gap-1">
                        <Flame size={12} /> Elite Road Guardian
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Live Stats Indicators Grid */}
            <ScrollReveal delay={150}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {[
                  { label: 'Reputation XP', value: score, icon: Trophy, color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/20' },
                  { label: 'Hazards Logged', value: totalReports, icon: FileText, color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/20' },
                  { label: 'Resolved', value: resolvedCount, icon: CheckCircle2, color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20' },
                  { label: 'Upvote Audits', value: upvotesCount, icon: ThumbsUp, color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/20' }
                ].map((stat, i) => (
                  <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-lg shadow-gray-200/30 dark:shadow-none flex flex-col justify-between">
                    <div className={`w-10 h-10 ${stat.color} rounded-2xl flex items-center justify-center mb-4`}>
                      <stat.icon size={20} />
                    </div>
                    <div>
                      <span className="text-3xl font-black tracking-tight text-slate-900 dark:text-white leading-none block">
                        {loading ? '...' : stat.value}
                      </span>
                      <p className="text-[10px] font-black uppercase text-gray-400 dark:text-slate-400 tracking-wider mt-2">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Recent Submissions */}
            <ScrollReveal delay={250}>
              <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-gray-100 dark:border-slate-800 shadow-xl shadow-gray-200/40 dark:shadow-none p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <Clock size={20} className="text-orange-500" /> Recent Submissions
                  </h3>
                  <Link to="/my-reports" className="text-xs font-black text-orange-500 hover:text-orange-600 flex items-center gap-1 group uppercase tracking-wider">
                    View All <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>

                {loading ? (
                  <div className="space-y-4">
                    {[1, 2].map(i => (
                      <div key={i} className="h-16 bg-gray-50 dark:bg-slate-800 animate-pulse rounded-2xl" />
                    ))}
                  </div>
                ) : recentReports.length === 0 ? (
                  <div className="text-center py-12 border border-dashed border-gray-200 dark:border-slate-800 rounded-2xl">
                    <FileText className="mx-auto text-slate-300 dark:text-slate-700 mb-3" size={36} />
                    <p className="text-sm font-bold text-slate-500">You haven't reported any hazards yet.</p>
                    <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto">Help make roads safer by submitting your first report today.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentReports.map(report => (
                      <div 
                        key={report.id} 
                        onClick={() => navigate(`/hazard/${report.id}`)}
                        className="p-5 border border-gray-50 dark:border-slate-800/50 rounded-2xl hover:border-slate-200 dark:hover:border-slate-700 hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-all flex justify-between items-center cursor-pointer group"
                      >
                        <div className="flex items-center gap-4 min-w-0">
                          <div className="p-3 bg-orange-50 dark:bg-slate-800 text-orange-500 rounded-xl shrink-0">
                            <MapPin size={18} />
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-bold text-slate-900 dark:text-white truncate group-hover:text-orange-500 transition-colors">{report.title}</h4>
                            <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                              {report.category?.name || 'Hazard'} • {formatDate(report.createdAt)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className={`px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-full border ${getStatusStyle(report.status)}`}>
                            {report.status === 'resolved' ? 'Resolved' : (report.status === 'in_progress' ? 'In Progress' : 'Reported')}
                          </span>
                          <ChevronRight size={16} className="text-gray-300 dark:text-slate-700 group-hover:translate-x-1 transition-transform shrink-0" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>

          {/* Quick Actions & Guidelines Sidebar */}
          <div className="space-y-8">
            {/* Quick Action Navigation */}
            <ScrollReveal delay={100}>
              <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-gray-100 dark:border-slate-800 shadow-xl shadow-gray-200/40 dark:shadow-none p-8">
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-6">Action Hub</h3>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { label: 'Submit Coordinates', desc: 'Report potholes or blockages', path: '/report-hazard', icon: Plus, color: 'text-orange-500 bg-orange-50 dark:bg-orange-950/20' },
                    { label: 'Interactive Map', desc: 'Browse reported local issues', path: '/map', icon: Map, color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/20' },
                    { label: 'Safety Standings', desc: 'Check global community ranks', path: '/leaderboard', icon: Trophy, color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/20' },
                    { label: 'Report Ledger', desc: 'Track resolution logs & notes', path: '/my-reports', icon: Compass, color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/20' }
                  ].map((action, i) => (
                    <Link 
                      key={i} 
                      to={action.path}
                      className="p-4 rounded-2xl border border-gray-50 dark:border-slate-800/40 hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-md transition-all flex items-center gap-4 cursor-pointer group text-left"
                    >
                      <div className={`w-10 h-10 ${action.color} rounded-xl flex items-center justify-center shrink-0`}>
                        <action.icon size={18} />
                      </div>
                      <div className="min-w-0 flex-grow">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-tight group-hover:text-orange-500 transition-colors">{action.label}</h4>
                        <p className="text-[11px] text-gray-400 mt-0.5 truncate">{action.desc}</p>
                      </div>
                      <ChevronRight size={14} className="text-gray-300 dark:text-slate-700 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Scoring & Rules Card */}
            <ScrollReveal delay={200}>
              <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-[32px] p-8 shadow-xl dark:shadow-none relative overflow-hidden border border-gray-100 dark:border-slate-800">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
                
                <h3 className="text-lg font-black tracking-tight mb-4 flex items-center gap-2">
                  <Flame size={18} className="text-orange-500 animate-pulse" /> Safety Rewards
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                  Earn points and reputation badges for keeping municipal zones safe. Active contributions carry higher validation weight.
                </p>

                <div className="space-y-4">
                  {[
                    { label: 'Submit verified hazard', points: '+100 XP' },
                    { label: 'Upvote/audit report', points: '+50 XP' },
                    { label: 'Assigned crew resolution', points: '+200 XP' }
                  ].map((rule, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs font-semibold py-2.5 border-b border-slate-100 dark:border-slate-800/50 last:border-b-0">
                      <span className="text-slate-700 dark:text-slate-300">{rule.label}</span>
                      <span className="text-orange-600 dark:text-orange-400 font-extrabold">{rule.points}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </main>
    </div>
  );
}

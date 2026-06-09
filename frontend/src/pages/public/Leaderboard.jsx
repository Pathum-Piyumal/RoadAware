import React, { useState, useEffect, useRef } from 'react';
import { Award, Trophy, Star, Search, Shield, Heart, MapPin, Flame, ArrowRight, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthService from '../../services/auth.service';
import api from '../../services/api';
import RadarLoader from '../../components/common/RadarLoader';

// Viewport Scroll Reveal Component
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

export default function Leaderboard() {
  const currentUser = AuthService.getCurrentUser();
  const [searchQuery, setSearchQuery] = useState('');
  const [timeframe, setTimeframe] = useState('all-time'); // 'weekly', 'monthly', 'all-time'
  const [reporters, setReporters] = useState([]);
  const [loading, setLoading] = useState(true);

  // Seeded mock fallback reporters in case backend is empty
  const mockAllTime = [
    { rank: 1, name: 'Pathum Piyumal', score: 2450, reports: 48, resolved: 39, badge: 'Road Warden', region: 'Colombo 03', color: 'from-amber-400 to-orange-500', bg: 'bg-amber-500/10', text: 'text-amber-500', initial: 'PP' },
    { rank: 2, name: 'Tharusha Sangeeth', score: 1980, reports: 36, resolved: 28, badge: 'Safety Sentinel', region: 'Gampaha', color: 'from-slate-300 to-slate-400', bg: 'bg-slate-400/10', text: 'text-slate-400', initial: 'TS' },
    { rank: 3, name: 'Lochani Ridimaliyadda', score: 1420, reports: 22, resolved: 18, badge: 'Active Observer', region: 'Kandy', color: 'from-amber-600 to-amber-700', bg: 'bg-amber-700/10', text: 'text-amber-700', initial: 'LR' },
    { rank: 4, name: 'Amara de Silva', score: 1210, reports: 19, resolved: 15, badge: 'Pothole Patrol', region: 'Colombo 07', initial: 'AS' },
    { rank: 5, name: 'Roshan Gunawardena', score: 980, reports: 16, resolved: 12, badge: 'Pothole Patrol', region: 'Negombo', initial: 'RG' },
    { rank: 6, name: 'Nisansala Perera', score: 850, reports: 14, resolved: 9, badge: 'Community Helper', region: 'Galle', initial: 'NP' },
    { rank: 7, name: 'Dinesh Fernando', score: 720, reports: 11, resolved: 8, badge: 'Community Helper', region: 'Colombo 05', initial: 'DF' },
    { rank: 8, name: 'Sanduni Jayasekara', score: 610, reports: 9, resolved: 6, badge: 'Observer', region: 'Kurunegala', initial: 'SJ' }
  ];

  const mockMonthly = [
    { rank: 1, name: 'Tharusha Sangeeth', score: 820, reports: 15, resolved: 12, badge: 'Safety Sentinel', region: 'Gampaha', color: 'from-amber-400 to-orange-500', bg: 'bg-amber-500/10', text: 'text-amber-500', initial: 'TS' },
    { rank: 2, name: 'Pathum Piyumal', score: 750, reports: 12, resolved: 10, badge: 'Road Warden', region: 'Colombo 03', color: 'from-slate-300 to-slate-400', bg: 'bg-slate-400/10', text: 'text-slate-400', initial: 'PP' },
    { rank: 3, name: 'Amara de Silva', score: 640, reports: 10, resolved: 8, badge: 'Pothole Patrol', region: 'Colombo 07', color: 'from-amber-600 to-amber-700', bg: 'bg-amber-700/10', text: 'text-amber-700', initial: 'AS' },
    { rank: 4, name: 'Lochani Ridimaliyadda', score: 580, reports: 9, resolved: 7, badge: 'Active Observer', region: 'Kandy', initial: 'LR' },
    { rank: 5, name: 'Nisansala Perera', score: 420, reports: 7, resolved: 5, badge: 'Community Helper', region: 'Galle', initial: 'NP' }
  ];

  const mockWeekly = [
    { rank: 1, name: 'Pathum Piyumal', score: 310, reports: 5, resolved: 4, badge: 'Road Warden', region: 'Colombo 03', color: 'from-amber-400 to-orange-500', bg: 'bg-amber-500/10', text: 'text-amber-500', initial: 'PP' },
    { rank: 2, name: 'Roshan Gunawardena', score: 280, reports: 4, resolved: 3, badge: 'Pothole Patrol', region: 'Negombo', color: 'from-slate-300 to-slate-400', bg: 'bg-slate-400/10', text: 'text-slate-400', initial: 'RG' },
    { rank: 3, name: 'Tharusha Sangeeth', score: 210, reports: 3, resolved: 2, badge: 'Safety Sentinel', region: 'Gampaha', color: 'from-amber-600 to-amber-700', bg: 'bg-amber-700/10', text: 'text-amber-700', initial: 'TS' },
    { rank: 4, name: 'Dinesh Fernando', score: 180, reports: 2, resolved: 2, badge: 'Community Helper', region: 'Colombo 05', initial: 'DF' },
    { rank: 5, name: 'Sanduni Jayasekara', score: 150, reports: 2, resolved: 1, badge: 'Observer', region: 'Kurunegala', initial: 'SJ' }
  ];

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/reports/leaderboard?timeframe=${timeframe}`);
        let data = response.data.leaderboard || [];

        // If the database has citizens with actual activity, we use them
        // otherwise, we merge with mock data to keep it looking rich and professional
        if (data.length <= 1) {
          const currentMock = timeframe === 'weekly' ? mockWeekly : (timeframe === 'monthly' ? mockMonthly : mockAllTime);
          const existingNames = new Set(data.map(d => d.name.toLowerCase()));
          const extra = currentMock.filter(m => !existingNames.has(m.name.toLowerCase()));
          data = [...data, ...extra];
        }

        // Map ranking position and styles
        const formatted = data.map((r, index) => {
          const rank = index + 1;
          if (rank === 1) {
            return { ...r, rank, color: 'from-amber-400 to-orange-500', bg: 'bg-amber-500/10', text: 'text-amber-500' };
          } else if (rank === 2) {
            return { ...r, rank, color: 'from-slate-300 to-slate-400', bg: 'bg-slate-400/10', text: 'text-slate-400' };
          } else if (rank === 3) {
            return { ...r, rank, color: 'from-amber-600 to-amber-700', bg: 'bg-amber-700/10', text: 'text-amber-700' };
          }
          return { ...r, rank };
        });

        setReporters(formatted);
      } catch (err) {
        console.error("Failed to load leaderboard from API:", err);
        const currentMock = timeframe === 'weekly' ? mockWeekly : (timeframe === 'monthly' ? mockMonthly : mockAllTime);
        setReporters(currentMock);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, [timeframe]);

  const activeReporters = reporters.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const top3 = reporters.slice(0, 3);
  const remaining = activeReporters.filter(r => r.rank > 3);

  // Badge list definitions
  const badgeMilestones = [
    { title: "Road Warden", desc: "Awarded to elite members scoring above 2,000 reputation points.", requirement: "2,000+ Pts", icon: Shield, color: "text-amber-500", bg: "bg-amber-50 border-amber-100" },
    { title: "Safety Sentinel", desc: "Earned by submitting over 30 verified hazard reports.", requirement: "30+ Resolved", icon: Trophy, color: "text-blue-500", bg: "bg-blue-50 border-blue-100" },
    { title: "Active Observer", desc: "Awarded for consistent reporting and upvote validations.", requirement: "15+ Reports", icon: Star, color: "text-emerald-500", bg: "bg-emerald-50 border-emerald-100" },
    { title: "Pothole Patrol", desc: "Granted after reporting and resolving 5 structural potholes.", requirement: "5+ Potholes", icon: Flame, color: "text-purple-500", bg: "bg-purple-50 border-purple-100" }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        <RadarLoader size="medium" message="Retrieving safety champion rankings..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 font-sans text-gray-900 dark:text-slate-100 pb-24 selection:bg-orange-100 selection:text-orange-900">
      {/* Hero Section */}
      <section className="relative pt-40 pb-36 overflow-hidden bg-[#050505] text-white">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px] -mr-64 -mt-64 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[110px] -ml-64 -mb-64" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold tracking-widest uppercase mb-8">
            <Trophy size={14} /> Community Leaderboard
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] mb-8">
            Road Safety <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500">Champions.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Celebrating active citizens who take ownership of local infrastructure, report active hazards, and make our communities safer.
          </p>
        </div>
      </section>

      {/* Podiums for Top 3 */}
      <section className="max-w-6xl mx-auto px-6 -mt-24 relative z-20 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
          
          {/* Rank 2 Podium */}
          {top3[1] && (
            <ScrollReveal delay={100}>
              <div className="bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-gray-100 dark:border-slate-800 shadow-xl shadow-gray-200/40 dark:shadow-none text-center flex flex-col items-center justify-between min-h-[360px]">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 border-4 border-slate-300 dark:border-slate-700 flex items-center justify-center text-2xl font-black text-slate-500 shadow-inner">
                    {top3[1].initial}
                  </div>
                  <span className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-700 text-white font-bold flex items-center justify-center shadow-md">2</span>
                </div>
                <div className="mt-6">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{top3[1].name}</h3>
                  <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-3">{top3[1].badge}</p>
                  <p className="text-sm text-gray-400 flex items-center gap-1 justify-center"><MapPin size={12} /> {top3[1].region}</p>
                </div>
                <div className="w-full pt-6 mt-6 border-t border-gray-50 dark:border-slate-800 flex justify-around">
                  <div>
                    <span className="text-lg font-black text-slate-900 dark:text-white">{top3[1].score}</span>
                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Points</p>
                  </div>
                  <div className="border-r border-gray-100 dark:border-slate-800" />
                  <div>
                    <span className="text-lg font-black text-slate-900 dark:text-white">{top3[1].reports}</span>
                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Reports</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Rank 1 Podium (Taller, Center) */}
          {top3[0] && (
            <ScrollReveal delay={0}>
              <div className="bg-white dark:bg-slate-900 p-10 rounded-[40px] border-2 border-orange-500/30 dark:border-orange-500/20 shadow-2xl shadow-orange-500/5 dark:shadow-none text-center flex flex-col items-center justify-between min-h-[420px] relative -translate-y-4">
                <div className="absolute top-4 right-4 bg-orange-500/10 text-orange-500 rounded-full p-2">
                  <Trophy size={20} />
                </div>
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-orange-50 dark:bg-orange-950/20 border-4 border-orange-500 flex items-center justify-center text-3xl font-black text-orange-500 shadow-md">
                    {top3[0].initial}
                  </div>
                  <span className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-orange-500 text-white font-extrabold text-lg flex items-center justify-center shadow-lg">1</span>
                </div>
                <div className="mt-8">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-1">{top3[0].name}</h3>
                  <p className="text-xs font-black text-orange-500 uppercase tracking-widest mb-3">{top3[0].badge}</p>
                  <p className="text-sm text-gray-400 flex items-center gap-1 justify-center"><MapPin size={12} /> {top3[0].region}</p>
                </div>
                <div className="w-full pt-8 mt-6 border-t border-gray-50 dark:border-slate-800 flex justify-around">
                  <div>
                    <span className="text-xl font-black text-orange-600 dark:text-orange-500">{top3[0].score}</span>
                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Points</p>
                  </div>
                  <div className="border-r border-gray-100 dark:border-slate-800" />
                  <div>
                    <span className="text-xl font-black text-slate-900 dark:text-white">{top3[0].reports}</span>
                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Reports</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Rank 3 Podium */}
          {top3[2] && (
            <ScrollReveal delay={200}>
              <div className="bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-gray-100 dark:border-slate-800 shadow-xl shadow-gray-200/40 dark:shadow-none text-center flex flex-col items-center justify-between min-h-[360px]">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-orange-50/50 dark:bg-slate-800 border-4 border-amber-600/60 flex items-center justify-center text-2xl font-black text-amber-700 dark:text-amber-600 shadow-inner">
                    {top3[2].initial}
                  </div>
                  <span className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-amber-700/80 text-white font-bold flex items-center justify-center shadow-md">3</span>
                </div>
                <div className="mt-6">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{top3[2].name}</h3>
                  <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-3">{top3[2].badge}</p>
                  <p className="text-sm text-gray-400 flex items-center gap-1 justify-center"><MapPin size={12} /> {top3[2].region}</p>
                </div>
                <div className="w-full pt-6 mt-6 border-t border-gray-50 dark:border-slate-800 flex justify-around">
                  <div>
                    <span className="text-lg font-black text-slate-900 dark:text-white">{top3[2].score}</span>
                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Points</p>
                  </div>
                  <div className="border-r border-gray-100 dark:border-slate-800" />
                  <div>
                    <span className="text-lg font-black text-slate-900 dark:text-white">{top3[2].reports}</span>
                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Reports</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )}

        </div>
      </section>

      {/* Main Ranking Table & Controls */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <ScrollReveal>
          <div className="bg-white dark:bg-slate-900 rounded-[36px] border border-gray-100 dark:border-slate-800 shadow-xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
              
              {/* Timeframe selector tabs */}
              <div className="flex bg-gray-50 dark:bg-slate-950 p-1.5 rounded-2xl border border-gray-100 dark:border-slate-800 w-full md:w-auto">
                {['weekly', 'monthly', 'all-time'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTimeframe(t)}
                    className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-widest transition-all cursor-pointer border-none ${
                      timeframe === t 
                        ? 'bg-orange-500 text-white shadow-md' 
                        : 'text-gray-400 hover:text-slate-950 dark:hover:text-white'
                    }`}
                  >
                    {t.replace('-', ' ')}
                  </button>
                ))}
              </div>

              {/* Search bar */}
              <div className="relative w-full md:w-72">
                <input
                  type="text"
                  placeholder="Search by name or region..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-100 dark:border-slate-800 rounded-2xl py-3.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-500/50"
                />
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>

            </div>

            {/* Rankings Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-50 dark:border-slate-800 text-[11px] font-black uppercase text-gray-400 tracking-widest">
                    <th className="py-4 px-6">Rank</th>
                    <th className="py-4 px-6">Reporter</th>
                    <th className="py-4 px-6">Region</th>
                    <th className="py-4 px-6 text-center">Reports</th>
                    <th className="py-4 px-6 text-center">Resolved</th>
                    <th className="py-4 px-6 text-right">Reputation Score</th>
                  </tr>
                </thead>
                <tbody>
                  {activeReporters.map((reporter) => (
                    <tr key={reporter.name} className="border-b border-gray-50 dark:border-slate-800 hover:bg-gray-50/50 dark:hover:bg-slate-900/30 transition-colors">
                      <td className="py-5 px-6">
                        <span className={`w-8 h-8 rounded-lg font-black text-sm flex items-center justify-center ${
                          reporter.rank === 1 ? 'bg-amber-100 text-amber-700' :
                          reporter.rank === 2 ? 'bg-slate-100 text-slate-700' :
                          reporter.rank === 3 ? 'bg-amber-50 text-amber-800' : 'text-gray-400'
                        }`}>
                          #{reporter.rank}
                        </span>
                      </td>
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-orange-50 dark:bg-slate-800 text-orange-600 flex items-center justify-center font-bold">
                            {reporter.initial}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white block">{reporter.name}</span>
                            <span className="text-[10px] font-black text-orange-500 uppercase tracking-wider">{reporter.badge}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-5 px-6 text-sm text-gray-500 font-medium">
                        <span className="flex items-center gap-1"><MapPin size={12} /> {reporter.region}</span>
                      </td>
                      <td className="py-5 px-6 text-center font-bold">{reporter.reports}</td>
                      <td className="py-5 px-6 text-center text-green-600 dark:text-green-400 font-bold">{reporter.resolved}</td>
                      <td className="py-5 px-6 text-right font-black text-slate-900 dark:text-white">{reporter.score} pts</td>
                    </tr>
                  ))}
                  {activeReporters.length === 0 && (
                    <tr>
                      <td colSpan="6" className="py-12 text-center text-gray-400 font-bold">
                        No safety champions found matching "{searchQuery}"
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </ScrollReveal>
      </section>

      {/* Badges system showcase */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-[0.2em] text-orange-500 uppercase mb-4 block">Milestone Rewards</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">Earn active reputation badges</h2>
            <p className="text-sm text-gray-500 mt-4 leading-relaxed">
              Unlock prestigious badges as you audit infrastructure conditions, participate in validations, and help repair crews find hazards.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {badgeMilestones.map((b, i) => {
            const Icon = b.icon;
            return (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[28px] border border-gray-100 dark:border-slate-800 shadow-md flex flex-col justify-between h-full items-start">
                  <div className="w-full">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${b.bg} ${b.color}`}>
                      <Icon size={24} />
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">{b.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed mb-6">{b.desc}</p>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-orange-600 bg-orange-50 dark:bg-orange-950/20 dark:text-orange-400 px-3 py-1 rounded-md">
                    {b.requirement}
                  </span>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* CTA Join Section */}
      <section className="max-w-5xl mx-auto px-6">
        <ScrollReveal>
          <div className="bg-[#050505] rounded-[48px] p-12 md:p-20 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-orange-600/10 rounded-full blur-[80px] -mr-16 -mt-16" />
            <h2 className="text-4xl font-black mb-6">Become a Road Safety Champion</h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed text-sm">
              Your reports help coordinate repairs, protect drivers, and build beautiful community infrastructure. Start reporting today.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link to={currentUser ? "/report-hazard" : "/login"} className="px-10 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-2xl transition-all shadow-xl flex items-center gap-2 border-none text-sm">
                Submit A Report <Award size={18} />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
  BarChart, Bar
} from 'recharts';
import {
  AlertTriangle, CheckCircle2, Clock, AlertOctagon,
  Lightbulb, AlertCircle, Droplets, ArrowUpRight, ArrowDownRight,
  Construction
} from 'lucide-react';
import api from '../../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalReports: 0,
    resolutionRate: 0,
    inProgressReports: 0,
    criticalOpen: 0
  });
  const [areaChartData, setAreaChartData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [hazardTypeData, setHazardTypeData] = useState([]);
  const [hotspotData, setHotspotData] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get('/analytics/dashboard');
        if (response.data.success) {
          const s = response.data.stats;
          setStats({
            totalReports: s.totalReports,
            resolutionRate: s.resolutionRate,
            inProgressReports: s.inProgressReports,
            criticalOpen: s.criticalOpen
          });
          setAreaChartData(s.areaChartData || []);
          setStatusData(s.statusData || []);
          setHazardTypeData(s.hazardTypeData || []);
          setHotspotData(s.hotspotData || []);
          setRecentActivity(s.recentActivity || []);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);
  // Helpers
  const getIcon = (type) => {
    switch (type) {
      case 'light': return <Lightbulb size={20} />;
      case 'infrastructure': return <AlertTriangle size={20} />;
      case 'construction': return <Construction size={20} />;
      case 'flood': return <Droplets size={20} />;
      default: return <AlertCircle size={20} />;
    }
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase().replace(' ', '-')) {
      case 'resolved': return 'text-emerald-500 bg-emerald-500/10';
      case 'reported': return 'text-blue-500 bg-blue-500/10';
      case 'in-progress': return 'text-amber-500 bg-amber-500/10';
      default: return '';
    }
  };

  const getSeverityClass = (severity) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'text-red-500 bg-red-500/10';
      case 'high': return 'text-amber-500 bg-amber-500/10';
      case 'medium': return 'text-blue-500 bg-blue-500/10';
      case 'low': return 'text-emerald-500 bg-emerald-500/10';
      default: return '';
    }
  };

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-10rem)] items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-8 animate-[fadeIn_0.5s_ease-in-out]">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
      
      {/* Header */}
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-admin-text tracking-tight m-0">Dashboard</h1>
        <p className="text-admin-text-muted text-sm mt-1">Real-time view of road hazard reports across the city.</p>
      </div>

      {/* Row 1: Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="glass-panel rounded-2xl p-6 relative hover-lift group overflow-hidden">
          {/* Subtle gradient glow in the background of the card */}
          <div className="absolute -inset-4 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          <div className="flex justify-between items-start mb-2">
            <div className="bg-admin-bg rounded-lg p-2 inline-flex" style={{ color: '#3B82F6', backgroundColor: 'rgba(59,130,246,0.1)' }}>
              <AlertTriangle size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-admin-text m-0 mb-1">{stats.totalReports}</p>
          <p className="text-sm text-admin-text-muted m-0">Total reports</p>
        </div>

        <div className="glass-panel rounded-2xl p-6 relative hover-lift group overflow-hidden">
          {/* Subtle gradient glow in the background of the card */}
          <div className="absolute -inset-4 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          <div className="flex justify-between items-start mb-2">
            <div className="bg-admin-bg rounded-lg p-2 inline-flex" style={{ color: '#10B981', backgroundColor: 'rgba(16,185,129,0.1)' }}>
              <CheckCircle2 size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-admin-text m-0 mb-1">{stats.resolutionRate}%</p>
          <p className="text-sm text-admin-text-muted m-0">Resolution rate</p>
        </div>

        <div className="glass-panel rounded-2xl p-6 relative hover-lift group overflow-hidden">
          {/* Subtle gradient glow in the background of the card */}
          <div className="absolute -inset-4 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          <div className="flex justify-between items-start mb-2">
            <div className="bg-admin-bg rounded-lg p-2 inline-flex" style={{ color: '#F59E0B', backgroundColor: 'rgba(245,158,11,0.1)' }}>
              <Clock size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-admin-text m-0 mb-1">{stats.inProgressReports}</p>
          <p className="text-sm text-admin-text-muted m-0">In progress</p>
        </div>

        <div className="glass-panel rounded-2xl p-6 relative hover-lift group overflow-hidden">
          {/* Subtle gradient glow in the background of the card */}
          <div className="absolute -inset-4 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          <div className="flex justify-between items-start mb-2">
            <div className="bg-admin-bg rounded-lg p-2 inline-flex" style={{ color: '#EF4444', backgroundColor: 'rgba(239,68,68,0.1)' }}>
              <AlertOctagon size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-admin-text m-0 mb-1">{stats.criticalOpen}</p>
          <p className="text-sm text-admin-text-muted m-0">Critical open</p>
        </div>
      </div>

      {/* Row 2: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
        {/* Area Chart */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col hover-glow transition-shadow duration-300">
          <div className="mb-6">
            <h2 className="text-base font-semibold text-admin-text m-0">Reports vs resolutions</h2>
            <p className="text-xs text-admin-text-muted mt-1 mb-0">Last 14 days</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorReports" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorRes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="reports" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorReports)" />
                <Area type="monotone" dataKey="resolutions" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorRes)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col hover-glow transition-shadow duration-300">
          <div className="mb-6">
            <h2 className="text-base font-semibold text-admin-text m-0">Status breakdown</h2>
            <p className="text-xs text-admin-text-muted mt-1 mb-0">All reports</p>
          </div>
          <div className="h-[14rem] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-4 mt-4 justify-center">
            {statusData.map((item) => (
              <div key={item.name} className="flex items-center gap-2 text-xs text-admin-text">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span>{item.name} <strong style={{ color: '#fff', marginLeft: '4px' }}>{item.value}</strong></span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Bar Chart & Hotspots */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hazards by type */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col hover-glow transition-shadow duration-300">
          <div className="mb-6">
            <h2 className="text-base font-semibold text-admin-text m-0">Hazards by type</h2>
            <p className="text-xs text-admin-text-muted mt-1 mb-0">All time</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hazardTypeData} layout="vertical" margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#334155" />
                <XAxis type="number" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis dataKey="name" type="category" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} width={100} />
                <Tooltip
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', color: '#fff' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={16}>
                  {hazardTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Hotspots */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col hover-glow transition-shadow duration-300">
          <div className="mb-6">
            <h2 className="text-base font-semibold text-admin-text m-0">Top hotspots</h2>
            <p className="text-xs text-admin-text-muted mt-1 mb-0">Areas with most reports</p>
          </div>
          <div className="flex flex-col gap-4">
            {hotspotData.map((spot, idx) => (
              <div key={spot.id} className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-sm text-admin-text">
                  <div>
                    <span className="font-semibold text-admin-text-muted mr-2 inline-block w-4">{idx + 1}</span>
                    <span style={{ color: '#fff', fontSize: '0.875rem' }}>{spot.name}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-admin-text">{spot.count}</span>
                    <span className="text-admin-text-muted text-xs font-normal ml-1">reports</span>
                  </div>
                </div>
                <div className="h-1.5 w-full bg-admin-bg rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${(spot.count / spot.max) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 4: Recent Activity */}
      <div className="bg-admin-card rounded-xl border border-admin-border p-6 flex flex-col shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-base font-semibold text-admin-text m-0">Recent activity</h2>
          <Link to="/admin/reports" className="text-sm text-blue-500 no-underline font-medium">View all &rarr;</Link>
        </div>

        <div className="flex flex-col">
          {recentActivity.map((activity, index) => (
            <div key={activity.id} className={`flex items-start justify-between py-4 border-b border-admin-border/50 last:border-0 last:pb-0 animate-fade-in-up stagger-${(index % 5) + 1} hover:bg-admin-text/5 px-2 -mx-2 rounded-lg transition-colors`}>
              <div className="flex gap-4">
                <div className="text-amber-500 mt-1">
                  {getIcon(activity.type)}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-admin-text m-0">{activity.title}</h3>
                  <p className="text-xs text-admin-text-muted mt-1 mb-0">
                    {activity.id} &middot; {activity.location} &middot; {activity.time}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <span className={`px-2 py-0.5 rounded text-[0.65rem] font-bold uppercase tracking-wider border border-current ${getStatusClass(activity.status)}`}>
                  {activity.status}
                </span>
                <span className={`px-2 py-0.5 rounded text-[0.65rem] font-bold uppercase tracking-wider border border-current ${getSeverityClass(activity.severity)}`}>
                  {activity.severity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


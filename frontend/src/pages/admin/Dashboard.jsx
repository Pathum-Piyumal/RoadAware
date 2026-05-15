import React from 'react';
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
import {
  areaChartData, statusData, hazardTypeData, hotspotData, recentActivity
} from '../../utils/dummyData';
import '../../css/Dashboard.css';

const Dashboard = () => {
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
    return status.toLowerCase().replace(' ', '-');
  };

  const getSeverityClass = (severity) => {
    return severity.toLowerCase();
  };

  return (
    <div className="admin-dashboard-container">
      {/* Header */}
      <div className="admin-dashboard-header">
        <h1 className="admin-dashboard-title">Dashboard</h1>
        <p className="admin-dashboard-subtitle">Real-time view of road hazard reports across the city.</p>
      </div>

      {/* Row 1: Stats Grid */}
      <div className="admin-dashboard-stats-grid">
        <div className="admin-dashboard-stat-card">
          <div className="admin-dashboard-stat-header">
            <div className="admin-dashboard-stat-icon-wrapper" style={{ color: '#3B82F6', backgroundColor: 'rgba(59,130,246,0.1)' }}>
              <AlertTriangle size={20} />
            </div>
            <div className="admin-dashboard-stat-trend up">
              <ArrowUpRight size={14} /> +12%
            </div>
          </div>
          <p className="admin-dashboard-stat-value">32</p>
          <p className="admin-dashboard-stat-label">Total reports</p>
        </div>

        <div className="admin-dashboard-stat-card">
          <div className="admin-dashboard-stat-header">
            <div className="admin-dashboard-stat-icon-wrapper" style={{ color: '#10B981', backgroundColor: 'rgba(16,185,129,0.1)' }}>
              <CheckCircle2 size={20} />
            </div>
            <div className="admin-dashboard-stat-trend up">
              <ArrowUpRight size={14} /> +5%
            </div>
          </div>
          <p className="admin-dashboard-stat-value">28%</p>
          <p className="admin-dashboard-stat-label">Resolution rate</p>
        </div>

        <div className="admin-dashboard-stat-card">
          <div className="admin-dashboard-stat-header">
            <div className="admin-dashboard-stat-icon-wrapper" style={{ color: '#F59E0B', backgroundColor: 'rgba(245,158,11,0.1)' }}>
              <Clock size={20} />
            </div>
            <div className="admin-dashboard-stat-trend down">
              <ArrowDownRight size={14} /> -3%
            </div>
          </div>
          <p className="admin-dashboard-stat-value">9</p>
          <p className="admin-dashboard-stat-label">In progress</p>
        </div>

        <div className="admin-dashboard-stat-card">
          <div className="admin-dashboard-stat-header">
            <div className="admin-dashboard-stat-icon-wrapper" style={{ color: '#EF4444', backgroundColor: 'rgba(239,68,68,0.1)' }}>
              <AlertOctagon size={20} />
            </div>
            <div className="admin-dashboard-stat-trend up" style={{ color: '#EF4444' }}>
              <ArrowUpRight size={14} /> +2
            </div>
          </div>
          <p className="admin-dashboard-stat-value">5</p>
          <p className="admin-dashboard-stat-label">Critical open</p>
        </div>
      </div>

      {/* Row 2: Charts */}
      <div className="admin-dashboard-row-2">
        {/* Area Chart */}
        <div className="admin-dashboard-card">
          <div className="admin-dashboard-card-header">
            <h2 className="admin-dashboard-card-title">Reports vs resolutions</h2>
            <p className="admin-dashboard-card-subtitle">Last 14 days</p>
          </div>
          <div className="admin-dashboard-chart-container">
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
        <div className="admin-dashboard-card">
          <div className="admin-dashboard-card-header">
            <h2 className="admin-dashboard-card-title">Status breakdown</h2>
            <p className="admin-dashboard-card-subtitle">All reports</p>
          </div>
          <div className="admin-dashboard-chart-container" style={{ height: '14rem' }}>
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
          <div className="admin-dashboard-pie-legend">
            {statusData.map((item) => (
              <div key={item.name} className="admin-dashboard-pie-legend-item">
                <div className="admin-dashboard-pie-legend-color" style={{ backgroundColor: item.color }}></div>
                <span>{item.name} <strong style={{ color: '#fff', marginLeft: '4px' }}>{item.value}</strong></span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Bar Chart & Hotspots */}
      <div className="admin-dashboard-row-3">
        {/* Hazards by type */}
        <div className="admin-dashboard-card">
          <div className="admin-dashboard-card-header">
            <h2 className="admin-dashboard-card-title">Hazards by type</h2>
            <p className="admin-dashboard-card-subtitle">All time</p>
          </div>
          <div className="admin-dashboard-chart-container">
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
        <div className="admin-dashboard-card">
          <div className="admin-dashboard-card-header">
            <h2 className="admin-dashboard-card-title">Top hotspots</h2>
            <p className="admin-dashboard-card-subtitle">Areas with most reports</p>
          </div>
          <div className="admin-dashboard-hotspot-list">
            {hotspotData.map((spot, idx) => (
              <div key={spot.id} className="admin-dashboard-hotspot-item">
                <div className="admin-dashboard-hotspot-header">
                  <div>
                    <span className="admin-dashboard-hotspot-rank">{idx + 1}</span>
                    <span style={{ color: '#fff', fontSize: '0.875rem' }}>{spot.name}</span>
                  </div>
                  <div>
                    <span className="admin-dashboard-hotspot-count">{spot.count}</span>
                    <span className="admin-dashboard-hotspot-count-sub">reports</span>
                  </div>
                </div>
                <div className="admin-dashboard-hotspot-bar-bg">
                  <div
                    className="admin-dashboard-hotspot-bar-fill"
                    style={{ width: `${(spot.count / spot.max) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 4: Recent Activity */}
      <div className="admin-dashboard-card">
        <div className="admin-dashboard-activity-header">
          <h2 className="admin-dashboard-card-title">Recent activity</h2>
          <Link to="/admin/reports" className="admin-dashboard-activity-view-all">View all &rarr;</Link>
        </div>

        <div className="admin-dashboard-activity-list">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="admin-dashboard-activity-item">
              <div className="admin-dashboard-activity-left">
                <div className="admin-dashboard-activity-icon">
                  {getIcon(activity.type)}
                </div>
                <div>
                  <h3 className="admin-dashboard-activity-title">{activity.title}</h3>
                  <p className="admin-dashboard-activity-meta">
                    {activity.id} &middot; {activity.location} &middot; {activity.time}
                  </p>
                </div>
              </div>
              <div className="admin-dashboard-activity-right">
                <span className={`admin-badge status-${getStatusClass(activity.status)}`}>
                  {activity.status}
                </span>
                <span className={`admin-badge severity-${getSeverityClass(activity.severity)}`}>
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


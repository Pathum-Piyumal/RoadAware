import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line
} from 'recharts';
import { areaChartData, hazardTypeData } from '../../utils/dummyData';
import '../../css/Reports.css'; 

const Analytics = () => {
  return (
    <div className="admin-reports-container">
      <div className="admin-reports-header">
        <div>
          <h1 className="admin-reports-title">Analytics Overview</h1>
          <p className="admin-reports-subtitle">Deep dive into hazard resolution metrics.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
        <div className="admin-table-container" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1rem', color: 'var(--admin-text)', marginBottom: '1rem' }}>Resolution Time Trend</h2>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={areaChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--admin-border)" />
                <XAxis dataKey="name" stroke="var(--admin-text-muted)" />
                <YAxis stroke="var(--admin-text-muted)" />
                <Tooltip contentStyle={{ backgroundColor: 'var(--admin-card)', borderColor: 'var(--admin-border)', color: 'var(--admin-text)' }} />
                <Line type="monotone" dataKey="resolutions" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="admin-table-container" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1rem', color: 'var(--admin-text)', marginBottom: '1rem' }}>Hazards Distribution</h2>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hazardTypeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--admin-border)" />
                <XAxis dataKey="name" stroke="var(--admin-text-muted)" />
                <YAxis stroke="var(--admin-text-muted)" />
                <Tooltip cursor={{ fill: 'var(--admin-bg)' }} contentStyle={{ backgroundColor: 'var(--admin-card)', borderColor: 'var(--admin-border)', color: 'var(--admin-text)' }} />
                <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

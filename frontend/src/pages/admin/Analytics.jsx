import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line
} from 'recharts';
import api from '../../services/api';

const Analytics = () => {
  const [areaChartData, setAreaChartData] = useState([]);
  const [hazardTypeData, setHazardTypeData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await api.get('/analytics/trends');
        if (response.data.success) {
          setAreaChartData(response.data.areaChartData || []);
          setHazardTypeData(response.data.hazardTypeData || []);
        }
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-10rem)] items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-0 pb-8 animate-[fadeIn_0.5s_ease-in-out]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-admin-text tracking-tight m-0">Analytics Overview</h1>
          <p className="text-admin-text-muted text-sm mt-1 mb-0">Deep dive into hazard resolution metrics.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-admin-card rounded-xl border border-admin-border p-6 shadow-sm">
          <h2 className="text-base font-semibold text-admin-text mb-4 mt-0">Resolution Time Trend</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={areaChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--admin-border)" />
                <XAxis
                  dataKey="name"
                  stroke="var(--color-admin-text)"
                />
                <YAxis
                  stroke="var(--color-admin-text)"
                />
                <Tooltip contentStyle={{ backgroundColor: 'var(--admin-card)', borderColor: 'var(--admin-border)', color: 'var(--admin-text)' }} />
                <Line type="monotone" dataKey="resolutions" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-admin-card rounded-xl border border-admin-border p-6 shadow-sm">
          <h2 className="text-base font-semibold text-admin-text mb-4 mt-0">Hazards Distribution</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hazardTypeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--admin-border)" />
                <XAxis
                  dataKey="name"
                  stroke="var(--color-admin-text)"
                />
                <YAxis
                  stroke="var(--color-admin-text)"
                />
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

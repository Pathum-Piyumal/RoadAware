import React from 'react';
import { Download, Search, Eye, Lightbulb, AlertTriangle, Construction, Droplets, AlertCircle } from 'lucide-react';
import { recentActivity } from '../../utils/dummyData';
import '../../css/Reports.css';
import '../../css/Dashboard.css'; // Reusing badges

const Reports = () => {
  const getIcon = (type) => {
    switch(type) {
      case 'light': return <Lightbulb size={18} />;
      case 'infrastructure': return <AlertTriangle size={18} />;
      case 'construction': return <Construction size={18} />;
      case 'flood': return <Droplets size={18} />;
      default: return <AlertCircle size={18} />;
    }
  };

  const getStatusClass = (status) => status.toLowerCase().replace(' ', '-');
  const getSeverityClass = (severity) => severity.toLowerCase();

  // Multiply data for realistic table
  const reportsData = [...recentActivity, ...recentActivity, ...recentActivity].map((r, i) => ({
    ...r,
    id: `HZ-${1083 - i}`,
    upvotes: Math.floor(Math.random() * 100) + 10,
    reporter: ['Ethan L.', 'Sofia G.', 'Daniel R.', 'Priya S.', 'Marcus T.'][i % 5]
  }));

  return (
    <div className="admin-reports-container">
      {/* Header */}
      <div className="admin-reports-header">
        <div>
          <h1 className="admin-reports-title">Reports</h1>
          <p className="admin-reports-subtitle">Manage, triage, and resolve hazard reports.</p>
        </div>
        <button className="admin-reports-btn-outline">
          <Download size={16} /> Export CSV
        </button>
      </div>

      {/* Filter Bar */}
      <div className="admin-reports-filters">
        <div className="admin-reports-search">
          <Search size={18} className="admin-reports-search-icon" />
          <input 
            type="text" 
            placeholder="Search ID, title, area, reporter..." 
            className="admin-reports-search-input"
          />
        </div>
        <select className="admin-reports-select">
          <option>All types</option>
          <option>Infrastructure</option>
          <option>Lighting</option>
        </select>
        <select className="admin-reports-select">
          <option>All statuses</option>
          <option>Reported</option>
          <option>In Progress</option>
          <option>Resolved</option>
        </select>
        <select className="admin-reports-select">
          <option>All severities</option>
          <option>Critical</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <select className="admin-reports-select" style={{ marginLeft: 'auto' }}>
          <option>Newest first</option>
          <option>Oldest first</option>
          <option>Most upvoted</option>
        </select>
      </div>

      <p style={{ fontSize: '0.875rem', color: 'var(--admin-text-muted)' }}>Showing <strong>{reportsData.length}</strong> of 32 reports</p>

      {/* Table */}
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Report</th>
              <th>Location</th>
              <th>Severity</th>
              <th>Status</th>
              <th>Upvotes</th>
              <th>Reported</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reportsData.map((report) => (
              <tr key={report.id}>
                <td>
                  <div className="admin-table-report-cell">
                    <div className="admin-table-report-icon">
                      {getIcon(report.type)}
                    </div>
                    <div>
                      <p className="admin-table-report-title">{report.title}</p>
                      <p className="admin-table-report-id">{report.id}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <p className="admin-table-report-title">{report.location}</p>
                  <p className="admin-table-report-id">123 Example St.</p>
                </td>
                <td>
                  <span className={`admin-badge severity-${getSeverityClass(report.severity)}`}>
                    {report.severity}
                  </span>
                </td>
                <td>
                  <select 
                    className="admin-reports-select" 
                    style={{ padding: '0.25rem 2rem 0.25rem 0.5rem', border: 'none', backgroundColor: 'transparent' }}
                    defaultValue={report.status}
                  >
                    <option value="REPORTED">Reported</option>
                    <option value="IN PROGRESS">In Progress</option>
                    <option value="RESOLVED">Resolved</option>
                    <option value="REJECTED">Rejected</option>
                  </select>
                </td>
                <td style={{ fontWeight: 600 }}>▲ {report.upvotes}</td>
                <td>
                  <p className="admin-table-report-title">{report.time}</p>
                  <p className="admin-table-report-id">by {report.reporter}</p>
                </td>
                <td>
                  <button className="admin-table-action-btn">
                    <Eye size={14} /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;

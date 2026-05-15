import React from 'react';
import { Download, Search, Eye, Lightbulb, AlertTriangle, Construction, Droplets, AlertCircle } from 'lucide-react';
import { recentActivity } from '../../utils/dummyData';

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

  const selectClasses = "bg-admin-input-bg border border-admin-border rounded-lg py-2 pl-4 pr-8 text-sm text-admin-text cursor-pointer appearance-none bg-no-repeat bg-[right_0.75rem_center] bg-[length:1rem] transition-all focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%236B7280%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%222%22%20d%3D%22M19%209l-7%207-7-7%22%2F%3E%3C%2Fsvg%3E')]";

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-0 pb-8 animate-[fadeIn_0.5s_ease-in-out]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-admin-text tracking-tight m-0">Reports</h1>
          <p className="text-admin-text-muted text-sm mt-1 mb-0">Manage, triage, and resolve hazard reports.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-admin-card border border-admin-border rounded-lg text-sm font-medium text-admin-text hover:bg-admin-bg transition-colors cursor-pointer">
          <Download size={16} /> Export CSV
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-4 bg-admin-card p-4 rounded-xl border border-admin-border shadow-sm">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-admin-text-muted" />
          <input 
            type="text" 
            placeholder="Search ID, title, area, reporter..." 
            className="w-full bg-admin-input-bg border border-admin-border rounded-lg pl-10 pr-4 py-2 text-sm text-admin-text transition-all focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 box-border"
          />
        </div>
        <select className={selectClasses}>
          <option>All types</option>
          <option>Infrastructure</option>
          <option>Lighting</option>
        </select>
        <select className={selectClasses}>
          <option>All statuses</option>
          <option>Reported</option>
          <option>In Progress</option>
          <option>Resolved</option>
        </select>
        <select className={selectClasses}>
          <option>All severities</option>
          <option>Critical</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <select className={`${selectClasses} ml-auto`}>
          <option>Newest first</option>
          <option>Oldest first</option>
          <option>Most upvoted</option>
        </select>
      </div>

      <p className="text-sm text-admin-text-muted m-0">Showing <strong className="text-admin-text">{reportsData.length}</strong> of 32 reports</p>

      {/* Table */}
      <div className="bg-admin-card rounded-xl border border-admin-border overflow-x-auto shadow-sm">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider text-admin-text-muted border-b border-admin-border bg-admin-bg/50">Report</th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider text-admin-text-muted border-b border-admin-border bg-admin-bg/50">Location</th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider text-admin-text-muted border-b border-admin-border bg-admin-bg/50">Severity</th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider text-admin-text-muted border-b border-admin-border bg-admin-bg/50">Status</th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider text-admin-text-muted border-b border-admin-border bg-admin-bg/50">Upvotes</th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider text-admin-text-muted border-b border-admin-border bg-admin-bg/50">Reported</th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider text-admin-text-muted border-b border-admin-border bg-admin-bg/50">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reportsData.map((report) => (
              <tr key={report.id} className="border-b border-admin-border last:border-0 hover:bg-admin-bg transition-colors">
                <td className="p-4 text-sm text-admin-text">
                  <div className="flex items-center gap-3">
                    <div className="text-amber-500 shrink-0">
                      {getIcon(report.type)}
                    </div>
                    <div>
                      <p className="font-medium text-admin-text m-0">{report.title}</p>
                      <p className="text-xs text-admin-text-muted m-0 mt-0.5">{report.id}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-sm text-admin-text">
                  <p className="font-medium text-admin-text m-0">{report.location}</p>
                  <p className="text-xs text-admin-text-muted m-0 mt-0.5">123 Example St.</p>
                </td>
                <td className="p-4 text-sm text-admin-text">
                  <span className={`px-2 py-0.5 rounded text-[0.65rem] font-bold uppercase tracking-wider border border-current text-${getSeverityClass(report.severity) === 'critical' ? 'red' : getSeverityClass(report.severity) === 'high' ? 'amber' : getSeverityClass(report.severity) === 'medium' ? 'blue' : 'emerald'}-500 bg-${getSeverityClass(report.severity) === 'critical' ? 'red' : getSeverityClass(report.severity) === 'high' ? 'amber' : getSeverityClass(report.severity) === 'medium' ? 'blue' : 'emerald'}-500/10`}>
                    {report.severity}
                  </span>
                </td>
                <td className="p-4 text-sm text-admin-text">
                  <select 
                    className={`${selectClasses} !py-1 !pl-2 !pr-8 border-transparent bg-transparent hover:border-admin-border focus:border-blue-500 focus:bg-admin-input-bg`}
                    defaultValue={report.status}
                  >
                    <option value="REPORTED">Reported</option>
                    <option value="IN PROGRESS">In Progress</option>
                    <option value="RESOLVED">Resolved</option>
                    <option value="REJECTED">Rejected</option>
                  </select>
                </td>
                <td className="p-4 text-sm text-admin-text font-semibold">▲ {report.upvotes}</td>
                <td className="p-4 text-sm text-admin-text">
                  <p className="font-medium text-admin-text m-0">{report.time}</p>
                  <p className="text-xs text-admin-text-muted m-0 mt-0.5">by {report.reporter}</p>
                </td>
                <td className="p-4 text-sm text-admin-text">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-colors bg-transparent border border-admin-border text-admin-text hover:bg-admin-bg hover:text-blue-500 hover:border-blue-500">
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

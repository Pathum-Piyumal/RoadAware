import React, { useState, useMemo } from 'react';
import { Download, Search, Eye, Lightbulb, AlertTriangle, Construction, Droplets, AlertCircle, X } from 'lucide-react';
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
  const initialReportsData = useMemo(() => {
    return [...recentActivity, ...recentActivity, ...recentActivity].map((r, i) => ({
      ...r,
      id: `HZ-${1083 - i}`,
      upvotes: Math.floor(Math.random() * 100) + 10,
      reporter: ['Ethan L.', 'Sofia G.', 'Daniel R.', 'Priya S.', 'Marcus T.'][i % 5]
    }));
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All types');
  const [statusFilter, setStatusFilter] = useState('All statuses');
  const [severityFilter, setSeverityFilter] = useState('All severities');
  const [sortOrder, setSortOrder] = useState('Newest first');
  const [selectedReport, setSelectedReport] = useState(null);

  const filteredReports = useMemo(() => {
    let result = initialReportsData.filter(report => {
      const matchSearch = searchTerm === '' || 
        report.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
        report.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        report.location.toLowerCase().includes(searchTerm.toLowerCase()) || 
        report.reporter.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchType = typeFilter === 'All types' || report.type.toLowerCase() === typeFilter.toLowerCase();
      // Status matching
      const matchStatus = statusFilter === 'All statuses' || report.status.toLowerCase() === statusFilter.toLowerCase();
      const matchSeverity = severityFilter === 'All severities' || report.severity.toLowerCase() === severityFilter.toLowerCase();

      return matchSearch && matchType && matchStatus && matchSeverity;
    });

    result.sort((a, b) => {
      if (sortOrder === 'Newest first') {
        return b.id.localeCompare(a.id);
      } else if (sortOrder === 'Oldest first') {
        return a.id.localeCompare(b.id);
      } else if (sortOrder === 'Most upvoted') {
        return b.upvotes - a.upvotes;
      }
      return 0;
    });

    return result;
  }, [initialReportsData, searchTerm, typeFilter, statusFilter, severityFilter, sortOrder]);

  const handleExportCSV = () => {
    if (filteredReports.length === 0) return;
    
    const headers = ['ID', 'Title', 'Type', 'Location', 'Severity', 'Status', 'Upvotes', 'Reported At', 'Reporter'];
    const csvContent = [
      headers.join(','),
      ...filteredReports.map(r => `"${r.id}","${r.title}","${r.type}","${r.location}","${r.severity}","${r.status}","${r.upvotes}","${r.time}","${r.reporter}"`)
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'reports_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const selectClasses = "bg-admin-input-bg border border-admin-border rounded-lg py-2 pl-4 pr-8 text-sm text-admin-text cursor-pointer appearance-none bg-no-repeat bg-[right_0.75rem_center] bg-[length:1rem] transition-all focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%236B7280%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%222%22%20d%3D%22M19%209l-7%207-7-7%22%2F%3E%3C%2Fsvg%3E')]";

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-0 pb-8 animate-[fadeIn_0.5s_ease-in-out]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-admin-text tracking-tight m-0">Reports</h1>
          <p className="text-admin-text-muted text-sm mt-1 mb-0">Manage, triage, and resolve hazard reports.</p>
        </div>
        <button 
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2 bg-admin-card border border-admin-border rounded-lg text-sm font-medium text-admin-text hover:bg-admin-bg transition-colors cursor-pointer"
        >
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-admin-input-bg border border-admin-border rounded-lg pl-10 pr-4 py-2 text-sm text-admin-text transition-all focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 box-border"
          />
        </div>
        <select className={selectClasses} value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option>All types</option>
          <option>Infrastructure</option>
          <option>Lighting</option>
          <option>Construction</option>
          <option>Flood</option>
        </select>
        <select className={selectClasses} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option>All statuses</option>
          <option>Reported</option>
          <option>In Progress</option>
          <option>Resolved</option>
        </select>
        <select className={selectClasses} value={severityFilter} onChange={(e) => setSeverityFilter(e.target.value)}>
          <option>All severities</option>
          <option>Critical</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <select className={`${selectClasses} ml-auto`} value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option>Newest first</option>
          <option>Oldest first</option>
          <option>Most upvoted</option>
        </select>
      </div>

      <p className="text-sm text-admin-text-muted m-0">Showing <strong className="text-admin-text">{filteredReports.length}</strong> of {initialReportsData.length} reports</p>

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
            {filteredReports.map((report) => (
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
                  <button 
                    onClick={() => setSelectedReport(report)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-colors bg-transparent border border-admin-border text-admin-text hover:bg-admin-bg hover:text-blue-500 hover:border-blue-500"
                  >
                    <Eye size={14} /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Report Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.2s_ease-in-out]">
          <div className="bg-admin-card border border-admin-border rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-[slideUp_0.3s_ease-out]">
            <div className="flex items-center justify-between p-6 border-b border-admin-border sticky top-0 bg-admin-card z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg shrink-0">
                  {getIcon(selectedReport.type)}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-admin-text m-0">{selectedReport.title}</h2>
                  <p className="text-sm text-admin-text-muted m-0">{selectedReport.id}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedReport(null)}
                className="p-2 hover:bg-admin-bg rounded-lg text-admin-text-muted hover:text-admin-text transition-colors cursor-pointer border-none bg-transparent"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-admin-text-muted uppercase tracking-wider mb-2">Report Details</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-admin-text-muted m-0">Type</p>
                      <p className="text-sm font-medium text-admin-text m-0 capitalize">{selectedReport.type}</p>
                    </div>
                    <div>
                      <p className="text-xs text-admin-text-muted m-0">Severity</p>
                      <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[0.65rem] font-bold uppercase tracking-wider border border-current text-${getSeverityClass(selectedReport.severity) === 'critical' ? 'red' : getSeverityClass(selectedReport.severity) === 'high' ? 'amber' : getSeverityClass(selectedReport.severity) === 'medium' ? 'blue' : 'emerald'}-500 bg-${getSeverityClass(selectedReport.severity) === 'critical' ? 'red' : getSeverityClass(selectedReport.severity) === 'high' ? 'amber' : getSeverityClass(selectedReport.severity) === 'medium' ? 'blue' : 'emerald'}-500/10`}>
                        {selectedReport.severity}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-admin-text-muted m-0">Status</p>
                      <span className="text-sm font-medium text-admin-text uppercase">{selectedReport.status}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-admin-text-muted uppercase tracking-wider mb-2">Location & Time</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-admin-text-muted m-0">Location</p>
                      <p className="text-sm font-medium text-admin-text m-0">{selectedReport.location}</p>
                      <p className="text-xs text-admin-text-muted m-0">123 Example St.</p>
                    </div>
                    <div>
                      <p className="text-xs text-admin-text-muted m-0">Reported By</p>
                      <p className="text-sm font-medium text-admin-text m-0">{selectedReport.reporter}</p>
                    </div>
                    <div>
                      <p className="text-xs text-admin-text-muted m-0">Reported At</p>
                      <p className="text-sm font-medium text-admin-text m-0">{selectedReport.time}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-admin-border">
                <h3 className="text-sm font-semibold text-admin-text-muted uppercase tracking-wider mb-2">Engagement</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-admin-text">▲ {selectedReport.upvotes} Upvotes</span>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-admin-border flex justify-end gap-3 bg-admin-bg/50 rounded-b-xl">
              <button 
                onClick={() => setSelectedReport(null)}
                className="px-4 py-2 rounded-lg text-sm font-medium border border-admin-border text-admin-text hover:bg-admin-bg transition-colors cursor-pointer bg-transparent"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;

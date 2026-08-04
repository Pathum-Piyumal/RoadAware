import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Download, Search, Eye, Lightbulb, AlertTriangle, Construction, Droplets, AlertCircle, X, Heart, Send, ShieldAlert } from 'lucide-react';
import api from '../../services/api';
import toast from 'react-hot-toast';

const Reports = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const getIcon = (type) => {
    switch(type.toLowerCase()) {
      case 'light': return <Lightbulb size={18} />;
      case 'infrastructure': return <AlertTriangle size={18} />;
      case 'construction': return <Construction size={18} />;
      case 'flood': return <Droplets size={18} />;
      default: return <AlertCircle size={18} />;
    }
  };

  const getSeverityColor = (sev) => {
    const s = (sev || '').toLowerCase();
    if (s === 'critical') return 'text-red-500 bg-red-500/10 border-red-500/30';
    if (s === 'high') return 'text-amber-500 bg-amber-500/10 border-amber-500/30';
    if (s === 'medium') return 'text-blue-500 bg-blue-500/10 border-blue-500/30';
    return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30';
  };

  const getPriorityColor = (prio) => {
    const p = (prio || '').toLowerCase();
    if (p === 'critical') return 'text-red-600 bg-red-500/15 border-red-500/40 font-bold';
    if (p === 'high') return 'text-orange-500 bg-orange-500/15 border-orange-500/40 font-semibold';
    if (p === 'medium') return 'text-sky-500 bg-sky-500/15 border-sky-500/40 font-medium';
    return 'text-slate-400 bg-slate-500/10 border-slate-500/30 font-normal';
  };

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [typeFilter, setTypeFilter] = useState('All types');
  const [statusFilter, setStatusFilter] = useState('All statuses');
  const [severityFilter, setSeverityFilter] = useState('All severities');
  const [priorityFilter, setPriorityFilter] = useState('All priorities');
  const [sortOrder, setSortOrder] = useState('Newest first');
  const [selectedReport, setSelectedReport] = useState(null);

  // Status Change Modal State
  const [statusModalReport, setStatusModalReport] = useState(null);
  const [pendingStatus, setPendingStatus] = useState('');
  const [statusComment, setStatusComment] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    const querySearch = searchParams.get('search');
    if (querySearch !== null) {
      setSearchTerm(querySearch);
    }
  }, [searchParams]);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const response = await api.get('/admin/reports', {
        params: {
          search: searchTerm,
          type: typeFilter,
          status: statusFilter,
          severity: severityFilter,
          priority: priorityFilter,
          sort: sortOrder,
          limit: 100
        }
      });
      if (response.data.success) {
        setReports(response.data.reports);
      }
    } catch (error) {
      console.error('Failed to fetch reports:', error);
      toast.error('Failed to load reports.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [searchTerm, typeFilter, statusFilter, severityFilter, priorityFilter, sortOrder]);

  const handlePriorityChange = async (reportId, newPriority) => {
    try {
      const response = await api.put(`/admin/reports/${reportId}/priority`, { priority: newPriority });
      if (response.data.success) {
        toast.success(`Priority updated to ${newPriority.toUpperCase()} for ${reportId}`);
        fetchReports();
        if (selectedReport && selectedReport.id === reportId) {
          setSelectedReport(prev => ({ ...prev, priority: newPriority.toUpperCase() }));
        }
      }
    } catch (error) {
      toast.error('Failed to update priority.');
      console.error(error);
    }
  };

  const openStatusModal = (report, targetStatus) => {
    if (report.status === targetStatus) return;
    setStatusModalReport(report);
    setPendingStatus(targetStatus);
    setStatusComment('');
  };

  const submitStatusChange = async (e) => {
    if (e) e.preventDefault();
    if (!statusModalReport || !pendingStatus) return;

    setUpdatingStatus(true);
    try {
      const response = await api.put(`/admin/reports/${statusModalReport.id}/status`, {
        status: pendingStatus,
        comment: statusComment.trim()
      });
      if (response.data.success) {
        toast.success(`Status updated to ${pendingStatus} & Brevo email dispatched!`);
        setStatusModalReport(null);
        fetchReports();
        if (selectedReport && selectedReport.id === statusModalReport.id) {
          setSelectedReport(prev => ({ ...prev, status: pendingStatus }));
        }
      }
    } catch (error) {
      toast.error('Failed to update status.');
      console.error(error);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleExportCSV = async () => {
    try {
      const response = await api.get('/admin/reports/export', {
        params: {
          search: searchTerm,
          type: typeFilter,
          status: statusFilter,
          severity: severityFilter,
          priority: priorityFilter
        },
        responseType: 'blob'
      });
      
      const blob = new Blob([response.data], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'reports_export.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('CSV exported successfully!');
    } catch (error) {
      console.error('CSV Export failed:', error);
      toast.error('Failed to export CSV.');
    }
  };

  const selectClasses = "bg-admin-input-bg border border-admin-border rounded-lg py-2 pl-4 pr-8 text-sm text-admin-text cursor-pointer appearance-none bg-no-repeat bg-[right_0.75rem_center] bg-[length:1rem] transition-all focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%236B7280%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%222%22%20d%3D%22M19%209l-7%207-7-7%22%2F%3E%3C%2Fsvg%3E')]";

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-0 pb-8 animate-[fadeIn_0.5s_ease-in-out]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-admin-text tracking-tight m-0">Reports</h1>
          <p className="text-admin-text-muted text-sm mt-1 mb-0">Prioritize hazards, manage status changes, and send automated email updates.</p>
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
        <select className={selectClasses} value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
          <option>All priorities</option>
          <option>Critical</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <select className={selectClasses} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option>All statuses</option>
          <option>Reported</option>
          <option>In Progress</option>
          <option>Resolved</option>
          <option>Rejected</option>
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
          <option>Highest priority</option>
          <option>Lowest priority</option>
          <option>Oldest first</option>
          <option>Most upvoted</option>
        </select>
      </div>

      <p className="text-sm text-admin-text-muted m-0">Showing <strong className="text-admin-text">{reports.length}</strong> reports</p>

      {/* Table */}
      <div className="bg-admin-card rounded-xl border border-admin-border overflow-x-auto shadow-sm">
        <table className="w-full text-left border-collapse min-w-[950px]">
          <thead>
            <tr>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider text-admin-text-muted border-b border-admin-border bg-admin-bg/50">Report</th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider text-admin-text-muted border-b border-admin-border bg-admin-bg/50">Location</th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider text-admin-text-muted border-b border-admin-border bg-admin-bg/50">Severity</th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider text-admin-text-muted border-b border-admin-border bg-admin-bg/50">Admin Priority</th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider text-admin-text-muted border-b border-admin-border bg-admin-bg/50">Status</th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider text-admin-text-muted border-b border-admin-border bg-admin-bg/50">Upvotes</th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider text-admin-text-muted border-b border-admin-border bg-admin-bg/50">Reported</th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider text-admin-text-muted border-b border-admin-border bg-admin-bg/50">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="p-8 text-center text-admin-text-muted">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                </td>
              </tr>
            ) : reports.length === 0 ? (
              <tr>
                <td colSpan="8" className="p-8 text-center text-admin-text-muted">
                  No hazard reports found matching the criteria.
                </td>
              </tr>
            ) : (
              reports.map((report) => (
                <tr key={report.id} className="border-b border-admin-border last:border-0 hover:bg-admin-bg/50 transition-colors">
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
                    <p className="text-xs text-admin-text-muted m-0 mt-0.5">Lat: {report.latitude || 'N/A'}, Lng: {report.longitude || 'N/A'}</p>
                  </td>
                  <td className="p-4 text-sm text-admin-text">
                    <span className={`px-2 py-0.5 rounded text-[0.65rem] uppercase border ${getSeverityColor(report.severity)}`}>
                      {report.severity}
                    </span>
                  </td>
                  {/* Admin Priority Selector */}
                  <td className="p-4 text-sm text-admin-text">
                    <select
                      className={`px-2 py-1 rounded text-xs border cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 ${getPriorityColor(report.priority)}`}
                      value={report.priority || 'MEDIUM'}
                      onChange={(e) => handlePriorityChange(report.id, e.target.value)}
                    >
                      <option value="CRITICAL" className="bg-admin-card text-red-500 font-bold">⚡ CRITICAL</option>
                      <option value="HIGH" className="bg-admin-card text-orange-500 font-semibold">🔥 HIGH</option>
                      <option value="MEDIUM" className="bg-admin-card text-sky-500">🔵 MEDIUM</option>
                      <option value="LOW" className="bg-admin-card text-slate-400">🟢 LOW</option>
                    </select>
                  </td>
                  {/* Status Dropdown Trigger */}
                  <td className="p-4 text-sm text-admin-text">
                    <select 
                      className={`${selectClasses} !py-1 !pl-2 !pr-8 border-transparent bg-transparent hover:border-admin-border focus:border-blue-500 focus:bg-admin-input-bg`}
                      value={report.status}
                      onChange={(e) => openStatusModal(report, e.target.value)}
                    >
                      <option value="REPORTED">REPORTED</option>
                      <option value="IN PROGRESS">IN PROGRESS</option>
                      <option value="RESOLVED">RESOLVED</option>
                      <option value="REJECTED">REJECTED</option>
                    </select>
                  </td>
                  <td className="p-4 text-sm text-admin-text font-semibold flex items-center gap-1.5"><Heart size={14} className="text-red-500 fill-red-500" /> {report.upvotes}</td>
                  <td className="p-4 text-sm text-admin-text">
                    <p className="font-medium text-admin-text m-0">{new Date(report.time).toLocaleDateString()}</p>
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
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Status Change & Brevo Email Dispatch Modal */}
      {statusModalReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-in-out]">
          <div className="bg-admin-card border border-admin-border rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-[slideUp_0.3s_ease-out]">
            <div className="flex items-center justify-between p-5 border-b border-admin-border bg-admin-card">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
                  <Send size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-admin-text m-0">Update Status & Dispatch Email</h3>
                  <p className="text-xs text-admin-text-muted m-0">{statusModalReport.id}: {statusModalReport.title}</p>
                </div>
              </div>
              <button 
                onClick={() => setStatusModalReport(null)}
                className="p-1.5 hover:bg-admin-bg rounded-lg text-admin-text-muted hover:text-admin-text transition-colors border-none bg-transparent"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={submitStatusChange} className="p-5 space-y-4">
              <div className="flex items-center justify-between p-3 bg-admin-bg rounded-lg border border-admin-border text-sm">
                <div>
                  <span className="text-xs text-admin-text-muted uppercase block">Current Status</span>
                  <span className="font-bold text-admin-text">{statusModalReport.status}</span>
                </div>
                <span className="text-admin-text-muted">➔</span>
                <div>
                  <span className="text-xs text-admin-text-muted uppercase block">New Status</span>
                  <span className="font-bold text-blue-500">{pendingStatus}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-admin-text uppercase tracking-wider mb-1">
                  Admin Note / Citizen Email Message (Optional)
                </label>
                <textarea
                  rows="3"
                  value={statusComment}
                  onChange={(e) => setStatusComment(e.target.value)}
                  placeholder="e.g., Road repair team has been dispatched and work is currently in progress."
                  className="w-full bg-admin-input-bg border border-admin-border rounded-lg p-3 text-sm text-admin-text focus:outline-none focus:border-blue-500 box-border"
                />
              </div>

              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-start gap-2.5 text-xs text-blue-400">
                <ShieldAlert size={16} className="shrink-0 mt-0.5 text-blue-400" />
                <span>
                  An automated status update notification will be dispatched via <strong>Brevo Email API</strong> to <strong>{statusModalReport.reporterEmail || statusModalReport.reporter}</strong>.
                </span>
              </div>

              <div className="flex justify-end gap-3 pt-2 border-t border-admin-border">
                <button
                  type="button"
                  onClick={() => setStatusModalReport(null)}
                  className="px-4 py-2 rounded-lg text-sm font-medium border border-admin-border text-admin-text hover:bg-admin-bg bg-transparent cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updatingStatus}
                  className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white border-none cursor-pointer disabled:opacity-50 transition-colors"
                >
                  {updatingStatus ? (
                    <>Updating & Sending...</>
                  ) : (
                    <>
                      <Send size={15} /> Confirm & Dispatch Email
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
                      <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[0.65rem] uppercase border ${getSeverityColor(selectedReport.severity)}`}>
                        {selectedReport.severity}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-admin-text-muted m-0 mb-1">Admin Priority</p>
                      <select
                        className={`px-3 py-1 rounded text-xs border cursor-pointer focus:outline-none ${getPriorityColor(selectedReport.priority)}`}
                        value={selectedReport.priority || 'MEDIUM'}
                        onChange={(e) => handlePriorityChange(selectedReport.id, e.target.value)}
                      >
                        <option value="CRITICAL" className="bg-admin-card text-red-500">⚡ CRITICAL</option>
                        <option value="HIGH" className="bg-admin-card text-orange-500">🔥 HIGH</option>
                        <option value="MEDIUM" className="bg-admin-card text-sky-500">🔵 MEDIUM</option>
                        <option value="LOW" className="bg-admin-card text-slate-400">🟢 LOW</option>
                      </select>
                    </div>
                    <div>
                      <p className="text-xs text-admin-text-muted m-0">Status</p>
                      <span className="text-sm font-semibold text-blue-400 uppercase">{selectedReport.status}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-admin-text-muted uppercase tracking-wider mb-2">Location & Time</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-admin-text-muted m-0">Location</p>
                      <p className="text-sm font-medium text-admin-text m-0">{selectedReport.location}</p>
                    </div>
                    <div>
                      <p className="text-xs text-admin-text-muted m-0">Reported By</p>
                      <p className="text-sm font-medium text-admin-text m-0">{selectedReport.reporter} ({selectedReport.reporterEmail || 'No Email'})</p>
                    </div>
                    <div>
                      <p className="text-xs text-admin-text-muted m-0">Reported At</p>
                      <p className="text-sm font-medium text-admin-text m-0">{new Date(selectedReport.time).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-admin-border">
                <h3 className="text-sm font-semibold text-admin-text-muted uppercase tracking-wider mb-2">Description</h3>
                <p className="text-sm text-admin-text bg-admin-bg p-3 rounded-lg border border-admin-border m-0 whitespace-pre-wrap">{selectedReport.description || 'No description provided.'}</p>
              </div>

              <div className="pt-4 border-t border-admin-border">
                <h3 className="text-sm font-semibold text-admin-text-muted uppercase tracking-wider mb-2">Engagement</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-admin-text flex items-center gap-1.5"><Heart size={14} className="text-red-500 fill-red-500" /> {selectedReport.upvotes} Upvotes</span>
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

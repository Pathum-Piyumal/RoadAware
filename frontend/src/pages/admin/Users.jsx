import React from 'react';
import { Search, ShieldAlert, Shield } from 'lucide-react';
import '../../css/Reports.css'; // Reusing table and filter styles
import '../../css/Users.css';

const Users = () => {
  const dummyUsers = [
    { id: 1, name: 'Sofia G.', email: 'sofiag@demo.app', role: 'CITIZEN', status: 'ACTIVE', reports: 4, upvotes: 254 },
    { id: 2, name: 'Priya S.', email: 'priyas@demo.app', role: 'CITIZEN', status: 'ACTIVE', reports: 4, upvotes: 126 },
    { id: 3, name: 'Lena R.', email: 'lenar@demo.app', role: 'CITIZEN', status: 'ACTIVE', reports: 6, upvotes: 212 },
    { id: 4, name: 'Aisha M.', email: 'aisham@demo.app', role: 'CITIZEN', status: 'ACTIVE', reports: 3, upvotes: 167 },
    { id: 5, name: 'Daniel R.', email: 'danielr@demo.app', role: 'CITIZEN', status: 'ACTIVE', reports: 7, upvotes: 477 },
    { id: 6, name: 'Ethan L.', email: 'ethanl@demo.app', role: 'CITIZEN', status: 'ACTIVE', reports: 3, upvotes: 84 },
    { id: 7, name: 'Omar B.', email: 'omarb@demo.app', role: 'CITIZEN', status: 'ACTIVE', reports: 2, upvotes: 34 },
    { id: 8, name: 'Sarah Chen', email: 'sarah.admin@demo.app', role: 'ADMIN', status: 'ACTIVE', reports: 0, upvotes: 0 },
    { id: 9, name: 'Marcus Reed', email: 'marcus.admin@demo.app', role: 'ADMIN', status: 'ACTIVE', reports: 0, upvotes: 0 },
  ];

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className="admin-reports-container">
      {/* Header */}
      <div className="admin-reports-header">
        <div>
          <h1 className="admin-reports-title">Users</h1>
          <p className="admin-reports-subtitle">Manage citizens and admin staff accounts.</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="admin-users-stats">
        <div className="admin-users-stat-card">
          <p className="admin-users-stat-label">Total Users</p>
          <p className="admin-users-stat-value">10</p>
        </div>
        <div className="admin-users-stat-card">
          <p className="admin-users-stat-label">Citizens</p>
          <p className="admin-users-stat-value">8</p>
        </div>
        <div className="admin-users-stat-card">
          <p className="admin-users-stat-label">Admins</p>
          <p className="admin-users-stat-value">2</p>
        </div>
        <div className="admin-users-stat-card">
          <p className="admin-users-stat-label">Suspended</p>
          <p className="admin-users-stat-value">0</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="admin-reports-filters">
        <div className="admin-reports-search">
          <Search size={18} className="admin-reports-search-icon" />
          <input 
            type="text" 
            placeholder="Search users..." 
            className="admin-reports-search-input"
          />
        </div>
      </div>

      {/* Table */}
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Status</th>
              <th>Reports</th>
              <th>Total Upvotes</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dummyUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="admin-table-report-cell">
                    <div className="admin-user-avatar" style={{ backgroundColor: user.role === 'ADMIN' ? '#3B82F6' : '#3B82F6' }}>
                      {getInitials(user.name)}
                    </div>
                    <div>
                      <p className="admin-table-report-title">{user.name}</p>
                      <p className="admin-table-report-id">✉ {user.email}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`admin-badge severity-${user.role === 'ADMIN' ? 'medium' : 'low'}`} style={{ color: 'var(--admin-text)' }}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <span className="admin-badge status-resolved">
                    {user.status}
                  </span>
                </td>
                <td style={{ fontWeight: 500 }}>{user.reports}</td>
                <td style={{ fontWeight: 500 }}>{user.upvotes}</td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>

                    <button className="admin-table-action-btn" style={{ color: '#EF4444' }}>
                      <ShieldAlert size={14} /> Suspend
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;

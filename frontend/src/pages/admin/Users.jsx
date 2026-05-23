import React, { useState, useEffect } from 'react';
import { Search, ShieldAlert, Shield, RotateCcw } from 'lucide-react';
import api from '../../services/api';
import toast from 'react-hot-toast';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get('/admin/users');
      if (response.data.success) {
        setUsers(response.data.users);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
      toast.error('Failed to load user accounts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleStatus = async (userId, currentStatus) => {
    const actionText = currentStatus === 'SUSPENDED' ? 'activate' : 'suspend';
    if (!window.confirm(`Are you sure you want to ${actionText} this user?`)) {
      return;
    }

    try {
      const response = await api.put(`/admin/users/${userId}/status`);
      if (response.data.success) {
        toast.success(`User successfully ${currentStatus === 'SUSPENDED' ? 'activated' : 'suspended'}.`);
        fetchUsers();
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update user status.';
      toast.error(message);
    }
  };

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'U';
  };

  // Filter users based on search term
  const filteredUsers = users.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.name?.toLowerCase().includes(searchLower) ||
      user.email?.toLowerCase().includes(searchLower) ||
      user.role?.toLowerCase().includes(searchLower)
    );
  });

  // Calculate dynamic stats
  const totalCount = users.length;
  const citizenCount = users.filter(u => u.role === 'CITIZEN').length;
  const adminCount = users.filter(u => u.role === 'ADMIN').length;
  const suspendedCount = users.filter(u => u.status === 'SUSPENDED').length;

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-0 pb-8 animate-[fadeIn_0.5s_ease-in-out]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-admin-text tracking-tight m-0">Users</h1>
          <p className="text-admin-text-muted text-sm mt-1 mb-0">Manage citizens and admin staff accounts.</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <div className="bg-admin-card rounded-xl border border-admin-border p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-admin-text-muted m-0 mb-2">Total Users</p>
          <p className="text-2xl font-bold text-admin-text m-0">{loading ? '...' : totalCount}</p>
        </div>
        <div className="bg-admin-card rounded-xl border border-admin-border p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-admin-text-muted m-0 mb-2">Citizens</p>
          <p className="text-2xl font-bold text-admin-text m-0">{loading ? '...' : citizenCount}</p>
        </div>
        <div className="bg-admin-card rounded-xl border border-admin-border p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-admin-text-muted m-0 mb-2">Admins</p>
          <p className="text-2xl font-bold text-admin-text m-0">{loading ? '...' : adminCount}</p>
        </div>
        <div className="bg-admin-card rounded-xl border border-admin-border p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-admin-text-muted m-0 mb-2">Suspended</p>
          <p className="text-2xl font-bold text-admin-text m-0" style={{ color: suspendedCount > 0 ? '#EF4444' : 'inherit' }}>
            {loading ? '...' : suspendedCount}
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-admin-card p-4 rounded-xl border border-admin-border shadow-sm">
        <div className="relative w-full max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-admin-text-muted" />
          <input 
            type="text" 
            placeholder="Search users..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-admin-input-bg border border-admin-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-admin-text transition-all focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 box-border"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-admin-card rounded-xl border border-admin-border overflow-x-auto shadow-sm">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider text-admin-text-muted border-b border-admin-border bg-admin-bg/50">User</th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider text-admin-text-muted border-b border-admin-border bg-admin-bg/50">Role</th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider text-admin-text-muted border-b border-admin-border bg-admin-bg/50">Status</th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider text-admin-text-muted border-b border-admin-border bg-admin-bg/50">Reports</th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider text-admin-text-muted border-b border-admin-border bg-admin-bg/50">Total Upvotes</th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider text-admin-text-muted border-b border-admin-border bg-admin-bg/50 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="p-8 text-center text-admin-text-muted">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                </td>
              </tr>
            ) : filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-8 text-center text-admin-text-muted">
                  No users found.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user, idx) => (
                <tr key={user.id} className={idx === filteredUsers.length - 1 ? '' : 'border-b border-admin-border'}>
                  <td className="p-4 text-sm text-admin-text">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold text-sm shrink-0">
                        {getInitials(user.name)}
                      </div>
                      <div>
                        <p className="font-medium text-admin-text m-0 mb-1">{user.name}</p>
                        <p className="text-xs text-admin-text-muted m-0">✉ {user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-admin-text">
                    <span className={`px-2 py-0.5 rounded text-[0.65rem] font-bold uppercase tracking-wider border border-current ${user.role === 'ADMIN' ? 'text-blue-400 bg-blue-500/10' : 'text-slate-400 bg-slate-500/10'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-admin-text">
                    <span className={`px-2 py-0.5 rounded text-[0.65rem] font-bold uppercase tracking-wider border border-current ${user.status === 'SUSPENDED' ? 'text-red-500 bg-red-500/10' : 'text-emerald-500 bg-emerald-500/10'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-admin-text font-medium">{user.reports}</td>
                  <td className="p-4 text-sm text-admin-text font-medium">{user.upvotes}</td>
                  <td className="p-4 text-sm text-admin-text">
                    <div className="flex gap-2 justify-end">
                      <button 
                        onClick={() => handleToggleStatus(user.id, user.status)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-colors bg-transparent border-none ${user.status === 'SUSPENDED' ? 'hover:bg-admin-bg text-emerald-500' : 'hover:bg-admin-bg text-red-500'}`}
                      >
                        {user.status === 'SUSPENDED' ? (
                          <>
                            <RotateCcw size={14} /> Activate
                          </>
                        ) : (
                          <>
                            <ShieldAlert size={14} /> Suspend
                          </>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;

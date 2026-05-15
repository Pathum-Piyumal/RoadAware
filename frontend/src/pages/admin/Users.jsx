import React from 'react';
import { Search, ShieldAlert, Shield } from 'lucide-react';

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
          <p className="text-2xl font-bold text-admin-text m-0">10</p>
        </div>
        <div className="bg-admin-card rounded-xl border border-admin-border p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-admin-text-muted m-0 mb-2">Citizens</p>
          <p className="text-2xl font-bold text-admin-text m-0">8</p>
        </div>
        <div className="bg-admin-card rounded-xl border border-admin-border p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-admin-text-muted m-0 mb-2">Admins</p>
          <p className="text-2xl font-bold text-admin-text m-0">2</p>
        </div>
        <div className="bg-admin-card rounded-xl border border-admin-border p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-admin-text-muted m-0 mb-2">Suspended</p>
          <p className="text-2xl font-bold text-admin-text m-0">0</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-admin-card p-4 rounded-xl border border-admin-border shadow-sm">
        <div className="relative w-full max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-admin-text-muted" />
          <input 
            type="text" 
            placeholder="Search users..." 
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
            {dummyUsers.map((user, idx) => (
              <tr key={user.id} className={idx === dummyUsers.length - 1 ? '' : 'border-b border-admin-border'}>
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
                  <span className={`px-2 py-0.5 rounded text-[0.65rem] font-bold uppercase tracking-wider border border-current ${user.role === 'ADMIN' ? 'text-admin-text bg-admin-bg' : 'text-admin-text bg-admin-bg'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-4 text-sm text-admin-text">
                  <span className="px-2 py-0.5 rounded text-[0.65rem] font-bold uppercase tracking-wider border border-current text-emerald-500 bg-emerald-500/10">
                    {user.status}
                  </span>
                </td>
                <td className="p-4 text-sm text-admin-text font-medium">{user.reports}</td>
                <td className="p-4 text-sm text-admin-text font-medium">{user.upvotes}</td>
                <td className="p-4 text-sm text-admin-text">
                  <div className="flex gap-2 justify-end">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-colors bg-transparent border-none hover:bg-admin-bg text-red-500">
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

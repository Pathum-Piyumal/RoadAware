import React, { useState } from 'react';
import { User, Bell, Shield, Save } from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="flex flex-col gap-6 pb-8 animate-[fadeIn_0.5s_ease-in-out]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-admin-text tracking-tight m-0">Settings</h1>
          <p className="text-admin-text-muted text-sm mt-1 mb-0">Manage application preferences and system configurations.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer bg-blue-500 text-white border-none hover:bg-blue-600">
          <Save size={16} /> Save Changes
        </button>
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-8">
        {/* Sidebar Tabs */}
        <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 lg:w-64 shrink-0 w-full">
          <button 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg border text-sm font-medium cursor-pointer transition-all whitespace-nowrap text-left ${activeTab === 'general' ? 'bg-admin-card text-blue-500 shadow-sm border-admin-border' : 'bg-transparent border-transparent text-admin-text-muted hover:bg-admin-card hover:text-admin-text'}`}
            onClick={() => setActiveTab('general')}
          >
            <User size={18} /> General
          </button>

          <button 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg border text-sm font-medium cursor-pointer transition-all whitespace-nowrap text-left ${activeTab === 'security' ? 'bg-admin-card text-blue-500 shadow-sm border-admin-border' : 'bg-transparent border-transparent text-admin-text-muted hover:bg-admin-card hover:text-admin-text'}`}
            onClick={() => setActiveTab('security')}
          >
            <Shield size={18} /> Security
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-admin-card border border-admin-border rounded-xl p-6 lg:p-8 shadow-sm w-full">
          {activeTab === 'general' && (
            <div>
              <h2 className="text-xl font-semibold text-admin-text m-0 mb-6 pb-3 border-b border-admin-border">General Settings</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-admin-text mb-2">Application Name</label>
                <input type="text" className="w-full max-w-2xl px-3.5 py-2.5 bg-admin-input-bg border border-admin-border rounded-lg text-admin-text text-sm transition-all focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" defaultValue="RoadAware" />
                <p className="text-xs text-admin-text-muted mt-1.5">The name of the application displayed to users.</p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-admin-text mb-2">Support Email</label>
                <input type="email" className="w-full max-w-2xl px-3.5 py-2.5 bg-admin-input-bg border border-admin-border rounded-lg text-admin-text text-sm transition-all focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" defaultValue="support@roadaware.app" />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-admin-text mb-2">Timezone</label>
                <select className="w-full max-w-2xl px-3.5 py-2.5 bg-admin-input-bg border border-admin-border rounded-lg text-admin-text text-sm transition-all focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <option>UTC (Coordinated Universal Time)</option>
                  <option>EST (Eastern Standard Time)</option>
                  <option>PST (Pacific Standard Time)</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div>
              <h2 className="text-xl font-semibold text-admin-text m-0 mb-6 pb-3 border-b border-admin-border">Security & Access</h2>
              
              <div className="flex justify-between items-start py-5 border-b border-admin-border last:border-0">
                <div>
                  <h3 className="text-sm font-medium text-admin-text m-0">Two-Factor Authentication (2FA)</h3>
                  <p className="text-xs text-admin-text-muted mt-1.5">Require administrators to use 2FA when logging in.</p>
                </div>
                <label className="relative inline-block w-12 h-6 shrink-0 cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="absolute inset-0 bg-admin-border rounded-full transition-colors duration-300 peer-checked:bg-blue-500"></div>
                  <div className="absolute left-1 bottom-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 peer-checked:translate-x-6"></div>
                </label>
              </div>

              <div className="mb-6 mt-6">
                <label className="block text-sm font-medium text-admin-text mb-2">Session Timeout (Minutes)</label>
                <input type="number" className="w-full max-w-2xl px-3.5 py-2.5 bg-admin-input-bg border border-admin-border rounded-lg text-admin-text text-sm transition-all focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" defaultValue="60" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;

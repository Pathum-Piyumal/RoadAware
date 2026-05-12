import React, { useState } from 'react';
import { User, Bell, Shield, Save } from 'lucide-react';
import '../../css/Reports.css'; // Reusing header styles
import '../../css/Settings.css';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="admin-reports-container">
      {/* Header */}
      <div className="admin-reports-header">
        <div>
          <h1 className="admin-reports-title">Settings</h1>
          <p className="admin-reports-subtitle">Manage application preferences and system configurations.</p>
        </div>
        <button className="admin-reports-btn-outline" style={{ backgroundColor: '#3B82F6', color: 'white', border: 'none' }}>
          <Save size={16} /> Save Changes
        </button>
      </div>

      <div className="admin-settings-layout">
        {/* Sidebar Tabs */}
        <div className="admin-settings-sidebar">
          <button 
            className={`admin-settings-tab ${activeTab === 'general' ? 'active' : ''}`}
            onClick={() => setActiveTab('general')}
          >
            <User size={18} /> General
          </button>

          <button 
            className={`admin-settings-tab ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <Shield size={18} /> Security
          </button>

        </div>

        {/* Content Area */}
        <div className="admin-settings-content">
          {activeTab === 'general' && (
            <div className="admin-settings-section">
              <h2 className="admin-settings-section-title">General Settings</h2>
              
              <div className="admin-settings-form-group">
                <label className="admin-settings-label">Application Name</label>
                <input type="text" className="admin-settings-input" defaultValue="RoadAware" />
                <p className="admin-settings-help">The name of the application displayed to users.</p>
              </div>

              <div className="admin-settings-form-group">
                <label className="admin-settings-label">Support Email</label>
                <input type="email" className="admin-settings-input" defaultValue="support@roadaware.app" />
              </div>

              <div className="admin-settings-form-group">
                <label className="admin-settings-label">Timezone</label>
                <select className="admin-settings-select">
                  <option>UTC (Coordinated Universal Time)</option>
                  <option>EST (Eastern Standard Time)</option>
                  <option>PST (Pacific Standard Time)</option>
                </select>
              </div>
            </div>
          )}



          {activeTab === 'security' && (
            <div className="admin-settings-section">
              <h2 className="admin-settings-section-title">Security & Access</h2>
              
              <div className="admin-settings-toggle-group">
                <div>
                  <h3 className="admin-settings-toggle-title">Two-Factor Authentication (2FA)</h3>
                  <p className="admin-settings-help">Require administrators to use 2FA when logging in.</p>
                </div>
                <label className="admin-settings-switch">
                  <input type="checkbox" />
                  <span className="admin-settings-slider"></span>
                </label>
              </div>

              <div className="admin-settings-form-group" style={{ marginTop: '1.5rem' }}>
                <label className="admin-settings-label">Session Timeout (Minutes)</label>
                <input type="number" className="admin-settings-input" defaultValue="60" />
              </div>
            </div>
          )}


        </div>
      </div>
    </div>
  );
};

export default Settings;

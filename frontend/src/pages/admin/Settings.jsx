import React, { useState } from 'react';
import { User, Bell, Shield, Save, X, Smartphone, KeyRound } from 'lucide-react';
import toast from 'react-hot-toast';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [is2FAModalOpen, setIs2FAModalOpen] = useState(false);
  const [twoFAStep, setTwoFAStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');

  const handleToggle2FA = () => {
    if (is2FAEnabled) {
      setIs2FAEnabled(false);
      toast.success('2FA disabled successfully.');
    } else {
      setTwoFAStep(1);
      setPhoneNumber('');
      setOtpCode('');
      setIs2FAModalOpen(true);
    }
  };

  const handleNext2FA = (e) => {
    e.preventDefault();
    if (phoneNumber.length < 10) {
      toast.error('Please enter a valid phone number.');
      return;
    }
    setTwoFAStep(2);
    toast.success('OTP sent to your phone.');
  };

  const handleVerify2FA = (e) => {
    e.preventDefault();
    if (otpCode.length < 6) {
      toast.error('Please enter a valid 6-digit OTP.');
      return;
    }
    setIs2FAEnabled(true);
    setIs2FAModalOpen(false);
    toast.success('2FA enabled successfully!');
  };

  const handleCloseModal = () => {
    setIs2FAModalOpen(false);
  };

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
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={is2FAEnabled}
                    onChange={handleToggle2FA}
                  />
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

      {/* 2FA Modal */}
      {is2FAModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.2s_ease-in-out]">
          <div className="bg-admin-card border border-admin-border rounded-xl shadow-xl w-full max-w-md animate-[slideUp_0.3s_ease-out]">
            <div className="flex items-center justify-between p-6 border-b border-admin-border">
              <h2 className="text-xl font-bold text-admin-text m-0">Setup Two-Factor Authentication</h2>
              <button 
                onClick={handleCloseModal}
                className="p-2 hover:bg-admin-bg rounded-lg text-admin-text-muted hover:text-admin-text transition-colors cursor-pointer border-none bg-transparent"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              {twoFAStep === 1 ? (
                <form onSubmit={handleNext2FA} className="space-y-4">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/10 text-blue-500 mb-4">
                      <Smartphone size={24} />
                    </div>
                    <p className="text-sm text-admin-text-muted m-0">Enter your phone number to receive a verification code. This will be used to secure your admin account.</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-admin-text mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="+1 (555) 000-0000"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full bg-admin-input-bg border border-admin-border rounded-lg px-4 py-2 text-sm text-admin-text transition-all focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="pt-4 mt-6">
                    <button 
                      type="submit"
                      className="w-full py-2.5 rounded-lg text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors cursor-pointer border-none"
                    >
                      Send Code
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleVerify2FA} className="space-y-4">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/10 text-blue-500 mb-4">
                      <KeyRound size={24} />
                    </div>
                    <p className="text-sm text-admin-text-muted m-0">Enter the 6-digit verification code sent to <strong>{phoneNumber}</strong>.</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-admin-text mb-1">Verification Code</label>
                    <input 
                      type="text" 
                      placeholder="000000"
                      maxLength={6}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      className="w-full bg-admin-input-bg border border-admin-border rounded-lg px-4 py-2 text-center tracking-[0.5em] font-mono text-lg text-admin-text transition-all focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="pt-4 mt-6 flex gap-3">
                    <button 
                      type="button"
                      onClick={() => setTwoFAStep(1)}
                      className="flex-1 py-2.5 rounded-lg text-sm font-medium border border-admin-border text-admin-text hover:bg-admin-bg transition-colors cursor-pointer bg-transparent"
                    >
                      Back
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 py-2.5 rounded-lg text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors cursor-pointer border-none"
                    >
                      Verify & Enable
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;

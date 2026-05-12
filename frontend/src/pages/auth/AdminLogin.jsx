import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, ArrowRight } from 'lucide-react';
import '../../css/AdminLogin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // In a real app, perform authentication here
    // If successful, redirect to admin dashboard
    navigate('/admin');
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-overlay"></div>

      <div className="admin-login-content">
        <div className="admin-login-logo">
          <img src="../src/assets/logo.png" alt="RoadAware Logo" className="admin-login-logo-img" />
          <span className="admin-login-logo-text">RoadAware</span>
        </div>

        <div className="admin-login-card">
          <div className="admin-login-header">
            <div className="admin-login-icon-box">
              <Lock size={20} />
            </div>
            <div>
              <h1 className="admin-login-title">Admin Console</h1>
              <p className="admin-login-subtitle">Authorized personnel only</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="admin-login-group">
              <label className="admin-login-label">Admin email</label>
              <input
                type="email"
                className="admin-login-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="admin-login-group">
              <label className="admin-login-label">Password</label>
              <input
                type="password"
                className="admin-login-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="admin-login-button">
              Access Console <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>

      <div className="admin-login-footer">
        © 2026 RoadAware. All rights reserved.
      </div>
    </div>
  );
};

export default AdminLogin;

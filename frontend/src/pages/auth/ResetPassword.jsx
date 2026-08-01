import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/layout/AuthLayout';
import AuthService from '../../services/auth.service';
import toast from 'react-hot-toast';
import { Lock, ArrowRight, AlertCircle } from 'lucide-react';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || '';
  const code = location.state?.code || '';

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!email || !code) {
      toast.error('Session expired or invalid reset attempt.');
      navigate('/forgot-password');
    }
  }, [email, code, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      await AuthService.resetPassword(email, code, newPassword);
      toast.success('Password reset successfully! You can now log in.');
      navigate('/login');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to reset password. Please try again.';
      setErrorMsg(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-3xl font-bold text-white mb-2">Reset Password</h2>
      <p className="text-gray-400 text-sm mb-6">
        Please enter your new password below.
      </p>

      {errorMsg && (
        <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-2.5">
          <AlertCircle size={18} className="shrink-0 text-red-400" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-gray-400 text-sm mb-2 block font-semibold uppercase tracking-wider text-xs">New Password</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 flex items-center">
              <Lock size={18} />
            </span>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" 
            />
          </div>
        </div>
        <div>
          <label className="text-gray-400 text-sm mb-2 block font-semibold uppercase tracking-wider text-xs">Confirm Password</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 flex items-center">
              <Lock size={18} />
            </span>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" 
            />
          </div>
        </div>
        
        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
        >
          {loading ? 'Resetting...' : 'Reset Password'} {!loading && <ArrowRight size={18} />}
        </button>
        <div className="text-center mt-4">
          <Link to="/login" className="text-gray-500 text-sm hover:text-white transition-colors">Back to Login</Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ResetPassword;

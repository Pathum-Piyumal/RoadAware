import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/layout/AuthLayout';
import AuthService from '../../services/auth.service';
import toast from 'react-hot-toast';
import { Mail, ArrowRight, AlertCircle } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      await AuthService.forgotPassword(email);
      toast.success('Verification code sent to your email.');
      navigate('/verify-code', { state: { email } });
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to send code. Verify your email.';
      setErrorMsg(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-3xl font-bold text-white mb-2">Forgot Password?</h2>
      <p className="text-gray-400 text-sm mb-6">
        Enter your email address and we'll send you an OTP code to reset your password.
      </p>

      {errorMsg && (
        <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-2.5">
          <AlertCircle size={18} className="shrink-0 text-red-400" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="text-gray-400 text-sm mb-2 block font-semibold uppercase tracking-wider text-xs">Email Address</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 flex items-center">
              <Mail size={18} />
            </span>
            <input 
              type="email" 
              placeholder="you@example.com" 
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
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
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Sending code...' : 'Send Reset Code'} {!loading && <ArrowRight size={18} />}
        </button>

        <div className="text-center mt-6">
          <Link to="/login" className="text-gray-500 text-sm hover:text-white transition-colors">Back to Login</Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;

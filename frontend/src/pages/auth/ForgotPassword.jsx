import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/layout/AuthLayout';
import AuthService from '../../services/auth.service';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await AuthService.forgotPassword(email);
      toast.success('Verification code sent to your email.');
      navigate('/verify-code', { state: { email } });
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to send reset code. Please try again.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-3xl font-bold text-white mb-2">Forgot Password?</h2>
      <p className="text-gray-400 text-sm mb-8">
        Enter your email address and we'll send you an OTP code to reset your password.
      </p>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="text-gray-400 text-sm mb-2 block">Email</label>
          <input 
            type="email" 
            placeholder="you@example.com" 
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Send Reset Code'} <span className="text-xl">→</span>
        </button>

        <div className="text-center mt-6">
          <Link to="/login" className="text-gray-500 text-sm hover:text-white transition-colors">Back to Login</Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;

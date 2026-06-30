import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthLayout from '../../components/layout/AuthLayout';
import AuthService from '../../services/auth.service';
import toast from 'react-hot-toast';

const VerifyCode = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';

  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(179); // 2:59 in seconds

  useEffect(() => {
    if (!email) {
      toast.error('Session expired. Please request a new code.');
      navigate('/forgot-password');
    }
  }, [email, navigate]);

  useEffect(() => {
    if (timeLeft <= 0 || !email) return;
    const timerId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code) {
      toast.error('Please enter the verification code.');
      return;
    }
    setLoading(true);
    try {
      await AuthService.verifyResetCode(email, code);
      toast.success('Code verified successfully!');
      navigate('/reset-password', { state: { email, code } });
    } catch (error) {
      const message = error.response?.data?.message || 'Invalid or expired code.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    try {
      await AuthService.forgotPassword(email);
      toast.success('A new verification code has been sent.');
      setTimeLeft(179);
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to resend code.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Mask email for privacy (e.g. j***@example.com)
  const maskEmail = (str) => {
    if (!str) return '';
    const [name, domain] = str.split('@');
    if (!name || !domain) return str;
    return `${name.charAt(0)}********@${domain}`;
  };

  if (!email) return null;

  return (
    <AuthLayout>
      <h2 className="text-3xl font-bold text-white mb-2">Input Code</h2>
      <p className="text-gray-400 text-sm mb-8">
        Verification code has been sent via email to {maskEmail(email)}
      </p>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Enter the Code" 
          maxLength={6}
          className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white text-center text-2xl tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono" 
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))} // only digits
          required
        />
        
        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? 'Verifying...' : 'Verify Code'}
        </button>

        <p className="text-gray-400 text-center text-sm">
          Didn't receive it?{' '}
          {timeLeft > 0 ? (
            <span className="text-cyan-400">Resend code in {formatTime(timeLeft)}</span>
          ) : (
            <button 
              type="button" 
              onClick={handleResend}
              disabled={loading}
              className="text-cyan-400 hover:underline font-bold bg-transparent border-none cursor-pointer"
            >
              Resend code now
            </button>
          )}
        </p>
        <div className="text-center mt-4">
          <Link to="/login" className="text-gray-500 text-sm hover:text-white transition-colors">Back to Login</Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default VerifyCode;

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/layout/AuthLayout';
import AuthService from '../../services/auth.service';
import toast from 'react-hot-toast';
import { ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';

const VerifyCode = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || '';

  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [timeLeft, setTimeLeft] = useState(179);

  useEffect(() => {
    if (!email) {
      toast.error('Please request a reset code first.');
      navigate('/forgot-password');
    }
  }, [email, navigate]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timerId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const maskedEmail = email
    ? email.replace(/^(.{2})(.*)(?=@)/, (match, p1, p2) => p1 + '*'.repeat(p2.length))
    : '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code || code.trim().length !== 6) {
      setErrorMsg('Please enter the 6-digit verification code.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      await AuthService.verifyResetCode(email, code.trim());
      toast.success('Code verified successfully.');
      navigate('/reset-password', { state: { email, code: code.trim() } });
    } catch (error) {
      const message = error.response?.data?.message || 'Invalid or expired code. Please try again.';
      setErrorMsg(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setErrorMsg('');
    try {
      await AuthService.forgotPassword(email);
      toast.success('A new verification code has been sent to your email.');
      setTimeLeft(179);
    } catch (error) {
      toast.error('Failed to resend verification code.');
    } finally {
      setResending(false);
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-3xl font-bold text-white mb-2">Verification Code</h2>
      <p className="text-gray-400 text-sm mb-6">
        Enter the 6-digit code sent to <strong className="text-cyan-400">{maskedEmail}</strong>
      </p>

      {errorMsg && (
        <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-2.5">
          <AlertCircle size={18} className="shrink-0 text-red-400" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="text-gray-400 text-sm mb-2 block font-semibold uppercase tracking-wider text-xs">6-Digit Code</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 flex items-center">
              <ShieldCheck size={18} />
            </span>
            <input 
              type="text" 
              maxLength={6}
              placeholder="123456" 
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white text-center text-xl tracking-[0.3em] font-bold focus:outline-none focus:ring-2 focus:ring-cyan-500" 
            />
          </div>
        </div>
        
        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Verifying...' : 'Verify Code'} {!loading && <ArrowRight size={18} />}
        </button>

        <p className="text-gray-400 text-center text-sm">
          Didn't receive code?{' '}
          {timeLeft > 0 ? (
            <span className="text-cyan-400">Resend in {formatTime(timeLeft)}</span>
          ) : (
            <button 
              type="button" 
              onClick={handleResend}
              disabled={resending}
              className="text-cyan-400 hover:underline font-bold"
            >
              {resending ? 'Sending...' : 'Resend code now'}
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

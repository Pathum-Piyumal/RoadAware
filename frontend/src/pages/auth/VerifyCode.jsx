import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import AuthLayout from '../../components/layout/AuthLayout';

const VerifyCode = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(179); // 2:59
  const [resendCount, setResendCount] = useState(0);

  // Get email from previous route, fallback if navigated directly
  const email = location.state?.email || 'example@email.com';
  
  // Format email for privacy: E********@example.com
  const formatEmail = (emailStr) => {
    const [name, domain] = emailStr.split('@');
    if (!domain) return emailStr;
    const firstChar = name.charAt(0).toUpperCase();
    return `${firstChar}********@${domain}`;
  };

  useEffect(() => {
    if (timeLeft <= 0) return;
    
    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    
    return () => clearInterval(timerId);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Simulate API verification
      await new Promise(resolve => setTimeout(resolve, 800));
      if (code.length < 4) {
        throw new Error('Invalid code');
      }
      toast.success('Code verified successfully!');
      navigate('/reset-password');
    } catch (error) {
      toast.error('Invalid verification code.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    if (resendCount >= 3) {
      toast.error('Maximum resend attempts reached.');
      return;
    }
    setTimeLeft(179);
    setResendCount(prev => prev + 1);
    toast.success('Verification code resent!');
  };

  return (
    <AuthLayout 
      title="Input Code" 
      subtitle={
        <div className="text-gray-300 max-w-xs mt-2">
          Verification code has been sent via email to<br/>
          <span className="text-white">{formatEmail(email)}</span>
        </div>
      }
      footer={
        <span className="text-gray-400">By continuing you agree to RoadGuard's terms and privacy policy.</span>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            name="code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            className="w-full bg-white text-gray-900 px-4 py-3.5 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-transparent font-medium"
            placeholder="Enter the Code"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading || !code}
            className="w-full flex justify-center items-center py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-700 to-cyan-400 hover:from-blue-600 hover:to-cyan-300 focus:outline-none transition-all shadow-[0_0_15px_rgba(34,211,238,0.3)] disabled:opacity-50 disabled:shadow-none"
          >
            {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Enter the Code'}
          </button>
        </div>
      </form>

      <div className="mt-6 text-center text-sm font-medium">
        <span className="text-gray-400">Didn't receive it? </span>
        {timeLeft > 0 ? (
          <span className="text-cyan-400">Resend code in {formatTime(timeLeft)} ({resendCount}/3)</span>
        ) : (
          <button 
            onClick={handleResend}
            className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4"
          >
            Resend now
          </button>
        )}
      </div>
    </AuthLayout>
  );
};

export default VerifyCode;

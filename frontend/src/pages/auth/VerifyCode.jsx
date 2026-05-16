import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../components/layout/AuthLayout';

const VerifyCode = () => {
  const [timeLeft, setTimeLeft] = useState(179); // 2:59 in seconds

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

  return (
    <AuthLayout>
      <h2 className="text-3xl font-bold text-white mb-2">Input Code</h2>
      <p className="text-gray-400 text-sm mb-8">
        Verification code has been sent via email to E********@example.com
      </p>

      <form className="space-y-6">
        <input 
          type="text" 
          placeholder="Enter the Code" 
          className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white text-center text-2xl tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-cyan-500" 
        />
        
        <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity">
          Enter the Code
        </button>

        <p className="text-gray-400 text-center text-sm">
          Didn't receive it? <span className="text-cyan-400 cursor-pointer hover:underline">Resend code in {formatTime(timeLeft)} (0/3)</span>
        </p>
        <div className="text-center mt-4">
          <Link to="/login" className="text-gray-500 text-sm hover:text-white transition-colors">Back to Login</Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default VerifyCode;

import React from 'react';
import AuthLayout from '../components/AuthLayout'; // AuthLayout එක තියෙන තැන අනුව path එක වෙනස් කරගන්න

const VerifyCode = () => {
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
          className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white text-center text-2xl tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-blue-500" 
        />
        
        <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity">
          Enter the Code
        </button>

        <p className="text-gray-400 text-center text-sm">
          Didn't receive it? <span className="text-blue-500 cursor-pointer hover:underline">Resend code in 02:59 (0/3)</span>
        </p>
      </form>
    </AuthLayout>
  );
};

export default VerifyCode;
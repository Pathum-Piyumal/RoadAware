import React from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../components/layout/AuthLayout';

const ResetPassword = () => {
  return (
    <AuthLayout>
      <h2 className="text-3xl font-bold text-white mb-2">Reset Password</h2>
      <p className="text-gray-400 text-sm mb-8">
        Please enter your new password below.
      </p>

      <form className="space-y-4">
        <div>
          <label className="text-gray-400 text-sm mb-2 block">New Password</label>
          <input type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
        </div>
        <div>
          <label className="text-gray-400 text-sm mb-2 block">Confirm Password</label>
          <input type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
        </div>
        
        <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mt-4">
          Reset Password <span className="text-xl">→</span>
        </button>
      </form>
    </AuthLayout>
  );
};

export default ResetPassword;

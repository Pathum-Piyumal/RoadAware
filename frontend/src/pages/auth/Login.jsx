import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/layout/AuthLayout';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulating a login so you can view protected pages
    localStorage.setItem('user', JSON.stringify({ name: 'Test User', email: 'test@example.com' }));
    navigate('/');
  };

  return (
    <AuthLayout>
      <h2 className="text-3xl font-bold text-white mb-8">Sign in</h2>
      
      <button className="w-full bg-white text-gray-900 font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-3 mb-6 hover:bg-gray-100 transition-colors">
        <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="google" />
        Continue with Google
      </button>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 h-px bg-white/10"></div>
        <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">or with email</span>
        <div className="flex-1 h-px bg-white/10"></div>
      </div>

      <form className="space-y-4" onSubmit={handleLogin}>
        <div>
          <label className="text-gray-400 text-sm mb-2 block">Email</label>
          <input type="email" placeholder="you@example.com" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
        </div>
        <div className="relative">
          <label className="text-gray-400 text-sm mb-2 block">Password</label>
          <input type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
          <Link to="/forgot-password" className="absolute right-0 top-0 text-cyan-400 text-xs font-semibold hover:underline">Forgot Password?</Link>
        </div>
        <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
          Sign in <span className="text-xl">→</span>
        </button>
      </form>

      <p className="text-gray-400 text-sm mt-8 text-center">
        Don't have an account? <Link to="/register" className="text-white font-bold hover:underline">Create an account</Link>
      </p>
    </AuthLayout>
  );
};

export default Login;

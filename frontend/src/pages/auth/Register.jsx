import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/layout/AuthLayout';

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify({ name: 'Test User', email: 'test@example.com' }));
    localStorage.setItem('token', 'mock_test_token_2026');
    navigate('/');
  };

  return (
    <AuthLayout>
      <h2 className="text-3xl font-bold text-white mb-2">Create an account</h2>
      <p className="text-gray-400 text-sm mb-8">
        Already a member? <Link to="/login" className="text-cyan-400 font-bold hover:underline">Sign in</Link>
      </p>

      <form className="space-y-4" onSubmit={handleRegister}>
        <div>
          <label className="text-gray-400 text-sm mb-2 block">Full Name</label>
          <input type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
        </div>
        <div>
          <label className="text-gray-400 text-sm mb-2 block">Email</label>
          <input type="email" placeholder="you@example.com" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
        </div>
        <div>
          <label className="text-gray-400 text-sm mb-2 block">Password</label>
          <input type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
        </div>
        
        <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mt-4">
          Get started <span className="text-xl">→</span>
        </button>
      </form>
    </AuthLayout>
  );
};

export default Register;

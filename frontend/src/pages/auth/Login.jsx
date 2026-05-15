import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import AuthService from '../../services/auth.service';
import AuthLayout from '../../components/layout/AuthLayout';

// Simple Google icon SVG component
const GoogleIcon = () => (
  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    <path fill="none" d="M1 1h22v22H1z" />
  </svg>
);

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await AuthService.login(formData.email, formData.password);
      toast.success('Successfully logged in!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Sign in"
      footer={
        <>
          <span className="text-gray-400">Don't have an account? </span>
          <Link to="/register" className="font-semibold text-white hover:text-cyan-300 underline underline-offset-4">
            Create an accounnt
          </Link>
        </>
      }
    >
      
      {/* Google Login Button */}
      <button 
        type="button" 
        className="w-full flex items-center justify-center bg-white text-gray-900 font-semibold py-3 px-4 rounded-xl shadow-sm hover:bg-gray-100 transition-colors mb-6"
      >
        <GoogleIcon />
        Continue with Google
      </button>

      {/* Divider */}
      <div className="flex items-center mb-6">
        <div className="flex-grow border-t border-white/20"></div>
        <span className="px-4 text-xs font-semibold text-gray-400 tracking-wider">OR WITH EMAIL</span>
        <div className="flex-grow border-t border-white/20"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-white mb-1.5">Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-white text-gray-900 px-4 py-3 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-transparent"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="block text-sm font-medium text-white">Password</label>
            <Link to="/forgot-password" className="text-sm font-medium text-blue-500 hover:text-blue-400">
              Forgot Password?
            </Link>
          </div>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full bg-white text-gray-900 px-4 py-3 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-transparent tracking-widest"
            placeholder="........"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-700 to-cyan-400 hover:from-blue-600 hover:to-cyan-300 focus:outline-none transition-all shadow-[0_0_15px_rgba(34,211,238,0.3)]"
          >
            {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : <>Sign in <ArrowRight size={16} className="ml-2" /></>}
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;

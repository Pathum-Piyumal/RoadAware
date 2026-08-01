import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/layout/AuthLayout';
import AuthService from '../../services/auth.service';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async (response) => {
    const credential = response.credential;
    setLoading(true);
    try {
      const data = await AuthService.googleLogin(credential);
      toast.success('Logged in successfully!');
      if (data.user && data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Google Login failed. Please try again.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const initializeGoogleSignIn = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId) {
      console.warn('VITE_GOOGLE_CLIENT_ID is not configured.');
      return;
    }

    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleGoogleLogin,
      });

      const container = document.getElementById('google-login-page-btn');
      if (container) {
        container.innerHTML = '';
        window.google.accounts.id.renderButton(container, {
          theme: 'outline',
          size: 'large',
          width: container.parentElement?.clientWidth || 320,
          text: 'signin_with',
        });
      }
    }
  };

  useEffect(() => {
    if (!document.getElementById('google-gsi-client')) {
      const script = document.createElement('script');
      script.id = 'google-gsi-client';
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        initializeGoogleSignIn();
      };
      document.head.appendChild(script);
    } else {
      const timer = setTimeout(() => {
        initializeGoogleSignIn();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await AuthService.login(email, password);
      if (data.user && data.user.role === 'admin') {
        toast.success('Access Granted! Welcome to the Admin Console.');
        navigate('/admin');
      } else {
        toast.success('Logged in successfully!');
        navigate('/');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Invalid email or password.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-3xl font-bold text-white mb-8">Sign in</h2>
      
      <div className="flex justify-center w-full min-h-[44px] mb-6">
        <div id="google-login-page-btn" className="w-full max-w-[320px] flex justify-center"></div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 h-px bg-white/10"></div>
        <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">or with email</span>
        <div className="flex-1 h-px bg-white/10"></div>
      </div>

      <form className="space-y-4" onSubmit={handleLogin}>
        <div>
          <label className="text-gray-400 text-sm mb-2 block">Email</label>
          <input 
            type="email" 
            placeholder="you@gmail.com" 
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="relative">
          <label className="text-gray-400 text-sm mb-2 block">Password</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Link to="/forgot-password" className="absolute right-0 top-0 text-cyan-400 text-xs font-semibold hover:underline">Forgot Password?</Link>
        </div>
        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Signing in...' : 'Sign in'} <span className="text-xl">→</span>
        </button>
      </form>

      <p className="text-gray-400 text-sm mt-8 text-center">
        Don't have an account? <Link to="/register" className="text-white font-bold hover:underline">Create an account</Link>
      </p>
    </AuthLayout>
  );
};

export default Login;

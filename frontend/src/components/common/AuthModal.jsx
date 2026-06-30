import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { X, Mail, Lock, User, Eye, EyeOff, ArrowRight, Shield, Key } from 'lucide-react';
import { useAuthModal } from '../../context/AuthModalContext';
import AuthService from '../../services/auth.service';
import api from '../../services/api';
import toast from 'react-hot-toast';

const AuthModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthModalOpen, authModalType, setAuthModalType, closeAuthModal } = useAuthModal();

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Clear fields on open / view transition
  useEffect(() => {
    // Only keep email when transitioning to verifyCode / resetPassword, otherwise clear
    if (authModalType !== 'verifyCode' && authModalType !== 'resetPassword') {
      setEmail('');
    }
    setPassword('');
    setName('');
    setCode('');
    setNewPassword('');
    setShowPassword(false);
  }, [authModalType, isAuthModalOpen]);

  // Lock body scrolling when modal is open
  useEffect(() => {
    if (isAuthModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isAuthModalOpen]);

  const handleGoogleLogin = async (response) => {
    const credential = response.credential;
    setLoading(true);
    try {
      await AuthService.googleLogin(credential);
      toast.success('Logged in successfully!');
      closeAuthModal();
      const redirectPath = location.state?.from?.pathname || '/';
      const authPaths = ['/login', '/register', '/forgot-password', '/verify-code', '/reset-password'];
      if (authPaths.includes(location.pathname)) {
        navigate(redirectPath);
      } else {
        window.location.reload();
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

      const containerId = authModalType === 'login' ? 'google-login-btn' : 'google-register-btn';
      const container = document.getElementById(containerId);
      if (container) {
        container.innerHTML = '';
        window.google.accounts.id.renderButton(container, {
          theme: 'outline',
          size: 'large',
          width: container.parentElement?.clientWidth || 320,
          text: authModalType === 'login' ? 'signin_with' : 'signup_with',
        });
      }
    }
  };

  useEffect(() => {
    if (isAuthModalOpen && (authModalType === 'login' || authModalType === 'register')) {
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
        // Defer slightly to ensure React has mounted the button container divs
        const timer = setTimeout(() => {
          initializeGoogleSignIn();
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [isAuthModalOpen, authModalType]);

  if (!isAuthModalOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await AuthService.login(email, password);
      if (data.user && data.user.role === 'admin') {
        toast.success('Access Granted! Welcome to the Admin Console.');
        closeAuthModal();
        navigate('/admin');
      } else {
        toast.success('Logged in successfully!');
        closeAuthModal();
        const redirectPath = location.state?.from?.pathname || '/';
        const authPaths = ['/login', '/register', '/forgot-password', '/verify-code', '/reset-password'];
        if (authPaths.includes(location.pathname)) {
          navigate(redirectPath);
        } else {
          window.location.reload();
        }
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Invalid email or password.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await AuthService.register(name, email, password);
      toast.success('Account created successfully!');
      closeAuthModal();
      const redirectPath = location.state?.from?.pathname || '/';
      const authPaths = ['/login', '/register', '/forgot-password', '/verify-code', '/reset-password'];
      if (authPaths.includes(location.pathname)) {
        navigate(redirectPath);
      } else {
        window.location.reload();
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed. Try again.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await AuthService.forgotPassword(email);
      toast.success('Verification code sent to your email.');
      setAuthModalType('verifyCode');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to send code. Verify your email.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCodeSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await AuthService.verifyResetCode(email, code);
      toast.success('Verification successful! Set your new password.');
      setAuthModalType('resetPassword');
    } catch (error) {
      const message = error.response?.data?.message || 'Invalid or expired code.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await AuthService.resetPassword(email, code, newPassword);
      toast.success('Password reset successful! Please log in.');
      setAuthModalType('login');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to reset password.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleClose = () => {
    closeAuthModal();
    const authPaths = ['/login', '/register', '/forgot-password', '/verify-code', '/reset-password'];
    if (authPaths.includes(location.pathname)) {
      navigate('/');
    }
  };

  return (
    <div 
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[1100] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 transition-all duration-300"
    >
      <div className="bg-[#0f172a] border border-white/10 rounded-[32px] w-full max-w-4xl flex overflow-hidden shadow-2xl relative text-white max-h-[90vh]">
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute right-6 top-6 z-30 text-slate-400 hover:text-white p-2 rounded-xl bg-white/5 border-none hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Left Visual Panel - Desktop Only */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-600 via-indigo-950 to-slate-950 p-12 flex-col justify-between relative overflow-hidden border-r border-white/10 select-none">
          {/* Overlapping Rounded Shapes (Mocking design bubbles) */}
          <div className="absolute top-[-25%] left-[-25%] w-[80%] h-[80%] bg-blue-500/25 rounded-full blur-3xl pointer-events-none"></div>
          
          {/* Main big circle blob */}
          <div className="absolute top-[20%] left-[-30%] w-[320px] h-[320px] bg-blue-600 rounded-full opacity-60 shadow-xl"></div>
          
          {/* Bottom circular elements matching reference layout */}
          <div className="absolute bottom-[-15%] right-[-10%] w-[180px] h-[180px] bg-blue-400/30 rounded-full blur-xl pointer-events-none"></div>
          <div className="absolute bottom-[5%] left-[20%] w-[220px] h-[220px] bg-indigo-600 rounded-full opacity-80 shadow-2xl"></div>
          <div className="absolute bottom-[20%] left-[-20%] w-[150px] h-[150px] bg-blue-500 rounded-full opacity-55"></div>

          {/* Welcome Text Content */}
          <div className="relative z-10 flex flex-col justify-center h-full">
            <h1 className="text-4xl font-extrabold text-white tracking-tight uppercase leading-none">
              Welcome
            </h1>
            <h2 className="text-xl font-bold text-slate-200 mt-2 tracking-widest uppercase">
              RoadAware
            </h2>
            <p className="text-slate-300/80 text-sm leading-relaxed max-w-xs mt-4">
              Making our streets safer, together. Report hazards, track repair works in real time, and improve your neighborhood safety.
            </p>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative overflow-y-auto max-h-[90vh]">
          {/* Glow backdrop inside form panel */}
          <div className="absolute bottom-[-50px] right-[-50px] w-48 h-48 bg-orange-600/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="z-10 w-full flex flex-col gap-6">
            {/* Form Title & Subheading */}
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-white m-0">
                {authModalType === 'login' && 'Sign In'}
                {authModalType === 'register' && 'Create Account'}
                {authModalType === 'forgotPassword' && 'Forgot Password'}
                {authModalType === 'verifyCode' && 'Verify Code'}
                {authModalType === 'resetPassword' && 'Reset Password'}
              </h2>
              <p className="text-slate-400 text-sm m-0 mt-2 leading-relaxed">
                {authModalType === 'login' && 'Log in to report road issues and access dashboard.'}
                {authModalType === 'register' && 'Sign up to start contributing to your community.'}
                {authModalType === 'forgotPassword' && "Enter email and we'll send you an OTP code."}
                {authModalType === 'verifyCode' && `We've sent a 6-digit OTP code to ${email}`}
                {authModalType === 'resetPassword' && 'Type in a new secure password for your account.'}
              </p>
            </div>

            {/* View Switching / Render View Forms */}

            {authModalType === 'login' && (
              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-400 text-xs font-bold uppercase tracking-wider">Email</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 flex items-center">
                      <Mail size={16} />
                    </span>
                    <input 
                      type="email"
                      placeholder="you@example.com"
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all box-border"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-400 text-xs font-bold uppercase tracking-wider">Password</label>
                    <button 
                      type="button"
                      onClick={() => setAuthModalType('forgotPassword')}
                      className="text-xs font-semibold text-blue-400 bg-transparent border-none hover:underline cursor-pointer hover:text-blue-300"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 flex items-center">
                      <Lock size={16} />
                    </span>
                    <input 
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all box-border"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-transparent border-none text-slate-500 hover:text-white cursor-pointer flex items-center"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-blue-600 text-white border-none rounded-xl text-sm font-bold cursor-pointer transition-opacity mt-2 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Signing in...' : 'Sign In'} {!loading && <ArrowRight size={16} />}
                </button>

                <div className="flex items-center gap-4 py-1">
                  <div className="flex-1 h-px bg-white/10"></div>
                  <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">or</span>
                  <div className="flex-1 h-px bg-white/10"></div>
                </div>

                <div className="flex justify-center w-full min-h-[44px]">
                  <div id="google-login-btn" className="w-full max-w-[320px] flex justify-center"></div>
                </div>

                <p className="text-slate-400 text-sm text-center mt-4 m-0">
                  Don't have an account?{' '}
                  <button 
                    type="button"
                    onClick={() => setAuthModalType('register')}
                    className="text-blue-400 font-bold bg-transparent border-none hover:underline cursor-pointer hover:text-blue-300"
                  >
                    Register
                  </button>
                </p>
              </form>
            )}

            {authModalType === 'register' && (
              <form onSubmit={handleRegister} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-400 text-xs font-bold uppercase tracking-wider">Full Name</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 flex items-center">
                      <User size={16} />
                    </span>
                    <input 
                      type="text"
                      placeholder="John Doe"
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all box-border"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-400 text-xs font-bold uppercase tracking-wider">Email</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 flex items-center">
                      <Mail size={16} />
                    </span>
                    <input 
                      type="email"
                      placeholder="you@example.com"
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all box-border"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-400 text-xs font-bold uppercase tracking-wider">Password</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 flex items-center">
                      <Lock size={16} />
                    </span>
                    <input 
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all box-border"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-transparent border-none text-slate-500 hover:text-white cursor-pointer flex items-center"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-blue-600 text-white border-none rounded-xl text-sm font-bold cursor-pointer transition-opacity mt-2 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Creating account...' : 'Create Account'} {!loading && <ArrowRight size={16} />}
                </button>

                <div className="flex items-center gap-4 py-1">
                  <div className="flex-1 h-px bg-white/10"></div>
                  <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">or</span>
                  <div className="flex-1 h-px bg-white/10"></div>
                </div>

                <div className="flex justify-center w-full min-h-[44px]">
                  <div id="google-register-btn" className="w-full max-w-[320px] flex justify-center"></div>
                </div>

                <p className="text-slate-400 text-sm text-center mt-4 m-0">
                  Already have an account?{' '}
                  <button 
                    type="button"
                    onClick={() => setAuthModalType('login')}
                    className="text-blue-400 font-bold bg-transparent border-none hover:underline cursor-pointer hover:text-blue-300"
                  >
                    Sign In
                  </button>
                </p>
              </form>
            )}

            {authModalType === 'forgotPassword' && (
              <form onSubmit={handleForgotPasswordSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-400 text-xs font-bold uppercase tracking-wider">Email Address</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 flex items-center">
                      <Mail size={16} />
                    </span>
                    <input 
                      type="email"
                      placeholder="you@example.com"
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all box-border"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-blue-600 text-white border-none rounded-xl text-sm font-bold cursor-pointer transition-opacity mt-2 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending link...' : 'Send Reset Code'} {!loading && <ArrowRight size={16} />}
                </button>

                <p className="text-slate-400 text-sm text-center mt-4 m-0">
                  Remember your password?{' '}
                  <button 
                    type="button"
                    onClick={() => setAuthModalType('login')}
                    className="text-blue-400 font-bold bg-transparent border-none hover:underline cursor-pointer hover:text-blue-300"
                  >
                    Back to Sign In
                  </button>
                </p>
              </form>
            )}

            {authModalType === 'verifyCode' && (
              <form onSubmit={handleVerifyCodeSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-400 text-xs font-bold uppercase tracking-wider">Verification OTP Code</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 flex items-center">
                      <Key size={16} />
                    </span>
                    <input 
                      type="text"
                      placeholder="123456"
                      maxLength={6}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm tracking-[0.2em] font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all box-border text-center text-lg"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-blue-600 text-white border-none rounded-xl text-sm font-bold cursor-pointer transition-opacity mt-2 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Verifying...' : 'Verify Code'} {!loading && <ArrowRight size={16} />}
                </button>

                <p className="text-slate-400 text-sm text-center mt-4 m-0">
                  Wrong email?{' '}
                  <button 
                    type="button"
                    onClick={() => setAuthModalType('forgotPassword')}
                    className="text-blue-400 font-bold bg-transparent border-none hover:underline cursor-pointer hover:text-blue-300"
                  >
                    Resend Code
                  </button>
                </p>
              </form>
            )}

            {authModalType === 'resetPassword' && (
              <form onSubmit={handleResetPasswordSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-400 text-xs font-bold uppercase tracking-wider">New Password</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 flex items-center">
                      <Lock size={16} />
                    </span>
                    <input 
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all box-border"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-transparent border-none text-slate-500 hover:text-white cursor-pointer flex items-center"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-blue-600 text-white border-none rounded-xl text-sm font-bold cursor-pointer transition-opacity mt-2 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Saving password...' : 'Save New Password'} {!loading && <ArrowRight size={16} />}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;

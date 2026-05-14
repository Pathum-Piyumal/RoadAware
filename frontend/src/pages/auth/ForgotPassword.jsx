import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Mail, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import AuthService from '../../services/auth.service';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Email is required');
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid');
      return;
    }

    setIsLoading(true);
    try {
      await AuthService.forgotPassword(email);
      setIsSuccess(true);
      toast.success('Password reset link sent!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to process request.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-md w-full bg-[#111] p-8 rounded-3xl shadow-xl shadow-black/50 border border-white/10">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
            <ShieldCheck size={28} color="#fff" />
          </div>
        </div>

        <h2 className="text-center text-2xl font-bold text-white tracking-tight">
          Reset Password
        </h2>

        {!isSuccess ? (
          <>
            <p className="mt-2 text-center text-sm text-gray-400 mb-8">
              Enter your email address and we'll send you a link to reset your password.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-300">
                  Email address
                </label>
                <div className="mt-2 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(''); }}
                    className={`block w-full pl-10 pr-3 py-3 border ${
                      error ? 'border-red-500 focus:ring-red-500' : 'border-white/10 focus:ring-orange-500 focus:border-orange-500'
                    } rounded-xl text-sm placeholder-gray-500 bg-[#0a0a0a] text-white focus:outline-none focus:ring-2 transition-colors`}
                    placeholder="you@example.com"
                  />
                </div>
                {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-gray-900 bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] focus:ring-white transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin h-5 w-5" />
                ) : (
                  'Send Reset Link'
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="mt-8 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-500/20 border border-green-500/30 mb-4">
              <CheckCircle2 className="h-6 w-6 text-green-500" />
            </div>
            <h3 className="text-lg font-medium text-white">Check your email</h3>
            <p className="mt-2 text-sm text-gray-400">
              We've sent a password reset link to <strong className="text-gray-200">{email}</strong>.
            </p>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link to="/login" className="inline-flex items-center text-sm font-semibold text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

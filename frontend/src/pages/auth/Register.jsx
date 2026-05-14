import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import AuthService from '../../services/auth.service';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      await AuthService.register(formData.name, formData.email, formData.password);
      toast.success('Registration successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#0a0a0a] text-white">
      {/* Left side - Branding */}
      <div className="hidden lg:block relative w-0 flex-1 bg-gray-900 border-r border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent z-10" />
        <img
          className="absolute inset-0 h-full w-full object-cover opacity-50"
          src="https://images.unsplash.com/photo-1541888043690-3fb3e8d641ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Road maintenance"
        />
        <div className="absolute top-0 left-0 right-0 z-20 p-12 text-white">
          <div className="flex items-center gap-2 mb-12">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg">
              <ShieldCheck size={24} color="#fff" />
            </div>
            <span className="text-2xl font-black tracking-tight">RoadAware</span>
          </div>
          <h3 className="text-4xl font-bold mb-4 tracking-tight">Take action today.</h3>
          <p className="text-lg text-gray-400 max-w-lg">
            Create an account to start reporting issues, tracking progress, and making your community's roads safer for everyone.
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-[400px]">
          <h2 className="text-3xl font-bold text-white tracking-tight">Create an account</h2>
          <p className="mt-2 text-sm text-gray-400">
            Join the community and start reporting road hazards.
          </p>

          <div className="mt-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-300">
                  Full Name
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-3 border ${
                      errors.name ? 'border-red-500 focus:ring-red-500' : 'border-white/10 focus:ring-orange-500 focus:border-orange-500'
                    } rounded-xl text-sm placeholder-gray-500 bg-[#111] text-white focus:outline-none focus:ring-2 transition-colors`}
                    placeholder="John Doe"
                  />
                </div>
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-300">
                  Email address
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-3 border ${
                      errors.email ? 'border-red-500 focus:ring-red-500' : 'border-white/10 focus:ring-orange-500 focus:border-orange-500'
                    } rounded-xl text-sm placeholder-gray-500 bg-[#111] text-white focus:outline-none focus:ring-2 transition-colors`}
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-300">
                  Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-3 border ${
                      errors.password ? 'border-red-500 focus:ring-red-500' : 'border-white/10 focus:ring-orange-500 focus:border-orange-500'
                    } rounded-xl text-sm placeholder-gray-500 bg-[#111] text-white focus:outline-none focus:ring-2 transition-colors`}
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-300">
                  Confirm Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-3 border ${
                      errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-white/10 focus:ring-orange-500 focus:border-orange-500'
                    } rounded-xl text-sm placeholder-gray-500 bg-[#111] text-white focus:outline-none focus:ring-2 transition-colors`}
                    placeholder="••••••••"
                  />
                </div>
                {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-gray-900 bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] focus:ring-white transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin h-5 w-5" />
                  ) : (
                    <>
                      Create Account <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-orange-500 hover:text-orange-400">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

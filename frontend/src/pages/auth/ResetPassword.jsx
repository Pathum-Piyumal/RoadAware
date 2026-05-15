import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import AuthLayout from '../../components/layout/AuthLayout';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ newPassword: '', confirmPassword: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (formData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call for password reset
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast.success('Password successfully reset! Please sign in.');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to reset password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="New Password" 
      subtitle={
        <div className="text-gray-300 mt-2">
          Create a strong, secure new password
        </div>
      }
      footer={
        <span className="text-gray-400">By continuing you agree to RoadGuard's terms and privacy policy.</span>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            name="newPassword"
            type="password"
            value={formData.newPassword}
            onChange={handleChange}
            required
            className="w-full bg-white text-gray-900 px-4 py-3.5 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-transparent font-medium"
            placeholder="New Password"
          />
        </div>
        
        <div>
          <input
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full bg-white text-gray-900 px-4 py-3.5 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-transparent font-medium"
            placeholder="Confirm Password"
          />
        </div>

        <div className="pt-2 space-y-3">
          <button
            type="submit"
            disabled={isLoading || !formData.newPassword || !formData.confirmPassword}
            className="w-full flex justify-center items-center py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-700 to-cyan-400 hover:from-blue-600 hover:to-cyan-300 focus:outline-none transition-all shadow-[0_0_15px_rgba(34,211,238,0.3)] disabled:opacity-50 disabled:shadow-none"
          >
            {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Continue'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/login')}
            disabled={isLoading}
            className="w-full flex justify-center items-center py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-white/5 hover:bg-white/10 border border-white/10 focus:outline-none transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ResetPassword;

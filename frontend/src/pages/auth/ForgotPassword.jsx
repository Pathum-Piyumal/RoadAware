import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import AuthService from '../../services/auth.service';
import AuthLayout from '../../components/layout/AuthLayout';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Simulate API call for sending reset code
      // await AuthService.forgotPassword(email);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast.success('Verification code sent!');
      // Pass email to state for the next page to use
      navigate('/verify-code', { state: { email } });
    } catch (error) {
      toast.error('Failed to send verification code.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Sign in" 
      subtitle={
        <div className="text-gray-300 max-w-sm mt-2">
          Please enter your email account to send the verification code to reset your password
        </div>
      }
      footer={
        <span className="text-gray-400">By continuing you agree to RoadGuard's terms and privacy policy.</span>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-white mb-1.5">Email</label>
          <input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-white text-gray-900 px-4 py-3 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-transparent"
            placeholder="you@example.com"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading || !email}
            className="w-full flex justify-center items-center py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-700 to-cyan-400 hover:from-blue-600 hover:to-cyan-300 focus:outline-none transition-all shadow-[0_0_15px_rgba(34,211,238,0.3)] disabled:opacity-50 disabled:shadow-none"
          >
            {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : <>Sign in <ArrowRight size={16} className="ml-2" /></>}
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, ArrowRight } from 'lucide-react';
import AuthService from '../../services/auth.service';
import toast from 'react-hot-toast';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await AuthService.adminLogin(email, password);
      toast.success('Access Granted! Welcome to the Admin Console.');
      navigate('/admin');
    } catch (error) {
      const message = error.response?.data?.message || 'Access Denied. Invalid credentials.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#020617] bg-cover bg-[right_center] bg-no-repeat relative" style={{ backgroundImage: "url('../src/assets/admin panel/admin-bg.png')" }}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] from-30% to-[#020617]/70 to-100% md:bg-gradient-to-r md:from-[#020617] md:from-30% md:via-[#020617]/50 md:via-60% md:to-transparent md:to-100% z-10"></div>

      <div className="relative z-20 flex flex-col justify-center p-6 md:p-12 w-full max-w-[36rem] items-center md:items-start">
        <div className="flex items-center gap-3 mb-8 md:ml-4 ml-0 justify-center md:justify-start">
          <img src="../src/assets/logo.png" alt="RoadAware Logo" className="w-10 h-10 object-contain" />
          <span className="text-2xl font-bold text-white">RoadAware</span>
        </div>

        <div className="bg-slate-900/70 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 md:p-10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] w-full">
          <div className="flex items-start gap-4 mb-8">
            <div className="bg-blue-900/50 border border-blue-500/20 rounded-lg w-12 h-12 flex items-center justify-center text-blue-400 shrink-0">
              <Lock size={20} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white m-0">Admin Console</h1>
              <p className="text-sm text-slate-400 m-0 mt-1">Authorized personnel only</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-200">Admin email</label>
              <input
                type="email"
                className="w-full px-4 py-3.5 bg-[#0B1120] border border-slate-800 rounded-lg text-white text-base transition-all focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 box-border"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-200">Password</label>
              <input
                type="password"
                className="w-full px-4 py-3.5 bg-[#0B1120] border border-slate-800 rounded-lg text-white text-base transition-all focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 box-border"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" disabled={loading} className="flex items-center justify-center gap-3 w-full p-3.5 bg-blue-700 text-white border-none rounded-lg text-base font-semibold cursor-pointer transition-colors mt-2 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? 'Authorizing...' : 'Access Console'} {!loading && <ArrowRight size={18} />}
            </button>
          </form>
        </div>
      </div>

      <div className="absolute bottom-4 md:bottom-8 left-0 md:left-12 z-20 text-xs text-slate-400 w-full md:w-auto text-center md:text-left">
        © 2026 RoadAware. All rights reserved.
      </div>
    </div>
  );
};

export default AdminLogin;

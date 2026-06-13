import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, ArrowRight, Map, BarChart3 } from 'lucide-react';
import AuthService from '../../services/auth.service';
import AuthLayout from '../../components/layout/AuthLayout';
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

  const adminFeatures = [
    {
      icon: Map,
      title: "Incident Monitoring",
      desc: "Track reported road hazards across the region in real-time.",
      colorClass: "bg-blue-500/10 border-blue-500/20 text-blue-400"
    },
    {
      icon: BarChart3,
      title: "System Stats & Analytics",
      desc: "Analyze resolution rate trends and category frequencies.",
      colorClass: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400"
    },
    {
      icon: Shield,
      title: "Access Controls",
      desc: "Secure console access for municipal workers and administrators.",
      colorClass: "bg-indigo-500/10 border-indigo-500/20 text-indigo-400"
    }
  ];

  return (
    <AuthLayout
      badge="System Administration"
      title="Access Authorized"
      titleHighlight="Console."
      description="Manage and oversee the RoadAware incident reports, assign public works tasks, and review system stats."
      features={adminFeatures}
    >
      <div className="flex items-start gap-4 mb-8">
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl w-12 h-12 flex items-center justify-center text-blue-400 shrink-0">
          <Lock size={20} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white m-0">Admin Access</h2>
          <p className="text-sm text-slate-400 m-0 mt-1">Authorized personnel only.</p>
        </div>
      </div>

      <form onSubmit={handleLogin} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-200">Admin Email</label>
          <input
            type="email"
            placeholder="admin@roadaware.com"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-base transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent box-border"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-200">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-base transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent box-border"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          className="flex items-center justify-center gap-3 w-full py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-none rounded-xl text-base font-semibold cursor-pointer transition-opacity mt-2 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Authorizing...' : 'Access Console'} {!loading && <ArrowRight size={18} />}
        </button>
      </form>

      <div className="h-px bg-white/10 my-6"></div>
      <p className="text-slate-400 text-sm text-center">
        Are you a citizen? <Link to="/login" className="text-blue-400 font-bold hover:underline">Sign in as Citizen</Link>
      </p>
    </AuthLayout>
  );
};

export default AdminLogin;

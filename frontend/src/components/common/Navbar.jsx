import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav style={{
      position: isHome ? 'fixed' : 'sticky',
      top: 0, left: 0, right: 0, zIndex: 1000,
      background: isHome ? 'rgba(10,10,10,0.85)' : '#0a0a0a',
      backdropFilter: isHome ? 'blur(16px)' : 'none',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, background: '#f97316', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldCheck size={18} color="#fff" />
          </div>
          <span style={{ fontWeight: 800, fontSize: 18, color: '#fff', letterSpacing: '-0.5px' }}>RoadAware</span>
        </div>

        {/* Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          <Link to="/" style={{ fontSize: 13, fontWeight: 700, color: location.pathname === '/' ? '#fff' : 'rgba(255,255,255,0.55)', textDecoration: 'none', borderBottom: location.pathname === '/' ? '2px solid #f97316' : 'none', paddingBottom: 2 }}>Home</Link>
          <Link to="/map" style={{ fontSize: 13, fontWeight: 700, color: location.pathname === '/map' ? '#fff' : 'rgba(255,255,255,0.55)', textDecoration: 'none', borderBottom: location.pathname === '/map' ? '2px solid #f97316' : 'none', paddingBottom: 2 }}>Hazard Map</Link>
          <Link to="/report-hazard" style={{ fontSize: 13, fontWeight: 700, color: location.pathname === '/report-hazard' ? '#fff' : 'rgba(255,255,255,0.55)', textDecoration: 'none', borderBottom: location.pathname === '/report-hazard' ? '2px solid #f97316' : 'none', paddingBottom: 2 }}>Report</Link>
          <Link to="/my-reports" style={{ fontSize: 13, fontWeight: 700, color: location.pathname === '/my-reports' ? '#fff' : 'rgba(255,255,255,0.55)', textDecoration: 'none', borderBottom: location.pathname === '/my-reports' ? '2px solid #f97316' : 'none', paddingBottom: 2 }}>My Reports</Link>
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <button style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.6)', background: 'none', border: 'none', cursor: 'pointer' }}>Login</button>
          <Link to="/report-hazard" style={{
            background: '#fff', color: '#111', padding: '9px 22px', borderRadius: 999,
            fontSize: 13, fontWeight: 700, textDecoration: 'none', letterSpacing: '-0.2px',
          }}>Get started</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import AuthService from '../../services/auth.service';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, Menu, X } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const currentUser = AuthService.getCurrentUser();
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    AuthService.logout();
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = (e) => {
    closeMobileMenu();
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Hazard Map', path: '/map' },
    { name: 'Leaderboard', path: '/leaderboard' },
    { name: 'Report', path: '/report-hazard' },
    { name: 'My Reports', path: '/my-reports' }
  ];

  return (
    <nav style={{
      position: isHome ? 'fixed' : 'sticky',
      top: 0, left: 0, right: 0, zIndex: 1000,
      background: isHome ? 'rgba(10,10,10,0.85)' : '#0a0a0a',
      backdropFilter: isHome ? 'blur(16px)' : 'none',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" onClick={handleLogoClick} style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <img src={logo} alt="RoadAware Logo" style={{ width: 34, height: 34, objectFit: 'contain', borderRadius: 8 }} />
          <span style={{ fontWeight: 800, fontSize: 18, color: '#fff', letterSpacing: '-0.5px' }}>RoadAware</span>
        </Link>

        {/* Nav Links - Desktop */}
        <div className="hidden md:flex items-center gap-9">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              style={{ 
                fontSize: 13, 
                fontWeight: 700, 
                color: location.pathname === link.path ? '#fff' : 'rgba(255,255,255,0.55)', 
                textDecoration: 'none', 
                borderBottom: location.pathname === link.path ? '2px solid #f97316' : 'none', 
                paddingBottom: 2 
              }}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* CTA - Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#fff',
              width: 38,
              height: 38,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              outline: 'none',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.16)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {currentUser ? (
            <button onClick={handleLogout} style={{
              background: '#f97316', color: '#fff', padding: '9px 22px', borderRadius: 999,
              fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer', letterSpacing: '-0.2px',
            }}>Logout</button>
          ) : (
            <>
              <Link to="/login" style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.6)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'none' }}>Login</Link>
              <Link to="/register" style={{
                background: '#fff', color: '#111', padding: '9px 22px', borderRadius: 999,
                fontSize: 13, fontWeight: 700, textDecoration: 'none', letterSpacing: '-0.2px',
              }}>Register</Link>
            </>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex md:hidden text-white/70 hover:text-white p-2 focus:outline-none transition-colors border-none bg-transparent cursor-pointer"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/5 absolute top-16 left-0 right-0 flex flex-col p-6 gap-6 z-50 animate-fade-in-up">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                onClick={closeMobileMenu}
                style={{ 
                  fontSize: 15, 
                  fontWeight: 700, 
                  color: location.pathname === link.path ? '#fff' : 'rgba(255,255,255,0.55)', 
                  textDecoration: 'none', 
                  borderBottom: location.pathname === link.path ? '1px solid #f97316' : 'none', 
                  paddingBottom: 4,
                  alignSelf: 'flex-start'
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <hr className="border-white/5 my-1" />

          <div className="flex items-center justify-between">
            <span className="text-white/60 text-sm font-semibold">Switch Theme</span>
            <button 
              onClick={toggleTheme}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#fff',
                width: 38,
                height: 38,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                outline: 'none',
              }}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            {currentUser ? (
              <button 
                onClick={handleLogout} 
                style={{
                  background: '#f97316', color: '#fff', padding: '12px 22px', borderRadius: 16,
                  fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer', textAlign: 'center', width: '100%'
                }}
              >
                Logout
              </button>
            ) : (
              <>
                <Link 
                  to="/login" 
                  onClick={closeMobileMenu}
                  style={{ 
                    fontSize: 14, fontWeight: 600, color: '#fff', background: 'rgba(255,255,255,0.05)', 
                    border: '1px solid rgba(255,255,255,0.1)', padding: '12px 22px', borderRadius: 16,
                    cursor: 'pointer', textDecoration: 'none', textAlign: 'center' 
                  }}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  onClick={closeMobileMenu}
                  style={{
                    background: '#fff', color: '#111', padding: '12px 22px', borderRadius: 16,
                    fontSize: 14, fontWeight: 700, textDecoration: 'none', textAlign: 'center'
                  }}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
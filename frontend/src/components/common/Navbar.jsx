import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import AuthService from '../../services/auth.service';
import { useTheme } from '../../context/ThemeContext';
import { useAuthModal } from '../../context/AuthModalContext';
import { Sun, Moon, Menu, X } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const currentUser = AuthService.getCurrentUser();
  const { isDarkMode, toggleTheme } = useTheme();
  const { openLogin, openRegister } = useAuthModal();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-full hover:bg-white/5 transition-all cursor-pointer border border-white/10 text-white select-none focus:outline-none"
              >
                {currentUser.avatar ? (
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name} 
                    className="w-6 h-6 rounded-full object-cover border border-white/20"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-xs">
                    {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                )}
                <span className="text-sm font-semibold max-w-[120px] truncate">{currentUser.name}</span>
                <span className="text-[10px] text-white/50" style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'none', display: 'inline-block', transition: 'transform 0.2s' }}>▼</span>
              </button>

              {isDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40 bg-transparent cursor-default" 
                    onClick={() => setIsDropdownOpen(false)}
                  ></div>

                  <div className="absolute right-0 mt-2.5 w-48 bg-[#0f172a] border border-white/10 rounded-2xl shadow-2xl py-2.5 z-50">
                    <div className="px-4 py-2 border-b border-white/5">
                      <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider m-0">Signed in as</p>
                      <p className="text-sm font-bold text-white m-0 truncate mt-0.5">{currentUser.name}</p>
                    </div>

                    <Link 
                      to="/dashboard" 
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 no-underline transition-colors mt-1"
                    >
                      Dashboard
                    </Link>

                    <div className="h-px bg-white/5 my-1.5"></div>

                    <button 
                      onClick={() => {
                        setIsDropdownOpen(false);
                        handleLogout();
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-orange-500 hover:text-orange-400 hover:bg-white/5 border-none bg-transparent cursor-pointer transition-colors font-semibold"
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <button 
                onClick={openLogin}
                style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.6)', background: 'none', border: 'none', cursor: 'pointer', outline: 'none' }}
              >
                Login
              </button>
              <button 
                onClick={openRegister}
                style={{
                  background: '#fff', color: '#111', padding: '9px 22px', borderRadius: 999,
                  fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer', letterSpacing: '-0.2px', outline: 'none'
                }}
              >
                Register
              </button>
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
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 px-2">
                  {currentUser.avatar ? (
                    <img 
                      src={currentUser.avatar} 
                      alt={currentUser.name} 
                      className="w-10 h-10 rounded-full object-cover border border-white/20"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-lg">
                      {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-white font-semibold">{currentUser.name}</span>
                    <span className="text-white/40 text-xs truncate max-w-[180px]">{currentUser.email}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 px-2">
                  <Link 
                    to="/dashboard" 
                    onClick={closeMobileMenu}
                    className="text-white/80 hover:text-white text-sm font-semibold no-underline"
                  >
                    Dashboard
                  </Link>
                </div>

                <button 
                  onClick={handleLogout} 
                  style={{
                    background: '#f97316', color: '#fff', padding: '12px 22px', borderRadius: 16,
                    fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer', textAlign: 'center', width: '100%',
                    marginTop: 4
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button 
                  onClick={() => { closeMobileMenu(); openLogin(); }}
                  style={{ 
                    fontSize: 14, fontWeight: 600, color: '#fff', background: 'rgba(255,255,255,0.05)', 
                    border: '1px solid rgba(255,255,255,0.1)', padding: '12px 22px', borderRadius: 16,
                    cursor: 'pointer', textAlign: 'center', outline: 'none' 
                  }}
                >
                  Login
                </button>
                <button 
                  onClick={() => { closeMobileMenu(); openRegister(); }}
                  style={{
                    background: '#fff', color: '#111', padding: '12px 22px', borderRadius: 16,
                    fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer', textAlign: 'center', outline: 'none'
                  }}
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
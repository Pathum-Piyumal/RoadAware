import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, Search, Moon, Sun, User, LogOut, Settings } from 'lucide-react';
import logoImg from '../../assets/logo.png';
import '../../css/Navbar.css';

const Navbar = ({ toggleSidebar, isDarkMode, toggleTheme }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Add real sign out logic here in the future
    navigate('/admin/login');
  };

  return (
    <nav className="admin-navbar">
      {/* Left side */}
      <div className="admin-navbar-left">
        <button
          onClick={toggleSidebar}
          className="admin-navbar-mobile-btn"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <Link to="/admin" className="admin-navbar-logo">
          <img src={logoImg} alt="Admin logo" className="admin-navbar-logo-icon" />
          <span className="admin-navbar-logo-text">
            RoadAware <span>Admin</span>
          </span>
        </Link>

        <div className="admin-navbar-search-container">
          <div className="admin-navbar-search-icon">
            <Search size={16} />
          </div>
          <input
            type="text"
            className="admin-navbar-search-input"
            placeholder="Search reports, users..."
          />
        </div>
      </div>

      {/* Right side */}
      <div className="admin-navbar-right">
        <button className="admin-navbar-icon-btn" onClick={toggleTheme} title="Toggle Theme">
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>


        {/* Profile Dropdown */}
        <Menu as="div" style={{ position: 'relative', display: 'inline-block', textAlign: 'left' }}>
          <div>
            <Menu.Button className="admin-navbar-profile-btn">
              <img
                className="admin-navbar-profile-img"
                src="https://ui-avatars.com/api/?name=Admin+User&background=3B82F6&color=fff"
                alt="Admin profile"
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="admin-navbar-dropdown">
              <div style={{ padding: '0.25rem 0' }}>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/admin/profile"
                      className={`admin-navbar-dropdown-item ${active ? 'active' : ''}`}
                    >
                      <User className="admin-navbar-dropdown-item-icon" />
                      Your Profile
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/admin/settings"
                      className={`admin-navbar-dropdown-item ${active ? 'active' : ''}`}
                    >
                      <Settings className="admin-navbar-dropdown-item-icon" />
                      Settings
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleSignOut}
                      className={`admin-navbar-dropdown-item danger ${active ? 'active' : ''}`}
                    >
                      <LogOut className="admin-navbar-dropdown-item-icon" />
                      Sign out
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </nav>
  );
};

export default Navbar;


import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Moon, Sun, User, LogOut, Settings } from 'lucide-react';
import logoImg from '../../assets/logo.png';

const Navbar = ({ toggleSidebar, isDarkMode, toggleTheme }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Add real sign out logic here in the future
    navigate('/admin/login');
  };

  return (
    <nav className="bg-admin-card border-b border-admin-border h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-10">
      {/* Left side */}
      <div className="flex items-center flex-1">
        <button
          onClick={toggleSidebar}
          className="text-admin-text-muted hover:text-admin-text bg-transparent border-none mr-4 cursor-pointer flex lg:hidden"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <Link to="/admin" className="flex items-center no-underline mr-8">
          <img src={logoImg} alt="Admin logo" className="mr-2 h-6 w-auto object-contain" />
          <span className="text-xl font-bold text-admin-text tracking-wider hidden sm:inline">
            RoadAware <span className="text-blue-500">Admin</span>
          </span>
        </Link>

        <div className="max-w-md w-full relative hidden sm:block ml-[18rem]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-admin-text-muted">
            <Search size={16} />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-admin-border rounded-full leading-5 bg-admin-input-bg text-admin-text text-sm box-border placeholder:text-admin-text-muted focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search reports, users..."
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <button 
          className="text-admin-text-muted hover:text-admin-text hover:bg-admin-bg bg-transparent border-none p-2 rounded-lg cursor-pointer transition-colors relative flex" 
          onClick={toggleTheme} 
          title="Toggle Theme"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Profile Dropdown */}
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="flex items-center rounded-full border-none bg-transparent cursor-pointer p-0 focus:outline-none focus:ring-2 focus:ring-admin-bg focus:ring-offset-2 focus:ring-offset-blue-500">
              <img
                className="h-8 w-8 rounded-full border border-admin-border"
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
            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-admin-card border border-admin-border focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/admin/profile"
                      className={`flex items-center px-4 py-2 text-sm text-admin-text no-underline w-full text-left ${active ? 'bg-admin-bg' : ''}`}
                    >
                      <User className={`mr-3 h-4 w-4 ${active ? 'text-admin-text' : 'text-admin-text-muted'}`} />
                      Your Profile
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/admin/settings"
                      className={`flex items-center px-4 py-2 text-sm text-admin-text no-underline w-full text-left ${active ? 'bg-admin-bg' : ''}`}
                    >
                      <Settings className={`mr-3 h-4 w-4 ${active ? 'text-admin-text' : 'text-admin-text-muted'}`} />
                      Settings
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleSignOut}
                      className={`flex items-center px-4 py-2 text-sm text-red-500 no-underline w-full text-left cursor-pointer border-none bg-transparent ${active ? 'bg-admin-bg' : ''}`}
                    >
                      <LogOut className="mr-3 h-4 w-4 text-red-500" />
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


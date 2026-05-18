import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';
import Navbar from '../components/admin/Navbar';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className={`flex flex-col h-screen max-h-screen w-full flex-auto bg-gradient-to-br from-admin-bg via-admin-bg to-blue-50/50 dark:to-blue-900/10 text-admin-text overflow-hidden transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
      {/* Navbar (Full Width) */}
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-row min-w-0 min-h-0 overflow-hidden">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-admin-bg p-4 sm:p-6 lg:p-8 admin-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;


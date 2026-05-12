import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';
import Navbar from '../components/admin/Navbar';
import '../css/AdminLayout.css';

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
    <div className={`admin-layout-container ${isDarkMode ? 'dark' : ''}`}>
      {/* Navbar (Full Width) */}
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      {/* Main Content Area */}
      <div className="admin-layout-main-wrapper">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Scrollable Content Area */}
        <main className="admin-layout-content admin-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;


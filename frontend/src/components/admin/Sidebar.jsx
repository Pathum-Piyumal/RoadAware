import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  BarChart3, 
  AlertTriangle, 
  Map, 
  Settings,
  Bell
} from 'lucide-react';
import '../../css/Sidebar.css';

const Sidebar = ({ isOpen, setSidebarOpen }) => {
  const navigation = [
    { name: 'Dashboard', to: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'Reports', to: '/admin/reports', icon: FileText },
    { name: 'Users', to: '/admin/users', icon: Users },
    { name: 'Analytics', to: '/admin/analytics', icon: BarChart3 },
    { name: 'Hazard Categories', to: '/admin/categories', icon: AlertTriangle },
    { name: 'Map Monitoring', to: '/admin/map', icon: Map },
    { name: 'Settings', to: '/admin/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && (
        <div 
          className="admin-sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`admin-sidebar-container ${isOpen ? 'open' : ''}`}>
        
        <div className="admin-sidebar-scroll-area">
          <ul className="admin-sidebar-nav">
            <li className="admin-sidebar-nav-title">
              Menu
            </li>
            
            {navigation.map((item) => (
              <li key={item.name} className="admin-sidebar-nav-item">
                <NavLink
                  to={item.to}
                  end={item.exact}
                  className={({ isActive }) =>
                    `admin-sidebar-link ${isActive ? 'active' : ''}`
                  }
                  onClick={() => setSidebarOpen(false)} // close sidebar on mobile after click
                >
                  <span className="admin-sidebar-link-icon-wrapper">
                    <item.icon size={20} />
                  </span>
                  <span className="admin-sidebar-link-text">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;


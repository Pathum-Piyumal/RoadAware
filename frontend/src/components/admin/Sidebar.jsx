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
          className="fixed inset-0 top-16 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-16 bottom-0 left-0 z-30 w-64 glass-panel border-r-0 border-r border-admin-border transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        <div className="h-full flex flex-col">
          <ul className="flex-1 py-6 flex flex-col gap-2 overflow-y-auto m-0 p-0 list-none admin-scrollbar">
            <li className="px-6 pb-2 text-xs font-semibold uppercase tracking-wider text-admin-text-muted opacity-70">
              Menu
            </li>
            
            {navigation.map((item) => (
              <li key={item.name} className="m-0 p-0">
                <NavLink
                  to={item.to}
                  end={item.exact}
                  className={({ isActive }) =>
                    `flex items-center px-6 py-3.5 no-underline transition-all duration-300 ease-out text-base group relative overflow-hidden ${
                      isActive 
                        ? 'text-blue-500 font-medium' 
                        : 'text-admin-text-muted font-normal hover:text-admin-text'
                    }`
                  }
                  onClick={() => setSidebarOpen(false)} // close sidebar on mobile after click
                >
                  {({ isActive }) => (
                    <>
                      {/* Active state background with gradient and glass effect */}
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent border-l-[3px] border-blue-500 -z-10" />
                      )}
                      
                      {/* Hover effect background */}
                      {!isActive && (
                        <div className="absolute inset-0 bg-admin-text/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                      )}

                      <span className={`mr-4 flex items-center transition-all duration-300 ${isActive ? 'opacity-100 text-blue-500 scale-110 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 'opacity-70 group-hover:opacity-100 group-hover:text-admin-text group-hover:scale-110'}`}>
                        <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                      </span>
                      <span className="flex-1">{item.name}</span>
                    </>
                  )}
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


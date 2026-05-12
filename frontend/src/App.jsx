import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Reports from './pages/admin/Reports';
import Users from './pages/admin/Users';
import Analytics from './pages/admin/Analytics';
import Categories from './pages/admin/Categories';
import MapMonitoring from './pages/admin/MapMonitoring';
import Settings from './pages/admin/Settings';
import Profile from './pages/admin/Profile';
import AdminLogin from './pages/auth/AdminLogin';

function App() {
  return (
    <Router>
      <div className="h-full flex flex-col font-sans">
        <Routes>
          <Route path="/" element={<div className="p-8 text-center text-2xl">Public Map & Landing</div>} />
          <Route path="/login" element={<div className="p-8 text-center text-2xl">Login Page</div>} />
          <Route path="/dashboard" element={<div className="p-8 text-center text-2xl">Citizen Dashboard</div>} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="reports" element={<Reports />} />
            <Route path="users" element={<Users />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="categories" element={<Categories />} />
            <Route path="map" element={<MapMonitoring />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;

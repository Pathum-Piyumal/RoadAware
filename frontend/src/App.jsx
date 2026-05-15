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
// Public Pages
import Home from './pages/public/Home';
import HazardDetails from './pages/public/HazardDetails';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import VerifyCode from './pages/auth/VerifyCode';
import ResetPassword from './pages/auth/ResetPassword';

// Citizen Pages
import ReportHazard from './pages/citizen/ReportHazard';
import Dashboard from './pages/citizen/Dashboard';
import Profile from './pages/citizen/Profile';

// Common Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

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
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/hazard/:id" element={<HazardDetails />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-code" element={<VerifyCode />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            
            {/* Citizen Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/report-hazard" element={<ReportHazard />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<div className="p-8 text-center text-2xl">Admin Dashboard</div>} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;
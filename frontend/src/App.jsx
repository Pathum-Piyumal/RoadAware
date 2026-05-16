import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Admin Pages
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import Reports from './pages/admin/Reports';
import Users from './pages/admin/Users';
import Analytics from './pages/admin/Analytics';
import Categories from './pages/admin/Categories';
import MapMonitoring from './pages/admin/MapMonitoring';
import Settings from './pages/admin/Settings';
import AdminProfile from './pages/admin/Profile';
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
import CitizenDashboard from './pages/citizen/Dashboard';
import CitizenProfile from './pages/citizen/Profile';

// Common Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

function AppContent() {
  const location = useLocation();

  // Hide navbar and footer on admin and auth pages
  const isAdminPage = location.pathname.startsWith('/admin');
  const isAuthPage = ['/login', '/register', '/forgot-password', '/verify-code', '/reset-password'].includes(location.pathname);
  const hideNavAndFooter = isAdminPage || isAuthPage;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col">

      {/* Show Navbar conditionally */}
      {!hideNavAndFooter && <Navbar />}

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
          <Route path="/dashboard" element={<CitizenDashboard />} />
          <Route path="/profile" element={<CitizenProfile />} />
          <Route path="/report-hazard" element={<ReportHazard />} />

          {/* Admin Login */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="reports" element={<Reports />} />
            <Route path="users" element={<Users />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="categories" element={<Categories />} />
            <Route path="map" element={<MapMonitoring />} />
            <Route path="settings" element={<Settings />} />
          </Route>

        </Routes>
      </main>

      {/* Show Footer conditionally */}
      {!hideNavAndFooter && <Footer />}

      <Toaster position="top-right" />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
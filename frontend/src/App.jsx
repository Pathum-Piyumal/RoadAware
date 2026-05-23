import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AuthService from './services/auth.service';
import { ThemeProvider } from './context/ThemeContext';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}


const ProtectedRoute = ({ children }) => {
  const currentUser = AuthService.getCurrentUser();
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AdminRoute = ({ children }) => {
  const currentAdmin = AuthService.getCurrentAdmin();
  if (!currentAdmin) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

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
import HazardMap from './pages/public/HazardMap';
import AboutUs from './pages/public/AboutUs';
import Features from './pages/public/Features';
import FeatureDetail from './pages/public/FeatureDetail';
import Careers from './pages/public/Careers';
import HelpCenter from './pages/public/HelpCenter';
import SafetyTips from './pages/public/SafetyTips';
import Contact from './pages/public/Contact';
import PrivacyPolicy from './pages/public/PrivacyPolicy';
import TermsOfService from './pages/public/TermsOfService';
import Status from './pages/public/Status';

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
import MyReports from './pages/citizen/MyReports';

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
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-slate-950 dark:text-slate-100 font-sans flex flex-col transition-colors duration-300">

      {/* Show Navbar conditionally */}
      {!hideNavAndFooter && <Navbar />}

      <main className="flex-grow">
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/features" element={<Features />} />
          <Route path="/features/:featureKey" element={<FeatureDetail />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/safety-tips" element={<SafetyTips />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/status" element={<Status />} />
          <Route path="/hazard/:id" element={<HazardDetails />} />
          <Route path="/map" element={<ProtectedRoute><HazardMap /></ProtectedRoute>} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-code" element={<VerifyCode />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Citizen Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><CitizenDashboard /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><CitizenProfile /></ProtectedRoute>} />
          <Route path="/report-hazard" element={<ProtectedRoute><ReportHazard /></ProtectedRoute>} />
          <Route path="/my-reports" element={<ProtectedRoute><MyReports /></ProtectedRoute>} />

          {/* Admin Login */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
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
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
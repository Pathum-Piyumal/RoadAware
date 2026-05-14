import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Pages
import Home from './pages/public/Home';
import ReportHazard from './pages/citizen/ReportHazard';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import Profile from './pages/citizen/Profile';
import Dashboard from './pages/citizen/Dashboard';
import HazardDetails from './pages/public/HazardDetails';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/profile" element={<Profile />} />
          
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/hazard/:id" element={<HazardDetails />} />
          <Route path="/admin" element={<div className="p-8 text-center text-2xl">Admin Dashboard</div>} />
          <Route path="/report-hazard" element={<ReportHazard />} />
        </Routes>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ReportHazard from './pages/citizen/ReportHazard';
import MyReports from './pages/citizen/MyReports';
import Home from './pages/public/Home';
import HazardMap from './pages/public/HazardMap';
import MyReports from './pages/citizen/MyReports';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<div className="p-8 text-center text-2xl">Login Page</div>} />
            <Route path="/dashboard" element={<div className="p-8 text-center text-2xl">Citizen Dashboard</div>} />
            <Route path="/admin" element={<div className="p-8 text-center text-2xl">Admin Dashboard</div>} />
            <Route path="/report-hazard" element={<ReportHazard />} />
            <Route path="/map" element={<HazardMap />} />
            <Route path="/my-reports" element={<MyReports />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;

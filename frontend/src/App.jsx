import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
        <Routes>
          <Route path="/" element={<div className="p-8 text-center text-2xl">Public Map & Landing</div>} />
          <Route path="/login" element={<div className="p-8 text-center text-2xl">Login Page</div>} />
          <Route path="/dashboard" element={<div className="p-8 text-center text-2xl">Citizen Dashboard</div>} />
          <Route path="/admin" element={<div className="p-8 text-center text-2xl">Admin Dashboard</div>} />
        </Routes>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;

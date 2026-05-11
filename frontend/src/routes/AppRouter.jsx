import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar/Navbar';
import Footer from '../components/common/Footer/Footer';
import HomePage from '../pages/public/HomePage';
import ReportPage from '../pages/citizen/ReportPage';
import MyReportsPage from '../pages/citizen/MyReportsPage';
import AdminDashboard from '../pages/admin/AdminDashboard';
import LoginPage from '../pages/auth/LoginPage';

function Root() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Navbar />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true,          element: <HomePage /> },
      { path: 'report',       element: <ReportPage /> },
      { path: 'my-reports',   element: <MyReportsPage /> },
      { path: 'admin',        element: <AdminDashboard /> },
      { path: 'login',        element: <LoginPage /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
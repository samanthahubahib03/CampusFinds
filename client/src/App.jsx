import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Landing from './pages/Landing.jsx';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import ItemDetails from './pages/ItemDetails.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import { useAuth } from './context/AuthContext.jsx';

export default function App() {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const showNav = user && pathname !== '/' && pathname !== '/login';
  return (
    <>
      {showNav && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/feed" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/items/:id" element={<ProtectedRoute><ItemDetails /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute role="Admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

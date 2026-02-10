import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { MainLayout } from './components/layout';
import { DashboardPage } from './pages/DashboardPage';
import { LoginPage } from './pages/LoginPage';
import { ManagerPage } from './pages/ManagerPage';
import { AdminPage } from './pages/AdminPage';
import { useAuthStore } from './stores';

function AppRoutes() {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route
          path="/manager"
          element={
            isAuthenticated && (user?.role === 'manager' || user?.role === 'admin')
              ? <ManagerPage />
              : <Navigate to="/dashboard" replace />
          }
        />
        <Route
          path="/admin"
          element={
            isAuthenticated && user?.role === 'admin'
              ? <AdminPage />
              : <Navigate to="/dashboard" replace />
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default function App() {
  const { login } = useAuthStore();

  // Auto-login from localStorage
  useEffect(() => {
    const savedUserId = localStorage.getItem('icheck_user_id');
    if (savedUserId) {
      login(savedUserId);
    }
  }, [login]);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

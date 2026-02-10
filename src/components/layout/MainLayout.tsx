import { Outlet, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { ScrollToTop } from '../common';
import { ChatBot } from '../chatbot';
import { useAuthStore } from '../../stores';

const SIDEBAR_COLLAPSED_KEY = 'icheck_sidebar_collapsed';

export function MainLayout() {
  const { isAuthenticated } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(() => {
    const saved = localStorage.getItem(SIDEBAR_COLLAPSED_KEY);
    return saved === 'true';
  });

  // Persist collapsed state
  useEffect(() => {
    localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(collapsed));
  }, [collapsed]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const toggleCollapsed = () => setCollapsed((prev) => !prev);

  return (
    <div className="min-h-screen bg-bg">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - hidden on mobile, shown on lg+ */}
      <div className={`
        fixed inset-y-0 left-0 z-40 transform transition-all duration-300 ease-in-out
        lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar collapsed={collapsed} onToggle={toggleCollapsed} />
      </div>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-20 bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-lg font-bold text-gray-800">iCheck</h1>
      </div>

      {/* Main content - margin adjusts based on sidebar collapsed state */}
      <main
        className={`p-4 lg:p-6 min-h-screen pt-16 lg:pt-6 transition-all duration-300 ease-in-out ${
          collapsed ? 'lg:ml-[72px]' : 'lg:ml-64'
        }`}
      >
        <Outlet />
      </main>

      <ScrollToTop />
      <ChatBot />
    </div>
  );
}

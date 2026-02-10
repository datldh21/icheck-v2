import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BarChart3,
  Settings,
  LogOut,
  Clock,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { useAuthStore } from '../../stores';
import type { UserRole } from '../../types';

interface NavItem {
  to: string;
  icon: React.ReactNode;
  label: string;
  roles: UserRole[];
}

const navItems: NavItem[] = [
  {
    to: '/dashboard',
    icon: <LayoutDashboard size={20} />,
    label: 'Dashboard',
    roles: ['employee', 'manager', 'admin'],
  },
  {
    to: '/manager',
    icon: <BarChart3 size={20} />,
    label: 'Quản lý',
    roles: ['manager', 'admin'],
  },
  {
    to: '/admin',
    icon: <Settings size={20} />,
    label: 'Cài đặt',
    roles: ['admin'],
  },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const { user, logout } = useAuthStore();

  if (!user) return null;

  const filteredItems = navItems.filter((item) => item.roles.includes(user.role));

  return (
    <aside
      className={`bg-sidebar text-white flex flex-col h-screen transition-all duration-300 ease-in-out ${
        collapsed ? 'w-[72px]' : 'w-64'
      }`}
    >
      {/* Logo */}
      <div className={`flex items-center border-b border-white/10 transition-all duration-300 ${
        collapsed ? 'px-0 py-5 justify-center' : 'px-6 py-5 gap-3'
      }`}>
        <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shrink-0">
          <Clock size={20} className="text-white" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="text-lg font-bold whitespace-nowrap">iCheck</h1>
            <p className="text-xs text-gray-400 whitespace-nowrap">Smart HR Portal</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className={`flex-1 py-4 space-y-1 transition-all duration-300 ${
        collapsed ? 'px-2' : 'px-3'
      }`}>
        {filteredItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            title={collapsed ? item.label : undefined}
            className={({ isActive }) =>
              `flex items-center rounded-lg text-sm font-medium transition-all duration-200 group relative ${
                collapsed ? 'justify-center px-0 py-3' : 'gap-3 px-4 py-3'
              } ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-gray-300 hover:bg-sidebar-hover hover:text-white'
              }`
            }
          >
            <span className="shrink-0">{item.icon}</span>
            {!collapsed && (
              <span className="whitespace-nowrap overflow-hidden">{item.label}</span>
            )}
            {/* Tooltip on collapsed */}
            {collapsed && (
              <span className="absolute left-full ml-3 px-3 py-1.5 bg-gray-800 text-white text-xs font-medium rounded-lg
                opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200
                whitespace-nowrap z-50 shadow-lg pointer-events-none">
                {item.label}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Toggle button */}
      <div className={`px-2 pb-2 ${collapsed ? 'flex justify-center' : 'flex justify-end px-4'}`}>
        <button
          onClick={onToggle}
          className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-sidebar-hover transition-colors"
          title={collapsed ? 'Mở rộng' : 'Thu gọn'}
        >
          {collapsed ? <ChevronsRight size={18} /> : <ChevronsLeft size={18} />}
        </button>
      </div>

      {/* User info at bottom */}
      <div className={`py-4 border-t border-white/10 transition-all duration-300 ${
        collapsed ? 'px-2' : 'px-4'
      }`}>
        {collapsed ? (
          /* Collapsed: just avatar */
          <div className="flex flex-col items-center gap-3">
            <div
              className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-xs font-bold cursor-default group relative"
              title={user.name}
            >
              {user.name.charAt(0)}
              {/* Tooltip */}
              <span className="absolute left-full ml-3 px-3 py-1.5 bg-gray-800 text-white text-xs font-medium rounded-lg
                opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200
                whitespace-nowrap z-50 shadow-lg pointer-events-none">
                {user.name}
              </span>
            </div>
            <button
              onClick={logout}
              className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-sidebar-hover transition-colors group relative"
              title="Đăng xuất"
            >
              <LogOut size={18} />
              <span className="absolute left-full ml-3 px-3 py-1.5 bg-gray-800 text-white text-xs font-medium rounded-lg
                opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200
                whitespace-nowrap z-50 shadow-lg pointer-events-none">
                Đăng xuất
              </span>
            </button>
          </div>
        ) : (
          /* Expanded: full user info */
          <>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold shrink-0">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-gray-400 truncate">{user.email}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors w-full px-2 py-1.5 rounded hover:bg-sidebar-hover"
            >
              <LogOut size={16} />
              Đăng xuất
            </button>
          </>
        )}
      </div>
    </aside>
  );
}

import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Clock, Users, Shield, Settings } from 'lucide-react';
import { useAuthStore } from '../stores';
import { mockUsers } from '../mocks';

const demoUsers = [
  { id: 'u1', label: 'Employee', description: 'Lê Đăng Hoàng Đạt', icon: <Users size={24} />, color: 'bg-blue-500' },
  { id: 'u10', label: 'Manager', description: 'Nguyễn Xuân Thành', icon: <Shield size={24} />, color: 'bg-green-500' },
  { id: 'u11', label: 'Admin', description: 'Lê Đức Long', icon: <Settings size={24} />, color: 'bg-purple-500' },
];

export function LoginPage() {
  const { isAuthenticated, login, isLoading } = useAuthStore();
  const [selectedUser, setSelectedUser] = useState('');

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleLogin = async (userId: string) => {
    setSelectedUser(userId);
    await login(userId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4 shadow-lg">
            <Clock size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">iCheck</h1>
          <p className="text-gray-500 mt-1">Smart HR Portal</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-lg font-bold text-gray-800 mb-2">Chọn tài khoản demo</h2>
          <p className="text-sm text-gray-400 mb-6">Chọn role để trải nghiệm các chức năng khác nhau</p>

          <div className="space-y-3">
            {demoUsers.map((du) => {
              const user = mockUsers.find((u) => u.id === du.id);
              return (
                <button
                  key={du.id}
                  onClick={() => handleLogin(du.id)}
                  disabled={isLoading}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                    selectedUser === du.id && isLoading
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-100 hover:border-primary/30 hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-12 h-12 ${du.color} rounded-xl flex items-center justify-center text-white shrink-0`}>
                    {du.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-800">{du.label}</p>
                    <p className="text-sm text-gray-500">{user?.name}</p>
                    <p className="text-xs text-gray-400">{user?.email}</p>
                  </div>
                  <div className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded">
                    {du.label}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick email login */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-400 text-center">
              Hoặc đăng nhập bằng email
            </p>
            <div className="mt-3 flex gap-2">
              <select
                onChange={(e) => {
                  if (e.target.value) handleLogin(e.target.value);
                }}
                className="flex-1 px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
                defaultValue=""
              >
                <option value="" disabled>Chọn nhân viên...</option>
                {mockUsers.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.role})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          iCheck v2.0 &copy; 2026 iKame Global
        </p>
      </div>
    </div>
  );
}

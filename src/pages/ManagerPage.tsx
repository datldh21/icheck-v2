import { useEffect } from 'react';
import {
  Users,
  UserCheck,
  Home,
  Clock,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell,
} from 'recharts';
import { useRequestStore, useAttendanceStore, useAuthStore } from '../stores';
import { Avatar, Badge } from '../components/common';
import { REQUEST_TYPE_LABELS } from '../types';
import { formatDate } from '../utils';

// Mock analytics data
const punctualityData = [
  { month: 'T9', rate: 88 }, { month: 'T10', rate: 91 },
  { month: 'T11', rate: 85 }, { month: 'T12', rate: 90 },
  { month: 'T1', rate: 93 }, { month: 'T2', rate: 87 },
];

const leaveHeatmap = [
  { day: 'Thứ 2', count: 12 }, { day: 'Thứ 3', count: 8 },
  { day: 'Thứ 4', count: 5 }, { day: 'Thứ 5', count: 9 },
  { day: 'Thứ 6', count: 15 },
];

const heatmapColors = ['#22c55e', '#86efac', '#fde047', '#fb923c', '#ef4444'];

const abnormalPatterns = [
  { name: 'Nguyễn Bảo Đức', email: 'ducnb@ikameglobal.com', count: 4, type: 'Quên chấm công' },
  { name: 'Đào Hoàng Hiệp', email: 'hiepdh@ikameglobal.com', count: 3, type: 'Đi muộn' },
];

export function ManagerPage() {
  const { user } = useAuthStore();
  const { pendingRequests, fetchPendingRequests, approveRequest, rejectRequest } = useRequestStore();
  const { todayRecords, fetchTodayAttendance } = useAttendanceStore();

  useEffect(() => {
    fetchPendingRequests();
    fetchTodayAttendance();
  }, [fetchPendingRequests, fetchTodayAttendance]);

  const presentCount = todayRecords.length;
  const leaveCount = 2; // mock
  const wfhCount = 1; // mock

  const handleApprove = async (requestId: string) => {
    if (!user) return;
    await approveRequest(requestId, user.id, user.name);
  };

  const handleReject = async (requestId: string) => {
    if (!user) return;
    await rejectRequest(requestId, user.id, user.name);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Manager Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard icon={<Users />} label="Tổng nhân viên" value="11" color="bg-blue-500" />
        <SummaryCard icon={<UserCheck />} label="Có mặt hôm nay" value={String(presentCount)} color="bg-green-500" />
        <SummaryCard icon={<Clock />} label="Nghỉ phép" value={String(leaveCount)} color="bg-orange-500" />
        <SummaryCard icon={<Home />} label="Work from home" value={String(wfhCount)} color="bg-purple-500" />
      </div>

      {/* Pending Approvals */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-5 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-800">
            Đề xuất chờ duyệt ({pendingRequests.length})
          </h3>
        </div>
        <div className="divide-y divide-gray-50">
          {pendingRequests.length === 0 ? (
            <div className="p-8 text-center text-gray-400 text-sm">
              Không có đề xuất nào chờ duyệt
            </div>
          ) : (
            pendingRequests.map((req) => (
              <div key={req.id} className="flex items-center justify-between px-5 py-4 hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Avatar name={req.userName} size="md" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{req.userName}</p>
                    <p className="text-xs text-gray-500">
                      {REQUEST_TYPE_LABELS[req.type]} &middot; {formatDate(req.startDate)}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">Lý do: {req.reason}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleApprove(req.id)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-600 rounded-lg text-xs font-semibold hover:bg-green-100 transition-colors"
                  >
                    <CheckCircle2 size={14} />
                    Duyệt
                  </button>
                  <button
                    onClick={() => handleReject(req.id)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-semibold hover:bg-red-100 transition-colors"
                  >
                    <XCircle size={14} />
                    Từ chối
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Punctuality Trend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Xu hướng đúng giờ (%)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={punctualityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis domain={[70, 100]} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="rate" stroke="#f97316" strokeWidth={2.5} dot={{ fill: '#f97316', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Leave Heatmap */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Ngày nghỉ phổ biến</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={leaveHeatmap}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {leaveHeatmap.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={heatmapColors[index % heatmapColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Abnormal Patterns */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-5 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-800">Cảnh báo bất thường</h3>
          <p className="text-xs text-gray-400 mt-1">Nhân viên có &gt;3 lần quên chấm công hoặc đi muộn trong tháng</p>
        </div>
        <div className="divide-y divide-gray-50">
          {abnormalPatterns.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3">
                <Avatar name={item.name} size="md" />
                <div>
                  <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                  <p className="text-xs text-gray-400">{item.email}</p>
                </div>
              </div>
              <div className="text-right">
                <Badge variant="default">{item.type}</Badge>
                <p className="text-xs text-red-500 font-semibold mt-1">{item.count} lần trong tháng</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Summary Card Component
function SummaryCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
      <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center text-white shrink-0`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <p className="text-xs text-gray-400 font-medium">{label}</p>
      </div>
    </div>
  );
}

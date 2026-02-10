import { useEffect, useState } from 'react';
import {
  Users,
  UserCheck,
  Home,
  Clock,
  CheckCircle2,
  XCircle,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Lightbulb,
  Loader2,
  Brain,
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell,
} from 'recharts';
import { useRequestStore, useAttendanceStore, useAuthStore } from '../stores';
import { Avatar, Badge, Modal } from '../components/common';
import { REQUEST_TYPE_LABELS } from '../types';
import { formatDate, formatMonthYear } from '../utils';
import { aiAnalysisService, type MonthlyAnalysis, type AnalysisInsight } from '../services/aiAnalysisService';
import { WarningTable } from '../components/attendance';

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

  // Reject modal state
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectingRequestId, setRejectingRequestId] = useState<string | null>(null);
  const [rejectingRequestName, setRejectingRequestName] = useState('');
  const [rejectReason, setRejectReason] = useState('');
  const [isRejecting, setIsRejecting] = useState(false);

  useEffect(() => {
    fetchPendingRequests();
    fetchTodayAttendance();
  }, [fetchPendingRequests, fetchTodayAttendance]);

  const presentCount = todayRecords.length;
  const leaveCount = 2;
  const wfhCount = 1;

  const handleApprove = async (requestId: string) => {
    if (!user) return;
    await approveRequest(requestId, user.id, user.name);
  };

  const openRejectModal = (requestId: string, requestUserName: string) => {
    setRejectingRequestId(requestId);
    setRejectingRequestName(requestUserName);
    setRejectReason('');
    setRejectModalOpen(true);
  };

  const handleRejectConfirm = async () => {
    if (!user || !rejectingRequestId || !rejectReason.trim()) return;
    setIsRejecting(true);
    try {
      await rejectRequest(rejectingRequestId, user.id, user.name, rejectReason.trim());
      setRejectModalOpen(false);
      setRejectingRequestId(null);
      setRejectReason('');
    } finally {
      setIsRejecting(false);
    }
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

      {/* Pending Approvals + Warning Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                <div key={req.id} className="px-4 sm:px-5 py-4 hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <Avatar name={req.userName} size="md" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800">{req.userName}</p>
                      <p className="text-xs text-gray-500">
                        {REQUEST_TYPE_LABELS[req.type]} &middot; {formatDate(req.startDate)}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">Lý do: {req.reason}</p>
                      {/* Action buttons */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => handleApprove(req.id)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-600 rounded-lg text-xs font-semibold hover:bg-green-100 transition-colors"
                        >
                          <CheckCircle2 size={14} />
                          Duyệt
                        </button>
                        <button
                          onClick={() => openRejectModal(req.id, req.userName)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-semibold hover:bg-red-100 transition-colors"
                        >
                          <XCircle size={14} />
                          Từ chối
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Warning Table */}
        <WarningTable />
      </div>

      {/* ===== AI Monthly Analysis ===== */}
      <AIAnalysisSection />

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
            <div key={idx} className="px-4 sm:px-5 py-4">
              <div className="flex items-start gap-3">
                <Avatar name={item.name} size="md" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                    <Badge variant="default">{item.type}</Badge>
                  </div>
                  <p className="text-xs text-gray-400 truncate">{item.email}</p>
                  <p className="text-xs text-red-500 font-semibold mt-1">{item.count} lần trong tháng</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== Reject Reason Modal ===== */}
      <Modal isOpen={rejectModalOpen} onClose={() => setRejectModalOpen(false)} title="Từ chối đề xuất">
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-100 rounded-lg p-3">
            <p className="text-sm text-red-700">
              Bạn đang từ chối đề xuất của <strong>{rejectingRequestName}</strong>.
              Lý do từ chối sẽ được gửi thông báo tới nhân viên.
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              <span className="text-red-500">*</span> Lý do từ chối
            </label>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Nhập lý do từ chối đề xuất để thông báo cho nhân viên..."
              rows={4}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-200 focus:border-red-400 outline-none transition-all resize-y"
              autoFocus
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => setRejectModalOpen(false)}
              className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={handleRejectConfirm}
              disabled={isRejecting || !rejectReason.trim()}
              className="px-5 py-2.5 rounded-lg bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isRejecting ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Đang xử lý...
                </>
              ) : (
                <>
                  <XCircle size={14} />
                  Xác nhận từ chối
                </>
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// ===== AI Analysis Section Component =====
function AIAnalysisSection() {
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(2);
  const [analysis, setAnalysis] = useState<MonthlyAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const loadAnalysis = async () => {
    setIsLoading(true);
    setHasLoaded(true);
    try {
      const result = await aiAnalysisService.getMonthlyAnalysis(year, month);
      setAnalysis(result);
    } finally {
      setIsLoading(false);
    }
  };

  const generateNew = async () => {
    setIsGenerating(true);
    try {
      const result = await aiAnalysisService.generateAnalysis(year, month);
      setAnalysis(result);
    } finally {
      setIsGenerating(false);
    }
  };

  const prevMonth = () => {
    if (month === 1) { setMonth(12); setYear(year - 1); }
    else setMonth(month - 1);
    setHasLoaded(false);
    setAnalysis(null);
  };

  const nextMonth = () => {
    if (month === 12) { setMonth(1); setYear(year + 1); }
    else setMonth(month + 1);
    setHasLoaded(false);
    setAnalysis(null);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 75) return 'text-blue-500';
    if (score >= 60) return 'text-yellow-500';
    if (score > 0) return 'text-red-500';
    return 'text-gray-400';
  };

  const getScoreRingColor = (score: number) => {
    if (score >= 90) return '#22c55e';
    if (score >= 75) return '#3b82f6';
    if (score >= 60) return '#f59e0b';
    if (score > 0) return '#ef4444';
    return '#d1d5db';
  };

  const getInsightIcon = (type: AnalysisInsight['type']) => {
    switch (type) {
      case 'positive': return <TrendingUp size={16} className="text-green-500" />;
      case 'warning': return <AlertTriangle size={16} className="text-yellow-500" />;
      case 'critical': return <TrendingDown size={16} className="text-red-500" />;
      case 'suggestion': return <Lightbulb size={16} className="text-blue-500" />;
    }
  };

  const getInsightBorder = (type: AnalysisInsight['type']) => {
    switch (type) {
      case 'positive': return 'border-l-green-400 bg-green-50/50';
      case 'warning': return 'border-l-yellow-400 bg-yellow-50/50';
      case 'critical': return 'border-l-red-400 bg-red-50/50';
      case 'suggestion': return 'border-l-blue-400 bg-blue-50/50';
    }
  };

  const getInsightLabel = (type: AnalysisInsight['type']) => {
    switch (type) {
      case 'positive': return 'Tích cực';
      case 'warning': return 'Cảnh báo';
      case 'critical': return 'Nghiêm trọng';
      case 'suggestion': return 'Gợi ý';
    }
  };

  // SVG circle params for score ring
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const scoreOffset = analysis ? circumference - (analysis.overallScore / 100) * circumference : circumference;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-gray-100 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center text-white">
            <Brain size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">Phân tích AI</h3>
            <p className="text-xs text-gray-400">Phân tích dữ liệu ngày công & nghỉ phép theo tháng</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Month selector */}
          <div className="flex items-center gap-1.5 bg-gray-50 rounded-lg px-2 py-1">
            <button onClick={prevMonth} className="p-1 rounded hover:bg-gray-200 text-gray-500 transition-colors">
              <ChevronLeft size={16} />
            </button>
            <span className="text-sm font-semibold text-gray-700 min-w-[110px] text-center">
              {formatMonthYear(year, month)}
            </span>
            <button onClick={nextMonth} className="p-1 rounded hover:bg-gray-200 text-gray-500 transition-colors">
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Analyze button */}
          {!hasLoaded ? (
            <button
              onClick={loadAnalysis}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-lg text-sm font-semibold hover:from-violet-600 hover:to-purple-700 transition-all disabled:opacity-60 shadow-sm"
            >
              <Sparkles size={16} />
              Phân tích
            </button>
          ) : (
            <button
              onClick={generateNew}
              disabled={isGenerating || isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors disabled:opacity-60"
            >
              <Sparkles size={14} />
              Tạo lại
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      {!hasLoaded && (
        <div className="p-12 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-violet-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Brain size={28} className="text-violet-500" />
          </div>
          <p className="text-gray-500 text-sm font-medium">Chọn tháng và nhấn "Phân tích" để AI phân tích dữ liệu</p>
          <p className="text-gray-400 text-xs mt-1">Dựa trên dữ liệu chấm công, nghỉ phép và đề xuất của nhân viên</p>
        </div>
      )}

      {(isLoading || isGenerating) && (
        <div className="p-12 text-center">
          <Loader2 size={36} className="animate-spin text-violet-500 mx-auto mb-4" />
          <p className="text-gray-500 text-sm font-medium">
            {isGenerating ? 'AI đang phân tích dữ liệu...' : 'Đang tải kết quả phân tích...'}
          </p>
          <p className="text-gray-400 text-xs mt-1">Vui lòng chờ trong giây lát</p>
        </div>
      )}

      {hasLoaded && !isLoading && !isGenerating && !analysis && (
        <div className="p-12 text-center">
          <p className="text-gray-400 text-sm">Chưa có dữ liệu phân tích cho tháng {month}/{year}</p>
          <button
            onClick={generateNew}
            className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-violet-50 text-violet-600 rounded-lg text-sm font-semibold hover:bg-violet-100 transition-colors"
          >
            <Sparkles size={14} />
            Tạo phân tích mới
          </button>
        </div>
      )}

      {hasLoaded && !isLoading && !isGenerating && analysis && (
        <div>
          {/* Score + Summary */}
          <div className="p-4 sm:p-5 border-b border-gray-50 flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start">
            {/* Score Ring */}
            {analysis.overallScore > 0 && (
              <div className="shrink-0 flex flex-col items-center">
                <div className="relative w-24 h-24">
                  <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r={radius} fill="none" stroke="#f3f4f6" strokeWidth="8" />
                    <circle
                      cx="50" cy="50" r={radius} fill="none"
                      stroke={getScoreRingColor(analysis.overallScore)}
                      strokeWidth="8"
                      strokeDasharray={circumference}
                      strokeDashoffset={scoreOffset}
                      strokeLinecap="round"
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-2xl font-bold ${getScoreColor(analysis.overallScore)}`}>
                      {analysis.overallScore}
                    </span>
                  </div>
                </div>
                <p className="text-xs font-semibold text-gray-500 mt-1">{analysis.scoreLabel}</p>
              </div>
            )}

            {/* Summary text */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-gray-800 mb-2">
                Tổng quan tháng {month}/{year}
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {analysis.summary}
              </p>
              <p className="text-xs text-gray-300 mt-3">
                Phân tích lúc {new Date(analysis.generatedAt).toLocaleString('vi-VN')}
              </p>
            </div>
          </div>

          {/* Insights */}
          {analysis.insights.length > 0 && (
            <div className="p-5">
              <h4 className="text-sm font-bold text-gray-800 mb-3">
                Chi tiết phân tích ({analysis.insights.length} mục)
              </h4>
              <div className="space-y-3">
                {analysis.insights.map((insight) => (
                  <div
                    key={insight.id}
                    className={`border-l-4 rounded-lg p-3 sm:p-4 ${getInsightBorder(insight.type)}`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {getInsightIcon(insight.type)}
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                            {getInsightLabel(insight.type)}
                          </span>
                        </div>
                        <h5 className="text-sm font-bold text-gray-800 mb-1">{insight.title}</h5>
                        <p className="text-xs text-gray-600 leading-relaxed">{insight.detail}</p>
                      </div>
                      {insight.metric && (
                        <div className="sm:text-right shrink-0 flex sm:flex-col items-center sm:items-end gap-2 sm:gap-0">
                          <p className="text-lg font-bold text-gray-800">{insight.metric}</p>
                          <p className="text-[10px] text-gray-400">{insight.metricLabel}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Summary Card Component
function SummaryCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 flex items-center gap-3 sm:gap-4">
      <div className={`w-10 h-10 sm:w-12 sm:h-12 ${color} rounded-xl flex items-center justify-center text-white shrink-0`}>
        {icon}
      </div>
      <div>
        <p className="text-xl sm:text-2xl font-bold text-gray-800">{value}</p>
        <p className="text-[11px] sm:text-xs text-gray-400 font-medium">{label}</p>
      </div>
    </div>
  );
}

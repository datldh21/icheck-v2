import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { useAuthStore, useRequestStore } from '../../stores';
import { Badge } from '../common';
import { REQUEST_TYPE_LABELS, REQUEST_STATUS_LABELS } from '../../types';
import { formatDate, formatMonthYear } from '../../utils';

export function RequestTable() {
  const { user } = useAuthStore();
  const { myRequests, fetchMyRequests } = useRequestStore();
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(2);
  const [filterMode, setFilterMode] = useState<'month' | 'all'>('month');

  useEffect(() => {
    if (user) fetchMyRequests(user.id);
  }, [user, fetchMyRequests]);

  const filteredRequests = filterMode === 'month'
    ? myRequests.filter((r) => {
        const d = new Date(r.startDate);
        return d.getFullYear() === year && d.getMonth() + 1 === month;
      })
    : myRequests;

  const prevMonth = () => {
    if (month === 1) { setMonth(12); setYear(year - 1); }
    else setMonth(month - 1);
  };

  const nextMonth = () => {
    if (month === 12) { setMonth(1); setYear(year + 1); }
    else setMonth(month + 1);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Header with filter */}
      <div className="p-5 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterMode(filterMode === 'month' ? 'all' : 'month')}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <Filter size={14} />
            {filterMode === 'month' ? 'Tháng' : 'Tất cả'}
          </button>
        </div>
        {filterMode === 'month' && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-primary">{formatMonthYear(year, month)}</span>
            <button onClick={prevMonth} className="p-1 rounded hover:bg-gray-100 text-gray-500">
              <ChevronLeft size={16} />
            </button>
            <button onClick={nextMonth} className="p-1 rounded hover:bg-gray-100 text-gray-500">
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Title */}
      <div className="px-5 py-3 border-b border-gray-50">
        <h4 className="text-sm font-bold text-gray-800">
          Đề xuất của bạn ({filteredRequests.length})
        </h4>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400">#</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400">Thông tin</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400">Ngày áp dụng</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-5 py-8 text-center text-gray-400 text-sm">
                  Không có đề xuất nào
                </td>
              </tr>
            ) : (
              filteredRequests.map((req, idx) => (
                <tr key={req.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-5 py-3 text-gray-500">{idx + 1}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-700 font-medium">{REQUEST_TYPE_LABELS[req.type]}</span>
                      <Badge variant={req.status}>{REQUEST_STATUS_LABELS[req.status]}</Badge>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-600">
                    {req.customStartTime && `${req.customStartTime} . `}
                    {formatDate(req.startDate)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

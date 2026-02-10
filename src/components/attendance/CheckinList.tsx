import { useEffect } from 'react';
import { useAttendanceStore } from '../../stores';
import { Avatar } from '../common';
import { Badge } from '../common';
import { formatTime } from '../../utils';

// Medal components for top 5
function RankBadge({ rank }: { rank: number }) {
  if (rank <= 5) {
    const colors = ['', '#FFD700', '#C0C0C0', '#CD7F32', '#CD7F32', '#CD7F32'];
    return (
      <div className="flex items-center justify-center w-8">
        <svg width="24" height="30" viewBox="0 0 24 30">
          <path d="M12 2l3 6 6 1-4.5 4.5L18 20l-6-3-6 3 1.5-6.5L3 9l6-1z" fill={colors[rank]} stroke={colors[rank]} strokeWidth="0.5" />
        </svg>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center w-8">
      <span className="text-sm font-semibold text-gray-500">{rank}</span>
    </div>
  );
}

export function CheckinList() {
  const { todayRecords, fetchTodayAttendance } = useAttendanceStore();

  useEffect(() => {
    fetchTodayAttendance();
  }, [fetchTodayAttendance]);

  const sorted = [...todayRecords].sort(
    (a, b) => new Date(a.checkinTime).getTime() - new Date(b.checkinTime).getTime()
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-4 sm:p-5 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-800">Danh sách đã chấm công</h3>
      </div>

      {/* Desktop Table Header - hidden on mobile */}
      <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 border-b border-gray-50 text-xs font-semibold text-gray-400 uppercase">
        <div className="col-span-1">#</div>
        <div className="col-span-5">iKamer</div>
        <div className="col-span-3">Time</div>
        <div className="col-span-3">Location</div>
      </div>

      {/* Desktop Table Body - hidden on mobile */}
      <div className="hidden md:block divide-y divide-gray-50">
        {sorted.map((record, index) => (
          <div key={record.id} className="grid grid-cols-12 gap-4 px-5 py-3.5 items-center hover:bg-gray-50/50 transition-colors">
            <div className="col-span-1">
              <RankBadge rank={index + 1} />
            </div>
            <div className="col-span-5 flex items-center gap-3">
              <Avatar name={record.userName} src={record.userAvatar} size="md" />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{record.userName}</p>
                <p className="text-xs text-gray-400 truncate">{record.userEmail}</p>
              </div>
            </div>
            <div className="col-span-3 flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">{formatTime(record.checkinTime)}</span>
              <Badge variant={record.status}>
                {record.status === 'on-time' ? 'Đúng giờ' : 'Đi muộn'}
              </Badge>
            </div>
            <div className="col-span-3">
              <p className="text-sm font-medium text-gray-700">{record.location}</p>
              <p className="text-xs text-gray-400">{record.device}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden divide-y divide-gray-50">
        {sorted.map((record, index) => (
          <div key={record.id} className="px-4 py-3 hover:bg-gray-50/50 transition-colors">
            <div className="flex items-center gap-3">
              <RankBadge rank={index + 1} />
              <Avatar name={record.userName} src={record.userAvatar} size="md" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-gray-800 truncate">{record.userName}</p>
                  <Badge variant={record.status}>
                    {record.status === 'on-time' ? 'Đúng giờ' : 'Đi muộn'}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs font-medium text-gray-600">{formatTime(record.checkinTime)}</span>
                  <span className="text-xs text-gray-300">•</span>
                  <span className="text-xs text-gray-400 truncate">{record.location}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

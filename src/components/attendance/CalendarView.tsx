import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAttendanceStore } from '../../stores';
import { getMonthName } from '../../utils';
import type { DayStatus } from '../../types';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getStatusIndicator(status: DayStatus) {
  switch (status) {
    case 'on-time':
      return <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-green-500 flex items-center justify-center"><svg className="w-2 h-2 sm:w-2.5 sm:h-2.5" viewBox="0 0 10 10"><path d="M2 5l2 2 4-4" fill="none" stroke="white" strokeWidth="1.5"/></svg></div>;
    case 'late':
      return <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-orange-400 flex items-center justify-center"><svg className="w-2 h-2 sm:w-2.5 sm:h-2.5" viewBox="0 0 10 10"><path d="M2 5l2 2 4-4" fill="none" stroke="white" strokeWidth="1.5"/></svg></div>;
    case 'leave':
      return <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-blue-400" />;
    case 'absent':
      return <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-red-400" />;
    case 'wfh':
      return <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-purple-400" />;
    default:
      return null;
  }
}

export function CalendarView() {
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(2);
  const { calendarDays, fetchCalendar } = useAttendanceStore();

  useEffect(() => {
    fetchCalendar(year, month);
  }, [year, month, fetchCalendar]);

  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDayOfMonth = new Date(year, month - 1, 1).getDay();

  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  const prevMonth = () => {
    if (month === 1) { setMonth(12); setYear(year - 1); }
    else setMonth(month - 1);
  };

  const nextMonth = () => {
    if (month === 12) { setMonth(1); setYear(year + 1); }
    else setMonth(month + 1);
  };

  // Build calendar grid
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDayOfMonth; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="bg-white rounded-xl p-3 sm:p-5 shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">
          {getMonthName(month)} {year}
        </h3>
        <div className="flex gap-1">
          <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors">
            <ChevronLeft size={18} />
          </button>
          <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS_OF_WEEK.map((d) => (
          <div key={d} className="text-center text-xs font-semibold text-gray-400 py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar cells */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, idx) => {
          if (day === null) {
            return <div key={`empty-${idx}`} className="h-10 sm:h-14" />;
          }

          const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const dayData = calendarDays.find((d) => d.date === dateStr);
          const isToday = dateStr === todayStr;
          const isWeekend = dayData?.status === 'weekend';

          return (
            <div
              key={dateStr}
              className={`h-10 sm:h-14 flex flex-col items-center justify-center rounded-lg transition-colors ${
                isToday ? 'bg-primary text-white' : isWeekend ? 'text-gray-300' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className={`text-xs sm:text-sm font-medium ${isToday ? 'font-bold' : ''}`}>
                {day}
              </span>
              {dayData && !isToday && !isWeekend && (
                <div className="mt-0.5">{getStatusIndicator(dayData.status)}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

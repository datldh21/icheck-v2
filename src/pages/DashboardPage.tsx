import { RealTimeClock, CheckinBanner, CalendarView, CheckinList } from '../components/attendance';
import { RequestButtons, RequestTable } from '../components/requests';

export function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Top section: Clock + Greeting */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <RealTimeClock />
        <CheckinBanner />
        <RequestButtons />
      </div>

      {/* Calendar + Request Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CalendarView />
        <RequestTable />
      </div>

      {/* Attendance List */}
      <CheckinList />
    </div>
  );
}

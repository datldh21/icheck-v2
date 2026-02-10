import { useAttendanceStore, useAuthStore } from '../../stores';
import { formatTime } from '../../utils';
import { useEffect } from 'react';

export function CheckinBanner() {
  const { user } = useAuthStore();
  const { myCheckin, isCheckedIn, fetchMyCheckin, doCheckin } = useAttendanceStore();

  useEffect(() => {
    if (user) {
      fetchMyCheckin(user.id);
    }
  }, [user, fetchMyCheckin]);

  const handleCheckin = async () => {
    await doCheckin();
  };

  if (isCheckedIn && myCheckin) {
    const statusText = myCheckin.status === 'on-time' ? 'Đúng giờ' : 'Đi muộn';
    return (
      <div className="mt-6">
        <div className="w-full py-5 rounded-xl bg-gradient-to-r from-green-500 to-green-400 text-white text-center">
          <h2 className="text-2xl font-bold tracking-wide">ĐANG LÀM VIỆC</h2>
        </div>
        <p className="text-center text-gray-600 mt-3 text-sm font-medium">
          Đã chấm công: {formatTime(myCheckin.checkinTime)} - {statusText}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <button
        onClick={handleCheckin}
        className="w-full py-5 rounded-xl bg-gradient-to-r from-primary to-yellow-400 text-white text-center hover:from-primary-dark hover:to-yellow-500 transition-all shadow-lg hover:shadow-xl active:scale-[0.99]"
      >
        <h2 className="text-2xl font-bold tracking-wide">CHẤM CÔNG</h2>
      </button>
      <p className="text-center text-gray-400 mt-3 text-sm">
        Nhấn để chấm công ngay
      </p>
    </div>
  );
}

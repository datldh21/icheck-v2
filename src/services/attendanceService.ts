import type { AttendanceRecord, CalendarDay } from '../types';
import { mockTodayAttendance, mockCalendarFeb2026, generateCalendarDays } from '../mocks';

// Simulates async API calls - swap with real Axios calls later
export const attendanceService = {
  async getTodayAttendance(): Promise<AttendanceRecord[]> {
    return Promise.resolve([...mockTodayAttendance]);
  },

  async checkin(): Promise<AttendanceRecord> {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const isLate = hours > 8 || (hours === 8 && minutes > 30);

    const record: AttendanceRecord = {
      id: `a-${Date.now()}`,
      userId: 'u1',
      userName: 'Lê Đăng Hoàng Đạt',
      userEmail: 'datlh@ikameglobal.com',
      checkinTime: now.toISOString(),
      ipAddress: '113.161.72.100',
      status: isLate ? 'late' : 'on-time',
      device: 'Desktop/Laptop - Google Chrome',
      location: 'Tại công ty',
    };

    return Promise.resolve(record);
  },

  async getCalendarDays(year: number, month: number): Promise<CalendarDay[]> {
    // For Feb 2026 use pre-defined mock data, otherwise generate
    if (year === 2026 && month === 2) {
      return Promise.resolve([...mockCalendarFeb2026]);
    }
    return Promise.resolve(generateCalendarDays(year, month));
  },

  async getUserCheckinToday(userId: string): Promise<AttendanceRecord | null> {
    const record = mockTodayAttendance.find((a) => a.userId === userId);
    return Promise.resolve(record || null);
  },
};

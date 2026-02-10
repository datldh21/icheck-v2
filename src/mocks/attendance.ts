import type { AttendanceRecord, CalendarDay } from '../types';

const today = new Date().toISOString().split('T')[0];

export const mockTodayAttendance: AttendanceRecord[] = [
  {
    id: 'a1',
    userId: 'u2',
    userName: 'Hoàng Ngọc Hà',
    userEmail: 'hahn@ikameglobal.com',
    checkinTime: `${today}T07:53:00`,
    ipAddress: '113.161.72.100',
    status: 'on-time',
    device: 'Mobile Device - App',
    location: 'Tại công ty',
  },
  {
    id: 'a2',
    userId: 'u3',
    userName: 'Bùi Thanh Thảo',
    userEmail: 'thaobt@ikameglobal.com',
    checkinTime: `${today}T08:08:00`,
    ipAddress: '113.161.72.100',
    status: 'on-time',
    device: 'Mobile Device - App',
    location: 'Tại công ty',
  },
  {
    id: 'a3',
    userId: 'u4',
    userName: 'Nguyễn Anh Tú',
    userEmail: 'tuna1@ikameglobal.com',
    checkinTime: `${today}T08:14:00`,
    ipAddress: '113.161.72.100',
    status: 'on-time',
    device: 'Mobile Device - App',
    location: 'Tại công ty',
  },
  {
    id: 'a4',
    userId: 'u5',
    userName: 'Đặng Hồng Quang',
    userEmail: 'quangdh@ikameglobal.com',
    checkinTime: `${today}T08:14:00`,
    ipAddress: '113.161.72.100',
    status: 'on-time',
    device: 'Desktop/Laptop - Google Chrome',
    location: 'Tại công ty',
  },
  {
    id: 'a5',
    userId: 'u6',
    userName: 'Đào Hoàng Hiệp',
    userEmail: 'hiepdh@ikameglobal.com',
    checkinTime: `${today}T08:16:00`,
    ipAddress: '113.161.72.100',
    status: 'on-time',
    device: 'Mobile Device - App',
    location: 'Tại công ty',
  },
  {
    id: 'a6',
    userId: 'u7',
    userName: 'Lã Phương Linh',
    userEmail: 'linhlp@ikameglobal.com',
    checkinTime: `${today}T08:16:00`,
    ipAddress: '113.161.72.100',
    status: 'on-time',
    device: 'Desktop/Laptop - Google Chrome',
    location: 'Tại công ty',
  },
  {
    id: 'a7',
    userId: 'u8',
    userName: 'Nguyễn Bảo Đức',
    userEmail: 'ducnb@ikameglobal.com',
    checkinTime: `${today}T08:18:00`,
    ipAddress: '113.161.72.100',
    status: 'on-time',
    device: 'Mobile Device - App',
    location: 'Tại công ty',
  },
  {
    id: 'a8',
    userId: 'u9',
    userName: 'Nguyễn Thị Phương Thảo',
    userEmail: 'thaontp@ikameglobal.com',
    checkinTime: `${today}T08:19:00`,
    ipAddress: '113.161.72.100',
    status: 'on-time',
    device: 'Desktop/Laptop - Google Chrome',
    location: 'Tại công ty',
  },
  {
    id: 'a9',
    userId: 'u10',
    userName: 'Nguyễn Xuân Thành',
    userEmail: 'thanhnx@ikameglobal.com',
    checkinTime: `${today}T08:19:00`,
    ipAddress: '113.161.72.100',
    status: 'on-time',
    device: 'Mobile Device - App',
    location: 'Tại công ty',
  },
  {
    id: 'a10',
    userId: 'u11',
    userName: 'Lê Đức Long',
    userEmail: 'longld@ikameglobal.com',
    checkinTime: `${today}T08:22:00`,
    ipAddress: '113.161.72.100',
    status: 'on-time',
    device: 'Desktop/Laptop - Google Chrome',
    location: 'Tại công ty',
  },
  {
    id: 'a11',
    userId: 'u1',
    userName: 'Lê Đăng Hoàng Đạt',
    userEmail: 'datlh@ikameglobal.com',
    checkinTime: `${today}T08:57:00`,
    ipAddress: '113.161.72.100',
    status: 'late',
    device: 'Desktop/Laptop - Google Chrome',
    location: 'Tại công ty',
  },
];

// Generate calendar data for current month
export function generateCalendarDays(year: number, month: number): CalendarDay[] {
  const days: CalendarDay[] = [];
  const daysInMonth = new Date(year, month, 0).getDate();
  const todayDate = new Date();

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month - 1, d);
    const dateStr = date.toISOString().split('T')[0];
    const dayOfWeek = date.getDay();

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      days.push({ date: dateStr, status: 'weekend' });
      continue;
    }

    if (date > todayDate) {
      days.push({ date: dateStr, status: 'none' });
      continue;
    }

    // Mock some attendance patterns
    const rand = Math.random();
    if (rand < 0.65) {
      days.push({ date: dateStr, status: 'on-time', checkinTime: '08:' + String(Math.floor(Math.random() * 25) + 5).padStart(2, '0') });
    } else if (rand < 0.85) {
      days.push({ date: dateStr, status: 'late', checkinTime: '08:' + String(Math.floor(Math.random() * 30) + 31).padStart(2, '0') });
    } else if (rand < 0.92) {
      days.push({ date: dateStr, status: 'leave' });
    } else {
      days.push({ date: dateStr, status: 'on-time', checkinTime: '08:' + String(Math.floor(Math.random() * 20) + 10).padStart(2, '0') });
    }
  }

  return days;
}

// Pre-generated stable calendar for demo
export const mockCalendarFeb2026: CalendarDay[] = [
  { date: '2026-02-01', status: 'weekend' },
  { date: '2026-02-02', status: 'on-time', checkinTime: '08:15' },
  { date: '2026-02-03', status: 'late', checkinTime: '08:45' },
  { date: '2026-02-04', status: 'late', checkinTime: '08:35' },
  { date: '2026-02-05', status: 'late', checkinTime: '08:40' },
  { date: '2026-02-06', status: 'on-time', checkinTime: '08:20' },
  { date: '2026-02-07', status: 'weekend' },
  { date: '2026-02-08', status: 'weekend' },
  { date: '2026-02-09', status: 'late', checkinTime: '08:50' },
  { date: '2026-02-10', status: 'on-time', checkinTime: '08:57' },
  { date: '2026-02-11', status: 'none' },
  { date: '2026-02-12', status: 'none' },
  { date: '2026-02-13', status: 'none' },
  { date: '2026-02-14', status: 'weekend' },
  { date: '2026-02-15', status: 'weekend' },
  { date: '2026-02-16', status: 'none' },
  { date: '2026-02-17', status: 'none' },
  { date: '2026-02-18', status: 'none' },
  { date: '2026-02-19', status: 'none' },
  { date: '2026-02-20', status: 'none' },
  { date: '2026-02-21', status: 'weekend' },
  { date: '2026-02-22', status: 'weekend' },
  { date: '2026-02-23', status: 'none' },
  { date: '2026-02-24', status: 'none' },
  { date: '2026-02-25', status: 'none' },
  { date: '2026-02-26', status: 'none' },
  { date: '2026-02-27', status: 'none' },
  { date: '2026-02-28', status: 'weekend' },
];

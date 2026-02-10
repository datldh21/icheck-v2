import dayjs from 'dayjs';
import 'dayjs/locale/vi';

dayjs.locale('vi');

const WEEKDAY_NAMES = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
const MONTH_NAMES = [
  'tháng 1', 'tháng 2', 'tháng 3', 'tháng 4', 'tháng 5', 'tháng 6',
  'tháng 7', 'tháng 8', 'tháng 9', 'tháng 10', 'tháng 11', 'tháng 12',
];

export function getVietnameseDate(date: Date = new Date()): string {
  const weekday = WEEKDAY_NAMES[date.getDay()];
  const day = date.getDate();
  const month = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();
  return `${weekday}, ngày ${day} ${month} năm ${year}`;
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Chào buổi sáng';
  if (hour < 18) return 'Chào buổi chiều';
  return 'Chào buổi tối';
}

export function formatTime(isoString: string): string {
  return dayjs(isoString).format('HH:mm');
}

export function formatDate(isoString: string): string {
  return dayjs(isoString).format('DD/MM/YYYY');
}

export function formatMonthYear(year: number, month: number): string {
  return `Tháng ${month}, ${year}`;
}

export function getMonthName(month: number): string {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  return monthNames[month - 1];
}

export function isWorkingDay(date: Date): boolean {
  const day = date.getDay();
  return day !== 0 && day !== 6;
}

export function getAttendanceStatusText(checkinTime: string): string {
  const time = dayjs(checkinTime);
  const hour = time.hour();
  const minute = time.minute();

  if (hour < 8 || (hour === 8 && minute <= 30)) {
    return 'Đúng giờ';
  }
  return 'Đi muộn';
}

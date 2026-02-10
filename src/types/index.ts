// ===== User Types =====
export type UserRole = 'employee' | 'manager' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  managerId?: string;
  departmentId: string;
  departmentName: string;
  avatar?: string;
  slackId?: string;
  annualLeaveRemaining: number;
}

// ===== Attendance Types =====
export type AttendanceStatus = 'on-time' | 'late';
export type DeviceType = 'Mobile Device - App' | 'Desktop/Laptop - Google Chrome' | 'Desktop/Laptop - Safari' | 'Desktop/Laptop - Firefox';

export interface AttendanceRecord {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userAvatar?: string;
  checkinTime: string; // ISO datetime
  ipAddress: string;
  status: AttendanceStatus;
  device: DeviceType;
  location: string;
}

// ===== Request Types =====
export type RequestType =
  | 'late_arrival'
  | 'early_departure'
  | 'forgot_checkin'
  | 'annual_leave'
  | 'maternity_leave'
  | 'funeral_leave'
  | 'wedding_leave'
  | 'wfh';

export type RequestStatus = 'pending' | 'approved' | 'rejected';
export type DurationType = 'full_day' | 'morning' | 'afternoon' | 'custom';

export interface LeaveRequest {
  id: string;
  userId: string;
  userName: string;
  type: RequestType;
  startDate: string;
  endDate: string;
  duration: DurationType;
  reason: string;
  status: RequestStatus;
  approverId?: string;
  approverName?: string;
  rejectReason?: string;
  createdAt: string;
  customStartTime?: string;
  customEndTime?: string;
  attachment?: string;
}

// ===== Holiday Types =====
export interface Holiday {
  id: string;
  date: string;
  name: string;
  isPaid: boolean;
}

// ===== Settings Types =====
export interface Setting {
  id: string;
  configKey: string;
  configValue: string;
}

// ===== Department Types =====
export interface Department {
  id: string;
  name: string;
  managerId?: string;
}

// ===== Calendar Day Status =====
export type DayStatus = 'on-time' | 'late' | 'absent' | 'leave' | 'holiday' | 'weekend' | 'wfh' | 'none';

export interface CalendarDay {
  date: string;
  status: DayStatus;
  checkinTime?: string;
}

// ===== Request Type Labels =====
export const REQUEST_TYPE_LABELS: Record<RequestType, string> = {
  late_arrival: 'Xin đi muộn/về sớm',
  early_departure: 'Xin đi muộn/về sớm',
  forgot_checkin: 'Quên chấm công',
  annual_leave: 'Nghỉ phép năm',
  maternity_leave: 'Nghỉ thai sản',
  funeral_leave: 'Nghỉ hiếu',
  wedding_leave: 'Nghỉ hỉ',
  wfh: 'Work from home',
};

export const REQUEST_STATUS_LABELS: Record<RequestStatus, string> = {
  pending: 'Đang chờ',
  approved: 'Đã duyệt',
  rejected: 'Từ chối',
};

export const DURATION_LABELS: Record<DurationType, string> = {
  full_day: 'Cả ngày',
  morning: 'Buổi sáng',
  afternoon: 'Buổi chiều',
  custom: 'Custom',
};

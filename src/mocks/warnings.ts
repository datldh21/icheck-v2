export type WarningSeverity = 'critical' | 'warning' | 'info';

export interface EmployeeWarning {
  id: string;
  userId: string;
  userName: string;
  department: string;
  severity: WarningSeverity;
  issue: string;
  detail: string;
}

// Mock warning data - derived from attendance/leave/user data analysis
export const mockWarnings: EmployeeWarning[] = [
  {
    id: 'w1',
    userId: 'u1',
    userName: 'Lê Đăng Hoàng Đạt',
    department: 'Engineering',
    severity: 'critical',
    issue: 'Đi muộn nhiều lần',
    detail: 'Check-in trễ 4/7 ngày làm việc trong tháng 2 (03, 04, 05, 09/02). Đã có 2 đề xuất xin đi muộn được duyệt.',
  },
  {
    id: 'w2',
    userId: 'u8',
    userName: 'Nguyễn Bảo Đức',
    department: 'Engineering',
    severity: 'warning',
    issue: 'Ngày phép còn ít & đề xuất bị từ chối',
    detail: 'Chỉ còn 7 ngày phép năm (thấp nhất team). Đề xuất WFH ngày 11/02 đã bị từ chối.',
  },
  {
    id: 'w3',
    userId: 'u3',
    userName: 'Bùi Thanh Thảo',
    department: 'Engineering',
    severity: 'warning',
    issue: 'Ngày phép còn ít',
    detail: 'Còn 8 ngày phép năm. Hiện có 1 đề xuất nghỉ phép ngày 15/02 đang chờ duyệt.',
  },
  {
    id: 'w4',
    userId: 'u6',
    userName: 'Đào Hoàng Hiệp',
    department: 'Engineering',
    severity: 'info',
    issue: 'Xin về sớm hôm nay',
    detail: 'Có đề xuất xin về sớm buổi chiều ngày 10/02 đang chờ duyệt. Lý do: Đi khám bệnh.',
  },
  {
    id: 'w5',
    userId: 'u5',
    userName: 'Đặng Hồng Quang',
    department: 'Engineering',
    severity: 'info',
    issue: 'Quên chấm công',
    detail: 'Quên chấm công ngày 05/02. Đã gửi đề xuất bổ sung và được duyệt.',
  },
];

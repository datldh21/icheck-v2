import type { RequestStatus, AttendanceStatus } from '../../types';

interface BadgeProps {
  variant: RequestStatus | AttendanceStatus | 'default';
  children: React.ReactNode;
}

const variantClasses: Record<string, string> = {
  approved: 'bg-green-50 text-green-600 border-green-200',
  rejected: 'bg-red-50 text-red-600 border-red-200',
  pending: 'bg-yellow-50 text-yellow-600 border-yellow-200',
  'on-time': 'bg-green-50 text-green-600 border-green-200',
  late: 'bg-orange-50 text-orange-600 border-orange-200',
  default: 'bg-gray-50 text-gray-600 border-gray-200',
};

export function Badge({ variant, children }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${variantClasses[variant] || variantClasses.default}`}>
      {children}
    </span>
  );
}

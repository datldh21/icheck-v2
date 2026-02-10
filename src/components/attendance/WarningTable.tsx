import { AlertTriangle, AlertCircle, Info, ShieldAlert } from 'lucide-react';
import { mockWarnings, type EmployeeWarning, type WarningSeverity } from '../../mocks';
import { Avatar } from '../common';

const severityConfig: Record<WarningSeverity, { icon: typeof AlertTriangle; label: string; bgColor: string; textColor: string; badgeBg: string; borderColor: string }> = {
  critical: {
    icon: ShieldAlert,
    label: 'Nghiêm trọng',
    bgColor: 'bg-red-50',
    textColor: 'text-red-700',
    badgeBg: 'bg-red-100 text-red-700',
    borderColor: 'border-red-200',
  },
  warning: {
    icon: AlertTriangle,
    label: 'Cảnh báo',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-700',
    badgeBg: 'bg-amber-100 text-amber-700',
    borderColor: 'border-amber-200',
  },
  info: {
    icon: Info,
    label: 'Lưu ý',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    badgeBg: 'bg-blue-100 text-blue-700',
    borderColor: 'border-blue-200',
  },
};

function WarningRow({ warning }: { warning: EmployeeWarning }) {
  const config = severityConfig[warning.severity];
  const Icon = config.icon;

  return (
    <div className={`p-3 rounded-lg border ${config.borderColor} ${config.bgColor} transition-all hover:shadow-sm`}>
      <div className="flex items-start gap-2 sm:gap-3">
        {/* Avatar - hidden on very small mobile */}
        <div className="hidden sm:block">
          <Avatar name={warning.userName} size="sm" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-gray-800 truncate">{warning.userName}</span>
            <span className="text-xs text-gray-400 hidden sm:inline">{warning.department}</span>
            {/* Severity badge on mobile - inline */}
            <span className={`sm:hidden text-[10px] font-bold px-2 py-0.5 rounded-full ${config.badgeBg}`}>
              {config.label}
            </span>
          </div>

          {/* Issue badge */}
          <div className="flex items-center gap-1.5 mt-1">
            <Icon size={13} className={config.textColor} />
            <span className={`text-xs font-semibold ${config.textColor}`}>{warning.issue}</span>
          </div>

          {/* Detail */}
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">{warning.detail}</p>
        </div>

        {/* Severity badge - desktop */}
        <span className={`hidden sm:inline-block shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full ${config.badgeBg}`}>
          {config.label}
        </span>
      </div>
    </div>
  );
}

export function WarningTable() {
  const criticalCount = mockWarnings.filter((w) => w.severity === 'critical').length;
  const warningCount = mockWarnings.filter((w) => w.severity === 'warning').length;
  const infoCount = mockWarnings.filter((w) => w.severity === 'info').length;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-red-50 rounded-lg shrink-0">
              <AlertCircle size={18} className="text-red-500" />
            </div>
            <h4 className="text-sm font-bold text-gray-800">
              Cảnh báo nhân sự ({mockWarnings.length})
            </h4>
          </div>

          {/* Summary badges */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {criticalCount > 0 && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                {criticalCount} nghiêm trọng
              </span>
            )}
            {warningCount > 0 && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                {warningCount} cảnh báo
              </span>
            )}
            {infoCount > 0 && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                {infoCount} lưu ý
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Warning list */}
      <div className="p-4 space-y-3 max-h-[420px] overflow-y-auto">
        {mockWarnings.length === 0 ? (
          <div className="py-8 text-center text-gray-400 text-sm">
            Không có cảnh báo nào
          </div>
        ) : (
          mockWarnings.map((warning) => (
            <WarningRow key={warning.id} warning={warning} />
          ))
        )}
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Modal } from '../common';
import { useAuthStore, useRequestStore } from '../../stores';
import type { RequestType, DurationType } from '../../types';
import { REQUEST_TYPE_LABELS, DURATION_LABELS } from '../../types';

interface RequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType: RequestType;
}

const REQUEST_TYPE_OPTIONS: { value: RequestType; label: string }[] = [
  { value: 'late_arrival', label: 'Xin đi muộn' },
  { value: 'early_departure', label: 'Xin về sớm' },
  { value: 'forgot_checkin', label: 'Quên chấm công' },
  { value: 'annual_leave', label: 'Nghỉ phép năm' },
  { value: 'maternity_leave', label: 'Nghỉ thai sản' },
  { value: 'funeral_leave', label: 'Nghỉ hiếu' },
  { value: 'wedding_leave', label: 'Nghỉ hỉ' },
  { value: 'wfh', label: 'Work from home' },
];

const LEAVE_TYPES: RequestType[] = ['annual_leave', 'maternity_leave', 'funeral_leave', 'wedding_leave'];

export function RequestModal({ isOpen, onClose, defaultType }: RequestModalProps) {
  const { user } = useAuthStore();
  const { createRequest } = useRequestStore();

  const [type, setType] = useState<RequestType>(defaultType);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [duration, setDuration] = useState<DurationType>('full_day');
  const [reason, setReason] = useState('');
  const [customStartTime, setCustomStartTime] = useState('09:00');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setType(defaultType);
  }, [defaultType]);

  const isLeaveType = LEAVE_TYPES.includes(type);

  const getModalTitle = () => {
    if (isLeaveType) return 'Xin nghỉ phép';
    return REQUEST_TYPE_LABELS[type] || 'Tạo đề xuất';
  };

  const handleSubmit = async () => {
    if (!user || !reason.trim()) return;
    setIsSubmitting(true);
    try {
      await createRequest({
        userId: user.id,
        userName: user.name,
        type,
        startDate,
        endDate: isLeaveType ? endDate : startDate,
        duration,
        reason,
        customStartTime: duration === 'custom' ? customStartTime : undefined,
      });
      onClose();
      setReason('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={getModalTitle()}>
      <div className="space-y-5">
        {/* Leave Type Selector (for leave types) */}
        {isLeaveType && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              <span className="text-red-500">*</span> Loại nghỉ phép
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as RequestType)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
            >
              {LEAVE_TYPES.map((lt) => (
                <option key={lt} value={lt}>
                  {REQUEST_TYPE_OPTIONS.find((o) => o.value === lt)?.label}
                </option>
              ))}
            </select>
            {type === 'annual_leave' && user && (
              <p className="text-xs text-gray-400 mt-1">
                Bạn còn {user.annualLeaveRemaining} ngày nghỉ phép trong năm tính tới đầu T{new Date().getMonth() + 1}/{new Date().getFullYear()}
              </p>
            )}
          </div>
        )}

        {/* Request Type Selector (for non-leave types) */}
        {!isLeaveType && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              <span className="text-red-500">*</span> Loại đề xuất
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as RequestType)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
            >
              {REQUEST_TYPE_OPTIONS.filter((o) => !LEAVE_TYPES.includes(o.value)).map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        )}

        {/* Start Date */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            <span className="text-red-500">*</span> Chọn ngày bắt đầu nghỉ
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              if (!isLeaveType) setEndDate(e.target.value);
            }}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
          />
        </div>

        {/* End Date (for leave types only) */}
        {isLeaveType && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Chọn ngày kết thúc
            </label>
            <input
              type="date"
              value={endDate}
              min={startDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
            />
          </div>
        )}

        {/* Duration options */}
        <div>
          <div className="flex gap-2 flex-wrap">
            {(Object.keys(DURATION_LABELS) as DurationType[]).map((d) => (
              <button
                key={d}
                onClick={() => setDuration(d)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  duration === d
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {DURATION_LABELS[d]}
              </button>
            ))}
          </div>
        </div>

        {/* Custom time inputs */}
        {duration === 'custom' && (
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-xs text-gray-500 mb-1">Từ</label>
              <input
                type="time"
                value={customStartTime}
                onChange={(e) => setCustomStartTime(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
              />
            </div>
          </div>
        )}

        {/* Reason */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            <span className="text-red-500">*</span> Lý do
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Nhập lý do xin nghỉ phép"
            rows={4}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all resize-y"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !reason.trim()}
            className="px-6 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Đang gửi...' : 'Gửi'}
          </button>
        </div>
      </div>
    </Modal>
  );
}

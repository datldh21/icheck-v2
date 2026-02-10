import { useState } from 'react';
import { Plus } from 'lucide-react';
import { RequestModal } from './RequestModal';
import type { RequestType } from '../../types';

interface ButtonConfig {
  label: string;
  type: RequestType;
}

const buttons: ButtonConfig[] = [
  { label: 'Xin đi muộn/về sớm', type: 'late_arrival' },
  { label: 'Xin nghỉ phép', type: 'annual_leave' },
  { label: 'Quên chấm công', type: 'forgot_checkin' },
  { label: 'Work from home', type: 'wfh' },
];

export function RequestButtons() {
  const [openModal, setOpenModal] = useState<RequestType | null>(null);

  return (
    <>
      <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mt-5">
        {buttons.map((btn) => (
          <button
            key={btn.type}
            onClick={() => setOpenModal(btn.type)}
            className="inline-flex items-center gap-1.5 px-3 sm:px-5 py-2 sm:py-2.5 bg-white border-2 border-primary text-primary rounded-full text-xs sm:text-sm font-semibold hover:bg-primary hover:text-white transition-all"
          >
            <Plus size={14} className="sm:w-4 sm:h-4" />
            {btn.label}
          </button>
        ))}
      </div>

      <RequestModal
        isOpen={openModal !== null}
        onClose={() => setOpenModal(null)}
        defaultType={openModal || 'late_arrival'}
      />
    </>
  );
}

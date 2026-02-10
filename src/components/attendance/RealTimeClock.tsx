import { useState, useEffect } from 'react';
import { getVietnameseDate, getGreeting } from '../../utils';
import { useAuthStore } from '../../stores';
import { Avatar } from '../common';

export function RealTimeClock() {
  const { user } = useAuthStore();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = String(time.getHours()).padStart(2, '0');
  const minutes = String(time.getMinutes()).padStart(2, '0');
  const seconds = String(time.getSeconds()).padStart(2, '0');

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Tab icons - hidden on small mobile */}
      <div className="hidden md:flex items-center gap-3">
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </button>
          <button className="w-10 h-10 rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </button>
          <button className="w-10 h-10 rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 8h.001"/><path d="M10 8h.001"/><path d="M14 8h.001"/><path d="M18 8h.001"/><path d="M6 12h.001"/><path d="M10 12h.001"/><path d="M14 12h.001"/><path d="M18 12h.001"/><path d="M6 16h12"/></svg>
          </button>
        </div>
      </div>

      {/* Clock Center */}
      <div className="text-center">
        <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 tracking-wider font-mono">
          {hours}:{minutes}:{seconds}
        </div>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">{getVietnameseDate(time)}</p>
      </div>

      {/* User greeting */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-xs text-gray-400">{getGreeting()}</p>
          <p className="text-sm font-bold text-gray-700">{user?.name}</p>
        </div>
        <Avatar name={user?.name || ''} src={user?.avatar} size="lg" />
      </div>
    </div>
  );
}

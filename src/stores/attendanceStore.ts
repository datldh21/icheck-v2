import { create } from 'zustand';
import type { AttendanceRecord, CalendarDay } from '../types';
import { attendanceService } from '../services';

interface AttendanceState {
  todayRecords: AttendanceRecord[];
  calendarDays: CalendarDay[];
  myCheckin: AttendanceRecord | null;
  isCheckedIn: boolean;
  isLoading: boolean;
  fetchTodayAttendance: () => Promise<void>;
  fetchCalendar: (year: number, month: number) => Promise<void>;
  fetchMyCheckin: (userId: string) => Promise<void>;
  doCheckin: () => Promise<void>;
}

export const useAttendanceStore = create<AttendanceState>((set) => ({
  todayRecords: [],
  calendarDays: [],
  myCheckin: null,
  isCheckedIn: false,
  isLoading: false,

  fetchTodayAttendance: async () => {
    set({ isLoading: true });
    const records = await attendanceService.getTodayAttendance();
    set({ todayRecords: records, isLoading: false });
  },

  fetchCalendar: async (year: number, month: number) => {
    const days = await attendanceService.getCalendarDays(year, month);
    set({ calendarDays: days });
  },

  fetchMyCheckin: async (userId: string) => {
    const record = await attendanceService.getUserCheckinToday(userId);
    set({ myCheckin: record, isCheckedIn: !!record });
  },

  doCheckin: async () => {
    const record = await attendanceService.checkin();
    set((state) => ({
      myCheckin: record,
      isCheckedIn: true,
      todayRecords: [...state.todayRecords, record],
    }));
  },
}));

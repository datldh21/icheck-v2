import type { Holiday } from '../types';
import { mockHolidays } from '../mocks';

let holidays = [...mockHolidays];

export const holidayService = {
  async getAll(): Promise<Holiday[]> {
    return Promise.resolve([...holidays]);
  },

  async create(data: Omit<Holiday, 'id'>): Promise<Holiday> {
    const newHoliday: Holiday = { id: `h-${Date.now()}`, ...data };
    holidays = [...holidays, newHoliday];
    return Promise.resolve(newHoliday);
  },

  async update(id: string, data: Partial<Holiday>): Promise<Holiday> {
    const idx = holidays.findIndex((h) => h.id === id);
    if (idx === -1) throw new Error('Holiday not found');
    holidays[idx] = { ...holidays[idx], ...data };
    return Promise.resolve(holidays[idx]);
  },

  async remove(id: string): Promise<void> {
    holidays = holidays.filter((h) => h.id !== id);
    return Promise.resolve();
  },
};

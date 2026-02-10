import type { User } from '../types';
import { mockUsers } from '../mocks';

export const authService = {
  async login(email: string): Promise<User | null> {
    const user = mockUsers.find((u) => u.email === email);
    return Promise.resolve(user || null);
  },

  async loginById(userId: string): Promise<User | null> {
    const user = mockUsers.find((u) => u.id === userId);
    return Promise.resolve(user || null);
  },

  async getUsers(): Promise<User[]> {
    return Promise.resolve([...mockUsers]);
  },
};

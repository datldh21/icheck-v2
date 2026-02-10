import { create } from 'zustand';
import type { User } from '../types';
import { authService } from '../services';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userId: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (userId: string) => {
    set({ isLoading: true });
    const user = await authService.loginById(userId);
    if (user) {
      set({ user, isAuthenticated: true, isLoading: false });
      localStorage.setItem('icheck_user_id', userId);
    } else {
      set({ isLoading: false });
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
    localStorage.removeItem('icheck_user_id');
  },
}));

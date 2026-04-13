import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../services/api';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: true,
      error: null,

      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post('/auth/login', credentials);
          const { user, token } = response.data.data;
          localStorage.setItem('auth-token', token);
          set({ user, token, isLoading: false });
          return { success: true, user };
        } catch (error) {
          const message = error.response?.data?.message || 'Login failed';
          set({ isLoading: false, error: message });
          return { success: false, error: message };
        }
      },

      logout: () => {
        localStorage.removeItem('auth-token');
        set({ user: null, token: null, isLoading: false });
      },

      checkAuth: async () => {
        const token = localStorage.getItem('auth-token') || get().token;
        if (!token) {
          set({ isLoading: false, user: null, token: null });
          return;
        }

        set({ isLoading: true, token });
        try {
          const response = await api.get('/auth/me');
          set({ user: response.data.data, isLoading: false });
        } catch {
          localStorage.removeItem('auth-token');
          set({ user: null, token: null, isLoading: false });
        }
      },

      updateUser: (updates) => {
        set({ user: { ...get().user, ...updates } });
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ token: state.token, user: state.user }),
    }
  )
);
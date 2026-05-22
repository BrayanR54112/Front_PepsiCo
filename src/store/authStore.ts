import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { fetchApi } from '../lib/api';

export type Role = 'ADMIN' | 'STORE_OWNER';

export interface User {
  uid: string;
  email: string;
  name: string;
  role: Role;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setToken: (token: string) => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      
      login: async (email, password) => {
        const response = await fetchApi('/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, password })
        });
        
        set({ 
          token: response.data.token, 
          isAuthenticated: true, 
          user: response.data.user
        });
      },

      logout: async () => {
        set({ user: null, token: null, isAuthenticated: false });
      },

      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),
    }),
    { name: 'auth-storage' }
  )
);

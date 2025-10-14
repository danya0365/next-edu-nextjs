import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import localforage from 'localforage';
import { students } from '@/src/data/mock/students.mock';

// Mock user data from students.mock
export interface User {
  id: string;
  userId: string;
  displayName: string;
  avatar: string;
  email: string;
  age: number;
  grade?: string;
  enrolledCourses: string[];
  completedCourses: string[];
  points: number;
  level: number;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

interface RegisterData {
  displayName: string;
  email: string;
  age: number;
  password: string;
}

// Mock passwords for demo (in real app, would be hashed in database)
const MOCK_PASSWORDS: Record<string, string> = {
  'mind@example.com': 'password123',
  'pook@example.com': 'password123',
  'ae@example.com': 'password123',
};

// Convert students.mock to User format with passwords
const MOCK_USERS: Array<User & { password: string }> = students.map((student) => ({
  ...student,
  password: MOCK_PASSWORDS[student.email] || 'password123',
}));

// Create custom storage using localforage
const storage = {
  getItem: async (name: string) => {
    const value = await localforage.getItem<string>(name);
    return value ? JSON.parse(value) : null;
  },
  setItem: async (name: string, value: unknown) => {
    await localforage.setItem(name, JSON.stringify(value));
  },
  removeItem: async (name: string) => {
    await localforage.removeItem(name);
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });

        try {
          // Simulate API delay
          await new Promise((resolve) => setTimeout(resolve, 500));

          // Find user in mock database
          const foundUser: (User & { password: string }) | undefined = MOCK_USERS.find(
            (u) => u.email === email && u.password === password
          );

          if (!foundUser) {
            set({ 
              isLoading: false, 
              error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' 
            });
            return false;
          }

          // Remove password from user object
          const { password: _pwd, ...userWithoutPassword } = foundUser;

          set({
            user: userWithoutPassword,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          return true;
        } catch (_err) {
          set({
            isLoading: false,
            error: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ',
          });
          return false;
        }
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true, error: null });

        try {
          // Simulate API delay
          await new Promise((resolve) => setTimeout(resolve, 500));

          // Check if email already exists
          const existingUser = MOCK_USERS.find((u) => u.email === data.email);
          if (existingUser) {
            set({
              isLoading: false,
              error: 'อีเมลนี้ถูกใช้งานแล้ว',
            });
            return false;
          }

          // Create new user
          const newUser: User = {
            id: `stud-${Date.now()}`,
            userId: `user-stud-${Date.now()}`,
            displayName: data.displayName,
            avatar: `https://api.dicebear.com/7.x/big-smile/svg?seed=${data.displayName}`,
            email: data.email,
            age: data.age,
            enrolledCourses: [],
            completedCourses: [],
            points: 0,
            level: 1,
          };

          // Add to mock database (in real app, this would be API call)
          MOCK_USERS.push({ ...newUser, password: data.password });

          set({
            user: newUser,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          return true;
        } catch (_err) {
          set({
            isLoading: false,
            error: 'เกิดข้อผิดพลาดในการสมัครสมาชิก',
          });
          return false;
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          error: null,
        });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'auth-storage',
      storage,
    }
  )
);

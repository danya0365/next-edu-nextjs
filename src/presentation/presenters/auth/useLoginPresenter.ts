import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/src/presentation/stores/authStore';
import type { LoginViewModel } from './LoginPresenter';

export interface LoginPresenterHook {
  viewModel: LoginViewModel | null;
  loading: boolean;
  error: string | null;
  
  // Form state
  email: string;
  password: string;
  rememberMe: boolean;
  showPassword: boolean;
  
  // Actions
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setRememberMe: (remember: boolean) => void;
  toggleShowPassword: () => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  clearError: () => void;
}

/**
 * Custom hook for Login presenter
 * Provides state management and actions for Login operations
 */
export function useLoginPresenter(
  initialViewModel: LoginViewModel | null = null
): LoginPresenterHook {
  const router = useRouter();
  const { login, error: authError, isLoading, clearError: clearAuthError } = useAuthStore();

  const [viewModel] = useState<LoginViewModel | null>(initialViewModel);
  const [email, setEmail] = useState('mind@example.com'); // Pre-fill for demo
  const [password, setPassword] = useState('password123'); // Pre-fill for demo
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearAuthError();

    // Validate
    if (!email || !password) {
      return;
    }

    // Attempt login
    const success = await login(email, password);

    if (success) {
      // Redirect to home or dashboard
      router.push('/');
    }
  };

  const clearError = () => {
    clearAuthError();
  };

  return {
    viewModel,
    loading: isLoading,
    error: authError,
    email,
    password,
    rememberMe,
    showPassword,
    setEmail,
    setPassword,
    setRememberMe,
    toggleShowPassword,
    handleSubmit,
    clearError,
  };
}

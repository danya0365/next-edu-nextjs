import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/src/presentation/stores/authStore';
import type { RegisterViewModel } from './RegisterPresenter';

export interface RegisterPresenterHook {
  viewModel: RegisterViewModel | null;
  loading: boolean;
  error: string | null;
  
  // Form state
  displayName: string;
  email: string;
  age: number;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  showPassword: boolean;
  showConfirmPassword: boolean;
  
  // Actions
  setDisplayName: (name: string) => void;
  setEmail: (email: string) => void;
  setAge: (age: number) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (password: string) => void;
  setAcceptTerms: (accept: boolean) => void;
  toggleShowPassword: () => void;
  toggleShowConfirmPassword: () => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  clearError: () => void;
}

/**
 * Custom hook for Register presenter
 * Provides state management and actions for Register operations
 */
export function useRegisterPresenter(
  initialViewModel: RegisterViewModel | null = null
): RegisterPresenterHook {
  const router = useRouter();
  const { register, error: authError, isLoading, clearError: clearAuthError } = useAuthStore();

  const [viewModel] = useState<RegisterViewModel | null>(initialViewModel);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(10);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearAuthError();
    setLocalError(null);

    // Validate
    if (!displayName || !email || !password || !confirmPassword) {
      setLocalError('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    if (password !== confirmPassword) {
      setLocalError('รหัสผ่านไม่ตรงกัน');
      return;
    }

    if (password.length < 8) {
      setLocalError('รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร');
      return;
    }

    if (!acceptTerms) {
      setLocalError('กรุณายอมรับข้อกำหนดการใช้งาน');
      return;
    }

    // Attempt register
    const success = await register({
      displayName,
      email,
      age,
      password,
    });

    if (success) {
      // Redirect to home or dashboard
      router.push('/');
    }
  };

  const clearError = () => {
    clearAuthError();
    setLocalError(null);
  };

  return {
    viewModel,
    loading: isLoading,
    error: authError || localError,
    displayName,
    email,
    age,
    password,
    confirmPassword,
    acceptTerms,
    showPassword,
    showConfirmPassword,
    setDisplayName,
    setEmail,
    setAge,
    setPassword,
    setConfirmPassword,
    setAcceptTerms,
    toggleShowPassword,
    toggleShowConfirmPassword,
    handleSubmit,
    clearError,
  };
}

'use client';

import { useState, useEffect } from 'react';
import {
  ClientStudentDashboardPresenterFactory,
  type StudentDashboardViewModel,
} from './StudentDashboardPresenter';

export function useStudentDashboardPresenter(
  initialViewModel?: StudentDashboardViewModel,
  userId?: string
) {
  const [viewModel, setViewModel] = useState<StudentDashboardViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);

  // Load data
  useEffect(() => {
    if (!userId || initialViewModel) return;

    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await ClientStudentDashboardPresenterFactory.create(userId);
        setViewModel(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการโหลดข้อมูล');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [userId, initialViewModel]);

  // Refresh data
  const refresh = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      setError(null);
      const data = await ClientStudentDashboardPresenterFactory.create(userId);
      setViewModel(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการโหลดข้อมูล');
    } finally {
      setLoading(false);
    }
  };

  return {
    viewModel,
    loading,
    error,
    refresh,
  };
}

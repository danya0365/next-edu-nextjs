'use client';

import { useState, useEffect } from 'react';
import {
  ClientLeaderboardPresenterFactory,
  type LeaderboardViewModel,
  type LeaderboardFilter,
} from './LeaderboardPresenter';

export function useLeaderboardPresenter(
  initialViewModel?: LeaderboardViewModel,
  userId?: string
) {
  const [viewModel, setViewModel] = useState<LeaderboardViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<LeaderboardFilter>('all-time');

  // Load data
  const loadData = async (newFilter?: LeaderboardFilter) => {
    if (!userId) return;

    try {
      setLoading(true);
      setError(null);
      const data = await ClientLeaderboardPresenterFactory.create(userId, newFilter || filter);
      setViewModel(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการโหลดข้อมูล');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userId || initialViewModel) return;
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  // Change filter
  const changeFilter = async (newFilter: LeaderboardFilter) => {
    setFilter(newFilter);
    await loadData(newFilter);
  };

  // Refresh data
  const refresh = async () => {
    await loadData();
  };

  return {
    viewModel,
    loading,
    error,
    filter,
    changeFilter,
    refresh,
  };
}

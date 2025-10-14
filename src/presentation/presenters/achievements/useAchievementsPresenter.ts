'use client';

import { useState, useEffect } from 'react';
import {
  ClientAchievementsPresenterFactory,
  type AchievementsViewModel,
  type AchievementItem,
} from './AchievementsPresenter';

export type AchievementFilter = 'all' | 'unlocked' | 'locked' | 'common' | 'rare' | 'epic' | 'legendary';

export function useAchievementsPresenter(
  initialViewModel?: AchievementsViewModel,
  userId?: string
) {
  const [viewModel, setViewModel] = useState<AchievementsViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<AchievementFilter>('all');
  const [selectedAchievement, setSelectedAchievement] = useState<AchievementItem | null>(null);

  // Load data
  useEffect(() => {
    if (!userId || initialViewModel) return;

    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await ClientAchievementsPresenterFactory.create(userId);
        setViewModel(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการโหลดข้อมูล');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [userId, initialViewModel]);

  // Filter achievements
  const filteredAchievements = viewModel?.achievements.filter((achievement) => {
    if (filter === 'all') return true;
    if (filter === 'unlocked') return achievement.isUnlocked;
    if (filter === 'locked') return !achievement.isUnlocked;
    return achievement.rarity === filter;
  }) || [];

  // Refresh data
  const refresh = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      setError(null);
      const data = await ClientAchievementsPresenterFactory.create(userId);
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
    filter,
    setFilter,
    filteredAchievements,
    selectedAchievement,
    setSelectedAchievement,
    refresh,
  };
}

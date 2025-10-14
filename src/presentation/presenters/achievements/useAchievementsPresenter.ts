"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../stores/authStore";
import {
  ClientAchievementsPresenterFactory,
  type AchievementItem,
  type AchievementsViewModel,
} from "./AchievementsPresenter";

export type AchievementFilter =
  | "all"
  | "unlocked"
  | "locked"
  | "common"
  | "rare"
  | "epic"
  | "legendary";

export function useAchievementsPresenter(
  initialViewModel?: AchievementsViewModel
) {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();
  const [viewModel, setViewModel] = useState<AchievementsViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<AchievementFilter>("all");
  const [selectedAchievement, setSelectedAchievement] =
    useState<AchievementItem | null>(null);

  // Check authentication
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // Load data
  useEffect(() => {
    if (!user?.userId || initialViewModel) return;

    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await ClientAchievementsPresenterFactory.create(
          user.userId
        );
        setViewModel(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "เกิดข้อผิดพลาดในการโหลดข้อมูล"
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user?.userId, initialViewModel]);

  // Filter achievements
  const filteredAchievements =
    viewModel?.achievements.filter((achievement) => {
      if (filter === "all") return true;
      if (filter === "unlocked") return achievement.isUnlocked;
      if (filter === "locked") return !achievement.isUnlocked;
      return achievement.rarity === filter;
    }) || [];

  // Refresh data
  const refresh = async () => {
    if (!user?.userId) return;

    try {
      setLoading(true);
      setError(null);
      const data = await ClientAchievementsPresenterFactory.create(user.userId);
      setViewModel(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "เกิดข้อผิดพลาดในการโหลดข้อมูล"
      );
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

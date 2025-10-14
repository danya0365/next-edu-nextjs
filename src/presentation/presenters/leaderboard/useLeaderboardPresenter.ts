"use client";

import { useAuthStore } from "@/src/presentation/stores/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ClientLeaderboardPresenterFactory,
  type LeaderboardFilter,
  type LeaderboardViewModel,
} from "./LeaderboardPresenter";

export function useLeaderboardPresenter(
  initialViewModel?: LeaderboardViewModel
) {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();
  const [viewModel, setViewModel] = useState<LeaderboardViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<LeaderboardFilter>("all-time");

  // Check authentication
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // Load data
  const loadData = async (newFilter?: LeaderboardFilter) => {
    if (!user?.userId) return;

    try {
      setLoading(true);
      setError(null);
      const data = await ClientLeaderboardPresenterFactory.create(
        user.userId,
        newFilter || filter
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

  useEffect(() => {
    if (!user?.userId || initialViewModel) return;
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.userId]);

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

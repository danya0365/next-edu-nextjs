"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "../../stores/authStore";
import {
  ChallengesPresenter,
  type ChallengesViewModel,
} from "./ChallengesPresenter";

export interface ChallengesPresenterState {
  viewModel: ChallengesViewModel | null;
  loading: boolean;
  error: string | null;
  selectedCategory: string | null;
  selectedDifficulty: string | null;
  selectedStatus: "upcoming" | "active" | "ended" | null;
}

export interface ChallengesPresenterActions {
  loadData: () => Promise<void>;
  filterByCategory: (category: string | null) => void;
  filterByDifficulty: (difficulty: string | null) => void;
  filterByStatus: (status: "upcoming" | "active" | "ended" | null) => void;
  clearFilters: () => void;
  refresh: () => Promise<void>;
}

export function useChallengesPresenter(
  initialViewModel?: ChallengesViewModel
): [ChallengesPresenterState, ChallengesPresenterActions] {
  const { user } = useAuthStore();
  const [viewModel, setViewModel] = useState<ChallengesViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
    null
  );
  const [selectedStatus, setSelectedStatus] = useState<
    "upcoming" | "active" | "ended" | null
  >(null);

  // Load data function
  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await ChallengesPresenter.getViewModel(
        user?.userId,
        selectedCategory || undefined,
        selectedDifficulty || undefined,
        selectedStatus || undefined
      );

      setViewModel(data);
    } catch (err) {
      console.error("Error loading challenges:", err);
      setError(
        err instanceof Error ? err.message : "เกิดข้อผิดพลาดในการโหลดข้อมูล"
      );
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    if (!initialViewModel) {
      loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reload when filters change
  useEffect(() => {
    if (initialViewModel) return; // Don't reload if we have initial data on first render

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, selectedDifficulty, selectedStatus, user?.userId]);

  // Filter by category
  const filterByCategory = (category: string | null) => {
    setSelectedCategory(category);
  };

  // Filter by difficulty
  const filterByDifficulty = (difficulty: string | null) => {
    setSelectedDifficulty(difficulty);
  };

  // Filter by status
  const filterByStatus = (status: "upcoming" | "active" | "ended" | null) => {
    setSelectedStatus(status);
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedDifficulty(null);
    setSelectedStatus(null);
  };

  // Refresh data
  const refresh = async () => {
    await loadData();
  };

  const state: ChallengesPresenterState = {
    viewModel,
    loading,
    error,
    selectedCategory,
    selectedDifficulty,
    selectedStatus,
  };

  const actions: ChallengesPresenterActions = {
    loadData,
    filterByCategory,
    filterByDifficulty,
    filterByStatus,
    clearFilters,
    refresh,
  };

  return [state, actions];
}

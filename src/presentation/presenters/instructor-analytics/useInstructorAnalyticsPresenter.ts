"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuthStore } from "../../stores/authStore";
import {
  InstructorAnalyticsPresenter,
  type InstructorAnalyticsViewModel,
} from "./InstructorAnalyticsPresenter";

export interface InstructorAnalyticsPresenterState {
  viewModel: InstructorAnalyticsViewModel | null;
  loading: boolean;
  error: string | null;
  engagementDays: 7 | 14 | 30;
  revenueMonths: 3 | 6 | 12;
  selectedTab: "overview" | "courses" | "students" | "revenue" | "traffic";
}

export interface InstructorAnalyticsPresenterActions {
  loadData: () => Promise<void>;
  setEngagementDays: (days: 7 | 14 | 30) => void;
  setRevenueMonths: (months: 3 | 6 | 12) => void;
  setSelectedTab: (
    tab: "overview" | "courses" | "students" | "revenue" | "traffic"
  ) => void;
  exportReport: (format: "pdf" | "csv" | "excel") => Promise<void>;
  refresh: () => Promise<void>;
}

export function useInstructorAnalyticsPresenter(
  initialViewModel?: InstructorAnalyticsViewModel
): [InstructorAnalyticsPresenterState, InstructorAnalyticsPresenterActions] {
  const { user } = useAuthStore();
  const [viewModel, setViewModel] =
    useState<InstructorAnalyticsViewModel | null>(initialViewModel || null);
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);
  const [engagementDays, setEngagementDays] = useState<7 | 14 | 30>(7);
  const [revenueMonths, setRevenueMonths] = useState<3 | 6 | 12>(6);
  const [selectedTab, setSelectedTab] = useState<
    "overview" | "courses" | "students" | "revenue" | "traffic"
  >("overview");

  // Load data function
  const loadData = useCallback(async () => {
    if (!user?.userId) {
      setError("กรุณาเข้าสู่ระบบก่อน");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = await InstructorAnalyticsPresenter.getViewModel(
        user.userId,
        {
          engagementDays,
          revenueMonths,
        }
      );

      setViewModel(data);
    } catch (err) {
      console.error("Error loading instructor analytics:", err);
      setError(
        err instanceof Error ? err.message : "เกิดข้อผิดพลาดในการโหลดข้อมูล"
      );
    } finally {
      setLoading(false);
    }
  }, [user?.userId, engagementDays, revenueMonths]);

  // Set engagement days
  const handleSetEngagementDays = useCallback((days: 7 | 14 | 30) => {
    setEngagementDays(days);
  }, []);

  // Set revenue months
  const handleSetRevenueMonths = useCallback((months: 3 | 6 | 12) => {
    setRevenueMonths(months);
  }, []);

  // Set selected tab
  const handleSetSelectedTab = useCallback(
    (tab: "overview" | "courses" | "students" | "revenue" | "traffic") => {
      setSelectedTab(tab);
    },
    []
  );

  // Export report
  const exportReport = useCallback(
    async (format: "pdf" | "csv" | "excel") => {
      if (!user?.userId) {
        setError("กรุณาเข้าสู่ระบบก่อน");
        return;
      }

      try {
        setLoading(true);
        setError(null);

        await InstructorAnalyticsPresenter.exportReport(user.userId, format);

        // Show success message (in real app, this would trigger download)
        alert(`กำลังดาวน์โหลดรายงานในรูปแบบ ${format.toUpperCase()}`);
      } catch (err) {
        console.error("Error exporting report:", err);
        setError(
          err instanceof Error
            ? err.message
            : "เกิดข้อผิดพลาดในการส่งออกรายงาน"
        );
      } finally {
        setLoading(false);
      }
    },
    [user?.userId]
  );

  // Refresh data
  const refresh = useCallback(async () => {
    await loadData();
  }, [loadData]);

  // Initial load
  useEffect(() => {
    if (!initialViewModel) {
      loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reload when options change
  useEffect(() => {
    if (initialViewModel) return;

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [engagementDays, revenueMonths, user?.userId]);

  const state: InstructorAnalyticsPresenterState = {
    viewModel,
    loading,
    error,
    engagementDays,
    revenueMonths,
    selectedTab,
  };

  const actions: InstructorAnalyticsPresenterActions = {
    loadData,
    setEngagementDays: handleSetEngagementDays,
    setRevenueMonths: handleSetRevenueMonths,
    setSelectedTab: handleSetSelectedTab,
    exportReport,
    refresh,
  };

  return [state, actions];
}

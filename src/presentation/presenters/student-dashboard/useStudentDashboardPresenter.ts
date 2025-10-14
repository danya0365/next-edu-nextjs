"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../stores/authStore";
import {
  ClientStudentDashboardPresenterFactory,
  type StudentDashboardViewModel,
} from "./StudentDashboardPresenter";

export function useStudentDashboardPresenter(
  initialViewModel?: StudentDashboardViewModel
) {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();
  const [viewModel, setViewModel] = useState<StudentDashboardViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);

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
        const data = await ClientStudentDashboardPresenterFactory.create(
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

  // Refresh data
  const refresh = async () => {
    if (!user?.userId) return;

    try {
      setLoading(true);
      setError(null);
      const data = await ClientStudentDashboardPresenterFactory.create(
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

  return {
    viewModel,
    loading,
    error,
    refresh,
  };
}

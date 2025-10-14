"use client";

import { useAuthStore } from "@/src/presentation/stores/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  InstructorDashboardPresenterFactory,
  type InstructorDashboardViewModel,
} from "./InstructorDashboardPresenter";

export function useInstructorDashboardPresenter(
  initialViewModel?: InstructorDashboardViewModel
) {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();
  const [viewModel, setViewModel] =
    useState<InstructorDashboardViewModel | null>(initialViewModel || null);
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);

  // Check authentication
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (!user?.id || initialViewModel) return;

    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const presenter =
          await InstructorDashboardPresenterFactory.createClient();
        const data = await presenter.getViewModel(user.id);
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
  }, [user?.id, initialViewModel]);

  const refresh = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      setError(null);
      const presenter =
        await InstructorDashboardPresenterFactory.createClient();
      const data = await presenter.getViewModel(user.id);
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

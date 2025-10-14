"use client";

import { useAuthStore } from "@/src/presentation/stores/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  MyCoursesPresenterFactory,
  type CourseFilter,
  type MyCoursesViewModel,
} from "./MyCoursesPresenter";

export function useMyCoursesPresenter(initialViewModel?: MyCoursesViewModel) {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();
  const [viewModel, setViewModel] = useState<MyCoursesViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<CourseFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Check authentication
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // Load data
  const loadData = async (newFilter?: CourseFilter) => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      const presenter = await MyCoursesPresenterFactory.createClient();
      const data = await presenter.getViewModel(
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
    if (!user || initialViewModel) return;
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Change filter
  const changeFilter = async (newFilter: CourseFilter) => {
    setFilter(newFilter);
    await loadData(newFilter);
  };

  // Filter by search
  const filteredCourses =
    viewModel?.courses.filter((course) => {
      if (!searchQuery) return true;
      return (
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructorName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }) || [];

  // Refresh
  const refresh = async () => {
    await loadData();
  };

  return {
    viewModel,
    loading,
    error,
    filter,
    changeFilter,
    searchQuery,
    setSearchQuery,
    filteredCourses,
    refresh,
  };
}

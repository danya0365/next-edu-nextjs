"use client";

import { useAuthStore } from "@/src/presentation/stores/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  WishlistPresenterFactory,
  type WishlistCourse,
  type WishlistViewModel,
} from "./WishlistPresenter";

export function useWishlistPresenter(initialViewModel?: WishlistViewModel) {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();
  const [viewModel, setViewModel] = useState<WishlistViewModel | null>(
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

  useEffect(() => {
    if (!user || initialViewModel) return;

    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const presenter = await WishlistPresenterFactory.createClient();
        const data = await presenter.getViewModel(user.userId);
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
  }, [user, initialViewModel]);

  // Remove from wishlist (mock)
  const removeFromWishlist = (courseId: string) => {
    if (!viewModel) return;

    setViewModel({
      ...viewModel,
      courses: viewModel.courses.filter((c) => c.id !== courseId),
      totalCourses: viewModel.totalCourses - 1,
    });
  };

  // Start learning (mock - redirect to course detail)
  const startLearning = (course: WishlistCourse) => {
    // In production, this would enroll the user
    window.location.href = `/courses/${course.slug}`;
  };

  return {
    viewModel,
    loading,
    error,
    removeFromWishlist,
    startLearning,
  };
}

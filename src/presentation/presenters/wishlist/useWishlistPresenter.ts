'use client';

import { useState, useEffect } from 'react';
import {
  ClientWishlistPresenterFactory,
  type WishlistViewModel,
  type WishlistCourse,
} from './WishlistPresenter';

export function useWishlistPresenter(initialViewModel?: WishlistViewModel, userId?: string) {
  const [viewModel, setViewModel] = useState<WishlistViewModel | null>(initialViewModel || null);
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId || initialViewModel) return;

    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await ClientWishlistPresenterFactory.create(userId);
        setViewModel(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการโหลดข้อมูล');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [userId, initialViewModel]);

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

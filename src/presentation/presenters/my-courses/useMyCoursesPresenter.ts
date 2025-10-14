'use client';

import { useState, useEffect } from 'react';
import {
  ClientMyCoursesPresenterFactory,
  type MyCoursesViewModel,
  type CourseFilter,
} from './MyCoursesPresenter';

export function useMyCoursesPresenter(
  initialViewModel?: MyCoursesViewModel,
  userId?: string
) {
  const [viewModel, setViewModel] = useState<MyCoursesViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<CourseFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Load data
  const loadData = async (newFilter?: CourseFilter) => {
    if (!userId) return;

    try {
      setLoading(true);
      setError(null);
      const data = await ClientMyCoursesPresenterFactory.create(userId, newFilter || filter);
      setViewModel(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการโหลดข้อมูล');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userId || initialViewModel) return;
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  // Change filter
  const changeFilter = async (newFilter: CourseFilter) => {
    setFilter(newFilter);
    await loadData(newFilter);
  };

  // Filter by search
  const filteredCourses = viewModel?.courses.filter((course) => {
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

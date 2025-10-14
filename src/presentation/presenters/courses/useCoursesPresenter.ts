import { useCallback, useEffect, useState } from 'react';
import {
  CoursesViewModel,
  CoursesFilters,
  CoursesPresenter,
  CoursesPresenterFactory,
} from './CoursesPresenter';

let presenterInstance: CoursesPresenter | null = null;

const getPresenter = async () => {
  if (!presenterInstance) {
    presenterInstance = await CoursesPresenterFactory.create();
  }
  return presenterInstance;
};

export interface CoursesPresenterHook {
  // State
  viewModel: CoursesViewModel | null;
  loading: boolean;
  error: string | null;

  // Filters and pagination
  filters: CoursesFilters;
  currentPage: number;

  // Actions
  loadData: () => Promise<void>;
  setFilters: (filters: CoursesFilters) => void;
  setCurrentPage: (page: number) => void;
  clearFilters: () => void;
}

/**
 * Custom hook for Courses presenter
 * Provides state management and actions for Courses operations
 */
export function useCoursesPresenter(
  initialViewModel: CoursesViewModel | null = null,
  initialFilters: CoursesFilters = {},
  initialPage: number = 1
): CoursesPresenterHook {
  const [viewModel, setViewModel] = useState<CoursesViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filters and pagination
  const [filters, setFiltersState] = useState<CoursesFilters>(initialFilters);
  const [currentPage, setCurrentPageState] = useState(initialPage);

  /**
   * Load data from presenter
   */
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const presenter = await getPresenter();
      const newViewModel = await presenter.getViewModel(filters, currentPage, 12);
      setViewModel(newViewModel);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      console.error('Error loading courses data:', err);
    } finally {
      setLoading(false);
    }
  }, [filters, currentPage]);

  /**
   * Set filters and reset to page 1
   */
  const setFilters = useCallback((newFilters: CoursesFilters) => {
    setFiltersState(newFilters);
    setCurrentPageState(1); // Reset to first page when filters change
  }, []);

  /**
   * Set current page
   */
  const setCurrentPage = useCallback((page: number) => {
    setCurrentPageState(page);
  }, []);

  /**
   * Clear all filters
   */
  const clearFilters = useCallback(() => {
    setFiltersState({});
    setCurrentPageState(1);
  }, []);

  /**
   * Load data when filters or page changes
   */
  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    viewModel,
    loading,
    error,
    filters,
    currentPage,
    loadData,
    setFilters,
    setCurrentPage,
    clearFilters,
  };
}

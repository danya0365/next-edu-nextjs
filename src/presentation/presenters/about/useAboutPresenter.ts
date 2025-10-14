'use client';

import { useState, useEffect } from 'react';
import { ClientAboutPresenterFactory, type AboutViewModel } from './AboutPresenter';

export function useAboutPresenter(initialViewModel?: AboutViewModel) {
  const [viewModel, setViewModel] = useState<AboutViewModel | null>(initialViewModel || null);
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialViewModel) return;

    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await ClientAboutPresenterFactory.create();
        setViewModel(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการโหลดข้อมูล');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [initialViewModel]);

  return {
    viewModel,
    loading,
    error,
  };
}

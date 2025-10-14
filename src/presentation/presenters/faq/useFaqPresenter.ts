'use client';

import { useState, useEffect } from 'react';
import { ClientFaqPresenterFactory, type FaqViewModel } from './FaqPresenter';

export function useFaqPresenter(initialViewModel?: FaqViewModel) {
  const [viewModel, setViewModel] = useState<FaqViewModel | null>(initialViewModel || null);
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaqs, setExpandedFaqs] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (initialViewModel) return;

    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await ClientFaqPresenterFactory.create();
        setViewModel(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการโหลดข้อมูล');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [initialViewModel]);

  const toggleFaq = (faqId: string) => {
    setExpandedFaqs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(faqId)) {
        newSet.delete(faqId);
      } else {
        newSet.add(faqId);
      }
      return newSet;
    });
  };

  const filteredFaqs = viewModel?.faqs.filter((faq) => {
    const matchesCategory = selectedCategory === 'all' || faq.categoryId === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }) || [];

  return {
    viewModel,
    loading,
    error,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    expandedFaqs,
    toggleFaq,
    filteredFaqs,
  };
}

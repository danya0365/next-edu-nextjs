'use client';

import { useState, useEffect } from 'react';
import { ClientContactPresenterFactory, type ContactViewModel } from './ContactPresenter';

export function useContactPresenter(initialViewModel?: ContactViewModel) {
  const [viewModel, setViewModel] = useState<ContactViewModel | null>(initialViewModel || null);
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialViewModel) return;

    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await ClientContactPresenterFactory.create();
        setViewModel(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการโหลดข้อมูล');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [initialViewModel]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    try {
      setSubmitting(true);
      // TODO: Send form data to backend
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call
      
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset submitted state after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      alert('เกิดข้อผิดพลาดในการส่งข้อความ กรุณาลองใหม่อีกครั้ง');
    } finally {
      setSubmitting(false);
    }
  };

  return {
    viewModel,
    loading,
    error,
    formData,
    submitting,
    submitted,
    handleInputChange,
    handleSubmit,
  };
}

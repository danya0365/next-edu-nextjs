'use client';

import { useState, useEffect } from 'react';
import {
  ClientCertificatesPresenterFactory,
  type CertificatesViewModel,
  type CertificateItem,
} from './CertificatesPresenter';

export function useCertificatesPresenter(
  initialViewModel?: CertificatesViewModel,
  userId?: string
) {
  const [viewModel, setViewModel] = useState<CertificatesViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!userId || initialViewModel) return;

    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await ClientCertificatesPresenterFactory.create(userId);
        setViewModel(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการโหลดข้อมูล');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [userId, initialViewModel]);

  // Filter by search
  const filteredCertificates = viewModel?.certificates.filter((cert) => {
    if (!searchQuery) return true;
    return (
      cert.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.certificateNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }) || [];

  // Download certificate (mock)
  const downloadCertificate = (certificate: CertificateItem) => {
    // TODO: Implement actual certificate download
    alert(`กำลังดาวน์โหลดใบประกาศนียบัตร ${certificate.certificateNumber}`);
  };

  // Share certificate (mock)
  const shareCertificate = (certificate: CertificateItem) => {
    // TODO: Implement actual sharing
    if (navigator.share) {
      navigator.share({
        title: `ใบประกาศนียบัตร - ${certificate.courseName}`,
        text: `ฉันเพิ่งจบคอร์ส ${certificate.courseName} จาก Next Edu!`,
        url: window.location.href,
      });
    } else {
      alert('แชร์ใบประกาศนียบัตรไปยัง social media');
    }
  };

  return {
    viewModel,
    loading,
    error,
    selectedCertificate,
    setSelectedCertificate,
    searchQuery,
    setSearchQuery,
    filteredCertificates,
    downloadCertificate,
    shareCertificate,
  };
}

"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuthStore } from "../../stores/authStore";
import {
  InstructorReviewsPresenter,
  type InstructorReviewsViewModel,
} from "./InstructorReviewsPresenter";

export interface InstructorReviewsPresenterState {
  viewModel: InstructorReviewsViewModel | null;
  loading: boolean;
  error: string | null;
  selectedRating: number | null;
  selectedStatus: "all" | "published" | "pending";
  selectedReviewId: string | null;
  isReplyModalOpen: boolean;
  isReportModalOpen: boolean;
  searchQuery: string;
}

export interface InstructorReviewsPresenterActions {
  loadData: () => Promise<void>;
  filterByRating: (rating: number | null) => void;
  filterByStatus: (status: "all" | "published" | "pending") => void;
  setSearchQuery: (query: string) => void;
  replyToReview: (reviewId: string, message: string) => Promise<void>;
  publishReview: (reviewId: string) => Promise<void>;
  unpublishReview: (reviewId: string) => Promise<void>;
  reportReview: (reviewId: string, reason: string) => Promise<void>;
  openReplyModal: (reviewId: string) => void;
  closeReplyModal: () => void;
  openReportModal: (reviewId: string) => void;
  closeReportModal: () => void;
  refresh: () => Promise<void>;
}

export function useInstructorReviewsPresenter(
  initialViewModel?: InstructorReviewsViewModel
): [InstructorReviewsPresenterState, InstructorReviewsPresenterActions] {
  const { user } = useAuthStore();
  const [viewModel, setViewModel] =
    useState<InstructorReviewsViewModel | null>(initialViewModel || null);
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<
    "all" | "published" | "pending"
  >("all");
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Load data function
  const loadData = useCallback(async () => {
    if (!user?.userId) {
      setError("กรุณาเข้าสู่ระบบก่อน");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const filters: {
        rating?: number;
        isPublished?: boolean;
      } = {};

      if (selectedRating !== null) {
        filters.rating = selectedRating;
      }

      if (selectedStatus === "published") {
        filters.isPublished = true;
      } else if (selectedStatus === "pending") {
        filters.isPublished = false;
      }

      const data = await InstructorReviewsPresenter.getViewModel(
        user.userId,
        filters
      );

      setViewModel(data);
    } catch (err) {
      console.error("Error loading instructor reviews:", err);
      setError(
        err instanceof Error ? err.message : "เกิดข้อผิดพลาดในการโหลดข้อมูล"
      );
    } finally {
      setLoading(false);
    }
  }, [user?.userId, selectedRating, selectedStatus]);

  // Filter by rating
  const filterByRating = useCallback((rating: number | null) => {
    setSelectedRating(rating);
  }, []);

  // Filter by status
  const filterByStatus = useCallback(
    (status: "all" | "published" | "pending") => {
      setSelectedStatus(status);
    },
    []
  );

  // Reply to review
  const replyToReview = useCallback(
    async (reviewId: string, message: string) => {
      if (!user?.userId) {
        setError("กรุณาเข้าสู่ระบบก่อน");
        return;
      }

      try {
        setLoading(true);
        setError(null);

        await InstructorReviewsPresenter.replyToReview(
          reviewId,
          user.userId,
          message
        );

        // Reload data
        await loadData();

        // Close modal
        setIsReplyModalOpen(false);
        setSelectedReviewId(null);
      } catch (err) {
        console.error("Error replying to review:", err);
        setError(
          err instanceof Error ? err.message : "เกิดข้อผิดพลาดในการตอบกลับ"
        );
      } finally {
        setLoading(false);
      }
    },
    [user?.userId, loadData]
  );

  // Publish review
  const publishReview = useCallback(
    async (reviewId: string) => {
      if (!user?.userId) {
        setError("กรุณาเข้าสู่ระบบก่อน");
        return;
      }

      try {
        setLoading(true);
        setError(null);

        await InstructorReviewsPresenter.publishReview(reviewId, user.userId);

        // Reload data
        await loadData();
      } catch (err) {
        console.error("Error publishing review:", err);
        setError(
          err instanceof Error
            ? err.message
            : "เกิดข้อผิดพลาดในการเผยแพร่รีวิว"
        );
      } finally {
        setLoading(false);
      }
    },
    [user?.userId, loadData]
  );

  // Unpublish review
  const unpublishReview = useCallback(
    async (reviewId: string) => {
      if (!user?.userId) {
        setError("กรุณาเข้าสู่ระบบก่อน");
        return;
      }

      try {
        setLoading(true);
        setError(null);

        await InstructorReviewsPresenter.unpublishReview(reviewId, user.userId);

        // Reload data
        await loadData();
      } catch (err) {
        console.error("Error unpublishing review:", err);
        setError(
          err instanceof Error
            ? err.message
            : "เกิดข้อผิดพลาดในการยกเลิกเผยแพร่รีวิว"
        );
      } finally {
        setLoading(false);
      }
    },
    [user?.userId, loadData]
  );

  // Report review
  const reportReview = useCallback(
    async (reviewId: string, reason: string) => {
      if (!user?.userId) {
        setError("กรุณาเข้าสู่ระบบก่อน");
        return;
      }

      try {
        setLoading(true);
        setError(null);

        await InstructorReviewsPresenter.reportReview(
          reviewId,
          user.userId,
          reason
        );

        // Reload data
        await loadData();

        // Close modal
        setIsReportModalOpen(false);
        setSelectedReviewId(null);
      } catch (err) {
        console.error("Error reporting review:", err);
        setError(
          err instanceof Error ? err.message : "เกิดข้อผิดพลาดในการรายงาน"
        );
      } finally {
        setLoading(false);
      }
    },
    [user?.userId, loadData]
  );

  // Modal actions
  const openReplyModal = useCallback((reviewId: string) => {
    setSelectedReviewId(reviewId);
    setIsReplyModalOpen(true);
  }, []);

  const closeReplyModal = useCallback(() => {
    setIsReplyModalOpen(false);
    setSelectedReviewId(null);
  }, []);

  const openReportModal = useCallback((reviewId: string) => {
    setSelectedReviewId(reviewId);
    setIsReportModalOpen(true);
  }, []);

  const closeReportModal = useCallback(() => {
    setIsReportModalOpen(false);
    setSelectedReviewId(null);
  }, []);

  // Refresh data
  const refresh = useCallback(async () => {
    await loadData();
  }, [loadData]);

  // Initial load
  useEffect(() => {
    if (!initialViewModel) {
      loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reload when filters change
  useEffect(() => {
    if (initialViewModel) return;

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRating, selectedStatus, user?.userId]);

  const state: InstructorReviewsPresenterState = {
    viewModel,
    loading,
    error,
    selectedRating,
    selectedStatus,
    selectedReviewId,
    isReplyModalOpen,
    isReportModalOpen,
    searchQuery,
  };

  const actions: InstructorReviewsPresenterActions = {
    loadData,
    filterByRating,
    filterByStatus,
    setSearchQuery,
    replyToReview,
    publishReview,
    unpublishReview,
    reportReview,
    openReplyModal,
    closeReplyModal,
    openReportModal,
    closeReportModal,
    refresh,
  };

  return [state, actions];
}

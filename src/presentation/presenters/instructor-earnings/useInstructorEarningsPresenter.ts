"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuthStore } from "../../stores/authStore";
import {
  InstructorEarningsPresenter,
  type InstructorEarningsViewModel,
} from "./InstructorEarningsPresenter";

export interface InstructorEarningsPresenterState {
  viewModel: InstructorEarningsViewModel | null;
  loading: boolean;
  error: string | null;
  selectedType: "all" | "sale" | "refund" | "withdrawal" | "bonus";
  selectedStatus: "all" | "completed" | "pending" | "processing" | "failed";
  isWithdrawalModalOpen: boolean;
  selectedPeriod: "all" | "month" | "quarter" | "year";
}

export interface InstructorEarningsPresenterActions {
  loadData: () => Promise<void>;
  filterByType: (
    type: "all" | "sale" | "refund" | "withdrawal" | "bonus"
  ) => void;
  filterByStatus: (
    status: "all" | "completed" | "pending" | "processing" | "failed"
  ) => void;
  setPeriod: (period: "all" | "month" | "quarter" | "year") => void;
  requestWithdrawal: (amount: number, bankAccount: string) => Promise<void>;
  openWithdrawalModal: () => void;
  closeWithdrawalModal: () => void;
  refresh: () => Promise<void>;
}

export function useInstructorEarningsPresenter(
  initialViewModel?: InstructorEarningsViewModel
): [InstructorEarningsPresenterState, InstructorEarningsPresenterActions] {
  const { user } = useAuthStore();
  const [viewModel, setViewModel] =
    useState<InstructorEarningsViewModel | null>(initialViewModel || null);
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<
    "all" | "sale" | "refund" | "withdrawal" | "bonus"
  >("all");
  const [selectedStatus, setSelectedStatus] = useState<
    "all" | "completed" | "pending" | "processing" | "failed"
  >("all");
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<
    "all" | "month" | "quarter" | "year"
  >("all");

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
        type?: "sale" | "refund" | "withdrawal" | "bonus";
        status?: "completed" | "pending" | "processing" | "failed";
      } = {};

      if (selectedType !== "all") {
        filters.type = selectedType;
      }

      if (selectedStatus !== "all") {
        filters.status = selectedStatus;
      }

      const data = await InstructorEarningsPresenter.getViewModel(
        user.userId,
        filters
      );

      setViewModel(data);
    } catch (err) {
      console.error("Error loading instructor earnings:", err);
      setError(
        err instanceof Error ? err.message : "เกิดข้อผิดพลาดในการโหลดข้อมูล"
      );
    } finally {
      setLoading(false);
    }
  }, [user?.userId, selectedType, selectedStatus]);

  // Filter by type
  const filterByType = useCallback(
    (type: "all" | "sale" | "refund" | "withdrawal" | "bonus") => {
      setSelectedType(type);
    },
    []
  );

  // Filter by status
  const filterByStatus = useCallback(
    (status: "all" | "completed" | "pending" | "processing" | "failed") => {
      setSelectedStatus(status);
    },
    []
  );

  // Set period
  const setPeriod = useCallback(
    (period: "all" | "month" | "quarter" | "year") => {
      setSelectedPeriod(period);
    },
    []
  );

  // Request withdrawal
  const requestWithdrawal = useCallback(
    async (amount: number, bankAccount: string) => {
      if (!user?.userId) {
        setError("กรุณาเข้าสู่ระบบก่อน");
        return;
      }

      try {
        setLoading(true);
        setError(null);

        await InstructorEarningsPresenter.requestWithdrawal(
          user.userId,
          amount,
          bankAccount
        );

        // Reload data
        await loadData();

        // Close modal
        setIsWithdrawalModalOpen(false);
      } catch (err) {
        console.error("Error requesting withdrawal:", err);
        setError(
          err instanceof Error
            ? err.message
            : "เกิดข้อผิดพลาดในการขอถอนเงิน"
        );
      } finally {
        setLoading(false);
      }
    },
    [user?.userId, loadData]
  );

  // Modal actions
  const openWithdrawalModal = useCallback(() => {
    setIsWithdrawalModalOpen(true);
  }, []);

  const closeWithdrawalModal = useCallback(() => {
    setIsWithdrawalModalOpen(false);
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
  }, [selectedType, selectedStatus, user?.userId]);

  const state: InstructorEarningsPresenterState = {
    viewModel,
    loading,
    error,
    selectedType,
    selectedStatus,
    isWithdrawalModalOpen,
    selectedPeriod,
  };

  const actions: InstructorEarningsPresenterActions = {
    loadData,
    filterByType,
    filterByStatus,
    setPeriod,
    requestWithdrawal,
    openWithdrawalModal,
    closeWithdrawalModal,
    refresh,
  };

  return [state, actions];
}

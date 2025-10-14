"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuthStore } from "../../stores/authStore";
import {
  InstructorStudentsPresenter,
  type InstructorStudentsViewModel,
} from "./InstructorStudentsPresenter";

export interface InstructorStudentsPresenterState {
  viewModel: InstructorStudentsViewModel | null;
  loading: boolean;
  error: string | null;
  selectedStatus: "active" | "inactive" | "suspended" | null;
  selectedStudentId: string | null;
  isMessageModalOpen: boolean;
  isSuspendModalOpen: boolean;
  searchQuery: string;
}

export interface InstructorStudentsPresenterActions {
  loadData: () => Promise<void>;
  filterByStatus: (status: "active" | "inactive" | "suspended" | null) => void;
  setSearchQuery: (query: string) => void;
  sendMessage: (studentId: string, message: string) => Promise<void>;
  suspendStudent: (studentId: string) => Promise<void>;
  activateStudent: (studentId: string) => Promise<void>;
  openMessageModal: (studentId: string) => void;
  closeMessageModal: () => void;
  openSuspendModal: (studentId: string) => void;
  closeSuspendModal: () => void;
  refresh: () => Promise<void>;
}

export function useInstructorStudentsPresenter(
  initialViewModel?: InstructorStudentsViewModel
): [InstructorStudentsPresenterState, InstructorStudentsPresenterActions] {
  const { user } = useAuthStore();
  const [viewModel, setViewModel] =
    useState<InstructorStudentsViewModel | null>(initialViewModel || null);
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<
    "active" | "inactive" | "suspended" | null
  >(null);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
    null
  );
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);
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

      const data = await InstructorStudentsPresenter.getViewModel(
        user.userId,
        selectedStatus || undefined
      );

      setViewModel(data);
    } catch (err) {
      console.error("Error loading instructor students:", err);
      setError(
        err instanceof Error ? err.message : "เกิดข้อผิดพลาดในการโหลดข้อมูล"
      );
    } finally {
      setLoading(false);
    }
  }, [user?.userId, selectedStatus]);

  // Filter by status
  const filterByStatus = useCallback(
    (status: "active" | "inactive" | "suspended" | null) => {
      setSelectedStatus(status);
    },
    []
  );

  // Send message to student
  const sendMessage = useCallback(
    async (studentId: string, message: string) => {
      if (!user?.userId) {
        setError("กรุณาเข้าสู่ระบบก่อน");
        return;
      }

      try {
        setLoading(true);
        setError(null);

        await InstructorStudentsPresenter.sendMessage(
          studentId,
          user.userId,
          message
        );

        // Close modal
        setIsMessageModalOpen(false);
        setSelectedStudentId(null);
      } catch (err) {
        console.error("Error sending message:", err);
        setError(
          err instanceof Error
            ? err.message
            : "เกิดข้อผิดพลาดในการส่งข้อความ"
        );
      } finally {
        setLoading(false);
      }
    },
    [user?.userId]
  );

  // Suspend student
  const suspendStudent = useCallback(
    async (studentId: string) => {
      if (!user?.userId) {
        setError("กรุณาเข้าสู่ระบบก่อน");
        return;
      }

      try {
        setLoading(true);
        setError(null);

        await InstructorStudentsPresenter.suspendStudent(
          studentId,
          user.userId
        );

        // Reload data
        await loadData();

        // Close modal
        setIsSuspendModalOpen(false);
        setSelectedStudentId(null);
      } catch (err) {
        console.error("Error suspending student:", err);
        setError(
          err instanceof Error
            ? err.message
            : "เกิดข้อผิดพลาดในการระงับนักเรียน"
        );
      } finally {
        setLoading(false);
      }
    },
    [user?.userId, loadData]
  );

  // Activate student
  const activateStudent = useCallback(
    async (studentId: string) => {
      if (!user?.userId) {
        setError("กรุณาเข้าสู่ระบบก่อน");
        return;
      }

      try {
        setLoading(true);
        setError(null);

        await InstructorStudentsPresenter.activateStudent(
          studentId,
          user.userId
        );

        // Reload data
        await loadData();
      } catch (err) {
        console.error("Error activating student:", err);
        setError(
          err instanceof Error
            ? err.message
            : "เกิดข้อผิดพลาดในการเปิดใช้งานนักเรียน"
        );
      } finally {
        setLoading(false);
      }
    },
    [user?.userId, loadData]
  );

  // Modal actions
  const openMessageModal = useCallback((studentId: string) => {
    setSelectedStudentId(studentId);
    setIsMessageModalOpen(true);
  }, []);

  const closeMessageModal = useCallback(() => {
    setIsMessageModalOpen(false);
    setSelectedStudentId(null);
  }, []);

  const openSuspendModal = useCallback((studentId: string) => {
    setSelectedStudentId(studentId);
    setIsSuspendModalOpen(true);
  }, []);

  const closeSuspendModal = useCallback(() => {
    setIsSuspendModalOpen(false);
    setSelectedStudentId(null);
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

  // Reload when status filter changes
  useEffect(() => {
    if (initialViewModel) return;

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStatus, user?.userId]);

  const state: InstructorStudentsPresenterState = {
    viewModel,
    loading,
    error,
    selectedStatus,
    selectedStudentId,
    isMessageModalOpen,
    isSuspendModalOpen,
    searchQuery,
  };

  const actions: InstructorStudentsPresenterActions = {
    loadData,
    filterByStatus,
    setSearchQuery,
    sendMessage,
    suspendStudent,
    activateStudent,
    openMessageModal,
    closeMessageModal,
    openSuspendModal,
    closeSuspendModal,
    refresh,
  };

  return [state, actions];
}

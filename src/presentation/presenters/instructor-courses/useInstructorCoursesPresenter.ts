"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuthStore } from "../../stores/authStore";
import {
  InstructorCoursesPresenter,
  type InstructorCoursesViewModel,
} from "./InstructorCoursesPresenter";

export interface InstructorCoursesPresenterState {
  viewModel: InstructorCoursesViewModel | null;
  loading: boolean;
  error: string | null;
  selectedStatus: "draft" | "published" | "archived" | null;
  selectedCourseId: string | null;
  isDeleteModalOpen: boolean;
  isArchiveModalOpen: boolean;
}

export interface InstructorCoursesPresenterActions {
  loadData: () => Promise<void>;
  filterByStatus: (status: "draft" | "published" | "archived" | null) => void;
  deleteCourse: (courseId: string) => Promise<void>;
  archiveCourse: (courseId: string) => Promise<void>;
  publishCourse: (courseId: string) => Promise<void>;
  unpublishCourse: (courseId: string) => Promise<void>;
  openDeleteModal: (courseId: string) => void;
  closeDeleteModal: () => void;
  openArchiveModal: (courseId: string) => void;
  closeArchiveModal: () => void;
  refresh: () => Promise<void>;
}

export function useInstructorCoursesPresenter(
  initialViewModel?: InstructorCoursesViewModel
): [InstructorCoursesPresenterState, InstructorCoursesPresenterActions] {
  const { user } = useAuthStore();
  const [viewModel, setViewModel] = useState<InstructorCoursesViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<
    "draft" | "published" | "archived" | null
  >(null);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);

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

      const data = await InstructorCoursesPresenter.getViewModel(
        user.userId,
        selectedStatus || undefined
      );

      setViewModel(data);
    } catch (err) {
      console.error("Error loading instructor courses:", err);
      setError(
        err instanceof Error ? err.message : "เกิดข้อผิดพลาดในการโหลดข้อมูล"
      );
    } finally {
      setLoading(false);
    }
  }, [user?.userId, selectedStatus]);

  // Filter by status
  const filterByStatus = useCallback(
    (status: "draft" | "published" | "archived" | null) => {
      setSelectedStatus(status);
    },
    []
  );

  // Delete course
  const deleteCourse = useCallback(
    async (courseId: string) => {
      if (!user?.userId) {
        setError("กรุณาเข้าสู่ระบบก่อน");
        return;
      }

      try {
        setLoading(true);
        setError(null);

        await InstructorCoursesPresenter.deleteCourse(courseId, user.userId);

        // Reload data
        await loadData();

        // Close modal
        setIsDeleteModalOpen(false);
        setSelectedCourseId(null);
      } catch (err) {
        console.error("Error deleting course:", err);
        setError(
          err instanceof Error ? err.message : "เกิดข้อผิดพลาดในการลบคอร์ส"
        );
      } finally {
        setLoading(false);
      }
    },
    [user?.userId, loadData]
  );

  // Archive course
  const archiveCourse = useCallback(
    async (courseId: string) => {
      if (!user?.userId) {
        setError("กรุณาเข้าสู่ระบบก่อน");
        return;
      }

      try {
        setLoading(true);
        setError(null);

        await InstructorCoursesPresenter.archiveCourse(courseId, user.userId);

        // Reload data
        await loadData();

        // Close modal
        setIsArchiveModalOpen(false);
        setSelectedCourseId(null);
      } catch (err) {
        console.error("Error archiving course:", err);
        setError(
          err instanceof Error
            ? err.message
            : "เกิดข้อผิดพลาดในการเก็บถาวรคอร์ส"
        );
      } finally {
        setLoading(false);
      }
    },
    [user?.userId, loadData]
  );

  // Publish course
  const publishCourse = useCallback(
    async (courseId: string) => {
      if (!user?.userId) {
        setError("กรุณาเข้าสู่ระบบก่อน");
        return;
      }

      try {
        setLoading(true);
        setError(null);

        await InstructorCoursesPresenter.publishCourse(courseId, user.userId);

        // Reload data
        await loadData();
      } catch (err) {
        console.error("Error publishing course:", err);
        setError(
          err instanceof Error
            ? err.message
            : "เกิดข้อผิดพลาดในการเผยแพร่คอร์ส"
        );
      } finally {
        setLoading(false);
      }
    },
    [user?.userId, loadData]
  );

  // Unpublish course
  const unpublishCourse = useCallback(
    async (courseId: string) => {
      if (!user?.userId) {
        setError("กรุณาเข้าสู่ระบบก่อน");
        return;
      }

      try {
        setLoading(true);
        setError(null);

        await InstructorCoursesPresenter.unpublishCourse(courseId, user.userId);

        // Reload data
        await loadData();
      } catch (err) {
        console.error("Error unpublishing course:", err);
        setError(
          err instanceof Error
            ? err.message
            : "เกิดข้อผิดพลาดในการยกเลิกเผยแพร่คอร์ส"
        );
      } finally {
        setLoading(false);
      }
    },
    [user?.userId, loadData]
  );

  // Modal actions
  const openDeleteModal = useCallback((courseId: string) => {
    setSelectedCourseId(courseId);
    setIsDeleteModalOpen(true);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false);
    setSelectedCourseId(null);
  }, []);

  const openArchiveModal = useCallback((courseId: string) => {
    setSelectedCourseId(courseId);
    setIsArchiveModalOpen(true);
  }, []);

  const closeArchiveModal = useCallback(() => {
    setIsArchiveModalOpen(false);
    setSelectedCourseId(null);
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

  const state: InstructorCoursesPresenterState = {
    viewModel,
    loading,
    error,
    selectedStatus,
    selectedCourseId,
    isDeleteModalOpen,
    isArchiveModalOpen,
  };

  const actions: InstructorCoursesPresenterActions = {
    loadData,
    filterByStatus,
    deleteCourse,
    archiveCourse,
    publishCourse,
    unpublishCourse,
    openDeleteModal,
    closeDeleteModal,
    openArchiveModal,
    closeArchiveModal,
    refresh,
  };

  return [state, actions];
}

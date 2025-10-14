"use client";

import { useCallback, useEffect, useState } from "react";
import {
  LiveClassesViewModel,
  LiveClassesPresenterFactory,
} from "./LiveClassesPresenter";

// Initialize presenter instance once (singleton pattern)
const presenter = LiveClassesPresenterFactory.createClient();

export interface LiveClassesPresenterState {
  viewModel: LiveClassesViewModel | null;
  loading: boolean;
  error: string | null;
  isJoinModalOpen: boolean;
  isRegisterModalOpen: boolean;
  selectedLiveClassId: string | null;
  selectedCategory: string | null;
  selectedStatus: "upcoming" | "live" | "ended" | null;
  searchQuery: string;
}

export interface LiveClassesPresenterActions {
  loadData: (
    category?: string,
    status?: "upcoming" | "live" | "ended"
  ) => Promise<void>;
  joinLiveClass: (liveClassId: string) => Promise<void>;
  registerForLiveClass: (liveClassId: string) => Promise<void>;
  watchRecording: (liveClassId: string) => Promise<void>;
  openJoinModal: (liveClassId: string) => void;
  closeJoinModal: () => void;
  openRegisterModal: (liveClassId: string) => void;
  closeRegisterModal: () => void;
  setSelectedCategory: (category: string | null) => void;
  setSelectedStatus: (status: "upcoming" | "live" | "ended" | null) => void;
  setSearchQuery: (query: string) => void;
  setError: (error: string | null) => void;
}

/**
 * Custom hook for Live Classes presenter
 * Provides state management and actions for Live Classes operations
 */
export function useLiveClassesPresenter(
  initialViewModel?: LiveClassesViewModel
): [LiveClassesPresenterState, LiveClassesPresenterActions] {
  const [viewModel, setViewModel] = useState<LiveClassesViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);

  // Modal states
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [selectedLiveClassId, setSelectedLiveClassId] = useState<string | null>(
    null
  );

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<
    "upcoming" | "live" | "ended" | null
  >(null);
  const [searchQuery, setSearchQuery] = useState("");

  /**
   * Load data from presenter
   */
  const loadData = useCallback(
    async (category?: string, status?: "upcoming" | "live" | "ended") => {
      setLoading(true);
      setError(null);

      try {
        const newViewModel = await presenter.getViewModel(category, status);
        setViewModel(newViewModel);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        console.error("Error loading live classes data:", err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /**
   * Join a live class
   */
  const joinLiveClass = useCallback(
    async (liveClassId: string) => {
      setLoading(true);
      setError(null);

      try {
        await presenter.joinLiveClass(liveClassId);
        setIsJoinModalOpen(false);
        // In real app, redirect to live stream
        console.log("Redirecting to live stream...");
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        console.error("Error joining live class:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /**
   * Register for a live class
   */
  const registerForLiveClass = useCallback(
    async (liveClassId: string) => {
      setLoading(true);
      setError(null);

      try {
        await presenter.registerForLiveClass(liveClassId);
        setIsRegisterModalOpen(false);
        await loadData(selectedCategory || undefined, selectedStatus || undefined);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        console.error("Error registering for live class:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [loadData, selectedCategory, selectedStatus]
  );

  /**
   * Watch recording
   */
  const watchRecording = useCallback(async (liveClassId: string) => {
    setError(null);

    try {
      const recordingUrl = await presenter.watchRecording(liveClassId);
      if (recordingUrl) {
        // In real app, redirect to recording player
        console.log("Opening recording:", recordingUrl);
        window.open(recordingUrl, "_blank");
      } else {
        setError("ไม่พบการบันทึกวิดีโอ");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("Error watching recording:", err);
      throw err;
    }
  }, []);

  // Modal actions
  const openJoinModal = useCallback((liveClassId: string) => {
    setSelectedLiveClassId(liveClassId);
    setIsJoinModalOpen(true);
    setError(null);
  }, []);

  const closeJoinModal = useCallback(() => {
    setIsJoinModalOpen(false);
    setSelectedLiveClassId(null);
    setError(null);
  }, []);

  const openRegisterModal = useCallback((liveClassId: string) => {
    setSelectedLiveClassId(liveClassId);
    setIsRegisterModalOpen(true);
    setError(null);
  }, []);

  const closeRegisterModal = useCallback(() => {
    setIsRegisterModalOpen(false);
    setSelectedLiveClassId(null);
    setError(null);
  }, []);

  // Filter actions
  const handleSetSelectedCategory = useCallback(
    (category: string | null) => {
      setSelectedCategory(category);
      loadData(category || undefined, selectedStatus || undefined);
    },
    [loadData, selectedStatus]
  );

  const handleSetSelectedStatus = useCallback(
    (status: "upcoming" | "live" | "ended" | null) => {
      setSelectedStatus(status);
      loadData(selectedCategory || undefined, status || undefined);
    },
    [loadData, selectedCategory]
  );

  const handleSetSearchQuery = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // Load data on mount
  useEffect(() => {
    if (!initialViewModel) {
      loadData();
    }
  }, [initialViewModel, loadData]);

  return [
    {
      viewModel,
      loading,
      error,
      isJoinModalOpen,
      isRegisterModalOpen,
      selectedLiveClassId,
      selectedCategory,
      selectedStatus,
      searchQuery,
    },
    {
      loadData,
      joinLiveClass,
      registerForLiveClass,
      watchRecording,
      openJoinModal,
      closeJoinModal,
      openRegisterModal,
      closeRegisterModal,
      setSelectedCategory: handleSetSelectedCategory,
      setSelectedStatus: handleSetSelectedStatus,
      setSearchQuery: handleSetSearchQuery,
      setError,
    },
  ];
}

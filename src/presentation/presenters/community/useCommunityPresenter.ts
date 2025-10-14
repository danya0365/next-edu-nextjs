"use client";

import { useCallback, useEffect, useState } from "react";
import { CommunityViewModel, CommunityPresenterFactory } from "./CommunityPresenter";
import type { Post } from "@/src/data/mock/posts.mock";

// Initialize presenter instance once (singleton pattern)
const presenter = CommunityPresenterFactory.createClient();

export interface CommunityPresenterState {
  viewModel: CommunityViewModel | null;
  loading: boolean;
  error: string | null;
  isCreatePostModalOpen: boolean;
  isPostDetailModalOpen: boolean;
  selectedPostId: string | null;
  selectedCategory: string | null;
  searchQuery: string;
}

export interface CommunityPresenterActions {
  loadData: (category?: string) => Promise<void>;
  likePost: (postId: string) => Promise<void>;
  createPost: (data: {
    title: string;
    content: string;
    category: string;
    type: string;
    tags: string[];
  }) => Promise<void>;
  createComment: (data: {
    postId: string;
    content: string;
    parentId?: string;
  }) => Promise<void>;
  openCreatePostModal: () => void;
  closeCreatePostModal: () => void;
  openPostDetailModal: (postId: string) => void;
  closePostDetailModal: () => void;
  setSelectedCategory: (category: string | null) => void;
  setSearchQuery: (query: string) => void;
  setError: (error: string | null) => void;
}

/**
 * Custom hook for Community presenter
 * Provides state management and actions for Community operations
 */
export function useCommunityPresenter(
  initialViewModel?: CommunityViewModel
): [CommunityPresenterState, CommunityPresenterActions] {
  const [viewModel, setViewModel] = useState<CommunityViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);

  // Modal states
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [isPostDetailModalOpen, setIsPostDetailModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  /**
   * Load data from presenter
   */
  const loadData = useCallback(async (category?: string) => {
    setLoading(true);
    setError(null);

    try {
      const newViewModel = await presenter.getViewModel(category);
      setViewModel(newViewModel);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("Error loading community data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Like a post
   */
  const likePost = useCallback(
    async (postId: string) => {
      try {
        await presenter.likePost(postId);
        // Reload data to reflect changes
        await loadData(selectedCategory || undefined);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        console.error("Error liking post:", err);
        throw err;
      }
    },
    [loadData, selectedCategory]
  );

  /**
   * Create a new post
   */
  const createPost = useCallback(
    async (data: {
      title: string;
      content: string;
      category: string;
      type: string;
      tags: string[];
    }) => {
      setLoading(true);
      setError(null);

      try {
        await presenter.createPost(data);
        setIsCreatePostModalOpen(false);
        await loadData(selectedCategory || undefined);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        console.error("Error creating post:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [loadData, selectedCategory]
  );

  /**
   * Create a new comment
   */
  const createComment = useCallback(
    async (data: { postId: string; content: string; parentId?: string }) => {
      try {
        await presenter.createComment(data);
        // Reload data to reflect changes
        await loadData(selectedCategory || undefined);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        console.error("Error creating comment:", err);
        throw err;
      }
    },
    [loadData, selectedCategory]
  );

  // Modal actions
  const openCreatePostModal = useCallback(() => {
    setIsCreatePostModalOpen(true);
    setError(null);
  }, []);

  const closeCreatePostModal = useCallback(() => {
    setIsCreatePostModalOpen(false);
    setError(null);
  }, []);

  const openPostDetailModal = useCallback((postId: string) => {
    setSelectedPostId(postId);
    setIsPostDetailModalOpen(true);
    setError(null);
  }, []);

  const closePostDetailModal = useCallback(() => {
    setIsPostDetailModalOpen(false);
    setSelectedPostId(null);
    setError(null);
  }, []);

  // Filter actions
  const handleSetSelectedCategory = useCallback(
    (category: string | null) => {
      setSelectedCategory(category);
      loadData(category || undefined);
    },
    [loadData]
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
      isCreatePostModalOpen,
      isPostDetailModalOpen,
      selectedPostId,
      selectedCategory,
      searchQuery,
    },
    {
      loadData,
      likePost,
      createPost,
      createComment,
      openCreatePostModal,
      closeCreatePostModal,
      openPostDetailModal,
      closePostDetailModal,
      setSelectedCategory: handleSetSelectedCategory,
      setSearchQuery: handleSetSearchQuery,
      setError,
    },
  ];
}

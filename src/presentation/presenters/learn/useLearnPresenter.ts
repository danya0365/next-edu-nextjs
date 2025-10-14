"use client";

import { useAuthStore } from "@/src/presentation/stores/authStore";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  LearnPresenter,
  LearnPresenterFactory,
  LearnViewModel,
} from "./LearnPresenter";

let presenterInstance: LearnPresenter | null = null;

const getPresenter = async () => {
  if (!presenterInstance) {
    presenterInstance = await LearnPresenterFactory.create();
  }
  return presenterInstance;
};

export interface LearnPresenterHook {
  viewModel: LearnViewModel | null;
  loading: boolean;
  error: string | null;

  // Video player state
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  playbackRate: number;

  // Actions
  togglePlay: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  setPlaybackRate: (rate: number) => void;
  markComplete: () => Promise<void>;
  goToNextLesson: () => void;
  goToPreviousLesson: () => void;
}

/**
 * Custom hook for Learn presenter
 */
export function useLearnPresenter(
  initialViewModel: LearnViewModel | null = null,
  courseId: string = "",
  lessonId?: string
): LearnPresenterHook {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();
  const [viewModel] = useState<LearnViewModel | null>(initialViewModel || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Video player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(1);
  const [playbackRate, setPlaybackRateState] = useState(1);

  // Check authentication
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  /**
   * Toggle play/pause
   */
  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  /**
   * Seek to specific time
   */
  const seek = useCallback((time: number) => {
    setCurrentTime(time);
  }, []);

  /**
   * Set volume
   */
  const setVolume = useCallback((vol: number) => {
    setVolumeState(Math.max(0, Math.min(1, vol)));
  }, []);

  /**
   * Set playback rate
   */
  const setPlaybackRate = useCallback((rate: number) => {
    setPlaybackRateState(rate);
  }, []);

  /**
   * Mark lesson as complete
   */
  const markComplete = useCallback(async () => {
    if (!user?.userId || !viewModel?.currentLesson) return;

    setLoading(true);
    setError(null);

    try {
      const presenter = await getPresenter();
      await presenter.markLessonComplete(courseId, viewModel.currentLesson.id);

      // In real app, refresh data here
      console.log("Lesson marked as complete");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("Error marking lesson complete:", err);
    } finally {
      setLoading(false);
    }
  }, [viewModel, courseId, user?.userId]);

  /**
   * Go to next lesson
   */
  const goToNextLesson = useCallback(() => {
    if (viewModel?.nextLesson) {
      window.location.href = `/learn/${courseId}?lesson=${viewModel.nextLesson.id}`;
    }
  }, [viewModel, courseId]);

  /**
   * Go to previous lesson
   */
  const goToPreviousLesson = useCallback(() => {
    if (viewModel?.previousLesson) {
      window.location.href = `/learn/${courseId}?lesson=${viewModel.previousLesson.id}`;
    }
  }, [viewModel, courseId]);

  return {
    viewModel,
    loading,
    error,
    isPlaying,
    currentTime,
    duration,
    volume,
    playbackRate,
    togglePlay,
    seek,
    setVolume,
    setPlaybackRate,
    markComplete,
    goToNextLesson,
    goToPreviousLesson,
  };
}

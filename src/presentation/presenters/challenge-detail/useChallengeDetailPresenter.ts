"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuthStore } from "../../stores/authStore";
import {
  ChallengeDetailPresenter,
  type ChallengeDetailViewModel,
} from "./ChallengeDetailPresenter";

export interface ChallengeDetailPresenterState {
  viewModel: ChallengeDetailViewModel | null;
  loading: boolean;
  error: string | null;
  isJoining: boolean;
  isCompletingTask: boolean;
}

export interface ChallengeDetailPresenterActions {
  loadData: () => Promise<void>;
  joinChallenge: () => Promise<void>;
  completeTask: (taskId: string) => Promise<void>;
  refresh: () => Promise<void>;
}

export function useChallengeDetailPresenter(
  challengeId: string,
  initialViewModel?: ChallengeDetailViewModel
): [ChallengeDetailPresenterState, ChallengeDetailPresenterActions] {
  const { user } = useAuthStore();
  const [viewModel, setViewModel] = useState<ChallengeDetailViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);
  const [isJoining, setIsJoining] = useState(false);
  const [isCompletingTask, setIsCompletingTask] = useState(false);

  // Load data function
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await ChallengeDetailPresenter.getViewModel(
        challengeId,
        user?.userId
      );

      setViewModel(data);
    } catch (err) {
      console.error("Error loading challenge detail:", err);
      setError(
        err instanceof Error ? err.message : "เกิดข้อผิดพลาดในการโหลดข้อมูล"
      );
    } finally {
      setLoading(false);
    }
  }, [challengeId, user?.userId]);

  // Join challenge
  const joinChallenge = useCallback(async () => {
    if (!user?.userId) {
      setError("กรุณาเข้าสู่ระบบก่อนเข้าร่วมความท้าทาย");
      return;
    }

    try {
      setIsJoining(true);
      setError(null);

      await ChallengeDetailPresenter.joinChallenge(challengeId, user.userId);

      // Update local state immediately for better UX
      if (viewModel && !viewModel.userProgress) {
        const updatedViewModel = {
          ...viewModel,
          userProgress: {
            challengeId,
            userId: user.userId,
            status: "in_progress" as const,
            progress: 0,
            completedTasks: [],
            earnedPoints: 0,
            earnedXp: 0,
            startedAt: new Date().toISOString(),
          },
        };
        setViewModel(updatedViewModel);
      }
    } catch (err) {
      console.error("Error joining challenge:", err);
      setError(
        err instanceof Error
          ? err.message
          : "เกิดข้อผิดพลาดในการเข้าร่วมความท้าทาย"
      );
    } finally {
      setIsJoining(false);
    }
  }, [challengeId, user?.userId, viewModel]);

  // Complete task
  const completeTask = useCallback(
    async (taskId: string) => {
      if (!user?.userId) {
        setError("กรุณาเข้าสู่ระบบก่อนทำงาน");
        return;
      }

      try {
        setIsCompletingTask(true);
        setError(null);

        await ChallengeDetailPresenter.completeTask(
          challengeId,
          taskId,
          user.userId
        );

        // Update local state immediately for better UX
        if (viewModel) {
          const updatedViewModel = { ...viewModel };
          
          // Update or create user progress
          if (!updatedViewModel.userProgress) {
            updatedViewModel.userProgress = {
              challengeId,
              userId: user.userId,
              status: "in_progress",
              progress: 0,
              completedTasks: [],
              earnedPoints: 0,
              earnedXp: 0,
              startedAt: new Date().toISOString(),
            };
          }

          // Add task to completed tasks if not already there
          if (!updatedViewModel.userProgress.completedTasks.includes(taskId)) {
            updatedViewModel.userProgress.completedTasks = [
              ...updatedViewModel.userProgress.completedTasks,
              taskId,
            ];

            // Find the task to get points
            const task = viewModel.challenge.tasks.find((t) => t.id === taskId);
            if (task) {
              updatedViewModel.userProgress.earnedPoints += task.points;
            }

            // Calculate new progress
            const totalTasks = viewModel.challenge.tasks.length;
            const completedCount = updatedViewModel.userProgress.completedTasks.length;
            updatedViewModel.userProgress.progress = Math.round(
              (completedCount / totalTasks) * 100
            );

            // Check if all tasks completed
            if (completedCount === totalTasks) {
              updatedViewModel.userProgress.status = "completed";
              updatedViewModel.userProgress.completedAt = new Date().toISOString();
            }
          }

          setViewModel(updatedViewModel);
        }
      } catch (err) {
        console.error("Error completing task:", err);
        setError(
          err instanceof Error
            ? err.message
            : "เกิดข้อผิดพลาดในการทำงานให้เสร็จ"
        );
      } finally {
        setIsCompletingTask(false);
      }
    },
    [challengeId, user?.userId, viewModel]
  );

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

  // Reload when user changes
  useEffect(() => {
    if (initialViewModel) return;

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.userId]);

  const state: ChallengeDetailPresenterState = {
    viewModel,
    loading,
    error,
    isJoining,
    isCompletingTask,
  };

  const actions: ChallengeDetailPresenterActions = {
    loadData,
    joinChallenge,
    completeTask,
    refresh,
  };

  return [state, actions];
}

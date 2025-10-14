import {
  getChallengeById,
  getUserChallengeProgress,
  type Challenge,
  type UserChallengeProgress,
} from "@/src/data/mock/challenges.mock";
import type { Metadata } from "next";

export interface ChallengeDetailViewModel {
  challenge: Challenge;
  userProgress?: UserChallengeProgress;
  completionRate: number;
  estimatedTime: number;
  relatedChallenges: Challenge[];
}

export class ChallengeDetailPresenter {
  /**
   * Get view model for challenge detail
   */
  static async getViewModel(
    challengeId: string,
    userId?: string
  ): Promise<ChallengeDetailViewModel> {
    console.log("ChallengeDetailPresenter.getViewModel", {
      challengeId,
      userId,
    });

    // Get challenge by ID
    const challenge = getChallengeById(challengeId);

    if (!challenge) {
      throw new Error(`Challenge not found: ${challengeId}`);
    }

    // Get user progress if userId provided
    const userProgress = userId
      ? getUserChallengeProgress(userId, challengeId)
      : undefined;

    // Calculate completion rate
    const completionRate =
      challenge.participants > 0
        ? Math.round((challenge.completions / challenge.participants) * 100)
        : 0;

    // Calculate estimated time (sum of all tasks)
    const estimatedTime = challenge.tasks.reduce(
      (sum, task) => sum + task.estimatedTime,
      0
    );

    // Get related challenges (same category, different challenge)
    const relatedChallenges = await this.getRelatedChallenges(
      challenge.category,
      challengeId
    );

    return {
      challenge,
      userProgress,
      completionRate,
      estimatedTime,
      relatedChallenges,
    };
  }

  /**
   * Get related challenges
   */
  private static async getRelatedChallenges(
    category: string,
    excludeId: string
  ): Promise<Challenge[]> {
    const { getChallengesByCategory } = await import(
      "@/src/data/mock/challenges.mock"
    );

    return getChallengesByCategory(category)
      .filter((c) => c.id !== excludeId)
      .slice(0, 3);
  }

  /**
   * Join challenge (mock implementation)
   */
  static async joinChallenge(
    challengeId: string,
    userId: string
  ): Promise<boolean> {
    console.log("Joining challenge:", { challengeId, userId });
    // In real app, this would create a user_challenge record
    return true;
  }

  /**
   * Complete task (mock implementation)
   */
  static async completeTask(
    challengeId: string,
    taskId: string,
    userId: string
  ): Promise<boolean> {
    console.log("Completing task:", { challengeId, taskId, userId });
    // In real app, this would update user_challenge_progress
    return true;
  }

  /**
   * Generate metadata for SEO
   */
  static async generateMetadata(challengeId: string): Promise<Metadata> {
    try {
      const challenge = getChallengeById(challengeId);

      if (!challenge) {
        return {
          title: "ไม่พบความท้าทาย | Next Edu",
          description: "ไม่พบความท้าทายที่คุณกำลังค้นหา",
        };
      }

      return {
        title: `${challenge.title} | Next Edu`,
        description: challenge.description,
        openGraph: {
          title: challenge.title,
          description: challenge.description,
          type: "website",
          images: challenge.thumbnail ? [challenge.thumbnail] : [],
        },
        twitter: {
          card: "summary_large_image",
          title: challenge.title,
          description: challenge.description,
          images: challenge.thumbnail ? [challenge.thumbnail] : [],
        },
      };
    } catch (error) {
      console.error("Error generating metadata:", error);
      return {
        title: "ความท้าทาย | Next Edu",
        description: "ทดสอบความสามารถและรับรางวัลมากมาย",
      };
    }
  }
}

// Server-side factory
export class ServerChallengeDetailPresenterFactory {
  static async create(): Promise<ChallengeDetailPresenter> {
    return new ChallengeDetailPresenter();
  }
}

// Client-side factory
export class ClientChallengeDetailPresenterFactory {
  static async create(): Promise<ChallengeDetailPresenter> {
    return new ChallengeDetailPresenter();
  }
}

// Export factory for convenience
export const ChallengeDetailPresenterFactory = {
  createServer: ServerChallengeDetailPresenterFactory.create,
  createClient: ClientChallengeDetailPresenterFactory.create,
};

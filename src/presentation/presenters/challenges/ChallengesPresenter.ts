import {
  MOCK_CHALLENGES,
  MOCK_USER_CHALLENGE_PROGRESS,
  type Challenge,
  type UserChallengeProgress,
} from "@/src/data/mock/challenges.mock";
import type { Metadata } from "next";

export interface ChallengeWithProgress extends Challenge {
  userProgress?: UserChallengeProgress;
}

export interface ChallengesStats {
  totalChallenges: number;
  activeChallenges: number;
  completedChallenges: number;
  inProgressChallenges: number;
  totalPointsEarned: number;
  totalXpEarned: number;
}

export interface ChallengesViewModel {
  challenges: ChallengeWithProgress[];
  stats: ChallengesStats;
  categories: Array<{
    id: string;
    name: string;
    count: number;
  }>;
  difficulties: Array<{
    id: string;
    name: string;
    count: number;
  }>;
}

export class ChallengesPresenter {
  /**
   * Get challenges view model
   */
  static async getViewModel(
    userId?: string,
    category?: string,
    difficulty?: string,
    status?: "upcoming" | "active" | "ended"
  ): Promise<ChallengesViewModel> {
    console.log("ChallengesPresenter.getViewModel", {
      userId,
      category,
      difficulty,
      status,
    });

    // Filter challenges
    let challenges = [...MOCK_CHALLENGES];

    if (category) {
      challenges = challenges.filter((c) => c.category === category);
    }

    if (difficulty) {
      challenges = challenges.filter((c) => c.difficulty === difficulty);
    }

    if (status) {
      challenges = challenges.filter((c) => c.status === status);
    }

    // Get user progress if userId provided
    const challengesWithProgress: ChallengeWithProgress[] = challenges.map(
      (challenge) => {
        if (!userId) return challenge;

        const userProgress = MOCK_USER_CHALLENGE_PROGRESS.find(
          (p) => p.userId === userId && p.challengeId === challenge.id
        );

        return {
          ...challenge,
          userProgress,
        };
      }
    );

    // Calculate stats
    const userProgress = userId
      ? MOCK_USER_CHALLENGE_PROGRESS.filter((p) => p.userId === userId)
      : [];

    const stats: ChallengesStats = {
      totalChallenges: MOCK_CHALLENGES.length,
      activeChallenges: MOCK_CHALLENGES.filter((c) => c.status === "active")
        .length,
      completedChallenges: userProgress.filter((p) => p.status === "completed")
        .length,
      inProgressChallenges: userProgress.filter(
        (p) => p.status === "in_progress"
      ).length,
      totalPointsEarned: userProgress.reduce(
        (sum, p) => sum + p.earnedPoints,
        0
      ),
      totalXpEarned: userProgress.reduce((sum, p) => sum + p.earnedXp, 0),
    };

    // Get categories with counts
    const categoryMap = new Map<string, number>();
    MOCK_CHALLENGES.forEach((challenge) => {
      const count = categoryMap.get(challenge.category) || 0;
      categoryMap.set(challenge.category, count + 1);
    });

    const categories = Array.from(categoryMap.entries()).map(
      ([id, count]) => ({
        id,
        name: this.getCategoryName(id),
        count,
      })
    );

    // Get difficulties with counts
    const difficultyMap = new Map<string, number>();
    MOCK_CHALLENGES.forEach((challenge) => {
      const count = difficultyMap.get(challenge.difficulty) || 0;
      difficultyMap.set(challenge.difficulty, count + 1);
    });

    const difficulties = Array.from(difficultyMap.entries()).map(
      ([id, count]) => ({
        id,
        name: this.getDifficultyName(id),
        count,
      })
    );

    return {
      challenges: challengesWithProgress,
      stats,
      categories,
      difficulties,
    };
  }

  /**
   * Get category name
   */
  private static getCategoryName(categoryId: string): string {
    const categoryNames: Record<string, string> = {
      programming: "โปรแกรมมิ่ง",
      art: "ศิลปะ",
      math: "คณิตศาสตร์",
      science: "วิทยาศาสตร์",
      music: "ดนตรี",
      language: "ภาษา",
    };
    return categoryNames[categoryId] || categoryId;
  }

  /**
   * Get difficulty name
   */
  private static getDifficultyName(difficultyId: string): string {
    const difficultyNames: Record<string, string> = {
      easy: "ง่าย",
      medium: "ปานกลาง",
      hard: "ยาก",
      expert: "ผู้เชี่ยวชาญ",
    };
    return difficultyNames[difficultyId] || difficultyId;
  }

  /**
   * Generate metadata for SEO
   */
  static async generateMetadata(
    category?: string,
    difficulty?: string,
    status?: string
  ): Promise<Metadata> {
    let title = "ความท้าทาย | Next Edu";
    let description = "ทดสอบความสามารถและรับรางวัลมากมาย";

    if (category) {
      const categoryName = this.getCategoryName(category);
      title = `ความท้าทาย${categoryName} | Next Edu`;
      description = `ความท้าทายด้าน${categoryName} สำหรับนักเรียน`;
    }

    if (difficulty) {
      const difficultyName = this.getDifficultyName(difficulty);
      title = `ความท้าทายระดับ${difficultyName} | Next Edu`;
    }

    if (status === "active") {
      title = "ความท้าทายที่กำลังเปิดรับ | Next Edu";
      description = "ความท้าทายที่กำลังเปิดรับสมัครอยู่ในขณะนี้";
    }

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
    };
  }
}

// Server-side factory
export class ServerChallengesPresenterFactory {
  static async create(): Promise<ChallengesPresenter> {
    return new ChallengesPresenter();
  }
}

// Client-side factory
export class ClientChallengesPresenterFactory {
  static async create(): Promise<ChallengesPresenter> {
    return new ChallengesPresenter();
  }
}

// Export factory for convenience
export const ChallengesPresenterFactory = {
  createServer: ServerChallengesPresenterFactory.create,
  createClient: ClientChallengesPresenterFactory.create,
};

import { achievements } from "@/src/data/mock/achievements.mock";
import { students } from "@/src/data/mock/students.mock";

export interface AchievementItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  points: number;
  rarity: "common" | "rare" | "epic" | "legendary";
  isUnlocked: boolean;
  unlockedAt?: string;
  progress?: number; // 0-100
  requirement: string;
}

export interface AchievementStats {
  totalPoints: number;
  currentLevel: number;
  unlockedCount: number;
  totalCount: number;
  nextLevelPoints: number;
  levelProgress: number;
}

export interface AchievementsViewModel {
  stats: AchievementStats;
  achievements: AchievementItem[];
  rarityCount: {
    common: number;
    rare: number;
    epic: number;
    legendary: number;
  };
}

export class AchievementsPresenter {
  static async getViewModel(userId: string): Promise<AchievementsViewModel> {
    console.log("AchievementsPresenter.getViewModel", userId);
    // Get student data
    const student = students.find((s) => s.userId === userId);

    if (!student) {
      console.log("Student not found", students, userId);
      throw new Error("Student not found");
    }

    // Calculate stats
    const totalPoints = student.points;
    const currentLevel = student.level;
    const nextLevelPoints = currentLevel * 1000;
    const levelProgress = (totalPoints % 1000) / 10;

    const stats: AchievementStats = {
      totalPoints,
      currentLevel,
      unlockedCount: student.achievements.length,
      totalCount: achievements.length,
      nextLevelPoints,
      levelProgress,
    };

    // Map achievements with unlock status
    const achievementItems: AchievementItem[] = achievements.map(
      (achievement) => {
        const isUnlocked = student.achievements.includes(achievement.id);

        return {
          id: achievement.id,
          name: achievement.name,
          description: achievement.description,
          icon: achievement.icon,
          color: achievement.color,
          points: achievement.points,
          rarity: achievement.rarity,
          isUnlocked,
          unlockedAt: isUnlocked ? new Date().toISOString() : undefined, // TODO: Get from user_achievements
          progress: isUnlocked
            ? 100
            : this.calculateProgress(achievement.requirement, student),
          requirement: achievement.requirement,
        };
      }
    );

    // Count achievements by rarity
    const rarityCount = {
      common: achievementItems.filter(
        (a) => a.rarity === "common" && a.isUnlocked
      ).length,
      rare: achievementItems.filter((a) => a.rarity === "rare" && a.isUnlocked)
        .length,
      epic: achievementItems.filter((a) => a.rarity === "epic" && a.isUnlocked)
        .length,
      legendary: achievementItems.filter(
        (a) => a.rarity === "legendary" && a.isUnlocked
      ).length,
    };

    return {
      stats,
      achievements: achievementItems,
      rarityCount,
    };
  }

  private static calculateProgress(
    requirement: string,
    student: { completedCourses: string[] }
  ): number {
    // Simple progress calculation based on requirement
    // TODO: Implement proper progress tracking
    if (requirement.includes("Complete") && requirement.includes("courses")) {
      const match = requirement.match(/\d+/);
      if (match) {
        const required = parseInt(match[0]);
        const current = student.completedCourses.length;
        return Math.min((current / required) * 100, 100);
      }
    }
    return 0;
  }
}

// Server-side factory
export class ServerAchievementsPresenterFactory {
  static async create(userId: string): Promise<AchievementsViewModel> {
    return AchievementsPresenter.getViewModel(userId);
  }
}

// Client-side factory
export class ClientAchievementsPresenterFactory {
  static async create(userId: string): Promise<AchievementsViewModel> {
    return AchievementsPresenter.getViewModel(userId);
  }
}

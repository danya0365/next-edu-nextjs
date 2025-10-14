import { students } from '@/src/data/mock/students.mock';

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  displayName: string;
  avatar: string;
  level: number;
  points: number;
  completedCourses: number;
  streak: number;
  isCurrentUser: boolean;
}

export interface LeaderboardViewModel {
  topThree: LeaderboardEntry[];
  leaderboard: LeaderboardEntry[];
  currentUserRank: LeaderboardEntry | null;
  totalPlayers: number;
}

export type LeaderboardFilter = 'all-time' | 'this-month' | 'this-week';

export class LeaderboardPresenter {
  static async getViewModel(
    userId: string,
    filter: LeaderboardFilter = 'all-time'
  ): Promise<LeaderboardViewModel> {
    // Sort students by points (descending)
    const sortedStudents = [...students].sort((a, b) => b.points - a.points);

    // Map to leaderboard entries with ranks
    const leaderboardEntries: LeaderboardEntry[] = sortedStudents.map((student, index) => ({
      rank: index + 1,
      userId: student.userId,
      displayName: student.displayName,
      avatar: student.avatar,
      level: student.level,
      points: student.points,
      completedCourses: student.completedCourses.length,
      streak: student.streak,
      isCurrentUser: student.userId === userId,
    }));

    // Get top 3
    const topThree = leaderboardEntries.slice(0, 3);

    // Get current user rank
    const currentUserRank = leaderboardEntries.find((entry) => entry.isCurrentUser) || null;

    // Filter based on time period (mock implementation)
    // TODO: Implement actual time-based filtering when we have timestamp data
    let filteredLeaderboard = leaderboardEntries;
    if (filter === 'this-month' || filter === 'this-week') {
      // For now, just return the same data
      // In production, filter based on points earned in the time period
      filteredLeaderboard = leaderboardEntries;
    }

    return {
      topThree,
      leaderboard: filteredLeaderboard,
      currentUserRank,
      totalPlayers: sortedStudents.length,
    };
  }
}

// Server-side factory
export class ServerLeaderboardPresenterFactory {
  static async create(
    userId: string,
    filter: LeaderboardFilter = 'all-time'
  ): Promise<LeaderboardViewModel> {
    return LeaderboardPresenter.getViewModel(userId, filter);
  }
}

// Client-side factory
export class ClientLeaderboardPresenterFactory {
  static async create(
    userId: string,
    filter: LeaderboardFilter = 'all-time'
  ): Promise<LeaderboardViewModel> {
    return LeaderboardPresenter.getViewModel(userId, filter);
  }
}

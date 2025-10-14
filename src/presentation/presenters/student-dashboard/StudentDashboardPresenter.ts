import { achievements } from "@/src/data/mock/achievements.mock";
import { courses } from "@/src/data/mock/courses.mock";
import { enrollments } from "@/src/data/mock/enrollments.mock";
import { instructors } from "@/src/data/mock/instructors.mock";
import { students } from "@/src/data/mock/students.mock";

export interface DashboardStats {
  enrolledCourses: number;
  completedCourses: number;
  totalLearningTime: number;
  currentStreak: number;
  totalPoints: number;
  currentLevel: number;
}

export interface ContinueLearningCourse {
  id: string;
  slug: string;
  title: string;
  thumbnail: string;
  instructorName: string;
  instructorAvatar: string;
  progress: number;
  currentLessonTitle: string;
  lastAccessedAt: string;
}

export interface RecommendedCourse {
  id: string;
  slug: string;
  title: string;
  thumbnail: string;
  instructorName: string;
  instructorAvatar: string;
  categoryName: string;
  rating: number;
  studentCount: number;
  price: number;
  level: string;
}

export interface RecentAchievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  points: number;
  unlockedAt: string;
  rarity: "common" | "rare" | "epic" | "legendary";
}

export interface StudentDashboardViewModel {
  stats: DashboardStats;
  continueLearning: ContinueLearningCourse[];
  recommendedCourses: RecommendedCourse[];
  recentAchievements: RecentAchievement[];
}

export class StudentDashboardPresenter {
  static async getViewModel(
    userId: string
  ): Promise<StudentDashboardViewModel> {
    console.log("StudentDashboardPresenter.getViewModel", userId);
    // Get student data
    const student = students.find((s) => s.userId === userId);
    if (!student) {
      console.log("Student not found", students, userId);
      throw new Error("Student not found");
    }

    // Get enrollments
    const studentEnrollments = enrollments.filter(
      (e) => e.studentId === student.id
    );

    // Calculate stats
    const stats: DashboardStats = {
      enrolledCourses: student.enrolledCourses.length,
      completedCourses: student.completedCourses.length,
      totalLearningTime: student.totalLearningTime,
      currentStreak: student.streak,
      totalPoints: student.points,
      currentLevel: student.level,
    };

    // Get continue learning courses (in progress, sorted by last accessed)
    const continueLearning: ContinueLearningCourse[] = studentEnrollments
      .filter(
        (e) => e.status === "active" && e.progress > 0 && e.progress < 100
      )
      .sort(
        (a, b) =>
          new Date(b.lastAccessedAt).getTime() -
          new Date(a.lastAccessedAt).getTime()
      )
      .slice(0, 3)
      .map((enrollment) => {
        const course = courses.find((c) => c.id === enrollment.courseId);
        const instructor = course
          ? instructors.find((i) => i.id === course.instructorId)
          : null;

        return {
          id: course?.id || "",
          slug: course?.slug || "",
          title: course?.title || "",
          thumbnail: course?.thumbnail || "",
          instructorName: instructor?.displayName || "",
          instructorAvatar: instructor?.avatar || "",
          progress: enrollment.progress,
          currentLessonTitle: "บทเรียนถัดไป", // TODO: Get from lessons.mock
          lastAccessedAt: enrollment.lastAccessedAt,
        };
      });

    // Get recommended courses (not enrolled, same category as enrolled courses)
    const enrolledCourseIds = student.enrolledCourses;
    const enrolledCategories = courses
      .filter((c) => enrolledCourseIds.includes(c.id))
      .map((c) => c.categoryId);

    const recommendedCourses: RecommendedCourse[] = courses
      .filter(
        (c) =>
          !enrolledCourseIds.includes(c.id) &&
          enrolledCategories.includes(c.categoryId)
      )
      .filter((c) => c.status === "published")
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4)
      .map((course) => {
        const instructor = instructors.find(
          (i) => i.id === course.instructorId
        );
        return {
          id: course.id,
          slug: course.slug,
          title: course.title,
          thumbnail: course.thumbnail,
          instructorName: instructor?.displayName || "",
          instructorAvatar: instructor?.avatar || "",
          categoryName: course.categoryId, // TODO: Get category name from master data
          rating: course.rating,
          studentCount: course.studentCount,
          price: course.price,
          level: course.levelId, // TODO: Get level name from master data
        };
      });

    // Get recent achievements (last 3 unlocked)
    const studentAchievementIds = student.achievements.slice(-3);
    const recentAchievements: RecentAchievement[] = studentAchievementIds
      .map((achievementId) => {
        const achievement = achievements.find((a) => a.id === achievementId);
        if (!achievement) return null;

        return {
          id: achievement.id,
          name: achievement.name,
          description: achievement.description,
          icon: achievement.icon,
          color: achievement.color,
          points: achievement.points,
          unlockedAt: new Date().toISOString(), // TODO: Get from user_achievements
          rarity: achievement.rarity,
        };
      })
      .filter((a): a is RecentAchievement => a !== null)
      .reverse();

    return {
      stats,
      continueLearning,
      recommendedCourses,
      recentAchievements,
    };
  }
}

// Server-side factory
export class ServerStudentDashboardPresenterFactory {
  static async create(userId: string): Promise<StudentDashboardViewModel> {
    return StudentDashboardPresenter.getViewModel(userId);
  }
}

// Client-side factory
export class ClientStudentDashboardPresenterFactory {
  static async create(userId: string): Promise<StudentDashboardViewModel> {
    return StudentDashboardPresenter.getViewModel(userId);
  }
}

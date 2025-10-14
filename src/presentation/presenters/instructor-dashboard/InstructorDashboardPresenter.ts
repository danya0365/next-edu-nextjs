import { courses } from "@/src/data/mock/courses.mock";
import { enrollments } from "@/src/data/mock/enrollments.mock";
import { instructors } from "@/src/data/mock/instructors.mock";
import { reviews } from "@/src/data/mock/reviews.mock";
import { students } from "@/src/data/mock/students.mock";

export interface InstructorStats {
  totalCourses: number;
  totalStudents: number;
  averageRating: number;
  totalRevenue: number;
  totalReviews: number;
}

export interface InstructorCourse {
  id: string;
  slug: string;
  title: string;
  thumbnail: string;
  studentCount: number;
  rating: number;
  status: string;
  revenue: number;
  lastUpdated: string;
}

export interface RecentStudent {
  id: string;
  name: string;
  avatar: string;
  courseName: string;
  enrolledAt: string;
  progress: number;
}

export interface RecentReview {
  id: string;
  studentName: string;
  studentAvatar: string;
  courseName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface InstructorDashboardViewModel {
  instructor: {
    id: string;
    displayName: string;
    email: string;
    avatar: string;
    bio: string;
    expertise: string[];
    totalStudents: number;
    totalCourses: number;
  };
  stats: InstructorStats;
  courses: InstructorCourse[];
  recentStudents: RecentStudent[];
  recentReviews: RecentReview[];
}

/**
 * Presenter for Instructor Dashboard management
 * Follows Clean Architecture with proper separation of concerns
 */
export class InstructorDashboardPresenter {
  constructor() {
    // Mock data - no supabase client needed
  }

  /**
   * Get view model for the page
   */
  async getViewModel(
    userId: string
  ): Promise<InstructorDashboardViewModel> {
    // Get instructor data
    const instructor = instructors.find((i) => i.userId === userId);
    if (!instructor) {
      throw new Error("Instructor not found");
    }

    // Get instructor courses
    const instructorCourses = courses.filter(
      (c) => c.instructorId === instructor.id
    );

    // Get enrollments for instructor courses
    const courseIds = instructorCourses.map((c) => c.id);
    const instructorEnrollments = enrollments.filter((e) =>
      courseIds.includes(e.courseId)
    );

    // Get unique students
    const uniqueStudentIds = [
      ...new Set(instructorEnrollments.map((e) => e.studentId)),
    ];

    // Get reviews for instructor courses
    const instructorReviews = reviews.filter((r) =>
      courseIds.includes(r.courseId)
    );

    // Calculate stats
    const totalRevenue = instructorCourses.reduce((sum, course) => {
      const courseEnrollments = instructorEnrollments.filter(
        (e) => e.courseId === course.id
      );
      return sum + courseEnrollments.length * course.price;
    }, 0);

    const averageRating =
      instructorReviews.length > 0
        ? instructorReviews.reduce((sum, r) => sum + r.rating, 0) /
          instructorReviews.length
        : 0;

    const stats: InstructorStats = {
      totalCourses: instructorCourses.length,
      totalStudents: uniqueStudentIds.length,
      averageRating: Math.round(averageRating * 10) / 10,
      totalRevenue,
      totalReviews: instructorReviews.length,
    };

    // Map courses with enrollment data
    const coursesWithStats: InstructorCourse[] = instructorCourses.map(
      (course) => {
        const courseEnrollments = instructorEnrollments.filter(
          (e) => e.courseId === course.id
        );
        const courseRevenue = courseEnrollments.length * course.price;

        return {
          id: course.id,
          slug: course.slug,
          title: course.title,
          thumbnail: course.thumbnail,
          studentCount: courseEnrollments.length,
          rating: course.rating,
          status: course.status,
          revenue: courseRevenue,
          lastUpdated: course.updatedAt,
        };
      }
    );

    // Sort by last updated
    coursesWithStats.sort(
      (a, b) =>
        new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
    );

    // Get recent students (last 5)
    const recentEnrollments = [...instructorEnrollments]
      .sort(
        (a, b) =>
          new Date(b.enrolledAt).getTime() - new Date(a.enrolledAt).getTime()
      )
      .slice(0, 5);

    const recentStudents: RecentStudent[] = recentEnrollments
      .map((enrollment) => {
        const student = students.find((s) => s.id === enrollment.studentId);
        const course = courses.find((c) => c.id === enrollment.courseId);

        if (!student || !course) return null;

        return {
          id: student.id,
          name: student.displayName,
          avatar: student.avatar,
          courseName: course.title,
          enrolledAt: enrollment.enrolledAt,
          progress: enrollment.progress,
        };
      })
      .filter((s): s is RecentStudent => s !== null);

    // Get recent reviews (last 5)
    const recentReviewsList = [...instructorReviews]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 5);

    const recentReviewsData: RecentReview[] = recentReviewsList
      .map((review) => {
        const student = students.find((s) => s.id === review.studentId);
        const course = courses.find((c) => c.id === review.courseId);

        if (!student || !course) return null;

        return {
          id: review.id,
          studentName: student.displayName,
          studentAvatar: student.avatar,
          courseName: course.title,
          rating: review.rating,
          comment: review.comment,
          createdAt: review.createdAt,
        };
      })
      .filter((r): r is RecentReview => r !== null);

    return {
      instructor: {
        id: instructor.id,
        displayName: instructor.displayName,
        email: `${instructor.displayName.toLowerCase()}@nextedu.com`, // Mock email
        avatar: instructor.avatar,
        bio: instructor.bio,
        expertise: instructor.expertise,
        totalStudents: instructor.studentCount,
        totalCourses: instructor.coursesCount,
      },
      stats,
      courses: coursesWithStats,
      recentStudents,
      recentReviews: recentReviewsData,
    };
  }
}

/**
 * Factory for creating InstructorDashboardPresenter instances
 */
export class InstructorDashboardPresenterFactory {
  static async createServer(): Promise<InstructorDashboardPresenter> {
    return new InstructorDashboardPresenter();
  }

  static async createClient(): Promise<InstructorDashboardPresenter> {
    return new InstructorDashboardPresenter();
  }
}

// Backward compatibility exports
export class ServerInstructorDashboardPresenterFactory {
  static async create(userId: string): Promise<InstructorDashboardViewModel> {
    const presenter = await InstructorDashboardPresenterFactory.createServer();
    return presenter.getViewModel(userId);
  }
}

export class ClientInstructorDashboardPresenterFactory {
  static async create(userId: string): Promise<InstructorDashboardViewModel> {
    const presenter = await InstructorDashboardPresenterFactory.createClient();
    return presenter.getViewModel(userId);
  }
}

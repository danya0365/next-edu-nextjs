import type { Course } from "@/src/data/mock/courses.mock";
import {
  getInstructorCourses,
  getInstructorCoursesStats,
} from "@/src/data/mock/instructor-courses.mock";
import type { Metadata } from "next";

export interface InstructorCoursesStats {
  totalCourses: number;
  publishedCourses: number;
  draftCourses: number;
  archivedCourses: number;
  totalStudents: number;
  totalRevenue: number;
  totalReviews: number;
  averageRating: number;
  averageCompletionRate: number;
}

export interface InstructorCoursesViewModel {
  courses: Course[];
  stats: InstructorCoursesStats;
  instructorId: string;
}

export class InstructorCoursesPresenter {
  /**
   * Get view model for instructor courses
   */
  static async getViewModel(
    instructorId: string,
    status?: "draft" | "published" | "archived"
  ): Promise<InstructorCoursesViewModel> {
    console.log("InstructorCoursesPresenter.getViewModel", {
      instructorId,
      status,
    });

    // Get all courses for instructor
    let courses = getInstructorCourses(instructorId);

    // Filter by status if provided
    if (status) {
      courses = courses.filter((course) => course.status === status);
    }

    // Sort by last updated (newest first)
    courses.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );

    // Get statistics
    const stats = getInstructorCoursesStats(instructorId);

    return {
      courses,
      stats: {
        ...stats,
        averageCompletionRate: 0,
        totalStudents: stats.totalStudents,
      },
      instructorId,
    };
  }

  /**
   * Delete course (mock implementation)
   */
  static async deleteCourse(
    courseId: string,
    instructorId: string
  ): Promise<boolean> {
    console.log("Deleting course:", { courseId, instructorId });
    // In real app, this would delete from database
    return true;
  }

  /**
   * Archive course (mock implementation)
   */
  static async archiveCourse(
    courseId: string,
    instructorId: string
  ): Promise<boolean> {
    console.log("Archiving course:", { courseId, instructorId });
    // In real app, this would update status to archived
    return true;
  }

  /**
   * Publish course (mock implementation)
   */
  static async publishCourse(
    courseId: string,
    instructorId: string
  ): Promise<boolean> {
    console.log("Publishing course:", { courseId, instructorId });
    // In real app, this would update status to published
    return true;
  }

  /**
   * Unpublish course (mock implementation)
   */
  static async unpublishCourse(
    courseId: string,
    instructorId: string
  ): Promise<boolean> {
    console.log("Unpublishing course:", { courseId, instructorId });
    // In real app, this would update status to draft
    return true;
  }

  /**
   * Generate metadata for SEO
   */
  static async generateMetadata(): Promise<Metadata> {
    return {
      title: "จัดการคอร์ส | Next Edu",
      description: "จัดการคอร์สเรียนของคุณ สร้าง แก้ไข และติดตามผลการเรียน",
      openGraph: {
        title: "จัดการคอร์ส | Next Edu",
        description: "จัดการคอร์สเรียนของคุณ สร้าง แก้ไข และติดตามผลการเรียน",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "จัดการคอร์ส | Next Edu",
        description: "จัดการคอร์สเรียนของคุณ สร้าง แก้ไข และติดตามผลการเรียน",
      },
    };
  }
}

// Server-side factory
export class ServerInstructorCoursesPresenterFactory {
  static async create(): Promise<InstructorCoursesPresenter> {
    return new InstructorCoursesPresenter();
  }
}

// Client-side factory
export class ClientInstructorCoursesPresenterFactory {
  static async create(): Promise<InstructorCoursesPresenter> {
    return new InstructorCoursesPresenter();
  }
}

// Export factory for convenience
export const InstructorCoursesPresenterFactory = {
  createServer: ServerInstructorCoursesPresenterFactory.create,
  createClient: ClientInstructorCoursesPresenterFactory.create,
};

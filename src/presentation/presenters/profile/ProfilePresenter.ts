import { students, type Student } from '@/src/data/mock/students.mock';
import { instructors, type Instructor } from '@/src/data/mock/instructors.mock';
import { getCourseById, courses } from '@/src/data/mock/courses.mock';
import type { Metadata } from 'next';

export interface EnrichedStudent extends Student {
  enrolledCoursesData: Array<{
    id: string;
    title: string;
    slug: string;
    thumbnail: string;
    progress?: number;
  }>;
  completedCoursesData: Array<{
    id: string;
    title: string;
    slug: string;
    thumbnail: string;
  }>;
}

export interface EnrichedInstructor extends Instructor {
  teachingCoursesData: Array<{
    id: string;
    title: string;
    slug: string;
    thumbnail: string;
    studentCount: number;
    rating: number;
    reviewCount: number;
    price: number;
    status: 'draft' | 'published' | 'archived';
  }>;
}

export interface ProfileViewModel {
  message: string;
  // Note: Student data will be fetched on client-side based on auth state
}

/**
 * Presenter for Profile page
 * Follows Clean Architecture with proper separation of concerns
 */
export class ProfilePresenter {
  /**
   * Get view model for the page
   */
  async getViewModel(): Promise<ProfileViewModel> {
    return {
      message: 'โปรไฟล์ของคุณ',
    };
  }

  /**
   * Get student data by userId
   * This is a static helper for client-side use
   */
  static getStudentData(userId: string): EnrichedStudent | null {
    const student = students.find((s) => s.userId === userId);
    
    if (!student) {
      return null;
    }

    // Enrich enrolled courses data
    const enrolledCoursesData = student.enrolledCourses
      .map((courseId) => {
        const course = getCourseById(courseId);
        if (!course) return null;
        
        return {
          id: course.id,
          title: course.title,
          slug: course.slug,
          thumbnail: course.thumbnail,
          progress: Math.floor(Math.random() * 100), // Mock progress
        };
      })
      .filter((c): c is NonNullable<typeof c> => c !== null);

    // Enrich completed courses data
    const completedCoursesData = student.completedCourses
      .map((courseId) => {
        const course = getCourseById(courseId);
        if (!course) return null;
        
        return {
          id: course.id,
          title: course.title,
          slug: course.slug,
          thumbnail: course.thumbnail,
        };
      })
      .filter((c): c is NonNullable<typeof c> => c !== null);

    return {
      ...student,
      enrolledCoursesData,
      completedCoursesData,
    };
  }

  /**
   * Get instructor data by userId
   * This is a static helper for client-side use
   */
  static getInstructorData(userId: string): EnrichedInstructor | null {
    const instructor = instructors.find((i) => i.userId === userId);
    
    if (!instructor) {
      return null;
    }

    // Get all courses taught by this instructor
    const teachingCoursesData = courses
      .filter((course) => course.instructorId === instructor.id)
      .map((course) => ({
        id: course.id,
        title: course.title,
        slug: course.slug,
        thumbnail: course.thumbnail,
        studentCount: course.studentCount,
        rating: course.rating,
        reviewCount: course.reviewCount,
        price: course.price,
        status: course.status,
      }));

    return {
      ...instructor,
      teachingCoursesData,
    };
  }

  /**
   * Generate metadata for the page
   */
  async generateMetadata(): Promise<Metadata> {
    return {
      title: 'โปรไฟล์ | Next Edu',
      description: 'จัดการโปรไฟล์และข้อมูลส่วนตัวของคุณ',
    };
  }
}

/**
 * Factory for creating ProfilePresenter instances
 */
export class ProfilePresenterFactory {
  static async create(): Promise<ProfilePresenter> {
    return new ProfilePresenter();
  }
}

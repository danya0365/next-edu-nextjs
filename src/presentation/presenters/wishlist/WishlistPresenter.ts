import { courses } from '@/src/data/mock/courses.mock';
import { students } from '@/src/data/mock/students.mock';
import { instructors } from '@/src/data/mock/instructors.mock';
import { categories } from '@/src/data/master/categories.master';
import { levels } from '@/src/data/master/levels.master';

export interface WishlistCourse {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  thumbnail: string;
  instructorName: string;
  instructorAvatar: string;
  categoryName: string;
  categoryColor: string;
  levelName: string;
  levelColor: string;
  price: number;
  discount?: {
    percentage: number;
    validUntil: string;
  };
  rating: number;
  studentCount: number;
  duration: number;
  lessonCount: number;
  isEnrolled: boolean;
}

export interface WishlistViewModel {
  courses: WishlistCourse[];
  totalCourses: number;
}

export class WishlistPresenter {
  static async getViewModel(userId: string): Promise<WishlistViewModel> {
    // Get student data
    const student = students.find((s) => s.userId === userId);
    if (!student) {
      throw new Error('Student not found');
    }

    // Mock wishlist - in production this would come from database
    // For now, get courses that are NOT enrolled
    const wishlistCourseIds = courses
      .filter((c) => !student.enrolledCourses.includes(c.id))
      .filter((c) => c.status === 'published')
      .slice(0, 5) // Mock: first 5 unenrolled courses
      .map((c) => c.id);

    // Map wishlist courses
    const wishlistCourses: WishlistCourse[] = wishlistCourseIds
      .map((courseId) => {
        const course = courses.find((c) => c.id === courseId);
        if (!course) return null;

        const instructor = instructors.find((i) => i.id === course.instructorId);
        const category = categories.find((c) => c.id === course.categoryId);
        const level = levels.find((l) => l.id === course.levelId);

        const wishlistCourse: WishlistCourse = {
          id: course.id,
          slug: course.slug,
          title: course.title,
          subtitle: course.subtitle,
          thumbnail: course.thumbnail,
          instructorName: instructor?.displayName || '',
          instructorAvatar: instructor?.avatar || '',
          categoryName: category?.name || '',
          categoryColor: category?.color || '#3B82F6',
          levelName: level?.name || '',
          levelColor: level?.color || '#6B7280',
          price: course.price,
          discount: course.discount,
          rating: course.rating,
          studentCount: course.studentCount,
          duration: course.duration,
          lessonCount: course.lessonCount,
          isEnrolled: student.enrolledCourses.includes(course.id),
        };

        return wishlistCourse;
      })
      .filter((c): c is WishlistCourse => c !== null);

    return {
      courses: wishlistCourses,
      totalCourses: wishlistCourses.length,
    };
  }
}

// Server-side factory
export class ServerWishlistPresenterFactory {
  static async create(userId: string): Promise<WishlistViewModel> {
    return WishlistPresenter.getViewModel(userId);
  }
}

// Client-side factory
export class ClientWishlistPresenterFactory {
  static async create(userId: string): Promise<WishlistViewModel> {
    return WishlistPresenter.getViewModel(userId);
  }
}

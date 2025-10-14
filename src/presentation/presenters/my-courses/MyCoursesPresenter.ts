import { courses } from '@/src/data/mock/courses.mock';
import { enrollments } from '@/src/data/mock/enrollments.mock';
import { students } from '@/src/data/mock/students.mock';
import { instructors } from '@/src/data/mock/instructors.mock';
import { categories } from '@/src/data/master/categories.master';
import { levels } from '@/src/data/master/levels.master';

export interface MyCourseItem {
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
  progress: number;
  totalLessons: number;
  completedLessons: number;
  lastAccessedAt: string;
  status: 'active' | 'completed' | 'paused';
  rating: number;
  duration: number;
}

export interface MyCoursesStats {
  totalCourses: number;
  inProgress: number;
  completed: number;
  totalHours: number;
}

export interface MyCoursesViewModel {
  stats: MyCoursesStats;
  courses: MyCourseItem[];
}

export type CourseFilter = 'all' | 'in-progress' | 'completed' | 'paused';

export class MyCoursesPresenter {
  static async getViewModel(userId: string, filter: CourseFilter = 'all'): Promise<MyCoursesViewModel> {
    // Get student data
    const student = students.find((s) => s.userId === userId);
    if (!student) {
      throw new Error('Student not found');
    }

    // Get student enrollments
    const studentEnrollments = enrollments.filter((e) => e.studentId === student.id);

    // Map enrollments to course items
    const allCourses: MyCourseItem[] = studentEnrollments.map((enrollment) => {
      const course = courses.find((c) => c.id === enrollment.courseId);
      if (!course) return null;

      const instructor = instructors.find((i) => i.id === course.instructorId);
      const category = categories.find((c) => c.id === course.categoryId);
      const level = levels.find((l) => l.id === course.levelId);

      return {
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
        progress: enrollment.progress,
        totalLessons: course.lessonCount,
        completedLessons: enrollment.completedLessons.length,
        lastAccessedAt: enrollment.lastAccessedAt,
        status: enrollment.status,
        rating: course.rating,
        duration: course.duration,
      };
    }).filter((c): c is MyCourseItem => c !== null);

    // Filter courses based on filter type
    const filteredCourses = allCourses.filter((course) => {
      if (filter === 'all') return true;
      if (filter === 'in-progress') return course.status === 'active' && course.progress < 100;
      if (filter === 'completed') return course.status === 'completed';
      if (filter === 'paused') return course.status === 'paused';
      return true;
    });

    // Sort by last accessed
    filteredCourses.sort((a, b) => 
      new Date(b.lastAccessedAt).getTime() - new Date(a.lastAccessedAt).getTime()
    );

    // Calculate stats
    const stats: MyCoursesStats = {
      totalCourses: allCourses.length,
      inProgress: allCourses.filter((c) => c.status === 'active' && c.progress < 100).length,
      completed: allCourses.filter((c) => c.status === 'completed').length,
      totalHours: student.totalLearningTime,
    };

    return {
      stats,
      courses: filteredCourses,
    };
  }
}

// Server-side factory
export class ServerMyCoursesPresenterFactory {
  static async create(userId: string, filter: CourseFilter = 'all'): Promise<MyCoursesViewModel> {
    return MyCoursesPresenter.getViewModel(userId, filter);
  }
}

// Client-side factory
export class ClientMyCoursesPresenterFactory {
  static async create(userId: string, filter: CourseFilter = 'all'): Promise<MyCoursesViewModel> {
    return MyCoursesPresenter.getViewModel(userId, filter);
  }
}

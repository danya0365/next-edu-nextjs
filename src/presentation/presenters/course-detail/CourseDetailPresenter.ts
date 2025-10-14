import { courses, getCourseBySlug, type Course } from '@/src/data/mock/courses.mock';
import { instructors, type Instructor } from '@/src/data/mock/instructors.mock';
import { reviews } from '@/src/data/mock/reviews.mock';
import { lessons, sections, type Lesson, type Section } from '@/src/data/mock/lessons.mock';
import { categories, type Category } from '@/src/data/master/categories.master';
import { levels, type Level } from '@/src/data/master/levels.master';
import { students } from '@/src/data/mock/students.mock';

export interface CourseDetailData extends Course {
  instructor: Instructor;
  category: Category;
  level: Level;
  sections: Section[];
  totalLessons: number;
  totalDuration: number;
  reviews: Array<{
    id: string;
    studentName: string;
    studentAvatar: string;
    rating: number;
    title: string;
    comment: string;
    helpful: number;
    createdAt: string;
  }>;
  relatedCourses: Course[];
}

export interface CourseDetailViewModel {
  course: CourseDetailData | null;
}

/**
 * Presenter for Course Detail
 */
export class CourseDetailPresenter {
  /**
   * Get view model for the page
   */
  async getViewModel(slug: string): Promise<CourseDetailViewModel> {
    try {
      const course = getCourseBySlug(slug);
      
      if (!course) {
        return { course: null };
      }

      const instructor = instructors.find((i) => i.id === course.instructorId);
      const category = categories.find((c) => c.id === course.categoryId);
      const level = levels.find((l) => l.id === course.levelId);

      if (!instructor || !category || !level) {
        console.error('Missing related data for course:', slug);
        return { course: null };
      }

      // Get course sections and lessons
      const courseSections = sections.filter((s) => s.courseId === course.id);
      const courseLessons = lessons.filter((l) => l.courseId === course.id);
      
      const totalDuration = courseLessons.reduce((sum, lesson) => sum + lesson.duration, 0);

      // Get course reviews with student info
      const courseReviews = reviews
        .filter((r) => r.courseId === course.id)
        .map((review) => {
          const student = students.find((s) => s.id === review.studentId);
          return {
            ...review,
            studentName: student?.displayName || 'นักเรียน',
            studentAvatar: student?.avatar || '',
          };
        });

      // Get related courses (same category, different course)
      const relatedCourses = courses
        .filter((c) => c.categoryId === course.categoryId && c.id !== course.id && c.status === 'published')
        .slice(0, 3);

      const courseDetailData: CourseDetailData = {
        ...course,
        instructor,
        category,
        level,
        sections: courseSections,
        totalLessons: courseLessons.length,
        totalDuration,
        reviews: courseReviews,
        relatedCourses,
      };

      return {
        course: courseDetailData,
      };
    } catch (error) {
      console.error('Error in CourseDetailPresenter.getViewModel:', error);
      throw error;
    }
  }

  /**
   * Generate metadata for the page
   */
  async generateMetadata(slug: string) {
    try {
      const course = getCourseBySlug(slug);

      if (!course) {
        return {
          title: 'ไม่พบคอร์ส | Next Edu',
          description: 'ไม่พบคอร์สที่คุณค้นหา',
        };
      }

      return {
        title: `${course.title} | Next Edu`,
        description: course.subtitle,
      };
    } catch (error) {
      console.error('Error generating metadata:', error);
      throw error;
    }
  }
}

/**
 * Factory for creating CourseDetailPresenter instances
 */
export class CourseDetailPresenterFactory {
  static async create(): Promise<CourseDetailPresenter> {
    return new CourseDetailPresenter();
  }
}

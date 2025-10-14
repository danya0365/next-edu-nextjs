import { getCourseByIdOrSlug, type Course } from '@/src/data/mock/courses.mock';
import { instructors, type Instructor } from '@/src/data/mock/instructors.mock';
import { lessons, sections, type Lesson, type Section } from '@/src/data/mock/lessons.mock';
import { quizzes } from '@/src/data/mock/quizzes.mock';
import { enrollments } from '@/src/data/mock/enrollments.mock';

export interface LearnCourseData extends Course {
  instructor: Instructor;
  sections: Section[];
  currentLesson: Lesson | null;
  totalLessons: number;
  totalDuration: number;
  enrollment: {
    progress: number;
    completedLessons: string[];
    currentLessonId?: string;
  } | null;
}

export interface LearnViewModel {
  course: LearnCourseData | null;
  currentLesson: Lesson | null;
  hasQuiz: boolean;
  nextLesson: Lesson | null;
  previousLesson: Lesson | null;
}

/**
 * Presenter for Learn/Player page
 */
export class LearnPresenter {
  /**
   * Get view model for the page
   * Note: userId should be passed from auth state on client-side
   */
  async getViewModel(
    courseId: string,
    lessonId?: string,
    userId?: string // Optional - if not provided, enrollment will be null
  ): Promise<LearnViewModel> {
    try {
      const course = getCourseByIdOrSlug(courseId);
      
      if (!course) {
        return {
          course: null,
          currentLesson: null,
          hasQuiz: false,
          nextLesson: null,
          previousLesson: null,
        };
      }

      const instructor = instructors.find((i) => i.id === course.instructorId);
      
      if (!instructor) {
        console.error('Missing instructor for course:', courseId);
        return {
          course: null,
          currentLesson: null,
          hasQuiz: false,
          nextLesson: null,
          previousLesson: null,
        };
      }

      // Get course sections and lessons
      const courseSections = sections.filter((s) => s.courseId === course.id);
      const courseLessons = lessons.filter((l) => l.courseId === course.id);

      // Get enrollment data - only if userId is provided
      const enrollment = userId
        ? enrollments.find((e) => e.courseId === course.id && e.studentId === userId)
        : null;

      // Determine current lesson
      let currentLesson: Lesson | null = null;
      
      if (lessonId) {
        currentLesson = courseLessons.find((l) => l.id === lessonId) || null;
      } else if (enrollment?.currentLessonId) {
        currentLesson = courseLessons.find((l) => l.id === enrollment.currentLessonId) || null;
      } else {
        // First lesson by default
        currentLesson = courseLessons[0] || null;
      }

      // Check if current lesson has quiz
      const hasQuiz = currentLesson
        ? quizzes.some((q) => q.lessonId === currentLesson.id)
        : false;

      // Calculate total duration
      const totalDuration = courseLessons.reduce((sum, lesson) => sum + lesson.duration, 0);

      // Get next and previous lessons
      const currentIndex = currentLesson
        ? courseLessons.findIndex((l) => l.id === currentLesson!.id)
        : -1;
      
      const nextLesson =
        currentIndex >= 0 && currentIndex < courseLessons.length - 1
          ? courseLessons[currentIndex + 1]
          : null;
      
      const previousLesson = currentIndex > 0 ? courseLessons[currentIndex - 1] : null;

      const learnCourseData: LearnCourseData = {
        ...course,
        instructor,
        sections: courseSections,
        currentLesson,
        totalLessons: courseLessons.length,
        totalDuration,
        enrollment: enrollment
          ? {
              progress: enrollment.progress,
              completedLessons: enrollment.completedLessons,
              currentLessonId: enrollment.currentLessonId,
            }
          : null,
      };

      return {
        course: learnCourseData,
        currentLesson,
        hasQuiz,
        nextLesson,
        previousLesson,
      };
    } catch (error) {
      console.error('Error in LearnPresenter.getViewModel:', error);
      throw error;
    }
  }

  /**
   * Generate metadata for the page
   */
  async generateMetadata(courseId: string, lessonId?: string) {
    try {
      const course = getCourseByIdOrSlug(courseId);

      if (!course) {
        return {
          title: 'เรียน | Next Edu',
          description: 'เรียนคอร์สออนไลน์',
        };
      }

      if (lessonId) {
        const lesson = lessons.find((l) => l.id === lessonId);
        if (lesson) {
          return {
            title: `${lesson.title} - ${course.title} | Next Edu`,
            description: lesson.description,
          };
        }
      }

      return {
        title: `เรียน: ${course.title} | Next Edu`,
        description: course.subtitle,
      };
    } catch (error) {
      console.error('Error generating metadata:', error);
      throw error;
    }
  }

  /**
   * Mark lesson as completed
   */
  async markLessonComplete(
    courseId: string,
    lessonId: string,
    userId: string = 'stud-001'
  ): Promise<boolean> {
    try {
      // In real app, this would update database
      console.log('Marking lesson complete:', { courseId, lessonId, userId });
      return true;
    } catch (error) {
      console.error('Error marking lesson complete:', error);
      return false;
    }
  }

  /**
   * Update learning progress
   */
  async updateProgress(
    courseId: string,
    lessonId: string,
    progressSeconds: number,
    userId: string = 'stud-001'
  ): Promise<boolean> {
    try {
      // In real app, this would update database
      console.log('Updating progress:', { courseId, lessonId, progressSeconds, userId });
      return true;
    } catch (error) {
      console.error('Error updating progress:', error);
      return false;
    }
  }
}

/**
 * Factory for creating LearnPresenter instances
 */
export class LearnPresenterFactory {
  static async create(): Promise<LearnPresenter> {
    return new LearnPresenter();
  }
}

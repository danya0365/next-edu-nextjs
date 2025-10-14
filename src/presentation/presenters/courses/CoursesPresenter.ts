import { courses, type Course } from '@/src/data/mock/courses.mock';
import { categories, type Category } from '@/src/data/master/categories.master';
import { levels, type Level } from '@/src/data/master/levels.master';
import { ageGroups, type AgeGroup } from '@/src/data/master/age-groups.master';
import { instructors, type Instructor } from '@/src/data/mock/instructors.mock';

export interface CourseWithDetails extends Course {
  instructor: Instructor;
  category: Category;
  level: Level;
}

export interface CoursesStats {
  totalCourses: number;
  totalInstructors: number;
  totalStudents: number;
  averageRating: number;
}

export interface CoursesFilters {
  search?: string;
  categoryId?: string;
  levelId?: string;
  ageGroupId?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  isFeatured?: boolean;
  isPopular?: boolean;
  isNew?: boolean;
  sortBy?: 'newest' | 'popular' | 'rating' | 'price-low' | 'price-high' | 'title';
}

export interface CoursesViewModel {
  courses: CourseWithDetails[];
  categories: Category[];
  levels: Level[];
  ageGroups: AgeGroup[];
  stats: CoursesStats;
  totalCount: number;
  page: number;
  perPage: number;
  filters: CoursesFilters;
}

/**
 * Presenter for Courses management
 * Follows Clean Architecture with proper separation of concerns
 */
export class CoursesPresenter {
  /**
   * Get view model for the page
   */
  async getViewModel(
    filters: CoursesFilters = {},
    page: number = 1,
    perPage: number = 12
  ): Promise<CoursesViewModel> {
    try {
      // Get all courses with details
      let filteredCourses = this.getCoursesWithDetails();

      // Apply filters
      filteredCourses = this.applyFilters(filteredCourses, filters);

      // Apply sorting
      filteredCourses = this.applySorting(filteredCourses, filters.sortBy);

      // Calculate stats
      const stats = this.calculateStats(filteredCourses);

      // Paginate
      const totalCount = filteredCourses.length;
      const startIndex = (page - 1) * perPage;
      const endIndex = startIndex + perPage;
      const paginatedCourses = filteredCourses.slice(startIndex, endIndex);

      return {
        courses: paginatedCourses,
        categories,
        levels,
        ageGroups,
        stats,
        totalCount,
        page,
        perPage,
        filters,
      };
    } catch (error) {
      console.error('Error in CoursesPresenter.getViewModel:', error);
      throw error;
    }
  }

  /**
   * Generate metadata for the page
   */
  async generateMetadata(filters?: CoursesFilters) {
    try {
      let title = 'คอร์สทั้งหมด | Next Edu';
      let description = 'เรียนรู้ทักษะใหม่ๆ กับคอร์สออนไลน์มากมาย';

      if (filters?.categoryId) {
        const category = categories.find((c) => c.id === filters.categoryId);
        if (category) {
          title = `คอร์ส${category.name} | Next Edu`;
          description = category.description;
        }
      }

      return {
        title,
        description,
      };
    } catch (error) {
      console.error('Error generating metadata:', error);
      throw error;
    }
  }

  /**
   * Get courses with full details (instructor, category, level)
   */
  private getCoursesWithDetails(): CourseWithDetails[] {
    return courses
      .filter((course) => course.status === 'published')
      .map((course) => {
        const instructor = instructors.find((i) => i.id === course.instructorId);
        const category = categories.find((c) => c.id === course.categoryId);
        const level = levels.find((l) => l.id === course.levelId);

        if (!instructor || !category || !level) {
          console.warn(`Missing data for course ${course.id}`);
        }

        return {
          ...course,
          instructor: instructor!,
          category: category!,
          level: level!,
        };
      })
      .filter((course) => course.instructor && course.category && course.level);
  }

  /**
   * Apply filters to courses
   */
  private applyFilters(
    courses: CourseWithDetails[],
    filters: CoursesFilters
  ): CourseWithDetails[] {
    let filtered = [...courses];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchLower) ||
          course.subtitle.toLowerCase().includes(searchLower) ||
          course.description.toLowerCase().includes(searchLower) ||
          course.instructor.displayName.toLowerCase().includes(searchLower)
      );
    }

    // Category filter
    if (filters.categoryId) {
      filtered = filtered.filter((course) => course.categoryId === filters.categoryId);
    }

    // Level filter
    if (filters.levelId) {
      filtered = filtered.filter((course) => course.levelId === filters.levelId);
    }

    // Age group filter
    if (filters.ageGroupId) {
      filtered = filtered.filter((course) =>
        course.ageGroupIds.includes(filters.ageGroupId!)
      );
    }

    // Price filters
    if (filters.minPrice !== undefined) {
      filtered = filtered.filter((course) => {
        const finalPrice = course.discount
          ? Math.round(course.price * (1 - course.discount.percentage / 100))
          : course.price;
        return finalPrice >= filters.minPrice!;
      });
    }

    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter((course) => {
        const finalPrice = course.discount
          ? Math.round(course.price * (1 - course.discount.percentage / 100))
          : course.price;
        return finalPrice <= filters.maxPrice!;
      });
    }

    // Rating filter
    if (filters.minRating !== undefined) {
      filtered = filtered.filter((course) => course.rating >= filters.minRating!);
    }

    // Boolean filters
    if (filters.isFeatured) {
      filtered = filtered.filter((course) => course.isFeatured);
    }

    if (filters.isPopular) {
      filtered = filtered.filter((course) => course.isPopular);
    }

    if (filters.isNew) {
      filtered = filtered.filter((course) => course.isNew);
    }

    return filtered;
  }

  /**
   * Apply sorting to courses
   */
  private applySorting(
    courses: CourseWithDetails[],
    sortBy?: CoursesFilters['sortBy']
  ): CourseWithDetails[] {
    const sorted = [...courses];

    switch (sortBy) {
      case 'newest':
        return sorted.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case 'popular':
        return sorted.sort((a, b) => b.studentCount - a.studentCount);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'price-low':
        return sorted.sort((a, b) => {
          const priceA = a.discount
            ? Math.round(a.price * (1 - a.discount.percentage / 100))
            : a.price;
          const priceB = b.discount
            ? Math.round(b.price * (1 - b.discount.percentage / 100))
            : b.price;
          return priceA - priceB;
        });
      case 'price-high':
        return sorted.sort((a, b) => {
          const priceA = a.discount
            ? Math.round(a.price * (1 - a.discount.percentage / 100))
            : a.price;
          const priceB = b.discount
            ? Math.round(b.price * (1 - b.discount.percentage / 100))
            : b.price;
          return priceB - priceA;
        });
      case 'title':
        return sorted.sort((a, b) => a.title.localeCompare(b.title, 'th'));
      default:
        // Default: sort by popularity
        return sorted.sort((a, b) => b.studentCount - a.studentCount);
    }
  }

  /**
   * Calculate statistics
   */
  private calculateStats(courses: CourseWithDetails[]): CoursesStats {
    const totalCourses = courses.length;
    const uniqueInstructors = new Set(courses.map((c) => c.instructorId));
    const totalInstructors = uniqueInstructors.size;
    const totalStudents = courses.reduce((sum, c) => sum + c.studentCount, 0);
    const averageRating =
      courses.length > 0
        ? courses.reduce((sum, c) => sum + c.rating, 0) / courses.length
        : 0;

    return {
      totalCourses,
      totalInstructors,
      totalStudents,
      averageRating: Math.round(averageRating * 10) / 10,
    };
  }
}

/**
 * Factory for creating CoursesPresenter instances
 */
export class CoursesPresenterFactory {
  static async create(): Promise<CoursesPresenter> {
    return new CoursesPresenter();
  }
}

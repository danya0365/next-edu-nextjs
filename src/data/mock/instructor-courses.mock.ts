/**
 * Mock Data: Instructor Courses Management
 * ใช้ข้อมูลจาก courses.mock.ts เป็น single source of truth
 */

import { courses, type Course } from "./courses.mock";

/**
 * Get instructor courses by instructor ID
 */
export function getInstructorCourses(instructorId: string): Course[] {
  return courses.filter((course) => course.instructorId === instructorId);
}

/**
 * Get instructor course by ID
 */
export function getInstructorCourseById(
  instructorId: string,
  courseId: string
): Course | undefined {
  return courses.find(
    (course) => course.id === courseId && course.instructorId === instructorId
  );
}

/**
 * Get instructor courses by status
 */
export function getInstructorCoursesByStatus(
  instructorId: string,
  status: "draft" | "published" | "archived"
): Course[] {
  return courses.filter(
    (course) => course.instructorId === instructorId && course.status === status
  );
}

/**
 * Get instructor courses statistics
 */
export function getInstructorCoursesStats(instructorId: string) {
  const instructorCourses = getInstructorCourses(instructorId);

  const totalCourses = instructorCourses.length;
  const publishedCourses = instructorCourses.filter(
    (c) => c.status === "published"
  ).length;
  const draftCourses = instructorCourses.filter((c) => c.status === "draft").length;
  const archivedCourses = instructorCourses.filter((c) => c.status === "archived").length;

  const totalStudents = instructorCourses.reduce(
    (sum, course) => sum + course.studentCount,
    0
  );
  const totalRevenue = instructorCourses.reduce(
    (sum, course) => sum + (course.price * course.studentCount),
    0
  );
  const totalReviews = instructorCourses.reduce(
    (sum, course) => sum + course.reviewCount,
    0
  );

  const averageRating =
    instructorCourses.length > 0
      ? instructorCourses.reduce((sum, course) => sum + course.rating, 0) /
        instructorCourses.length
      : 0;

  return {
    totalCourses,
    publishedCourses,
    draftCourses,
    archivedCourses,
    totalStudents,
    totalRevenue,
    totalReviews,
    averageRating: Math.round(averageRating * 10) / 10,
  };
}

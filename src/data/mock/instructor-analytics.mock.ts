/**
 * Mock data for instructor analytics
 * ใช้ข้อมูลจาก instructors.mock.ts และ courses.mock.ts เป็น single source of truth
 */

import { instructors } from "./instructors.mock";
import { courses } from "./courses.mock";

export interface AnalyticsOverview {
  totalViews: number;
  totalEnrollments: number;
  totalRevenue: number;
  averageRating: number;
  completionRate: number;
  activeStudents: number;
  totalCourses: number;
  totalReviews: number;
}

export interface CoursePerformance {
  courseId: string;
  courseTitle: string;
  views: number;
  enrollments: number;
  revenue: number;
  completionRate: number;
  averageRating: number;
  totalReviews: number;
  activeStudents: number;
  trend: "up" | "down" | "stable";
}

export interface StudentEngagement {
  date: string;
  activeStudents: number;
  newEnrollments: number;
  completedLessons: number;
  averageTimeSpent: number;
}

export interface RevenueAnalytics {
  date: string;
  revenue: number;
  enrollments: number;
  refunds: number;
}

export interface TrafficSource {
  source: string;
  visits: number;
  enrollments: number;
  conversionRate: number;
}

export interface PopularContent {
  contentId: string;
  contentTitle: string;
  contentType: "lesson" | "quiz" | "assignment";
  views: number;
  completionRate: number;
  averageTimeSpent: number;
  rating: number;
}

export interface StudentDemographics {
  ageGroup: string;
  count: number;
  percentage: number;
}

// Mock analytics overview
const mockAnalyticsOverview: AnalyticsOverview = {
  totalViews: 15420,
  totalEnrollments: 1240,
  totalRevenue: 1860000,
  averageRating: 4.7,
  completionRate: 68.5,
  activeStudents: 856,
  totalCourses: 4,
  totalReviews: 342,
};

// Mock course performance data - ใช้ข้อมูลจาก courses.mock.ts
const generateCoursePerformance = (instructorId?: string): CoursePerformance[] => {
  const instructorCourses = instructorId 
    ? courses.filter(c => c.instructorId === instructorId)
    : courses;
  
  return instructorCourses.map((course, index) => ({
    courseId: course.id,
    courseTitle: course.title,
    views: Math.floor(course.studentCount * 3.5), // Estimate views
    enrollments: course.studentCount,
    revenue: course.price * course.studentCount,
    completionRate: 65 + Math.random() * 20, // Mock completion rate
    averageRating: course.rating,
    totalReviews: course.reviewCount,
    activeStudents: Math.floor(course.studentCount * 0.7), // 70% active
    trend: index % 3 === 0 ? "up" : index % 3 === 1 ? "stable" : "down" as "up" | "down" | "stable",
  }));
};

// Mock student engagement data (last 30 days)
const mockStudentEngagement: StudentEngagement[] = [
  {
    date: "2024-01-14",
    activeStudents: 856,
    newEnrollments: 23,
    completedLessons: 342,
    averageTimeSpent: 45,
  },
  {
    date: "2024-01-13",
    activeStudents: 842,
    newEnrollments: 18,
    completedLessons: 328,
    averageTimeSpent: 42,
  },
  {
    date: "2024-01-12",
    activeStudents: 835,
    newEnrollments: 21,
    completedLessons: 315,
    averageTimeSpent: 48,
  },
  {
    date: "2024-01-11",
    activeStudents: 828,
    newEnrollments: 19,
    completedLessons: 298,
    averageTimeSpent: 44,
  },
  {
    date: "2024-01-10",
    activeStudents: 815,
    newEnrollments: 25,
    completedLessons: 287,
    averageTimeSpent: 46,
  },
  {
    date: "2024-01-09",
    activeStudents: 802,
    newEnrollments: 22,
    completedLessons: 276,
    averageTimeSpent: 43,
  },
  {
    date: "2024-01-08",
    activeStudents: 795,
    newEnrollments: 20,
    completedLessons: 265,
    averageTimeSpent: 41,
  },
];

// Mock revenue analytics data (last 12 months)
const mockRevenueAnalytics: RevenueAnalytics[] = [
  { date: "2024-01", revenue: 185000, enrollments: 123, refunds: 2 },
  { date: "2023-12", revenue: 220000, enrollments: 147, refunds: 1 },
  { date: "2023-11", revenue: 265000, enrollments: 176, refunds: 3 },
  { date: "2023-10", revenue: 205000, enrollments: 137, refunds: 2 },
  { date: "2023-09", revenue: 242000, enrollments: 161, refunds: 4 },
  { date: "2023-08", revenue: 295000, enrollments: 197, refunds: 1 },
  { date: "2023-07", revenue: 178000, enrollments: 119, refunds: 2 },
  { date: "2023-06", revenue: 156000, enrollments: 104, refunds: 1 },
  { date: "2023-05", revenue: 189000, enrollments: 126, refunds: 3 },
  { date: "2023-04", revenue: 167000, enrollments: 111, refunds: 2 },
  { date: "2023-03", revenue: 145000, enrollments: 97, refunds: 1 },
  { date: "2023-02", revenue: 123000, enrollments: 82, refunds: 2 },
];

// Mock traffic source data
const mockTrafficSources: TrafficSource[] = [
  { source: "Google Search", visits: 5840, enrollments: 468, conversionRate: 8.01 },
  { source: "Facebook", visits: 3250, enrollments: 227, conversionRate: 6.98 },
  { source: "Direct", visits: 2890, enrollments: 231, conversionRate: 7.99 },
  { source: "YouTube", visits: 1870, enrollments: 131, conversionRate: 7.01 },
  { source: "Instagram", visits: 980, enrollments: 59, conversionRate: 6.02 },
  { source: "Twitter", visits: 590, enrollments: 35, conversionRate: 5.93 },
];

// Mock popular content data
const mockPopularContent: PopularContent[] = [
  {
    contentId: "lesson-001",
    contentTitle: "Python Basics: Variables and Data Types",
    contentType: "lesson",
    views: 1250,
    completionRate: 89.2,
    averageTimeSpent: 28,
    rating: 4.9,
  },
  {
    contentId: "quiz-001",
    contentTitle: "Python Fundamentals Quiz",
    contentType: "quiz",
    views: 1120,
    completionRate: 76.5,
    averageTimeSpent: 15,
    rating: 4.7,
  },
  {
    contentId: "lesson-002",
    contentTitle: "React Hooks Deep Dive",
    contentType: "lesson",
    views: 1080,
    completionRate: 82.3,
    averageTimeSpent: 35,
    rating: 4.8,
  },
  {
    contentId: "assignment-001",
    contentTitle: "Build a Todo App with React",
    contentType: "assignment",
    views: 950,
    completionRate: 68.9,
    averageTimeSpent: 120,
    rating: 4.6,
  },
  {
    contentId: "lesson-003",
    contentTitle: "TypeScript Generics Explained",
    contentType: "lesson",
    views: 890,
    completionRate: 79.1,
    averageTimeSpent: 32,
    rating: 4.8,
  },
];

// Mock student demographics data
const mockStudentDemographics: StudentDemographics[] = [
  { ageGroup: "18-24", count: 425, percentage: 34.3 },
  { ageGroup: "25-34", count: 520, percentage: 41.9 },
  { ageGroup: "35-44", count: 198, percentage: 16.0 },
  { ageGroup: "45-54", count: 72, percentage: 5.8 },
  { ageGroup: "55+", count: 25, percentage: 2.0 },
];

/**
 * Get analytics overview
 */
export function getAnalyticsOverview(instructorId: string): AnalyticsOverview {
  console.log("Getting analytics overview for instructor:", instructorId);
  
  const instructor = instructors.find((i) => i.id === instructorId);
  if (!instructor) {
    return mockAnalyticsOverview;
  }
  
  // Calculate analytics from instructor data
  return {
    ...mockAnalyticsOverview,
    totalEnrollments: instructor.studentCount,
    totalRevenue: instructor.totalRevenue,
    averageRating: instructor.rating,
    totalCourses: instructor.coursesCount,
    totalReviews: instructor.reviewCount,
  };
}

/**
 * Get course performance data
 */
export function getCoursePerformance(
  instructorId: string
): CoursePerformance[] {
  console.log("Getting course performance for instructor:", instructorId);
  return generateCoursePerformance(instructorId);
}

/**
 * Get student engagement data
 */
export function getStudentEngagement(
  instructorId: string,
  days: number = 7
): StudentEngagement[] {
  console.log("Getting student engagement for instructor:", {
    instructorId,
    days,
  });
  return mockStudentEngagement.slice(0, days);
}

/**
 * Get revenue analytics data
 */
export function getRevenueAnalytics(
  instructorId: string,
  months: number = 6
): RevenueAnalytics[] {
  console.log("Getting revenue analytics for instructor:", {
    instructorId,
    months,
  });
  return mockRevenueAnalytics.slice(0, months);
}

/**
 * Get traffic sources
 */
export function getTrafficSources(instructorId: string): TrafficSource[] {
  console.log("Getting traffic sources for instructor:", instructorId);
  return mockTrafficSources;
}

/**
 * Get popular content
 */
export function getPopularContent(instructorId: string): PopularContent[] {
  console.log("Getting popular content for instructor:", instructorId);
  return mockPopularContent;
}

/**
 * Get student demographics
 */
export function getStudentDemographics(
  instructorId: string
): StudentDemographics[] {
  console.log("Getting student demographics for instructor:", instructorId);
  return mockStudentDemographics;
}

/**
 * Export analytics report (mock implementation)
 */
export function exportAnalyticsReport(
  instructorId: string,
  format: "pdf" | "csv" | "excel"
): boolean {
  console.log("Exporting analytics report:", { instructorId, format });
  // In real app, this would generate and download a report
  return true;
}

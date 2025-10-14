/**
 * Mock data for instructor reviews
 * ใช้ข้อมูลจาก instructors.mock.ts และ courses.mock.ts เป็น single source of truth
 */

import { instructors } from "./instructors.mock";
import { getCourseById } from "./courses.mock";

export interface InstructorReview {
  id: string;
  courseId: string;
  courseTitle: string;
  studentId: string;
  studentName: string;
  studentAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
  isPublished: boolean;
  instructorReply?: {
    message: string;
    repliedAt: string;
  };
  helpful: number;
  reported: boolean;
}

export interface InstructorReviewsStats {
  totalReviews: number;
  averageRating: number;
  publishedReviews: number;
  pendingReviews: number;
  repliedReviews: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

// Mock reviews data
const mockReviews: InstructorReview[] = [
  {
    id: "review-001",
    courseId: "course-001",
    courseTitle: getCourseById("course-001")?.title || "เขียนโปรแกรม Python",
    studentId: "student-001",
    studentName: "สมชาย ใจดี",
    rating: 5,
    comment:
      "คอร์สนี้ดีมากครับ อธิบายละเอียด เข้าใจง่าย เหมาะสำหรับคนที่เริ่มต้นเขียนโปรแกรมจริงๆ ขอบคุณอาจารย์มากครับ",
    createdAt: "2024-01-10T10:30:00Z",
    isPublished: true,
    instructorReply: {
      message:
        "ขอบคุณมากครับ ยินดีที่ช่วยให้คุณเข้าใจการเขียนโปรแกรมได้ดีขึ้น หากมีคำถามเพิ่มเติมสามารถถามได้เสมอครับ",
      repliedAt: "2024-01-10T14:20:00Z",
    },
    helpful: 12,
    reported: false,
  },
  {
    id: "review-002",
    courseId: "course-002",
    courseTitle: getCourseById("course-002")?.title || "Scratch Programming",
    studentId: "student-002",
    studentName: "สมหญิง รักเรียน",
    rating: 5,
    comment:
      "คอร์สที่ดีที่สุดเท่าที่เคยเรียนมา เนื้อหาครบถ้วน ตัวอย่างเยอะ ทำตามได้จริง แนะนำเลยค่ะ",
    createdAt: "2024-01-12T15:45:00Z",
    isPublished: true,
    instructorReply: {
      message:
        "ขอบคุณมากค่ะ ดีใจที่คอร์สช่วยให้คุณพัฒนาทักษะได้ ขอให้ประสบความสำเร็จในการเขียนโปรแกรมนะคะ",
      repliedAt: "2024-01-12T18:30:00Z",
    },
    helpful: 18,
    reported: false,
  },
  {
    id: "review-003",
    courseId: "course-001",
    courseTitle: getCourseById("course-001")?.title || "เขียนโปรแกรม Python",
    studentId: "student-003",
    studentName: "ประยุทธ์ ขยัน",
    rating: 4,
    comment:
      "คอร์สดีครับ แต่อยากให้มีตัวอย่างเพิ่มเติมในบางบทเรียน โดยรวมแล้วคุ้มค่าครับ",
    createdAt: "2024-01-13T09:20:00Z",
    isPublished: true,
    helpful: 8,
    reported: false,
  },
  {
    id: "review-004",
    courseId: "course-003",
    courseTitle: getCourseById("course-003")?.title || "Web Development",
    studentId: "student-004",
    studentName: "วิไล สวยงาม",
    rating: 5,
    comment:
      "เนื้อหาเข้าใจง่าย อธิบายชัดเจน ตัวอย่างโค้ดดี ชอบมากค่ะ",
    createdAt: "2024-01-14T11:00:00Z",
    isPublished: true,
    instructorReply: {
      message:
        "ขอบคุณมากค่ะ ยินดีที่คอร์สช่วยให้คุณเข้าใจ TypeScript ได้ดีขึ้น",
      repliedAt: "2024-01-14T13:15:00Z",
    },
    helpful: 15,
    reported: false,
  },
  {
    id: "review-005",
    courseId: "course-002",
    courseTitle: getCourseById("course-002")?.title || "Scratch Programming",
    studentId: "student-005",
    studentName: "สุรชัย มานะ",
    rating: 4,
    comment:
      "คอร์สดีครับ เนื้อหาเยอะ แต่บางส่วนอาจจะเร็วไปหน่อยสำหรับมือใหม่",
    createdAt: "2024-01-14T16:30:00Z",
    isPublished: true,
    helpful: 5,
    reported: false,
  },
  {
    id: "review-006",
    courseId: "course-001",
    courseTitle: getCourseById("course-001")?.title || "เขียนโปรแกรม Python",
    studentId: "student-006",
    studentName: "มานี ตั้งใจ",
    rating: 5,
    comment:
      "คอร์สที่ดีมากๆ เหมาะสำหรับคนที่ไม่เคยเขียนโปรแกรมมาก่อนเลย แนะนำเลยครับ",
    createdAt: "2024-01-14T18:00:00Z",
    isPublished: true,
    helpful: 20,
    reported: false,
  },
  {
    id: "review-007",
    courseId: "course-004",
    courseTitle: getCourseById("course-004")?.title || "วิทยาศาสตร์",
    studentId: "student-007",
    studentName: "สมศักดิ์ เรียนรู้",
    rating: 3,
    comment:
      "คอร์สโอเค แต่คาดหวังว่าจะมีเนื้อหาเกี่ยวกับ Database มากกว่านี้",
    createdAt: "2024-01-13T14:00:00Z",
    isPublished: false,
    helpful: 2,
    reported: false,
  },
  {
    id: "review-008",
    courseId: "course-003",
    courseTitle: getCourseById("course-003")?.title || "Web Development",
    studentId: "student-008",
    studentName: "ปรีชา ฉลาด",
    rating: 5,
    comment:
      "ชอบมากครับ อธิบายได้ดี ตัวอย่างชัดเจน เข้าใจ TypeScript มากขึ้นเยอะเลย",
    createdAt: "2024-01-12T10:00:00Z",
    isPublished: true,
    instructorReply: {
      message: "ขอบคุณครับ ยินดีที่ช่วยได้ครับ",
      repliedAt: "2024-01-12T12:00:00Z",
    },
    helpful: 10,
    reported: false,
  },
];

/**
 * Get all reviews for instructor
 */
export function getInstructorReviews(instructorId: string): InstructorReview[] {
  console.log("Getting reviews for instructor:", instructorId);
  return mockReviews;
}

/**
 * Get review by ID
 */
export function getInstructorReviewById(
  instructorId: string,
  reviewId: string
): InstructorReview | undefined {
  console.log("Getting review:", { instructorId, reviewId });
  return mockReviews.find((r) => r.id === reviewId);
}

/**
 * Get reviews by course
 */
export function getInstructorReviewsByCourse(
  instructorId: string,
  courseId: string
): InstructorReview[] {
  console.log("Getting reviews by course:", { instructorId, courseId });
  return mockReviews.filter((r) => r.courseId === courseId);
}

/**
 * Get reviews by rating
 */
export function getInstructorReviewsByRating(
  instructorId: string,
  rating: number
): InstructorReview[] {
  console.log("Getting reviews by rating:", { instructorId, rating });
  return mockReviews.filter((r) => r.rating === rating);
}

/**
 * Get published reviews
 */
export function getPublishedReviews(instructorId: string): InstructorReview[] {
  console.log("Getting published reviews for instructor:", instructorId);
  return mockReviews.filter((r) => r.isPublished);
}

/**
 * Get pending reviews
 */
export function getPendingReviews(instructorId: string): InstructorReview[] {
  console.log("Getting pending reviews for instructor:", instructorId);
  return mockReviews.filter((r) => !r.isPublished);
}

/**
 * Get instructor reviews statistics
 */
export function getInstructorReviewsStats(
  instructorId: string
): InstructorReviewsStats {
  console.log("Getting reviews stats for instructor:", instructorId);

  const instructor = instructors.find((i) => i.id === instructorId);
  const reviews = mockReviews;
  const totalReviews = reviews.length;
  const publishedReviews = reviews.filter((r) => r.isPublished).length;
  const pendingReviews = reviews.filter((r) => !r.isPublished).length;
  const repliedReviews = reviews.filter((r) => r.instructorReply).length;

  const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
  const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0;

  const ratingDistribution = {
    5: reviews.filter((r) => r.rating === 5).length,
    4: reviews.filter((r) => r.rating === 4).length,
    3: reviews.filter((r) => r.rating === 3).length,
    2: reviews.filter((r) => r.rating === 2).length,
    1: reviews.filter((r) => r.rating === 1).length,
  };

  return {
    totalReviews: instructor ? instructor.reviewCount : totalReviews,
    averageRating: instructor ? instructor.rating : averageRating,
    publishedReviews,
    pendingReviews,
    repliedReviews,
    ratingDistribution,
  };
}

/**
 * Reply to review (mock implementation)
 */
export function replyToReview(
  instructorId: string,
  reviewId: string,
  message: string
): boolean {
  console.log("Replying to review:", { instructorId, reviewId, message });
  // In real app, this would update the review
  return true;
}

/**
 * Publish review (mock implementation)
 */
export function publishReview(
  instructorId: string,
  reviewId: string
): boolean {
  console.log("Publishing review:", { instructorId, reviewId });
  // In real app, this would update the review status
  return true;
}

/**
 * Unpublish review (mock implementation)
 */
export function unpublishReview(
  instructorId: string,
  reviewId: string
): boolean {
  console.log("Unpublishing review:", { instructorId, reviewId });
  // In real app, this would update the review status
  return true;
}

/**
 * Report review (mock implementation)
 */
export function reportReview(
  instructorId: string,
  reviewId: string,
  reason: string
): boolean {
  console.log("Reporting review:", { instructorId, reviewId, reason });
  // In real app, this would flag the review for admin review
  return true;
}

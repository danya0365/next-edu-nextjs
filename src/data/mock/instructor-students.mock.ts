/**
 * Mock data for instructor students
 * ใช้ข้อมูลจาก instructors.mock.ts และ courses.mock.ts เป็น single source of truth
 */

import { instructors } from "./instructors.mock";
import { getCourseById } from "./courses.mock";

export interface InstructorStudent {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  enrolledCourses: number;
  completedCourses: number;
  totalProgress: number;
  totalSpent: number;
  lastActive: string;
  enrolledAt: string;
  status: "active" | "inactive" | "suspended";
  courses: {
    id: string;
    title: string;
    progress: number;
    lastAccessed: string;
    completedLessons: number;
    totalLessons: number;
    grade?: number;
  }[];
}

export interface InstructorStudentsStats {
  totalStudents: number;
  activeStudents: number;
  inactiveStudents: number;
  suspendedStudents: number;
  averageProgress: number;
  totalRevenue: number;
  averageCoursesPerStudent: number;
  completionRate: number;
}

// Helper function to calculate student data from courses
const calculateStudentData = (courses: { id: string; progress: number; completedLessons: number; totalLessons: number; grade?: number; lastAccessed: string; }[]) => {
  const enrolledCourses = courses.length;
  const completedCourses = courses.filter(c => c.progress === 100).length;
  const totalProgress = courses.reduce((sum, c) => sum + c.progress, 0) / courses.length;
  const totalSpent = courses.reduce((sum, c) => {
    const course = getCourseById(c.id);
    return sum + (course?.price || 0);
  }, 0);
  
  return { enrolledCourses, completedCourses, totalProgress, totalSpent };
};

// Mock students data - คำนวณ enrolledCourses, completedCourses, totalSpent จาก courses จริง
const generateMockStudents = (): InstructorStudent[] => {
  const studentsData = [
    {
      id: "student-001",
      name: "สมชาย ใจดี",
      email: "somchai@example.com",
      lastActive: "2024-01-14T10:30:00Z",
      enrolledAt: "2023-12-01T08:00:00Z",
      status: "active" as const,
      courses: [
      {
        id: "course-001",
        title: getCourseById("course-001")?.title || "เขียนโปรแกรม Python",
        progress: 85,
        lastAccessed: "2024-01-14T10:30:00Z",
        completedLessons: 17,
        totalLessons: 20,
        grade: 88,
      },
      {
        id: "course-002",
        title: getCourseById("course-002")?.title || "Scratch Programming",
        progress: 60,
        lastAccessed: "2024-01-13T15:20:00Z",
        completedLessons: 12,
        totalLessons: 20,
      },
      {
        id: "course-003",
        title: getCourseById("course-003")?.title || "Web Development",
        progress: 50,
        lastAccessed: "2024-01-12T09:15:00Z",
        completedLessons: 5,
        totalLessons: 10,
      },
      ],
    },
    {
      id: "student-002",
      name: "สมหญิง รักเรียน",
      email: "somying@example.com",
      lastActive: "2024-01-14T14:20:00Z",
      enrolledAt: "2023-11-15T10:00:00Z",
      status: "active" as const,
      courses: [
      {
        id: "course-001",
        title: getCourseById("course-001")?.title || "เขียนโปรแกรม Python",
        progress: 100,
        lastAccessed: "2024-01-10T11:00:00Z",
        completedLessons: 20,
        totalLessons: 20,
        grade: 95,
      },
      {
        id: "course-003",
        title: getCourseById("course-003")?.title || "Web Development",
        progress: 100,
        lastAccessed: "2024-01-14T14:20:00Z",
        completedLessons: 10,
        totalLessons: 10,
        grade: 92,
      },
      ],
    },
    {
      id: "student-003",
      name: "ประยุทธ์ ขยัน",
      email: "prayut@example.com",
      lastActive: "2024-01-14T09:00:00Z",
      enrolledAt: "2024-01-01T12:00:00Z",
      status: "active" as const,
      courses: [
      {
        id: "course-001",
        title: getCourseById("course-001")?.title || "เขียนโปรแกรม Python",
        progress: 45,
        lastAccessed: "2024-01-14T09:00:00Z",
        completedLessons: 9,
        totalLessons: 20,
      },
      {
        id: "course-002",
        title: getCourseById("course-002")?.title || "Scratch Programming",
        progress: 30,
        lastAccessed: "2024-01-13T16:30:00Z",
        completedLessons: 6,
        totalLessons: 20,
      },
      {
        id: "course-003",
        title: getCourseById("course-003")?.title || "Web Development",
        progress: 40,
        lastAccessed: "2024-01-12T14:00:00Z",
        completedLessons: 4,
        totalLessons: 10,
      },
      {
        id: "course-004",
        title: getCourseById("course-004")?.title || "วิทยาศาสตร์",
        progress: 25,
        lastAccessed: "2024-01-11T10:30:00Z",
        completedLessons: 5,
        totalLessons: 20,
      },
      ],
    },
    {
      id: "student-004",
      name: "วิไล สวยงาม",
      email: "wilai@example.com",
      lastActive: "2024-01-08T11:00:00Z",
      enrolledAt: "2023-12-20T14:00:00Z",
      status: "inactive" as const,
      courses: [
      {
        id: "course-001",
        title: getCourseById("course-001")?.title || "เขียนโปรแกรม Python",
        progress: 20,
        lastAccessed: "2024-01-08T11:00:00Z",
        completedLessons: 4,
        totalLessons: 20,
      },
      ],
    },
    {
      id: "student-005",
      name: "สุรชัย มานะ",
      email: "surachai@example.com",
      lastActive: "2024-01-14T13:45:00Z",
      enrolledAt: "2023-11-01T09:00:00Z",
      status: "active" as const,
      courses: [
      {
        id: "course-002",
        title: getCourseById("course-002")?.title || "Scratch Programming",
        progress: 100,
        lastAccessed: "2024-01-10T16:00:00Z",
        completedLessons: 20,
        totalLessons: 20,
        grade: 90,
      },
      {
        id: "course-004",
        title: getCourseById("course-004")?.title || "วิทยาศาสตร์",
        progress: 50,
        lastAccessed: "2024-01-14T13:45:00Z",
        completedLessons: 10,
        totalLessons: 20,
      },
      ],
    },
    {
      id: "student-006",
      name: "มานี ตั้งใจ",
      email: "manee@example.com",
      lastActive: "2024-01-14T08:30:00Z",
      enrolledAt: "2023-12-10T11:00:00Z",
      status: "active" as const,
      courses: [
      {
        id: "course-001",
        title: getCourseById("course-001")?.title || "เขียนโปรแกรม Python",
        progress: 70,
        lastAccessed: "2024-01-14T08:30:00Z",
        completedLessons: 14,
        totalLessons: 20,
      },
      {
        id: "course-003",
        title: getCourseById("course-003")?.title || "Web Development",
        progress: 60,
        lastAccessed: "2024-01-13T10:00:00Z",
        completedLessons: 6,
        totalLessons: 10,
      },
      {
        id: "course-002",
        title: getCourseById("course-002")?.title || "Scratch Programming",
        progress: 35,
        lastAccessed: "2024-01-12T15:30:00Z",
        completedLessons: 7,
        totalLessons: 20,
      },
      ],
    },
  ];
  
  // Calculate dynamic fields for each student
  return studentsData.map(student => {
    const calculated = calculateStudentData(student.courses);
    return {
      ...student,
      ...calculated,
    };
  });
};

const mockStudents = generateMockStudents();

/**
 * Get all students for instructor
 */
export function getInstructorStudents(instructorId: string): InstructorStudent[] {
  console.log("Getting students for instructor:", instructorId);
  return mockStudents;
}

/**
 * Get student by ID
 */
export function getInstructorStudentById(
  instructorId: string,
  studentId: string
): InstructorStudent | undefined {
  console.log("Getting student:", { instructorId, studentId });
  return mockStudents.find((s) => s.id === studentId);
}

/**
 * Get students by status
 */
export function getInstructorStudentsByStatus(
  instructorId: string,
  status: "active" | "inactive" | "suspended"
): InstructorStudent[] {
  console.log("Getting students by status:", { instructorId, status });
  return mockStudents.filter((s) => s.status === status);
}

/**
 * Get students by course
 */
export function getInstructorStudentsByCourse(
  instructorId: string,
  courseId: string
): InstructorStudent[] {
  console.log("Getting students by course:", { instructorId, courseId });
  return mockStudents.filter((s) =>
    s.courses.some((c) => c.id === courseId)
  );
}

/**
 * Get instructor students statistics
 */
export function getInstructorStudentsStats(
  instructorId: string
): InstructorStudentsStats {
  console.log("Getting students stats for instructor:", instructorId);

  const instructor = instructors.find((i) => i.id === instructorId);
  const students = mockStudents;
  const totalStudents = students.length;
  const activeStudents = students.filter((s) => s.status === "active").length;
  const inactiveStudents = students.filter((s) => s.status === "inactive").length;
  const suspendedStudents = students.filter((s) => s.status === "suspended").length;

  const totalProgress = students.reduce((sum, s) => sum + s.totalProgress, 0);
  const averageProgress = totalStudents > 0 ? totalProgress / totalStudents : 0;

  // Use instructor data as source of truth for revenue
  const totalRevenue = instructor ? instructor.totalRevenue : students.reduce((sum, s) => sum + s.totalSpent, 0);

  const totalEnrolledCourses = students.reduce(
    (sum, s) => sum + s.enrolledCourses,
    0
  );
  const averageCoursesPerStudent =
    totalStudents > 0 ? totalEnrolledCourses / totalStudents : 0;

  const totalCompletedCourses = students.reduce(
    (sum, s) => sum + s.completedCourses,
    0
  );
  const completionRate =
    totalEnrolledCourses > 0
      ? (totalCompletedCourses / totalEnrolledCourses) * 100
      : 0;

  return {
    totalStudents: instructor ? instructor.studentCount : totalStudents,
    activeStudents,
    inactiveStudents,
    suspendedStudents,
    averageProgress,
    totalRevenue,
    averageCoursesPerStudent,
    completionRate,
  };
}

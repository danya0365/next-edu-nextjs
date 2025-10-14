export interface Enrollment {
  id: string;
  courseId: string;
  studentId: string;
  progress: number;
  completedLessons: string[];
  currentLessonId?: string;
  lastAccessedAt: string;
  status: 'active' | 'completed' | 'paused';
  certificateIssued: boolean;
  certificateId?: string;
  enrolledAt: string;
  completedAt?: string;
}

export const enrollments: Enrollment[] = [
  {
    id: 'enroll-001',
    courseId: 'course-001',
    studentId: 'stud-001',
    progress: 65,
    completedLessons: ['lesson-001', 'lesson-002', 'lesson-003'],
    currentLessonId: 'lesson-004',
    lastAccessedAt: '2025-10-14T07:00:00Z',
    status: 'active',
    certificateIssued: false,
    enrolledAt: '2025-09-01T00:00:00Z',
  },
  {
    id: 'enroll-002',
    courseId: 'course-002',
    studentId: 'stud-001',
    progress: 100,
    completedLessons: ['lesson-010', 'lesson-011', 'lesson-012'],
    lastAccessedAt: '2025-09-15T00:00:00Z',
    status: 'completed',
    certificateIssued: true,
    certificateId: 'cert-001',
    enrolledAt: '2025-08-10T00:00:00Z',
    completedAt: '2025-09-15T00:00:00Z',
  },
  {
    id: 'enroll-003',
    courseId: 'course-003',
    studentId: 'stud-003',
    progress: 100,
    completedLessons: ['lesson-020', 'lesson-021', 'lesson-022'],
    lastAccessedAt: '2025-09-01T00:00:00Z',
    status: 'completed',
    certificateIssued: true,
    certificateId: 'cert-002',
    enrolledAt: '2025-07-15T00:00:00Z',
    completedAt: '2025-09-01T00:00:00Z',
  },
];

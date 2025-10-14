export interface Student {
  id: string;
  userId: string;
  displayName: string;
  email: string;
  avatar: string;
  age: number;
  grade?: string;
  enrolledCourses: string[];
  completedCourses: string[];
  totalLearningTime: number;
  achievements: string[];
  points: number;
  level: number;
  streak: number;
  lastActive: string;
  preferences: {
    defaultPlaybackSpeed?: number;
    defaultQuality?: string;
    autoPlayNext?: boolean;
    emailNotifications?: boolean;
  };
}

export const students: Student[] = [
  {
    id: 'stud-001',
    userId: 'user-stud-001',
    displayName: 'น้องมายด์',
    email: 'mind@example.com',
    avatar: 'https://api.dicebear.com/7.x/big-smile/svg?seed=Mind',
    age: 10,
    grade: 'ป.4',
    enrolledCourses: ['course-001', 'course-002', 'course-004'],
    completedCourses: ['course-002'],
    totalLearningTime: 24,
    achievements: ['ach-001', 'ach-002'],
    points: 2500,
    level: 5,
    streak: 7,
    lastActive: '2025-10-14T07:00:00Z',
    preferences: {
      defaultPlaybackSpeed: 1,
      defaultQuality: '720p',
      autoPlayNext: true,
      emailNotifications: true,
    },
  },
  {
    id: 'stud-002',
    userId: 'user-stud-002',
    displayName: 'น้องปุ๊ก',
    email: 'pook@example.com',
    avatar: 'https://api.dicebear.com/7.x/big-smile/svg?seed=Pook',
    age: 8,
    grade: 'ป.2',
    enrolledCourses: ['course-002', 'course-006'],
    completedCourses: [],
    totalLearningTime: 12,
    achievements: ['ach-001'],
    points: 1200,
    level: 3,
    streak: 3,
    lastActive: '2025-10-13T15:30:00Z',
    preferences: {
      defaultPlaybackSpeed: 1,
      defaultQuality: '720p',
      autoPlayNext: true,
      emailNotifications: false,
    },
  },
  {
    id: 'stud-003',
    userId: 'user-stud-003',
    displayName: 'น้องเอ',
    email: 'ae@example.com',
    avatar: 'https://api.dicebear.com/7.x/big-smile/svg?seed=Ae',
    age: 12,
    grade: 'ม.1',
    enrolledCourses: ['course-003', 'course-001'],
    completedCourses: ['course-003'],
    totalLearningTime: 35,
    achievements: ['ach-001', 'ach-002', 'ach-003'],
    points: 3800,
    level: 7,
    streak: 12,
    lastActive: '2025-10-14T06:45:00Z',
    preferences: {
      defaultPlaybackSpeed: 1.25,
      defaultQuality: '1080p',
      autoPlayNext: true,
      emailNotifications: true,
    },
  },
];

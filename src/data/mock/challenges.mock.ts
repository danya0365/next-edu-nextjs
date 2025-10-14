/**
 * Mock Data: Challenges
 * ความท้าทายสำหรับนักเรียน
 */

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "easy" | "medium" | "hard" | "expert";
  points: number;
  xp: number;
  thumbnail: string;
  startDate: string;
  endDate: string;
  status: "upcoming" | "active" | "ended";
  participants: number;
  completions: number;
  requirements: string[];
  rewards: {
    points: number;
    xp: number;
    badge?: string;
    certificate?: boolean;
  };
  tasks: ChallengeTask[];
  createdAt: string;
  updatedAt: string;
}

export interface ChallengeTask {
  id: string;
  title: string;
  description: string;
  type: "quiz" | "project" | "exercise" | "video" | "reading";
  isRequired: boolean;
  points: number;
  estimatedTime: number; // in minutes
}

export interface UserChallengeProgress {
  challengeId: string;
  userId: string;
  status: "not_started" | "in_progress" | "completed";
  progress: number; // 0-100
  completedTasks: string[];
  earnedPoints: number;
  earnedXp: number;
  startedAt?: string;
  completedAt?: string;
}

export const MOCK_CHALLENGES: Challenge[] = [
  {
    id: "challenge-001",
    title: "🚀 Web Developer Bootcamp",
    description:
      "เรียนรู้การสร้างเว็บไซต์ตั้งแต่เริ่มต้นจนเสร็จสมบูรณ์ ใน 7 วัน!",
    category: "programming",
    difficulty: "medium",
    points: 1000,
    xp: 500,
    thumbnail: "/images/challenges/web-bootcamp.jpg",
    startDate: "2024-01-15T00:00:00Z",
    endDate: "2024-01-22T23:59:59Z",
    status: "active",
    participants: 156,
    completions: 42,
    requirements: ["เรียนคอร์ส HTML & CSS พื้นฐาน", "มีคอมพิวเตอร์และอินเทอร์เน็ต"],
    rewards: {
      points: 1000,
      xp: 500,
      badge: "Web Developer",
      certificate: true,
    },
    tasks: [
      {
        id: "task-001",
        title: "สร้างหน้า Landing Page",
        description: "ออกแบบและสร้างหน้า Landing Page ด้วย HTML และ CSS",
        type: "project",
        isRequired: true,
        points: 200,
        estimatedTime: 120,
      },
      {
        id: "task-002",
        title: "ทำแบบทดสอบ JavaScript",
        description: "ทำแบบทดสอบ JavaScript พื้นฐาน 20 ข้อ",
        type: "quiz",
        isRequired: true,
        points: 150,
        estimatedTime: 30,
      },
      {
        id: "task-003",
        title: "สร้าง Portfolio Website",
        description: "สร้างเว็บไซต์แนะนำตัวเองแบบ Responsive",
        type: "project",
        isRequired: true,
        points: 300,
        estimatedTime: 180,
      },
      {
        id: "task-004",
        title: "เรียนบทเรียน Git & GitHub",
        description: "เรียนรู้การใช้ Git และ GitHub เบื้องต้น",
        type: "video",
        isRequired: false,
        points: 100,
        estimatedTime: 60,
      },
    ],
    createdAt: "2024-01-01T10:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "challenge-002",
    title: "🎨 Digital Art Master",
    description: "ฝึกฝนทักษะการวาดภาพดิจิทัลและสร้างผลงานศิลปะ 5 ชิ้น",
    category: "art",
    difficulty: "easy",
    points: 500,
    xp: 250,
    thumbnail: "/images/challenges/digital-art.jpg",
    startDate: "2024-01-10T00:00:00Z",
    endDate: "2024-01-24T23:59:59Z",
    status: "active",
    participants: 89,
    completions: 31,
    requirements: ["มีแท็บเล็ตหรือคอมพิวเตอร์", "ติดตั้งโปรแกรมวาดภาพ"],
    rewards: {
      points: 500,
      xp: 250,
      badge: "Digital Artist",
      certificate: false,
    },
    tasks: [
      {
        id: "task-005",
        title: "วาดภาพ Character Design",
        description: "ออกแบบและวาดตัวละครต้นแบบ",
        type: "project",
        isRequired: true,
        points: 150,
        estimatedTime: 90,
      },
      {
        id: "task-006",
        title: "ฝึกวาด Background",
        description: "วาดภาพพื้นหลัง 3 แบบ",
        type: "project",
        isRequired: true,
        points: 150,
        estimatedTime: 120,
      },
      {
        id: "task-007",
        title: "เรียนเทคนิคการใช้สี",
        description: "ดูวิดีโอสอนการใช้สีและแสงเงา",
        type: "video",
        isRequired: false,
        points: 50,
        estimatedTime: 45,
      },
    ],
    createdAt: "2024-01-05T10:00:00Z",
    updatedAt: "2024-01-10T00:00:00Z",
  },
  {
    id: "challenge-003",
    title: "🧮 Math Olympiad",
    description: "แข่งขันแก้โจทย์คณิตศาสตร์ระดับโอลิมปิก",
    category: "math",
    difficulty: "hard",
    points: 1500,
    xp: 750,
    thumbnail: "/images/challenges/math-olympiad.jpg",
    startDate: "2024-01-20T00:00:00Z",
    endDate: "2024-01-27T23:59:59Z",
    status: "upcoming",
    participants: 0,
    completions: 0,
    requirements: ["เรียนคณิตศาสตร์ระดับกลาง", "มีพื้นฐานพีชคณิตและเรขาคณิต"],
    rewards: {
      points: 1500,
      xp: 750,
      badge: "Math Genius",
      certificate: true,
    },
    tasks: [
      {
        id: "task-008",
        title: "แก้โจทย์พีชคณิต",
        description: "แก้โจทย์พีชคณิตระดับสูง 10 ข้อ",
        type: "exercise",
        isRequired: true,
        points: 300,
        estimatedTime: 60,
      },
      {
        id: "task-009",
        title: "แก้โจทย์เรขาคณิต",
        description: "แก้โจทย์เรขาคณิตระดับสูง 10 ข้อ",
        type: "exercise",
        isRequired: true,
        points: 300,
        estimatedTime: 60,
      },
      {
        id: "task-010",
        title: "แก้โจทย์ปัญหา",
        description: "แก้โจทย์ปัญหาคณิตศาสตร์ที่ซับซ้อน 5 ข้อ",
        type: "exercise",
        isRequired: true,
        points: 400,
        estimatedTime: 90,
      },
    ],
    createdAt: "2024-01-08T10:00:00Z",
    updatedAt: "2024-01-08T10:00:00Z",
  },
  {
    id: "challenge-004",
    title: "🔬 Science Experiment Week",
    description: "ทำการทดลองวิทยาศาสตร์ 5 ชิ้นและบันทึกผล",
    category: "science",
    difficulty: "easy",
    points: 600,
    xp: 300,
    thumbnail: "/images/challenges/science-week.jpg",
    startDate: "2024-01-12T00:00:00Z",
    endDate: "2024-01-19T23:59:59Z",
    status: "active",
    participants: 67,
    completions: 23,
    requirements: ["อุปกรณ์ทำการทดลองพื้นฐาน", "ผู้ปกครองดูแล"],
    rewards: {
      points: 600,
      xp: 300,
      badge: "Young Scientist",
      certificate: false,
    },
    tasks: [
      {
        id: "task-011",
        title: "ทดลองภูเขาไฟระเบิด",
        description: "ทำการทดลองภูเขาไฟระเบิดและบันทึกผล",
        type: "project",
        isRequired: true,
        points: 120,
        estimatedTime: 45,
      },
      {
        id: "task-012",
        title: "ทดลองแรงโน้มถ่วง",
        description: "ทำการทดลองเกี่ยวกับแรงโน้มถ่วง",
        type: "project",
        isRequired: true,
        points: 120,
        estimatedTime: 45,
      },
      {
        id: "task-013",
        title: "ทดลองไฟฟ้าสถิต",
        description: "ทำการทดลองไฟฟ้าสถิตและบันทึกผล",
        type: "project",
        isRequired: true,
        points: 120,
        estimatedTime: 45,
      },
    ],
    createdAt: "2024-01-06T10:00:00Z",
    updatedAt: "2024-01-12T00:00:00Z",
  },
  {
    id: "challenge-005",
    title: "🎵 Music Composition Challenge",
    description: "แต่งเพลงและบันทึกเสียงด้วยตัวเอง",
    category: "music",
    difficulty: "medium",
    points: 800,
    xp: 400,
    thumbnail: "/images/challenges/music-composition.jpg",
    startDate: "2024-01-08T00:00:00Z",
    endDate: "2024-01-29T23:59:59Z",
    status: "active",
    participants: 45,
    completions: 12,
    requirements: ["มีเครื่องดนตรีหรือโปรแกรมแต่งเพลง", "พื้นฐานทฤษฎีดนตรี"],
    rewards: {
      points: 800,
      xp: 400,
      badge: "Composer",
      certificate: true,
    },
    tasks: [
      {
        id: "task-014",
        title: "แต่งทำนองเพลง",
        description: "แต่งทำนองเพลงต้นฉบับ 1 เพลง",
        type: "project",
        isRequired: true,
        points: 250,
        estimatedTime: 120,
      },
      {
        id: "task-015",
        title: "เขียนเนื้อเพลง",
        description: "เขียนเนื้อเพลงภาษาไทยหรืออังกฤษ",
        type: "project",
        isRequired: true,
        points: 150,
        estimatedTime: 60,
      },
      {
        id: "task-016",
        title: "บันทึกเสียง",
        description: "บันทึกเสียงเพลงที่แต่งเสร็จแล้ว",
        type: "project",
        isRequired: true,
        points: 200,
        estimatedTime: 90,
      },
    ],
    createdAt: "2024-01-03T10:00:00Z",
    updatedAt: "2024-01-08T00:00:00Z",
  },
  {
    id: "challenge-006",
    title: "📚 Reading Marathon",
    description: "อ่านหนังสือ 10 เล่มและเขียนรีวิว",
    category: "language",
    difficulty: "easy",
    points: 400,
    xp: 200,
    thumbnail: "/images/challenges/reading-marathon.jpg",
    startDate: "2024-01-01T00:00:00Z",
    endDate: "2024-01-31T23:59:59Z",
    status: "active",
    participants: 234,
    completions: 89,
    requirements: ["ชอบอ่านหนังสือ", "มีเวลาอ่านหนังสือ"],
    rewards: {
      points: 400,
      xp: 200,
      badge: "Bookworm",
      certificate: false,
    },
    tasks: [
      {
        id: "task-017",
        title: "อ่านหนังสือ 10 เล่ม",
        description: "อ่านหนังสือที่เลือกให้ครบ 10 เล่ม",
        type: "reading",
        isRequired: true,
        points: 200,
        estimatedTime: 600,
      },
      {
        id: "task-018",
        title: "เขียนรีวิวหนังสือ",
        description: "เขียนรีวิวหนังสือแต่ละเล่ม",
        type: "project",
        isRequired: true,
        points: 150,
        estimatedTime: 120,
      },
    ],
    createdAt: "2023-12-25T10:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
];

export const MOCK_USER_CHALLENGE_PROGRESS: UserChallengeProgress[] = [
  {
    challengeId: "challenge-001",
    userId: "student-001",
    status: "in_progress",
    progress: 60,
    completedTasks: ["task-001", "task-002"],
    earnedPoints: 350,
    earnedXp: 175,
    startedAt: "2024-01-15T10:00:00Z",
  },
  {
    challengeId: "challenge-002",
    userId: "student-001",
    status: "completed",
    progress: 100,
    completedTasks: ["task-005", "task-006", "task-007"],
    earnedPoints: 500,
    earnedXp: 250,
    startedAt: "2024-01-10T08:00:00Z",
    completedAt: "2024-01-18T16:30:00Z",
  },
  {
    challengeId: "challenge-004",
    userId: "student-001",
    status: "in_progress",
    progress: 40,
    completedTasks: ["task-011"],
    earnedPoints: 120,
    earnedXp: 60,
    startedAt: "2024-01-12T14:00:00Z",
  },
  {
    challengeId: "challenge-006",
    userId: "student-001",
    status: "in_progress",
    progress: 30,
    completedTasks: [],
    earnedPoints: 0,
    earnedXp: 0,
    startedAt: "2024-01-05T09:00:00Z",
  },
];

/**
 * Get challenge by ID
 */
export function getChallengeById(id: string): Challenge | undefined {
  return MOCK_CHALLENGES.find((challenge) => challenge.id === id);
}

/**
 * Get challenges by category
 */
export function getChallengesByCategory(category: string): Challenge[] {
  return MOCK_CHALLENGES.filter((challenge) => challenge.category === category);
}

/**
 * Get challenges by status
 */
export function getChallengesByStatus(
  status: "upcoming" | "active" | "ended"
): Challenge[] {
  return MOCK_CHALLENGES.filter((challenge) => challenge.status === status);
}

/**
 * Get challenges by difficulty
 */
export function getChallengesByDifficulty(
  difficulty: "easy" | "medium" | "hard" | "expert"
): Challenge[] {
  return MOCK_CHALLENGES.filter(
    (challenge) => challenge.difficulty === difficulty
  );
}

/**
 * Get active challenges
 */
export function getActiveChallenges(): Challenge[] {
  return MOCK_CHALLENGES.filter((challenge) => challenge.status === "active");
}

/**
 * Get user challenge progress
 */
export function getUserChallengeProgress(
  userId: string,
  challengeId: string
): UserChallengeProgress | undefined {
  return MOCK_USER_CHALLENGE_PROGRESS.find(
    (progress) =>
      progress.userId === userId && progress.challengeId === challengeId
  );
}

/**
 * Get all user challenges
 */
export function getUserChallenges(userId: string): UserChallengeProgress[] {
  return MOCK_USER_CHALLENGE_PROGRESS.filter(
    (progress) => progress.userId === userId
  );
}

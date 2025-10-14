/**
 * Mock Data: Live Classes
 * คลาสสดออนไลน์
 */

export interface LiveClass {
  id: string;
  title: string;
  description: string;
  category: string;
  instructorId: string;
  instructorName: string;
  instructorAvatar: string;
  thumbnail: string;
  scheduledAt: string;
  duration: number; // in minutes
  status: "upcoming" | "live" | "ended";
  participants: number;
  maxParticipants: number;
  price: number;
  isFree: boolean;
  tags: string[];
  streamUrl?: string;
  recordingUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export const MOCK_LIVE_CLASSES: LiveClass[] = [
  {
    id: "live-001",
    title: "เริ่มต้นเขียน Python สำหรับเด็ก",
    description:
      "เรียนรู้พื้นฐาน Python ผ่านเกมและกิจกรรมสนุกๆ เหมาะสำหรับผู้เริ่มต้น",
    category: "programming",
    instructorId: "instructor-001",
    instructorName: "ครูแนน",
    instructorAvatar: "/images/instructors/naen.jpg",
    thumbnail: "/images/live-classes/python-basics.jpg",
    scheduledAt: "2024-01-20T14:00:00Z",
    duration: 60,
    status: "live",
    participants: 45,
    maxParticipants: 50,
    price: 0,
    isFree: true,
    tags: ["Python", "Beginner", "Programming"],
    streamUrl: "https://stream.example.com/live-001",
    createdAt: "2024-01-10T10:00:00Z",
    updatedAt: "2024-01-20T14:00:00Z",
  },
  {
    id: "live-002",
    title: "ทดลองวิทยาศาสตร์: ภูเขาไฟระเบิด",
    description:
      "มาทำการทดลองภูเขาไฟระเบิดกันแบบสดๆ พร้อมอธิบายหลักการทางวิทยาศาสตร์",
    category: "science",
    instructorId: "instructor-002",
    instructorName: "ครูบี",
    instructorAvatar: "/images/instructors/bee.jpg",
    thumbnail: "/images/live-classes/volcano-experiment.jpg",
    scheduledAt: "2024-01-21T15:00:00Z",
    duration: 45,
    status: "upcoming",
    participants: 0,
    maxParticipants: 30,
    price: 99,
    isFree: false,
    tags: ["Science", "Experiment", "Chemistry"],
    createdAt: "2024-01-12T10:00:00Z",
    updatedAt: "2024-01-12T10:00:00Z",
  },
  {
    id: "live-003",
    title: "คณิตศาสตร์สนุก: เกมตัวเลข",
    description:
      "เรียนรู้คณิตศาสตร์ผ่านเกมและปริศนาที่สนุกสนาน เหมาะสำหรับเด็กอายุ 7-10 ปี",
    category: "math",
    instructorId: "instructor-003",
    instructorName: "ครูเอ",
    instructorAvatar: "/images/instructors/ae.jpg",
    thumbnail: "/images/live-classes/math-games.jpg",
    scheduledAt: "2024-01-22T10:00:00Z",
    duration: 60,
    status: "upcoming",
    participants: 0,
    maxParticipants: 40,
    price: 0,
    isFree: true,
    tags: ["Math", "Games", "Elementary"],
    createdAt: "2024-01-13T10:00:00Z",
    updatedAt: "2024-01-13T10:00:00Z",
  },
  {
    id: "live-004",
    title: "วาดการ์ตูนน่ารักด้วย Procreate",
    description:
      "เรียนรู้เทคนิคการวาดการ์ตูนดิจิทัลด้วย Procreate สำหรับผู้เริ่มต้น",
    category: "art",
    instructorId: "instructor-004",
    instructorName: "ครูโอ",
    instructorAvatar: "/images/instructors/oh.jpg",
    thumbnail: "/images/live-classes/cartoon-drawing.jpg",
    scheduledAt: "2024-01-23T16:00:00Z",
    duration: 90,
    status: "upcoming",
    participants: 0,
    maxParticipants: 25,
    price: 149,
    isFree: false,
    tags: ["Art", "Digital Art", "Procreate"],
    createdAt: "2024-01-14T10:00:00Z",
    updatedAt: "2024-01-14T10:00:00Z",
  },
  {
    id: "live-005",
    title: "ภาษาอังกฤษสนุก: เรียนผ่านเพลง",
    description:
      "เรียนภาษาอังกฤษผ่านเพลงและเกมสนุกๆ เหมาะสำหรับเด็กเล็ก",
    category: "language",
    instructorId: "instructor-005",
    instructorName: "Teacher Sarah",
    instructorAvatar: "/images/instructors/sarah.jpg",
    thumbnail: "/images/live-classes/english-songs.jpg",
    scheduledAt: "2024-01-24T14:00:00Z",
    duration: 45,
    status: "upcoming",
    participants: 0,
    maxParticipants: 35,
    price: 0,
    isFree: true,
    tags: ["English", "Language", "Songs"],
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "live-006",
    title: "เรียนเปียโนเบื้องต้น",
    description:
      "เริ่มต้นเรียนเปียโนกับครูมืออาชีพ เรียนรู้โน้ตและเพลงง่ายๆ",
    category: "music",
    instructorId: "instructor-006",
    instructorName: "ครูนิว",
    instructorAvatar: "/images/instructors/new.jpg",
    thumbnail: "/images/live-classes/piano-basics.jpg",
    scheduledAt: "2024-01-25T15:00:00Z",
    duration: 60,
    status: "upcoming",
    participants: 0,
    maxParticipants: 20,
    price: 199,
    isFree: false,
    tags: ["Music", "Piano", "Beginner"],
    createdAt: "2024-01-16T10:00:00Z",
    updatedAt: "2024-01-16T10:00:00Z",
  },
  {
    id: "live-007",
    title: "สร้างเกมด้วย Scratch",
    description:
      "เรียนรู้การสร้างเกมง่ายๆ ด้วย Scratch แบบสดๆ พร้อมทำตาม",
    category: "programming",
    instructorId: "instructor-001",
    instructorName: "ครูแนน",
    instructorAvatar: "/images/instructors/naen.jpg",
    thumbnail: "/images/live-classes/scratch-game.jpg",
    scheduledAt: "2024-01-18T14:00:00Z",
    duration: 75,
    status: "ended",
    participants: 48,
    maxParticipants: 50,
    price: 0,
    isFree: true,
    tags: ["Scratch", "Game", "Programming"],
    recordingUrl: "https://recordings.example.com/live-007",
    createdAt: "2024-01-08T10:00:00Z",
    updatedAt: "2024-01-18T15:15:00Z",
  },
  {
    id: "live-008",
    title: "ระบายสีด้วย Watercolor",
    description:
      "เรียนรู้เทคนิคการระบายสีน้ำแบบมืออาชีพ สำหรับเด็กและผู้ใหญ่",
    category: "art",
    instructorId: "instructor-004",
    instructorName: "ครูโอ",
    instructorAvatar: "/images/instructors/oh.jpg",
    thumbnail: "/images/live-classes/watercolor.jpg",
    scheduledAt: "2024-01-19T16:00:00Z",
    duration: 90,
    status: "ended",
    participants: 22,
    maxParticipants: 25,
    price: 149,
    isFree: false,
    tags: ["Art", "Watercolor", "Painting"],
    recordingUrl: "https://recordings.example.com/live-008",
    createdAt: "2024-01-09T10:00:00Z",
    updatedAt: "2024-01-19T17:30:00Z",
  },
];

/**
 * Get live class by ID
 */
export function getLiveClassById(id: string): LiveClass | undefined {
  return MOCK_LIVE_CLASSES.find((liveClass) => liveClass.id === id);
}

/**
 * Get live classes by category
 */
export function getLiveClassesByCategory(category: string): LiveClass[] {
  return MOCK_LIVE_CLASSES.filter(
    (liveClass) => liveClass.category === category
  );
}

/**
 * Get live classes by status
 */
export function getLiveClassesByStatus(
  status: "upcoming" | "live" | "ended"
): LiveClass[] {
  return MOCK_LIVE_CLASSES.filter((liveClass) => liveClass.status === status);
}

/**
 * Get live classes by instructor
 */
export function getLiveClassesByInstructor(instructorId: string): LiveClass[] {
  return MOCK_LIVE_CLASSES.filter(
    (liveClass) => liveClass.instructorId === instructorId
  );
}

/**
 * Get free live classes
 */
export function getFreeLiveClasses(): LiveClass[] {
  return MOCK_LIVE_CLASSES.filter((liveClass) => liveClass.isFree);
}

/**
 * Get upcoming live classes sorted by scheduled time
 */
export function getUpcomingLiveClasses(): LiveClass[] {
  return MOCK_LIVE_CLASSES.filter(
    (liveClass) => liveClass.status === "upcoming"
  ).sort(
    (a, b) =>
      new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()
  );
}

/**
 * Get live now classes
 */
export function getLiveNowClasses(): LiveClass[] {
  return MOCK_LIVE_CLASSES.filter((liveClass) => liveClass.status === "live");
}

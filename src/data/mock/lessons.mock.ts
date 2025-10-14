export interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'code' | 'worksheet';
  url: string;
  size: number;
}

export interface Lesson {
  id: string;
  courseId: string;
  sectionId: string;
  title: string;
  description: string;
  type: 'video' | 'reading' | 'quiz' | 'exercise' | 'project';
  duration: number;
  videoUrl?: string;
  content?: string;
  quizId?: string;
  resources: Resource[];
  order: number;
  isFree: boolean;
  isPreview: boolean;
}

export interface Section {
  id: string;
  courseId: string;
  title: string;
  order: number;
  lessons: Lesson[];
}

// Sample lessons for course-001 (Python for kids)
export const lessons: Lesson[] = [
  {
    id: 'lesson-001',
    courseId: 'course-001',
    sectionId: 'section-001',
    title: 'ทำความรู้จักกับ Python',
    description: 'เรียนรู้ว่า Python คืออะไร และทำไมเราควรเรียน',
    type: 'video',
    duration: 10,
    videoUrl: 'https://example.com/videos/python-intro.mp4',
    resources: [],
    order: 1,
    isFree: true,
    isPreview: true,
  },
  {
    id: 'lesson-002',
    courseId: 'course-001',
    sectionId: 'section-001',
    title: 'ติดตั้ง Python',
    description: 'วิธีติดตั้ง Python และ IDE',
    type: 'video',
    duration: 15,
    videoUrl: 'https://example.com/videos/python-install.mp4',
    resources: [
      {
        id: 'res-001',
        title: 'คู่มือการติดตั้ง',
        type: 'pdf',
        url: 'https://example.com/resources/install-guide.pdf',
        size: 1024000,
      },
    ],
    order: 2,
    isFree: true,
    isPreview: true,
  },
  {
    id: 'lesson-003',
    courseId: 'course-001',
    sectionId: 'section-001',
    title: 'Hello World!',
    description: 'โปรแกรม Python แรกของคุณ',
    type: 'video',
    duration: 12,
    videoUrl: 'https://example.com/videos/hello-world.mp4',
    resources: [],
    order: 3,
    isFree: false,
    isPreview: false,
  },
  {
    id: 'lesson-004',
    courseId: 'course-001',
    sectionId: 'section-002',
    title: 'ตัวแปรและชนิดข้อมูล',
    description: 'เรียนรู้เกี่ยวกับตัวแปรและชนิดข้อมูลใน Python',
    type: 'video',
    duration: 18,
    videoUrl: 'https://example.com/videos/variables.mp4',
    resources: [],
    order: 4,
    isFree: false,
    isPreview: false,
  },
];

export const sections: Section[] = [
  {
    id: 'section-001',
    courseId: 'course-001',
    title: 'เริ่มต้นกับ Python',
    order: 1,
    lessons: lessons.filter((l) => l.sectionId === 'section-001'),
  },
  {
    id: 'section-002',
    courseId: 'course-001',
    title: 'พื้นฐาน Python',
    order: 2,
    lessons: lessons.filter((l) => l.sectionId === 'section-002'),
  },
];

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
    description: 'ในบทเรียนนี้เราจะมาเรียนรู้ว่า Python คืออะไร ทำไมเราควรเรียน Python และ Python ถูกใช้งานอย่างไรในโลกจริง เหมาะสำหรับผู้เริ่มต้นที่ต้องการเข้าใจพื้นฐานการเขียนโปรแกรม Python จะช่วยให้คุณสามารถสร้างเว็บไซต์ วิเคราะห์ข้อมูล และพัฒนาแอปพลิเคชันต่างๆ ได้',
    type: 'video',
    duration: 10,
    videoUrl: 'https://example.com/videos/python-intro.mp4',
    resources: [
      {
        id: 'res-000',
        title: 'สไลด์ประกอบการสอน - ทำความรู้จัก Python',
        type: 'pdf',
        url: 'https://example.com/resources/python-intro-slides.pdf',
        size: 2048000,
      },
      {
        id: 'res-000-2',
        title: 'ใบงาน - ทำความรู้จัก Python',
        type: 'worksheet',
        url: 'https://example.com/resources/python-intro-worksheet.pdf',
        size: 512000,
      },
    ],
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
    description: 'เขียนโปรแกรม Python แรกของคุณด้วยคำสั่ง print() เรียนรู้การแสดงผลข้อความบนหน้าจอ และทำความเข้าใจโครงสร้างพื้นฐานของโปรแกรม Python รวมถึงการใช้ความคิดเห็น (comments) และการจัดการข้อผิดพลาดเบื้องต้น',
    type: 'video',
    duration: 12,
    videoUrl: 'https://example.com/videos/hello-world.mp4',
    resources: [
      {
        id: 'res-003',
        title: 'โค้ดตัวอย่าง Hello World',
        type: 'code',
        url: 'https://example.com/resources/hello-world.py',
        size: 102400,
      },
      {
        id: 'res-003-2',
        title: 'แบบฝึกหัด - Hello World',
        type: 'worksheet',
        url: 'https://example.com/resources/hello-world-exercises.pdf',
        size: 768000,
      },
    ],
    order: 3,
    isFree: false,
    isPreview: false,
  },
  {
    id: 'lesson-004',
    courseId: 'course-001',
    sectionId: 'section-002',
    title: 'ตัวแปรและชนิดข้อมูล',
    description: 'ทำความเข้าใจเกี่ยวกับตัวแปร (Variables) ในภาษา Python การตั้งชื่อตัวแปร และชนิดข้อมูลพื้นฐาน เช่น String, Integer, Float และ Boolean พร้อมเรียนรู้การแปลงชนิดข้อมูล (Type Conversion) และการใช้งานตัวแปรในโปรแกรมจริง',
    type: 'video',
    duration: 18,
    videoUrl: 'https://example.com/videos/variables.mp4',
    resources: [
      {
        id: 'res-004',
        title: 'สรุปชนิดข้อมูลใน Python',
        type: 'pdf',
        url: 'https://example.com/resources/data-types-summary.pdf',
        size: 1536000,
      },
      {
        id: 'res-004-2',
        title: 'ตัวอย่างโค้ด - Variables',
        type: 'code',
        url: 'https://example.com/resources/variables-examples.py',
        size: 204800,
      },
    ],
    order: 4,
    isFree: false,
    isPreview: false,
  },
  // Lessons for course-002 (Scratch Programming)
  {
    id: 'lesson-010',
    courseId: 'course-002',
    sectionId: 'section-010',
    title: 'ทำความรู้จักกับ Scratch',
    description: 'Scratch เป็นภาษาโปรแกรมแบบลากวาง (Visual Programming) ที่สร้างโดย MIT พัฒนาขึ้นเพื่อให้เด็กและผู้เริ่มต้นเรียนรู้การเขียนโปรแกรมได้ง่ายและสนุก ในบทเรียนนี้จะแนะนำส่วนประกอบของ Scratch วิธีการสร้างบัญชี และการใช้งานพื้นฐาน',
    type: 'video',
    duration: 12,
    videoUrl: 'https://example.com/videos/scratch-intro.mp4',
    resources: [
      {
        id: 'res-010-1',
        title: 'คู่มือเริ่มต้น Scratch',
        type: 'pdf',
        url: 'https://example.com/resources/scratch-getting-started.pdf',
        size: 3072000,
      },
    ],
    order: 1,
    isFree: true,
    isPreview: true,
  },
  {
    id: 'lesson-011',
    courseId: 'course-002',
    sectionId: 'section-010',
    title: 'Sprites และ Backgrounds',
    description: 'เรียนรู้การสร้างและจัดการตัวละคร (Sprites) ใน Scratch การเลือกภาพพื้นหลัง (Backgrounds) การวาดภาพด้วยตัวเอง และการนำเข้าภาพจากคอมพิวเตอร์ พร้อมเทคนิคการแก้ไขและตกแต่งให้สวยงาม',
    type: 'video',
    duration: 15,
    videoUrl: 'https://example.com/videos/scratch-sprites.mp4',
    resources: [
      {
        id: 'res-011-1',
        title: 'ชุด Sprites ตัวอย่าง',
        type: 'code',
        url: 'https://example.com/resources/sprites-pack.zip',
        size: 4096000,
      },
      {
        id: 'res-011-2',
        title: 'ภาพพื้นหลังสำเร็จรูป',
        type: 'code',
        url: 'https://example.com/resources/backgrounds-pack.zip',
        size: 5120000,
      },
    ],
    order: 2,
    isFree: true,
    isPreview: true,
  },
  {
    id: 'lesson-012',
    courseId: 'course-002',
    sectionId: 'section-010',
    title: 'การเคลื่อนไหวพื้นฐาน',
    description: 'เรียนรู้การสร้างการเคลื่อนไหวให้กับตัวละครใน Scratch ด้วยบล็อกคำสั่ง Motion การเดิน การวิ่ง การกระโดด และการควบคุมด้วยปุ่มลูกศร รวมถึงการหมุน การเปลี่ยนทิศทาง และการเคลื่อนที่แบบต่างๆ',
    type: 'video',
    duration: 18,
    videoUrl: 'https://example.com/videos/scratch-movement.mp4',
    resources: [
      {
        id: 'res-012-1',
        title: 'ตัวอย่างโปรเจค - การเคลื่อนไหว',
        type: 'code',
        url: 'https://example.com/resources/movement-demo.sb3',
        size: 1024000,
      },
      {
        id: 'res-012-2',
        title: 'แบบฝึกหัดการเคลื่อนไหว',
        type: 'worksheet',
        url: 'https://example.com/resources/movement-exercises.pdf',
        size: 896000,
      },
    ],
    order: 3,
    isFree: false,
    isPreview: false,
  },
  {
    id: 'lesson-013',
    courseId: 'course-002',
    sectionId: 'section-011',
    title: 'เสียงและดนตรี',
    description: 'เพิ่มมิติใหม่ให้โปรเจคของคุณด้วยเสียงและดนตรี เรียนรู้การเพิ่มเสียงพูด เสียงประกอบ และดนตรีพื้นหลัง การบันทึกเสียงด้วยตัวเอง การนำเข้าไฟล์เสียง และการควบคุมระดับเสียง พร้อมสร้างเอฟเฟกต์เสียงที่น่าสนใจ ทำให้โปรเจคของคุณมีชีวิตชีวามากขึ้น',
    type: 'video',
    duration: 14,
    videoUrl: 'https://example.com/videos/scratch-sound.mp4',
    resources: [
      {
        id: 'res-013-1',
        title: 'คลังเสียงประกอบ 100+ เสียง',
        type: 'code',
        url: 'https://example.com/resources/sound-library.zip',
        size: 15360000,
      },
      {
        id: 'res-013-2',
        title: 'เพลงประกอบฟรี 20 เพลง',
        type: 'code',
        url: 'https://example.com/resources/music-pack.zip',
        size: 20480000,
      },
      {
        id: 'res-013-3',
        title: 'คู่มือการใช้งานเสียงใน Scratch',
        type: 'pdf',
        url: 'https://example.com/resources/sound-guide.pdf',
        size: 2048000,
      },
      {
        id: 'res-013-4',
        title: 'โปรเจคตัวอย่าง - เปียโนเสมือนจริง',
        type: 'code',
        url: 'https://example.com/resources/virtual-piano.sb3',
        size: 3072000,
      },
    ],
    order: 4,
    isFree: false,
    isPreview: false,
  },
  {
    id: 'lesson-014',
    courseId: 'course-002',
    sectionId: 'section-011',
    title: 'สร้างเกมแรก',
    description: 'นำความรู้ทั้งหมดที่ได้เรียนมาสร้างเกมง่ายๆ ด้วย Scratch เริ่มต้นจากการวางแผนเกม ออกแบบตัวละคร สร้างกติกา เพิ่มคะแนน และสร้างเงื่อนไขชนะ-แพ้ จนได้เกมที่สมบูรณ์และสนุกสนาน รวมถึงการแบ่งปันโปรเจคกับเพื่อนๆ และการรับฟีดแบ็ก',
    type: 'project',
    duration: 25,
    videoUrl: 'https://example.com/videos/scratch-game.mp4',
    resources: [
      {
        id: 'res-010',
        title: 'โค้ดเกมตัวอย่าง - Catch the Ball',
        type: 'code',
        url: 'https://example.com/resources/game-template.sb3',
        size: 512000,
      },
      {
        id: 'res-014-2',
        title: 'แนวคิดการออกแบบเกม 10 ไอเดีย',
        type: 'pdf',
        url: 'https://example.com/resources/game-ideas.pdf',
        size: 1280000,
      },
      {
        id: 'res-014-3',
        title: 'เทมเพลตเกมสำเร็จรูป 5 แบบ',
        type: 'code',
        url: 'https://example.com/resources/game-templates.zip',
        size: 3584000,
      },
    ],
    order: 5,
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
  {
    id: 'section-010',
    courseId: 'course-002',
    title: 'เริ่มต้นกับ Scratch',
    order: 1,
    lessons: lessons.filter((l) => l.sectionId === 'section-010'),
  },
  {
    id: 'section-011',
    courseId: 'course-002',
    title: 'สร้างโปรเจค Scratch',
    order: 2,
    lessons: lessons.filter((l) => l.sectionId === 'section-011'),
  },
];

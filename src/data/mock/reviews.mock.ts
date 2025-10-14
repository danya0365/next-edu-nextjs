export interface Review {
  id: string;
  courseId: string;
  studentId: string;
  rating: number;
  title: string;
  comment: string;
  helpful: number;
  reportCount: number;
  isVerifiedPurchase: boolean;
  images?: string[];
  createdAt: string;
  updatedAt?: string;
}

export const reviews: Review[] = [
  {
    id: 'review-001',
    courseId: 'course-001',
    studentId: 'stud-001',
    rating: 5,
    title: 'เรียนสนุกมาก!',
    comment: 'ชอบมากค่ะ ครูสอนเข้าใจง่าย ตอนนี้เขียน Python ได้แล้ว',
    helpful: 24,
    reportCount: 0,
    isVerifiedPurchase: true,
    createdAt: '2025-09-15T00:00:00Z',
  },
  {
    id: 'review-002',
    courseId: 'course-002',
    studentId: 'stud-001',
    rating: 5,
    title: 'Scratch สนุกสุดๆ',
    comment: 'สร้างเกมได้แล้ว เพื่อนๆ ชอบมาก',
    helpful: 18,
    reportCount: 0,
    isVerifiedPurchase: true,
    createdAt: '2025-08-20T00:00:00Z',
  },
  {
    id: 'review-003',
    courseId: 'course-003',
    studentId: 'stud-003',
    rating: 4,
    title: 'ดีมาก แนะนำเลย',
    comment: 'เรียนแล้วทำเว็บเป็นแล้ว แต่อยากให้มีเนื้อหา JavaScript ด้วย',
    helpful: 31,
    reportCount: 0,
    isVerifiedPurchase: true,
    createdAt: '2025-09-01T00:00:00Z',
  },
  {
    id: 'review-004',
    courseId: 'course-004',
    studentId: 'stud-002',
    rating: 5,
    title: 'ทดลองวิทย์สนุกมาก',
    comment: 'ทำการทดลองตามได้หมด สนุกและน่าตื่นเต้น',
    helpful: 15,
    reportCount: 0,
    isVerifiedPurchase: true,
    createdAt: '2025-09-10T00:00:00Z',
  },
];

/**
 * Mock data for instructor earnings
 * ใช้ข้อมูลจาก instructors.mock.ts และ courses.mock.ts เป็น single source of truth
 */

import { instructors } from "./instructors.mock";
import { courses, getCourseById } from "./courses.mock";

export interface Transaction {
  id: string;
  type: "sale" | "refund" | "withdrawal" | "bonus";
  courseId?: string;
  courseTitle?: string;
  studentName?: string;
  amount: number;
  platformFee: number;
  netAmount: number;
  status: "completed" | "pending" | "processing" | "failed";
  date: string;
  description: string;
}

export interface EarningsSummary {
  totalEarnings: number;
  thisMonthEarnings: number;
  lastMonthEarnings: number;
  pendingBalance: number;
  availableBalance: number;
  totalWithdrawals: number;
  totalStudents: number;
  averageOrderValue: number;
}

export interface MonthlyEarnings {
  month: string;
  year: number;
  earnings: number;
  sales: number;
  refunds: number;
}

export interface CourseEarnings {
  courseId: string;
  courseTitle: string;
  totalSales: number;
  totalEarnings: number;
  studentCount: number;
  averageRating: number;
  lastSaleDate: string;
}

// Mock transactions data - ใช้ข้อมูล course จาก courses.mock.ts
const generateMockTransactions = (): Transaction[] => {
  const course1 = getCourseById("course-001");
  const course2 = getCourseById("course-002");
  
  return [
    {
      id: "txn-001",
      type: "sale",
      courseId: "course-001",
      courseTitle: course1?.title || "Python สำหรับเด็ก",
      studentName: "สมชาย ใจดี",
      amount: course1?.price || 1290,
      platformFee: Math.floor((course1?.price || 1290) * 0.2),
      netAmount: Math.floor((course1?.price || 1290) * 0.8),
      status: "completed",
      date: "2024-01-14T10:30:00Z",
      description: "โขายคอร์ส",
    },
    {
      id: "txn-002",
      type: "sale",
      courseId: "course-002",
      courseTitle: course2?.title || "Scratch Programming",
      studentName: "สมหญิง รักเรียน",
      amount: course2?.price || 990,
      platformFee: Math.floor((course2?.price || 990) * 0.2),
      netAmount: Math.floor((course2?.price || 990) * 0.8),
      status: "completed",
      date: "2024-01-14T09:15:00Z",
      description: "ขายคอร์ส",
    },
  {
    id: "txn-003",
    type: "withdrawal",
    amount: 5000,
    platformFee: 0,
    netAmount: 5000,
    status: "completed",
    date: "2024-01-13T14:00:00Z",
    description: "ถอนเงิน",
  },
    {
      id: "txn-004",
      type: "sale",
      courseId: "course-003",
      courseTitle: getCourseById("course-003")?.title || "Web Development",
      studentName: "ประยุทธ์ ขยัน",
      amount: getCourseById("course-003")?.price || 1490,
      platformFee: Math.floor((getCourseById("course-003")?.price || 1490) * 0.2),
      netAmount: Math.floor((getCourseById("course-003")?.price || 1490) * 0.8),
      status: "completed",
      date: "2024-01-13T11:20:00Z",
      description: "ขายคอร์ส",
    },
    {
      id: "txn-005",
      type: "sale",
      courseId: "course-001",
      courseTitle: course1?.title || "Python สำหรับเด็ก",
      studentName: "วิไล สวยงาม",
      amount: course1?.price || 1290,
      platformFee: Math.floor((course1?.price || 1290) * 0.2),
      netAmount: Math.floor((course1?.price || 1290) * 0.8),
      status: "completed",
      date: "2024-01-12T16:45:00Z",
      description: "ขายคอร์ส",
    },
  {
    id: "txn-006",
    type: "bonus",
    amount: 500,
    platformFee: 0,
    netAmount: 500,
    status: "completed",
    date: "2024-01-12T10:00:00Z",
    description: "โบนัสผู้สอนยอดเยี่ยมประจำเดือน",
  },
    {
      id: "txn-007",
      type: "sale",
      courseId: "course-002",
      courseTitle: course2?.title || "Scratch Programming",
      studentName: "สุรชัย มานะ",
      amount: course2?.price || 990,
      platformFee: Math.floor((course2?.price || 990) * 0.2),
      netAmount: Math.floor((course2?.price || 990) * 0.8),
      status: "completed",
      date: "2024-01-11T13:30:00Z",
      description: "ขายคอร์ส",
    },
    {
      id: "txn-008",
      type: "sale",
      courseId: "course-001",
      courseTitle: course1?.title || "Python สำหรับเด็ก",
      studentName: "มานี ตั้งใจ",
      amount: course1?.price || 1290,
      platformFee: Math.floor((course1?.price || 1290) * 0.2),
      netAmount: Math.floor((course1?.price || 1290) * 0.8),
      status: "completed",
      date: "2024-01-10T15:00:00Z",
      description: "ขายคอร์ส",
    },
    {
      id: "txn-009",
      type: "refund",
      courseId: "course-004",
      courseTitle: getCourseById("course-004")?.title || "วิทยาศาสตร์",
      studentName: "สมศักดิ์ เรียนรู้",
      amount: -(getCourseById("course-004")?.price || 890),
      platformFee: 0,
      netAmount: -Math.floor((getCourseById("course-004")?.price || 890) * 0.8),
      status: "completed",
      date: "2024-01-10T10:00:00Z",
      description: "คืนเงิน",
    },
    {
      id: "txn-010",
      type: "sale",
      courseId: "course-003",
      courseTitle: getCourseById("course-003")?.title || "Web Development",
      studentName: "ปรีชา ฉลาด",
      amount: getCourseById("course-003")?.price || 1490,
      platformFee: Math.floor((getCourseById("course-003")?.price || 1490) * 0.2),
      netAmount: Math.floor((getCourseById("course-003")?.price || 1490) * 0.8),
      status: "pending",
      date: "2024-01-14T18:00:00Z",
      description: "ขายคอร์ส (รอดำเนินการ)",
    },
  ];
};

const mockTransactions = generateMockTransactions();

// Mock monthly earnings data
const mockMonthlyEarnings: MonthlyEarnings[] = [
  { month: "มกราคม", year: 2024, earnings: 12500, sales: 10, refunds: 1 },
  { month: "ธันวาคม", year: 2023, earnings: 15000, sales: 12, refunds: 0 },
  { month: "พฤศจิกายน", year: 2023, earnings: 18000, sales: 15, refunds: 1 },
  { month: "ตุลาคม", year: 2023, earnings: 14000, sales: 11, refunds: 0 },
  { month: "กันยายน", year: 2023, earnings: 16500, sales: 13, refunds: 2 },
  { month: "สิงหาคม", year: 2023, earnings: 20000, sales: 16, refunds: 0 },
];

// Mock course earnings data - ใช้ข้อมูลจาก courses.mock.ts
const generateCourseEarnings = (instructorId?: string): CourseEarnings[] => {
  const instructorCourses = instructorId 
    ? courses.filter(c => c.instructorId === instructorId)
    : courses;
  
  return instructorCourses.map(course => ({
    courseId: course.id,
    courseTitle: course.title,
    totalSales: course.studentCount,
    totalEarnings: Math.floor(course.price * course.studentCount * 0.8), // 80% after platform fee
    studentCount: course.studentCount,
    averageRating: course.rating,
    lastSaleDate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
  }));
};

/**
 * Get all transactions for instructor
 */
export function getInstructorTransactions(
  instructorId: string
): Transaction[] {
  console.log("Getting transactions for instructor:", instructorId);
  return mockTransactions;
}

/**
 * Get transactions by type
 */
export function getTransactionsByType(
  instructorId: string,
  type: "sale" | "refund" | "withdrawal" | "bonus"
): Transaction[] {
  console.log("Getting transactions by type:", { instructorId, type });
  return mockTransactions.filter((t) => t.type === type);
}

/**
 * Get transactions by status
 */
export function getTransactionsByStatus(
  instructorId: string,
  status: "completed" | "pending" | "processing" | "failed"
): Transaction[] {
  console.log("Getting transactions by status:", { instructorId, status });
  return mockTransactions.filter((t) => t.status === status);
}

/**
 * Get earnings summary
 */
export function getEarningsSummary(instructorId: string): EarningsSummary {
  console.log("Getting earnings summary for instructor:", instructorId);

  const instructor = instructors.find((i) => i.id === instructorId);
  const completedTransactions = mockTransactions.filter(
    (t) => t.status === "completed"
  );
  const pendingTransactions = mockTransactions.filter(
    (t) => t.status === "pending"
  );

  const totalEarnings = completedTransactions.reduce(
    (sum, t) => sum + t.netAmount,
    0
  );

  const thisMonth = new Date().getMonth();
  const thisYear = new Date().getFullYear();
  const thisMonthEarnings = completedTransactions
    .filter((t) => {
      const date = new Date(t.date);
      return date.getMonth() === thisMonth && date.getFullYear() === thisYear;
    })
    .reduce((sum, t) => sum + t.netAmount, 0);

  const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;
  const lastMonthYear = thisMonth === 0 ? thisYear - 1 : thisYear;
  const lastMonthEarnings = completedTransactions
    .filter((t) => {
      const date = new Date(t.date);
      return (
        date.getMonth() === lastMonth && date.getFullYear() === lastMonthYear
      );
    })
    .reduce((sum, t) => sum + t.netAmount, 0);

  const pendingBalance = pendingTransactions.reduce(
    (sum, t) => sum + t.netAmount,
    0
  );

  const totalWithdrawals = completedTransactions
    .filter((t) => t.type === "withdrawal")
    .reduce((sum, t) => sum + Math.abs(t.netAmount), 0);

  const availableBalance = totalEarnings - totalWithdrawals;

  const salesTransactions = completedTransactions.filter(
    (t) => t.type === "sale"
  );
  const totalStudents = new Set(
    salesTransactions.map((t) => t.studentName)
  ).size;

  const averageOrderValue =
    salesTransactions.length > 0
      ? salesTransactions.reduce((sum, t) => sum + t.amount, 0) /
        salesTransactions.length
      : 0;

  return {
    totalEarnings: instructor ? instructor.totalRevenue : totalEarnings,
    thisMonthEarnings,
    lastMonthEarnings,
    pendingBalance,
    availableBalance,
    totalWithdrawals,
    totalStudents: instructor ? instructor.studentCount : totalStudents,
    averageOrderValue,
  };
}

/**
 * Get monthly earnings
 */
export function getMonthlyEarnings(instructorId: string): MonthlyEarnings[] {
  console.log("Getting monthly earnings for instructor:", instructorId);
  return mockMonthlyEarnings;
}

/**
 * Get course earnings
 */
export function getCourseEarnings(instructorId: string): CourseEarnings[] {
  console.log("Getting course earnings for instructor:", instructorId);
  return generateCourseEarnings(instructorId);
}

/**
 * Request withdrawal (mock implementation)
 */
export function requestWithdrawal(
  instructorId: string,
  amount: number,
  bankAccount: string
): boolean {
  console.log("Requesting withdrawal:", { instructorId, amount, bankAccount });
  // In real app, this would create a withdrawal request
  return true;
}

/**
 * Get withdrawal history (mock implementation)
 */
export function getWithdrawalHistory(instructorId: string): Transaction[] {
  console.log("Getting withdrawal history for instructor:", instructorId);
  return mockTransactions.filter((t) => t.type === "withdrawal");
}

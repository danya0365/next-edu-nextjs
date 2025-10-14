export interface Question {
  id: string;
  type: string;
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  points: number;
}

export interface Quiz {
  id: string;
  lessonId: string;
  title: string;
  description: string;
  questions: Question[];
  passingScore: number;
  timeLimit?: number;
  allowRetries: boolean;
  maxAttempts?: number;
}

export const quizzes: Quiz[] = [
  {
    id: 'quiz-001',
    lessonId: 'lesson-003',
    title: 'แบบทดสอบ Hello World',
    description: 'ทดสอบความเข้าใจเกี่ยวกับโปรแกรมแรก',
    questions: [
      {
        id: 'q-001',
        type: 'multiple_choice',
        question: 'คำสั่งใดใช้แสดงข้อความใน Python?',
        options: ['print()', 'show()', 'display()', 'echo()'],
        correctAnswer: 'print()',
        explanation: 'คำสั่ง print() ใช้สำหรับแสดงข้อความบนหน้าจอ',
        points: 10,
      },
      {
        id: 'q-002',
        type: 'true_false',
        question: 'Python เป็นภาษาโปรแกรมที่เรียนรู้ง่าย',
        correctAnswer: 'true',
        explanation: 'Python ถูกออกแบบมาให้อ่านง่ายและเรียนรู้ง่าย',
        points: 10,
      },
    ],
    passingScore: 70,
    allowRetries: true,
    maxAttempts: 3,
  },
];

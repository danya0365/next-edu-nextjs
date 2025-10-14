export interface QuizType {
  id: string;
  name: string; // multiple_choice, true_false, fill_blank, matching, essay
  slug: string;
}

export const quizTypes: QuizType[] = [
  {
    id: 'qtype-001',
    name: 'ปรนัย',
    slug: 'multiple_choice',
  },
  {
    id: 'qtype-002',
    name: 'ถูก/ผิด',
    slug: 'true_false',
  },
  {
    id: 'qtype-003',
    name: 'เติมคำ',
    slug: 'fill_blank',
  },
  {
    id: 'qtype-004',
    name: 'จับคู่',
    slug: 'matching',
  },
  {
    id: 'qtype-005',
    name: 'อัตนัย',
    slug: 'essay',
  },
];

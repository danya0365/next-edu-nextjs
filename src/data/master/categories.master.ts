export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string; // Lucide icon name
  color: string; // Hex color
  description: string;
  order: number; // Display order
}

export const categories: Category[] = [
  {
    id: 'cat-001',
    name: 'พัฒนาเว็บไซต์',
    slug: 'web-development',
    icon: 'Code',
    color: '#3B82F6',
    description: 'เรียนรู้การสร้างเว็บไซต์และแอปพลิเคชัน',
    order: 1,
  },
  {
    id: 'cat-002',
    name: 'โปรแกรมมิ่ง',
    slug: 'programming',
    icon: 'Terminal',
    color: '#8B5CF6',
    description: 'เรียนรู้พื้นฐานการเขียนโปรแกรม',
    order: 2,
  },
  {
    id: 'cat-003',
    name: 'วิทยาศาสตร์',
    slug: 'science',
    icon: 'Microscope',
    color: '#10B981',
    description: 'สำรวจโลกแห่งวิทยาศาสตร์',
    order: 3,
  },
  {
    id: 'cat-004',
    name: 'คณิตศาสตร์',
    slug: 'mathematics',
    icon: 'Calculator',
    color: '#F59E0B',
    description: 'เรียนคณิตศาสตร์อย่างสนุกสนาน',
    order: 4,
  },
  {
    id: 'cat-005',
    name: 'ศิลปะและงานฝีมือ',
    slug: 'art-crafts',
    icon: 'Palette',
    color: '#FF6B9D',
    description: 'สร้างสรรค์ผลงานศิลปะที่สวยงาม',
    order: 5,
  },
  {
    id: 'cat-006',
    name: 'ดนตรี',
    slug: 'music',
    icon: 'Music',
    color: '#EC4899',
    description: 'เรียนรู้ดนตรีและเครื่องดนตรี',
    order: 6,
  },
  {
    id: 'cat-007',
    name: 'ภาษา',
    slug: 'languages',
    icon: 'Languages',
    color: '#6366F1',
    description: 'เรียนภาษาต่างประเทศ',
    order: 7,
  },
  {
    id: 'cat-008',
    name: 'ประวัติศาสตร์',
    slug: 'history',
    icon: 'BookOpen',
    color: '#EF4444',
    description: 'เรียนรู้เรื่องราวในอดีต',
    order: 8,
  },
  {
    id: 'cat-009',
    name: 'การออกแบบ',
    slug: 'design',
    icon: 'Figma',
    color: '#FDB462',
    description: 'เรียนรู้การออกแบบกราฟิกและ UI/UX',
    order: 9,
  },
  {
    id: 'cat-010',
    name: 'กีฬาและสุขภาพ',
    slug: 'sports-health',
    icon: 'Dumbbell',
    color: '#14B8A6',
    description: 'ดูแลสุขภาพและออกกำลังกาย',
    order: 10,
  },
];

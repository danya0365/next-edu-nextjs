export interface Level {
  id: string;
  name: string; // เริ่มต้น, กลาง, สูง, ผู้เชี่ยวชาญ
  slug: string;
  order: number;
  color: string;
  icon: string;
}

export const levels: Level[] = [
  {
    id: 'level-001',
    name: 'เริ่มต้น',
    slug: 'beginner',
    order: 1,
    color: '#10B981',
    icon: 'Sprout',
  },
  {
    id: 'level-002',
    name: 'กลาง',
    slug: 'intermediate',
    order: 2,
    color: '#F59E0B',
    icon: 'Flame',
  },
  {
    id: 'level-003',
    name: 'สูง',
    slug: 'advanced',
    order: 3,
    color: '#EF4444',
    icon: 'Zap',
  },
  {
    id: 'level-004',
    name: 'ผู้เชี่ยวชาญ',
    slug: 'expert',
    order: 4,
    color: '#8B5CF6',
    icon: 'Crown',
  },
];

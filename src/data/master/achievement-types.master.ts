export interface AchievementType {
  id: string;
  name: string; // เรียนครบ, ทำแบบทดสอบผ่าน, streak, participation
  slug: string;
  icon: string;
  color: string;
}

export const achievementTypes: AchievementType[] = [
  {
    id: 'achtype-001',
    name: 'เรียนจบคอร์ส',
    slug: 'course-completion',
    icon: 'GraduationCap',
    color: '#10B981',
  },
  {
    id: 'achtype-002',
    name: 'ทำแบบทดสอบผ่าน',
    slug: 'quiz-completion',
    icon: 'CheckCircle',
    color: '#3B82F6',
  },
  {
    id: 'achtype-003',
    name: 'เรียนติดต่อกัน',
    slug: 'streak',
    icon: 'Flame',
    color: '#F59E0B',
  },
  {
    id: 'achtype-004',
    name: 'มีส่วนร่วม',
    slug: 'participation',
    icon: 'Users',
    color: '#FF6B9D',
  },
  {
    id: 'achtype-005',
    name: 'คะแนนเต็ม',
    slug: 'perfect-score',
    icon: 'Star',
    color: '#FDB462',
  },
  {
    id: 'achtype-006',
    name: 'ความก้าวหน้า',
    slug: 'milestone',
    icon: 'Trophy',
    color: '#8B5CF6',
  },
];

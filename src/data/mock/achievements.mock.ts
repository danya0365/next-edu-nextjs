export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  typeId: string;
  requirement: string;
  points: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export const achievements: Achievement[] = [
  {
    id: 'ach-001',
    name: 'เริ่มต้นการเดินทาง',
    description: 'ลงทะเบียนคอร์สแรก',
    icon: 'Rocket',
    color: '#10B981',
    typeId: 'achtype-006',
    requirement: 'ลงทะเบียนคอร์ส 1 คอร์ส',
    points: 100,
    rarity: 'common',
  },
  {
    id: 'ach-002',
    name: 'คอร์สแรกจบแล้ว!',
    description: 'เรียนจบคอร์สแรกของคุณ',
    icon: 'GraduationCap',
    color: '#3B82F6',
    typeId: 'achtype-001',
    requirement: 'เรียนจบ 1 คอร์ส',
    points: 500,
    rarity: 'rare',
  },
  {
    id: 'ach-003',
    name: 'เชี่ยวชาญ',
    description: 'เรียนจบ 5 คอร์ส',
    icon: 'Award',
    color: '#8B5CF6',
    typeId: 'achtype-001',
    requirement: 'เรียนจบ 5 คอร์ส',
    points: 2000,
    rarity: 'epic',
  },
  {
    id: 'ach-004',
    name: 'ไฟกำลังติด',
    description: 'เรียนติดต่อกัน 7 วัน',
    icon: 'Flame',
    color: '#F59E0B',
    typeId: 'achtype-003',
    requirement: 'เรียน 7 วันติดต่อกัน',
    points: 300,
    rarity: 'rare',
  },
  {
    id: 'ach-005',
    name: 'คะแนนเต็ม!',
    description: 'ทำแบบทดสอบได้คะแนนเต็ม',
    icon: 'Star',
    color: '#FDB462',
    typeId: 'achtype-005',
    requirement: 'ได้คะแนนเต็มในแบบทดสอบ',
    points: 200,
    rarity: 'common',
  },
];

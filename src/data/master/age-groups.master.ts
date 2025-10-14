export interface AgeGroup {
  id: string;
  name: string; // "6-8 ปี", "9-11 ปี", etc.
  slug: string;
  minAge: number;
  maxAge: number;
  color: string;
  icon: string;
}

export const ageGroups: AgeGroup[] = [
  {
    id: 'age-001',
    name: '6-8 ปี',
    slug: '6-8',
    minAge: 6,
    maxAge: 8,
    color: '#FF6B9D',
    icon: 'Baby',
  },
  {
    id: 'age-002',
    name: '9-11 ปี',
    slug: '9-11',
    minAge: 9,
    maxAge: 11,
    color: '#FDB462',
    icon: 'Smile',
  },
  {
    id: 'age-003',
    name: '12-14 ปี',
    slug: '12-14',
    minAge: 12,
    maxAge: 14,
    color: '#3B82F6',
    icon: 'User',
  },
  {
    id: 'age-004',
    name: '15-18 ปี',
    slug: '15-18',
    minAge: 15,
    maxAge: 18,
    color: '#8B5CF6',
    icon: 'GraduationCap',
  },
];

export interface Certificate {
  id: string;
  studentId: string;
  courseId: string;
  certificateNumber: string;
  issuedDate: string;
  instructor: string;
  courseName: string;
  completionDate: string;
  skillsAcquired: string[];
}

export const certificates: Certificate[] = [
  {
    id: 'cert-001',
    studentId: 'stud-001',
    courseId: 'course-002',
    certificateNumber: 'NEXTEDU-2025-001234',
    issuedDate: '2025-09-15T00:00:00Z',
    instructor: 'ครูนิด',
    courseName: 'Scratch: เริ่มต้นเขียนโปรแกรม',
    completionDate: '2025-09-15T00:00:00Z',
    skillsAcquired: ['Scratch', 'การคิดเชิงตรรกะ', 'ความคิดสร้างสรรค์'],
  },
  {
    id: 'cert-002',
    studentId: 'stud-003',
    courseId: 'course-003',
    certificateNumber: 'NEXTEDU-2025-001235',
    issuedDate: '2025-09-01T00:00:00Z',
    instructor: 'ครูเอ็ม',
    courseName: 'สร้างเว็บไซต์แรกของคุณ',
    completionDate: '2025-09-01T00:00:00Z',
    skillsAcquired: ['HTML', 'CSS', 'Web Design'],
  },
];

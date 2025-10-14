import { certificates } from '@/src/data/mock/certificates.mock';
import { students } from '@/src/data/mock/students.mock';
import { courses } from '@/src/data/mock/courses.mock';
import { instructors } from '@/src/data/mock/instructors.mock';

export interface CertificateItem {
  id: string;
  certificateNumber: string;
  courseName: string;
  courseSlug: string;
  instructorName: string;
  issuedDate: string;
  completionDate: string;
  skillsAcquired: string[];
  thumbnailUrl: string;
}

export interface CertificatesViewModel {
  certificates: CertificateItem[];
  totalCertificates: number;
}

export class CertificatesPresenter {
  static async getViewModel(userId: string): Promise<CertificatesViewModel> {
    // Get student data
    const student = students.find((s) => s.userId === userId);
    if (!student) {
      throw new Error('Student not found');
    }

    // Get student certificates
    const studentCertificates = certificates.filter((cert) => cert.studentId === student.id);

    // Map certificates with course details
    const certificateItems: CertificateItem[] = studentCertificates.map((cert) => {
      const course = courses.find((c) => c.id === cert.courseId);
      const instructor = course ? instructors.find((i) => i.id === course.instructorId) : null;

      return {
        id: cert.id,
        certificateNumber: cert.certificateNumber,
        courseName: cert.courseName || course?.title || '',
        courseSlug: course?.slug || '',
        instructorName: cert.instructor || instructor?.displayName || '',
        issuedDate: cert.issuedDate,
        completionDate: cert.completionDate,
        skillsAcquired: cert.skillsAcquired,
        thumbnailUrl: course?.thumbnail || '',
      };
    });

    // Sort by issued date (newest first)
    certificateItems.sort((a, b) => 
      new Date(b.issuedDate).getTime() - new Date(a.issuedDate).getTime()
    );

    return {
      certificates: certificateItems,
      totalCertificates: certificateItems.length,
    };
  }
}

// Server-side factory
export class ServerCertificatesPresenterFactory {
  static async create(userId: string): Promise<CertificatesViewModel> {
    return CertificatesPresenter.getViewModel(userId);
  }
}

// Client-side factory
export class ClientCertificatesPresenterFactory {
  static async create(userId: string): Promise<CertificatesViewModel> {
    return CertificatesPresenter.getViewModel(userId);
  }
}

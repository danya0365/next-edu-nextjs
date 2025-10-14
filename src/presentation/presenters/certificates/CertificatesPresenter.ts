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

/**
 * Presenter for Certificates management
 * Follows Clean Architecture with proper separation of concerns
 */
export class CertificatesPresenter {
  constructor() {
    // Mock data - no supabase client needed
  }

  /**
   * Get view model for the page
   */
  async getViewModel(userId: string): Promise<CertificatesViewModel> {
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

/**
 * Factory for creating CertificatesPresenter instances
 */
export class CertificatesPresenterFactory {
  static async createServer(): Promise<CertificatesPresenter> {
    return new CertificatesPresenter();
  }

  static async createClient(): Promise<CertificatesPresenter> {
    return new CertificatesPresenter();
  }
}

// Backward compatibility exports
export class ServerCertificatesPresenterFactory {
  static async create(userId: string): Promise<CertificatesViewModel> {
    const presenter = await CertificatesPresenterFactory.createServer();
    return presenter.getViewModel(userId);
  }
}

export class ClientCertificatesPresenterFactory {
  static async create(userId: string): Promise<CertificatesViewModel> {
    const presenter = await CertificatesPresenterFactory.createClient();
    return presenter.getViewModel(userId);
  }
}

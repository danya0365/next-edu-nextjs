import {
  getInstructorStudents,
  getInstructorStudentsStats,
  type InstructorStudent,
  type InstructorStudentsStats,
} from "@/src/data/mock/instructor-students.mock";
import type { Metadata } from "next";

export interface InstructorStudentsViewModel {
  students: InstructorStudent[];
  stats: InstructorStudentsStats;
  instructorId: string;
}

export class InstructorStudentsPresenter {
  /**
   * Get view model for instructor students
   */
  static async getViewModel(
    instructorId: string,
    status?: "active" | "inactive" | "suspended"
  ): Promise<InstructorStudentsViewModel> {
    console.log("InstructorStudentsPresenter.getViewModel", {
      instructorId,
      status,
    });

    // Get all students for instructor
    let students = getInstructorStudents(instructorId);

    // Filter by status if provided
    if (status) {
      students = students.filter((student) => student.status === status);
    }

    // Sort by last active (most recent first)
    students.sort(
      (a, b) =>
        new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime()
    );

    // Get statistics
    const stats = getInstructorStudentsStats(instructorId);

    return {
      students,
      stats,
      instructorId,
    };
  }

  /**
   * Send message to student (mock implementation)
   */
  static async sendMessage(
    studentId: string,
    instructorId: string,
    message: string
  ): Promise<boolean> {
    console.log("Sending message to student:", {
      studentId,
      instructorId,
      message,
    });
    // In real app, this would send message via messaging system
    return true;
  }

  /**
   * Suspend student (mock implementation)
   */
  static async suspendStudent(
    studentId: string,
    instructorId: string
  ): Promise<boolean> {
    console.log("Suspending student:", { studentId, instructorId });
    // In real app, this would update student status
    return true;
  }

  /**
   * Activate student (mock implementation)
   */
  static async activateStudent(
    studentId: string,
    instructorId: string
  ): Promise<boolean> {
    console.log("Activating student:", { studentId, instructorId });
    // In real app, this would update student status
    return true;
  }

  /**
   * Generate metadata for SEO
   */
  static async generateMetadata(): Promise<Metadata> {
    return {
      title: "นักเรียนของฉัน | Next Edu",
      description: "ดูรายชื่อนักเรียนทั้งหมดที่ลงเรียนในคอร์สของคุณ",
      openGraph: {
        title: "นักเรียนของฉัน | Next Edu",
        description: "ดูรายชื่อนักเรียนทั้งหมดที่ลงเรียนในคอร์สของคุณ",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "นักเรียนของฉัน | Next Edu",
        description: "ดูรายชื่อนักเรียนทั้งหมดที่ลงเรียนในคอร์สของคุณ",
      },
    };
  }
}

// Server-side factory
export class ServerInstructorStudentsPresenterFactory {
  static async create(): Promise<InstructorStudentsPresenter> {
    return new InstructorStudentsPresenter();
  }
}

// Client-side factory
export class ClientInstructorStudentsPresenterFactory {
  static async create(): Promise<InstructorStudentsPresenter> {
    return new InstructorStudentsPresenter();
  }
}

// Export factory for convenience
export const InstructorStudentsPresenterFactory = {
  createServer: ServerInstructorStudentsPresenterFactory.create,
  createClient: ClientInstructorStudentsPresenterFactory.create,
};

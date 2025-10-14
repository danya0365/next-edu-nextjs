import {
  exportAnalyticsReport,
  getAnalyticsOverview,
  getCoursePerformance,
  getPopularContent,
  getRevenueAnalytics,
  getStudentDemographics,
  getStudentEngagement,
  getTrafficSources,
  type AnalyticsOverview,
  type CoursePerformance,
  type PopularContent,
  type RevenueAnalytics,
  type StudentDemographics,
  type StudentEngagement,
  type TrafficSource,
} from "@/src/data/mock/instructor-analytics.mock";
import type { Metadata } from "next";

export interface InstructorAnalyticsViewModel {
  overview: AnalyticsOverview;
  coursePerformance: CoursePerformance[];
  studentEngagement: StudentEngagement[];
  revenueAnalytics: RevenueAnalytics[];
  trafficSources: TrafficSource[];
  popularContent: PopularContent[];
  studentDemographics: StudentDemographics[];
  instructorId: string;
}

export class InstructorAnalyticsPresenter {
  /**
   * Get view model for instructor analytics
   */
  static async getViewModel(
    instructorId: string,
    options?: {
      engagementDays?: number;
      revenueMonths?: number;
    }
  ): Promise<InstructorAnalyticsViewModel> {
    console.log("InstructorAnalyticsPresenter.getViewModel", {
      instructorId,
      options,
    });

    // Get all analytics data
    const overview = getAnalyticsOverview(instructorId);
    const coursePerformance = getCoursePerformance(instructorId);
    const studentEngagement = getStudentEngagement(
      instructorId,
      options?.engagementDays || 7
    );
    const revenueAnalytics = getRevenueAnalytics(
      instructorId,
      options?.revenueMonths || 6
    );
    const trafficSources = getTrafficSources(instructorId);
    const popularContent = getPopularContent(instructorId);
    const studentDemographics = getStudentDemographics(instructorId);

    return {
      overview,
      coursePerformance,
      studentEngagement,
      revenueAnalytics,
      trafficSources,
      popularContent,
      studentDemographics,
      instructorId,
    };
  }

  /**
   * Export analytics report
   */
  static async exportReport(
    instructorId: string,
    format: "pdf" | "csv" | "excel"
  ): Promise<boolean> {
    console.log("Exporting analytics report:", { instructorId, format });
    return exportAnalyticsReport(instructorId, format);
  }

  /**
   * Generate metadata for SEO
   */
  static async generateMetadata(): Promise<Metadata> {
    return {
      title: "วิเคราะห์ข้อมูล | Next Edu",
      description: "วิเคราะห์ข้อมูลและสถิติการสอนอย่างละเอียด",
      openGraph: {
        title: "วิเคราะห์ข้อมูล | Next Edu",
        description: "วิเคราะห์ข้อมูลและสถิติการสอนอย่างละเอียด",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "วิเคราะห์ข้อมูล | Next Edu",
        description: "วิเคราะห์ข้อมูลและสถิติการสอนอย่างละเอียด",
      },
    };
  }
}

// Server-side factory
export class ServerInstructorAnalyticsPresenterFactory {
  static async create(): Promise<InstructorAnalyticsPresenter> {
    return new InstructorAnalyticsPresenter();
  }
}

// Client-side factory
export class ClientInstructorAnalyticsPresenterFactory {
  static async create(): Promise<InstructorAnalyticsPresenter> {
    return new InstructorAnalyticsPresenter();
  }
}

// Export factory for convenience
export const InstructorAnalyticsPresenterFactory = {
  createServer: ServerInstructorAnalyticsPresenterFactory.create,
  createClient: ClientInstructorAnalyticsPresenterFactory.create,
};

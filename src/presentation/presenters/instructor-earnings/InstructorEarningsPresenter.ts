import {
  getCourseEarnings,
  getEarningsSummary,
  getInstructorTransactions,
  getMonthlyEarnings,
  requestWithdrawal,
  type CourseEarnings,
  type EarningsSummary,
  type MonthlyEarnings,
  type Transaction,
} from "@/src/data/mock/instructor-earnings.mock";
import type { Metadata } from "next";

export interface InstructorEarningsViewModel {
  summary: EarningsSummary;
  transactions: Transaction[];
  monthlyEarnings: MonthlyEarnings[];
  courseEarnings: CourseEarnings[];
  instructorId: string;
}

export class InstructorEarningsPresenter {
  /**
   * Get view model for instructor earnings
   */
  static async getViewModel(
    instructorId: string,
    filters?: {
      type?: "sale" | "refund" | "withdrawal" | "bonus";
      status?: "completed" | "pending" | "processing" | "failed";
    }
  ): Promise<InstructorEarningsViewModel> {
    console.log("InstructorEarningsPresenter.getViewModel", {
      instructorId,
      filters,
    });

    // Get all data
    let transactions = getInstructorTransactions(instructorId);
    const summary = getEarningsSummary(instructorId);
    const monthlyEarnings = getMonthlyEarnings(instructorId);
    const courseEarnings = getCourseEarnings(instructorId);

    // Apply filters
    if (filters?.type) {
      transactions = transactions.filter((t) => t.type === filters.type);
    }

    if (filters?.status) {
      transactions = transactions.filter((t) => t.status === filters.status);
    }

    // Sort by date (most recent first)
    transactions.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return {
      summary,
      transactions,
      monthlyEarnings,
      courseEarnings,
      instructorId,
    };
  }

  /**
   * Request withdrawal
   */
  static async requestWithdrawal(
    instructorId: string,
    amount: number,
    bankAccount: string
  ): Promise<boolean> {
    console.log("Requesting withdrawal:", {
      instructorId,
      amount,
      bankAccount,
    });
    return requestWithdrawal(instructorId, amount, bankAccount);
  }

  /**
   * Generate metadata for SEO
   */
  static async generateMetadata(): Promise<Metadata> {
    return {
      title: "รายได้และสถิติ | Next Edu",
      description: "ดูรายได้และสถิติทางการเงินจากการสอนคอร์ส",
      openGraph: {
        title: "รายได้และสถิติ | Next Edu",
        description: "ดูรายได้และสถิติทางการเงินจากการสอนคอร์ส",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "รายได้และสถิติ | Next Edu",
        description: "ดูรายได้และสถิติทางการเงินจากการสอนคอร์ส",
      },
    };
  }
}

// Server-side factory
export class ServerInstructorEarningsPresenterFactory {
  static async create(): Promise<InstructorEarningsPresenter> {
    return new InstructorEarningsPresenter();
  }
}

// Client-side factory
export class ClientInstructorEarningsPresenterFactory {
  static async create(): Promise<InstructorEarningsPresenter> {
    return new InstructorEarningsPresenter();
  }
}

// Export factory for convenience
export const InstructorEarningsPresenterFactory = {
  createServer: ServerInstructorEarningsPresenterFactory.create,
  createClient: ClientInstructorEarningsPresenterFactory.create,
};

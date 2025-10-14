import {
  getInstructorReviews,
  getInstructorReviewsStats,
  publishReview,
  replyToReview,
  reportReview,
  unpublishReview,
  type InstructorReview,
  type InstructorReviewsStats,
} from "@/src/data/mock/instructor-reviews.mock";
import type { Metadata } from "next";

export interface InstructorReviewsViewModel {
  reviews: InstructorReview[];
  stats: InstructorReviewsStats;
  instructorId: string;
}

export class InstructorReviewsPresenter {
  /**
   * Get view model for instructor reviews
   */
  static async getViewModel(
    instructorId: string,
    filters?: {
      rating?: number;
      isPublished?: boolean;
      courseId?: string;
    }
  ): Promise<InstructorReviewsViewModel> {
    console.log("InstructorReviewsPresenter.getViewModel", {
      instructorId,
      filters,
    });

    // Get all reviews for instructor
    let reviews = getInstructorReviews(instructorId);

    // Apply filters
    if (filters?.rating) {
      reviews = reviews.filter((review) => review.rating === filters.rating);
    }

    if (filters?.isPublished !== undefined) {
      reviews = reviews.filter(
        (review) => review.isPublished === filters.isPublished
      );
    }

    if (filters?.courseId) {
      reviews = reviews.filter((review) => review.courseId === filters.courseId);
    }

    // Sort by created date (most recent first)
    reviews.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Get statistics
    const stats = getInstructorReviewsStats(instructorId);

    return {
      reviews,
      stats,
      instructorId,
    };
  }

  /**
   * Reply to review
   */
  static async replyToReview(
    reviewId: string,
    instructorId: string,
    message: string
  ): Promise<boolean> {
    console.log("Replying to review:", { reviewId, instructorId, message });
    return replyToReview(instructorId, reviewId, message);
  }

  /**
   * Publish review
   */
  static async publishReview(
    reviewId: string,
    instructorId: string
  ): Promise<boolean> {
    console.log("Publishing review:", { reviewId, instructorId });
    return publishReview(instructorId, reviewId);
  }

  /**
   * Unpublish review
   */
  static async unpublishReview(
    reviewId: string,
    instructorId: string
  ): Promise<boolean> {
    console.log("Unpublishing review:", { reviewId, instructorId });
    return unpublishReview(instructorId, reviewId);
  }

  /**
   * Report review
   */
  static async reportReview(
    reviewId: string,
    instructorId: string,
    reason: string
  ): Promise<boolean> {
    console.log("Reporting review:", { reviewId, instructorId, reason });
    return reportReview(instructorId, reviewId, reason);
  }

  /**
   * Generate metadata for SEO
   */
  static async generateMetadata(): Promise<Metadata> {
    return {
      title: "รีวิวจากนักเรียน | Next Edu",
      description: "ดูและจัดการรีวิวจากนักเรียนที่ลงเรียนในคอร์สของคุณ",
      openGraph: {
        title: "รีวิวจากนักเรียน | Next Edu",
        description: "ดูและจัดการรีวิวจากนักเรียนที่ลงเรียนในคอร์สของคุณ",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "รีวิวจากนักเรียน | Next Edu",
        description: "ดูและจัดการรีวิวจากนักเรียนที่ลงเรียนในคอร์สของคุณ",
      },
    };
  }
}

// Server-side factory
export class ServerInstructorReviewsPresenterFactory {
  static async create(): Promise<InstructorReviewsPresenter> {
    return new InstructorReviewsPresenter();
  }
}

// Client-side factory
export class ClientInstructorReviewsPresenterFactory {
  static async create(): Promise<InstructorReviewsPresenter> {
    return new InstructorReviewsPresenter();
  }
}

// Export factory for convenience
export const InstructorReviewsPresenterFactory = {
  createServer: ServerInstructorReviewsPresenterFactory.create,
  createClient: ClientInstructorReviewsPresenterFactory.create,
};

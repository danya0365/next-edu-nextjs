import {
  MOCK_LIVE_CLASSES,
  LiveClass,
  getLiveClassesByCategory,
  getLiveClassesByStatus,
  getUpcomingLiveClasses,
  getLiveNowClasses,
  getFreeLiveClasses,
} from "@/src/data/mock/live-classes.mock";
import { LIVE_CLASS_CATEGORIES } from "@/src/data/master/live-class-categories.master";
import { LIVE_CLASS_STATUSES } from "@/src/data/master/live-class-status.master";
import type { Metadata } from "next";

/**
 * Live Classes Statistics
 */
export interface LiveClassesStats {
  totalClasses: number;
  liveNow: number;
  upcoming: number;
  totalParticipants: number;
}

/**
 * Live Classes ViewModel
 */
export interface LiveClassesViewModel {
  liveClasses: LiveClass[];
  liveNowClasses: LiveClass[];
  upcomingClasses: LiveClass[];
  freeClasses: LiveClass[];
  stats: LiveClassesStats;
  categories: typeof LIVE_CLASS_CATEGORIES;
  statuses: typeof LIVE_CLASS_STATUSES;
}

/**
 * Presenter for Live Classes page
 * Follows Clean Architecture with proper separation of concerns
 */
export class LiveClassesPresenter {
  /**
   * Get view model for the live classes page
   */
  async getViewModel(
    category?: string,
    status?: "upcoming" | "live" | "ended"
  ): Promise<LiveClassesViewModel> {
    try {
      // Get live classes based on filters
      let liveClasses = [...MOCK_LIVE_CLASSES];

      if (category) {
        liveClasses = getLiveClassesByCategory(category);
      }

      if (status) {
        liveClasses = liveClasses.filter((lc) => lc.status === status);
      }

      // Sort by scheduled time (upcoming first, then live, then ended)
      liveClasses.sort((a, b) => {
        if (a.status === "live" && b.status !== "live") return -1;
        if (a.status !== "live" && b.status === "live") return 1;
        if (a.status === "upcoming" && b.status === "ended") return -1;
        if (a.status === "ended" && b.status === "upcoming") return 1;
        return (
          new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()
        );
      });

      // Get special lists
      const liveNowClasses = getLiveNowClasses();
      const upcomingClasses = getUpcomingLiveClasses().slice(0, 6);
      const freeClasses = getFreeLiveClasses().slice(0, 4);

      // Calculate stats
      const stats: LiveClassesStats = {
        totalClasses: MOCK_LIVE_CLASSES.length,
        liveNow: liveNowClasses.length,
        upcoming: MOCK_LIVE_CLASSES.filter((lc) => lc.status === "upcoming")
          .length,
        totalParticipants: MOCK_LIVE_CLASSES.reduce(
          (sum, lc) => sum + lc.participants,
          0
        ),
      };

      return {
        liveClasses,
        liveNowClasses,
        upcomingClasses,
        freeClasses,
        stats,
        categories: LIVE_CLASS_CATEGORIES,
        statuses: LIVE_CLASS_STATUSES,
      };
    } catch (error) {
      console.error("Error in LiveClassesPresenter.getViewModel:", error);
      throw error;
    }
  }

  /**
   * Generate metadata for the live classes page
   */
  async generateMetadata(
    category?: string,
    status?: string
  ): Promise<Metadata> {
    try {
      let title = "คลาสสดออนไลน์ | Next Edu";
      let description =
        "เรียนแบบสดๆ กับครูมืออาชีพ มีคลาสหลากหลายหมวดหมู่ให้เลือกเรียน";

      if (category) {
        const cat = LIVE_CLASS_CATEGORIES.find((c) => c.id === category);
        if (cat) {
          title = `คลาสสด ${cat.nameTh} | Next Edu`;
          description = `${cat.description} เรียนแบบสดๆ กับครูมืออาชีพ`;
        }
      }

      if (status) {
        const stat = LIVE_CLASS_STATUSES.find((s) => s.id === status);
        if (stat) {
          title = `คลาสสด${stat.nameTh} | Next Edu`;
        }
      }

      return {
        title,
        description,
        openGraph: {
          title,
          description,
          type: "website",
        },
      };
    } catch (error) {
      console.error("Error generating metadata:", error);
      return {
        title: "คลาสสดออนไลน์ | Next Edu",
        description: "เรียนแบบสดๆ กับครูมืออาชีพ",
      };
    }
  }

  /**
   * Get live class by ID
   */
  async getLiveClassById(id: string): Promise<LiveClass | null> {
    try {
      const liveClass = MOCK_LIVE_CLASSES.find((lc) => lc.id === id);
      return liveClass || null;
    } catch (error) {
      console.error("Error in LiveClassesPresenter.getLiveClassById:", error);
      throw error;
    }
  }

  /**
   * Join a live class (mock implementation)
   */
  async joinLiveClass(liveClassId: string): Promise<boolean> {
    try {
      // Mock implementation - in real app, this would call an API
      console.log("Joining live class:", liveClassId);
      return true;
    } catch (error) {
      console.error("Error in LiveClassesPresenter.joinLiveClass:", error);
      throw error;
    }
  }

  /**
   * Register for a live class (mock implementation)
   */
  async registerForLiveClass(liveClassId: string): Promise<boolean> {
    try {
      // Mock implementation - in real app, this would call an API
      console.log("Registering for live class:", liveClassId);
      return true;
    } catch (error) {
      console.error(
        "Error in LiveClassesPresenter.registerForLiveClass:",
        error
      );
      throw error;
    }
  }

  /**
   * Watch recording (mock implementation)
   */
  async watchRecording(liveClassId: string): Promise<string | null> {
    try {
      const liveClass = await this.getLiveClassById(liveClassId);
      return liveClass?.recordingUrl || null;
    } catch (error) {
      console.error("Error in LiveClassesPresenter.watchRecording:", error);
      throw error;
    }
  }
}

/**
 * Factory for creating LiveClassesPresenter instances
 */
export class LiveClassesPresenterFactory {
  static async createServer(): Promise<LiveClassesPresenter> {
    return new LiveClassesPresenter();
  }

  static createClient(): LiveClassesPresenter {
    return new LiveClassesPresenter();
  }
}

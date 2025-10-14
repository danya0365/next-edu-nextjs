import { MOCK_POSTS, Post, getPostsByCategory, getPinnedPosts, getPopularPosts } from "@/src/data/mock/posts.mock";
import { MOCK_COMMENTS, getCommentsByPostId } from "@/src/data/mock/comments.mock";
import { POST_CATEGORIES } from "@/src/data/master/post-categories.master";
import type { Metadata } from "next";

/**
 * Community Statistics
 */
export interface CommunityStats {
  totalPosts: number;
  totalComments: number;
  totalMembers: number;
  activeToday: number;
}

/**
 * Community ViewModel
 */
export interface CommunityViewModel {
  posts: Post[];
  pinnedPosts: Post[];
  popularPosts: Post[];
  stats: CommunityStats;
  categories: typeof POST_CATEGORIES;
}

/**
 * Presenter for Community page
 * Follows Clean Architecture with proper separation of concerns
 */
export class CommunityPresenter {
  /**
   * Get view model for the community page
   */
  async getViewModel(category?: string): Promise<CommunityViewModel> {
    try {
      // Get posts based on category filter
      const posts = category
        ? getPostsByCategory(category)
        : [...MOCK_POSTS].sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );

      // Get pinned posts
      const pinnedPosts = getPinnedPosts();

      // Get popular posts
      const popularPosts = getPopularPosts(5);

      // Calculate stats
      const stats: CommunityStats = {
        totalPosts: MOCK_POSTS.length,
        totalComments: MOCK_COMMENTS.length,
        totalMembers: 156, // Mock data
        activeToday: 42, // Mock data
      };

      return {
        posts,
        pinnedPosts,
        popularPosts,
        stats,
        categories: POST_CATEGORIES,
      };
    } catch (error) {
      console.error("Error in CommunityPresenter.getViewModel:", error);
      throw error;
    }
  }

  /**
   * Generate metadata for the community page
   */
  async generateMetadata(category?: string): Promise<Metadata> {
    try {
      const title = category
        ? `ชุมชน - ${POST_CATEGORIES.find((c) => c.id === category)?.nameTh || "ทั้งหมด"} | Next Edu`
        : "ชุมชน | Next Edu";

      const description = category
        ? `แชร์ความรู้และประสบการณ์เกี่ยวกับ${POST_CATEGORIES.find((c) => c.id === category)?.nameTh} กับเพื่อนๆ`
        : "พื้นที่สำหรับนักเรียนแชร์ความรู้ ถามคำถาม และแลกเปลี่ยนประสบการณ์การเรียนรู้";

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
        title: "ชุมชน | Next Edu",
        description: "พื้นที่สำหรับนักเรียนแชร์ความรู้และแลกเปลี่ยนประสบการณ์",
      };
    }
  }

  /**
   * Get post by ID
   */
  async getPostById(id: string): Promise<Post | null> {
    try {
      const post = MOCK_POSTS.find((p) => p.id === id);
      return post || null;
    } catch (error) {
      console.error("Error in CommunityPresenter.getPostById:", error);
      throw error;
    }
  }

  /**
   * Get comments for a post
   */
  async getCommentsByPostId(postId: string) {
    try {
      return getCommentsByPostId(postId);
    } catch (error) {
      console.error("Error in CommunityPresenter.getCommentsByPostId:", error);
      throw error;
    }
  }

  /**
   * Like a post (mock implementation)
   */
  async likePost(postId: string): Promise<boolean> {
    try {
      // Mock implementation - in real app, this would call an API
      console.log("Liking post:", postId);
      return true;
    } catch (error) {
      console.error("Error in CommunityPresenter.likePost:", error);
      throw error;
    }
  }

  /**
   * Create a new post (mock implementation)
   */
  async createPost(data: {
    title: string;
    content: string;
    category: string;
    type: string;
    tags: string[];
  }): Promise<Post> {
    try {
      // Mock implementation - in real app, this would call an API
      const newPost: Post = {
        id: `post-${Date.now()}`,
        authorId: "current-user",
        authorName: "ผู้ใช้ปัจจุบัน",
        authorAvatar: "/images/default-avatar.jpg",
        category: data.category,
        type: data.type,
        title: data.title,
        content: data.content,
        likes: 0,
        comments: 0,
        views: 0,
        isPinned: false,
        isLocked: false,
        tags: data.tags,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      console.log("Creating post:", newPost);
      return newPost;
    } catch (error) {
      console.error("Error in CommunityPresenter.createPost:", error);
      throw error;
    }
  }

  /**
   * Create a new comment (mock implementation)
   */
  async createComment(data: {
    postId: string;
    content: string;
    parentId?: string;
  }): Promise<boolean> {
    try {
      // Mock implementation - in real app, this would call an API
      console.log("Creating comment:", data);
      return true;
    } catch (error) {
      console.error("Error in CommunityPresenter.createComment:", error);
      throw error;
    }
  }
}

/**
 * Factory for creating CommunityPresenter instances
 */
export class CommunityPresenterFactory {
  static async createServer(): Promise<CommunityPresenter> {
    return new CommunityPresenter();
  }

  static createClient(): CommunityPresenter {
    return new CommunityPresenter();
  }
}

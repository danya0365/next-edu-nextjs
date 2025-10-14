import type { Metadata } from 'next';

export interface RegisterViewModel {
  message: string;
}

/**
 * Presenter for Register page
 * Follows Clean Architecture with proper separation of concerns
 */
export class RegisterPresenter {
  /**
   * Get view model for the page
   */
  async getViewModel(): Promise<RegisterViewModel> {
    return {
      message: 'เริ่มต้นการเรียนรู้ฟรีวันนี้!',
    };
  }

  /**
   * Generate metadata for the page
   */
  async generateMetadata(): Promise<Metadata> {
    return {
      title: 'สมัครสมาชิก | Next Edu',
      description: 'สมัครสมาชิกฟรีเพื่อเข้าถึงคอร์สเรียนออนไลน์มากมาย',
    };
  }
}

/**
 * Factory for creating RegisterPresenter instances
 */
export class RegisterPresenterFactory {
  static async create(): Promise<RegisterPresenter> {
    return new RegisterPresenter();
  }
}

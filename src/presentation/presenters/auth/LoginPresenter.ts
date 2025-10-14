import type { Metadata } from 'next';

export interface LoginViewModel {
  message: string;
}

/**
 * Presenter for Login page
 * Follows Clean Architecture with proper separation of concerns
 */
export class LoginPresenter {
  /**
   * Get view model for the page
   */
  async getViewModel(): Promise<LoginViewModel> {
    return {
      message: 'เข้าสู่ระบบเพื่อเริ่มเรียนออนไลน์',
    };
  }

  /**
   * Generate metadata for the page
   */
  async generateMetadata(): Promise<Metadata> {
    return {
      title: 'เข้าสู่ระบบ | Next Edu',
      description: 'เข้าสู่ระบบเพื่อเข้าถึงคอร์สเรียนออนไลน์และติดตามความคืบหน้าการเรียน',
    };
  }
}

/**
 * Factory for creating LoginPresenter instances
 */
export class LoginPresenterFactory {
  static async create(): Promise<LoginPresenter> {
    return new LoginPresenter();
  }
}

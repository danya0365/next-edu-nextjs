import { students } from '@/src/data/mock/students.mock';

export interface UserSettings {
  // Profile
  displayName: string;
  email: string;
  avatar: string;
  age: number;
  grade?: string;

  // Learning Preferences
  defaultPlaybackSpeed: number;
  defaultQuality: string;
  autoPlayNext: boolean;
  
  // Notifications
  emailNotifications: boolean;
  pushNotifications: boolean;
  courseUpdates: boolean;
  achievementAlerts: boolean;
  weeklyReport: boolean;

  // Privacy
  profileVisibility: 'public' | 'friends' | 'private';
  showProgress: boolean;
  showAchievements: boolean;
}

export interface SettingsViewModel {
  settings: UserSettings;
}

/**
 * Presenter for Settings management
 * Follows Clean Architecture with proper separation of concerns
 */
export class SettingsPresenter {
  constructor() {
    // Mock data - no supabase client needed
  }

  /**
   * Get view model for the page
   */
  async getViewModel(userId: string): Promise<SettingsViewModel> {
    // Get student data
    const student = students.find((s) => s.userId === userId);
    if (!student) {
      throw new Error('Student not found');
    }

    // Map to settings
    const settings: UserSettings = {
      // Profile
      displayName: student.displayName,
      email: student.email,
      avatar: student.avatar,
      age: student.age,
      grade: student.grade,

      // Learning Preferences
      defaultPlaybackSpeed: student.preferences.defaultPlaybackSpeed || 1,
      defaultQuality: student.preferences.defaultQuality || 'auto',
      autoPlayNext: student.preferences.autoPlayNext ?? true,

      // Notifications
      emailNotifications: student.preferences.emailNotifications ?? true,
      pushNotifications: true, // Mock
      courseUpdates: true, // Mock
      achievementAlerts: true, // Mock
      weeklyReport: true, // Mock

      // Privacy
      profileVisibility: 'public', // Mock
      showProgress: true, // Mock
      showAchievements: true, // Mock
    };

    return {
      settings,
    };
  }
}

/**
 * Factory for creating SettingsPresenter instances
 */
export class SettingsPresenterFactory {
  static async createServer(): Promise<SettingsPresenter> {
    return new SettingsPresenter();
  }

  static async createClient(): Promise<SettingsPresenter> {
    return new SettingsPresenter();
  }
}

// Backward compatibility exports
export class ServerSettingsPresenterFactory {
  static async create(userId: string): Promise<SettingsViewModel> {
    const presenter = await SettingsPresenterFactory.createServer();
    return presenter.getViewModel(userId);
  }
}

export class ClientSettingsPresenterFactory {
  static async create(userId: string): Promise<SettingsViewModel> {
    const presenter = await SettingsPresenterFactory.createClient();
    return presenter.getViewModel(userId);
  }
}

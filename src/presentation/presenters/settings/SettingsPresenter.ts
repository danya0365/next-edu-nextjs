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

export class SettingsPresenter {
  static async getViewModel(userId: string): Promise<SettingsViewModel> {
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

// Server-side factory
export class ServerSettingsPresenterFactory {
  static async create(userId: string): Promise<SettingsViewModel> {
    return SettingsPresenter.getViewModel(userId);
  }
}

// Client-side factory
export class ClientSettingsPresenterFactory {
  static async create(userId: string): Promise<SettingsViewModel> {
    return SettingsPresenter.getViewModel(userId);
  }
}

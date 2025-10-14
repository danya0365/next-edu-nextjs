import { ServerSettingsPresenterFactory } from '@/src/presentation/presenters/settings/SettingsPresenter';
import { SettingsView } from '@/src/presentation/components/settings/SettingsView';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ตั้งค่า | Next Edu',
  description: 'จัดการการตั้งค่าบัญชี ความชอบการเรียน การแจ้งเตือน และความเป็นส่วนตัว',
};

export default async function SettingsPage() {
  // TODO: Get userId from auth session
  // For now, use mock user ID
  const userId = 'user-stud-001';

  try {
    const initialViewModel = await ServerSettingsPresenterFactory.create(userId);

    return <SettingsView initialViewModel={initialViewModel} userId={userId} />;
  } catch (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">เกิดข้อผิดพลาด</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {error instanceof Error ? error.message : 'ไม่สามารถโหลดข้อมูลได้'}
          </p>
        </div>
      </div>
    );
  }
}

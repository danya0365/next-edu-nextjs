import { ServerAchievementsPresenterFactory } from '@/src/presentation/presenters/achievements/AchievementsPresenter';
import { AchievementsView } from '@/src/presentation/components/achievements/AchievementsView';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ความสำเร็จ | Next Edu',
  description: 'รวบรวมความสำเร็จและปลดล็อกรางวัลพิเศษ ติดตามความก้าวหน้าและเป้าหมายของคุณ',
};

export default async function AchievementsPage() {
  // TODO: Get userId from auth session
  // For now, use mock user ID
  const userId = 'user-stud-001';

  try {
    const initialViewModel = await ServerAchievementsPresenterFactory.create(userId);

    return <AchievementsView initialViewModel={initialViewModel} userId={userId} />;
  } catch (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            เกิดข้อผิดพลาด
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {error instanceof Error ? error.message : 'ไม่สามารถโหลดข้อมูลได้'}
          </p>
        </div>
      </div>
    );
  }
}

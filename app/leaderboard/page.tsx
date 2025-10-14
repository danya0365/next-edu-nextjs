import { ServerLeaderboardPresenterFactory } from '@/src/presentation/presenters/leaderboard/LeaderboardPresenter';
import { LeaderboardView } from '@/src/presentation/components/leaderboard/LeaderboardView';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'กระดานคะแนน | Next Edu',
  description: 'ดูอันดับและแข่งขันกับเพื่อนๆ ในการเรียนรู้ ติดตามความก้าวหน้าและเป้าหมายของคุณ',
};

export default async function LeaderboardPage() {
  // TODO: Get userId from auth session
  // For now, use mock user ID
  const userId = 'user-stud-001';

  try {
    const initialViewModel = await ServerLeaderboardPresenterFactory.create(userId);

    return <LeaderboardView initialViewModel={initialViewModel} userId={userId} />;
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

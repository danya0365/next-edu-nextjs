import { ServerMyCoursesPresenterFactory } from '@/src/presentation/presenters/my-courses/MyCoursesPresenter';
import { MyCoursesView } from '@/src/presentation/components/my-courses/MyCoursesView';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'คอร์สของฉัน | Next Edu',
  description: 'ดูคอร์สที่คุณลงทะเบียน ติดตามความคืบหน้า และเรียนต่อจากที่ค้าง',
};

export default async function MyCoursesPage() {
  // TODO: Get userId from auth session
  // For now, use mock user ID
  const userId = 'user-stud-001';

  try {
    const initialViewModel = await ServerMyCoursesPresenterFactory.create(userId);

    return <MyCoursesView initialViewModel={initialViewModel} userId={userId} />;
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

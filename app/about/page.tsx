import { ServerAboutPresenterFactory } from '@/src/presentation/presenters/about/AboutPresenter';
import { AboutView } from '@/src/presentation/components/about/AboutView';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'เกี่ยวกับเรา | Next Edu',
  description:
    'ทำความรู้จักกับ Next Edu แพลตฟอร์มการเรียนรู้ออนไลน์ที่ออกแบบมาเพื่อเด็กและผู้เริ่มต้น พบกับพันธกิจ วิสัยทัศน์ และทีมงานของเรา',
};

export default async function AboutPage() {
  try {
    const initialViewModel = await ServerAboutPresenterFactory.create();

    return <AboutView initialViewModel={initialViewModel} />;
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

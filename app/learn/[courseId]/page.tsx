import { LearnView } from '@/src/presentation/components/learn/LearnView';
import { LearnPresenterFactory } from '@/src/presentation/presenters/learn/LearnPresenter';
import type { Metadata } from 'next';
import Link from 'next/link';

// Tell Next.js this is a dynamic page
export const dynamic = 'force-dynamic';

interface LearnPageProps {
  params: Promise<{ courseId: string }>;
  searchParams?: Promise<{ lesson?: string }>;
}

/**
 * Generate metadata for the page
 */
export async function generateMetadata({ params, searchParams }: LearnPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const presenter = await LearnPresenterFactory.create();

  try {
    return presenter.generateMetadata(resolvedParams.courseId, resolvedSearchParams.lesson);
  } catch (error) {
    console.error('Error generating metadata:', error);

    // Fallback metadata
    return {
      title: 'เรียน | Next Edu',
      description: 'เรียนคอร์สออนไลน์',
    };
  }
}

/**
 * Learn/Player page - Server Component for SEO optimization
 * Uses presenter pattern following Clean Architecture
 */
export default async function LearnPage({ params, searchParams }: LearnPageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const presenter = await LearnPresenterFactory.create();

  try {
    // Get view model from presenter without userId (will be checked on client-side)
    const viewModel = await presenter.getViewModel(
      resolvedParams.courseId,
      resolvedSearchParams.lesson
    );

    // Check if course exists
    if (!viewModel.course) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="text-6xl mb-4">😕</div>
            <h1 className="text-2xl font-bold text-white mb-2">ไม่พบคอร์ส</h1>
            <p className="text-gray-400 mb-6">คอร์สนี้อาจถูกลบหรือไม่มีอยู่ในระบบ</p>
            <Link
              href="/courses"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
            >
              ดูคอร์สทั้งหมด
            </Link>
          </div>
        </div>
      );
    }

    // Note: Enrollment check is done on client-side in LearnView
    return (
      <LearnView
        initialViewModel={viewModel}
        courseId={resolvedParams.courseId}
        lessonId={resolvedSearchParams.lesson}
      />
    );
  } catch (error) {
    console.error('Error fetching learn data:', error);

    // Fallback UI
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-white mb-2">เกิดข้อผิดพลาด</h1>
          <p className="text-gray-400 mb-4">ไม่สามารถโหลดข้อมูลบทเรียนได้</p>
          <Link
            href="/courses"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
          >
            ดูคอร์สทั้งหมด
          </Link>
        </div>
      </div>
    );
  }
}

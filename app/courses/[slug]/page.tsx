import { CourseDetailView } from "@/src/presentation/components/course-detail/CourseDetailView";
import { CourseDetailPresenterFactory } from "@/src/presentation/presenters/course-detail/CourseDetailPresenter";
import type { Metadata } from "next";
import Link from "next/link";

// Tell Next.js this is a dynamic page
export const dynamic = "force-dynamic";

interface CourseDetailPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generate metadata for the page
 */
export async function generateMetadata({
  params,
}: CourseDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const presenter = await CourseDetailPresenterFactory.create();

  try {
    return presenter.generateMetadata(resolvedParams.slug);
  } catch (error) {
    console.error("Error generating metadata:", error);

    // Fallback metadata
    return {
      title: "คอร์ส | Next Edu",
      description: "เรียนรู้ทักษะใหม่ๆ กับคอร์สออนไลน์",
    };
  }
}

/**
 * Course Detail page - Server Component for SEO optimization
 * Uses presenter pattern following Clean Architecture
 */
export default async function CourseDetailPage({
  params,
}: CourseDetailPageProps) {
  const resolvedParams = await params;
  const presenter = await CourseDetailPresenterFactory.create();

  try {
    // Get view model from presenter
    const viewModel = await presenter.getViewModel(resolvedParams.slug);

    return <CourseDetailView initialViewModel={viewModel} />;
  } catch (error) {
    console.error("Error fetching course detail data:", error);

    // Fallback UI
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            เกิดข้อผิดพลาด
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            ไม่สามารถโหลดข้อมูลคอร์สได้
          </p>
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

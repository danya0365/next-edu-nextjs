import { CoursesView } from "@/src/presentation/components/courses/CoursesView";
import {
  CoursesFilters,
  CoursesPresenterFactory,
} from "@/src/presentation/presenters/courses/CoursesPresenter";
import type { Metadata } from "next";
import Link from "next/link";

// Tell Next.js this is a dynamic page
export const dynamic = "force-dynamic";

interface CoursesPageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

/**
 * Generate metadata for the page
 */
export async function generateMetadata({
  searchParams,
}: CoursesPageProps): Promise<Metadata> {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const presenter = await CoursesPresenterFactory.create();

  try {
    const filters: CoursesFilters = {
      categoryId: resolvedSearchParams.category as string | undefined,
    };

    return presenter.generateMetadata(filters);
  } catch (error) {
    console.error("Error generating metadata:", error);

    // Fallback metadata
    return {
      title: "คอร์สทั้งหมด | Next Edu",
      description:
        "เรียนรู้ทักษะใหม่ๆ กับคอร์สออนไลน์มากมาย สำหรับเด็กและเยาวชน",
    };
  }
}

/**
 * Courses page - Server Component for SEO optimization
 * Uses presenter pattern following Clean Architecture
 */
export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const presenter = await CoursesPresenterFactory.create();

  try {
    // Parse filters from search params
    const filters: CoursesFilters = {
      search: resolvedSearchParams.search as string | undefined,
      categoryId: resolvedSearchParams.category as string | undefined,
      levelId: resolvedSearchParams.level as string | undefined,
      ageGroupId: resolvedSearchParams.ageGroup as string | undefined,
    };

    // Parse page number
    const page = resolvedSearchParams.page
      ? parseInt(resolvedSearchParams.page as string, 10)
      : 1;

    // Get view model from presenter
    const viewModel = await presenter.getViewModel(filters, page, 12);

    return <CoursesView initialViewModel={viewModel} />;
  } catch (error) {
    console.error("Error fetching courses data:", error);

    // Fallback UI
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            เกิดข้อผิดพลาด
          </h1>
          <p className="text-gray-600 mb-4">ไม่สามารถโหลดข้อมูลคอร์สได้</p>
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
          >
            กลับหน้าแรก
          </Link>
        </div>
      </div>
    );
  }
}

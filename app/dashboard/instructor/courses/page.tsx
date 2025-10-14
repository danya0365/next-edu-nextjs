import { InstructorCoursesView } from "@/src/presentation/components/instructor-courses/InstructorCoursesView";
import { InstructorCoursesPresenter } from "@/src/presentation/presenters/instructor-courses/InstructorCoursesPresenter";
import type { Metadata } from "next";
import Link from "next/link";

// Tell Next.js this is a dynamic page
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

/**
 * Generate metadata for the instructor courses page
 */
export async function generateMetadata(): Promise<Metadata> {
  try {
    return InstructorCoursesPresenter.generateMetadata();
  } catch (error) {
    console.error("Error generating metadata:", error);

    // Fallback metadata
    return {
      title: "จัดการคอร์ส | Next Edu",
      description: "จัดการคอร์สเรียนของคุณ",
    };
  }
}

/**
 * Instructor Courses page - Server Component for SEO optimization
 * Uses presenter pattern following Clean Architecture
 */
export default async function InstructorCoursesPage() {
  // For now, use mock instructor ID
  // In real app, get from session/auth
  const instructorId = "inst-001";

  try {
    // Get view model from presenter
    const viewModel = await InstructorCoursesPresenter.getViewModel(
      instructorId
    );

    return <InstructorCoursesView initialViewModel={viewModel} />;
  } catch (error) {
    console.error("Error fetching instructor courses:", error);

    // Fallback UI
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            เกิดข้อผิดพลาด
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            ไม่สามารถโหลดข้อมูลคอร์สได้
          </p>
          <Link
            href="/dashboard/instructor"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-block"
          >
            กลับหน้าแดชบอร์ด
          </Link>
        </div>
      </div>
    );
  }
}

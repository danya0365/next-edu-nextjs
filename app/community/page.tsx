import { CommunityView } from "@/src/presentation/components/community/CommunityView";
import { CommunityPresenterFactory } from "@/src/presentation/presenters/community/CommunityPresenter";
import type { Metadata } from "next";
import Link from "next/link";

// Tell Next.js this is a dynamic page
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

interface CommunityPageProps {
  searchParams?: Promise<{ category?: string }>;
}

/**
 * Generate metadata for the community page
 */
export async function generateMetadata({
  searchParams,
}: CommunityPageProps): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const presenter = await CommunityPresenterFactory.createServer();

  try {
    return presenter.generateMetadata(resolvedParams?.category);
  } catch (error) {
    console.error("Error generating metadata:", error);

    // Fallback metadata
    return {
      title: "ชุมชน | Next Edu",
      description: "พื้นที่สำหรับนักเรียนแชร์ความรู้และแลกเปลี่ยนประสบการณ์",
    };
  }
}

/**
 * Community page - Server Component for SEO optimization
 * Uses presenter pattern following Clean Architecture
 */
export default async function CommunityPage({
  searchParams,
}: CommunityPageProps) {
  const resolvedParams = await searchParams;
  const presenter = await CommunityPresenterFactory.createServer();

  try {
    // Get view model from presenter
    const viewModel = await presenter.getViewModel(resolvedParams?.category);

    return <CommunityView initialViewModel={viewModel} />;
  } catch (error) {
    console.error("Error fetching community data:", error);

    // Fallback UI
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            เกิดข้อผิดพลาด
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            ไม่สามารถโหลดข้อมูลชุมชนได้
          </p>
          <Link
            href="/"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-block"
          >
            กลับหน้าแรก
          </Link>
        </div>
      </div>
    );
  }
}

import { LiveClassesView } from "@/src/presentation/components/live-classes/LiveClassesView";
import { LiveClassesPresenterFactory } from "@/src/presentation/presenters/live-classes/LiveClassesPresenter";
import type { Metadata } from "next";
import Link from "next/link";

// Tell Next.js this is a dynamic page
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

interface LiveClassesPageProps {
  searchParams?: Promise<{
    category?: string;
    status?: "upcoming" | "live" | "ended";
  }>;
}

/**
 * Generate metadata for the live classes page
 */
export async function generateMetadata({
  searchParams,
}: LiveClassesPageProps): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const presenter = await LiveClassesPresenterFactory.createServer();

  try {
    return presenter.generateMetadata(
      resolvedParams?.category,
      resolvedParams?.status
    );
  } catch (error) {
    console.error("Error generating metadata:", error);

    // Fallback metadata
    return {
      title: "คลาสสดออนไลน์ | Next Edu",
      description: "เรียนแบบสดๆ กับครูมืออาชีพ",
    };
  }
}

/**
 * Live Classes page - Server Component for SEO optimization
 * Uses presenter pattern following Clean Architecture
 */
export default async function LiveClassesPage({
  searchParams,
}: LiveClassesPageProps) {
  const resolvedParams = await searchParams;
  const presenter = await LiveClassesPresenterFactory.createServer();

  try {
    // Get view model from presenter
    const viewModel = await presenter.getViewModel(
      resolvedParams?.category,
      resolvedParams?.status
    );

    return <LiveClassesView initialViewModel={viewModel} />;
  } catch (error) {
    console.error("Error fetching live classes data:", error);

    // Fallback UI
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            เกิดข้อผิดพลาด
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            ไม่สามารถโหลดข้อมูลคลาสสดได้
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

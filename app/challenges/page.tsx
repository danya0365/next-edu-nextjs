import { ChallengesView } from "@/src/presentation/components/challenges/ChallengesView";
import { ChallengesPresenter } from "@/src/presentation/presenters/challenges/ChallengesPresenter";
import type { Metadata } from "next";
import Link from "next/link";

// Tell Next.js this is a dynamic page
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

interface ChallengesPageProps {
  searchParams?: Promise<{
    category?: string;
    difficulty?: "easy" | "medium" | "hard" | "expert";
    status?: "upcoming" | "active" | "ended";
  }>;
}

/**
 * Generate metadata for the challenges page
 */
export async function generateMetadata({
  searchParams,
}: ChallengesPageProps): Promise<Metadata> {
  const resolvedParams = await searchParams;

  try {
    return ChallengesPresenter.generateMetadata(
      resolvedParams?.category,
      resolvedParams?.difficulty,
      resolvedParams?.status
    );
  } catch (error) {
    console.error("Error generating metadata:", error);

    // Fallback metadata
    return {
      title: "ความท้าทาย | Next Edu",
      description: "ทดสอบความสามารถและรับรางวัลมากมาย",
    };
  }
}

/**
 * Challenges page - Server Component for SEO optimization
 * Uses presenter pattern following Clean Architecture
 */
export default async function ChallengesPage({
  searchParams,
}: ChallengesPageProps) {
  const resolvedParams = await searchParams;

  try {
    // Get view model from presenter
    const viewModel = await ChallengesPresenter.getViewModel(
      undefined, // userId will be handled client-side
      resolvedParams?.category,
      resolvedParams?.difficulty,
      resolvedParams?.status
    );

    return <ChallengesView initialViewModel={viewModel} />;
  } catch (error) {
    console.error("Error fetching challenges data:", error);

    // Fallback UI
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            เกิดข้อผิดพลาด
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            ไม่สามารถโหลดข้อมูลความท้าทายได้
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

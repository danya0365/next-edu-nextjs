import { ChallengeDetailView } from "@/src/presentation/components/challenge-detail/ChallengeDetailView";
import { ChallengeDetailPresenter } from "@/src/presentation/presenters/challenge-detail/ChallengeDetailPresenter";
import type { Metadata } from "next";
import Link from "next/link";

// Tell Next.js this is a dynamic page
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

interface ChallengeDetailPageProps {
  params: Promise<{ id: string }>;
}

/**
 * Generate metadata for the challenge detail page
 */
export async function generateMetadata({
  params,
}: ChallengeDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params;

  try {
    return ChallengeDetailPresenter.generateMetadata(resolvedParams.id);
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
 * Challenge Detail page - Server Component for SEO optimization
 * Uses presenter pattern following Clean Architecture
 */
export default async function ChallengeDetailPage({
  params,
}: ChallengeDetailPageProps) {
  const resolvedParams = await params;

  try {
    // Get view model from presenter
    const viewModel = await ChallengeDetailPresenter.getViewModel(
      resolvedParams.id
    );

    return (
      <ChallengeDetailView
        challengeId={resolvedParams.id}
        initialViewModel={viewModel}
      />
    );
  } catch (error) {
    console.error("Error fetching challenge detail:", error);

    // Fallback UI
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            ไม่พบความท้าทาย
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            ไม่พบความท้าทายที่คุณกำลังค้นหา
          </p>
          <Link
            href="/challenges"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-block"
          >
            กลับไปหน้าความท้าทาย
          </Link>
        </div>
      </div>
    );
  }
}

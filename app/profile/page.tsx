import { ProfileView } from "@/src/presentation/components/profile/ProfileView";
import { ProfilePresenterFactory } from "@/src/presentation/presenters/profile/ProfilePresenter";
import type { Metadata } from "next";

// Tell Next.js this is a dynamic page
export const dynamic = "force-dynamic";

/**
 * Generate metadata for the page
 */
export async function generateMetadata(): Promise<Metadata> {
  const presenter = await ProfilePresenterFactory.create();

  try {
    return presenter.generateMetadata();
  } catch (error) {
    console.error("Error generating metadata:", error);

    // Fallback metadata
    return {
      title: "โปรไฟล์ | Next Edu",
      description: "จัดการโปรไฟล์และข้อมูลส่วนตัวของคุณ",
    };
  }
}

/**
 * Profile page - Server Component for SEO optimization
 * Uses presenter pattern following Clean Architecture
 */
export default async function ProfilePage() {
  const presenter = await ProfilePresenterFactory.create();

  try {
    // Get view model from presenter
    const viewModel = await presenter.getViewModel();

    return <ProfileView initialViewModel={viewModel} />;
  } catch (error) {
    console.error("Error fetching profile data:", error);

    // Fallback UI
    return <ProfileView />;
  }
}

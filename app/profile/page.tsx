import { ProfileViewSelector } from "@/src/presentation/components/profile/ProfileViewSelector";
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
 * Automatically shows the appropriate view based on user role
 */
export default async function ProfilePage() {
  const presenter = await ProfilePresenterFactory.create();

  try {
    // Get view model from presenter
    const viewModel = await presenter.getViewModel();

    return <ProfileViewSelector initialViewModel={viewModel} />;
  } catch (error) {
    console.error("Error fetching profile data:", error);

    // Fallback UI
    return <ProfileViewSelector />;
  }
}

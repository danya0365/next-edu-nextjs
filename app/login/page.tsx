import { LoginView } from '@/src/presentation/components/auth/LoginView';
import { LoginPresenterFactory } from '@/src/presentation/presenters/auth/LoginPresenter';
import type { Metadata } from 'next';

// Tell Next.js this is a dynamic page
export const dynamic = 'force-dynamic';

/**
 * Generate metadata for the page
 */
export async function generateMetadata(): Promise<Metadata> {
  const presenter = await LoginPresenterFactory.create();

  try {
    return presenter.generateMetadata();
  } catch (error) {
    console.error('Error generating metadata:', error);

    // Fallback metadata
    return {
      title: 'เข้าสู่ระบบ | Next Edu',
      description: 'เข้าสู่ระบบเพื่อเริ่มเรียนออนไลน์',
    };
  }
}

/**
 * Login page - Server Component for SEO optimization
 * Uses presenter pattern following Clean Architecture
 */
export default async function LoginPage() {
  const presenter = await LoginPresenterFactory.create();

  try {
    // Get view model from presenter
    const viewModel = await presenter.getViewModel();

    return <LoginView initialViewModel={viewModel} />;
  } catch (error) {
    console.error('Error fetching login data:', error);

    // Fallback UI
    return <LoginView />;
  }
}

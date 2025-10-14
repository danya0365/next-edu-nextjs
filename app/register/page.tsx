import { RegisterView } from '@/src/presentation/components/auth/RegisterView';
import { RegisterPresenterFactory } from '@/src/presentation/presenters/auth/RegisterPresenter';
import type { Metadata } from 'next';

// Tell Next.js this is a dynamic page
export const dynamic = 'force-dynamic';

/**
 * Generate metadata for the page
 */
export async function generateMetadata(): Promise<Metadata> {
  const presenter = await RegisterPresenterFactory.create();

  try {
    return presenter.generateMetadata();
  } catch (error) {
    console.error('Error generating metadata:', error);

    // Fallback metadata
    return {
      title: 'สมัครสมาชิก | Next Edu',
      description: 'สมัครสมาชิกเพื่อเริ่มเรียนออนไลน์ฟรี',
    };
  }
}

/**
 * Register page - Server Component for SEO optimization
 * Uses presenter pattern following Clean Architecture
 */
export default async function RegisterPage() {
  const presenter = await RegisterPresenterFactory.create();

  try {
    // Get view model from presenter
    const viewModel = await presenter.getViewModel();

    return <RegisterView initialViewModel={viewModel} />;
  } catch (error) {
    console.error('Error fetching register data:', error);

    // Fallback UI
    return <RegisterView />;
  }
}

import { useState } from 'react';
import {
  CourseDetailViewModel,
  CourseDetailPresenter,
  CourseDetailPresenterFactory,
} from './CourseDetailPresenter';

let presenterInstance: CourseDetailPresenter | null = null;

const getPresenter = async () => {
  if (!presenterInstance) {
    presenterInstance = await CourseDetailPresenterFactory.create();
  }
  return presenterInstance;
};

export interface CourseDetailPresenterHook {
  viewModel: CourseDetailViewModel | null;
  loading: boolean;
  error: string | null;
}

/**
 * Custom hook for Course Detail presenter
 */
export function useCourseDetailPresenter(
  initialViewModel: CourseDetailViewModel | null = null
): CourseDetailPresenterHook {
  const [viewModel] = useState<CourseDetailViewModel | null>(initialViewModel || null);
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  return {
    viewModel,
    loading,
    error,
  };
}

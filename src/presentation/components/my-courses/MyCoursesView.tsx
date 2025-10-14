'use client';

import { AvatarFallback } from '@/src/presentation/components/common/AvatarFallback';
import { ImageWithFallback } from '@/src/presentation/components/common/ImageWithFallback';
import { useMyCoursesPresenter } from '@/src/presentation/presenters/my-courses/useMyCoursesPresenter';
import type { MyCoursesViewModel, CourseFilter } from '@/src/presentation/presenters/my-courses/MyCoursesPresenter';
import { BookOpen, Clock, Play, Search, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface MyCoursesViewProps {
  initialViewModel?: MyCoursesViewModel;
  userId?: string;
}

export function MyCoursesView({ initialViewModel, userId }: MyCoursesViewProps) {
  const {
    viewModel,
    loading,
    error,
    filter,
    changeFilter,
    searchQuery,
    setSearchQuery,
    filteredCourses,
  } = useMyCoursesPresenter(initialViewModel, userId);

  if (loading && !viewModel) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  if (error || !viewModel) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">เกิดข้อผิดพลาด</h1>
          <p className="text-gray-600 dark:text-gray-400">{error || 'ไม่พบข้อมูล'}</p>
        </div>
      </div>
    );
  }

  const { stats } = viewModel;

  const filters: { value: CourseFilter; label: string }[] = [
    { value: 'all', label: 'ทั้งหมด' },
    { value: 'in-progress', label: 'กำลังเรียน' },
    { value: 'completed', label: 'เรียนจบแล้ว' },
    { value: 'paused', label: 'หยุดชั่วคราว' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">คอร์สของฉัน</h1>
          <p className="text-gray-600 dark:text-gray-400">
            ติดตามความคืบหน้าและเรียนต่อจากที่ค้าง
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">คอร์สทั้งหมด</p>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalCourses}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <Play className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">กำลังเรียน</p>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.inProgress}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">เรียนจบ</p>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.completed}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">เวลาเรียน</p>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {stats.totalHours}
              <span className="text-lg text-gray-500 ml-1">ชม.</span>
            </p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="mb-6 space-y-4">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-3">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => changeFilter(f.value)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
                  filter === f.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="ค้นหาคอร์ส..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {searchQuery ? 'ไม่พบคอร์สที่ค้นหา' : 'ยังไม่มีคอร์ส'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchQuery
                ? 'ลองค้นหาด้วยคำอื่น'
                : 'เริ่มต้นการเรียนรู้ด้วยการเลือกคอร์สที่คุณสนใจ'}
            </p>
            {!searchQuery && (
              <Link
                href="/courses"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors"
              >
                เรียกดูคอร์สทั้งหมด
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Link
                key={course.id}
                href={`/learn/${course.slug}`}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all overflow-hidden"
              >
                {/* Thumbnail */}
                <div className="relative h-40 bg-gradient-to-br from-blue-400 to-purple-500">
                  <ImageWithFallback
                    src={course.thumbnail}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Play className="w-12 h-12 text-white" />
                  </div>

                  {/* Category Badge */}
                  <div
                    className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white"
                    style={{ backgroundColor: course.categoryColor }}
                  >
                    {course.categoryName}
                  </div>

                  {/* Status Badge */}
                  {course.status === 'completed' && (
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold bg-green-500 text-white">
                      ✓ จบแล้ว
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {course.title}
                  </h3>

                  {/* Instructor */}
                  <div className="flex items-center gap-2 mb-3">
                    <ImageWithFallback
                      src={course.instructorAvatar}
                      alt={course.instructorName}
                      width={20}
                      height={20}
                      className="rounded-full"
                      fallbackElement={
                        <AvatarFallback
                          name={course.instructorName}
                          size={20}
                          fontSize="text-[8px]"
                          gradient="purple-pink"
                        />
                      }
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {course.instructorName}
                    </span>
                  </div>

                  {/* Progress */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">ความคืบหน้า</span>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">
                        {course.progress}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full transition-all"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>
                      {course.completedLessons}/{course.totalLessons} บทเรียน
                    </span>
                    <span>{course.duration} ชม.</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

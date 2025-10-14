'use client';

import { CoursesViewModel } from '@/src/presentation/presenters/courses/CoursesPresenter';
import { useCoursesPresenter } from '@/src/presentation/presenters/courses/useCoursesPresenter';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface CoursesViewProps {
  initialViewModel?: CoursesViewModel;
}

export function CoursesView({ initialViewModel }: CoursesViewProps) {
  const { viewModel, loading, error, filters, currentPage, setFilters, setCurrentPage, clearFilters } =
    useCoursesPresenter(initialViewModel);

  const [searchTerm, setSearchTerm] = useState(filters.search || '');

  // Handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setFilters({ ...filters, search: value });
  };

  // Handle category filter
  const handleCategoryFilter = (categoryId: string) => {
    if (filters.categoryId === categoryId) {
      const { categoryId: removed, ...rest } = filters;
      setFilters(rest);
    } else {
      setFilters({ ...filters, categoryId });
    }
  };

  // Handle level filter
  const handleLevelFilter = (levelId: string) => {
    if (filters.levelId === levelId) {
      const { levelId: removed, ...rest } = filters;
      setFilters(rest);
    } else {
      setFilters({ ...filters, levelId });
    }
  };

  // Handle sort
  const handleSort = (sortBy: typeof filters.sortBy) => {
    setFilters({ ...filters, sortBy });
  };

  // Calculate pagination
  const totalPages = viewModel ? Math.ceil(viewModel.totalCount / viewModel.perPage) : 0;

  // Show loading only on initial load
  if (loading && !viewModel) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">กำลังโหลดคอร์ส...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error && !viewModel) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <p className="text-red-600 font-medium mb-2">เกิดข้อผิดพลาด</p>
              <p className="text-gray-600 mb-4">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!viewModel) {
    return null;
  }

  const activeFiltersCount =
    (filters.categoryId ? 1 : 0) +
    (filters.levelId ? 1 : 0) +
    (filters.search ? 1 : 0) +
    (filters.minRating ? 1 : 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">📚 คอร์สทั้งหมด</h1>
          <p className="text-xl text-blue-100">
            เลือกคอร์สที่คุณสนใจ และเริ่มเรียนรู้วันนี้!
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {viewModel.stats.totalCourses}
              </div>
              <div className="text-sm text-gray-600">คอร์ส</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {viewModel.stats.totalInstructors}
              </div>
              <div className="text-sm text-gray-600">ครูผู้สอน</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-600">
                {viewModel.stats.totalStudents.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">นักเรียน</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                ⭐ {viewModel.stats.averageRating}
              </div>
              <div className="text-sm text-gray-600">คะแนนเฉลี่ย</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">🔍 ตัวกรอง</h2>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    ล้าง ({activeFiltersCount})
                  </button>
                )}
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">หมวดหมู่</h3>
                <div className="space-y-2">
                  {viewModel.categories.slice(0, 8).map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryFilter(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        filters.categoryId === category.id
                          ? 'bg-blue-100 text-blue-900 font-semibold'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Levels */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">ระดับความยาก</h3>
                <div className="space-y-2">
                  {viewModel.levels.map((level) => (
                    <button
                      key={level.id}
                      onClick={() => handleLevelFilter(level.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        filters.levelId === level.id
                          ? 'bg-blue-100 text-blue-900 font-semibold'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {level.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">คะแนนขั้นต่ำ</h3>
                <div className="space-y-2">
                  {[4.5, 4.0, 3.5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() =>
                        setFilters({
                          ...filters,
                          minRating: filters.minRating === rating ? undefined : rating,
                        })
                      }
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        filters.minRating === rating
                          ? 'bg-blue-100 text-blue-900 font-semibold'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      ⭐ {rating} ขึ้นไป
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Search and Sort Bar */}
            <div className="bg-white rounded-2xl shadow-md p-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="🔍 ค้นหาคอร์ส..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <select
                  value={filters.sortBy || 'popular'}
                  onChange={(e) => handleSort(e.target.value as 'newest' | 'popular' | 'rating' | 'price-low' | 'price-high' | 'title')}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="popular">🔥 ยอดนิยม</option>
                  <option value="newest">🆕 ใหม่ล่าสุด</option>
                  <option value="rating">⭐ คะแนนสูงสุด</option>
                  <option value="price-low">💰 ราคาต่ำ-สูง</option>
                  <option value="price-high">💎 ราคาสูง-ต่ำ</option>
                  <option value="title">🔤 ชื่อ A-Z</option>
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-4">
              <p className="text-gray-600">
                พบ <span className="font-semibold text-gray-900">{viewModel.totalCount}</span>{' '}
                คอร์ส
              </p>
            </div>

            {/* Courses Grid */}
            {viewModel.courses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {viewModel.courses.map((course) => {
                  const finalPrice = course.discount
                    ? Math.round(course.price * (1 - course.discount.percentage / 100))
                    : course.price;

                  return (
                    <Link
                      key={course.id}
                      href={`/courses/${course.slug}`}
                      className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
                    >
                      <div className="relative h-48 bg-gradient-to-br from-blue-400 to-purple-500 overflow-hidden">
                        <Image
                          src={course.thumbnail}
                          alt={course.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        {course.discount && (
                          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                            -{course.discount.percentage}%
                          </div>
                        )}
                        {course.isNew && (
                          <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                            🆕 ใหม่
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                            {course.category.name}
                          </span>
                          <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full font-medium">
                            {course.level.name}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {course.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {course.subtitle}
                        </p>
                        <div className="flex items-center gap-2 mb-4">
                          <Image
                            src={course.instructor.avatar}
                            alt={course.instructor.displayName}
                            width={24}
                            height={24}
                            className="rounded-full"
                          />
                          <span className="text-xs text-gray-600">
                            {course.instructor.displayName}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-500">⭐</span>
                            <span className="font-semibold text-sm">{course.rating}</span>
                            <span className="text-gray-500 text-xs">
                              ({course.reviewCount})
                            </span>
                          </div>
                          <div className="text-right">
                            {course.discount ? (
                              <>
                                <div className="text-gray-400 line-through text-xs">
                                  ฿{course.price}
                                </div>
                                <div className="text-xl font-bold text-pink-600">
                                  ฿{finalPrice}
                                </div>
                              </>
                            ) : (
                              <div className="text-xl font-bold text-blue-600">
                                ฿{course.price}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl shadow-md">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  ไม่พบคอร์สที่คุณค้นหา
                </h3>
                <p className="text-gray-600 mb-6">ลองเปลี่ยนคำค้นหาหรือตัวกรองอื่น</p>
                <button
                  onClick={clearFilters}
                  className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
                >
                  ล้างตัวกรอง
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  ← ก่อนหน้า
                </button>

                <div className="flex gap-1">
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-10 h-10 rounded-lg transition-colors ${
                          currentPage === pageNum
                            ? 'bg-blue-600 text-white font-semibold'
                            : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  ถัดไป →
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

'use client';

import { AvatarFallback } from '@/src/presentation/components/common/AvatarFallback';
import { ImageWithFallback } from '@/src/presentation/components/common/ImageWithFallback';
import { useWishlistPresenter } from '@/src/presentation/presenters/wishlist/useWishlistPresenter';
import type { WishlistViewModel } from '@/src/presentation/presenters/wishlist/WishlistPresenter';
import { Heart, Play, X, Star, Clock, BookOpen } from 'lucide-react';
import Link from 'next/link';

interface WishlistViewProps {
  initialViewModel?: WishlistViewModel;
  userId?: string;
}

export function WishlistView({ initialViewModel, userId }: WishlistViewProps) {
  const { viewModel, loading, error, removeFromWishlist, startLearning } = useWishlistPresenter(
    initialViewModel,
    userId
  );

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

  const { courses, totalCourses } = viewModel;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-8 h-8 text-pink-500 fill-pink-500" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Wishlist</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            คอร์สที่คุณสนใจและอยากเรียน ({totalCourses} คอร์ส)
          </p>
        </div>

        {/* Courses List */}
        {courses.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">❤️</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              ยังไม่มีคอร์สใน Wishlist
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              เพิ่มคอร์สที่คุณสนใจเพื่อเรียนในภายหลัง
            </p>
            <Link
              href="/courses"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors"
            >
              เรียกดูคอร์สทั้งหมด
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {courses.map((course) => {
              const finalPrice = course.discount
                ? course.price * (1 - course.discount.percentage / 100)
                : course.price;

              return (
                <div
                  key={course.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row gap-6 p-6">
                    {/* Thumbnail */}
                    <Link
                      href={`/courses/${course.slug}`}
                      className="relative w-full md:w-64 h-40 flex-shrink-0 rounded-xl overflow-hidden group"
                    >
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
                    </Link>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-1">
                          <Link href={`/courses/${course.slug}`}>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                              {course.title}
                            </h3>
                          </Link>
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                            {course.subtitle}
                          </p>

                          {/* Instructor */}
                          <div className="flex items-center gap-2 mb-3">
                            <ImageWithFallback
                              src={course.instructorAvatar}
                              alt={course.instructorName}
                              width={24}
                              height={24}
                              className="rounded-full"
                              fallbackElement={
                                <AvatarFallback
                                  name={course.instructorName}
                                  size={24}
                                  fontSize="text-[10px]"
                                  gradient="purple-pink"
                                />
                              }
                            />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {course.instructorName}
                            </span>
                          </div>

                          {/* Stats */}
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              <span className="font-semibold">{course.rating}</span>
                              <span>({course.studentCount.toLocaleString()})</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{course.duration} ชั่วโมง</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <BookOpen className="w-4 h-4" />
                              <span>{course.lessonCount} บทเรียน</span>
                            </div>
                          </div>
                        </div>

                        {/* Remove button */}
                        <button
                          onClick={() => removeFromWishlist(course.id)}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                          title="ลบออกจาก Wishlist"
                        >
                          <X className="w-5 h-5 text-gray-400" />
                        </button>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap items-center gap-4">
                        {/* Price */}
                        <div className="flex items-center gap-2">
                          {course.discount && (
                            <span className="text-sm text-gray-500 line-through">
                              ฿{course.price.toLocaleString()}
                            </span>
                          )}
                          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            ฿{finalPrice.toLocaleString()}
                          </span>
                          {course.discount && (
                            <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-semibold rounded-full">
                              -{course.discount.percentage}%
                            </span>
                          )}
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-2 ml-auto">
                          <Link
                            href={`/courses/${course.slug}`}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                          >
                            ดูรายละเอียด
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* CTA */}
        {courses.length > 0 && (
          <div className="mt-12 text-center">
            <Link
              href="/courses"
              className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all"
            >
              ค้นหาคอร์สเพิ่มเติม
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

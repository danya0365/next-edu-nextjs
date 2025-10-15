"use client";

import { AvatarFallback } from "@/src/presentation/components/common/AvatarFallback";
import { ImageWithFallback } from "@/src/presentation/components/common/ImageWithFallback";
import type { InstructorDashboardViewModel } from "@/src/presentation/presenters/instructor-dashboard/InstructorDashboardPresenter";
import { useInstructorDashboardPresenter } from "@/src/presentation/presenters/instructor-dashboard/useInstructorDashboardPresenter";
import {
  BookOpen,
  DollarSign,
  Edit,
  Eye,
  MessageSquare,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";

interface InstructorDashboardViewProps {
  initialViewModel?: InstructorDashboardViewModel;
}

export function InstructorDashboardView({
  initialViewModel,
}: InstructorDashboardViewProps) {
  const { viewModel, loading, error } =
    useInstructorDashboardPresenter(initialViewModel);

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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            เกิดข้อผิดพลาด
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {error || "ไม่พบข้อมูล"}
          </p>
        </div>
      </div>
    );
  }

  const { instructor, stats, courses, recentStudents, recentReviews } =
    viewModel;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex items-center gap-6">
            <ImageWithFallback
              src={instructor.avatar}
              alt={instructor.displayName}
              width={80}
              height={80}
              className="rounded-full"
              fallbackElement={
                <AvatarFallback
                  name={instructor.displayName}
                  size={80}
                  fontSize="text-2xl"
                  gradient="blue-purple"
                />
              }
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                ยินดีต้อนรับ, {instructor.displayName}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                {instructor.bio}
              </p>
              <div className="flex flex-wrap gap-2">
                {instructor.expertise.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <Link
              href="/profile"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2"
            >
              <Edit className="w-5 h-5" />
              แก้ไขโปรไฟล์
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                คอร์สทั้งหมด
              </p>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {stats.totalCourses}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                นักเรียน
              </p>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {stats.totalStudents}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <Star className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                คะแนนเฉลี่ย
              </p>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {stats.averageRating.toFixed(1)}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <DollarSign className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">รายได้</p>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              ฿{stats.totalRevenue.toLocaleString()}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <MessageSquare className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">รีวิว</p>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {stats.totalReviews}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Link
            href="/dashboard/instructor/courses"
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  จัดการ
                </p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  คอร์ส
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/dashboard/instructor/students"
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">ดู</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  นักเรียน
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/dashboard/instructor/reviews"
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg group-hover:scale-110 transition-transform">
                <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  จัดการ
                </p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  รีวิว
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/dashboard/instructor/earnings"
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg group-hover:scale-110 transition-transform">
                <DollarSign className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">ดู</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  รายได้
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Courses */}
          <div className="lg:col-span-2 space-y-6">
            {/* My Courses */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  คอร์สของฉัน
                </h2>
                <Link
                  href="/dashboard/instructor/courses"
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                >
                  ดูทั้งหมด →
                </Link>
              </div>

              {courses.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📚</div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    ยังไม่มีคอร์ส
                  </p>
                  <Link
                    href="/dashboard/instructor/courses/create"
                    className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                  >
                    สร้างคอร์สแรก
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {courses.slice(0, 3).map((course) => (
                    <div
                      key={course.id}
                      className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
                    >
                      <ImageWithFallback
                        src={course.thumbnail}
                        alt={course.title}
                        width={80}
                        height={60}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1 truncate">
                          {course.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {course.studentCount}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            {course.rating}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {course.revenue.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Link
                          href={`/courses/${course.slug}`}
                          className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                          title="ดู"
                        >
                          <Eye className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                        </Link>
                        <Link
                          href={`/dashboard/instructor/courses/${course.id}/edit`}
                          className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                          title="แก้ไข"
                        >
                          <Edit className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Reviews */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  รีวิวล่าสุด
                </h2>
                <Link
                  href="/dashboard/instructor/reviews"
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                >
                  ดูทั้งหมด →
                </Link>
              </div>

              {recentReviews.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                  ยังไม่มีรีวิว
                </p>
              ) : (
                <div className="space-y-4">
                  {recentReviews.map((review) => (
                    <div
                      key={review.id}
                      className="pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0"
                    >
                      <div className="flex items-start gap-3 mb-2">
                        <ImageWithFallback
                          src={review.studentAvatar}
                          alt={review.studentName}
                          width={40}
                          height={40}
                          className="rounded-full"
                          fallbackElement={
                            <AvatarFallback
                              name={review.studentName}
                              size={40}
                              fontSize="text-sm"
                            />
                          }
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {review.studentName}
                            </p>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? "text-yellow-500 fill-yellow-500"
                                      : "text-gray-300 dark:text-gray-600"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {review.courseName}
                          </p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {review.comment}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {new Date(review.createdAt).toLocaleDateString(
                              "th-TH"
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Recent Activity */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <Link
                  href="/dashboard/instructor/courses/create"
                  className="block w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-center"
                >
                  สร้างคอร์สใหม่
                </Link>
                <Link
                  href="/dashboard/instructor/courses"
                  className="block w-full px-4 py-3 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors font-semibold text-center"
                >
                  จัดการเนื้อหา
                </Link>
                <Link
                  href="/dashboard/instructor/analytics"
                  className="block w-full px-4 py-3 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors font-semibold text-center"
                >
                  ดูสถิติ
                </Link>
              </div>
            </div>

            {/* Recent Students */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                นักเรียนล่าสุด
              </h2>

              {recentStudents.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                  ยังไม่มีนักเรียน
                </p>
              ) : (
                <div className="space-y-4">
                  {recentStudents.map((student, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <ImageWithFallback
                        src={student.avatar}
                        alt={student.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                        fallbackElement={
                          <AvatarFallback
                            name={student.name}
                            size={40}
                            fontSize="text-sm"
                          />
                        }
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                          {student.name}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                          {student.courseName}
                        </p>
                        <div className="mt-1">
                          <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-600 rounded-full"
                              style={{ width: `${student.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {student.progress}%
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Performance */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-sm p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/20 rounded-lg">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold">Performance</h2>
              </div>
              <p className="text-white/90 mb-4">
                ยอดเยี่ยม! คุณมีนักเรียนเพิ่มขึ้น 12% จากเดือนที่แล้ว
              </p>
              <Link
                href="/dashboard/instructor/analytics"
                className="block w-full px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors font-semibold backdrop-blur-sm text-center"
              >
                ดูรายงานเต็ม
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

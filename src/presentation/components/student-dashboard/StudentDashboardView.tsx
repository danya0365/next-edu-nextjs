"use client";

import { AvatarFallback } from "@/src/presentation/components/common/AvatarFallback";
import { ImageWithFallback } from "@/src/presentation/components/common/ImageWithFallback";
import type { StudentDashboardViewModel } from "@/src/presentation/presenters/student-dashboard/StudentDashboardPresenter";
import { useStudentDashboardPresenter } from "@/src/presentation/presenters/student-dashboard/useStudentDashboardPresenter";
import {
  Award,
  BookOpen,
  ChevronRight,
  Clock,
  Play,
  Sparkles,
  Star,
  Target,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

interface StudentDashboardViewProps {
  initialViewModel?: StudentDashboardViewModel;
}

export function StudentDashboardView({
  initialViewModel,
}: StudentDashboardViewProps) {
  const { viewModel, loading, error } =
    useStudentDashboardPresenter(initialViewModel);

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

  const { stats, continueLearning, recommendedCourses, recentAchievements } =
    viewModel;

  // Calculate progress to next level
  const nextLevelPoints = stats.currentLevel * 1000;
  const levelProgress = (stats.totalPoints % 1000) / 10;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            ยินดีต้อนรับกลับมา! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            พร้อมที่จะเรียนรู้สิ่งใหม่ๆ วันนี้หรือยัง?
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Enrolled Courses */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              คอร์สที่เรียน
            </p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {stats.enrolledCourses}
            </p>
          </div>

          {/* Completed Courses */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                <Award className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              จบแล้ว
            </p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {stats.completedCourses}
            </p>
          </div>

          {/* Learning Time */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              เวลาเรียน
            </p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {stats.totalLearningTime}
              <span className="text-lg text-gray-500 dark:text-gray-400 ml-1">
                ชม.
              </span>
            </p>
          </div>

          {/* Current Streak */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
                <Target className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Streak
            </p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {stats.currentStreak}
              <span className="text-lg text-gray-500 dark:text-gray-400 ml-1">
                วัน
              </span>
            </p>
          </div>
        </div>

        {/* Level Progress */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-xl">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white/90 text-sm">ระดับปัจจุบัน</p>
                <p className="text-3xl font-bold text-white">
                  Level {stats.currentLevel}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white/90 text-sm">คะแนนทั้งหมด</p>
              <p className="text-2xl font-bold text-white">
                {stats.totalPoints}
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{ width: `${levelProgress}%` }}
              />
            </div>
            <p className="text-white/90 text-sm mt-2">
              อีก {nextLevelPoints - (stats.totalPoints % 1000)} คะแนนถึง Level{" "}
              {stats.currentLevel + 1}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Continue Learning */}
            {continueLearning.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    เรียนต่อจากที่ค้าง
                  </h2>
                  <Link
                    href="/dashboard/student/courses"
                    className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                  >
                    ดูทั้งหมด
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="space-y-4">
                  {continueLearning.map((course) => (
                    <Link
                      key={course.id}
                      href={`/learn/${course.slug}`}
                      className="block bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all overflow-hidden group"
                    >
                      <div className="flex gap-4 p-4">
                        <div className="relative w-32 h-20 flex-shrink-0 rounded-xl overflow-hidden">
                          <ImageWithFallback
                            src={course.thumbnail}
                            alt={course.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Play className="w-8 h-8 text-white" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-1 truncate">
                            {course.title}
                          </h3>
                          <div className="flex items-center gap-2 mb-2">
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
                          <div className="flex items-center gap-3">
                            <div className="flex-1">
                              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-blue-600 rounded-full"
                                  style={{ width: `${course.progress}%` }}
                                />
                              </div>
                            </div>
                            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                              {course.progress}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Recommended Courses */}
            {recommendedCourses.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    คอร์สแนะนำสำหรับคุณ
                  </h2>
                  <Link
                    href="/courses"
                    className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                  >
                    ดูทั้งหมด
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recommendedCourses.map((course) => (
                    <Link
                      key={course.id}
                      href={`/courses/${course.slug}`}
                      className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all overflow-hidden group"
                    >
                      <div className="relative h-40 bg-gradient-to-br from-blue-400 to-purple-500">
                        <ImageWithFallback
                          src={course.thumbnail}
                          alt={course.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                          {course.title}
                        </h3>
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
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="text-sm font-medium">
                              {course.rating}
                            </span>
                            <span className="text-sm text-gray-500">
                              ({course.studentCount})
                            </span>
                          </div>
                          <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                            ฿{course.price}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Achievements */}
            {recentAchievements.length > 0 && (
              <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-500" />
                    ความสำเร็จล่าสุด
                  </h3>
                  <Link
                    href="/achievements"
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    ดูทั้งหมด
                  </Link>
                </div>

                <div className="space-y-3">
                  {recentAchievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                        style={{ backgroundColor: achievement.color + "20" }}
                      >
                        {achievement.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                          {achievement.name}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          +{achievement.points} คะแนน
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Quick Links */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                ลิงก์ด่วน
              </h3>
              <div className="space-y-2">
                <Link
                  href="/dashboard/student/courses"
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="text-gray-700 dark:text-gray-300">
                    คอร์สของฉัน
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </Link>
                <Link
                  href="/dashboard/student/wishlist"
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="text-gray-700 dark:text-gray-300">
                    Wishlist
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </Link>
                <Link
                  href="/dashboard/student/certificates"
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="text-gray-700 dark:text-gray-300">
                    ใบประกาศนียบัตร
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </Link>
                <Link
                  href="/achievements"
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="text-gray-700 dark:text-gray-300">
                    ความสำเร็จ
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </Link>
                <Link
                  href="/profile"
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="text-gray-700 dark:text-gray-300">
                    โปรไฟล์
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

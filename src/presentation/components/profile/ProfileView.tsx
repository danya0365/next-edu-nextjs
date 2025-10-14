"use client";

import { AvatarFallback } from "@/src/presentation/components/common/AvatarFallback";
import { ImageWithFallback } from "@/src/presentation/components/common/ImageWithFallback";
import {
  ProfilePresenter,
  type EnrichedStudent,
  type ProfileViewModel,
} from "@/src/presentation/presenters/profile/ProfilePresenter";
import { useAuthStore } from "@/src/presentation/stores/authStore";
import {
  Award,
  BookOpen,
  Calendar,
  ChevronRight,
  Edit,
  Mail,
  Star,
  Target,
  TrendingUp,
  Trophy,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProfileViewProps {
  initialViewModel?: ProfileViewModel;
}

export function ProfileView({ initialViewModel }: ProfileViewProps) {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();

  // Get enriched student data from mock
  const studentData: EnrichedStudent | null = user
    ? ProfilePresenter.getStudentData(user.userId)
    : null;

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user || !studentData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {!isAuthenticated ? "กำลังโหลด..." : "ไม่พบข้อมูลโปรไฟล์"}
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {initialViewModel?.message || "โปรไฟล์"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            จัดการข้อมูลและติดตามความก้าวหน้าของคุณ
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
              <div className="text-center">
                <div className="relative inline-block">
                  <ImageWithFallback
                    src={studentData.avatar}
                    alt={studentData.displayName}
                    width={120}
                    height={120}
                    className="rounded-full mx-auto"
                    fallbackElement={
                      <AvatarFallback
                        name={studentData.displayName}
                        size={120}
                        fontSize="text-[24px]"
                        gradient="purple-pink"
                      />
                    }
                  />
                  <div className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-4 border-white dark:border-gray-800"></div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-4">
                  {studentData.displayName}
                </h2>

                {studentData.grade && (
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {studentData.grade}
                  </p>
                )}

                <div className="flex items-center justify-center gap-2 mt-4">
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Trophy className="w-5 h-5" />
                    <span className="font-bold">Level {studentData.level}</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <div className="flex items-center gap-1 text-blue-500">
                    <Star className="w-5 h-5" />
                    <span className="font-bold">
                      {studentData.points} คะแนน
                    </span>
                  </div>
                </div>

                <button className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Edit className="w-4 h-4" />
                  <span>แก้ไขโปรไฟล์</span>
                </button>

                <button
                  onClick={logout}
                  className="w-full mt-3 px-4 py-2 border-2 border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  ออกจากระบบ
                </button>
              </div>

              {/* Stats */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span className="text-sm">{studentData.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span className="text-sm">{studentData.age} ปี</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Zustand State Debug */}
            <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-blue-900 dark:text-blue-300 mb-3 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Zustand State (Debug)
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-700 dark:text-blue-400">
                    isAuthenticated:
                  </span>
                  <span className="font-mono text-blue-900 dark:text-blue-300">
                    {isAuthenticated ? "✅ true" : "❌ false"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700 dark:text-blue-400">
                    userId:
                  </span>
                  <span className="font-mono text-blue-900 dark:text-blue-300">
                    {user.userId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700 dark:text-blue-400">
                    Persisted:
                  </span>
                  <span className="font-mono text-blue-900 dark:text-blue-300">
                    ✅ localStorage
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Learning Progress */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      คอร์สที่เรียน
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {studentData.enrolledCourses.length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <Award className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      จบแล้ว
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {studentData.completedCourses.length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Level
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {studentData.level}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Enrolled Courses */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                  คอร์สที่กำลังเรียน
                </h2>
                <Link
                  href="/courses"
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                >
                  ดูทั้งหมด
                </Link>
              </div>

              {studentData.enrolledCoursesData.length > 0 ? (
                <div className="space-y-4">
                  {studentData.enrolledCoursesData.map((course) => (
                    <div
                      key={course.id}
                      className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={course.thumbnail}
                            alt={course.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {course.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              กำลังเรียน
                            </p>
                            {course.progress !== undefined && (
                              <>
                                <span className="text-gray-400">•</span>
                                <p className="text-sm text-blue-600 dark:text-blue-400">
                                  {course.progress}% เสร็จสิ้น
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <Link
                        href={`/learn/${course.slug}`}
                        className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:gap-3 transition-all"
                      >
                        <span className="text-sm font-medium">เรียนต่อ</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    คุณยังไม่ได้ลงทะเบียนคอร์สใดๆ
                  </p>
                  <Link
                    href="/courses"
                    className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    เลือกคอร์สเรียน
                  </Link>
                </div>
              )}
            </div>

            {/* Completed Courses */}
            {studentData.completedCoursesData.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-6">
                  <Award className="w-6 h-6 text-green-600" />
                  คอร์สที่จบแล้ว
                </h2>

                <div className="space-y-4">
                  {studentData.completedCoursesData.map((course) => (
                    <div
                      key={course.id}
                      className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={course.thumbnail}
                            alt={course.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {course.title}
                          </h3>
                          <p className="text-sm text-green-600 dark:text-green-400">
                            ✅ จบหลักสูตร
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

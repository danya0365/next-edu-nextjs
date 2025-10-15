"use client";

import { AvatarFallback } from "@/src/presentation/components/common/AvatarFallback";
import { ImageWithFallback } from "@/src/presentation/components/common/ImageWithFallback";
import {
  ProfilePresenter,
  type EnrichedInstructor,
  type ProfileViewModel,
} from "@/src/presentation/presenters/profile/ProfilePresenter";
import { useAuthStore } from "@/src/presentation/stores/authStore";
import {
  Award,
  BookOpen,
  Calendar,
  ChevronRight,
  DollarSign,
  Edit,
  Facebook,
  Globe,
  Linkedin,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Twitter,
  Users,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface InstructorProfileViewProps {
  initialViewModel?: ProfileViewModel;
}

export function InstructorProfileView({
  initialViewModel,
}: InstructorProfileViewProps) {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();

  // Get enriched instructor data from mock
  const instructorData: EnrichedInstructor | null = user
    ? ProfilePresenter.getInstructorData(user.userId)
    : null;

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user || !instructorData) {
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

  // Calculate stats
  const publishedCourses = instructorData.teachingCoursesData.filter(
    (c) => c.status === "published"
  );
  const draftCourses = instructorData.teachingCoursesData.filter(
    (c) => c.status === "draft"
  );
  const totalRevenue = instructorData.totalRevenue.toLocaleString("th-TH");
  const averageRating = instructorData.rating.toFixed(1);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {initialViewModel?.message || "โปรไฟล์ผู้สอน"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            จัดการข้อมูลและติดตามสถิติการสอนของคุณ
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
              <div className="text-center">
                <div className="relative inline-block">
                  <ImageWithFallback
                    src={instructorData.avatar}
                    alt={instructorData.displayName}
                    width={120}
                    height={120}
                    className="rounded-full mx-auto"
                    fallbackElement={
                      <AvatarFallback
                        name={instructorData.displayName}
                        size={120}
                        fontSize="text-[24px]"
                        gradient="blue-purple"
                      />
                    }
                  />
                  {instructorData.isVerified && (
                    <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1 border-4 border-white dark:border-gray-800">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-4">
                  {instructorData.displayName}
                </h2>

                {instructorData.isVerified && (
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                      ผู้สอนที่ได้รับการยืนยัน
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-center gap-2 mt-4">
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-5 h-5 fill-yellow-500" />
                    <span className="font-bold">{averageRating}</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                    <span className="text-sm">
                      {instructorData.reviewCount} รีวิว
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

              {/* Bio */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {instructorData.bio}
                </p>
              </div>

              {/* Expertise */}
              {instructorData.expertise.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    ความเชี่ยวชาญ
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {instructorData.expertise.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {instructorData.education.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    การศึกษา
                  </h3>
                  <ul className="space-y-2">
                    {instructorData.education.map((edu, index) => (
                      <li
                        key={index}
                        className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2"
                      >
                        <Award className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span>{edu}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Social Links */}
              {Object.keys(instructorData.socialLinks).length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    โซเชียลมีเดีย
                  </h3>
                  <div className="flex gap-3">
                    {instructorData.socialLinks.website && (
                      <a
                        href={instructorData.socialLinks.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        <Globe className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                      </a>
                    )}
                    {instructorData.socialLinks.facebook && (
                      <a
                        href={instructorData.socialLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        <Facebook className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                      </a>
                    )}
                    {instructorData.socialLinks.twitter && (
                      <a
                        href={instructorData.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        <Twitter className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                      </a>
                    )}
                    {instructorData.socialLinks.linkedin && (
                      <a
                        href={instructorData.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        <Linkedin className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Member Since */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span className="text-sm">
                    เป็นสมาชิกตั้งแต่{" "}
                    {new Date(instructorData.memberSince).toLocaleDateString(
                      "th-TH",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </span>
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
                    Role:
                  </span>
                  <span className="font-mono text-blue-900 dark:text-blue-300">
                    Instructor
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Teaching Stats & Courses */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      นักเรียน
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {instructorData.studentCount.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <BookOpen className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      คอร์สที่สอน
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {publishedCourses.length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <DollarSign className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      รายได้รวม
                    </p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      ฿{totalRevenue}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                    <Trophy className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      คะแนนเฉลี่ย
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {averageRating}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Published Courses */}
            {publishedCourses.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                    คอร์สที่เปิดสอน
                  </h2>
                  <Link
                    href="/instructor-dashboard"
                    className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                  >
                    ดูทั้งหมด
                  </Link>
                </div>

                <div className="space-y-4">
                  {publishedCourses.slice(0, 5).map((course) => (
                    <div
                      key={course.id}
                      className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={course.thumbnail}
                            alt={course.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                            {course.title}
                          </h3>
                          <div className="flex items-center gap-4 mt-2 text-sm">
                            <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                              <Users className="w-4 h-4" />
                              <span>{course.studentCount} คน</span>
                            </div>
                            <div className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400">
                              <Star className="w-4 h-4 fill-yellow-500" />
                              <span>{course.rating.toFixed(1)}</span>
                            </div>
                            <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                              <DollarSign className="w-4 h-4" />
                              <span>฿{course.price.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Link
                        href={`/courses/${course.slug}`}
                        className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:gap-3 transition-all ml-4"
                      >
                        <span className="text-sm font-medium">ดูคอร์ส</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Draft Courses */}
            {draftCourses.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-6">
                  <Edit className="w-6 h-6 text-orange-600" />
                  คอร์สฉบับร่าง
                </h2>

                <div className="space-y-4">
                  {draftCourses.map((course) => (
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
                          <p className="text-sm text-orange-600 dark:text-orange-400 mt-1">
                            📝 กำลังพัฒนา
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No Courses */}
            {instructorData.teachingCoursesData.length === 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-12">
                <div className="text-center">
                  <BookOpen className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    ยังไม่มีคอร์สที่สอน
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    เริ่มสร้างคอร์สแรกของคุณและแบ่งปันความรู้ให้กับนักเรียน
                  </p>
                  <Link
                    href="/instructor-dashboard"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <TrendingUp className="w-5 h-5" />
                    <span>ไปที่แดชบอร์ดผู้สอน</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

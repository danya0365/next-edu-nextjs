'use client';

import { CourseDetailViewModel } from '@/src/presentation/presenters/course-detail/CourseDetailPresenter';
import { useCourseDetailPresenter } from '@/src/presentation/presenters/course-detail/useCourseDetailPresenter';
import { instructors } from '@/src/data/mock/instructors.mock';
import Link from 'next/link';
import Image from 'next/image';
import {
  Play,
  Clock,
  BookOpen,
  Users,
  Award,
  Star,
  Check,
  Globe,
  BarChart3,
  Calendar,
  FileText,
} from 'lucide-react';

interface CourseDetailViewProps {
  initialViewModel?: CourseDetailViewModel;
}

export function CourseDetailView({ initialViewModel }: CourseDetailViewProps) {
  const { viewModel, loading, error } = useCourseDetailPresenter(initialViewModel);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  if (error || !viewModel?.course) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            ไม่พบคอร์สที่คุณค้นหา
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {error || 'คอร์สนี้อาจถูกลบหรือยังไม่เปิดให้บริการ'}
          </p>
          <Link
            href="/courses"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
          >
            ดูคอร์สทั้งหมด
          </Link>
        </div>
      </div>
    );
  }

  const course = viewModel.course;
  const finalPrice = course.discount
    ? Math.round(course.price * (1 - course.discount.percentage / 100))
    : course.price;

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours} ชม. ${mins > 0 ? `${mins} นาที` : ''}`;
    }
    return `${mins} นาที`;
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 dark:from-blue-700 dark:via-purple-700 dark:to-pink-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Content */}
            <div className="lg:col-span-2">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-blue-100 mb-4">
                <Link href="/" className="hover:text-white">
                  หน้าแรก
                </Link>
                <span>/</span>
                <Link href="/courses" className="hover:text-white">
                  คอร์สทั้งหมด
                </Link>
                <span>/</span>
                <Link
                  href={`/courses?category=${course.category.slug}`}
                  className="hover:text-white"
                >
                  {course.category.name}
                </Link>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl text-blue-100 mb-6">{course.subtitle}</p>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold">{course.rating}</span>
                  <span className="text-blue-100">({course.reviewCount} รีวิว)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{course.studentCount.toLocaleString()} นักเรียน</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  <span>{course.language === 'th' ? 'ภาษาไทย' : 'English'}</span>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-500/30 backdrop-blur-sm rounded-full text-sm font-medium">
                  {course.category.name}
                </span>
                <span className="px-3 py-1 bg-purple-500/30 backdrop-blur-sm rounded-full text-sm font-medium">
                  {course.level.name}
                </span>
                {course.isNew && (
                  <span className="px-3 py-1 bg-green-500/30 backdrop-blur-sm rounded-full text-sm font-medium">
                    🆕 ใหม่
                  </span>
                )}
                {course.isFeatured && (
                  <span className="px-3 py-1 bg-yellow-500/30 backdrop-blur-sm rounded-full text-sm font-medium">
                    ⭐ แนะนำ
                  </span>
                )}
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-4 mt-8">
                <Image
                  src={course.instructor.avatar}
                  alt={course.instructor.displayName}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
                <div>
                  <p className="text-sm text-blue-100">สอนโดย</p>
                  <p className="text-lg font-semibold">{course.instructor.displayName}</p>
                  <p className="text-sm text-blue-100">
                    {course.instructor.studentCount.toLocaleString()} นักเรียน •{' '}
                    {course.instructor.coursesCount} คอร์ส
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Course Card */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden sticky top-20">
                {/* Preview Image/Video */}
                <div className="relative h-48 bg-gradient-to-br from-blue-400 to-purple-500">
                  <Image
                    src={course.thumbnail}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                      <Play className="w-8 h-8 text-blue-600 ml-1" />
                    </button>
                  </div>
                  {course.discount && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      ลด {course.discount.percentage}%
                    </div>
                  )}
                </div>

                {/* Pricing */}
                <div className="p-6">
                  <div className="mb-6">
                    {course.discount ? (
                      <>
                        <div className="flex items-baseline gap-3 mb-2">
                          <span className="text-4xl font-bold text-pink-600 dark:text-pink-500">
                            ฿{finalPrice}
                          </span>
                          <span className="text-xl text-gray-400 line-through">
                            ฿{course.price}
                          </span>
                        </div>
                        <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                          ⏰ ข้อเสนอพิเศษสิ้นสุดเร็วๆ นี้!
                        </p>
                      </>
                    ) : (
                      <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                        ฿{course.price}
                      </span>
                    )}
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-3">
                    <Link
                      href={`/learn/${course.slug}`}
                      className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:scale-[1.02] transition-all text-center"
                    >
                      ลงทะเบียนเรียนเลย!
                    </Link>
                    <button className="w-full border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      เพิ่มลงตะกร้า
                    </button>
                  </div>

                  {/* Course Info */}
                  <div className="mt-6 space-y-3 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5" />
                      <span>{formatDuration(course.totalDuration)}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5" />
                      <span>{course.totalLessons} บทเรียน</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <BarChart3 className="w-5 h-5" />
                      <span>ระดับ{course.level.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award className="w-5 h-5" />
                      <span>ใบประกาศนียบัตร</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5" />
                      <span>เข้าถึงได้ตลอดชีพ</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* What You'll Learn */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                📚 สิ่งที่คุณจะได้เรียนรู้
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.learningOutcomes.map((outcome, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{outcome}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Description */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                📖 เกี่ยวกับคอร์ส
              </h2>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                {course.description}
              </p>
            </section>

            {/* Course Content */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                📝 เนื้อหาในคอร์ส
              </h2>
              <div className="mb-4 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span>{course.sections.length} หัวข้อ</span>
                <span>•</span>
                <span>{course.totalLessons} บทเรียน</span>
                <span>•</span>
                <span>{formatDuration(course.totalDuration)}</span>
              </div>

              <div className="space-y-3">
                {course.sections.map((section, index) => (
                  <details
                    key={section.id}
                    className="group border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                  >
                    <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                            {index + 1}. {section.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {section.lessons.length} บทเรียน
                          </p>
                        </div>
                      </div>
                    </summary>
                    <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                      {section.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 last:border-0"
                        >
                          <div className="flex items-center gap-3">
                            <Play className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            <span className="text-gray-700 dark:text-gray-300">
                              {lesson.title}
                            </span>
                            {lesson.isFree && (
                              <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full">
                                ฟรี
                              </span>
                            )}
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {lesson.duration} นาที
                          </span>
                        </div>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            </section>

            {/* Requirements */}
            {course.requirements.length > 0 && (
              <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                  ✅ ความต้องการ
                </h2>
                <ul className="space-y-3">
                  {course.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-blue-600 dark:text-blue-400">•</span>
                      <span className="text-gray-700 dark:text-gray-300">{req}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Reviews */}
            {course.reviews.length > 0 && (
              <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                  ⭐ รีวิวจากนักเรียน
                </h2>
                <div className="space-y-6">
                  {course.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0 last:pb-0"
                    >
                      <div className="flex items-start gap-4">
                        <Image
                          src={review.studentAvatar}
                          alt={review.studentName}
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <p className="font-semibold text-gray-900 dark:text-gray-100">
                                {review.studentName}
                              </p>
                              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <div className="flex">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < review.rating
                                          ? 'text-yellow-400 fill-yellow-400'
                                          : 'text-gray-300 dark:text-gray-600'
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span>
                                  {new Date(review.createdAt).toLocaleDateString('th-TH')}
                                </span>
                              </div>
                            </div>
                          </div>
                          {review.title && (
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                              {review.title}
                            </h4>
                          )}
                          <p className="text-gray-700 dark:text-gray-300 mb-3">
                            {review.comment}
                          </p>
                          <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                            มีประโยชน์ ({review.helpful})
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Instructor Profile */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                👨‍🏫 เกี่ยวกับครูผู้สอน
              </h2>
              <div className="flex items-start gap-6">
                <Image
                  src={course.instructor.avatar}
                  alt={course.instructor.displayName}
                  width={96}
                  height={96}
                  className="rounded-full"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {course.instructor.displayName}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {course.instructor.bio}
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">คะแนนเฉลี่ย</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        ⭐ {course.instructor.rating}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">นักเรียน</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {course.instructor.studentCount.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">คอร์ส</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {course.instructor.coursesCount}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">รีวิว</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {course.instructor.reviewCount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Sidebar - Related Courses */}
          <div className="lg:col-span-1">
            {course.relatedCourses.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 sticky top-20">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                  🔗 คอร์สที่เกี่ยวข้อง
                </h3>
                <div className="space-y-4">
                  {course.relatedCourses.map((relatedCourse) => {
                    const relatedInstructor = instructors.find(
                      (i) => i.id === relatedCourse.instructorId
                    );
                    return (
                      <Link
                        key={relatedCourse.id}
                        href={`/courses/${relatedCourse.slug}`}
                        className="block group"
                      >
                        <div className="flex gap-4 hover:bg-gray-50 dark:hover:bg-gray-700 p-3 rounded-lg transition-colors">
                          <div className="relative w-24 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                            <Image
                              src={relatedCourse.thumbnail}
                              alt={relatedCourse.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2 mb-1">
                              {relatedCourse.title}
                            </h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                              {relatedInstructor?.displayName}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                                  {relatedCourse.rating}
                                </span>
                              </div>
                              <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                                ฿{relatedCourse.price}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

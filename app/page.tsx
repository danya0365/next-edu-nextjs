import { categories } from '@/src/data/master/categories.master';
import { getFeaturedCourses } from '@/src/data/mock/courses.mock';
import { instructors } from '@/src/data/mock/instructors.mock';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next Edu - คอร์สเรียนออนไลน์สำหรับเด็ก',
  description: 'แพลตฟอร์มเรียนออนไลน์ที่สนุกและเหมาะสำหรับเด็กๆ เรียนรู้ผ่านเกม กิจกรรม และครูผู้สอนมืออาชีพ',
};

export default function Home() {
  const featuredCourses = getFeaturedCourses().slice(0, 6);
  const displayCategories = categories.slice(0, 8);

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 dark:from-blue-700 dark:via-purple-700 dark:to-pink-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              🎉 เรียนรู้อย่างสนุกสนาน
              <br />
              <span className="text-yellow-300">กับ Next Edu</span>
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-blue-100">
              แพลตฟอร์มเรียนออนไลน์สำหรับเด็ก
              <br />
              เรียนผ่านเกม กิจกรรม และครูมืออาชีพ
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/courses"
                className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transition-all transform hover:scale-105 shadow-lg"
              >
                🚀 เริ่มเรียนเลย!
              </Link>
              <Link
                href="/about"
                className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/30 transition-all border-2 border-white"
              >
                ✨ เรียนรู้เพิ่มเติม
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">2,000+</div>
              <div className="text-gray-600 dark:text-gray-300">นักเรียน</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">50+</div>
              <div className="text-gray-600 dark:text-gray-300">คอร์สเรียน</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-600 dark:text-pink-400 mb-2">10+</div>
              <div className="text-gray-600 dark:text-gray-300">ครูผู้สอน</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">4.8/5</div>
              <div className="text-gray-600 dark:text-gray-300">ความพึงพอใจ</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              ⭐ คอร์สแนะนำ
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              คอร์สยอดนิยมที่เด็กๆ ชื่นชอบ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => {
              const instructor = instructors.find((i) => i.id === course.instructorId);
              const category = categories.find((c) => c.id === course.categoryId);

              return (
                <Link
                  key={course.id}
                  href={`/courses/${course.slug}`}
                  className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
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
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full font-medium">
                        {category?.name}
                      </span>
                      {course.isNew && (
                        <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full font-medium">
                          🆕 ใหม่
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                      {course.subtitle}
                    </p>
                    <div className="flex items-center gap-2 mb-4">
                      <Image
                        src={instructor?.avatar || ''}
                        alt={instructor?.displayName || ''}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-300">{instructor?.displayName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">⭐</span>
                        <span className="font-semibold">{course.rating}</span>
                        <span className="text-gray-500 dark:text-gray-400 text-sm">({course.reviewCount})</span>
                      </div>
                      <div className="text-right">
                        {course.discount ? (
                          <>
                            <div className="text-gray-400 dark:text-gray-500 line-through text-sm">
                              ฿{course.price}
                            </div>
                            <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                              ฿{Math.round(course.price * (1 - course.discount.percentage / 100))}
                            </div>
                          </>
                        ) : (
                          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">฿{course.price}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/courses"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              ดูคอร์สทั้งหมด →
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gradient-to-b from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              📚 หมวดหมู่คอร์ส
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              เลือกสิ่งที่คุณสนใจ
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {displayCategories.map((category) => (
              <Link
                key={category.id}
                href={`/courses?category=${category.slug}`}
                className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 text-center transform hover:-translate-y-2"
                style={{ borderTop: `4px solid ${category.color}` }}
              >
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl"
                  style={{ backgroundColor: `${category.color}20` }}
                >
                  <span style={{ color: category.color }}>📖</span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              🎯 เริ่มต้นง่ายๆ แค่ 3 ขั้นตอน
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
                1️⃣
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">เลือกคอร์ส</h3>
              <p className="text-gray-600 dark:text-gray-300">
                ค้นหาคอร์สที่คุณสนใจจากหมวดหมู่มากมาย
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
                2️⃣
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">เริ่มเรียน</h3>
              <p className="text-gray-600 dark:text-gray-300">
                เรียนผ่านวิดีโอ เกม และกิจกรรมสนุกสนาน
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
                3️⃣
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">รับใบประกาศนียบัตร</h3>
              <p className="text-gray-600 dark:text-gray-300">
                เรียนจบและรับใบประกาศนียบัตรภาคภูมิใจ
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            🚀 พร้อมเริ่มต้นการเรียนรู้แล้วหรือยัง?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            ลงทะเบียนวันนี้ และเริ่มเรียนฟรี!
          </p>
          <Link
            href="/register"
            className="inline-block bg-yellow-400 text-blue-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transition-all transform hover:scale-105 shadow-lg"
          >
            สมัครสมาชิกฟรี 🎉
          </Link>
        </div>
      </section>
    </div>
  );
}

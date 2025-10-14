'use client';

import { AvatarFallback } from '@/src/presentation/components/common/AvatarFallback';
import { ImageWithFallback } from '@/src/presentation/components/common/ImageWithFallback';
import { useAboutPresenter } from '@/src/presentation/presenters/about/useAboutPresenter';
import type { AboutViewModel } from '@/src/presentation/presenters/about/AboutPresenter';
import { Target, Eye, Heart, CheckCircle } from 'lucide-react';

interface AboutViewProps {
  initialViewModel?: AboutViewModel;
}

export function AboutView({ initialViewModel }: AboutViewProps) {
  const { viewModel, loading, error } = useAboutPresenter(initialViewModel);

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

  const { mission, vision, values, statistics, team } = viewModel;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">เกี่ยวกับเรา</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            แพลตฟอร์มการเรียนรู้ออนไลน์ที่ออกแบบมาเพื่อเด็กและผู้เริ่มต้น
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Mission */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">พันธกิจ</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{mission}</p>
          </div>

          {/* Vision */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                <Eye className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">วิสัยทัศน์</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{vision}</p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-xl">
              <Heart className="w-6 h-6 text-pink-600 dark:text-pink-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">ค่านิยม</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {values.map((value, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
              >
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <p className="text-gray-900 dark:text-white font-medium">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            ตัวเลขที่น่าประทับใจ
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {statistics.map((stat, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 text-center"
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            ทีมงานของเรา
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div
                key={member.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="mb-4">
                  <ImageWithFallback
                    src={member.avatar}
                    alt={member.name}
                    width={120}
                    height={120}
                    className="rounded-full mx-auto"
                    fallbackElement={
                      <AvatarFallback name={member.name} size={120} fontSize="text-2xl" />
                    }
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-blue-600 dark:text-blue-400 mb-3">{member.role}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">พร้อมที่จะเริ่มเรียนรู้แล้วหรือยัง?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            เข้าร่วมกับนักเรียนกว่า 10,000 คนที่กำลังเรียนรู้และพัฒนาทักษะไปกับเรา
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/courses"
              className="px-8 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              เรียกดูคอร์ส
            </a>
            <a
              href="/contact"
              className="px-8 py-3 bg-blue-700 text-white rounded-full font-semibold hover:bg-blue-800 transition-colors"
            >
              ติดต่อเรา
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

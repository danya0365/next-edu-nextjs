"use client";

import type { InstructorAnalyticsViewModel } from "@/src/presentation/presenters/instructor-analytics/InstructorAnalyticsPresenter";
import { useInstructorAnalyticsPresenter } from "@/src/presentation/presenters/instructor-analytics/useInstructorAnalyticsPresenter";
import {
  BarChart3,
  Download,
  DollarSign,
  Eye,
  RefreshCw,
  Star,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";

interface InstructorAnalyticsViewProps {
  initialViewModel?: InstructorAnalyticsViewModel;
}

export function InstructorAnalyticsView({
  initialViewModel,
}: InstructorAnalyticsViewProps) {
  const [state, actions] = useInstructorAnalyticsPresenter(initialViewModel);
  const { viewModel, loading, error } = state;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("th-TH").format(num);
  };

  const formatPercentage = (num: number) => {
    return `${num.toFixed(1)}%`;
  };

  if (loading && !viewModel) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    );
  }

  if (error && !viewModel) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-red-600 dark:text-red-400 font-medium mb-2">เกิดข้อผิดพลาด</p>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => actions.refresh()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors inline-flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            ลองใหม่อีกครั้ง
          </button>
        </div>
      </div>
    );
  }

  if (!viewModel) return null;

  const { overview } = viewModel;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                📊 วิเคราะห์ข้อมูล
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                วิเคราะห์ข้อมูลและสถิติการสอนอย่างละเอียด
              </p>
            </div>
            <button
              onClick={() => actions.exportReport("pdf")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors inline-flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              ส่งออกรายงาน
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">จำนวนผู้เข้าชม</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatNumber(overview.totalViews)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">ลงทะเบียนทั้งหมด</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatNumber(overview.totalEnrollments)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <DollarSign className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">รายได้ทั้งหมด</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(overview.totalRevenue)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">คะแนนเฉลี่ย</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {overview.averageRating.toFixed(1)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Course Performance */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
            ประสิทธิภาพคอร์ส
          </h3>
          <div className="space-y-4">
            {viewModel.coursePerformance.map((course) => (
              <div
                key={course.courseId}
                className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {course.courseTitle}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      {course.trend === "up" && (
                        <span className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm">
                          <TrendingUp className="w-4 h-4" />
                          เติบโต
                        </span>
                      )}
                      {course.trend === "down" && (
                        <span className="flex items-center gap-1 text-red-600 dark:text-red-400 text-sm">
                          <TrendingDown className="w-4 h-4" />
                          ลดลง
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {formatCurrency(course.revenue)}
                  </p>
                </div>
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">ผู้เข้าชม</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {formatNumber(course.views)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">ลงทะเบียน</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {formatNumber(course.enrollments)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">อัตราจบ</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {formatPercentage(course.completionRate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">คะแนน</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {course.averageRating.toFixed(1)} ⭐
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
            แหล่งที่มาของผู้เข้าชม
          </h3>
          <div className="space-y-4">
            {viewModel.trafficSources.map((source) => {
              const maxVisits = Math.max(...viewModel.trafficSources.map((s) => s.visits));
              const percentage = (source.visits / maxVisits) * 100;

              return (
                <div key={source.source}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {source.source}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                      {formatNumber(source.visits)} ({formatPercentage(source.conversionRate)})
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

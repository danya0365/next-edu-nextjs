"use client";

import type { InstructorCoursesViewModel } from "@/src/presentation/presenters/instructor-courses/InstructorCoursesPresenter";
import { useInstructorCoursesPresenter } from "@/src/presentation/presenters/instructor-courses/useInstructorCoursesPresenter";
import {
  Archive,
  BarChart3,
  BookOpen,
  DollarSign,
  Edit,
  Eye,
  FileText,
  MoreVertical,
  Plus,
  RefreshCw,
  Star,
  Trash2,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface InstructorCoursesViewProps {
  initialViewModel?: InstructorCoursesViewModel;
}

export function InstructorCoursesView({
  initialViewModel,
}: InstructorCoursesViewProps) {
  const [state, actions] = useInstructorCoursesPresenter(initialViewModel);
  const { viewModel, loading, error } = state;
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    }).format(amount);
  };

  // Format number
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("th-TH").format(num);
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    const badges = {
      draft: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400",
      published:
        "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
      archived:
        "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
    };
    const labels = {
      draft: "ฉบับร่าง",
      published: "เผยแพร่แล้ว",
      archived: "เก็บถาวร",
    };
    return {
      className: badges[status as keyof typeof badges] || badges.draft,
      label: labels[status as keyof typeof labels] || status,
    };
  };

  // Loading state
  if (loading && !viewModel) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">
                กำลังโหลดคอร์ส...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !viewModel) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <p className="text-red-600 dark:text-red-400 font-medium mb-2">
                เกิดข้อผิดพลาด
              </p>
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
        </div>
      </div>
    );
  }

  if (!viewModel) return null;

  const { courses, stats } = viewModel;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                📚 คอร์สของฉัน
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                จัดการคอร์สเรียนทั้งหมดของคุณ
              </p>
            </div>
            <Link
              href="/dashboard/instructor/courses/create"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold inline-flex items-center gap-2 transition-colors"
            >
              <Plus className="w-5 h-5" />
              สร้างคอร์สใหม่
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  คอร์สทั้งหมด
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.totalCourses}
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
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  นักเรียนทั้งหมด
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatNumber(stats.totalStudents)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <DollarSign className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  รายได้ทั้งหมด
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(stats.totalRevenue)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Star className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  คะแนนเฉลี่ย
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.averageRating.toFixed(1)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => actions.filterByStatus(null)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                !state.selectedStatus
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              ทั้งหมด ({stats.totalCourses})
            </button>
            <button
              onClick={() => actions.filterByStatus("published")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                state.selectedStatus === "published"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              เผยแพร่แล้ว ({stats.publishedCourses})
            </button>
            <button
              onClick={() => actions.filterByStatus("draft")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                state.selectedStatus === "draft"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              ฉบับร่าง ({stats.draftCourses})
            </button>
            <button
              onClick={() => actions.filterByStatus("archived")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                state.selectedStatus === "archived"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              เก็บถาวร ({stats.archivedCourses})
            </button>
          </div>
        </div>

        {/* Courses List */}
        {courses.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              ยังไม่มีคอร์ส
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              เริ่มสร้างคอร์สแรกของคุณเพื่อแบ่งปันความรู้
            </p>
            <Link
              href="/dashboard/instructor/courses/create"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold inline-flex items-center gap-2 transition-colors"
            >
              <Plus className="w-5 h-5" />
              สร้างคอร์สใหม่
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {courses.map((course) => {
              const statusBadge = getStatusBadge(course.status);

              return (
                <div
                  key={course.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-6">
                    {/* Thumbnail */}
                    <div className="flex-shrink-0">
                      <div className="w-48 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg"></div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                              {course.title}
                            </h3>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge.className}`}
                            >
                              {statusBadge.label}
                            </span>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3">
                            {course.description}
                          </p>
                        </div>

                        {/* Actions Dropdown */}
                        <div className="relative">
                          <button
                            onClick={() =>
                              setActiveDropdown(
                                activeDropdown === course.id ? null : course.id
                              )
                            }
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                          >
                            <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                          </button>

                          {activeDropdown === course.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                              <Link
                                href={`/courses/${course.slug}`}
                                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                              >
                                <Eye className="w-4 h-4" />
                                ดูคอร์ส
                              </Link>
                              <Link
                                href={`/dashboard/instructor/courses/${course.id}/edit`}
                                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                              >
                                <Edit className="w-4 h-4" />
                                แก้ไข
                              </Link>
                              <Link
                                href={`/dashboard/instructor/courses/${course.id}/analytics`}
                                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                              >
                                <BarChart3 className="w-4 h-4" />
                                สถิติ
                              </Link>
                              <hr className="border-gray-200 dark:border-gray-700" />
                              {course.status === "published" && (
                                <button
                                  onClick={() => {
                                    actions.unpublishCourse(course.id);
                                    setActiveDropdown(null);
                                  }}
                                  className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                                >
                                  <FileText className="w-4 h-4" />
                                  ยกเลิกเผยแพร่
                                </button>
                              )}
                              {course.status === "draft" && (
                                <button
                                  onClick={() => {
                                    actions.publishCourse(course.id);
                                    setActiveDropdown(null);
                                  }}
                                  className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-green-600 dark:text-green-400"
                                >
                                  <TrendingUp className="w-4 h-4" />
                                  เผยแพร่
                                </button>
                              )}
                              {course.status !== "archived" && (
                                <button
                                  onClick={() => {
                                    actions.openArchiveModal(course.id);
                                    setActiveDropdown(null);
                                  }}
                                  className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-orange-600 dark:text-orange-400"
                                >
                                  <Archive className="w-4 h-4" />
                                  เก็บถาวร
                                </button>
                              )}
                              <button
                                onClick={() => {
                                  actions.openDeleteModal(course.id);
                                  setActiveDropdown(null);
                                }}
                                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600 dark:text-red-400"
                              >
                                <Trash2 className="w-4 h-4" />
                                ลบ
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-4 gap-4">
                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                            นักเรียน
                          </p>
                          <p className="text-lg font-bold text-gray-900 dark:text-white">
                            {formatNumber(stats.totalStudents)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                            รายได้
                          </p>
                          <p className="text-lg font-bold text-gray-900 dark:text-white">
                            {formatCurrency(stats.totalRevenue)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                            คะแนน
                          </p>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <p className="text-lg font-bold text-gray-900 dark:text-white">
                              {stats.averageRating.toFixed(1)}
                            </p>
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              ({stats.totalReviews})
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                            อัตราจบคอร์ส
                          </p>
                          <p className="text-lg font-bold text-gray-900 dark:text-white">
                            {stats.averageCompletionRate}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Delete Modal */}
        {state.isDeleteModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  ยืนยันการลบคอร์ส
                </h3>
                <button
                  onClick={actions.closeDeleteModal}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                คุณแน่ใจหรือไม่ที่จะลบคอร์สนี้? การกระทำนี้ไม่สามารถย้อนกลับได้
              </p>
              <div className="flex gap-3">
                <button
                  onClick={actions.closeDeleteModal}
                  className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  ยกเลิก
                </button>
                <button
                  onClick={() => {
                    if (state.selectedCourseId) {
                      actions.deleteCourse(state.selectedCourseId);
                    }
                  }}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  ลบคอร์ส
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Archive Modal */}
        {state.isArchiveModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  ยืนยันการเก็บถาวรคอร์ส
                </h3>
                <button
                  onClick={actions.closeArchiveModal}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                คุณต้องการเก็บถาวรคอร์สนี้หรือไม่?
                คอร์สจะไม่แสดงในรายการคอร์สที่เผยแพร่
              </p>
              <div className="flex gap-3">
                <button
                  onClick={actions.closeArchiveModal}
                  className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  ยกเลิก
                </button>
                <button
                  onClick={() => {
                    if (state.selectedCourseId) {
                      actions.archiveCourse(state.selectedCourseId);
                    }
                  }}
                  className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  เก็บถาวร
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

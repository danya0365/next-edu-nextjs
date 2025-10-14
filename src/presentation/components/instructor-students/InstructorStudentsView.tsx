"use client";

import type { InstructorStudentsViewModel } from "@/src/presentation/presenters/instructor-students/InstructorStudentsPresenter";
import { useInstructorStudentsPresenter } from "@/src/presentation/presenters/instructor-students/useInstructorStudentsPresenter";
import {
  BookOpen,
  CheckCircle,
  Mail,
  MoreVertical,
  RefreshCw,
  Search,
  TrendingUp,
  UserCheck,
  UserX,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

interface InstructorStudentsViewProps {
  initialViewModel?: InstructorStudentsViewModel;
}

export function InstructorStudentsView({
  initialViewModel,
}: InstructorStudentsViewProps) {
  const [state, actions] = useInstructorStudentsPresenter(initialViewModel);
  const { viewModel, loading, error, searchQuery } = state;
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [messageText, setMessageText] = useState("");

  // Filter students by search query
  const filteredStudents = useMemo(() => {
    if (!viewModel?.students) return [];
    if (!searchQuery.trim()) return viewModel.students;

    const query = searchQuery.toLowerCase();
    return viewModel.students.filter(
      (student) =>
        student.name.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query)
    );
  }, [viewModel?.students, searchQuery]);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("th-TH", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    const badges = {
      active:
        "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
      inactive:
        "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400",
      suspended:
        "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
    };
    const labels = {
      active: "ใช้งานอยู่",
      inactive: "ไม่ได้ใช้งาน",
      suspended: "ถูกระงับ",
    };
    return {
      className: badges[status as keyof typeof badges] || badges.inactive,
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
                กำลังโหลดนักเรียน...
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

  const { stats } = viewModel;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                👥 นักเรียนของฉัน
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                ดูรายชื่อและติดตามความคืบหน้าของนักเรียน
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  นักเรียนทั้งหมด
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.totalStudents}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <UserCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  ใช้งานอยู่
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.activeStudents}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  ความคืบหน้าเฉลี่ย
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.averageProgress.toFixed(0)}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <CheckCircle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  อัตราจบคอร์ส
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.completionRate.toFixed(0)}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Status Filters */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => actions.filterByStatus(null)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  !state.selectedStatus
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                ทั้งหมด ({stats.totalStudents})
              </button>
              <button
                onClick={() => actions.filterByStatus("active")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  state.selectedStatus === "active"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                ใช้งานอยู่ ({stats.activeStudents})
              </button>
              <button
                onClick={() => actions.filterByStatus("inactive")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  state.selectedStatus === "inactive"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                ไม่ได้ใช้งาน ({stats.inactiveStudents})
              </button>
            </div>

            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="ค้นหานักเรียน..."
                  value={searchQuery}
                  onChange={(e) => actions.setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Students List */}
        {filteredStudents.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">👥</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {searchQuery ? "ไม่พบนักเรียน" : "ยังไม่มีนักเรียน"}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchQuery
                ? "ลองค้นหาด้วยคำอื่น"
                : "นักเรียนจะแสดงที่นี่เมื่อมีการลงทะเบียนเรียน"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredStudents.map((student) => {
              const statusBadge = getStatusBadge(student.status);

              return (
                <div
                  key={student.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        {student.name.charAt(0)}
                      </div>

                      {/* Info */}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            {student.name}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge.className}`}
                          >
                            {statusBadge.label}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          {student.email}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          เข้าใช้งานล่าสุด: {formatDate(student.lastActive)}
                        </p>
                      </div>
                    </div>

                    {/* Actions Dropdown */}
                    <div className="relative">
                      <button
                        onClick={() =>
                          setActiveDropdown(
                            activeDropdown === student.id ? null : student.id
                          )
                        }
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      </button>

                      {activeDropdown === student.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                          <button
                            onClick={() => {
                              actions.openMessageModal(student.id);
                              setActiveDropdown(null);
                            }}
                            className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                          >
                            <Mail className="w-4 h-4" />
                            ส่งข้อความ
                          </button>
                          <Link
                            href={`/dashboard/instructor/students/${student.id}`}
                            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                          >
                            <Users className="w-4 h-4" />
                            ดูรายละเอียด
                          </Link>
                          <hr className="border-gray-200 dark:border-gray-700" />
                          {student.status === "suspended" ? (
                            <button
                              onClick={() => {
                                actions.activateStudent(student.id);
                                setActiveDropdown(null);
                              }}
                              className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-green-600 dark:text-green-400"
                            >
                              <UserCheck className="w-4 h-4" />
                              เปิดใช้งาน
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                actions.openSuspendModal(student.id);
                                setActiveDropdown(null);
                              }}
                              className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600 dark:text-red-400"
                            >
                              <UserX className="w-4 h-4" />
                              ระงับการใช้งาน
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                        คอร์สที่ลงเรียน
                      </p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {student.enrolledCourses}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                        คอร์สที่จบแล้ว
                      </p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {student.completedCourses}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                        ความคืบหน้า
                      </p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {student.totalProgress}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                        ยอดใช้จ่าย
                      </p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {formatCurrency(student.totalSpent)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                        ลงทะเบียนเมื่อ
                      </p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {new Date(student.enrolledAt).toLocaleDateString(
                          "th-TH",
                          { year: "numeric", month: "short", day: "numeric" }
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Courses Progress */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      คอร์สที่กำลังเรียน
                    </h4>
                    <div className="space-y-2">
                      {student.courses.map((course) => (
                        <div
                          key={course.id}
                          className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {course.title}
                            </p>
                            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                              {course.progress}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                            <span>
                              {course.completedLessons}/{course.totalLessons}{" "}
                              บทเรียน
                            </span>
                            {course.grade && (
                              <span className="font-semibold text-green-600 dark:text-green-400">
                                คะแนน: {course.grade}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Message Modal */}
        {state.isMessageModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  ส่งข้อความถึงนักเรียน
                </h3>
                <button
                  onClick={actions.closeMessageModal}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <textarea
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="พิมพ์ข้อความของคุณ..."
                rows={4}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white mb-4"
              />
              <div className="flex gap-3">
                <button
                  onClick={actions.closeMessageModal}
                  className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  ยกเลิก
                </button>
                <button
                  onClick={() => {
                    if (state.selectedStudentId && messageText.trim()) {
                      actions.sendMessage(state.selectedStudentId, messageText);
                      setMessageText("");
                    }
                  }}
                  disabled={!messageText.trim()}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ส่งข้อความ
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Suspend Modal */}
        {state.isSuspendModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  ยืนยันการระงับการใช้งาน
                </h3>
                <button
                  onClick={actions.closeSuspendModal}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                คุณแน่ใจหรือไม่ที่จะระงับการใช้งานของนักเรียนคนนี้?
                นักเรียนจะไม่สามารถเข้าถึงคอร์สได้ชั่วคราว
              </p>
              <div className="flex gap-3">
                <button
                  onClick={actions.closeSuspendModal}
                  className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  ยกเลิก
                </button>
                <button
                  onClick={() => {
                    if (state.selectedStudentId) {
                      actions.suspendStudent(state.selectedStudentId);
                    }
                  }}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  ระงับการใช้งาน
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

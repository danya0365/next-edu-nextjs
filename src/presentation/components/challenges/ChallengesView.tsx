"use client";

import type { ChallengesViewModel } from "@/src/presentation/presenters/challenges/ChallengesPresenter";
import { useChallengesPresenter } from "@/src/presentation/presenters/challenges/useChallengesPresenter";
import {
  Award,
  Calendar,
  ChevronRight,
  Clock,
  Filter,
  Flame,
  RefreshCw,
  Target,
  Trophy,
  Users,
  X,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface ChallengesViewProps {
  initialViewModel?: ChallengesViewModel;
}

export function ChallengesView({ initialViewModel }: ChallengesViewProps) {
  const [state, actions] = useChallengesPresenter(initialViewModel);
  const { viewModel, loading, error } = state;
  const [showFilters, setShowFilters] = useState(false);

  // Format date
  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("th-TH", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(dateString));
  };

  // Get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      easy: "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30",
      medium:
        "text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30",
      hard: "text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30",
      expert:
        "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30",
    };
    return colors[difficulty as keyof typeof colors] || colors.easy;
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    const badges = {
      upcoming:
        "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
      active:
        "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
      ended: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400",
    };
    const labels = {
      upcoming: "เร็วๆ นี้",
      active: "กำลังเปิด",
      ended: "สิ้นสุดแล้ว",
    };
    return {
      className: badges[status as keyof typeof badges] || badges.active,
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
                กำลังโหลดความท้าทาย...
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

  const { challenges, stats, categories, difficulties } = viewModel;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            🎯 ความท้าทาย
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            ทดสอบความสามารถและรับรางวัลมากมาย
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                ทั้งหมด
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.totalChallenges}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-5 h-5 text-green-600 dark:text-green-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                กำลังเปิด
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.activeChallenges}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                จบแล้ว
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.completedChallenges}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                กำลังทำ
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.inProgressChallenges}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                คะแนน
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.totalPointsEarned}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-pink-600 dark:text-pink-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                XP
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.totalXpEarned}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Filter className="w-5 h-5" />
              ตัวกรอง
            </h2>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
            >
              {showFilters ? "ซ่อน" : "แสดง"}
            </button>
          </div>

          {showFilters && (
            <div className="space-y-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  หมวดหมู่
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => actions.filterByCategory(null)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      !state.selectedCategory
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    ทั้งหมด
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => actions.filterByCategory(category.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        state.selectedCategory === category.id
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      {category.name} ({category.count})
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ระดับความยาก
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => actions.filterByDifficulty(null)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      !state.selectedDifficulty
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    ทั้งหมด
                  </button>
                  {difficulties.map((difficulty) => (
                    <button
                      key={difficulty.id}
                      onClick={() => actions.filterByDifficulty(difficulty.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        state.selectedDifficulty === difficulty.id
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      {difficulty.name} ({difficulty.count})
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  สถานะ
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => actions.filterByStatus(null)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      !state.selectedStatus
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    ทั้งหมด
                  </button>
                  <button
                    onClick={() => actions.filterByStatus("active")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      state.selectedStatus === "active"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    กำลังเปิด
                  </button>
                  <button
                    onClick={() => actions.filterByStatus("upcoming")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      state.selectedStatus === "upcoming"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    เร็วๆ นี้
                  </button>
                  <button
                    onClick={() => actions.filterByStatus("ended")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      state.selectedStatus === "ended"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    สิ้นสุดแล้ว
                  </button>
                </div>
              </div>

              {/* Clear Filters */}
              {(state.selectedCategory ||
                state.selectedDifficulty ||
                state.selectedStatus) && (
                <button
                  onClick={() => actions.clearFilters()}
                  className="text-red-600 dark:text-red-400 hover:underline text-sm flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  ล้างตัวกรองทั้งหมด
                </button>
              )}
            </div>
          )}
        </div>

        {/* Challenges Grid */}
        {challenges.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              ไม่พบความท้าทาย
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              ลองเปลี่ยนตัวกรองหรือกลับมาดูใหม่ภายหลัง
            </p>
            {(state.selectedCategory ||
              state.selectedDifficulty ||
              state.selectedStatus) && (
              <button
                onClick={() => actions.clearFilters()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors inline-flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                ล้างตัวกรอง
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((challenge) => {
              const statusBadge = getStatusBadge(challenge.status);
              const difficultyColor = getDifficultyColor(challenge.difficulty);
              const progress = challenge.userProgress?.progress || 0;

              return (
                <Link
                  key={challenge.id}
                  href={`/challenges/${challenge.id}`}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all overflow-hidden group"
                >
                  {/* Thumbnail */}
                  <div className="relative h-48 bg-gradient-to-br from-blue-400 to-purple-500">
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge.className}`}
                      >
                        {statusBadge.label}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColor}`}
                      >
                        {
                          difficulties.find(
                            (d) => d.id === challenge.difficulty
                          )?.name
                        }
                      </span>
                    </div>
                    {challenge.userProgress && (
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full h-2 overflow-hidden">
                          <div
                            className="h-full bg-white rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <p className="text-white text-xs mt-1 font-medium">
                          ความคืบหน้า: {progress}%
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {challenge.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                      {challenge.description}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {challenge.points} คะแนน
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {challenge.xp} XP
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {challenge.participants} คน
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-green-600 dark:text-green-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {challenge.completions} จบ
                        </span>
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {formatDate(challenge.startDate)} -{" "}
                        {formatDate(challenge.endDate)}
                      </span>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-between">
                      <span className="text-blue-600 dark:text-blue-400 font-medium group-hover:underline">
                        {challenge.userProgress
                          ? "ดำเนินการต่อ"
                          : "เริ่มความท้าทาย"}
                      </span>
                      <ChevronRight className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

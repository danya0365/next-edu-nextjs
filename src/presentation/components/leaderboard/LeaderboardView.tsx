"use client";

import { AvatarFallback } from "@/src/presentation/components/common/AvatarFallback";
import { ImageWithFallback } from "@/src/presentation/components/common/ImageWithFallback";
import type {
  LeaderboardFilter,
  LeaderboardViewModel,
} from "@/src/presentation/presenters/leaderboard/LeaderboardPresenter";
import { useLeaderboardPresenter } from "@/src/presentation/presenters/leaderboard/useLeaderboardPresenter";
import { Award, Crown, Medal, Target, TrendingUp, Trophy } from "lucide-react";

interface LeaderboardViewProps {
  initialViewModel?: LeaderboardViewModel;
}

export function LeaderboardView({ initialViewModel }: LeaderboardViewProps) {
  const { viewModel, loading, error, filter, changeFilter } =
    useLeaderboardPresenter(initialViewModel);

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

  const { topThree, leaderboard, currentUserRank, totalPlayers } = viewModel;

  const filters: { value: LeaderboardFilter; label: string }[] = [
    { value: "all-time", label: "ตลอดกาล" },
    { value: "this-month", label: "เดือนนี้" },
    { value: "this-week", label: "สัปดาห์นี้" },
  ];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-orange-600" />;
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-500" />
            กระดานคะแนน
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            แข่งขันกับเพื่อนๆ และติดอันดับสูงสุด
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-8">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => changeFilter(f.value)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
                filter === f.value
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Top 3 Podium */}
        {topThree.length >= 3 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              🏆 Top 3 ของเดือนนี้
            </h2>
            <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
              {/* 2nd Place */}
              <div className="order-1">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center transform translate-y-8">
                  <div className="relative inline-block mb-4">
                    <ImageWithFallback
                      src={topThree[1].avatar}
                      alt={topThree[1].displayName}
                      width={80}
                      height={80}
                      className="rounded-full mx-auto ring-4 ring-gray-300"
                      fallbackElement={
                        <AvatarFallback
                          name={topThree[1].displayName}
                          size={80}
                          fontSize="text-xl"
                        />
                      }
                    />
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                      2
                    </div>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                    {topThree[1].displayName}
                  </h3>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <TrendingUp className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Level {topThree[1].level}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-gray-700 dark:text-gray-300">
                    {topThree[1].points.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">คะแนน</p>
                </div>
              </div>

              {/* 1st Place */}
              <div className="order-2">
                <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl shadow-2xl p-6 text-center relative">
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <Crown className="w-12 h-12 text-yellow-500 animate-bounce" />
                  </div>
                  <div className="relative inline-block mb-4 mt-4">
                    <ImageWithFallback
                      src={topThree[0].avatar}
                      alt={topThree[0].displayName}
                      width={100}
                      height={100}
                      className="rounded-full mx-auto ring-4 ring-yellow-200"
                      fallbackElement={
                        <AvatarFallback
                          name={topThree[0].displayName}
                          size={100}
                          fontSize="text-2xl"
                          gradient="orange-red"
                        />
                      }
                    />
                    <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-full flex items-center justify-center text-yellow-600 font-bold text-xl shadow-lg">
                      1
                    </div>
                  </div>
                  <h3 className="font-bold text-xl text-white mb-1">
                    {topThree[0].displayName}
                  </h3>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <TrendingUp className="w-4 h-4 text-yellow-100" />
                    <span className="text-sm text-yellow-100">
                      Level {topThree[0].level}
                    </span>
                  </div>
                  <p className="text-3xl font-bold text-white">
                    {topThree[0].points.toLocaleString()}
                  </p>
                  <p className="text-sm text-yellow-100">คะแนน</p>
                </div>
              </div>

              {/* 3rd Place */}
              <div className="order-3">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center transform translate-y-8">
                  <div className="relative inline-block mb-4">
                    <ImageWithFallback
                      src={topThree[2].avatar}
                      alt={topThree[2].displayName}
                      width={80}
                      height={80}
                      className="rounded-full mx-auto ring-4 ring-orange-300"
                      fallbackElement={
                        <AvatarFallback
                          name={topThree[2].displayName}
                          size={80}
                          fontSize="text-xl"
                        />
                      }
                    />
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                      3
                    </div>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                    {topThree[2].displayName}
                  </h3>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <TrendingUp className="w-4 h-4 text-orange-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Level {topThree[2].level}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-gray-700 dark:text-gray-300">
                    {topThree[2].points.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">คะแนน</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Current User Rank */}
        {currentUserRank && currentUserRank.rank > 3 && (
          <div className="mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <ImageWithFallback
                      src={currentUserRank.avatar}
                      alt={currentUserRank.displayName}
                      width={60}
                      height={60}
                      className="rounded-full ring-4 ring-white/30"
                      fallbackElement={
                        <AvatarFallback
                          name={currentUserRank.displayName}
                          size={60}
                          fontSize="text-lg"
                        />
                      }
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-white/90 text-sm mb-1">อันดับของคุณ</p>
                  <h3 className="text-2xl font-bold text-white">
                    #{currentUserRank.rank}
                  </h3>
                </div>
                <div className="text-right">
                  <p className="text-white/90 text-sm mb-1">คะแนน</p>
                  <p className="text-2xl font-bold text-white">
                    {currentUserRank.points.toLocaleString()}
                  </p>
                </div>
                <div className="text-right hidden sm:block">
                  <p className="text-white/90 text-sm mb-1">Level</p>
                  <p className="text-2xl font-bold text-white">
                    {currentUserRank.level}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard Table */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              อันดับทั้งหมด ({totalPlayers} คน)
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    อันดับ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    ผู้เล่น
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    คะแนน
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    คอร์สจบ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Streak
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {leaderboard.map((entry) => (
                  <tr
                    key={entry.userId}
                    className={`${
                      entry.isCurrentUser
                        ? "bg-blue-50 dark:bg-blue-900/20"
                        : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    } transition-colors`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getRankIcon(entry.rank) || (
                          <span className="text-lg font-bold text-gray-900 dark:text-white">
                            #{entry.rank}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <ImageWithFallback
                          src={entry.avatar}
                          alt={entry.displayName}
                          width={40}
                          height={40}
                          className="rounded-full"
                          fallbackElement={
                            <AvatarFallback
                              name={entry.displayName}
                              size={40}
                            />
                          }
                        />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {entry.displayName}
                            {entry.isCurrentUser && (
                              <span className="ml-2 text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full">
                                คุณ
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-purple-500" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {entry.level}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        {entry.points.toLocaleString()}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-900 dark:text-white">
                          {entry.completedCourses}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Target className="w-4 h-4 text-orange-500" />
                        <span className="text-sm text-gray-900 dark:text-white">
                          {entry.streak} วัน
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

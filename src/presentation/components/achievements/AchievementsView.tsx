"use client";

import type { AchievementsViewModel } from "@/src/presentation/presenters/achievements/AchievementsPresenter";
import { useAchievementsPresenter } from "@/src/presentation/presenters/achievements/useAchievementsPresenter";
import { Lock, Sparkles, TrendingUp, Trophy, X } from "lucide-react";

interface AchievementsViewProps {
  initialViewModel?: AchievementsViewModel;
}

export function AchievementsView({ initialViewModel }: AchievementsViewProps) {
  const {
    viewModel,
    loading,
    error,
    filter,
    setFilter,
    filteredAchievements,
    selectedAchievement,
    setSelectedAchievement,
  } = useAchievementsPresenter(initialViewModel);

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

  const { stats, rarityCount } = viewModel;

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "text-gray-600 dark:text-gray-400";
      case "rare":
        return "text-blue-600 dark:text-blue-400";
      case "epic":
        return "text-purple-600 dark:text-purple-400";
      case "legendary":
        return "text-yellow-600 dark:text-yellow-400";
      default:
        return "text-gray-600";
    }
  };

  const getRarityBg = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 dark:bg-gray-800";
      case "rare":
        return "bg-blue-50 dark:bg-blue-900/20";
      case "epic":
        return "bg-purple-50 dark:bg-purple-900/20";
      case "legendary":
        return "bg-yellow-50 dark:bg-yellow-900/20";
      default:
        return "bg-gray-100";
    }
  };

  const filters = [
    { value: "all" as const, label: "ทั้งหมด", count: stats.totalCount },
    {
      value: "unlocked" as const,
      label: "ปลดล็อกแล้ว",
      count: stats.unlockedCount,
    },
    {
      value: "locked" as const,
      label: "ยังไม่ได้ปลดล็อก",
      count: stats.totalCount - stats.unlockedCount,
    },
    { value: "common" as const, label: "Common", count: rarityCount.common },
    { value: "rare" as const, label: "Rare", count: rarityCount.rare },
    { value: "epic" as const, label: "Epic", count: rarityCount.epic },
    {
      value: "legendary" as const,
      label: "Legendary",
      count: rarityCount.legendary,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-500" />
            ความสำเร็จ
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            รวบรวมความสำเร็จและปลดล็อกรางวัลพิเศษ
          </p>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Points */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="w-6 h-6 text-yellow-300" />
                <p className="text-white/90 text-sm">คะแนนทั้งหมด</p>
              </div>
              <p className="text-4xl font-bold text-white">
                {stats.totalPoints}
              </p>
            </div>

            {/* Current Level */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-6 h-6 text-green-300" />
                <p className="text-white/90 text-sm">ระดับปัจจุบัน</p>
              </div>
              <p className="text-4xl font-bold text-white">
                Level {stats.currentLevel}
              </p>
            </div>

            {/* Unlocked Achievements */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Trophy className="w-6 h-6 text-yellow-300" />
                <p className="text-white/90 text-sm">ปลดล็อกแล้ว</p>
              </div>
              <p className="text-4xl font-bold text-white">
                {stats.unlockedCount}/{stats.totalCount}
              </p>
            </div>
          </div>

          {/* Level Progress */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-white/90 text-sm mb-2">
              <span>ความคืบหน้าถึง Level {stats.currentLevel + 1}</span>
              <span>{stats.levelProgress.toFixed(0)}%</span>
            </div>
            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{ width: `${stats.levelProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === f.value
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {f.label} ({f.count})
            </button>
          ))}
        </div>

        {/* Achievements Grid */}
        {filteredAchievements.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              ไม่พบความสำเร็จ
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              ลองเปลี่ยนตัวกรองดู
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAchievements.map((achievement) => (
              <button
                key={achievement.id}
                onClick={() => setSelectedAchievement(achievement)}
                className={`text-left p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all ${
                  achievement.isUnlocked
                    ? getRarityBg(achievement.rarity)
                    : "bg-white dark:bg-gray-800 opacity-60"
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 ${
                      achievement.isUnlocked
                        ? ""
                        : "bg-gray-200 dark:bg-gray-700 grayscale"
                    }`}
                    style={{
                      backgroundColor: achievement.isUnlocked
                        ? achievement.color + "20"
                        : undefined,
                    }}
                  >
                    {achievement.isUnlocked ? (
                      achievement.icon
                    ) : (
                      <Lock className="w-8 h-8 text-gray-400" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3
                        className={`font-bold text-lg ${getRarityColor(
                          achievement.rarity
                        )}`}
                      >
                        {achievement.name}
                      </h3>
                      {achievement.isUnlocked && (
                        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                          +{achievement.points}
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                      {achievement.description}
                    </p>

                    {/* Progress */}
                    {!achievement.isUnlocked &&
                      achievement.progress !== undefined &&
                      achievement.progress > 0 && (
                        <div>
                          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                            <span>ความคืบหน้า</span>
                            <span>{achievement.progress.toFixed(0)}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-500 rounded-full transition-all"
                              style={{ width: `${achievement.progress}%` }}
                            />
                          </div>
                        </div>
                      )}

                    {/* Unlocked Date */}
                    {achievement.isUnlocked && achievement.unlockedAt && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        ปลดล็อก:{" "}
                        {new Date(achievement.unlockedAt).toLocaleDateString(
                          "th-TH"
                        )}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Achievement Detail Modal */}
        {selectedAchievement && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedAchievement(null)}
          >
            <div
              className={`max-w-md w-full rounded-2xl shadow-2xl p-6 ${getRarityBg(
                selectedAchievement.rarity
              )}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl"
                  style={{ backgroundColor: selectedAchievement.color + "20" }}
                >
                  {selectedAchievement.isUnlocked ? (
                    selectedAchievement.icon
                  ) : (
                    <Lock className="w-10 h-10 text-gray-400" />
                  )}
                </div>
                <button
                  onClick={() => setSelectedAchievement(null)}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <h2
                className={`text-2xl font-bold mb-2 ${getRarityColor(
                  selectedAchievement.rarity
                )}`}
              >
                {selectedAchievement.name}
              </h2>

              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {selectedAchievement.description}
              </p>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    ความหายาก
                  </span>
                  <span
                    className={`text-sm font-semibold capitalize ${getRarityColor(
                      selectedAchievement.rarity
                    )}`}
                  >
                    {selectedAchievement.rarity}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    คะแนน
                  </span>
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                    +{selectedAchievement.points}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    เงื่อนไข
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {selectedAchievement.requirement}
                  </span>
                </div>

                {selectedAchievement.isUnlocked &&
                  selectedAchievement.unlockedAt && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        ปลดล็อกเมื่อ
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {new Date(
                          selectedAchievement.unlockedAt
                        ).toLocaleDateString("th-TH", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  )}
              </div>

              {selectedAchievement.isUnlocked && (
                <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl text-center">
                  <p className="text-green-700 dark:text-green-400 font-semibold">
                    🎉 ปลดล็อกแล้ว!
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

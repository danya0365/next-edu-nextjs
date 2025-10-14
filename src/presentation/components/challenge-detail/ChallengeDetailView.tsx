"use client";

import type { ChallengeDetailViewModel } from "@/src/presentation/presenters/challenge-detail/ChallengeDetailPresenter";
import { useChallengeDetailPresenter } from "@/src/presentation/presenters/challenge-detail/useChallengeDetailPresenter";
import {
  Award,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileText,
  Flame,
  Play,
  RefreshCw,
  Target,
  Trophy,
  Users,
  Video,
  Zap,
} from "lucide-react";
import Link from "next/link";

interface ChallengeDetailViewProps {
  challengeId: string;
  initialViewModel?: ChallengeDetailViewModel;
}

export function ChallengeDetailView({
  challengeId,
  initialViewModel,
}: ChallengeDetailViewProps) {
  const [state, actions] = useChallengeDetailPresenter(
    challengeId,
    initialViewModel
  );
  const { viewModel, loading, error, isJoining, isCompletingTask } = state;

  // Format date
  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateString));
  };

  // Format time
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours} ชม. ${mins > 0 ? `${mins} นาที` : ""}`;
    }
    return `${mins} นาที`;
  };

  // Get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      easy: "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30",
      medium:
        "text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30",
      hard: "text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30",
      expert: "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30",
    };
    return colors[difficulty as keyof typeof colors] || colors.easy;
  };

  // Get difficulty name
  const getDifficultyName = (difficulty: string) => {
    const names = {
      easy: "ง่าย",
      medium: "ปานกลาง",
      hard: "ยาก",
      expert: "ผู้เชี่ยวชาญ",
    };
    return names[difficulty as keyof typeof names] || difficulty;
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

  // Get task icon
  const getTaskIcon = (type: string) => {
    const icons = {
      quiz: Target,
      project: FileText,
      exercise: FileText,
      video: Video,
      reading: FileText,
    };
    return icons[type as keyof typeof icons] || FileText;
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

  const { challenge, userProgress, completionRate, estimatedTime, relatedChallenges } =
    viewModel;
  const statusBadge = getStatusBadge(challenge.status);
  const difficultyColor = getDifficultyColor(challenge.difficulty);
  const progress = userProgress?.progress || 0;
  const isJoined = !!userProgress;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/challenges"
            className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            กลับไปหน้าความท้าทาย
          </Link>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl overflow-hidden mb-8">
          <div className="p-8 md:p-12">
            <div className="flex flex-wrap gap-2 mb-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${statusBadge.className}`}
              >
                {statusBadge.label}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${difficultyColor}`}
              >
                {getDifficultyName(challenge.difficulty)}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {challenge.title}
            </h1>
            <p className="text-xl text-white/90 mb-6">
              {challenge.description}
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="w-5 h-5 text-white" />
                  <span className="text-white/80 text-sm">คะแนน</span>
                </div>
                <p className="text-2xl font-bold text-white">
                  {challenge.points}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-5 h-5 text-white" />
                  <span className="text-white/80 text-sm">XP</span>
                </div>
                <p className="text-2xl font-bold text-white">{challenge.xp}</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-5 h-5 text-white" />
                  <span className="text-white/80 text-sm">ผู้เข้าร่วม</span>
                </div>
                <p className="text-2xl font-bold text-white">
                  {challenge.participants}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-5 h-5 text-white" />
                  <span className="text-white/80 text-sm">เวลา</span>
                </div>
                <p className="text-2xl font-bold text-white">
                  {formatTime(estimatedTime)}
                </p>
              </div>
            </div>

            {/* Progress Bar (if joined) */}
            {isJoined && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-medium">ความคืบหน้า</span>
                  <span className="text-white font-bold">{progress}%</span>
                </div>
                <div className="bg-white/20 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* CTA Button */}
            {!isJoined ? (
              <button
                onClick={actions.joinChallenge}
                disabled={isJoining || challenge.status === "ended"}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
              >
                {isJoining ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600" />
                    กำลังเข้าร่วม...
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    เข้าร่วมความท้าทาย
                  </>
                )}
              </button>
            ) : (
              <div className="flex items-center gap-2 text-white">
                <CheckCircle2 className="w-6 h-6" />
                <span className="font-semibold">คุณได้เข้าร่วมความท้าทายนี้แล้ว</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Challenge Info */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                รายละเอียด
              </h2>

              {/* Dates */}
              <div className="flex items-center gap-4 mb-6 text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>เริ่ม: {formatDate(challenge.startDate)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>สิ้นสุด: {formatDate(challenge.endDate)}</span>
                </div>
              </div>

              {/* Requirements */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  ข้อกำหนด
                </h3>
                <ul className="space-y-2">
                  {challenge.requirements.map((req, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-gray-600 dark:text-gray-400"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Rewards */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  รางวัล
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <Award className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        คะแนน
                      </p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {challenge.rewards.points}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <Zap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        XP
                      </p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {challenge.rewards.xp}
                      </p>
                    </div>
                  </div>

                  {challenge.rewards.badge && (
                    <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <Trophy className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          ตราสัญลักษณ์
                        </p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          {challenge.rewards.badge}
                        </p>
                      </div>
                    </div>
                  )}

                  {challenge.rewards.certificate && (
                    <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <FileText className="w-6 h-6 text-green-600 dark:text-green-400" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          ใบประกาศนียบัตร
                        </p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          ✓
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tasks */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                งานที่ต้องทำ ({challenge.tasks.length} งาน)
              </h2>

              <div className="space-y-4">
                {challenge.tasks.map((task, index) => {
                  const TaskIcon = getTaskIcon(task.type);
                  const isCompleted = userProgress?.completedTasks.includes(
                    task.id
                  );

                  return (
                    <div
                      key={task.id}
                      className={`border rounded-lg p-4 transition-all ${
                        isCompleted
                          ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                          : "border-gray-200 dark:border-gray-700"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                            isCompleted
                              ? "bg-green-500 text-white"
                              : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="w-6 h-6" />
                          ) : (
                            <span className="font-bold">{index + 1}</span>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {task.title}
                                {task.isRequired && (
                                  <span className="ml-2 text-red-600 dark:text-red-400 text-sm">
                                    *จำเป็น
                                  </span>
                                )}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-400 text-sm">
                                {task.description}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <TaskIcon className="w-4 h-4" />
                              <span className="capitalize">{task.type}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{formatTime(task.estimatedTime)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Award className="w-4 h-4" />
                              <span>{task.points} คะแนน</span>
                            </div>
                          </div>

                          {isJoined && !isCompleted && (
                            <button
                              onClick={() => actions.completeTask(task.id)}
                              disabled={isCompletingTask}
                              className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isCompletingTask
                                ? "กำลังบันทึก..."
                                : "ทำงานนี้เสร็จแล้ว"}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                สถิติ
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    ผู้เข้าร่วม
                  </span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {challenge.participants} คน
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    จบแล้ว
                  </span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {challenge.completions} คน
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    อัตราความสำเร็จ
                  </span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {completionRate}%
                  </span>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
                    <Flame className="w-5 h-5 text-orange-500" />
                    <span className="font-medium">ระยะเวลาโดยประมาณ</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatTime(estimatedTime)}
                  </p>
                </div>
              </div>
            </div>

            {/* Related Challenges */}
            {relatedChallenges.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  ความท้าทายที่เกี่ยวข้อง
                </h3>

                <div className="space-y-3">
                  {relatedChallenges.map((related) => (
                    <Link
                      key={related.id}
                      href={`/challenges/${related.id}`}
                      className="block p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors group"
                    >
                      <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-1">
                        {related.title}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Award className="w-4 h-4" />
                        <span>{related.points} คะแนน</span>
                      </div>
                    </Link>
                  ))}
                </div>

                <Link
                  href="/challenges"
                  className="mt-4 text-blue-600 dark:text-blue-400 hover:underline text-sm inline-flex items-center gap-1"
                >
                  ดูความท้าทายทั้งหมด
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

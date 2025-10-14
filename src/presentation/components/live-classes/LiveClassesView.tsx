"use client";

import { LiveClassesViewModel } from "@/src/presentation/presenters/live-classes/LiveClassesPresenter";
import { useLiveClassesPresenter } from "@/src/presentation/presenters/live-classes/useLiveClassesPresenter";
import { LiveClass } from "@/src/data/mock/live-classes.mock";

interface LiveClassesViewProps {
  initialViewModel?: LiveClassesViewModel;
}

export function LiveClassesView({ initialViewModel }: LiveClassesViewProps) {
  const [state, actions] = useLiveClassesPresenter(initialViewModel);
  const viewModel = state.viewModel;

  // Helper functions
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("th-TH", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getCategoryInfo = (categoryId: string) => {
    return viewModel?.categories.find((c) => c.id === categoryId);
  };

  const getStatusInfo = (statusId: string) => {
    return viewModel?.statuses.find((s) => s.id === statusId);
  };

  // Show loading only on initial load
  if (state.loading && !viewModel) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">
                กำลังโหลดข้อมูลคลาสสด...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state if there's an error but we have no data
  if (state.error && !viewModel) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <p className="text-red-600 dark:text-red-400 font-medium mb-2">
                เกิดข้อผิดพลาด
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {state.error}
              </p>
              <button
                onClick={() => actions.loadData()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                ลองใหม่อีกครั้ง
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If we have no view model and not loading, show empty state
  if (!viewModel) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="text-gray-400 text-6xl mb-4">📺</div>
              <p className="text-gray-600 dark:text-gray-400 font-medium mb-2">
                ยังไม่มีข้อมูลคลาสสด
              </p>
              <p className="text-gray-500 dark:text-gray-500 mb-4">
                ข้อมูลคลาสสดจะแสดงที่นี่เมื่อมีการสร้างคลาส
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Filter classes based on search query
  const filteredClasses = state.searchQuery
    ? viewModel.liveClasses.filter(
        (liveClass) =>
          liveClass.title
            .toLowerCase()
            .includes(state.searchQuery.toLowerCase()) ||
          liveClass.description
            .toLowerCase()
            .includes(state.searchQuery.toLowerCase()) ||
          liveClass.instructorName
            .toLowerCase()
            .includes(state.searchQuery.toLowerCase()) ||
          liveClass.tags.some((tag) =>
            tag.toLowerCase().includes(state.searchQuery.toLowerCase())
          )
      )
    : viewModel.liveClasses;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">📺 คลาสสดออนไลน์</h1>
          <p className="text-xl text-red-100">
            เรียนแบบสดๆ กับครูมืออาชีพ มีคลาสหลากหลายหมวดหมู่ให้เลือกเรียน
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                <span className="text-2xl">📚</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  คลาสทั้งหมด
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {viewModel.stats.totalClasses}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100 dark:bg-red-900">
                <span className="text-2xl">🔴</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  กำลังสด
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {viewModel.stats.liveNow}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
                <span className="text-2xl">⏰</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  กำลังจะมาถึง
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {viewModel.stats.upcoming}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
                <span className="text-2xl">👥</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  ผู้เข้าร่วม
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {viewModel.stats.totalParticipants}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Live Now Section */}
        {viewModel.liveNowClasses.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🔴</span>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                กำลังสดตอนนี้
              </h2>
              <span className="animate-pulse bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                LIVE
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {viewModel.liveNowClasses.map((liveClass) => (
                <LiveClassCard
                  key={liveClass.id}
                  liveClass={liveClass}
                  getCategoryInfo={getCategoryInfo}
                  getStatusInfo={getStatusInfo}
                  formatDate={formatDate}
                  formatTime={formatTime}
                  onJoin={() => actions.openJoinModal(liveClass.id)}
                  onRegister={() => actions.openRegisterModal(liveClass.id)}
                  onWatchRecording={() => actions.watchRecording(liveClass.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="ค้นหาคลาสสด..."
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
              value={state.searchQuery}
              onChange={(e) => actions.setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            หมวดหมู่
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => actions.setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                state.selectedCategory === null
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              ทั้งหมด
            </button>
            {viewModel.categories.map((category) => (
              <button
                key={category.id}
                onClick={() => actions.setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  state.selectedCategory === category.id
                    ? `${category.bgColor} ${category.color}`
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {category.icon} {category.nameTh}
              </button>
            ))}
          </div>
        </div>

        {/* Status Filter */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            สถานะ
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => actions.setSelectedStatus(null)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                state.selectedStatus === null
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              ทั้งหมด
            </button>
            {viewModel.statuses.map((status) => (
              <button
                key={status.id}
                onClick={() =>
                  actions.setSelectedStatus(
                    status.id as "upcoming" | "live" | "ended"
                  )
                }
                className={`px-4 py-2 rounded-lg transition-colors ${
                  state.selectedStatus === status.id
                    ? `${status.bgColor} ${status.color}`
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {status.icon} {status.nameTh}
              </button>
            ))}
          </div>
        </div>

        {/* All Classes */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {state.selectedCategory
              ? `${getCategoryInfo(state.selectedCategory)?.icon} ${getCategoryInfo(state.selectedCategory)?.nameTh}`
              : state.selectedStatus
                ? `${getStatusInfo(state.selectedStatus)?.icon} ${getStatusInfo(state.selectedStatus)?.nameTh}`
                : "📚 คลาสทั้งหมด"}
          </h2>

          {filteredClasses.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-12 text-center">
              <div className="text-gray-400 text-6xl mb-4">📭</div>
              <p className="text-gray-600 dark:text-gray-400 font-medium mb-2">
                ไม่พบคลาสสด
              </p>
              <p className="text-gray-500 dark:text-gray-500">
                {state.searchQuery
                  ? "ลองค้นหาด้วยคำอื่น"
                  : "ยังไม่มีคลาสสดในหมวดหมู่นี้"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClasses.map((liveClass) => (
                <LiveClassCard
                  key={liveClass.id}
                  liveClass={liveClass}
                  getCategoryInfo={getCategoryInfo}
                  getStatusInfo={getStatusInfo}
                  formatDate={formatDate}
                  formatTime={formatTime}
                  onJoin={() => actions.openJoinModal(liveClass.id)}
                  onRegister={() => actions.openRegisterModal(liveClass.id)}
                  onWatchRecording={() => actions.watchRecording(liveClass.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Error Toast */}
      {state.error && viewModel && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          <div className="flex items-center">
            <span className="mr-2">⚠️</span>
            <span>{state.error}</span>
            <button
              onClick={() => actions.setError(null)}
              className="ml-4 text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Live Class Card Component
interface LiveClassCardProps {
  liveClass: LiveClass;
  getCategoryInfo: (categoryId: string) => any;
  getStatusInfo: (statusId: string) => any;
  formatDate: (dateString: string) => string;
  formatTime: (dateString: string) => string;
  onJoin: () => void;
  onRegister: () => void;
  onWatchRecording: () => void;
}

function LiveClassCard({
  liveClass,
  getCategoryInfo,
  getStatusInfo,
  formatDate,
  formatTime,
  onJoin,
  onRegister,
  onWatchRecording,
}: LiveClassCardProps) {
  const category = getCategoryInfo(liveClass.category);
  const status = getStatusInfo(liveClass.status);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden">
      {/* Thumbnail */}
      <div className="relative h-48 bg-gradient-to-br from-blue-400 to-purple-500">
        <div className="absolute inset-0 flex items-center justify-center text-white text-6xl">
          {category?.icon || "📺"}
        </div>
        {/* Status Badge */}
        {status && (
          <div
            className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${status.bgColor} ${status.color} flex items-center gap-1`}
          >
            <span>{status.icon}</span>
            <span>{status.nameTh}</span>
          </div>
        )}
        {/* Free Badge */}
        {liveClass.isFree && (
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600">
            ฟรี
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category */}
        {category && (
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${category.bgColor} ${category.color} mb-3`}
          >
            {category.icon} {category.nameTh}
          </span>
        )}

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
          {liveClass.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {liveClass.description}
        </p>

        {/* Instructor */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
            {liveClass.instructorName.charAt(0)}
          </div>
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {liveClass.instructorName}
          </span>
        </div>

        {/* Schedule */}
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
          <span>🕐</span>
          <span>{formatTime(liveClass.scheduledAt)}</span>
          <span>•</span>
          <span>{liveClass.duration} นาที</span>
        </div>

        {/* Participants */}
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
          <span>👥</span>
          <span>
            {liveClass.participants}/{liveClass.maxParticipants} คน
          </span>
        </div>

        {/* Price */}
        <div className="mb-4">
          {liveClass.isFree ? (
            <span className="text-lg font-bold text-green-600">ฟรี</span>
          ) : (
            <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
              ฿{liveClass.price}
            </span>
          )}
        </div>

        {/* Action Button */}
        {liveClass.status === "live" && (
          <button
            onClick={onJoin}
            className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <span className="animate-pulse">🔴</span>
            <span>เข้าร่วมเลย</span>
          </button>
        )}

        {liveClass.status === "upcoming" && (
          <button
            onClick={onRegister}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            ลงทะเบียน
          </button>
        )}

        {liveClass.status === "ended" && liveClass.recordingUrl && (
          <button
            onClick={onWatchRecording}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            ดูย้อนหลัง
          </button>
        )}
      </div>
    </div>
  );
}

"use client";

import { CommunityViewModel } from "@/src/presentation/presenters/community/CommunityPresenter";
import { useCommunityPresenter } from "@/src/presentation/presenters/community/useCommunityPresenter";
import { useState } from "react";
import { Post } from "@/src/data/mock/posts.mock";

interface CommunityViewProps {
  initialViewModel?: CommunityViewModel;
}

export function CommunityView({ initialViewModel }: CommunityViewProps) {
  const [state, actions] = useCommunityPresenter(initialViewModel);
  const viewModel = state.viewModel;

  // Helper functions
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return `${diffInMinutes} นาทีที่แล้ว`;
    } else if (diffInHours < 24) {
      return `${diffInHours} ชั่วโมงที่แล้ว`;
    } else if (diffInDays < 7) {
      return `${diffInDays} วันที่แล้ว`;
    } else {
      return new Intl.DateTimeFormat("th-TH", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(date);
    }
  };

  const getCategoryInfo = (categoryId: string) => {
    return viewModel?.categories.find((c) => c.id === categoryId);
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
                กำลังโหลดข้อมูลชุมชน...
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
              <div className="text-gray-400 text-6xl mb-4">💬</div>
              <p className="text-gray-600 dark:text-gray-400 font-medium mb-2">
                ยังไม่มีข้อมูลชุมชน
              </p>
              <p className="text-gray-500 dark:text-gray-500 mb-4">
                ข้อมูลชุมชนจะแสดงที่นี่เมื่อมีการสร้างโพสต์
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Filter posts based on search query
  const filteredPosts = state.searchQuery
    ? viewModel.posts.filter(
        (post) =>
          post.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          post.content.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          post.tags.some((tag) =>
            tag.toLowerCase().includes(state.searchQuery.toLowerCase())
          )
      )
    : viewModel.posts;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">💬 ชุมชนนักเรียน</h1>
          <p className="text-xl text-blue-100">
            พื้นที่สำหรับแชร์ความรู้ ถามคำถาม และแลกเปลี่ยนประสบการณ์
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                <span className="text-2xl">📝</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  โพสต์ทั้งหมด
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {viewModel.stats.totalPosts}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
                <span className="text-2xl">💬</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  คอมเมนต์
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {viewModel.stats.totalComments}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-pink-100 dark:bg-pink-900">
                <span className="text-2xl">👥</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  สมาชิก
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {viewModel.stats.totalMembers}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
                <span className="text-2xl">🟢</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  ออนไลน์วันนี้
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {viewModel.stats.activeToday}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Actions Bar */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  placeholder="ค้นหาโพสต์..."
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                  value={state.searchQuery}
                  onChange={(e) => actions.setSearchQuery(e.target.value)}
                />
                <button
                  onClick={actions.openCreatePostModal}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors font-medium whitespace-nowrap"
                >
                  ✏️ สร้างโพสต์
                </button>
              </div>
            </div>

            {/* Category Filter */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
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

            {/* Pinned Posts */}
            {viewModel.pinnedPosts.length > 0 && !state.selectedCategory && (
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  📌 โพสต์ปักหมุด
                </h2>
                <div className="space-y-4">
                  {viewModel.pinnedPosts.map((post) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      getCategoryInfo={getCategoryInfo}
                      formatDate={formatDate}
                      onLike={() => actions.likePost(post.id)}
                      onClick={() => actions.openPostDetailModal(post.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Posts List */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                {state.selectedCategory
                  ? `${getCategoryInfo(state.selectedCategory)?.icon} ${getCategoryInfo(state.selectedCategory)?.nameTh}`
                  : "📝 โพสต์ล่าสุด"}
              </h2>

              {filteredPosts.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-12 text-center">
                  <div className="text-gray-400 text-6xl mb-4">📭</div>
                  <p className="text-gray-600 dark:text-gray-400 font-medium mb-2">
                    ไม่พบโพสต์
                  </p>
                  <p className="text-gray-500 dark:text-gray-500">
                    {state.searchQuery
                      ? "ลองค้นหาด้วยคำอื่น"
                      : "ยังไม่มีโพสต์ในหมวดหมู่นี้"}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredPosts.map((post) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      getCategoryInfo={getCategoryInfo}
                      formatDate={formatDate}
                      onLike={() => actions.likePost(post.id)}
                      onClick={() => actions.openPostDetailModal(post.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Popular Posts */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                🔥 โพสต์ยอดนิยม
              </h3>
              <div className="space-y-4">
                {viewModel.popularPosts.map((post, index) => (
                  <div
                    key={post.id}
                    className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-3 rounded-lg transition-colors"
                    onClick={() => actions.openPostDetailModal(post.id)}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl font-bold text-gray-400">
                        {index + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-2">
                          {post.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 dark:text-gray-400">
                          <span>❤️ {post.likes}</span>
                          <span>💬 {post.comments}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Guidelines */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                📜 กฎของชุมชน
              </h3>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>ใช้ภาษาสุภาพและเคารพผู้อื่น</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>แชร์ความรู้และช่วยเหลือเพื่อนๆ</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>โพสต์เนื้อหาที่เหมาะสม</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  <span>ห้ามใช้คำหยาบคายหรือรังแก</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  <span>ห้ามโพสต์สแปมหรือโฆษณา</span>
                </li>
              </ul>
            </div>
          </div>
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

// Post Card Component
interface PostCardProps {
  post: Post;
  getCategoryInfo: (categoryId: string) => any;
  formatDate: (dateString: string) => string;
  onLike: () => void;
  onClick: () => void;
}

function PostCard({
  post,
  getCategoryInfo,
  formatDate,
  onLike,
  onClick,
}: PostCardProps) {
  const category = getCategoryInfo(post.category);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow">
      {/* Post Header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
              {post.authorName.charAt(0)}
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {post.authorName}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {formatDate(post.createdAt)}
              </p>
            </div>
          </div>
          {category && (
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${category.bgColor} ${category.color}`}
            >
              {category.icon} {category.nameTh}
            </span>
          )}
        </div>

        {/* Post Content */}
        <div className="cursor-pointer" onClick={onClick}>
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {post.isPinned && "📌 "}
            {post.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
            {post.content}
          </p>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Post Actions */}
        <div className="flex items-center gap-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onLike();
            }}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
          >
            <span>❤️</span>
            <span className="text-sm font-medium">{post.likes}</span>
          </button>
          <button
            onClick={onClick}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            <span>💬</span>
            <span className="text-sm font-medium">{post.comments}</span>
          </button>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <span>👁️</span>
            <span className="text-sm font-medium">{post.views}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

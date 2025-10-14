"use client";

import type { InstructorReviewsViewModel } from "@/src/presentation/presenters/instructor-reviews/InstructorReviewsPresenter";
import { useInstructorReviewsPresenter } from "@/src/presentation/presenters/instructor-reviews/useInstructorReviewsPresenter";
import {
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff,
  MessageSquare,
  RefreshCw,
  Search,
  Star,
  ThumbsUp,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

interface InstructorReviewsViewProps {
  initialViewModel?: InstructorReviewsViewModel;
}

export function InstructorReviewsView({
  initialViewModel,
}: InstructorReviewsViewProps) {
  const [state, actions] = useInstructorReviewsPresenter(initialViewModel);
  const { viewModel, loading, error, searchQuery } = state;
  const [replyText, setReplyText] = useState("");
  const [reportReason, setReportReason] = useState("");

  // Filter reviews by search query
  const filteredReviews = useMemo(() => {
    if (!viewModel?.reviews) return [];
    if (!searchQuery.trim()) return viewModel.reviews;

    const query = searchQuery.toLowerCase();
    return viewModel.reviews.filter(
      (review) =>
        review.studentName.toLowerCase().includes(query) ||
        review.courseTitle.toLowerCase().includes(query) ||
        review.comment.toLowerCase().includes(query)
    );
  }, [viewModel?.reviews, searchQuery]);

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

  // Render stars
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300 dark:text-gray-600"
            }`}
          />
        ))}
      </div>
    );
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
                กำลังโหลดรีวิว...
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
                ⭐ รีวิวจากนักเรียน
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                ดูและจัดการรีวิวจากนักเรียนที่ลงเรียนในคอร์สของคุณ
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
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

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  รีวิวทั้งหมด
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.totalReviews}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  เผยแพร่แล้ว
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.publishedReviews}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <MessageSquare className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  ตอบกลับแล้ว
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.repliedReviews}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            การกระจายคะแนน
          </h3>
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution];
              const percentage =
                stats.totalReviews > 0
                  ? (count / stats.totalReviews) * 100
                  : 0;

              return (
                <div key={rating} className="flex items-center gap-4">
                  <div className="flex items-center gap-1 w-20">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {rating}
                    </span>
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </div>
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div
                        className="bg-yellow-400 h-3 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 w-16 text-right">
                    {count} รีวิว
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Status Filters */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => actions.filterByStatus("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  state.selectedStatus === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                ทั้งหมด ({stats.totalReviews})
              </button>
              <button
                onClick={() => actions.filterByStatus("published")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  state.selectedStatus === "published"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                เผยแพร่แล้ว ({stats.publishedReviews})
              </button>
              <button
                onClick={() => actions.filterByStatus("pending")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  state.selectedStatus === "pending"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                รอดำเนินการ ({stats.pendingReviews})
              </button>
            </div>

            {/* Rating Filters */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => actions.filterByRating(null)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  state.selectedRating === null
                    ? "bg-yellow-400 text-gray-900"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                ทุกคะแนน
              </button>
              {[5, 4, 3, 2, 1].map((rating) => (
                <button
                  key={rating}
                  onClick={() => actions.filterByRating(rating)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                    state.selectedRating === rating
                      ? "bg-yellow-400 text-gray-900"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {rating}
                  <Star className="w-3 h-3" />
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="ค้นหารีวิว..."
                  value={searchQuery}
                  onChange={(e) => actions.setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        {filteredReviews.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">⭐</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {searchQuery ? "ไม่พบรีวิว" : "ยังไม่มีรีวิว"}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchQuery
                ? "ลองค้นหาด้วยคำอื่น"
                : "รีวิวจากนักเรียนจะแสดงที่นี่"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                {/* Review Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    {/* Student Avatar */}
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                      {review.studentName.charAt(0)}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {review.studentName}
                        </h3>
                        {review.isPublished ? (
                          <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-medium rounded-full">
                            เผยแพร่แล้ว
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 text-xs font-medium rounded-full">
                            รอดำเนินการ
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {review.courseTitle}
                      </p>
                      <div className="flex items-center gap-3">
                        {renderStars(review.rating)}
                        <span className="text-sm text-gray-500 dark:text-gray-500">
                          {formatDate(review.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {review.isPublished ? (
                      <button
                        onClick={() => actions.unpublishReview(review.id)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        title="ยกเลิกเผยแพร่"
                      >
                        <EyeOff className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      </button>
                    ) : (
                      <button
                        onClick={() => actions.publishReview(review.id)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        title="เผยแพร่"
                      >
                        <Eye className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      </button>
                    )}
                    <button
                      onClick={() => actions.openReportModal(review.id)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      title="รายงาน"
                    >
                      <AlertTriangle className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Review Comment */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-4">
                  <p className="text-gray-900 dark:text-white leading-relaxed">
                    {review.comment}
                  </p>
                  <div className="flex items-center gap-2 mt-3 text-sm text-gray-600 dark:text-gray-400">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{review.helpful} คนเห็นว่ามีประโยชน์</span>
                  </div>
                </div>

                {/* Instructor Reply */}
                {review.instructorReply ? (
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                        คำตอบจากผู้สอน
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-500">
                        {formatDate(review.instructorReply.repliedAt)}
                      </span>
                    </div>
                    <p className="text-gray-900 dark:text-white">
                      {review.instructorReply.message}
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={() => actions.openReplyModal(review.id)}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    ตอบกลับรีวิว
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Reply Modal */}
        {state.isReplyModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  ตอบกลับรีวิว
                </h3>
                <button
                  onClick={actions.closeReplyModal}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="พิมพ์คำตอบของคุณ..."
                rows={4}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white mb-4"
              />
              <div className="flex gap-3">
                <button
                  onClick={actions.closeReplyModal}
                  className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  ยกเลิก
                </button>
                <button
                  onClick={() => {
                    if (state.selectedReviewId && replyText.trim()) {
                      actions.replyToReview(state.selectedReviewId, replyText);
                      setReplyText("");
                    }
                  }}
                  disabled={!replyText.trim()}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ส่งคำตอบ
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Report Modal */}
        {state.isReportModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  รายงานรีวิว
                </h3>
                <button
                  onClick={actions.closeReportModal}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <textarea
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                placeholder="ระบุเหตุผลในการรายงาน..."
                rows={4}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white mb-4"
              />
              <div className="flex gap-3">
                <button
                  onClick={actions.closeReportModal}
                  className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  ยกเลิก
                </button>
                <button
                  onClick={() => {
                    if (state.selectedReviewId && reportReason.trim()) {
                      actions.reportReview(
                        state.selectedReviewId,
                        reportReason
                      );
                      setReportReason("");
                    }
                  }}
                  disabled={!reportReason.trim()}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  รายงาน
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

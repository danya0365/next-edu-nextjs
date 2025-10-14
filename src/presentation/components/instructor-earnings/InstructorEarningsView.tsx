"use client";

import type { InstructorEarningsViewModel } from "@/src/presentation/presenters/instructor-earnings/InstructorEarningsPresenter";
import { useInstructorEarningsPresenter } from "@/src/presentation/presenters/instructor-earnings/useInstructorEarningsPresenter";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Award,
  CreditCard,
  DollarSign,
  RefreshCw,
  TrendingDown,
  TrendingUp,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

interface InstructorEarningsViewProps {
  initialViewModel?: InstructorEarningsViewModel;
}

export function InstructorEarningsView({
  initialViewModel,
}: InstructorEarningsViewProps) {
  const [state, actions] = useInstructorEarningsPresenter(initialViewModel);
  const { viewModel, loading, error } = state;
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [bankAccount, setBankAccount] = useState("");

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

  // Get transaction type badge
  const getTransactionTypeBadge = (type: string) => {
    const badges = {
      sale: {
        className:
          "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
        label: "ขายคอร์ส",
        icon: <ArrowUpRight className="w-3 h-3" />,
      },
      refund: {
        className:
          "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
        label: "คืนเงิน",
        icon: <ArrowDownLeft className="w-3 h-3" />,
      },
      withdrawal: {
        className:
          "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
        label: "ถอนเงิน",
        icon: <Wallet className="w-3 h-3" />,
      },
      bonus: {
        className:
          "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
        label: "โบนัส",
        icon: <Award className="w-3 h-3" />,
      },
    };
    return (
      badges[type as keyof typeof badges] || {
        className: "bg-gray-100 dark:bg-gray-800 text-gray-600",
        label: type,
        icon: null,
      }
    );
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    const badges = {
      completed:
        "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
      pending:
        "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400",
      processing:
        "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
      failed: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
    };
    const labels = {
      completed: "สำเร็จ",
      pending: "รอดำเนินการ",
      processing: "กำลังดำเนินการ",
      failed: "ล้มเหลว",
    };
    return {
      className: badges[status as keyof typeof badges] || badges.pending,
      label: labels[status as keyof typeof labels] || status,
    };
  };

  // Filter monthly earnings by period
  const filteredMonthlyEarnings = useMemo(() => {
    if (!viewModel?.monthlyEarnings) return [];

    const data = viewModel.monthlyEarnings;

    switch (state.selectedPeriod) {
      case "month":
        return data.slice(0, 1);
      case "quarter":
        return data.slice(0, 3);
      case "year":
        return data.slice(0, 12);
      default:
        return data;
    }
  }, [viewModel?.monthlyEarnings, state.selectedPeriod]);

  // Loading state
  if (loading && !viewModel) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">
                กำลังโหลดข้อมูลรายได้...
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

  const { summary } = viewModel;
  const earningsGrowth =
    summary.lastMonthEarnings > 0
      ? ((summary.thisMonthEarnings - summary.lastMonthEarnings) /
          summary.lastMonthEarnings) *
        100
      : 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                💰 รายได้และสถิติ
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                ดูรายได้และสถิติทางการเงินจากการสอนคอร์ส
              </p>
            </div>
            <button
              onClick={actions.openWithdrawalModal}
              disabled={summary.availableBalance <= 0}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Wallet className="w-5 h-5" />
              ถอนเงิน
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  ยอดคงเหลือ
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(summary.availableBalance)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  รายได้เดือนนี้
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(summary.thisMonthEarnings)}
                </p>
                {earningsGrowth !== 0 && (
                  <p
                    className={`text-xs flex items-center gap-1 ${
                      earningsGrowth > 0
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {earningsGrowth > 0 ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {Math.abs(earningsGrowth).toFixed(1)}%
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  นักเรียนทั้งหมด
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {summary.totalStudents}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <CreditCard className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  ค่าเฉลี่ยต่อออเดอร์
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(summary.averageOrderValue)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Earnings Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              รายได้รายเดือน
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => actions.setPeriod("month")}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  state.selectedPeriod === "month"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                1 เดือน
              </button>
              <button
                onClick={() => actions.setPeriod("quarter")}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  state.selectedPeriod === "quarter"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                3 เดือน
              </button>
              <button
                onClick={() => actions.setPeriod("year")}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  state.selectedPeriod === "year"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                1 ปี
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredMonthlyEarnings.map((month) => {
              const maxEarnings = Math.max(
                ...filteredMonthlyEarnings.map((m) => m.earnings)
              );
              const percentage = (month.earnings / maxEarnings) * 100;

              return (
                <div key={`${month.month}-${month.year}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {month.month} {month.year}
                    </span>
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                      {formatCurrency(month.earnings)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between mt-1 text-xs text-gray-600 dark:text-gray-400">
                    <span>{month.sales} ยอดขาย</span>
                    <span>{month.refunds} คืนเงิน</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Course Earnings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
            รายได้แยกตามคอร์ส
          </h3>
          <div className="space-y-4">
            {viewModel.courseEarnings.map((course) => (
              <div
                key={course.courseId}
                className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {course.courseTitle}
                  </h4>
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {formatCurrency(course.totalEarnings)}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">
                      ยอดขาย
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {course.totalSales}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">
                      นักเรียน
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {course.studentCount}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">
                      คะแนนเฉลี่ย
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {course.averageRating.toFixed(1)} ⭐
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transactions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              ประวัติการทำรายการ
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => actions.filterByType("all")}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  state.selectedType === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                ทั้งหมด
              </button>
              <button
                onClick={() => actions.filterByType("sale")}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  state.selectedType === "sale"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                ขาย
              </button>
              <button
                onClick={() => actions.filterByType("withdrawal")}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  state.selectedType === "withdrawal"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                ถอนเงิน
              </button>
            </div>
          </div>

          {viewModel.transactions.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">💰</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                ยังไม่มีรายการ
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                ประวัติการทำรายการจะแสดงที่นี่
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {viewModel.transactions.map((transaction) => {
                const typeBadge = getTransactionTypeBadge(transaction.type);
                const statusBadge = getStatusBadge(transaction.status);

                return (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-2 rounded-lg ${typeBadge.className}`}
                      >
                        {typeBadge.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {transaction.description}
                          </p>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusBadge.className}`}
                          >
                            {statusBadge.label}
                          </span>
                        </div>
                        {transaction.courseTitle && (
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {transaction.courseTitle}
                          </p>
                        )}
                        {transaction.studentName && (
                          <p className="text-xs text-gray-500 dark:text-gray-500">
                            {transaction.studentName}
                          </p>
                        )}
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          {formatDate(transaction.date)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-lg font-bold ${
                          transaction.netAmount >= 0
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {transaction.netAmount >= 0 ? "+" : ""}
                        {formatCurrency(transaction.netAmount)}
                      </p>
                      {transaction.platformFee > 0 && (
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          ค่าธรรมเนียม: {formatCurrency(transaction.platformFee)}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Withdrawal Modal */}
        {state.isWithdrawalModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  ถอนเงิน
                </h3>
                <button
                  onClick={actions.closeWithdrawalModal}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  ยอดคงเหลือ
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(summary.availableBalance)}
                </p>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  จำนวนเงินที่ต้องการถอน
                </label>
                <input
                  type="number"
                  value={withdrawalAmount}
                  onChange={(e) => setWithdrawalAmount(e.target.value)}
                  placeholder="0.00"
                  max={summary.availableBalance}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  เลขที่บัญชีธนาคาร
                </label>
                <input
                  type="text"
                  value={bankAccount}
                  onChange={(e) => setBankAccount(e.target.value)}
                  placeholder="xxx-x-xxxxx-x"
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={actions.closeWithdrawalModal}
                  className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  ยกเลิก
                </button>
                <button
                  onClick={() => {
                    const amount = parseFloat(withdrawalAmount);
                    if (
                      amount > 0 &&
                      amount <= summary.availableBalance &&
                      bankAccount.trim()
                    ) {
                      actions.requestWithdrawal(amount, bankAccount);
                      setWithdrawalAmount("");
                      setBankAccount("");
                    }
                  }}
                  disabled={
                    !withdrawalAmount ||
                    parseFloat(withdrawalAmount) <= 0 ||
                    parseFloat(withdrawalAmount) > summary.availableBalance ||
                    !bankAccount.trim()
                  }
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ยืนยันการถอนเงิน
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

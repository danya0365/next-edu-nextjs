'use client';

import { useFaqPresenter } from '@/src/presentation/presenters/faq/useFaqPresenter';
import type { FaqViewModel } from '@/src/presentation/presenters/faq/FaqPresenter';
import { Search, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FaqViewProps {
  initialViewModel?: FaqViewModel;
}

export function FaqView({ initialViewModel }: FaqViewProps) {
  const {
    viewModel,
    loading,
    error,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    expandedFaqs,
    toggleFaq,
    filteredFaqs,
  } = useFaqPresenter(initialViewModel);

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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">เกิดข้อผิดพลาด</h1>
          <p className="text-gray-600 dark:text-gray-400">{error || 'ไม่พบข้อมูล'}</p>
        </div>
      </div>
    );
  }

  const { categories } = viewModel;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <HelpCircle className="w-12 h-12" />
            <h1 className="text-4xl md:text-5xl font-bold">คำถามที่พบบ่อย</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            ค้นหาคำตอบสำหรับคำถามที่พบบ่อย
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="ค้นหาคำถาม..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-full text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-white/50 outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            ทั้งหมด ({viewModel.faqs.length})
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
              <span className="text-xs opacity-75">
                ({viewModel.faqs.filter((f) => f.categoryId === category.id).length})
              </span>
            </button>
          ))}
        </div>

        {/* FAQ List */}
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              ไม่พบคำถามที่ตรงกับการค้นหา
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              ลองเปลี่ยนคำค้นหาหรือหมวดหมู่ดู หรือ{' '}
              <a href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">
                ติดต่อเรา
              </a>{' '}
              ได้เลย
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFaqs.map((faq) => {
              const isExpanded = expandedFaqs.has(faq.id);
              const category = categories.find((c) => c.id === faq.categoryId);

              return (
                <div
                  key={faq.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-6 py-4 text-left flex items-start justify-between gap-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {category && <span className="text-lg">{category.icon}</span>}
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {category?.name}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {faq.question}
                      </h3>
                    </div>
                    <div className="flex-shrink-0">
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-6 pb-4">
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Still have questions CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">ยังหาคำตอบที่ต้องการไม่เจอ?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            ทีมงานของเราพร้อมช่วยเหลือคุณตลอด 24 ชั่วโมง
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            ติดต่อเรา
          </a>
        </div>
      </div>
    </div>
  );
}

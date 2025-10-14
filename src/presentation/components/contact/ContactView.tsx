'use client';

import { useContactPresenter } from '@/src/presentation/presenters/contact/useContactPresenter';
import type { ContactViewModel } from '@/src/presentation/presenters/contact/ContactPresenter';
import { MapPin, Clock, Send, CheckCircle } from 'lucide-react';

interface ContactViewProps {
  initialViewModel?: ContactViewModel;
}

export function ContactView({ initialViewModel }: ContactViewProps) {
  const {
    viewModel,
    loading,
    error,
    formData,
    submitting,
    submitted,
    handleInputChange,
    handleSubmit,
  } = useContactPresenter(initialViewModel);

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

  const { contactInfo, socialLinks, officeHours, address } = viewModel;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">ติดต่อเรา</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            มีคำถามหรือข้อสงสัย? ติดต่อเราได้ตลอด 24 ชั่วโมง
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                ส่งข้อความถึงเรา
              </h2>

              {submitted && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <p className="text-green-700 dark:text-green-400">
                    ขอบคุณที่ติดต่อเรา! เราจะตอบกลับภายใน 24 ชั่วโมง
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      ชื่อ-นามสกุล *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-colors"
                      placeholder="กรอกชื่อของคุณ"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      อีเมล *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    หัวข้อ *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-colors"
                  >
                    <option value="">เลือกหัวข้อ</option>
                    <option value="general">สอบถามทั่วไป</option>
                    <option value="course">เกี่ยวกับคอร์สเรียน</option>
                    <option value="technical">ปัญหาทางเทคนิค</option>
                    <option value="payment">การชำระเงิน</option>
                    <option value="cooperation">ความร่วมมือ</option>
                    <option value="other">อื่นๆ</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    ข้อความ *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-colors resize-none"
                    placeholder="เขียนข้อความของคุณที่นี่..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      กำลังส่ง...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      ส่งข้อความ
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            {/* Contact Methods */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                ช่องทางติดต่อ
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index}>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                      >
                        <span className="text-2xl">{info.icon}</span>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{info.label}</p>
                          <p className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                            {info.value}
                          </p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-start gap-3 p-3">
                        <span className="text-2xl">{info.icon}</span>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{info.label}</p>
                          <p className="font-medium text-gray-900 dark:text-white">{info.value}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">เวลาทำการ</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">{officeHours}</p>
            </div>

            {/* Address */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">ที่อยู่</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">{address}</p>
            </div>

            {/* Social Links */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                ติดตามเรา
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group"
                  >
                    <span className="text-xl">{social.icon}</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {social.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

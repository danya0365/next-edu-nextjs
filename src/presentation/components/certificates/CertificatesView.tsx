"use client";

import { useCertificatesPresenter } from "@/src/presentation/presenters/certificates/useCertificatesPresenter";
import type { CertificatesViewModel } from "@/src/presentation/presenters/certificates/CertificatesPresenter";
import { Award, Download, Share2, Search, X, Calendar } from "lucide-react";

interface CertificatesViewProps {
  initialViewModel?: CertificatesViewModel;
}

export function CertificatesView({ initialViewModel }: CertificatesViewProps) {
  const {
    viewModel,
    loading,
    error,
    selectedCertificate,
    setSelectedCertificate,
    searchQuery,
    setSearchQuery,
    filteredCertificates,
    downloadCertificate,
    shareCertificate,
  } = useCertificatesPresenter(initialViewModel);

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

  const { totalCertificates } = viewModel;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Award className="w-8 h-8 text-yellow-500" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              ใบประกาศนียบัตร
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            ดาวน์โหลดและแชร์ใบประกาศนียบัตรของคุณ (ทั้งหมด {totalCertificates}{" "}
            ใบ)
          </p>
        </div>

        {/* Search */}
        {totalCertificates > 0 && (
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="ค้นหาใบประกาศนียบัตร..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Certificates Grid */}
        {filteredCertificates.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {searchQuery
                ? "ไม่พบใบประกาศนียบัตรที่ค้นหา"
                : "ยังไม่มีใบประกาศนียบัตร"}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchQuery
                ? "ลองค้นหาด้วยคำอื่น"
                : "เรียนจบคอร์สเพื่อรับใบประกาศนียบัตร"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCertificates.map((cert) => (
              <div
                key={cert.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all overflow-hidden"
              >
                {/* Certificate Preview */}
                <div className="relative h-48 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-6 flex flex-col items-center justify-center text-white">
                  <Award className="w-16 h-16 mb-3" />
                  <h3 className="font-bold text-center text-sm line-clamp-2">
                    {cert.courseName}
                  </h3>
                  <p className="text-xs opacity-90 mt-2">
                    {cert.certificateNumber}
                  </p>
                </div>

                {/* Details */}
                <div className="p-4">
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">
                        ออกให้วันที่{" "}
                        {new Date(cert.issuedDate).toLocaleDateString("th-TH", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      โดย {cert.instructorName}
                    </p>
                  </div>

                  {/* Skills */}
                  {cert.skillsAcquired.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                        ทักษะที่ได้รับ:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {cert.skillsAcquired.slice(0, 3).map((skill, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                        {cert.skillsAcquired.length > 3 && (
                          <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                            +{cert.skillsAcquired.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedCertificate(cert)}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      ดูรายละเอียด
                    </button>
                    <button
                      onClick={() => downloadCertificate(cert)}
                      className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      title="ดาวน์โหลด"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => shareCertificate(cert)}
                      className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      title="แชร์"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Certificate Detail Modal */}
        {selectedCertificate && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCertificate(null)}
          >
            <div
              className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative h-64 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-8 flex flex-col items-center justify-center text-white">
                <button
                  onClick={() => setSelectedCertificate(null)}
                  className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                <Award className="w-24 h-24 mb-4" />
                <h2 className="text-2xl font-bold text-center mb-2">
                  ใบประกาศนียบัตรฉบับนี้ออกให้เพื่อรับรอง
                </h2>
                <p className="text-lg">ว่าได้เรียนจบคอร์ส</p>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
                  {selectedCertificate.courseName}
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">
                      เลขที่ใบประกาศนียบัตร
                    </span>
                    <span className="font-mono font-semibold text-gray-900 dark:text-white">
                      {selectedCertificate.certificateNumber}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">
                      วันที่ออกให้
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {new Date(
                        selectedCertificate.issuedDate
                      ).toLocaleDateString("th-TH", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">
                      ผู้สอน
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {selectedCertificate.instructorName}
                    </span>
                  </div>
                </div>

                {/* Skills */}
                {selectedCertificate.skillsAcquired.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                      ทักษะที่ได้รับจากคอร์สนี้:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCertificate.skillsAcquired.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => downloadCertificate(selectedCertificate)}
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    ดาวน์โหลด
                  </button>
                  <button
                    onClick={() => shareCertificate(selectedCertificate)}
                    className="flex-1 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-semibold flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-5 h-5" />
                    แชร์
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

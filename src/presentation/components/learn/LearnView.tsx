'use client';

import { LearnViewModel } from '@/src/presentation/presenters/learn/LearnPresenter';
import { useLearnPresenter } from '@/src/presentation/presenters/learn/useLearnPresenter';
import Link from 'next/link';
import { useState } from 'react';
import {
  Play,
  Pause,
  Volume2,
  Settings,
  Maximize,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Circle,
  BookOpen,
  FileText,
  MessageCircle,
  Download,
  Clock,
} from 'lucide-react';

interface LearnViewProps {
  initialViewModel?: LearnViewModel;
  courseId: string;
  lessonId?: string;
}

export function LearnView({ initialViewModel, courseId, lessonId }: LearnViewProps) {
  const {
    viewModel,
    loading,
    error,
    isPlaying,
    togglePlay,
    markComplete,
    goToNextLesson,
    goToPreviousLesson,
  } = useLearnPresenter(initialViewModel, courseId, lessonId);

  const [activeTab, setActiveTab] = useState<'overview' | 'notes' | 'qa'>('overview');
  const [showCurriculum, setShowCurriculum] = useState(true);

  if (loading && !viewModel) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  if (error || !viewModel?.course || !viewModel?.currentLesson) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-white mb-2">ไม่พบบทเรียน</h1>
          <p className="text-gray-400 mb-6">{error || 'บทเรียนนี้อาจถูกลบหรือยังไม่เปิดให้เข้าถึง'}</p>
          <Link
            href={`/courses/${courseId}`}
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
          >
            กลับไปหน้าคอร์ส
          </Link>
        </div>
      </div>
    );
  }

  const course = viewModel.course;
  const lesson = viewModel.currentLesson;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Top Bar */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-[1920px] mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href={`/courses/${course.slug}`}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="font-semibold text-sm sm:text-base line-clamp-1">
                  {course.title}
                </h1>
                <p className="text-xs text-gray-400 line-clamp-1">{lesson.title}</p>
              </div>
            </div>

            {/* Progress */}
            {course.enrollment && (
              <div className="hidden sm:flex items-center gap-3">
                <div className="text-sm text-gray-400">
                  {course.enrollment.progress}% เสร็จสิ้น
                </div>
                <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 transition-all"
                    style={{ width: `${course.enrollment.progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row">
        {/* Video Player Area */}
        <div className={`flex-1 ${showCurriculum ? 'lg:w-[70%]' : 'lg:w-full'}`}>
          {/* Video Player */}
          <div className="relative bg-black aspect-video">
            {lesson.videoUrl ? (
              <>
                {/* Video will be here - using placeholder for now */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                  <button
                    onClick={togglePlay}
                    className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all hover:scale-110"
                  >
                    {isPlaying ? (
                      <Pause className="w-10 h-10 text-white" />
                    ) : (
                      <Play className="w-10 h-10 text-white ml-1" />
                    )}
                  </button>
                </div>

                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center gap-4">
                    <button onClick={togglePlay} className="text-white hover:text-blue-400">
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                    </button>
                    <div className="flex-1 h-1 bg-gray-600 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 w-1/3" />
                    </div>
                    <button className="text-white hover:text-blue-400">
                      <Volume2 className="w-5 h-5" />
                    </button>
                    <button className="text-white hover:text-blue-400">
                      <Settings className="w-5 h-5" />
                    </button>
                    <button className="text-white hover:text-blue-400">
                      <Maximize className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">เนื้อหาบทเรียน</p>
                </div>
              </div>
            )}
          </div>

          {/* Lesson Navigation */}
          <div className="bg-gray-800 border-b border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <button
                onClick={goToPreviousLesson}
                disabled={!viewModel.previousLesson}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">บทก่อนหน้า</span>
              </button>

              <button
                onClick={markComplete}
                className="flex items-center gap-2 px-6 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                <CheckCircle className="w-5 h-5" />
                <span>ทำเครื่องหมายว่าเสร็จสิ้น</span>
              </button>

              <button
                onClick={goToNextLesson}
                disabled={!viewModel.nextLesson}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span className="hidden sm:inline">บทถัดไป</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Tabs Content */}
          <div className="bg-gray-800">
            {/* Tabs */}
            <div className="border-b border-gray-700">
              <div className="flex gap-6 px-4">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`py-4 border-b-2 transition-colors ${
                    activeTab === 'overview'
                      ? 'border-blue-500 text-white'
                      : 'border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  <BookOpen className="w-5 h-5 inline mr-2" />
                  ภาพรวม
                </button>
                <button
                  onClick={() => setActiveTab('notes')}
                  className={`py-4 border-b-2 transition-colors ${
                    activeTab === 'notes'
                      ? 'border-blue-500 text-white'
                      : 'border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  <FileText className="w-5 h-5 inline mr-2" />
                  บันทึกย่อ
                </button>
                <button
                  onClick={() => setActiveTab('qa')}
                  className={`py-4 border-b-2 transition-colors ${
                    activeTab === 'qa'
                      ? 'border-blue-500 text-white'
                      : 'border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  <MessageCircle className="w-5 h-5 inline mr-2" />
                  Q&A
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="space-y-6 max-w-4xl">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{lesson.title}</h2>
                    <p className="text-gray-400">{lesson.description}</p>
                  </div>

                  {/* Resources */}
                  {lesson.resources && lesson.resources.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold mb-4">📎 ไฟล์แนบ</h3>
                      <div className="space-y-2">
                        {lesson.resources.map((resource) => (
                          <a
                            key={resource.id}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                          >
                            <Download className="w-5 h-5 text-blue-400" />
                            <div className="flex-1">
                              <p className="font-medium">{resource.title}</p>
                              <p className="text-sm text-gray-400">
                                {(resource.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'notes' && (
                <div className="max-w-4xl">
                  <div className="bg-gray-700 rounded-lg p-6 text-center">
                    <FileText className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                    <p className="text-gray-400">ยังไม่มีบันทึกย่อ</p>
                    <button className="mt-4 px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                      เพิ่มบันทึกย่อ
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'qa' && (
                <div className="max-w-4xl">
                  <div className="bg-gray-700 rounded-lg p-6 text-center">
                    <MessageCircle className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                    <p className="text-gray-400">ยังไม่มีคำถาม</p>
                    <button className="mt-4 px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                      ถามคำถาม
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Curriculum Sidebar */}
        {showCurriculum && (
          <div className="lg:w-[30%] bg-gray-800 border-l border-gray-700 overflow-y-auto max-h-screen">
            <div className="p-4 border-b border-gray-700">
              <h3 className="font-bold text-lg">เนื้อหาในคอร์ส</h3>
              <p className="text-sm text-gray-400 mt-1">
                {course.totalLessons} บทเรียน • {Math.floor(course.totalDuration / 60)} ชั่วโมง
              </p>
            </div>

            <div className="divide-y divide-gray-700">
              {course.sections.map((section, sectionIndex) => (
                <div key={section.id}>
                  <div className="p-4 bg-gray-750">
                    <h4 className="font-semibold">
                      {sectionIndex + 1}. {section.title}
                    </h4>
                    <p className="text-xs text-gray-400 mt-1">
                      {section.lessons.length} บทเรียน
                    </p>
                  </div>

                  <div>
                    {section.lessons.map((sectionLesson) => {
                      const isCurrentLesson = sectionLesson.id === lesson.id;
                      const isCompleted = course.enrollment?.completedLessons.includes(
                        sectionLesson.id
                      );

                      return (
                        <Link
                          key={sectionLesson.id}
                          href={`/learn/${courseId}?lesson=${sectionLesson.id}`}
                          className={`block p-4 hover:bg-gray-700 transition-colors ${
                            isCurrentLesson ? 'bg-gray-700 border-l-4 border-blue-500' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-1">
                              {isCompleted ? (
                                <CheckCircle className="w-5 h-5 text-green-500" />
                              ) : (
                                <Circle className="w-5 h-5 text-gray-500" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p
                                className={`text-sm font-medium ${
                                  isCurrentLesson ? 'text-blue-400' : 'text-gray-300'
                                }`}
                              >
                                {sectionLesson.title}
                              </p>
                              <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                                <Clock className="w-3 h-3" />
                                <span>{sectionLesson.duration} นาที</span>
                                {sectionLesson.isFree && (
                                  <span className="px-2 py-0.5 bg-green-600 text-white rounded text-xs">
                                    ฟรี
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

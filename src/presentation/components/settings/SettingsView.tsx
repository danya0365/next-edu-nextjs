"use client";

import type { SettingsViewModel } from "@/src/presentation/presenters/settings/SettingsPresenter";
import { useSettingsPresenter } from "@/src/presentation/presenters/settings/useSettingsPresenter";
import {
  Bell,
  Lock,
  RotateCcw,
  Save,
  Settings,
  User,
  Video,
} from "lucide-react";

interface SettingsViewProps {
  initialViewModel?: SettingsViewModel;
}

export function SettingsView({ initialViewModel }: SettingsViewProps) {
  const {
    loading,
    error,
    settings,
    updateSetting,
    hasChanges,
    saving,
    saveSettings,
    resetToDefaults,
  } = useSettingsPresenter(initialViewModel);

  if (loading && !settings) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  if (error || !settings) {
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Settings className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              ตั้งค่า
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            จัดการการตั้งค่าบัญชีและความชอบ
          </p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* Profile Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                ข้อมูลโปรไฟล์
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ชื่อที่แสดง
                </label>
                <input
                  type="text"
                  value={settings.displayName}
                  onChange={(e) => updateSetting("displayName", e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  อีเมล
                </label>
                <input
                  type="email"
                  value={settings.email}
                  disabled
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-500 dark:text-gray-400 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  ไม่สามารถเปลี่ยนอีเมลได้
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    อายุ
                  </label>
                  <input
                    type="number"
                    value={settings.age}
                    onChange={(e) =>
                      updateSetting("age", parseInt(e.target.value))
                    }
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    ชั้นเรียน
                  </label>
                  <input
                    type="text"
                    value={settings.grade || ""}
                    onChange={(e) => updateSetting("grade", e.target.value)}
                    placeholder="เช่น ป.4"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Learning Preferences */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Video className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                การเรียน
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ความเร็ววิดีโอ
                </label>
                <select
                  value={settings.defaultPlaybackSpeed}
                  onChange={(e) =>
                    updateSetting(
                      "defaultPlaybackSpeed",
                      parseFloat(e.target.value)
                    )
                  }
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={0.5}>0.5x</option>
                  <option value={0.75}>0.75x</option>
                  <option value={1}>1x (ปกติ)</option>
                  <option value={1.25}>1.25x</option>
                  <option value={1.5}>1.5x</option>
                  <option value={2}>2x</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  คุณภาพวิดีโอ
                </label>
                <select
                  value={settings.defaultQuality}
                  onChange={(e) =>
                    updateSetting("defaultQuality", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="auto">อัตโนมัติ</option>
                  <option value="360p">360p</option>
                  <option value="480p">480p</option>
                  <option value="720p">720p (HD)</option>
                  <option value="1080p">1080p (Full HD)</option>
                </select>
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    เล่นวิดีโอถัดไปอัตโนมัติ
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    เมื่อวิดีโอจบจะเล่นวิดีโอถัดไปทันที
                  </p>
                </div>
                <button
                  onClick={() =>
                    updateSetting("autoPlayNext", !settings.autoPlayNext)
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.autoPlayNext
                      ? "bg-blue-600"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.autoPlayNext ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Bell className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                การแจ้งเตือน
              </h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  key: "emailNotifications" as const,
                  label: "อีเมลแจ้งเตือน",
                  desc: "รับข่าวสารทางอีเมล",
                },
                {
                  key: "pushNotifications" as const,
                  label: "แจ้งเตือนแบบ Push",
                  desc: "แจ้งเตือนบนเบราว์เซอร์",
                },
                {
                  key: "courseUpdates" as const,
                  label: "อัพเดทคอร์ส",
                  desc: "แจ้งเตือนเมื่อคอร์สมีอัพเดท",
                },
                {
                  key: "achievementAlerts" as const,
                  label: "ความสำเร็จ",
                  desc: "แจ้งเตือนเมื่อได้รับความสำเร็จ",
                },
                {
                  key: "weeklyReport" as const,
                  label: "รายงานประจำสัปดาห์",
                  desc: "สรุปความก้าวหน้าทุกสัปดาห์",
                },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between py-2"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {item.label}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {item.desc}
                    </p>
                  </div>
                  <button
                    onClick={() => updateSetting(item.key, !settings[item.key])}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings[item.key]
                        ? "bg-blue-600"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings[item.key] ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <Lock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                ความเป็นส่วนตัว
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  การมองเห็นโปรไฟล์
                </label>
                <select
                  value={settings.profileVisibility}
                  onChange={(e) =>
                    updateSetting("profileVisibility", e.target.value as any)
                  }
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="public">สาธารณะ - ทุกคนเห็นได้</option>
                  <option value="friends">เพื่อน - เฉพาะเพื่อนเห็นได้</option>
                  <option value="private">ส่วนตัว - เฉพาะตัวเอง</option>
                </select>
              </div>

              {[
                {
                  key: "showProgress" as const,
                  label: "แสดงความคืบหน้าการเรียน",
                },
                { key: "showAchievements" as const, label: "แสดงความสำเร็จ" },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between py-2"
                >
                  <p className="font-medium text-gray-900 dark:text-white">
                    {item.label}
                  </p>
                  <button
                    onClick={() => updateSetting(item.key, !settings[item.key])}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings[item.key]
                        ? "bg-blue-600"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings[item.key] ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          {hasChanges && (
            <div className="sticky bottom-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-2 border-blue-500">
              <div className="flex items-center justify-between">
                <p className="text-gray-700 dark:text-gray-300">
                  คุณมีการเปลี่ยนแปลงที่ยังไม่ได้บันทึก
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={resetToDefaults}
                    className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-semibold flex items-center gap-2"
                  >
                    <RotateCcw className="w-5 h-5" />
                    รีเซ็ต
                  </button>
                  <button
                    onClick={saveSettings}
                    disabled={saving}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2 disabled:opacity-50"
                  >
                    <Save className="w-5 h-5" />
                    {saving ? "กำลังบันทึก..." : "บันทึกการตั้งค่า"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import {
  ClientSettingsPresenterFactory,
  type SettingsViewModel,
  type UserSettings,
} from './SettingsPresenter';

export function useSettingsPresenter(initialViewModel?: SettingsViewModel, userId?: string) {
  const [viewModel, setViewModel] = useState<SettingsViewModel | null>(initialViewModel || null);
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState<UserSettings | null>(
    initialViewModel?.settings || null
  );
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!userId || initialViewModel) {
      if (initialViewModel?.settings) {
        setSettings(initialViewModel.settings);
      }
      return;
    }

    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await ClientSettingsPresenterFactory.create(userId);
        setViewModel(data);
        setSettings(data.settings);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการโหลดข้อมูล');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [userId, initialViewModel]);

  // Update setting
  const updateSetting = <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => {
    if (!settings) return;

    setSettings({
      ...settings,
      [key]: value,
    });
    setHasChanges(true);
  };

  // Save settings
  const saveSettings = async () => {
    if (!settings) return;

    try {
      setSaving(true);
      // TODO: Save to backend
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      
      setHasChanges(false);
      alert('บันทึกการตั้งค่าสำเร็จ!');
    } catch {
      alert('เกิดข้อผิดพลาดในการบันทึก กรุณาลองใหม่อีกครั้ง');
    } finally {
      setSaving(false);
    }
  };

  // Reset to defaults
  const resetToDefaults = () => {
    if (!viewModel) return;

    if (confirm('คุณต้องการรีเซ็ตการตั้งค่าเป็นค่าเริ่มต้นหรือไม่?')) {
      setSettings(viewModel.settings);
      setHasChanges(false);
    }
  };

  return {
    viewModel,
    loading,
    error,
    settings,
    updateSetting,
    hasChanges,
    saving,
    saveSettings,
    resetToDefaults,
  };
}

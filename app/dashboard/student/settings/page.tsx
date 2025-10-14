import { SettingsView } from "@/src/presentation/components/settings/SettingsView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ตั้งค่า | Next Edu",
  description:
    "จัดการการตั้งค่าบัญชี ความชอบการเรียน การแจ้งเตือน และความเป็นส่วนตัว",
};

export default async function SettingsPage() {
  return <SettingsView />;
}

import { StudentDashboardView } from "@/src/presentation/components/student-dashboard/StudentDashboardView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "แดชบอร์ดนักเรียน | Next Edu",
  description:
    "ติดตามความก้าวหน้าการเรียนของคุณ จัดการคอร์ส และดูความสำเร็จต่างๆ",
};

export default async function StudentDashboardPage() {
  return <StudentDashboardView />;
}

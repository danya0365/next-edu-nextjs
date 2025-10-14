import { InstructorDashboardView } from "@/src/presentation/components/instructor-dashboard/InstructorDashboardView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "แดชบอร์ดผู้สอน | Next Edu",
  description: "จัดการคอร์สเรียน ดูสถิติ และติดตามความคืบหน้าของนักเรียน",
};

export default async function InstructorDashboardPage() {
  return <InstructorDashboardView />;
}

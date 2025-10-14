import { AchievementsView } from "@/src/presentation/components/achievements/AchievementsView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ความสำเร็จ | Next Edu",
  description:
    "รวบรวมความสำเร็จและปลดล็อกรางวัลพิเศษ ติดตามความก้าวหน้าและเป้าหมายของคุณ",
};

export default async function AchievementsPage() {
  return <AchievementsView />;
}

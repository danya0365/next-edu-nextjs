import { LeaderboardView } from "@/src/presentation/components/leaderboard/LeaderboardView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "กระดานคะแนน | Next Edu",
  description:
    "ดูอันดับและแข่งขันกับเพื่อนๆ ในการเรียนรู้ ติดตามความก้าวหน้าและเป้าหมายของคุณ",
};

export default async function LeaderboardPage() {
  return <LeaderboardView />;
}

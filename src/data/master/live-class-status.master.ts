/**
 * Master Data: Live Class Status
 * สถานะคลาสสด
 */

export interface LiveClassStatus {
  id: string;
  name: string;
  nameTh: string;
  color: string;
  bgColor: string;
  icon: string;
}

export const LIVE_CLASS_STATUSES: LiveClassStatus[] = [
  {
    id: "upcoming",
    name: "Upcoming",
    nameTh: "กำลังจะมาถึง",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    icon: "⏰",
  },
  {
    id: "live",
    name: "Live Now",
    nameTh: "กำลังสด",
    color: "text-red-600",
    bgColor: "bg-red-100",
    icon: "🔴",
  },
  {
    id: "ended",
    name: "Ended",
    nameTh: "จบแล้ว",
    color: "text-gray-600",
    bgColor: "bg-gray-100",
    icon: "✓",
  },
];

/**
 * Get status by ID
 */
export function getLiveClassStatusById(
  id: string
): LiveClassStatus | undefined {
  return LIVE_CLASS_STATUSES.find((status) => status.id === id);
}

/**
 * Get status name in Thai
 */
export function getLiveClassStatusNameTh(id: string): string {
  const status = getLiveClassStatusById(id);
  return status ? status.nameTh : "ไม่ระบุ";
}

/**
 * Master Data: Live Class Categories
 * หมวดหมู่คลาสสดออนไลน์
 */

export interface LiveClassCategory {
  id: string;
  name: string;
  nameTh: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
}

export const LIVE_CLASS_CATEGORIES: LiveClassCategory[] = [
  {
    id: "programming",
    name: "Programming",
    nameTh: "โปรแกรมมิ่ง",
    description: "เรียนเขียนโปรแกรมแบบสด",
    icon: "💻",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    id: "science",
    name: "Science",
    nameTh: "วิทยาศาสตร์",
    description: "ทดลองวิทยาศาสตร์แบบสด",
    icon: "🔬",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    id: "math",
    name: "Mathematics",
    nameTh: "คณิตศาสตร์",
    description: "เรียนคณิตศาสตร์แบบสด",
    icon: "🔢",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    id: "art",
    name: "Art & Design",
    nameTh: "ศิลปะและดิไซน์",
    description: "สร้างสรรค์ผลงานศิลปะ",
    icon: "🎨",
    color: "text-pink-600",
    bgColor: "bg-pink-100",
  },
  {
    id: "language",
    name: "Language",
    nameTh: "ภาษา",
    description: "เรียนภาษาต่างประเทศ",
    icon: "🗣️",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    id: "music",
    name: "Music",
    nameTh: "ดนตรี",
    description: "เรียนดนตรีและร้องเพลง",
    icon: "🎵",
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
  },
];

/**
 * Get category by ID
 */
export function getLiveClassCategoryById(
  id: string
): LiveClassCategory | undefined {
  return LIVE_CLASS_CATEGORIES.find((category) => category.id === id);
}

/**
 * Get category name in Thai
 */
export function getLiveClassCategoryNameTh(id: string): string {
  const category = getLiveClassCategoryById(id);
  return category ? category.nameTh : "ไม่ระบุ";
}

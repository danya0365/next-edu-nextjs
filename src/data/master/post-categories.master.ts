/**
 * Master Data: Post Categories
 * หมวดหมู่โพสต์ในชุมชน
 */

export interface PostCategory {
  id: string;
  name: string;
  nameTh: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
}

export const POST_CATEGORIES: PostCategory[] = [
  {
    id: "question",
    name: "Question",
    nameTh: "คำถาม",
    description: "ถามคำถามเกี่ยวกับคอร์สเรียน",
    icon: "❓",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    id: "discussion",
    name: "Discussion",
    nameTh: "พูดคุย",
    description: "พูดคุยแลกเปลี่ยนความคิดเห็น",
    icon: "💬",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    id: "showcase",
    name: "Showcase",
    nameTh: "โชว์ผลงาน",
    description: "แชร์ผลงานที่ทำได้",
    icon: "🎨",
    color: "text-pink-600",
    bgColor: "bg-pink-100",
  },
  {
    id: "help",
    name: "Help",
    nameTh: "ขอความช่วยเหลือ",
    description: "ขอความช่วยเหลือจากเพื่อนๆ",
    icon: "🆘",
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
  {
    id: "announcement",
    name: "Announcement",
    nameTh: "ประกาศ",
    description: "ประกาศข่าวสารสำคัญ",
    icon: "📢",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    id: "achievement",
    name: "Achievement",
    nameTh: "ความสำเร็จ",
    description: "แชร์ความสำเร็จที่ได้รับ",
    icon: "🏆",
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
  {
    id: "tip",
    name: "Tip",
    nameTh: "เคล็ดลับ",
    description: "แชร์เคล็ดลับการเรียน",
    icon: "💡",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    id: "other",
    name: "Other",
    nameTh: "อื่นๆ",
    description: "หัวข้ออื่นๆ ทั่วไป",
    icon: "📝",
    color: "text-gray-600",
    bgColor: "bg-gray-100",
  },
];

/**
 * Get category by ID
 */
export function getCategoryById(id: string): PostCategory | undefined {
  return POST_CATEGORIES.find((category) => category.id === id);
}

/**
 * Get category name in Thai
 */
export function getCategoryNameTh(id: string): string {
  const category = getCategoryById(id);
  return category ? category.nameTh : "ไม่ระบุ";
}

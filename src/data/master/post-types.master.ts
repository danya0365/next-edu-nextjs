/**
 * Master Data: Post Types
 * ประเภทโพสต์
 */

export interface PostType {
  id: string;
  name: string;
  nameTh: string;
  description: string;
}

export const POST_TYPES: PostType[] = [
  {
    id: "text",
    name: "Text",
    nameTh: "ข้อความ",
    description: "โพสต์ข้อความธรรมดา",
  },
  {
    id: "image",
    name: "Image",
    nameTh: "รูปภาพ",
    description: "โพสต์พร้อมรูปภาพ",
  },
  {
    id: "video",
    name: "Video",
    nameTh: "วิดีโอ",
    description: "โพสต์พร้อมวิดีโอ",
  },
  {
    id: "poll",
    name: "Poll",
    nameTh: "โพล",
    description: "สร้างโพลสำรวจความคิดเห็น",
  },
  {
    id: "link",
    name: "Link",
    nameTh: "ลิงก์",
    description: "แชร์ลิงก์ภายนอก",
  },
];

/**
 * Get post type by ID
 */
export function getPostTypeById(id: string): PostType | undefined {
  return POST_TYPES.find((type) => type.id === id);
}

/**
 * Get post type name in Thai
 */
export function getPostTypeNameTh(id: string): string {
  const type = getPostTypeById(id);
  return type ? type.nameTh : "ไม่ระบุ";
}

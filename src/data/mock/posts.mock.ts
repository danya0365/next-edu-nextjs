/**
 * Mock Data: Community Posts
 * โพสต์ในชุมชน
 */

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  category: string;
  type: string;
  title: string;
  content: string;
  images?: string[];
  videoUrl?: string;
  likes: number;
  comments: number;
  views: number;
  isPinned: boolean;
  isLocked: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export const MOCK_POSTS: Post[] = [
  {
    id: "post-001",
    authorId: "student-001",
    authorName: "น้องมินท์",
    authorAvatar: "/images/students/mint.jpg",
    category: "question",
    type: "text",
    title: "ถามเรื่อง HTML Tag ครับ",
    content:
      "พี่ๆ ครับ ผมอยากถามว่า HTML Tag ที่ใช้สร้างตารางคืออะไรครับ และมีวิธีใช้งานยังไงบ้างครับ ขอบคุณครับ 🙏",
    likes: 15,
    comments: 8,
    views: 124,
    isPinned: false,
    isLocked: false,
    tags: ["HTML", "Web Development", "Beginner"],
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "post-002",
    authorId: "student-002",
    authorName: "น้องปุ้ย",
    authorAvatar: "/images/students/pui.jpg",
    category: "showcase",
    type: "image",
    title: "โชว์เว็บไซต์แรกที่ทำเสร็จแล้ว! 🎉",
    content:
      "สวัสดีค่ะทุกคน! หนูทำเว็บไซต์แรกเสร็จแล้วค่ะ เป็นเว็บแนะนำตัวเองง่ายๆ ใช้ HTML, CSS ที่เรียนมา ขอบคุณครูและเพื่อนๆ ทุกคนที่ช่วยเหลือนะคะ 💖",
    images: [
      "/images/showcase/website-1.jpg",
      "/images/showcase/website-2.jpg",
    ],
    likes: 45,
    comments: 12,
    views: 256,
    isPinned: true,
    isLocked: false,
    tags: ["HTML", "CSS", "Portfolio", "Showcase"],
    createdAt: "2024-01-14T14:20:00Z",
    updatedAt: "2024-01-14T14:20:00Z",
  },
  {
    id: "post-003",
    authorId: "instructor-001",
    authorName: "ครูแนน",
    authorAvatar: "/images/instructors/naen.jpg",
    category: "announcement",
    type: "text",
    title: "📢 ประกาศ: คอร์สใหม่ Python for Kids เปิดให้ลงทะเบียนแล้ว!",
    content:
      "สวัสดีค่ะนักเรียนทุกคน! ครูแนนมีข่าวดีมาบอก คอร์ส 'Python for Kids' เปิดให้ลงทะเบียนแล้วค่ะ เหมาะสำหรับน้องๆ ที่อยากเริ่มต้นเรียนโปรแกรมมิ่ง มีเกมและกิจกรรมสนุกๆ รอน้องๆ อยู่เยอะเลยค่ะ 🐍✨",
    likes: 89,
    comments: 23,
    views: 512,
    isPinned: true,
    isLocked: false,
    tags: ["Python", "Announcement", "New Course"],
    createdAt: "2024-01-13T09:00:00Z",
    updatedAt: "2024-01-13T09:00:00Z",
  },
  {
    id: "post-004",
    authorId: "student-003",
    authorName: "น้องโอม",
    authorAvatar: "/images/students/ohm.jpg",
    category: "help",
    type: "text",
    title: "ช่วยหน่อยครับ JavaScript ไม่ทำงาน 😭",
    content:
      "พี่ๆ ครับ ผมเขียน JavaScript แล้วมันไม่ทำงานครับ ลองดูโค้ดให้หน่อยได้ไหมครับ ว่าผมผิดตรงไหน ขอบคุณมากครับ 🙏",
    likes: 12,
    comments: 15,
    views: 98,
    isPinned: false,
    isLocked: false,
    tags: ["JavaScript", "Help", "Debugging"],
    createdAt: "2024-01-12T16:45:00Z",
    updatedAt: "2024-01-12T16:45:00Z",
  },
  {
    id: "post-005",
    authorId: "student-001",
    authorName: "น้องมินท์",
    authorAvatar: "/images/students/mint.jpg",
    category: "achievement",
    type: "text",
    title: "ได้ใบประกาศนียบัตรแล้ว! 🎓",
    content:
      "ยินดีด้วยกับตัวเองค่ะ! เรียนคอร์ส Web Development จบแล้ว และได้ใบประกาศนียบัตรด้วย ขอบคุณครูและเพื่อนๆ ทุกคนนะคะ จะพยายามเรียนต่อไปเรื่อยๆ ค่ะ 💪✨",
    likes: 67,
    comments: 18,
    views: 234,
    isPinned: false,
    isLocked: false,
    tags: ["Achievement", "Certificate", "Web Development"],
    createdAt: "2024-01-11T11:30:00Z",
    updatedAt: "2024-01-11T11:30:00Z",
  },
  {
    id: "post-006",
    authorId: "student-002",
    authorName: "น้องปุ้ย",
    authorAvatar: "/images/students/pui.jpg",
    category: "tip",
    type: "text",
    title: "💡 เคล็ดลับจำ CSS Properties ง่ายๆ",
    content:
      "สวัสดีค่ะ! หนูมีเคล็ดลับจำ CSS Properties มาแชร์ค่ะ ใช้วิธีจำคำว่า 'MBPC' = Margin, Border, Padding, Content จะจำง่ายขึ้นเยอะเลยค่ะ ลองดูนะคะ 😊",
    likes: 34,
    comments: 9,
    views: 167,
    isPinned: false,
    isLocked: false,
    tags: ["CSS", "Tips", "Learning"],
    createdAt: "2024-01-10T13:15:00Z",
    updatedAt: "2024-01-10T13:15:00Z",
  },
  {
    id: "post-007",
    authorId: "instructor-002",
    authorName: "ครูบี",
    authorAvatar: "/images/instructors/bee.jpg",
    category: "discussion",
    type: "poll",
    title: "🗳️ โพล: น้องๆ อยากเรียนภาษาโปรแกรมมิ่งอะไรต่อไป?",
    content:
      "สวัสดีค่ะน้องๆ! ครูอยากทราบว่าน้องๆ สนใจเรียนภาษาโปรแกรมมิ่งอะไรต่อไปบ้างคะ ช่วยโหวตให้หน่อยนะคะ จะได้เปิดคอร์สตามความต้องการของน้องๆ ค่ะ 📊",
    likes: 56,
    comments: 31,
    views: 389,
    isPinned: false,
    isLocked: false,
    tags: ["Poll", "Discussion", "Programming"],
    createdAt: "2024-01-09T10:00:00Z",
    updatedAt: "2024-01-09T10:00:00Z",
  },
  {
    id: "post-008",
    authorId: "student-003",
    authorName: "น้องโอม",
    authorAvatar: "/images/students/ohm.jpg",
    category: "showcase",
    type: "video",
    title: "วิดีโอแนะนำเกมที่ทำเอง! 🎮",
    content:
      "สวัสดีครับทุกคน! ผมทำเกมง่ายๆ ด้วย JavaScript เสร็จแล้วครับ เป็นเกมเก็บดาวครับ ลองดูวิดีโอได้เลยครับ ถ้ามีข้อเสนอแนะบอกได้นะครับ 🌟",
    videoUrl: "https://youtube.com/watch?v=example",
    likes: 78,
    comments: 21,
    views: 445,
    isPinned: false,
    isLocked: false,
    tags: ["JavaScript", "Game", "Showcase", "Video"],
    createdAt: "2024-01-08T15:30:00Z",
    updatedAt: "2024-01-08T15:30:00Z",
  },
];

/**
 * Get post by ID
 */
export function getPostById(id: string): Post | undefined {
  return MOCK_POSTS.find((post) => post.id === id);
}

/**
 * Get posts by category
 */
export function getPostsByCategory(category: string): Post[] {
  return MOCK_POSTS.filter((post) => post.category === category);
}

/**
 * Get posts by author
 */
export function getPostsByAuthor(authorId: string): Post[] {
  return MOCK_POSTS.filter((post) => post.authorId === authorId);
}

/**
 * Get pinned posts
 */
export function getPinnedPosts(): Post[] {
  return MOCK_POSTS.filter((post) => post.isPinned);
}

/**
 * Get popular posts (sorted by likes)
 */
export function getPopularPosts(limit: number = 5): Post[] {
  return [...MOCK_POSTS].sort((a, b) => b.likes - a.likes).slice(0, limit);
}

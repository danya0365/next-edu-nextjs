/**
 * Mock Data: Post Comments
 * คอมเมนต์ในโพสต์
 */

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  likes: number;
  parentId?: string; // For nested replies
  createdAt: string;
  updatedAt: string;
}

export const MOCK_COMMENTS: Comment[] = [
  // Comments for post-001 (HTML Tag question)
  {
    id: "comment-001",
    postId: "post-001",
    authorId: "instructor-001",
    authorName: "ครูแนน",
    authorAvatar: "/images/instructors/naen.jpg",
    content:
      "สวัสดีค่ะน้องมินท์! HTML Tag ที่ใช้สร้างตารางคือ <table> ค่ะ ใช้ร่วมกับ <tr> (table row), <td> (table data), และ <th> (table header) นะคะ ลองดูตัวอย่างในบทเรียนที่ 5 ได้เลยค่ะ 😊",
    likes: 12,
    createdAt: "2024-01-15T10:45:00Z",
    updatedAt: "2024-01-15T10:45:00Z",
  },
  {
    id: "comment-002",
    postId: "post-001",
    authorId: "student-002",
    authorName: "น้องปุ้ย",
    authorAvatar: "/images/students/pui.jpg",
    content: "ถูกต้องค่ะ! หนูเพิ่งเรียนมาเหมือนกัน ลองทำตามครูแนนดูนะคะ 👍",
    likes: 5,
    parentId: "comment-001",
    createdAt: "2024-01-15T11:00:00Z",
    updatedAt: "2024-01-15T11:00:00Z",
  },
  {
    id: "comment-003",
    postId: "post-001",
    authorId: "student-001",
    authorName: "น้องมินท์",
    authorAvatar: "/images/students/mint.jpg",
    content: "ขอบคุณครูแนนมากค่ะ! เข้าใจแล้วค่ะ จะลองทำดูนะคะ 🙏",
    likes: 3,
    parentId: "comment-001",
    createdAt: "2024-01-15T11:15:00Z",
    updatedAt: "2024-01-15T11:15:00Z",
  },

  // Comments for post-002 (Showcase website)
  {
    id: "comment-004",
    postId: "post-002",
    authorId: "student-003",
    authorName: "น้องโอม",
    authorAvatar: "/images/students/ohm.jpg",
    content: "เว็บสวยมากครับ! ชอบสีที่เลือกใช้เลยครับ 🎨",
    likes: 8,
    createdAt: "2024-01-14T14:35:00Z",
    updatedAt: "2024-01-14T14:35:00Z",
  },
  {
    id: "comment-005",
    postId: "post-002",
    authorId: "instructor-002",
    authorName: "ครูบี",
    authorAvatar: "/images/instructors/bee.jpg",
    content:
      "ยอดเยี่ยมมากค่ะน้องปุ้ย! เห็นความพยายามเลยค่ะ Layout สวยงามและใช้งานง่ายด้วย ชอบมากค่ะ 💖",
    likes: 15,
    createdAt: "2024-01-14T15:00:00Z",
    updatedAt: "2024-01-14T15:00:00Z",
  },

  // Comments for post-003 (Announcement)
  {
    id: "comment-006",
    postId: "post-003",
    authorId: "student-001",
    authorName: "น้องมินท์",
    authorAvatar: "/images/students/mint.jpg",
    content: "ว้าว! อยากเรียน Python มากเลยค่ะ ลงทะเบียนแล้วค่ะครู! 🐍",
    likes: 10,
    createdAt: "2024-01-13T09:30:00Z",
    updatedAt: "2024-01-13T09:30:00Z",
  },
  {
    id: "comment-007",
    postId: "post-003",
    authorId: "student-002",
    authorName: "น้องปุ้ย",
    authorAvatar: "/images/students/pui.jpg",
    content: "ตื่นเต้นมากค่ะ! Python น่าสนุกมากเลย ✨",
    likes: 7,
    createdAt: "2024-01-13T10:00:00Z",
    updatedAt: "2024-01-13T10:00:00Z",
  },

  // Comments for post-004 (Help with JavaScript)
  {
    id: "comment-008",
    postId: "post-004",
    authorId: "student-002",
    authorName: "น้องปุ้ย",
    authorAvatar: "/images/students/pui.jpg",
    content:
      "ลองเช็ค Console ดูก่อนนะคะ ว่ามี error อะไรไหม กด F12 แล้วไปที่ Console ค่ะ",
    likes: 6,
    createdAt: "2024-01-12T17:00:00Z",
    updatedAt: "2024-01-12T17:00:00Z",
  },
  {
    id: "comment-009",
    postId: "post-004",
    authorId: "instructor-001",
    authorName: "ครูแนน",
    authorAvatar: "/images/instructors/naen.jpg",
    content:
      "สวัสดีค่ะน้องโอม ลองส่งโค้ดมาให้ครูดูหน่อยได้ไหมคะ จะได้ช่วยเช็คให้ค่ะ 😊",
    likes: 12,
    createdAt: "2024-01-12T17:30:00Z",
    updatedAt: "2024-01-12T17:30:00Z",
  },

  // Comments for post-005 (Achievement)
  {
    id: "comment-010",
    postId: "post-005",
    authorId: "student-002",
    authorName: "น้องปุ้ย",
    authorAvatar: "/images/students/pui.jpg",
    content: "ยินดีด้วยนะคะพี่มินท์! เก่งมากเลยค่ะ 🎉",
    likes: 9,
    createdAt: "2024-01-11T12:00:00Z",
    updatedAt: "2024-01-11T12:00:00Z",
  },
  {
    id: "comment-011",
    postId: "post-005",
    authorId: "instructor-002",
    authorName: "ครูบี",
    authorAvatar: "/images/instructors/bee.jpg",
    content: "ยินดีด้วยค่ะน้องมินท์! ภูมิใจในตัวน้องมากเลยค่ะ 💖",
    likes: 14,
    createdAt: "2024-01-11T13:00:00Z",
    updatedAt: "2024-01-11T13:00:00Z",
  },

  // Comments for post-006 (CSS Tips)
  {
    id: "comment-012",
    postId: "post-006",
    authorId: "student-003",
    authorName: "น้องโอม",
    authorAvatar: "/images/students/ohm.jpg",
    content: "เคล็ดลับดีมากครับ! จะลองใช้ดูครับ ขอบคุณครับ 🙏",
    likes: 7,
    createdAt: "2024-01-10T14:00:00Z",
    updatedAt: "2024-01-10T14:00:00Z",
  },

  // Comments for post-007 (Poll)
  {
    id: "comment-013",
    postId: "post-007",
    authorId: "student-001",
    authorName: "น้องมินท์",
    authorAvatar: "/images/students/mint.jpg",
    content: "อยากเรียน Python ค่ะครู! 🐍",
    likes: 11,
    createdAt: "2024-01-09T11:00:00Z",
    updatedAt: "2024-01-09T11:00:00Z",
  },
  {
    id: "comment-014",
    postId: "post-007",
    authorId: "student-003",
    authorName: "น้องโอม",
    authorAvatar: "/images/students/ohm.jpg",
    content: "ผมอยากเรียน Java ครับ! ☕",
    likes: 8,
    createdAt: "2024-01-09T12:00:00Z",
    updatedAt: "2024-01-09T12:00:00Z",
  },

  // Comments for post-008 (Game showcase)
  {
    id: "comment-015",
    postId: "post-008",
    authorId: "student-002",
    authorName: "น้องปุ้ย",
    authorAvatar: "/images/students/pui.jpg",
    content: "เกมสนุกมากเลยค่ะ! เล่นแล้วติดใจเลย 🌟",
    likes: 13,
    createdAt: "2024-01-08T16:00:00Z",
    updatedAt: "2024-01-08T16:00:00Z",
  },
  {
    id: "comment-016",
    postId: "post-008",
    authorId: "instructor-001",
    authorName: "ครูแนน",
    authorAvatar: "/images/instructors/naen.jpg",
    content:
      "เยี่ยมมากค่ะน้องโอม! เห็นความคิดสร้างสรรค์เลยค่ะ ถ้าเพิ่มระดับความยากจะสนุกมากขึ้นนะคะ 🎮",
    likes: 16,
    createdAt: "2024-01-08T17:00:00Z",
    updatedAt: "2024-01-08T17:00:00Z",
  },
];

/**
 * Get comments by post ID
 */
export function getCommentsByPostId(postId: string): Comment[] {
  return MOCK_COMMENTS.filter((comment) => comment.postId === postId);
}

/**
 * Get comment by ID
 */
export function getCommentById(id: string): Comment | undefined {
  return MOCK_COMMENTS.find((comment) => comment.id === id);
}

/**
 * Get replies for a comment
 */
export function getRepliesByCommentId(commentId: string): Comment[] {
  return MOCK_COMMENTS.filter((comment) => comment.parentId === commentId);
}

/**
 * Get top-level comments (no parent)
 */
export function getTopLevelComments(postId: string): Comment[] {
  return MOCK_COMMENTS.filter(
    (comment) => comment.postId === postId && !comment.parentId
  );
}

# Next Edu - รายละเอียดฟีเจอร์และ Schema

> ไฟล์นี้เป็นส่วนเสริมของ `TODO.md` มีรายละเอียดของแต่ละหน้าและ data schema

---

## 📄 Pages Features Detail

### 🔍 Browse Courses Page (`/courses`)

**4 ไฟล์ที่ต้องสร้าง:**
1. `app/courses/page.tsx`
2. `src/presentation/presenters/courses/CoursesPresenter.ts`
3. `src/presentation/presenters/courses/useCoursesPresenter.ts`
4. `src/presentation/components/courses/CoursesView.tsx`

**Features:**
- Search bar + auto-complete
- View toggle (grid/list)
- Sort dropdown (popular, newest, price, rating)
- Filter sidebar (category, level, age group, duration, price, rating, language)
- Course cards with (thumbnail, badge, title, instructor, rating, price, duration, level)
- Pagination
- Loading & empty states

---

### 📚 Course Detail Page (`/courses/[id]`)

**4 ไฟล์ที่ต้องสร้าง:**
1. `app/courses/[id]/page.tsx`
2. `src/presentation/presenters/course-detail/CourseDetailPresenter.ts`
3. `src/presentation/presenters/course-detail/useCourseDetailPresenter.ts`
4. `src/presentation/components/course-detail/CourseDetailView.tsx`

**Features:**
- Hero section (banner, title, instructor, rating, enrollment)
- Sticky sidebar (preview card, price, CTA buttons, what's included)
- Content tabs:
  - Overview (description, learning outcomes, requirements, target audience)
  - Curriculum (sections accordion with lessons)
  - Instructor (profile, bio, other courses)
  - Reviews (rating summary, filter, review cards, pagination)
- Similar courses section
- Dynamic metadata & JSON-LD

---

### 🎓 Learn/Course Player (`/learn/[courseId]`)

**4 ไฟล์ที่ต้องสร้าง:**
1. `app/learn/[courseId]/page.tsx`
2. `src/presentation/presenters/learn/LearnPresenter.ts`
3. `src/presentation/presenters/learn/useLearnPresenter.ts`
4. `src/presentation/components/learn/LearnView.tsx`

**Layout:**
- Top navbar (title, progress, settings, exit)
- Left sidebar (curriculum, progress, lesson list)
- Main content (video player or content)
- Right sidebar (notes, resources, Q&A) - collapsible

**Features:**
- **Video Player:** play/pause, progress bar, time, volume, speed, quality, subtitles, fullscreen, PiP, keyboard shortcuts
- **Reading Lessons:** rich text, images, code snippets
- **Quiz Lessons:** question types, submit & feedback, score, retry
- **Exercise Lessons:** description, coding playground, file upload
- **Notes Tab:** rich text editor, timestamp bookmarks
- **Resources Tab:** downloadable files
- **Q&A Tab:** ask question, questions list, answers
- Progress tracking & auto-resume
- Lesson complete flow (confetti, XP, achievement)
- Course complete flow (certificate, share, review)

---

### 👤 Student Dashboard (`/dashboard/student`)

**4 ไฟล์ที่ต้องสร้าง:**
1. `app/dashboard/student/page.tsx`
2. `src/presentation/presenters/student-dashboard/StudentDashboardPresenter.ts`
3. `src/presentation/presenters/student-dashboard/useStudentDashboardPresenter.ts`
4. `src/presentation/components/student-dashboard/StudentDashboardView.tsx`

**Pages:**
- **Dashboard Home:** Welcome, stats cards, continue learning, recommended courses, recent achievements
- **My Courses:** Tabs (in progress, completed, wishlist), filters & search
- **Wishlist:** Course cards with "start" and "remove" buttons
- **Achievements:** See dedicated achievements page
- **Certificates:** Certificate cards with download, share, print
- **Settings:** Profile, privacy, learning preferences, notifications, account

---

### 👨‍🏫 Instructor Dashboard (`/dashboard/instructor`)

**4 ไฟล์ที่ต้องสร้าง:**
1. `app/dashboard/instructor/page.tsx`
2. `src/presentation/presenters/instructor-dashboard/InstructorDashboardPresenter.ts`
3. `src/presentation/presenters/instructor-dashboard/useInstructorDashboardPresenter.ts`
4. `src/presentation/components/instructor-dashboard/InstructorDashboardView.tsx`

**Pages:**
- **Dashboard Home:** Stats, recent activity, charts (enrollment, revenue)
- **My Courses:** Course list, filters, search, create new
- **Create/Edit Course:** 6-step builder (basic info, curriculum, lesson content, requirements, pricing, publish)
- **Students:** Student list, search, filter by course
- **Revenue:** Summary, chart, transaction list, export
- **Reviews:** All reviews, filter, sort, reply
- **Settings:** Instructor profile, notifications, payout, account

---

### 🔐 Authentication Pages

**Login (`/login`)**
- Form: email, password, remember me, submit
- Links: forgot password, register
- Social login: Google, Facebook
- Validation & loading state

**Register (`/register`)**
- Form: name, email, password, confirm password, age, terms checkbox
- User type: student (default), instructor
- Links: login
- Social register
- Validation & password strength

**Forgot Password (`/forgot-password`)**
- Email form + submit
- Success state
- Reset password page

---

### 🏆 Achievements Page (`/achievements`)

**4 ไฟล์ที่ต้องสร้าง:**
1. `app/achievements/page.tsx`
2. `src/presentation/presenters/achievements/AchievementsPresenter.ts`
3. `src/presentation/presenters/achievements/useAchievementsPresenter.ts`
4. `src/presentation/components/achievements/AchievementsView.tsx`

**Features:**
- Header: total points, current level, progress to next level
- Filters: all, unlocked, locked, by type
- Achievement grid: badge icon, title, description, points, unlock date, progress, rarity
- Achievement detail modal
- Statistics section

---

### 📊 Leaderboard Page (`/leaderboard`)

**4 ไฟล์ที่ต้องสร้าง:**
1. `app/leaderboard/page.tsx`
2. `src/presentation/presenters/leaderboard/LeaderboardPresenter.ts`
3. `src/presentation/presenters/leaderboard/useLeaderboardPresenter.ts`
4. `src/presentation/components/leaderboard/LeaderboardView.tsx`

**Features:**
- Tabs: all time, this month, this week, my friends
- Filters: age group, category
- Leaderboard table: rank, avatar, name, level, points, courses completed, streak
- Top 3 podium (visual)
- My rank card

---

### 📄 Static Pages

**About, Contact, FAQ, Privacy, Terms** - แต่ละหน้าสร้าง 4 ไฟล์ตาม pattern

---

## 📦 Data Schemas

### Master Data Schemas

#### categories.master.ts
```typescript
export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;           // Lucide icon name
  color: string;          // Hex color
  description: string;
  order: number;          // Display order
}

// ตัวอย่าง: พัฒนาเว็บ, วิทยาศาสตร์, คณิตศาสตร์, ศิลปะ, ดนตรี, ภาษา, โปรแกรมมิ่ง, ประวัติศาสตร์
```

#### levels.master.ts
```typescript
export interface Level {
  id: string;
  name: string;           // เริ่มต้น, กลาง, สูง, ผู้เชี่ยวชาญ
  slug: string;
  order: number;
  color: string;
  icon: string;
}
```

#### age-groups.master.ts
```typescript
export interface AgeGroup {
  id: string;
  name: string;           // "6-8 ปี", "9-11 ปี", etc.
  slug: string;
  minAge: number;
  maxAge: number;
  color: string;
  icon: string;
}
```

#### achievement-types.master.ts
```typescript
export interface AchievementType {
  id: string;
  name: string;           // เรียนครบ, ทำแบบทดสอบผ่าน, streak, participation
  slug: string;
  icon: string;
  color: string;
}
```

#### quiz-types.master.ts
```typescript
export interface QuizType {
  id: string;
  name: string;           // multiple_choice, true_false, fill_blank, matching, essay
  slug: string;
}
```

#### languages.master.ts
```typescript
export interface Language {
  code: string;           // 'th', 'en'
  name: string;           // 'ไทย', 'English'
  nativeName: string;
  flag: string;           // emoji or icon
}
```

---

### Mock Data Schemas

#### courses.mock.ts
```typescript
export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;            // Rich text
  instructorId: string;           // ref instructors.mock
  categoryId: string;             // ref categories.master
  levelId: string;                // ref levels.master
  ageGroupIds: string[];          // ref age-groups.master
  thumbnail: string;              // URL
  previewVideo: string;           // URL
  price: number;
  currency: string;               // 'THB'
  discount?: {
    percentage: number;
    validUntil: string;           // ISO date
  };
  duration: number;               // Total hours
  lessonCount: number;
  language: string;               // ref languages.master
  skills: string[];               // Tags
  requirements: string[];
  learningOutcomes: string[];
  rating: number;                 // 0-5
  reviewCount: number;
  studentCount: number;
  isFeatured: boolean;
  isPopular: boolean;
  isNew: boolean;
  status: 'draft' | 'published' | 'archived';
  createdAt: string;              // ISO date
  updatedAt: string;
  publishedAt?: string;
}
```

#### lessons.mock.ts
```typescript
export interface Lesson {
  id: string;
  courseId: string;               // ref courses.mock
  sectionId: string;
  title: string;
  description: string;
  type: 'video' | 'reading' | 'quiz' | 'exercise' | 'project';
  duration: number;               // Minutes
  videoUrl?: string;
  content?: string;               // For reading type (rich text)
  quizId?: string;                // ref quizzes.mock
  resources: Resource[];
  order: number;
  isFree: boolean;
  isPreview: boolean;
}

export interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'code' | 'worksheet';
  url: string;
  size: number;                   // Bytes
}

export interface Section {
  id: string;
  courseId: string;
  title: string;
  order: number;
  lessons: Lesson[];
}
```

#### instructors.mock.ts
```typescript
export interface Instructor {
  id: string;
  userId: string;
  displayName: string;
  avatar: string;                 // URL
  bio: string;
  expertise: string[];            // Tags
  education: string[];
  rating: number;                 // 0-5
  reviewCount: number;
  studentCount: number;
  coursesCount: number;
  totalRevenue: number;
  socialLinks: {
    website?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
  isVerified: boolean;
  verifiedDate?: string;
  memberSince: string;            // ISO date
  lastActive: string;
}
```

#### students.mock.ts
```typescript
export interface Student {
  id: string;
  userId: string;
  displayName: string;
  avatar: string;
  age: number;
  grade?: string;
  enrolledCourses: string[];      // Course IDs
  completedCourses: string[];
  totalLearningTime: number;      // Hours
  achievements: string[];         // Achievement IDs
  points: number;
  level: number;
  streak: number;                 // Consecutive days
  lastActive: string;             // ISO date
  preferences: {
    defaultPlaybackSpeed?: number;
    defaultQuality?: string;
    autoPlayNext?: boolean;
    emailNotifications?: boolean;
  };
}
```

#### reviews.mock.ts
```typescript
export interface Review {
  id: string;
  courseId: string;
  studentId: string;
  rating: number;                 // 1-5
  title: string;
  comment: string;
  helpful: number;                // Helpful count
  reportCount: number;
  isVerifiedPurchase: boolean;
  images?: string[];              // URLs
  createdAt: string;
  updatedAt?: string;
}
```

#### enrollments.mock.ts
```typescript
export interface Enrollment {
  id: string;
  courseId: string;
  studentId: string;
  progress: number;               // 0-100
  completedLessons: string[];     // Lesson IDs
  currentLessonId?: string;
  lastAccessedAt: string;
  status: 'active' | 'completed' | 'paused';
  certificateIssued: boolean;
  certificateId?: string;
  enrolledAt: string;
  completedAt?: string;
}
```

#### quizzes.mock.ts
```typescript
export interface Quiz {
  id: string;
  lessonId: string;
  title: string;
  description: string;
  questions: Question[];
  passingScore: number;           // Percentage
  timeLimit?: number;             // Minutes
  allowRetries: boolean;
  maxAttempts?: number;
}

export interface Question {
  id: string;
  type: string;                   // ref quiz-types.master
  question: string;
  options?: string[];             // For multiple choice
  correctAnswer: string | string[];
  explanation?: string;
  points: number;
}
```

#### achievements.mock.ts
```typescript
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  typeId: string;                 // ref achievement-types.master
  requirement: string;            // "Complete 5 courses"
  points: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}
```

#### certificates.mock.ts
```typescript
export interface Certificate {
  id: string;
  studentId: string;
  courseId: string;
  certificateNumber: string;
  issuedDate: string;
  instructor: string;
  courseName: string;
  completionDate: string;
  skillsAcquired: string[];
}
```

---

## 🗄️ Zustand Store Interfaces

### authStore.ts
```typescript
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  role: 'student' | 'instructor' | null;
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: RegisterData) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}
```

### courseStore.ts
```typescript
interface CourseState {
  courses: Course[];
  filters: CourseFilters;
  sortBy: string;
  selectedCourse: Course | null;
  relatedCourses: Course[];
}

interface CourseActions {
  searchCourses: (query: string) => Promise<void>;
  filterCourses: (filters: CourseFilters) => void;
  addToWishlist: (courseId: string) => void;
  removeFromWishlist: (courseId: string) => void;
}
```

### learningStore.ts
```typescript
interface LearningState {
  currentCourse: Course | null;
  currentLesson: Lesson | null;
  progress: number;
  completedLessons: string[];
  playbackSpeed: number;
  quality: string;
  subtitles: boolean;
  notes: Note[];
  bookmarks: Bookmark[];
}

interface LearningActions {
  markLessonComplete: (lessonId: string) => void;
  saveNote: (note: Note) => void;
  bookmarkTimestamp: (timestamp: number) => void;
  updatePlaybackSpeed: (speed: number) => void;
}
```

### quizStore.ts
```typescript
interface QuizState {
  currentQuiz: Quiz | null;
  answers: Record<string, string | string[]>;
  score: number;
  isSubmitted: boolean;
}

interface QuizActions {
  submitAnswer: (questionId: string, answer: string | string[]) => void;
  calculateScore: () => number;
  retryQuiz: () => void;
}
```

### achievementStore.ts
```typescript
interface AchievementState {
  achievements: Achievement[];
  unlockedAchievements: string[];
  points: number;
  level: number;
  streak: number;
}

interface AchievementActions {
  unlockAchievement: (achievementId: string) => void;
  incrementStreak: () => void;
  calculateLevel: () => number;
}
```

---

## 🎮 Interactive Features Details

### Video Player Controls
- Play/Pause, Progress bar (seekable), Time display
- Volume slider, Speed (0.5x - 2x), Quality (360p - 1080p)
- Subtitles toggle, Fullscreen, Picture-in-Picture
- Keyboard: Space (play/pause), ←→ (skip 5s), ↑↓ (volume), F (fullscreen), M (mute)

### Quiz System
- **Multiple Choice:** Radio buttons, single answer
- **True/False:** Radio buttons
- **Fill in the Blank:** Text input
- **Matching:** Drag & drop or dropdowns
- **Essay:** Textarea (manual grading)
- Instant feedback, score calculation, retry mechanism, timer support

### Gamification Elements
- **Points:** Earned from completing lessons, quizzes, achievements
- **Level:** XP-based progression (every X points = level up)
- **Achievements:** Badges for milestones (first course, 5 courses, 10 courses, streaks, perfect quiz, etc.)
- **Streak:** Daily login tracking
- **Leaderboard:** Ranked by points, updated real-time
- **Celebrations:** Confetti on achievement unlock, level up, course complete
- **Daily Challenges:** Optional mini-challenges for bonus points

---

## 📊 Future: Database Schema (Supabase)

### Tables Overview
```sql
-- Users & Auth
- profiles (id, role, display_name, avatar, bio, created_at)

-- Courses
- courses (id, slug, title, instructor_id, category_id, level_id, price, rating, student_count, status, created_at)
- course_age_groups (course_id, age_group_id)
- sections (id, course_id, title, order)
- lessons (id, section_id, title, type, duration, video_url, content, quiz_id, order, is_free)
- lesson_resources (id, lesson_id, title, type, url, size)

-- Enrollments & Progress
- enrollments (id, course_id, student_id, progress, current_lesson_id, status, enrolled_at, completed_at)
- lesson_progress (id, enrollment_id, lesson_id, completed, last_position, completed_at)
- notes (id, enrollment_id, lesson_id, content, timestamp, created_at)
- bookmarks (id, enrollment_id, lesson_id, timestamp, title, created_at)

-- Quizzes
- quizzes (id, lesson_id, title, passing_score, time_limit, allow_retries, max_attempts)
- quiz_questions (id, quiz_id, type, question, options, correct_answer, explanation, points, order)
- quiz_attempts (id, quiz_id, student_id, answers, score, completed_at)

-- Reviews
- reviews (id, course_id, student_id, rating, title, comment, helpful, is_verified, created_at)

-- Gamification
- achievements (id, name, description, icon, type_id, requirement, points, rarity)
- user_achievements (id, student_id, achievement_id, unlocked_at)
- user_points (student_id, points, level, streak, last_active)

-- Certificates
- certificates (id, student_id, course_id, certificate_number, issued_date)

-- Revenue (Optional)
- transactions (id, course_id, student_id, instructor_id, amount, status, created_at)
```

---

## 🎨 Component Examples (Atomic Design)

### Atoms
- **Button:** Primary, Secondary, Outline, Ghost, Icon buttons
- **Input:** Text, Email, Password, Number, Search with validation states
- **Badge:** Status badges (new, popular, featured), level badges, category tags
- **Avatar:** User avatars with fallback, sizes (sm, md, lg)
- **ProgressBar:** Linear progress, circular progress

### Molecules
- **CourseCard:** Thumbnail + title + instructor + rating + price + badges
- **LessonItem:** Icon + title + duration + status + lock/unlock
- **AchievementBadge:** Icon + title + progress bar
- **QuizQuestionCard:** Question + options + submit button
- **SearchBar:** Input + icon + suggestions dropdown

### Organisms
- **Navbar:** Logo + search + nav links + user menu + notifications
- **Footer:** Multi-column links + newsletter + social + copyright
- **VideoPlayer:** Full custom player with all controls
- **CourseGrid:** Filter sidebar + course cards grid + pagination
- **QuizComponent:** Question cards + progress + timer + score

---

## 🚀 Phase Implementation Priority

**Current Sprint:** Foundation (Week 1-2)
- ✅ Landing page complete
- 🔄 Setup Zustand + localforage
- 🔄 Create design system
- 🔄 Create master data (6 files)
- 🔄 Create mock data (9 files, 30+ courses, 300+ lessons)

**Next Sprint:** Core Pages (Week 3-4)
- Browse Courses
- Course Detail
- Learn/Player
- Basic video player + quiz system

---

ดูที่ `TODO.md` สำหรับ Sprint Plan ฉบับเต็ม

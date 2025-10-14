# Next Edu - คอร์สเรียนออนไลน์สำหรับเด็ก TODO

## 📋 Project Overview

แพลตฟอร์มเรียนออนไลน์ที่สนุกและเหมาะสำหรับเด็กๆ มุ่งเน้นการเรียนรู้แบบ Interactive พร้อมระบบติดตามความคืบหน้า Gamification และใบประกาศนีย บัตร

**แรงบันดาลใจจาก:** Udemy แต่ออกแบบให้เหมาะกับเด็ก มี UI สีสันสดใส น่ารัก และใช้งานง่าย

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **State Management:** Zustand
- **Persistence:** localforage (Web)
- **HTTP Client:** axios
- **Form:** react-hook-form + zod
- **Icons:** Lucide Icons

### Backend (Future Phase)
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth (JWT)
- **Storage:** Supabase Storage (Videos, Images)
- **Real-time:** Supabase Realtime

### Development Tools
- **Linting:** ESLint + eslint-config-next
- **Testing:** Jest
- **Dev Tools:** Chrome DevTools

---

## 🎯 Phase 1: Foundation & Core Setup

### 1.1 Project Setup ✅
- [x] Setup Next.js 15 with App Router
- [x] Setup TypeScript
- [x] Setup Tailwind CSS v4
- [ ] Setup Zustand for state management
- [ ] Setup localforage for persistence
- [ ] Setup axios for HTTP client
- [ ] Setup react-hook-form + zod
- [ ] Setup Lucide Icons

### 1.2 Clean Architecture Structure
```
/src
  /domain           - Entities, Types, Enums (ไม่มี dependencies)
  /application      - Use Cases, DTOs, Services (ใช้ในอนาคต)
  /infrastructure   - API, Repositories, Storage (ใช้ในอนาคต)
  /presentation     - Components, Presenters, Hooks, Stores
    /components     - UI Components (Atomic Design)
    /presenters     - Business Logic Layer
    /stores         - Zustand Stores

/src/data
  /master          - Master Data (ข้อมูลคงที่)
  /mock            - Mock Data (ข้อมูล Dynamic)
```

---

## 🎨 Phase 2: Design System & UI

### 2.1 Brand Identity - Fun & Playful Theme

#### Color Palette สำหรับเด็ก
```
Primary Colors:
- Main: Bright Blue (#3B82F6)     - สีน้ำเงินสดใส
- Secondary: Coral Pink (#FF6B9D) - สีชมพูแนวคอรัล
- Accent: Yellow Gold (#FDB462)   - สีเหลืองทอง
- Success: Green (#10B981)        - สีเขียวสดใส

Status Colors:
- Success: #10B981
- Warning: #F59E0B
- Error: #EF4444
- Info: #3B82F6
```

#### Typography
- **Primary:** Kanit (Thai) - สำหรับหัวเรื่องและเนื้อหาภาษาไทย
- **Secondary:** Inter (English) - สำหรับเนื้อหาภาษาอังกฤษ
- **Display:** Mitr (Thai) - สำหรับหัวเรื่องใหญ่พิเศษ

#### Component Library (Atomic Design)
- **Atoms:** Button, Input, Badge, Avatar, Icon, Card, Chip, Progress Bar, Rating
- **Molecules:** Form Field, Search Bar, Course Card, Lesson Item, Achievement Badge, Quiz Card
- **Organisms:** Navbar, Footer, Hero, Course Grid, Video Player, Quiz Component, Progress Dashboard
- **Templates:** Main Layout, Dashboard Layout, Course Player Layout, Auth Layout

### 2.2 Design Principles สำหรับเด็ก
- ✨ ใช้สีสันสดใส น่าดึงดูด
- 🎨 Icon และภาพประกอบน่ารัก
- 📐 Spacing กว้างขวาง อ่านง่าย
- 🔤 Font size ใหญ่พอ เหมาะกับเด็ก
- 🎬 Animation เบา ๆ ไม่มากเกินไป
- 🏆 Gamification elements (stars, badges, points)
- 🎉 Positive feedback (confetti, celebrations)

---

## 📄 Phase 3: Pages Development

**⚠️ CRITICAL:** ทุกหน้าต้อง follow `/prompt/CREATE_PAGE_PATTERN.md`

แต่ละหน้าต้องมี 4 ไฟล์:
1. `app/[path]/page.tsx` - Server Component (SEO)
2. `src/presentation/presenters/[name]/[Name]Presenter.ts` - Business Logic
3. `src/presentation/presenters/[name]/use[Name]Presenter.ts` - State Hook
4. `src/presentation/components/[name]/[Name]View.tsx` - UI Component

### Priority 1 - Core Pages (Week 1-4)
- [x] 🏠 **Landing Page** (`/`) - ✅ เสร็จแล้ว
- [x] 🔍 **Browse Courses** (`/courses`) - ✅ เสร็จแล้ว
- [x] 📚 **Course Detail** (`/courses/[slug]`) - ✅ เสร็จแล้ว
- [x] 🎓 **Learn/Player** (`/learn/[courseId]`) - ✅ เสร็จแล้ว

### Priority 2 - User Pages (Week 5-6)
- [x] 👤 **Student Dashboard** (`/dashboard/student`) - ✅ เสร็จแล้ว
- [x] 👨‍🏫 **Instructor Dashboard** (`/dashboard/instructor`) - ✅ เสร็จแล้ว
- [x] 🔐 **Authentication** (`/login`, `/register`) - ✅ เสร็จแล้ว
- [x] 🔐 **Forgot Password** (`/forgot-password`) - ✅ เสร็จแล้ว
- [x] 👤 **Profile** (`/profile`) - ✅ เสร็จแล้ว

### Priority 3 - Additional Pages (Week 7-8)
- [x] 🏆 **Achievements** (`/achievements`) - ✅ เสร็จแล้ว
- [x] 📊 **Leaderboard** (`/leaderboard`) - ✅ เสร็จแล้ว
- [x] 📄 **About** (`/about`) - ✅ เสร็จแล้ว
- [x] 📄 **Contact** (`/contact`) - ✅ เสร็จแล้ว
- [x] 📄 **FAQ** (`/faq`) - ✅ เสร็จแล้ว
- [x] 📄 **Privacy** (`/privacy`) - ✅ เสร็จแล้ว
- [x] 📄 **Terms** (`/terms`) - ✅ เสร็จแล้ว

### Priority 4 - Advanced Features (Week 9+)
- [x] 💬 **Community** (`/community`) - ✅ เสร็จแล้ว
- [x] 📺 **Live Classes** (`/live-classes`) - ✅ เสร็จแล้ว
- [x] 🎯 **Challenges** (`/challenges`) - ✅ เสร็จแล้ว

### Priority 5 - Instructor Management System (Week 10+)
- [x] 📚 **Instructor Courses** (`/dashboard/instructor/courses`) - ✅ เสร็จแล้ว
- [ ] ➕ **Create Course** (`/dashboard/instructor/courses/create`) - สร้างคอร์สใหม่
- [ ] ✏️ **Edit Course** (`/dashboard/instructor/courses/[id]/edit`) - แก้ไขคอร์ส
- [x] 👥 **Instructor Students** (`/dashboard/instructor/students`) - ✅ เสร็จแล้ว
- [x] ⭐ **Instructor Reviews** (`/dashboard/instructor/reviews`) - ✅ เสร็จแล้ว
- [x] 💰 **Instructor Earnings** (`/dashboard/instructor/earnings`) - ✅ เสร็จแล้ว
- [x] 📊 **Instructor Analytics** (`/dashboard/instructor/analytics`) - ✅ เสร็จแล้ว

**📋 รายละเอียดแต่ละหน้า:** ดูที่ `TODO_FEATURES.md`

---

## 📦 Phase 4: Master Data & Mock Data

### 4.1 Master Data (ข้อมูลคงที่)
สร้างที่ `/src/data/master/`

- [x] **categories.master.ts** - หมวดหมู่คอร์ส (พัฒนาเว็บ, วิทย์, คณิต, ศิลปะ, ดนตรี, ภาษา, โปรแกรมมิ่ง) ✅
- [x] **levels.master.ts** - ระดับความยาก (เริ่มต้น, กลาง, สูง, ผู้เชี่ยวชาญ) ✅
- [x] **age-groups.master.ts** - กลุ่มอายุ (6-8, 9-11, 12-14, 15-18 ปี) ✅
- [x] **achievement-types.master.ts** - ประเภทความสำเร็จ ✅
- [x] **quiz-types.master.ts** - ประเภทคำถาม ✅
- [x] **languages.master.ts** - ภาษา (ไทย, อังกฤษ) ✅

### 4.2 Mock Data (ข้อมูล Dynamic)
สร้างที่ `/src/data/mock/`

- [x] **courses.mock.ts** - 8 คอร์ส (Featured) ✅
- [x] **lessons.mock.ts** - Sample lessons ✅
- [x] **instructors.mock.ts** - 10 ครู ✅
- [x] **students.mock.ts** - 3 นักเรียน ✅
- [x] **reviews.mock.ts** - 4 รีวิว ✅
- [x] **enrollments.mock.ts** - การลงทะเบียน ✅
- [x] **quizzes.mock.ts** - แบบทดสอบ ✅
- [x] **achievements.mock.ts** - 5 ความสำเร็จ ✅
- [x] **certificates.mock.ts** - ใบประกาศนียบัตร ✅

**📋 รายละเอียด Schema:** ดูที่ `TODO_FEATURES.md`

---

## 🗄️ Phase 5: Client-Side State (Zustand)

สร้างที่ `/src/presentation/stores/`

- [ ] **authStore.ts** - Authentication state
- [ ] **courseStore.ts** - Course browsing & filtering
- [ ] **learningStore.ts** - Learning progress & player
- [ ] **quizStore.ts** - Quiz & exercise state
- [ ] **achievementStore.ts** - Gamification state
- [ ] **cartStore.ts** - Shopping cart (ใช้ในอนาคต)
- [ ] **notificationStore.ts** - Notifications

### Persistence Strategy
- ✅ Persist auth state
- ✅ Persist course progress
- ✅ Persist user preferences
- ✅ Persist cart items

---

## 🎬 Phase 6: Interactive Features

### 6.1 Video Player
- [ ] Custom video player component
- [ ] Playback controls
- [ ] Speed control (0.5x - 2x)
- [ ] Quality selection
- [ ] Subtitles support
- [ ] Progress tracking & auto-resume
- [ ] Keyboard shortcuts

### 6.2 Quiz & Exercise System
- [ ] Multiple choice questions
- [ ] True/False questions
- [ ] Fill in the blank
- [ ] Matching exercises
- [ ] Instant feedback
- [ ] Score calculation
- [ ] Retry mechanism

### 6.3 Gamification
- [ ] Point system
- [ ] Level progression (XP)
- [ ] Achievement badges
- [ ] Streak tracking
- [ ] Leaderboard
- [ ] Progress celebrations
- [ ] Daily challenges

### 6.4 Search & Filters
- [ ] Full-text search
- [ ] Auto-complete
- [ ] Advanced filters (category, level, age, duration, price, rating)
- [ ] Sort options

**📋 รายละเอียดเพิ่มเติม:** ดูที่ `TODO_FEATURES.md`

---

## 🚀 Phase 7: UI Polish & Animations

- [ ] Page transitions
- [ ] Scroll animations
- [ ] Hover effects
- [ ] Loading states & skeleton loaders
- [ ] Achievement unlock animations
- [ ] Success confetti
- [ ] Badge unlock effect
- [ ] Custom illustrations สำหรับเด็ก
- [ ] Empty states illustrations
- [ ] Error states illustrations

---

## 🗄️ Phase 8: Backend Integration (Future)

### 8.1 Supabase Setup
- [ ] Initialize project
- [ ] Database schema migration
- [ ] Authentication setup
- [ ] Storage setup (videos, images)
- [ ] Row Level Security (RLS)
- [ ] Database functions & triggers

### 8.2 Replace Mock with Real Data
- [ ] API integration
- [ ] CRUD operations
- [ ] Error handling
- [ ] Caching strategy
- [ ] File upload (videos, images)
- [ ] Payment integration (optional)

**📋 รายละเอียด Schema:** ดูที่ `TODO_FEATURES.md`

---

## 📊 Phase 9: Performance & SEO

### 9.1 Performance
- [ ] Image optimization (Next.js Image)
- [ ] Video lazy loading
- [ ] Code splitting
- [ ] Bundle size optimization
- [ ] CDN for static assets

### 9.2 SEO
- [ ] Dynamic metadata
- [ ] OpenGraph tags
- [ ] Twitter cards
- [ ] Schema markup (Course, Review, Person)
- [ ] Sitemap generation
- [ ] robots.txt

### 9.3 Analytics
- [ ] Google Analytics
- [ ] User behavior tracking
- [ ] Course completion tracking
- [ ] Error tracking (Sentry)

---

## 🧪 Phase 10: Testing & Quality

- [ ] Unit tests (Jest)
- [ ] Component tests
- [ ] Integration tests
- [ ] E2E tests (Playwright)
- [ ] Accessibility (WCAG AA)
- [ ] Security audit
- [ ] Performance testing

---

## 🚀 Phase 11: Deployment

- [ ] Vercel deployment
- [ ] Supabase production
- [ ] CDN setup (Cloudflare)
- [ ] Domain & SSL
- [ ] Monitoring (Sentry, Uptime)
- [ ] CI/CD (GitHub Actions)

---

## 📅 Sprint Plan

### Sprint 1: Foundation (Week 1-2) - CURRENT
- [x] Landing page ✅
- [x] Master Data (6 files) ✅
- [x] Mock Data (9 files) ✅
- [ ] Setup Zustand + localforage
- [ ] Design system (colors, fonts, components)

### Sprint 2: Core Pages (Week 3-4)
- [x] Browse Courses page (`/courses`) ✅
- [x] Course Detail page (`/courses/[slug]`) ✅
- [x] Layout (Navbar + Footer) ✅
- [x] Dark Mode ✅
- [x] Learn/Player page (`/learn/[courseId]`) ✅
- [x] Basic video player UI ✅
- [ ] Video player integration (HTML5 video)
- [ ] Quiz system implementation

### Sprint 3: User Features (Week 5-6)
- [x] Login page ✅
- [x] Register page ✅
- [ ] Authentication logic (Supabase Auth)
- [ ] Student Dashboard
- [ ] Instructor Dashboard
- [ ] Profile management

### Sprint 4: Gamification (Week 7-8)
- [ ] Achievements page
- [ ] Leaderboard page
- [ ] Point system
- [ ] Badge system
- [ ] Progress tracking

### Sprint 5: Advanced Features (Week 9-10)
- [ ] Community features
- [ ] Advanced search & filters
- [ ] Social sharing
- [ ] Q&A forum

### Sprint 6: Polish & Testing (Week 11-12)
- [ ] UI animations
- [ ] Performance optimization
- [ ] Testing (unit, integration, e2e)
- [ ] Accessibility improvements

### Sprint 7: Backend Integration (Week 13-14)
- [ ] Supabase setup
- [ ] Database migration
- [ ] Replace mock data
- [ ] Authentication integration

### Sprint 8: Launch Prep (Week 15-16)
- [ ] Content creation (real courses)
- [ ] SEO optimization
- [ ] Deployment
- [ ] Monitoring setup
- [ ] Launch! 🚀

---

## 📝 Development Rules

### ⚠️ MUST FOLLOW

1. **CREATE_PAGE_PATTERN.md is MANDATORY**
   - ทุกหน้าต้องสร้าง 4 ไฟล์ตาม pattern
   - Server Component + Presenter + Hook + View

2. **Clean Architecture Layers**
   ```
   /src/domain         - Pure domain logic
   /src/application    - Use cases (future)
   /src/infrastructure - External services (future)
   /src/presentation   - UI layer
   ```

3. **Data Organization**
   ```
   /src/data/master/   - Master Data (คงที่)
   /src/data/mock/     - Mock Data (dynamic)
   ```

4. **Zustand Stores**
   - Use for client-side state only
   - Persist important state with localforage
   - Keep stores focused and modular

5. **Component Structure (Atomic Design)**
   ```
   Atoms → Molecules → Organisms → Templates → Pages
   ```

6. **Styling**
   - Tailwind CSS v4
   - Theme colors in CSS variables
   - Responsive design (mobile-first)
   - Dark mode support

7. **TypeScript**
   - Strict mode enabled
   - No `any` types
   - Proper interfaces for all data

---

## 📚 Documentation

- **CREATE_PAGE_PATTERN.md** - Template for creating pages
- **TODO_FEATURES.md** - Detailed features & schemas
- **INIT_PROJECT.md** - Project initialization guide

---

## 🎯 Current Focus

**NOW:** Sprint 3, 4 & 5 - Platform Complete! 🎊✨
- ✅ Landing page complete
- ✅ Master Data complete (6 files)
- ✅ Mock Data complete (9 files)
- ✅ Browse Courses page complete
- ✅ Course Detail page complete
- ✅ Layout (Navbar + Footer) complete with dynamic navigation
- ✅ Dark Mode complete
- ✅ Learn/Player page complete with enrollment check
- ✅ Login & Register pages complete
- ✅ Profile page complete
- ✅ ImageWithFallback + AvatarFallback components
- ✅ Course enrollment flow (mock)
- ✅ Student Dashboard page (stats, continue learning, recommended courses, achievements)
- ✅ Achievements page (filters, rarity, stats, progress, modal)
- ✅ Leaderboard page (top 3 podium, rankings, filters)
- ✅ Navbar with conditional links (Dashboard, Achievements, Leaderboard)
- ✅ About page (mission, vision, values, team, stats)
- ✅ Contact page (form, contact info, social links)
- ✅ FAQ page (16 FAQs, 5 categories, search, expand/collapse)
- ✅ Community page (posts, comments, create post, like, filter)
- ✅ Live Classes page (upcoming, live, ended, filters, registration)
- ✅ Challenges page (active, upcoming, ended, filters, progress tracking)

**Platform Status: 24 pages complete! 🚀🎉✨🎊**

**Dashboard Sub-pages: ครบทั้งหมด! ✅**
- ✅ My Courses (`/dashboard/student/courses`) - พร้อม Master & Mock Data!
- ✅ Certificates (`/dashboard/student/certificates`) - Download & Share ready!
- ✅ Wishlist (`/dashboard/student/wishlist`) - เสร็จแล้ว!
- ✅ Settings (`/dashboard/student/settings`) - เสร็จแล้ว!

**ใช้ Master Data:**
- ✅ categories.master (สี, ชื่อหมวดหมู่)
- ✅ levels.master (ระดับความยาก)
- ✅ age-groups.master
- ✅ achievement-types.master
- ✅ quiz-types.master
- ✅ languages.master

**ใช้ Mock Data:**
- ✅ courses.mock (8 courses)
- ✅ enrollments.mock
- ✅ students.mock (3 students)
- ✅ instructors.mock (10 instructors)
- ✅ certificates.mock
- ✅ achievements.mock
- ✅ reviews.mock
- ✅ lessons.mock
- ✅ quizzes.mock

**NEXT Steps:**
- 🔄 Video player integration (HTML5 video)
- 🔄 Quiz system UI
- 🔄 Supabase integration (auth, database)
- 🔄 Challenge detail page (optional)
- 🔄 Live class detail page (optional)

**READY FOR:** 
✅ User testing
✅ Content creation
✅ Demo/Presentation
✅ Production deployment (Frontend)
⚠️ Backend integration needed

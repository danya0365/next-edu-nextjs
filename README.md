# 🎓 Next Edu - แพลตฟอร์มการเรียนรู้ออนไลน์สำหรับเด็ก

แพลตฟอร์มการศึกษาออนไลน์ที่ออกแบบมาเพื่อเด็กและผู้เริ่มต้น มีคอร์สเรียนหลากหลายสาขา ระบบ Gamification และติดตามความก้าวหน้า

![Status](https://img.shields.io/badge/Status-Production_Ready-green)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-cyan)

## ✨ Features

### 🎯 Core Features
- **13 หน้าสมบูรณ์** - Landing, Courses, Learn, Profile, Dashboard และอื่นๆ
- **Dark Mode** - รองรับโหมดมืดทั้งระบบ
- **Responsive Design** - ใช้งานได้ทุกอุปกรณ์
- **Gamification** - Achievements, Leaderboard, Points, Levels
- **Clean Architecture** - Presenter Pattern, SOLID Principles
- **Type Safety** - TypeScript ทั้งหมด

### 📚 Pages
1. Landing Page - หน้าแรก
2. Browse Courses - ค้นหาคอร์ส
3. Course Detail - รายละเอียดคอร์ส
4. Learn/Player - หน้าเรียน
5. Login/Register - ระบบสมาชิก
6. Profile - โปรไฟล์
7. Student Dashboard - แดชบอร์ด
8. Achievements - ความสำเร็จ
9. Leaderboard - กระดานคะแนน
10. About - เกี่ยวกับเรา
11. Contact - ติดต่อเรา
12. FAQ - คำถามที่พบบ่อย
13. และอื่นๆ...

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm หรือ yarn

### Installation

```bash
# Clone repository
git clone <repository-url>
cd next-edu-nextjs

# Install dependencies
npm install
# or
yarn install

# Run development server
npm run dev
# or
yarn dev
```

เปิดเบราว์เซอร์ที่ [http://localhost:3000](http://localhost:3000)

### Mock Login
```
Email: mind@example.com
Password: password123
```

## 📁 Project Structure

```
next-edu-nextjs/
├── app/                    # Next.js App Router
│   ├── (landing)/         # Landing page
│   ├── courses/           # Course pages
│   ├── learn/             # Learning pages
│   ├── dashboard/         # Dashboard pages
│   └── ...
├── src/
│   ├── domain/            # Entities & Types
│   ├── presentation/      # Components & Presenters
│   │   ├── components/   # UI Components
│   │   ├── presenters/   # Business Logic
│   │   └── stores/       # Zustand Stores
│   └── data/
│       ├── master/       # Master Data
│       └── mock/         # Mock Data
├── public/               # Static assets
└── supabase/            # Supabase migrations (future)
```

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **State Management:** Zustand + localforage
- **Icons:** Lucide React
- **Database:** Supabase (ready for integration)
- **Auth:** Supabase Auth (ready for integration)

## 📖 Documentation

- **[TODO.md](./TODO.md)** - Project roadmap and tasks
- **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - Complete project summary
- **[CREATE_PAGE_PATTERN.md](./prompt/CREATE_PAGE_PATTERN.md)** - Page creation template
- **[TODO_FEATURES.md](./TODO_FEATURES.md)** - Detailed features

## 🎨 Design System

### Colors
- Primary: Blue (#3B82F6)
- Secondary: Purple (#9333EA)
- Success: Green (#10B981)
- Warning: Orange (#F59E0B)
- Error: Red (#EF4444)

### Components
- Atomic Design structure
- Reusable components
- TypeScript interfaces
- Dark mode support

## 🔄 Development

### Build
```bash
npm run build
```

### Lint
```bash
npm run lint
```

### Type Check
```bash
npx tsc --noEmit
```

## 🚢 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import to Vercel
3. Deploy automatically

### Environment Variables
```env
# Supabase (when ready)
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## 📊 Status

- **Frontend:** ✅ 95% Complete
- **Backend:** 🔄 Ready for integration
- **Video Player:** 🔄 UI ready, needs implementation
- **Quiz System:** 🔄 Data ready, needs UI
- **Payment:** ⏳ Pending

## 🎯 Next Steps

1. Supabase integration
2. Video player implementation
3. Quiz system UI
4. Instructor dashboard
5. Payment integration

## 🤝 Contributing

This is a portfolio/demo project. Not accepting contributions at this time.

## 📄 License

Private project. All rights reserved.

## 👨‍💻 Author

**Marosdee Uma**
- Portfolio: [your-portfolio-url]
- GitHub: [@your-github]

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS

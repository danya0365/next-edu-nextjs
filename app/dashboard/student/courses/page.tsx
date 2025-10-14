import { MyCoursesView } from "@/src/presentation/components/my-courses/MyCoursesView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "คอร์สของฉัน | Next Edu",
  description: "ดูคอร์สที่คุณลงทะเบียน ติดตามความคืบหน้า และเรียนต่อจากที่ค้าง",
};

export default async function MyCoursesPage() {
  return <MyCoursesView />;
}

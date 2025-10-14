import { FaqView } from "@/src/presentation/components/faq/FaqView";
import { ServerFaqPresenterFactory } from "@/src/presentation/presenters/faq/FaqPresenter";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "คำถามที่พบบ่อย | Next Edu",
  description:
    "คำถามและคำตอบที่พบบ่อยเกี่ยวกับ Next Edu แพลตฟอร์มการเรียนรู้ออนไลน์ คอร์สเรียน การชำระเงิน และอื่นๆ",
};

export default async function FaqPage() {
  try {
    const initialViewModel = await ServerFaqPresenterFactory.create();

    return <FaqView initialViewModel={initialViewModel} />;
  } catch (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            เกิดข้อผิดพลาด
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {error instanceof Error ? error.message : "ไม่สามารถโหลดข้อมูลได้"}
          </p>
        </div>
      </div>
    );
  }
}

import { ContactView } from "@/src/presentation/components/contact/ContactView";
import { ServerContactPresenterFactory } from "@/src/presentation/presenters/contact/ContactPresenter";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ติดต่อเรา | Next Edu",
  description:
    "ติดต่อทีมงาน Next Edu สำหรับคำถาม ข้อสงสัย หรือความช่วยเหลือใดๆ เราพร้อมให้บริการตลอด 24 ชั่วโมง",
};

export default async function ContactPage() {
  try {
    const initialViewModel = await ServerContactPresenterFactory.create();

    return <ContactView initialViewModel={initialViewModel} />;
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

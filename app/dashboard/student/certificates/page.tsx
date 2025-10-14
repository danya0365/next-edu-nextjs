import { CertificatesView } from "@/src/presentation/components/certificates/CertificatesView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ใบประกาศนียบัตร | Next Edu",
  description: "ดูและดาวน์โหลดใบประกาศนียบัตรของคุณจากคอร์สที่เรียนจบแล้ว",
};

export default async function CertificatesPage() {
  return <CertificatesView />;
}

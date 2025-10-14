import {
  AlertTriangle,
  CheckCircle,
  FileText,
  Scale,
  XCircle,
} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ข้อกำหนดการใช้งาน | Next Edu",
  description: "ข้อกำหนดและเงื่อนไขการใช้บริการของ Next Edu",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-2xl">
              <FileText className="w-12 h-12 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            ข้อกำหนดการใช้งาน
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            เงื่อนไขการใช้บริการของ Next Edu
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            มีผลบังคับใช้ตั้งแต่: 14 ตุลาคม 2025
          </p>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 space-y-8">
          {/* Introduction */}
          <section>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg mb-6">
              <p className="text-gray-700 dark:text-gray-300">
                ยินดีต้อนรับสู่ <strong>Next Edu</strong>!
                โปรดอ่านข้อกำหนดและเงื่อนไขการใช้บริการอย่างละเอียด
                การใช้บริการของเราถือว่าคุณยอมรับข้อกำหนดเหล่านี้ทั้งหมด
              </p>
            </div>
          </section>

          {/* Section 1 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                1. การยอมรับข้อกำหนด
              </h2>
            </div>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                ด้วยการเข้าถึงและใช้บริการของ Next Edu
                คุณตกลงที่จะปฏิบัติตามข้อกำหนดเหล่านี้
                และนโยบายความเป็นส่วนตัวของเรา
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  คุณต้องมีอายุอย่างน้อย 13 ปี หรือมีความยินยอมจากผู้ปกครอง
                </li>
                <li>คุณต้องให้ข้อมูลที่ถูกต้องและเป็นจริง</li>
                <li>คุณต้องรักษาความปลอดภัยของบัญชีของคุณ</li>
                <li>คุณรับทราบว่าเราอาจเปลี่ยนแปลงข้อกำหนดได้</li>
              </ul>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Scale className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                2. บัญชีผู้ใช้
              </h2>
            </div>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                <strong>การสร้างบัญชี:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>คุณสามารถสร้างบัญชีได้ 1 บัญชีต่อ 1 อีเมล</li>
                <li>ห้ามแบ่งปันบัญชีกับบุคคลอื่น</li>
                <li>คุณต้องรักษารหัสผ่านเป็นความลับ</li>
                <li>คุณรับผิดชอบต่อกิจกรรมทั้งหมดภายใต้บัญชีของคุณ</li>
              </ul>
              <p className="mt-4">
                <strong>การระงับบัญชี:</strong>
              </p>
              <p>
                เราขอสงวนสิทธิ์ในการระงับหรือยกเลิกบัญชีที่ฝ่าฝืนข้อกำหนด
                โดยไม่ต้องแจ้งให้ทราบล่วงหน้า
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                3. การใช้บริการ
              </h2>
            </div>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                <strong>สิทธิ์ในการใช้งาน:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>เนื้อหาทั้งหมดเป็นทรัพย์สินของ Next Edu</li>
                <li>คุณได้รับสิทธิ์แบบไม่เฉพาะในการเข้าถึงเนื้อหา</li>
                <li>สิทธิ์นี้ไม่สามารถโอนได้</li>
                <li>สิทธิ์นี้มีผลตลอดระยะเวลาที่คุณชำระเงินครบถ้วน</li>
              </ul>
              <p className="mt-4">
                <strong>การใช้งานที่เหมาะสม:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>ใช้เพื่อการศึกษาและพัฒนาตนเองเท่านั้น</li>
                <li>ห้ามดาวน์โหลดเนื้อหาเพื่อแจกจ่าย</li>
                <li>ห้ามนำเนื้อหาไปใช้เชิงพาณิชย์</li>
                <li>ห้าม reverse engineer, decompile, หรือ disassemble</li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                4. การชำระเงินและการคืนเงิน
              </h2>
            </div>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                <strong>ราคา:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>ราคาแสดงเป็นบาทไทย (THB) รวม VAT 7%</li>
                <li>เราขอสงวนสิทธิ์ในการเปลี่ยนแปลงราคา</li>
                <li>ราคาที่เปลี่ยนแปลงจะไม่ส่งผลกับการซื้อที่ทำไปแล้ว</li>
              </ul>
              <p className="mt-4">
                <strong>นโยบายการคืนเงิน:</strong>
              </p>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <p className="font-medium text-green-800 dark:text-green-200 mb-2">
                  ✓ คุณสามารถขอคืนเงินได้ภายใน 7 วัน หากเข้าเงื่อนไขต่อไปนี้:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                  <li>ยังไม่เข้าเรียนเกิน 30% ของคอร์ส</li>
                  <li>ยังไม่ผ่านการทดสอบใดๆ</li>
                  <li>ไม่มีพฤติกรรมที่ฝ่าฝืนข้อกำหนด</li>
                </ul>
              </div>
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg mt-4">
                <p className="font-medium text-red-800 dark:text-red-200 mb-2">
                  ✗ ไม่สามารถขอคืนเงินได้ในกรณีต่อไปนี้:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                  <li>เกินกำหนด 7 วันนับจากวันซื้อ</li>
                  <li>เข้าเรียนมากกว่า 30% ของคอร์ส</li>
                  <li>ได้รับใบประกาศนียบัตรแล้ว</li>
                  <li>คอร์สโปรโมชั่นหรือฟรี</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                5. พฤติกรรมที่ห้าม
              </h2>
            </div>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>คุณตกลงที่จะไม่:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>แชร์บัญชีหรือข้อมูลการเข้าสู่ระบบ</li>
                <li>ดาวน์โหลด, บันทึก, หรือแจกจ่ายเนื้อหา</li>
                <li>ใช้ bot, script, หรือเครื่องมืออัตโนมัติ</li>
                <li>ละเมิดลิขสิทธิ์หรือทรัพย์สินทางปัญญา</li>
                <li>โพสต์เนื้อหาที่ไม่เหมาะสม หรือหมิ่นประมาท</li>
                <li>รบกวนหรือขัดขวางการทำงานของระบบ</li>
                <li>พยายามเข้าถึงระบบโดยไม่ได้รับอนุญาต</li>
                <li>ใช้บริการเพื่อวัตถุประสงค์ที่ผิดกฎหมาย</li>
              </ul>
            </div>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              6. ทรัพย์สินทางปัญญา
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                เนื้อหาทั้งหมดใน Next Edu (วิดีโอ, ข้อความ, รูปภาพ, เสียง, โค้ด,
                โลโก้, เครื่องหมายการค้า) เป็นทรัพย์สินของ Next Edu
                หรือผู้ให้อนุญาต
              </p>
              <p>
                การใช้เนื้อหาโดยไม่ได้รับอนุญาตถือเป็นการละเมิดลิขสิทธิ์
                และอาจมีความผิดทางอาญา
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              7. การจำกัดความรับผิด
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                <strong>ข้อจำกัด:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>บริการให้ &quot;ตามสภาพที่เป็น&quot; (AS IS)</li>
                <li>เราไม่รับประกันว่าบริการจะไม่มีข้อผิดพลาด</li>
                <li>เราไม่รับผิดชอบต่อความเสียหายจากการใช้บริการ</li>
                <li>เราไม่รับผิดชอบต่อเนื้อหาจากผู้ใช้งานอื่น</li>
              </ul>
              <p className="mt-4">
                ความรับผิดสูงสุดของเราจำกัดอยู่ที่จำนวนเงินที่คุณชำระให้เราในช่วง
                12 เดือนที่ผ่านมา
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              8. การเปลี่ยนแปลงข้อกำหนด
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                เราขอสงวนสิทธิ์ในการเปลี่ยนแปลงข้อกำหนดเหล่านี้ได้ทุกเมื่อ
                โดยจะแจ้งให้คุณทราบผ่านทางอีเมลหรือประกาศบนเว็บไซต์
              </p>
              <p>
                การใช้บริการต่อไปหลังมีการเปลี่ยนแปลงถือว่าคุณยอมรับข้อกำหนดใหม่
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              9. กฎหมายที่ใช้บังคับ
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                ข้อกำหนดนี้อยู่ภายใต้กฎหมายของประเทศไทย ข้อพิพาทใดๆ
                จะได้รับการยุติโดยศาลไทยที่มีเขตอำนาจ
              </p>
            </div>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              10. ติดต่อเรา
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>หากคุณมีคำถามเกี่ยวกับข้อกำหนดการใช้งาน:</p>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
                <p>
                  <strong>บริษัท:</strong> Next Edu Thailand Co., Ltd.
                </p>
                <p>
                  <strong>อีเมล:</strong>{" "}
                  <a
                    href="mailto:legal@nextedu.com"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    legal@nextedu.com
                  </a>
                </p>
                <p>
                  <strong>โทร:</strong> 02-XXX-XXXX
                </p>
                <p>
                  <strong>ที่อยู่:</strong> 123 ถนนสุขุมวิท แขวงคลองเตย กรุงเทพฯ
                  10110
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Acceptance */}
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl text-center">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            การใช้บริการของ Next Edu
            แสดงว่าคุณได้อ่านและยอมรับข้อกำหนดเหล่านี้แล้ว
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            อัพเดทล่าสุด: 14 ตุลาคม 2025
          </p>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center space-y-4">
          <p className="text-gray-600 dark:text-gray-400">อ่านเพิ่มเติม</p>
          <div className="flex justify-center gap-4">
            <Link
              href="/privacy"
              className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:shadow-md transition-all font-medium"
            >
              นโยบายความเป็นส่วนตัว
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              ติดต่อเรา
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

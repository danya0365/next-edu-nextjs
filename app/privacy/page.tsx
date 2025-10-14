import { Shield, Lock, Eye, Database, Mail, AlertCircle } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'นโยบายความเป็นส่วนตัว | Next Edu',
  description: 'นโยบายความเป็นส่วนตัวและการคุ้มครองข้อมูลส่วนบุคคลของ Next Edu',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-2xl">
              <Shield className="w-12 h-12 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            นโยบายความเป็นส่วนตัว
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            ข้อมูลของคุณปลอดภัยกับเรา
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            อัพเดทล่าสุด: 14 ตุลาคม 2025
          </p>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 space-y-8">
          {/* Section 1 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Database className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                1. ข้อมูลที่เราเก็บรวบรวม
              </h2>
            </div>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                เราเก็บรวบรวมข้อมูลเพื่อให้บริการที่ดีที่สุดแก่คุณ ข้อมูลที่เราเก็บรวบรวม
                ได้แก่:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>ข้อมูลส่วนตัว:</strong> ชื่อ, อีเมล, เบอร์โทรศัพท์, วันเกิด, รูปโปรไฟล์
                </li>
                <li>
                  <strong>ข้อมูลการศึกษา:</strong> ชื่อโรงเรียน, ระดับชั้น, ความสนใจ
                </li>
                <li>
                  <strong>ข้อมูลการใช้งาน:</strong> ประวัติการเรียน, ความคืบหน้า, คะแนน, ความสำเร็จ
                </li>
                <li>
                  <strong>ข้อมูลทางเทคนิค:</strong> IP Address, Browser, Device, Cookies
                </li>
                <li>
                  <strong>ข้อมูลการชำระเงิน:</strong> ประวัติการสั่งซื้อ (เราไม่เก็บข้อมูลบัตรเครดิต)
                </li>
              </ul>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Eye className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                2. วิธีการใช้ข้อมูล
              </h2>
            </div>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>เราใช้ข้อมูลของคุณเพื่อวัตถุประสงค์ดังต่อไปนี้:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>จัดการบัญชีและให้บริการที่คุณขอ</li>
                <li>ปรับปรุงและพัฒนาคอร์สเรียนให้เหมาะสมกับคุณ</li>
                <li>ส่งการแจ้งเตือนเกี่ยวกับคอร์สเรียน</li>
                <li>วิเคราะห์พฤติกรรมการเรียนรู้เพื่อปรับปรุงประสบการณ์</li>
                <li>ดำเนินการชำระเงินและออกใบเสร็จ</li>
                <li>ป้องกันการฉ้อโกงและรักษาความปลอดภัย</li>
                <li>ปฏิบัติตามกฎหมายและข้อบังคับ</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <Lock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                3. การรักษาความปลอดภัย
              </h2>
            </div>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>เราให้ความสำคัญกับความปลอดภัยของข้อมูลของคุณเป็นอย่างยิ่ง:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>การเข้ารหัส:</strong> ใช้ SSL/TLS encryption สำหรับการส่งข้อมูล
                </li>
                <li>
                  <strong>การยืนยันตัวตน:</strong> ระบบ Two-Factor Authentication (2FA)
                </li>
                <li>
                  <strong>การจัดเก็บ:</strong> เก็บข้อมูลใน Secure Cloud Servers
                </li>
                <li>
                  <strong>การเข้าถึง:</strong> จำกัดการเข้าถึงเฉพาะพนักงานที่จำเป็น
                </li>
                <li>
                  <strong>การสำรองข้อมูล:</strong> Backup ข้อมูลเป็นประจำ
                </li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                4. การแบ่งปันข้อมูล
              </h2>
            </div>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>เราจะไม่แบ่งปันข้อมูลส่วนบุคคลของคุณ ยกเว้นในกรณีต่อไปนี้:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>ด้วยความยินยอม:</strong> เมื่อคุณให้ความยินยอมอย่างชัดเจน
                </li>
                <li>
                  <strong>ผู้ให้บริการ:</strong> เช่น Payment Gateway, Cloud Hosting
                  (ภายใต้สัญญารักษาความลับ)
                </li>
                <li>
                  <strong>ตามกฎหมาย:</strong> เมื่อมีคำสั่งศาลหรือหน่วยงานราชการ
                </li>
                <li>
                  <strong>ครู/ผู้สอน:</strong> เฉพาะข้อมูลที่จำเป็นสำหรับการสอน
                </li>
              </ul>
              <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                <p className="text-amber-800 dark:text-amber-200 font-medium">
                  ⚠️ เราจะไม่ขายข้อมูลส่วนบุคคลของคุณให้กับบุคคลที่สาม
                </p>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg">
                <AlertCircle className="w-5 h-5 text-pink-600 dark:text-pink-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                5. สิทธิของคุณ
              </h2>
            </div>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>ภายใต้ พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล (PDPA) คุณมีสิทธิ์:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>เข้าถึง:</strong> ขอดูข้อมูลส่วนบุคคลที่เราเก็บ
                </li>
                <li>
                  <strong>แก้ไข:</strong> ขอแก้ไขข้อมูลที่ไม่ถูกต้อง
                </li>
                <li>
                  <strong>ลบ:</strong> ขอลบข้อมูลของคุณ (ภายใต้เงื่อนไข)
                </li>
                <li>
                  <strong>คัดค้าน:</strong> คัดค้านการประมวลผลข้อมูล
                </li>
                <li>
                  <strong>โอนย้าย:</strong> ขอรับข้อมูลในรูปแบบที่อ่านได้ด้วยเครื่อง
                </li>
                <li>
                  <strong>ถอนความยินยอม:</strong> ถอนความยินยอมเมื่อใดก็ได้
                </li>
              </ul>
              <p className="mt-4">
                หากต้องการใช้สิทธิ์ใดๆ โปรดติดต่อเราที่{' '}
                <a
                  href="mailto:privacy@nextedu.com"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  privacy@nextedu.com
                </a>
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              6. Cookies และเทคโนโลยีติดตาม
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>เราใช้ Cookies และเทคโนโลยีที่คล้ายกัน เพื่อ:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>จดจำการเข้าสู่ระบบ</li>
                <li>บันทึกความชอบของคุณ (เช่น Dark Mode)</li>
                <li>วิเคราะห์การใช้งานเว็บไซต์</li>
                <li>ปรับปรุงประสบการณ์การใช้งาน</li>
              </ul>
              <p>คุณสามารถจัดการ Cookies ผ่านการตั้งค่าเบราว์เซอร์ของคุณได้</p>
            </div>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              7. การเปลี่ยนแปลงนโยบาย
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                เราอาจปรับปรุงนโยบายความเป็นส่วนตัวนี้เป็นครั้งคราว
                เราจะแจ้งให้คุณทราบถึงการเปลี่ยนแปลงที่สำคัญผ่านทางอีเมลหรือประกาศบนเว็บไซต์
              </p>
              <p>
                การใช้บริการของเราต่อไปหลังจากมีการเปลี่ยนแปลง
                ถือว่าคุณยอมรับนโยบายที่แก้ไขแล้ว
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              8. ติดต่อเรา
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>หากคุณมีคำถามเกี่ยวกับนโยบายความเป็นส่วนตัว โปรดติดต่อเราที่:</p>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
                <p>
                  <strong>บริษัท:</strong> Next Edu Thailand Co., Ltd.
                </p>
                <p>
                  <strong>อีเมล:</strong>{' '}
                  <a
                    href="mailto:privacy@nextedu.com"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    privacy@nextedu.com
                  </a>
                </p>
                <p>
                  <strong>โทร:</strong> 02-XXX-XXXX
                </p>
                <p>
                  <strong>ที่อยู่:</strong> 123 ถนนสุขุมวิท แขวงคลองเตย กรุงเทพฯ 10110
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            อ่านเพิ่มเติมในเอกสารอื่นๆ
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/terms"
              className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:shadow-md transition-all font-medium"
            >
              ข้อกำหนดการใช้งาน
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              ติดต่อเรา
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

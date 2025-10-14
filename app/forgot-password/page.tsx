import { ArrowLeft, CheckCircle, Mail } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ลืมรหัสผ่าน | Next Edu",
  description: "รีเซ็ตรหัสผ่านของคุณ - Next Edu",
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Back Link */}
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>กลับไปหน้าเข้าสู่ระบบ</span>
        </Link>

        {/* Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-2xl">
              <Mail className="w-12 h-12 text-blue-600 dark:text-blue-400" />
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              ลืมรหัสผ่าน?
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              ไม่ต้องกังวล! กรอกอีเมลของคุณ เราจะส่งลิงก์รีเซ็ตรหัสผ่านให้คุณ
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                อีเมล
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
            >
              ส่งลิงก์รีเซ็ตรหัสผ่าน
            </button>
          </form>

          {/* Instructions */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex gap-3">
              <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-700 dark:text-gray-300">
                <p className="font-semibold mb-1">ขั้นตอนการรีเซ็ตรหัสผ่าน:</p>
                <ol className="list-decimal list-inside space-y-1 text-gray-600 dark:text-gray-400">
                  <li>กรอกอีเมลที่ใช้ลงทะเบียน</li>
                  <li>เช็คอีเมลและคลิกลิงก์ที่เราส่งไป</li>
                  <li>ตั้งรหัสผ่านใหม่</li>
                  <li>เข้าสู่ระบบด้วยรหัสผ่านใหม่</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Help */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ไม่ได้รับอีเมล?{" "}
              <button className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                ส่งอีกครั้ง
              </button>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              ต้องการความช่วยเหลือ?{" "}
              <Link
                href="/contact"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                ติดต่อเรา
              </Link>
            </p>
          </div>
        </div>

        {/* Alternative */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            จำรหัสผ่านได้แล้ว?{" "}
            <Link
              href="/login"
              className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              เข้าสู่ระบบ
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

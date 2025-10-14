'use client';

import Link from 'next/link';
import { BookOpen, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    courses: [
      { label: 'คอร์สทั้งหมด', href: '/courses' },
      { label: 'โปรแกรมมิ่ง', href: '/courses?category=programming' },
      { label: 'วิทยาศาสตร์', href: '/courses?category=science' },
      { label: 'คณิตศาสตร์', href: '/courses?category=mathematics' },
      { label: 'ศิลปะ', href: '/courses?category=art' },
    ],
    about: [
      { label: 'เกี่ยวกับเรา', href: '/about' },
      { label: 'ครูผู้สอน', href: '/instructors' },
      { label: 'ติดต่อเรา', href: '/contact' },
      { label: 'คำถามที่พบบ่อย', href: '/faq' },
      { label: 'บทความ', href: '/blog' },
    ],
    policy: [
      { label: 'นโยบายความเป็นส่วนตัว', href: '/privacy' },
      { label: 'ข้อกำหนดการใช้งาน', href: '/terms' },
      { label: 'นโยบายการคืนเงิน', href: '/refund' },
      { label: 'นโยบายคุกกี้', href: '/cookies' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
  ];

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <BookOpen className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Next Edu
              </span>
            </Link>
            <p className="text-gray-400 mb-4 max-w-sm">
              แพลตฟอร์มเรียนออนไลน์สำหรับเด็ก เรียนรู้ผ่านเกม กิจกรรม และครูมืออาชีพ
              สร้างอนาคตที่สดใสด้วยการศึกษาที่สนุกสนาน
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:contact@nextedu.com" className="hover:text-blue-400 transition-colors">
                  contact@nextedu.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+66123456789" className="hover:text-blue-400 transition-colors">
                  02-123-4567
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>กรุงเทพมหานคร, ประเทศไทย</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 dark:bg-gray-900 rounded-full hover:bg-blue-600 dark:hover:bg-blue-600 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Courses Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">หมวดหมู่คอร์ส</h3>
            <ul className="space-y-2">
              {footerLinks.courses.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">เกี่ยวกับ</h3>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policy Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">นโยบาย</h3>
            <ul className="space-y-2">
              {footerLinks.policy.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 dark:border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} Next Edu. All rights reserved. 🎓
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <Link href="/sitemap" className="hover:text-blue-400 transition-colors">
                Sitemap
              </Link>
              <Link href="/accessibility" className="hover:text-blue-400 transition-colors">
                Accessibility
              </Link>
              <Link href="/careers" className="hover:text-blue-400 transition-colors">
                Careers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

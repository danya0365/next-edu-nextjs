import { Navbar } from "@/src/presentation/components/layout/Navbar";
import { Footer } from "@/src/presentation/components/layout/Footer";
import type { Metadata } from "next";
import "../public/styles/index.css";

export const metadata: Metadata = {
  title: "Next Edu | แพลตฟอร์มเรียนออนไลน์สำหรับเด็ก",
  description:
    "แพลตฟอร์มเรียนออนไลน์ที่สนุกและเหมาะสำหรับเด็กๆ เรียนรู้ผ่านเกม กิจกรรม และครูผู้สอนมืออาชีพ พัฒนาทักษะในศตวรรษที่ 21",
  keywords: [
    "เรียนออนไลน์",
    "คอร์สเด็ก",
    "โปรแกรมมิ่ง",
    "วิทยาศาสตร์",
    "คณิตศาสตร์",
    "Next Edu",
    "online learning",
    "kids education",
    "programming for kids",
    "STEM education",
  ],
  authors: [{ name: "Next Edu Team" }],
  creator: "Marosdee Uma",
  publisher: "Next Edu",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon.ico" },
    ],
    shortcut: ["/favicon/favicon.ico"],
    apple: ["/favicon/apple-touch-icon.png"],
  },
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    title: "Next Edu | แพลตฟอร์มเรียนออนไลน์สำหรับเด็ก",
    description:
      "เรียนรู้อย่างสนุกสนานกับคอร์สออนไลน์มากมาย พัฒนาทักษะในศตวรรษที่ 21",
    type: "website",
    siteName: "Next Edu",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Next Edu - Online Learning Platform for Kids",
      },
    ],
    locale: "th_TH",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className="antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

"use client";

import type { ProfileViewModel } from "@/src/presentation/presenters/profile/ProfilePresenter";
import { useAuthStore } from "@/src/presentation/stores/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { InstructorProfileView } from "./InstructorProfileView";
import { ProfileView } from "./ProfileView";

interface ProfileViewSelectorProps {
  initialViewModel?: ProfileViewModel;
}

/**
 * ProfileViewSelector - ตรวจสอบ role ของ user และแสดง View ที่เหมาะสม
 * - Student role → แสดง ProfileView
 * - Instructor role → แสดง InstructorProfileView
 */
export function ProfileViewSelector({
  initialViewModel,
}: ProfileViewSelectorProps) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const { user, isAuthenticated } = useAuthStore();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated && isMounted) {
      router.push("/login");
    }
  }, [isAuthenticated, router, isMounted]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Show loading state
  if (!isMounted || !isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            กำลังโหลด...
          </h1>
        </div>
      </div>
    );
  }

  // Render appropriate view based on role
  if (user.role === "instructor") {
    return <InstructorProfileView initialViewModel={initialViewModel} />;
  }

  // Default to student profile view
  return <ProfileView initialViewModel={initialViewModel} />;
}

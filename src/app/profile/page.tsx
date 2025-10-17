"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user?._id) {
        //  Redirect logged-in user to their profile page
        router.replace(`/profile/${user._id}`);
      } else {
        // Not logged in — redirect to login or show message
        router.replace("/login");
      }
    }
  }, [user, loading, router]);

  return (
    <p className="text-center mt-20 text-gray-400">
      {loading ? "Loading..." : "Redirecting..."}
    </p>
  );
}

"use client";

import { useEffect, useState } from "react";
import UserProfile from "@/components/profile/UserProfile";
import { UserAPI } from "@/api/user";
import { UserProfile as UserProfileType } from "@/types";

export default function MyProfilePage() {
  const [user, setUser] = useState<UserProfileType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        const data = await UserAPI.getProfile();
        setUser(data);
      } catch (error) {
        console.error("❌ Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyProfile();
  }, []);

  if (loading)
    return (
      <p className="text-center mt-20 text-gray-400">Loading profile...</p>
    );

  if (!user)
    return <p className="text-center mt-20 text-gray-400">User not found.</p>;

  return <UserProfile user={user} editable={true} />;
}

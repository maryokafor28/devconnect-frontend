"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import UserProfile from "@/components/profile/UserProfile";
import type { UserProfile as UserProfileType } from "@/types";
import { useAuth } from "@/context/AuthProvider"; // 👈 make sure this exists

export default function PublicProfilePage() {
  const { id } = useParams();
  const { user: loggedInUser } = useAuth();
  const [user, setUser] = useState<UserProfileType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`/api/users/${id}`);
        if (!res.ok) throw new Error("Failed to fetch user profile");
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProfile();
  }, [id]);

  if (loading)
    return (
      <p className="text-center mt-20 text-gray-400">Loading profile...</p>
    );

  if (!user)
    return <p className="text-center mt-20 text-gray-400">User not found.</p>;

  // ✅ Editable only if current logged-in user matches profile ID
  const isEditable: boolean | undefined = loggedInUser
    ? loggedInUser._id === id
    : undefined;

  return <UserProfile user={user} editable={isEditable} />;
}

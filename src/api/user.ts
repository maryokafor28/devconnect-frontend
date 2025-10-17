// src/api/UserAPI.ts
import { apiFetch } from "@/lib/api";
import { UserProfile } from "@/types";

export const UserAPI = {
  // ✅ Get logged-in user profile
  getProfile: () => apiFetch<UserProfile>("/api/users/me"),

  // ✅ Update logged-in user profile
  updateProfile: (data: Partial<UserProfile>) =>
    apiFetch<UserProfile>("/api/users/me", {
      method: "PUT",
      body: data,
    }),
};

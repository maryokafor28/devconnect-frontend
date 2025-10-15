import { apiFetch } from "@/lib/api";
import { AuthResponse, LoginData, RegisterData, User } from "@/types";

export const AuthAPI = {
  register: (data: RegisterData) =>
    apiFetch<AuthResponse>("/auth/register", { method: "POST", body: data }),

  login: (data: LoginData) =>
    apiFetch<AuthResponse>("/auth/login", { method: "POST", body: data }),

  logout: () => apiFetch<void>("/auth/logout", { method: "POST" }),

  getCurrentUser: () => apiFetch<User>("/auth/me"),
};

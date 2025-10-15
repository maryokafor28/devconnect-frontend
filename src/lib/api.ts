import { RequestOptions } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

/**
 * Generic API fetcher with automatic refresh retry logic.
 */
export async function apiFetch<T>(
  endpoint: string,
  options: RequestOptions = {},
  retry = true
): Promise<T> {
  const { method = "GET", headers = {}, body } = options;

  const finalHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...headers,
  };

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: finalHeaders,
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
  });

  // 🔁 Handle expired access token (401)
  if (res.status === 401 && retry) {
    const refreshRes = await fetch(`${BASE_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });

    if (refreshRes.ok) {
      // Retry original request once
      return apiFetch<T>(endpoint, options, false);
    }

    // Refresh failed — throw session error
    throw new Error("Session expired. Please log in again.");
  }

  // ❌ Handle non-OK responses
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `API Error: ${res.status}`);
  }

  // ✅ Handle empty responses
  if (res.status === 204 || res.headers.get("content-length") === "0") {
    return {} as T;
  }

  return (await res.json()) as T;
}

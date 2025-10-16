// lib/api.ts
import { RequestOptions } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BASE_URL) {
  throw new Error("❌ NEXT_PUBLIC_API_BASE_URL is not defined in .env.local");
}

export async function apiFetch<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  console.log("🔍 Full URL being called:", url); // Add this line

  console.log("🔍 Fetching:", url);

  const res = await fetch(url, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
    credentials: "include",
  });

  // Parse response
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    // ✅ Extract message from your backend error format
    const errorMessage = data.message || `API Error: ${res.status}`;
    throw new Error(errorMessage);
  }

  return data as T;
}

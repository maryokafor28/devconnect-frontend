// lib/api.ts
import { RequestOptions } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BASE_URL) {
  throw new Error("❌ NEXT_PUBLIC_API_BASE_URL is not defined in .env.local");
}

// 🔄 Helper to refresh the access token
async function refreshAccessToken(): Promise<void> {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/refresh`, {
      method: "POST",
      credentials: "include", // include cookies for refresh
    });

    if (!res.ok) {
      throw new Error("Failed to refresh token");
    }

    console.log("🔑 Access token refreshed successfully");
  } catch (err) {
    console.error("❌ Token refresh failed:", err);
    throw new Error("Session expired — please log in again");
  }
}

export async function apiFetch<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;

  // 🧠 Log only in development
  if (process.env.NODE_ENV === "development") {
    console.log("➡️ Fetching:", url);
    if (options.method) console.log("🧾 Method:", options.method);
  }

  // 🔹 Function to make the actual request
  const makeRequest = async (): Promise<{ res: Response; data: unknown }> => {
    const res = await fetch(url, {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
      credentials: "include", // send cookies
    });

    let data: unknown = {};
    try {
      data = await res.json();
    } catch {
      data = {};
    }

    return { res, data };
  };

  // 🧩 First attempt
  let { res, data } = await makeRequest();

  // 🔁 If access token expired, try to refresh once
  if (res.status === 401) {
    console.warn("⚠️ Access token expired. Attempting refresh...");
    try {
      await refreshAccessToken();
      // Retry original request after successful refresh
      ({ res, data } = await makeRequest());
    } catch (err) {
      console.error("❌ Token refresh failed. User must re-login.");
      throw err;
    }
  }

  // Handle final errors
  if (!res.ok) {
    const message =
      data && typeof data === "object" && "message" in data
        ? (data as Record<string, unknown>)["message"]
        : undefined;
    const errorMessage =
      typeof message === "string" && message.length > 0
        ? message
        : `API Error: ${res.status}`;
    throw new Error(errorMessage);
  }

  // ✅ Return typed data
  return data as T;
}

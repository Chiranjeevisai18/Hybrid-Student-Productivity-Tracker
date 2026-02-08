const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export const apiFetch = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const text = await res.text();

  // IMPORTANT: safer JSON parsing
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("Invalid server response");
  }

  if (!res.ok) {
    throw new Error(data.message || "API Error");
  }

  return data;
};

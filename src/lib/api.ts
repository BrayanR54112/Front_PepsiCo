import { useAuthStore } from "../store/authStore";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "/api";

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const { token } = useAuthStore.getState();
  
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const isJson = response.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    throw new Error(data?.error || "Error en la petición");
  }

  return data;
}

import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export function ProtectedRoute({ allowedRole }: { allowedRole?: "ADMIN" | "STORE_OWNER" }) {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    // Si es ADMIN y trata de ir a tienda, mandalo a /admin
    if (user.role === "ADMIN") return <Navigate to="/admin" replace />;
    // Si es tienda y trata de ir a admin, mandalo a /
    if (user.role === "STORE_OWNER") return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export function ProtectedRoute({ allowedRole }: { allowedRole?: "ADMIN" | "STORE_OWNER" }) {
  const { isAuthenticated, user, hasHydrated } = useAuthStore();

  
  if (!hasHydrated) {
    return <div>Loading...</div>; 
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    if (user.role === "ADMIN") return <Navigate to="/admin" replace />;
    if (user.role === "STORE_OWNER") return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

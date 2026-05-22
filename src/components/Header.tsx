import { useLocation, useNavigate } from "react-router-dom";
import { Search, LogOut } from "lucide-react";
import { useMemo } from "react";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const title = useMemo(() => {
    switch (location.pathname) {
      case "/":
        return "Resumen General";
      case "/catalogo":
        return "Catálogo";
      case "/pedidos":
        return "Mis Pedidos";
      case "/carrito":
        return "Mi Carrito";
      case "/analiticas":
        return "Analíticas";
      case "/configuracion":
        return "Configuración";
      default:
        return "Dashboard Operativo";
    }
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    toast.success("Sesión cerrada");
    navigate("/login");
  };

  return (
    <header className="flex min-h-16 h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-8">
      <div className="flex items-center gap-4">
        <h2 className="text-sm font-semibold text-slate-500">
          Dashboard Operativo
        </h2>
        <span className="text-slate-300">/</span>
        <span className="text-sm font-medium text-slate-900">{title}</span>
      </div>
      <div className="flex items-center gap-6">
        <div className="relative flex items-center rounded-full bg-slate-100 px-4 py-1.5">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar pedidos o productos..."
            className="ml-2 bg-transparent text-xs focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col text-right">
            <span className="text-xs font-bold text-slate-900">{user?.name || "Tienda PEP"}</span>
            <span className="text-[10px] text-slate-500">{user?.role === "STORE_OWNER" ? "Dueño de Tienda" : "Admin"}</span>
          </div>
          <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-[#005CB4]/20 bg-[#005CB4]/10 flex items-center justify-center font-bold text-[#005CB4]">
            {user?.name?.[0]?.toUpperCase() || "T"}
            <div className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500"></div>
          </div>
          <button 
            onClick={handleLogout}
            className="ml-2 rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-red-500 transition-colors"
            title="Cerrar sesión"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}

import { NavLink } from "react-router-dom";
import { cn } from "../lib/utils";
import { LayoutDashboard, FileText, PieChart, LogOut } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

export function AdminSidebar() {
  const logout = useAuthStore((state) => state.logout);

  const navItems = [
    { name: "Overview", path: "/admin", icon: LayoutDashboard },
    { name: "Gestión de Pedidos", path: "/admin/pedidos", icon: FileText },
    { name: "Métricas Globales", path: "/admin/analiticas", icon: PieChart },
  ];

  const handleLogout = () => {
    logout();
    toast.success("Sesión cerrada");
  };

  return (
    <aside className="flex w-64 flex-col bg-slate-900 text-white shadow-xl">
      <div className="flex items-center gap-3 px-6 py-8">
        <div className="flex flex-col">
          <span className="text-xl font-bold tracking-tight text-white">PEPSICO ADMIN</span>
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-cyan-400">
            Control Center
          </span>
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/admin"}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition-colors",
                isActive
                  ? "bg-slate-800 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              )
            }
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>
      <div className="p-6">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300"
        >
          <LogOut className="h-5 w-5" />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}

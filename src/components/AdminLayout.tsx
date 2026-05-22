import { Outlet, useLocation } from "react-router-dom";
import { AdminSidebar } from "./AdminSidebar";
import { useMemo } from "react";
import { Shield } from "lucide-react";

export function AdminLayout() {
  const location = useLocation();

  const title = useMemo(() => {
    switch (location.pathname) {
      case "/admin":
        return "Resumen Ejecutivo";
      case "/admin/pedidos":
        return "Gestión de Pedidos";
      case "/admin/analiticas":
        return "Métricas y Desempeño";
      default:
        return "Admin Panel";
    }
  }, [location.pathname]);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-100 font-sans text-slate-900">
      <AdminSidebar />
      <main className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-8">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-semibold text-slate-500">
              Admin Ops
            </h2>
            <span className="text-slate-300">/</span>
            <span className="text-sm font-medium text-slate-900 drop-shadow-sm">{title}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1">
              <Shield className="h-4 w-4 text-orange-500" />
              <span className="text-xs font-bold text-orange-700">Modo Administrador</span>
            </div>
            <div className="h-8 w-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold shadow-sm">
              AD
            </div>
          </div>
        </header>
        
        {/* Content Viewport */}
        <div className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

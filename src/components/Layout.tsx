import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export function Layout() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50 font-sans text-slate-900">
      <Sidebar />
      <main className="flex flex-1 flex-col overflow-hidden">
        <Header />
        
        {/* Content Viewport */}
        <div className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </div>

        {/* Status Bar / Footer */}
        <footer className="flex h-10 shrink-0 items-center justify-between bg-slate-900 px-8 text-[10px] text-white/50">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500"></div>
              Conectado a Red PepsiCo Global
            </span>
            <span className="text-slate-700">|</span>
            <span>Versión: 2.4.0-production</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-medium">Cola de Sincronización: 0 items</span>
            <span className="rounded bg-white/10 px-2 py-0.5 font-semibold uppercase tracking-tighter">
              Modo Online
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
}

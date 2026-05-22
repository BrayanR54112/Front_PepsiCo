import { NavLink } from "react-router-dom";
import { cn } from "../lib/utils";
import { LayoutDashboard, ShoppingCart, FileText, PieChart, Settings, ShoppingBag } from "lucide-react";
import { useCartStore } from "../store/cartStore";

export function Sidebar() {
  const cartItemsCount = useCartStore((state) => state.items.length);

  const navItems = [
    { name: "Panel Principal", path: "/", icon: LayoutDashboard },
    { name: "Catálogo", path: "/catalogo", icon: ShoppingCart },
    { name: "Mis Pedidos", path: "/pedidos", icon: FileText },
    { name: "Mi Carrito", path: "/carrito", icon: ShoppingBag, badge: cartItemsCount },
    { name: "Analíticas", path: "/analiticas", icon: PieChart },
    { name: "Configuración", path: "/configuracion", icon: Settings },
  ];

  return (
    <aside className="flex w-64 flex-col bg-[#005CB4] text-white shadow-xl">
      <div className="flex items-center gap-3 px-6 py-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white font-black text-[#005CB4]">
          P
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold tracking-tight">PEPSICO</span>
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] opacity-70">
            B2B Portal
          </span>
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center justify-between rounded-lg px-4 py-3 text-sm font-semibold transition-colors",
                isActive
                  ? "bg-white/10 text-white"
                  : "font-medium opacity-70 hover:opacity-100"
              )
            }
          >
            <div className="flex items-center gap-3">
              <item.icon className="h-5 w-5" />
              {item.name}
            </div>
            {item.badge ? (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white">
                {item.badge}
              </span>
            ) : null}
          </NavLink>
        ))}
      </nav>
      <div className="p-6">
        <div className="rounded-xl bg-[#00b0ca]/20 p-4">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-cyan-400"></div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-200">
              Sincronizado SAP
            </span>
          </div>
          <p className="mt-1 text-[10px] opacity-60">Última act: Hace 2 min</p>
        </div>
      </div>
    </aside>
  );
}

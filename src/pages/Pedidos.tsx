import { useState } from "react";
import { Search, ChevronDown, Calendar } from "lucide-react";
import { cn } from "../lib/utils";
import { useOrdersStore } from "../store/ordersStore";

const getStatusBadge = (status: string) => {
  switch (status) {
    case "procesando":
      return <span className="rounded-full bg-cyan-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-700">Procesando</span>;
    case "enviado":
      return <span className="rounded-full bg-blue-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-700">En Camino</span>;
    case "pendiente":
      return <span className="rounded-full bg-orange-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-orange-700">Pendiente</span>;
    case "cancelado":
      return <span className="rounded-full bg-red-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-red-700">Cancelado</span>;
    case "entregado":
      return <span className="rounded-full bg-green-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-green-700">Entregado</span>;
    default:
      return <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-700">{status}</span>;
  }
};

export function Pedidos() {
  const [filter, setFilter] = useState("all");
  const orders = useOrdersStore((state) => state.orders);

  const filteredOrders = orders.filter(
    (o) => filter === "all" || o.status === filter
  );

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
          {[
            { id: "all", label: "Todos" },
            { id: "pendiente", label: "Pendientes" },
            { id: "procesando", label: "Procesando" },
            { id: "enviado", label: "En Camino" },
            { id: "entregado", label: "Completados" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={cn(
                "whitespace-nowrap rounded-lg px-4 py-2 text-xs font-bold transition-colors",
                filter === tab.id
                  ? "bg-white text-[#005CB4] shadow-sm"
                  : "text-slate-500 hover:bg-white/50 hover:text-slate-900"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-lg border border-slate-200 bg-white px-3 py-2">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por ID o cliente..."
              className="ml-2 bg-transparent text-sm focus:outline-none"
            />
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold hover:bg-slate-50">
            <Calendar className="h-4 w-4 text-slate-400" />
            Este mes
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Orders Table Container */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] border-collapse text-left">
            <thead className="border-b border-slate-100 bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-4">ID Pedido</th>
                <th className="px-6 py-4">Fecha</th>
                <th className="px-6 py-4">Items</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="group transition-colors hover:bg-slate-50">
                  <td className="px-6 py-4 font-mono font-bold text-[#005CB4]">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 text-slate-500">{order.date}</td>
                  <td className="px-6 py-4 text-slate-500">
                    {order.items.reduce((acc, curr) => acc + curr.quantity, 0) || Math.floor(Math.random() * 50) + 1} SKU
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900">
                    ${order.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-xs font-bold text-[#005CB4] opacity-0 transition-opacity group-hover:opacity-100">
                      Ver Detalle
                    </button>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    No hay pedidos que coincidan con los filtros.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
          <span className="text-xs text-slate-500">
            Mostrando <span className="font-bold text-slate-900">{filteredOrders.length}</span> pedidos
          </span>
          <div className="flex gap-1">
            <button className="rounded px-2 py-1 text-xs font-medium text-slate-400 hover:bg-slate-100">Anterior</button>
            <button className="rounded bg-[#005CB4] px-2 py-1 text-xs font-bold text-white">1</button>
            <button className="rounded px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100">2</button>
            <button className="rounded px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100">Siguiente</button>
          </div>
        </div>
      </div>
    </div>
  );
}

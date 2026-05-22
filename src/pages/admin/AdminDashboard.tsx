import { useOrdersStore } from "../../store/ordersStore";
import { Activity, Package, DollarSign, Clock } from "lucide-react";

export function AdminDashboard() {
  const orders = useOrdersStore((state) => state.orders);

  const totalRevenue = orders.reduce((acc, o) => acc + o.amount, 0);
  const pendingOrders = orders.filter((o) => o.status === "pendiente");
  
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <DollarSign className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Ingresos</div>
              <div className="mt-1 text-2xl font-black">${totalRevenue.toFixed(2)}</div>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Pendientes</div>
              <div className="mt-1 text-2xl font-black">{pendingOrders.length}</div>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <Package className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Pedidos</div>
              <div className="mt-1 text-2xl font-black">{orders.length}</div>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-900 p-6 text-white shadow-lg">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400">
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-white/60">Tiendas Activas</div>
              <div className="mt-1 text-2xl font-black">2</div>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-4">
          <h2 className="font-bold text-slate-900">Actividad Reciente</h2>
        </div>
        <div className="p-0">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Tienda</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Monto</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.slice(0, 5).map((o) => (
                <tr key={o.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-blue-600">{o.id}</td>
                  <td className="px-6 py-4 font-semibold">{o.storeName}</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase text-slate-600">
                      {o.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900">${o.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

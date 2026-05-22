import { useState } from "react";
import { useOrdersStore, OrderStatus } from "../../store/ordersStore";
import { Search } from "lucide-react";
import toast from "react-hot-toast";

export function AdminPedidos() {
  const { orders, updateStatus } = useOrdersStore();
  const [search, setSearch] = useState("");

  const filteredOrders = orders.filter(
    (o) =>
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.storeName.toLowerCase().includes(search.toLowerCase())
  );

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateStatus(orderId, newStatus);
    toast.success(`Estado actualizado a ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center rounded-lg border border-slate-200 bg-white px-3 py-2 w-full max-w-md">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por ID o tienda..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="ml-2 bg-transparent text-sm focus:outline-none w-full"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] border-collapse text-left">
            <thead className="border-b border-slate-100 bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-4">ID Pedido</th>
                <th className="px-6 py-4">Fecha</th>
                <th className="px-6 py-4">Tienda</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Cambiar Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="group transition-colors hover:bg-slate-50">
                  <td className="px-6 py-4 font-mono font-bold text-[#005CB4]">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 text-slate-500">{order.date}</td>
                  <td className="px-6 py-4 font-semibold text-slate-900">
                    {order.storeName}
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900">
                    ${order.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                      className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold uppercase text-slate-700 outline-none focus:border-[#005CB4]"
                    >
                      <option value="pendiente">Pendiente</option>
                      <option value="procesando">Procesando</option>
                      <option value="enviado">Enviado</option>
                      <option value="entregado">Entregado</option>
                      <option value="cancelado">Cancelado</option>
                    </select>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500">
                    No se encontraron pedidos.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

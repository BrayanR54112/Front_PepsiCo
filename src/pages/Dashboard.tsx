export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* KPI Section */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Ventas del Día
          </div>
          <div className="mt-2 text-2xl font-bold">$4,280.00</div>
          <div className="mt-1 text-[10px] font-bold text-green-600">
            +12.5% vs ayer
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Pedidos Pendientes
          </div>
          <div className="mt-2 text-2xl font-bold">18</div>
          <div className="mt-1 text-[10px] font-bold text-orange-500">
            4 urgentes
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Stock Crítico
          </div>
          <div className="mt-2 text-2xl font-bold">06 SKU</div>
          <div className="mt-1 text-[10px] font-bold text-red-500">
            Reponer Pepsi 1.5L
          </div>
        </div>
        <div className="rounded-2xl bg-[#005CB4] p-5 text-white shadow-lg">
          <div className="text-xs font-semibold uppercase tracking-wider text-white/70">
            Crédito Disponible
          </div>
          <div className="mt-2 text-2xl font-bold">$15,000.00</div>
          <div className="mt-1 text-[10px] font-bold text-cyan-300">
            Límite: $25k
          </div>
        </div>
      </div>

      {/* Main View Split */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Active Orders Table */}
        <div className="col-span-1 flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <h3 className="font-bold">Pedidos Recientes</h3>
            <button className="text-xs font-bold text-[#005CB4]">
              Ver historial
            </button>
          </div>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse text-left">
              <thead className="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-6 py-3">ID Pedido</th>
                  <th className="px-6 py-3">Comercio</th>
                  <th className="px-6 py-3">Monto</th>
                  <th className="px-6 py-3">Estado</th>
                  <th className="px-6 py-3">Sinc. ERP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                <tr className="cursor-pointer hover:bg-slate-50">
                  <td className="px-6 py-4 font-mono font-bold text-[#005CB4]">
                    #PO-9921
                  </td>
                  <td className="px-6 py-4 font-semibold">
                    Tienda "La Bendición"
                  </td>
                  <td className="px-6 py-4">$420.00</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-cyan-100 px-2 py-1 text-[10px] font-bold text-cyan-700">
                      Procesando
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-green-500">OK</td>
                </tr>
                <tr className="cursor-pointer hover:bg-slate-50">
                  <td className="px-6 py-4 font-mono font-bold text-[#005CB4]">
                    #PO-9918
                  </td>
                  <td className="px-6 py-4 font-semibold">Mini-Súper Juan</td>
                  <td className="px-6 py-4">$152.50</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-green-100 px-2 py-1 text-[10px] font-bold text-green-700">
                      En Camino
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-green-500">OK</td>
                </tr>
                <tr className="cursor-pointer hover:bg-slate-50">
                  <td className="px-6 py-4 font-mono font-bold text-[#005CB4]">
                    #PO-9915
                  </td>
                  <td className="px-6 py-4 font-semibold">
                    Abarrotes Doña Rosa
                  </td>
                  <td className="px-6 py-4">$890.00</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-orange-100 px-2 py-1 text-[10px] font-bold text-orange-700">
                      Pendiente
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-300">PEND</td>
                </tr>
                <tr className="cursor-pointer hover:bg-slate-50">
                  <td className="px-6 py-4 font-mono font-bold text-[#005CB4]">
                    #PO-9912
                  </td>
                  <td className="px-6 py-4 font-semibold">
                    Gourmet Market Express
                  </td>
                  <td className="px-6 py-4">$1,200.00</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-red-100 px-2 py-1 text-[10px] font-bold text-red-700">
                      Error Log
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-red-500">FAIL</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Inventory / Tracking Sidebar */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="mb-4 text-sm font-bold">Estado Logístico</h3>
            <div className="relative ml-2 space-y-6 border-l-2 border-slate-100 pl-6">
              <div className="relative">
                <div className="absolute -left-[33px] top-0 h-3 w-3 rounded-full border-2 border-white bg-[#005CB4]"></div>
                <p className="text-xs font-bold">Carga Validada</p>
                <p className="text-[10px] text-slate-400">
                  Centro de Dist. Sur • 08:45 AM
                </p>
              </div>
              <div className="relative opacity-50">
                <div className="absolute -left-[33px] top-0 h-3 w-3 rounded-full border-2 border-white bg-slate-200"></div>
                <p className="text-xs font-bold">En Ruta de Reparto</p>
                <p className="text-[10px] text-slate-400">
                  Camión #PE-302 • Pendiente
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-cyan-600 p-5 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold">Sugerencia IA</h3>
              <span className="rounded bg-white/20 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider">
                Basado en Stock
              </span>
            </div>
            <p className="mt-3 text-xs leading-relaxed opacity-90">
              El producto <b>Gatorade Blue 500ml</b> está bajo mínimos en la zona
              Noroeste. Sugerimos reposición de 20 cajas.
            </p>
            <button className="mt-4 w-full rounded-lg bg-white py-2 text-xs font-bold text-cyan-700 shadow-sm transition-colors hover:bg-slate-50">
              Añadir al Pedido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

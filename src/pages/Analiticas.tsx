import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { ArrowUpRight, ArrowDownRight, Activity, TrendingUp, Users } from "lucide-react";

const REVENUE_DATA = [
  { name: "Lun", value: 4000 },
  { name: "Mar", value: 3000 },
  { name: "Mié", value: 5000 },
  { name: "Jue", value: 2780 },
  { name: "Vie", value: 8890 },
  { name: "Sáb", value: 2390 },
  { name: "Dom", value: 3490 },
];

const SALES_DATA = [
  { name: "Bebidas", value: 85 },
  { name: "Snacks", value: 65 },
  { name: "Galletas", value: 45 },
  { name: "Promos", value: 30 },
];

export function Analiticas() {
  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold">Rendimiento Semanal</h2>
          <p className="text-xs text-slate-500">
            Del 16 al 22 de Octubre, 2023
          </p>
        </div>
        <button className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-bold shadow-sm hover:bg-slate-50">
          Descargar Reporte
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Ingresos Totales
              </div>
              <div className="mt-1 text-2xl font-black">$29,550</div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs font-bold text-green-600">
            <ArrowUpRight className="h-4 w-4" />
            <span>+14.5% vs semana anterior</span>
          </div>
        </div>
        
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Pedidos Procesados
              </div>
              <div className="mt-1 text-2xl font-black">1,204</div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs font-bold text-red-500">
            <ArrowDownRight className="h-4 w-4" />
            <span>-2.1% vs semana anterior</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Nuevos Clientes B2B
              </div>
              <div className="mt-1 text-2xl font-black">48</div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs font-bold text-green-600">
            <ArrowUpRight className="h-4 w-4" />
            <span>+12 nuevos registros</span>
          </div>
        </div>
      </div>

      {/* Charts List */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="col-span-1 min-h-[400px] rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-2">
          <h3 className="mb-6 font-bold">Evolución de Ingresos</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={REVENUE_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => [`$${value}`, 'Ingresos']}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#005CB4"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#005CB4', strokeWidth: 0 }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-span-1 min-h-[400px] rounded-2xl border border-slate-200 bg-white p-6">
          <h3 className="mb-6 font-bold">Ventas por Categoría</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SALES_DATA} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 600 }} />
                <Tooltip
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" fill="#00b0ca" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

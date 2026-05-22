import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Save, Bell, Shield, Smartphone, LogOut } from "lucide-react";
import { cn } from "../lib/utils";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const profileSchema = z.object({
  fullName: z.string().min(2, "Mínimo 2 caracteres"),
  email: z.string().email("Correo inválido"),
  company: z.string().min(2, "Mínimo 2 caracteres"),
  phone: z.string().min(10, "Teléfono inválido"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function Configuracion() {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user?.name || "Juan Pérez",
      email: user?.email || "juan.perez@tiendabenedicion.com",
      company: user?.name || 'Tienda "La Bendición"',
      phone: "5512345678",
    },
  });

  const onSubmit = (data: ProfileFormValues) => {
    console.log("Form data:", data);
    toast.success("Configuración guardada exitosamente");
  };

  const handleLogout = () => {
    logout();
    toast.success("Sesión cerrada");
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Sidebar Settings List */}
        <div className="col-span-1 space-y-1">
          {[
            { id: "profile", label: "Perfil de Usuario", icon: Shield, active: true },
            { id: "notifications", label: "Notificaciones", icon: Bell, active: false },
            { id: "offline", label: "Conectividad Offline", icon: Smartphone, active: false },
          ].map((item) => (
            <button
              key={item.id}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition-colors",
                item.active
                  ? "bg-white text-[#005CB4] shadow-sm"
                  : "text-slate-500 hover:bg-white/50"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </button>
          ))}
          <div className="pt-4">
            <button 
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
            >
              <LogOut className="h-5 w-5" />
              Cerrar Sesión
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="col-span-1 min-h-[400px] rounded-2xl border border-slate-200 bg-white p-8 md:col-span-2">
          <h2 className="mb-6 text-xl font-bold">Perfil de Usuario</h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  {...register("fullName")}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-[#005CB4] focus:bg-white"
                />
                {errors.fullName && (
                  <p className="text-xs font-bold text-red-500">{errors.fullName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  {...register("email")}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-[#005CB4] focus:bg-white"
                />
                {errors.email && (
                  <p className="text-xs font-bold text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Nombre del Negocio
                </label>
                <input
                  type="text"
                  {...register("company")}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-[#005CB4] focus:bg-white"
                />
                {errors.company && (
                  <p className="text-xs font-bold text-red-500">{errors.company.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Teléfono de Contacto
                </label>
                <input
                  type="tel"
                  {...register("phone")}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-[#005CB4] focus:bg-white"
                />
                {errors.phone && (
                  <p className="text-xs font-bold text-red-500">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold">Autenticación de Dos Factores (2FA)</h3>
                  <p className="text-xs text-slate-500">Protege tu cuenta con seguridad adicional.</p>
                </div>
                <button type="button" className="rounded-full bg-slate-200 flex items-center h-6 w-11 px-1 transition-colors hover:bg-slate-300">
                  <div className="h-4 w-4 rounded-full bg-white shadow-sm"></div>
                </button>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                className="flex items-center gap-2 rounded-lg bg-[#005CB4] px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#004a91]"
              >
                <Save className="h-4 w-4" />
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

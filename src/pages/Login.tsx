import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    await login(email, password);

    const user = useAuthStore.getState().user;

    if (user?.role === "ADMIN") {
      navigate("/admin");
      toast.success("Bienvenido Administrador");
    } else {
      navigate("/");
      toast.success("Bienvenido a PepsiCo B2B");
    }

  } catch (error: any) {
    toast.error(error.message || "Error en login");
  }
};

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-50 font-sans">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
        <div className="bg-[#005CB4] px-8 py-10 text-center text-white">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl font-black text-[#005CB4]">
            P
          </div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight">PEPSICO</h1>
          <p className="text-xs font-medium uppercase tracking-[0.2em] opacity-80">
            B2B Portal
          </p>
        </div>
        <form onSubmit={handleLogin} className="p-8">
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">
                Correo Electrónico
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@pepsico.com o tienda@pepsico.com"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-colors focus:border-[#005CB4] focus:bg-white"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">
                Contraseña
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-colors focus:border-[#005CB4] focus:bg-white"
              />
            </div>
            <button
              type="submit"
              className="mt-6 flex w-full justify-center rounded-lg bg-[#005CB4] py-3 text-sm font-bold text-white transition-colors hover:bg-[#004a91]"
            >
              Iniciar Sesión
            </button>
          </div>
          
          <div className="mt-6 border-t border-slate-100 pt-6">
            <h3 className="text-xs font-bold text-slate-500">Cuentas de Prueba:</h3>
            <div className="mt-2 text-[10px] text-slate-400">
              <p>Admin: <span className="font-mono font-bold">admin@pepsico.com</span> / <span className="font-mono font-bold">admin123</span></p>
              <p className="mt-1">Tienda: <span className="font-mono font-bold">tienda@pepsico.com</span> / <span className="font-mono font-bold">tienda123</span></p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

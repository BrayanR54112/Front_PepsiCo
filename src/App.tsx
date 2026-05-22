/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Catalogo } from "./pages/Catalogo";
import { Pedidos } from "./pages/Pedidos";
import { Analiticas } from "./pages/Analiticas";
import { Configuracion } from "./pages/Configuracion";
import { Carrito } from "./pages/Carrito";
import { Login } from "./pages/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AdminLayout } from "./components/AdminLayout";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminPedidos } from "./pages/admin/AdminPedidos";
import { AdminAnaliticas } from "./pages/admin/AdminAnaliticas";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Store Owner Routes */}
          <Route path="/" element={<ProtectedRoute allowedRole="STORE_OWNER" />}>
            <Route element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="catalogo" element={<Catalogo />} />
              <Route path="pedidos" element={<Pedidos />} />
              <Route path="carrito" element={<Carrito />} />
              <Route path="analiticas" element={<Analiticas />} />
              <Route path="configuracion" element={<Configuracion />} />
            </Route>
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute allowedRole="ADMIN" />}>
            <Route element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="pedidos" element={<AdminPedidos />} />
              <Route path="analiticas" element={<AdminAnaliticas />} />
            </Route>
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

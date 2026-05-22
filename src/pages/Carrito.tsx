import { ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { useOrdersStore } from "../store/ordersStore";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function Carrito() {
  const cart = useCartStore();
  const addOrder = useOrdersStore((state) => state.addOrder);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const subtotal = cart.getTotal();
  const tax = subtotal * 0.16;
  const total = subtotal + tax;

  const handleCheckout = () => {
    if (cart.items.length === 0) return;
    
    addOrder({
      storeId: user?.id || "unknown",
      storeName: user?.name || "Tienda Desconocida",
      amount: total,
      items: cart.items.map((i) => ({
        productId: i.id,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
      })),
    });

    cart.clearCart();
    toast.success("Pedido realizado con éxito");
    navigate("/pedidos");
  };

  if (cart.items.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <ShoppingCart className="h-16 w-16 text-slate-200" />
        <h2 className="mt-4 text-lg font-bold text-slate-900">Tu carrito está vacío</h2>
        <p className="mt-2 text-sm text-slate-500">Agrega productos desde el catálogo para generar un nuevo pedido.</p>
        <button 
          onClick={() => navigate("/catalogo")}
          className="mt-6 rounded-lg bg-[#005CB4] px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#004a91]"
        >
          Ir al Catálogo
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="col-span-1 lg:col-span-2">
        <div className="rounded-2xl border border-slate-200 bg-white">
          <div className="border-b border-slate-100 px-6 py-4">
            <h2 className="font-bold text-slate-900">Productos en Carrito ({cart.items.length})</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {cart.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-6">
                <img src={item.image} alt={item.name} className="h-16 w-16 rounded-lg object-cover" />
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900">{item.name}</h3>
                  <p className="text-xs text-slate-500">${item.price.toFixed(2)} c/u</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center rounded-lg border border-slate-200">
                    <button 
                      onClick={() => item.quantity > 1 ? cart.updateQuantity(item.id, item.quantity - 1) : cart.removeItem(item.id)}
                      className="px-3 py-1 text-slate-500 hover:bg-slate-50"
                    >-</button>
                    <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                    <button 
                      onClick={() => cart.updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 text-slate-500 hover:bg-slate-50"
                    >+</button>
                  </div>
                  <div className="w-20 text-right font-bold text-[#005CB4]">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <button 
                    onClick={() => {
                      cart.removeItem(item.id);
                      toast.success("Producto eliminado");
                    }}
                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="col-span-1">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sticky top-6">
          <h2 className="font-bold text-slate-900">Resumen del Pedido</h2>
          <div className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between text-slate-500">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>IVA (16%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="mt-4 flex justify-between border-t border-slate-100 pt-4 text-lg font-black text-slate-900">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <button 
            onClick={handleCheckout}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#005CB4] py-3 text-sm font-bold text-white transition-colors hover:bg-[#004a91]"
          >
            Realizar Pedido
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

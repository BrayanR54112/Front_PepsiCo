import { useState } from "react";
import { Search, Filter, ShoppingCart, AlertCircle } from "lucide-react";
import { cn } from "../lib/utils";
import { useProductsStore } from "../store/productsStore";
import { useCartStore } from "../store/cartStore";
import toast from "react-hot-toast";

export function Catalogo() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const products = useProductsStore((state) => state.products);
  const addItem = useCartStore((state) => state.addItem);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || p.category === category)
  );

  const handleAddToCart = (product: any) => {
    addItem(product, 1);
    toast.success(`${product.name} agregado al carrito`);
  };

  return (
    <div className="space-y-6">
      {/* Filters & Search */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          {["All", "Bebidas", "Snacks", "Promociones"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                "rounded-full px-4 py-1.5 text-xs font-bold transition-colors",
                category === cat
                  ? "bg-[#005CB4] text-white"
                  : "bg-white text-slate-500 hover:bg-slate-100"
              )}
            >
              {cat === "All" ? "Todos" : cat}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-lg border border-slate-200 bg-white px-3 py-2">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="ml-2 bg-transparent text-sm focus:outline-none"
            />
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-2 hover:bg-slate-50">
            <Filter className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-500">
            No se encontraron productos.
          </div>
        ) : (
          filtered.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:shadow-lg"
            >
              <div className="relative aspect-square overflow-hidden bg-slate-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover grayscale transition-transform duration-300 group-hover:scale-105 group-hover:grayscale-0"
                />
                {product.stock <= 10 && product.stock > 0 && (
                  <div className="absolute right-2 top-2 flex items-center gap-1 rounded bg-orange-100 px-2 py-1 text-[10px] font-bold text-orange-700">
                    <AlertCircle className="h-3 w-3" />
                    Poco stock
                  </div>
                )}
                {product.stock === 0 && (
                  <div className="absolute right-2 top-2 flex items-center gap-1 rounded bg-red-100 px-2 py-1 text-[10px] font-bold text-red-700">
                    Agotado
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-4">
                <div className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  {product.category}
                </div>
                <h3 className="mt-1 font-bold text-slate-900">{product.name}</h3>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-black text-[#005CB4]">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-slate-500">
                    Disp: {product.stock}
                  </span>
                </div>
                <button
                  disabled={product.stock === 0}
                  onClick={() => handleAddToCart(product)}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#005CB4] py-2 text-xs font-bold text-white transition-colors hover:bg-[#004a91] disabled:bg-slate-200 disabled:text-slate-400"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Agregar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

import { create } from 'zustand';
import { Product } from './cartStore';

interface ProductsState {
  products: Product[];
  updateStock: (productId: number, quantityToSubtract: number) => void;
}

const INITIAL_MOCK_PRODUCTS: Product[] = [
  { id: 1, name: "Pepsi Cola 1.5L", category: "Bebidas", price: 25.5, stock: 150, image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&q=80" },
  { id: 2, name: "Doritos Nacho Cheese", category: "Snacks", price: 18.0, stock: 320, image: "https://images.unsplash.com/photo-1599599810769-cfcd8af8247d?w=500&q=80" },
  { id: 3, name: "Gatorade Blue 500ml", category: "Bebidas", price: 22.0, stock: 10, image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&q=80" },
  { id: 4, name: "Lay's Clásicas", category: "Snacks", price: 17.5, stock: 45, image: "https://images.unsplash.com/photo-1599599810769-cfcd8af8247d?w=500&q=80" },
  { id: 5, name: "7UP 2L", category: "Bebidas", price: 24.0, stock: 0, image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&q=80" },
  { id: 6, name: "Cheetos Torciditos", category: "Snacks", price: 15.0, stock: 110, image: "https://images.unsplash.com/photo-1599599810769-cfcd8af8247d?w=500&q=80" },
  { id: 7, name: "Mirinda Naranja 600ml", category: "Bebidas", price: 15.0, stock: 80, image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&q=80" },
  { id: 8, name: "Promo Pack Fiestas", category: "Promociones", price: 120.0, stock: 25, image: "https://images.unsplash.com/photo-1599599810769-cfcd8af8247d?w=500&q=80" },
];

export const useProductsStore = create<ProductsState>()(
  (set) => ({
    products: INITIAL_MOCK_PRODUCTS,
    updateStock: (productId, quantityToSubtract) =>
      set((state) => ({
        products: state.products.map((p) =>
          p.id === productId ? { ...p, stock: Math.max(0, p.stock - quantityToSubtract) } : p
        ),
      })),
  })
);

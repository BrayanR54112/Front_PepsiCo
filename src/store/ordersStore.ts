import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type OrderStatus = 'pendiente' | 'procesando' | 'enviado' | 'entregado' | 'cancelado';

export interface OrderItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  storeId: string;
  storeName: string;
  amount: number;
  status: OrderStatus;
  date: string;
  items: OrderItem[];
}

interface OrdersState {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'date' | 'status'>) => void;
  updateStatus: (orderId: string, status: OrderStatus) => void;
}

const INITIAL_MOCK_ORDERS: Order[] = [
  { id: "#PO-9921", storeId: "tienda1", storeName: 'Tienda "La Bendición"', amount: 420.0, status: "procesando", date: "2023-10-25", items: [] },
  { id: "#PO-9918", storeId: "tienda1", storeName: "Mini-Súper Juan", amount: 152.5, status: "enviado", date: "2023-10-24", items: [] },
  { id: "#PO-9915", storeId: "tienda2", storeName: "Abarrotes Doña Rosa", amount: 890.0, status: "pendiente", date: "2023-10-24", items: [] },
];

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set) => ({
      orders: INITIAL_MOCK_ORDERS,
      addOrder: (partial) => {
        const newOrder: Order = {
          ...partial,
          id: `#PO-${Math.floor(1000 + Math.random() * 9000).toString()}`,
          status: 'pendiente',
          date: new Date().toISOString().split('T')[0],
        };
        set((state) => ({ orders: [newOrder, ...state.orders] }));
      },
      updateStatus: (id, status) => {
        set((state) => ({
          orders: state.orders.map((o) => (o.id === id ? { ...o, status } : o)),
        }));
      },
    }),
    { name: 'orders-storage' }
  )
);

import { orders, products } from '../lib/data.js';
import { authMiddleware } from '../lib/authMiddleware.js';
import { eventBus } from '../lib/events.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Validar sesión
  const user = authMiddleware(req, res);
  if (!user) return;

  // GET /api/orders
  if (req.method === 'GET') {
    let resultOrders = orders;
    
    // Si es STORE_OWNER, solo ve sus pedidos
    if (user.role === 'STORE_OWNER') {
      resultOrders = orders.filter(o => o.storeId === user.uid);
    }
    
    // Ordenar del más reciente al más antiguo
    resultOrders.sort((a, b) => new Date(b.date) - new Date(a.date));

    return res.status(200).json({
      success: true,
      data: resultOrders
    });
  }

  // POST /api/orders
  if (req.method === 'POST') {
    const { items, amount } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ success: false, error: 'Items requeridos' });
    }

    // Deducción de stock en memoria (simplificado)
    items.forEach(item => {
      const p = products.find(prod => prod.id === item.productId);
      if (p && p.stock >= item.quantity) {
        p.stock -= item.quantity;
      }
    });

    const newOrder = {
      id: `#PO-${Math.floor(1000 + Math.random() * 9000)}`,
      storeId: user.uid,
      storeName: user.name,
      amount: amount || items.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0),
      status: 'pendiente',
      date: new Date().toISOString(),
      items: items
    };

    orders.push(newOrder);

    // Emitir evento asíncrono simulado (no bloqueante)
    eventBus.emit('order_created', newOrder).catch(console.error);

    return res.status(201).json({
      success: true,
      data: newOrder
    });
  }

  return res.status(405).json({ success: false, error: 'Method not allowed' });
}

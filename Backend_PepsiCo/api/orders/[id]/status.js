import { orders } from '../../../lib/data.js';
import { authMiddleware } from '../../../lib/authMiddleware.js';
import { eventBus } from '../../../lib/events.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'PATCH') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  // Solo ADMIN puede cambiar estados
  const user = authMiddleware(req, res, ['ADMIN']);
  if (!user) return;

  // Extraer el :id de la ruta. En Vercel, [id].js permite acceder a req.query.id
  const { id } = req.query;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ success: false, error: 'Nuevo estado es requerido' });
  }

  const orderIndex = orders.findIndex(o => o.id === id);

  if (orderIndex === -1) {
    return res.status(404).json({ success: false, error: 'Pedido no encontrado' });
  }

  const oldStatus = orders[orderIndex].status;
  orders[orderIndex].status = status;
  orders[orderIndex].updatedAt = new Date().toISOString();

  // Emisión de evento status modificado
  eventBus.emit('order_status_updated', {
    orderId: id,
    oldStatus,
    newStatus: status,
    updatedBy: user.name
  }).catch(console.error);

  return res.status(200).json({
    success: true,
    data: orders[orderIndex]
  });
}

import { products } from '../lib/data.js';
import { authMiddleware } from '../lib/authMiddleware.js';

export default async function handler(req, res) {
  // CORS Helper
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  // Verifica token validando sesión (Cualquier rol puede ver productos)
  const user = authMiddleware(req, res);
  if (!user) return; // authMiddleware ya manda la respuesta si falla

  return res.status(200).json({
    success: true,
    data: products
  });
}

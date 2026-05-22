import { users } from '../../lib/data.js';
import { generateToken } from '../../lib/authMiddleware.js';

export default async function handler(req, res) {
  // CORS Helper
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'Email y password son requeridos' });
  }

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ success: false, error: 'Credenciales inválidas' });
  }

  const token = generateToken(user);

  return res.status(200).json({
    success: true,
    data: {
      token,
      user: {
        uid: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    }
  });
}

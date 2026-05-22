// Middleware manual simple basado en Base64 para simular JWT sin dependencias externas
export const generateToken = (user) => {
  const payload = {
    uid: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    exp: Date.now() + 1000 * 60 * 60 * 24 // 1 día
  };
  return Buffer.from(JSON.stringify(payload)).toString('base64');
};

export const authMiddleware = (req, res, allowRoles = []) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ success: false, error: 'No se proporcionó token de autenticación' });
    return null;
  }

  const token = authHeader.split(' ')[1];
  
  try {
    const payloadStr = Buffer.from(token, 'base64').toString('utf-8');
    const user = JSON.parse(payloadStr);

    if (user.exp < Date.now()) {
      res.status(401).json({ success: false, error: 'Token expirado' });
      return null;
    }

    if (allowRoles.length > 0 && !allowRoles.includes(user.role)) {
      res.status(403).json({ success: false, error: 'Acceso denegado: permisos insuficientes' });
      return null;
    }

    return user;
  } catch (error) {
    res.status(401).json({ success: false, error: 'Token inválido' });
    return null;
  }
};

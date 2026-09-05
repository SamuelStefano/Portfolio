import type { VercelRequest, VercelResponse } from '@vercel/node';
const firstHeader = (value: string | string[] | undefined): string | null => {
  if (!value) return null;
  const raw = Array.isArray(value) ? value[0] : value;
  return raw.split(',')[0].trim() || null;
};

// so x-vercel-forwarded-for: a Vercel sempre o define e sobrescreve.
// x-real-ip como fallback aceitaria um header forjado pelo cliente.
const getClientIp = (request: VercelRequest): string | null =>
  firstHeader(request.headers['x-vercel-forwarded-for']);

// nunca hardcodar: o repo e publico e isso e um IP residencial.
// sem a env var configurada o gate falha fechado, que e o default seguro.
const ALLOWED_IP = process.env.ADMIN_IP;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  try {
    const ip = getClientIp(req);

    const isAllowed = Boolean(ALLOWED_IP && ip === ALLOWED_IP);

    return res.status(200).json({ 
      allowed: isAllowed 
    });
  } catch (error) {
    console.error('Error in /api/check-access:', error);
    return res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
}


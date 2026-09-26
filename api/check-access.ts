import type { VercelRequest, VercelResponse } from '@vercel/node';
const firstHeader = (value: string | string[] | undefined): string | null => {
  if (!value) return null;
  const raw = Array.isArray(value) ? value[0] : value;
  return raw.split(',')[0].trim() || null;
};

// Only x-vercel-forwarded-for: Vercel always sets and overwrites it.
// Falling back to x-real-ip would accept a header forged by the client.
const getClientIp = (request: VercelRequest): string | null =>
  firstHeader(request.headers['x-vercel-forwarded-for']);

// Never hardcode it: the repo is public and this is a residential IP.
// Without the env var the gate fails closed, which is the safe default.
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


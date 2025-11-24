import type { VercelRequest, VercelResponse } from '@vercel/node';

const ALLOWED_IP = '201.55.183.70';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  try {
    const forwarded = req.headers['x-forwarded-for'];
    const ip = Array.isArray(forwarded)
      ? forwarded[0]
      : forwarded?.split(',')[0] || (req.socket as any)?.remoteAddress;

    const isAllowed = ip === ALLOWED_IP;

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


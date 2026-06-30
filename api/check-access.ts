import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getClientIp } from './lib/clientIp';

const ALLOWED_IP = '201.55.183.70';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  try {
    const ip = getClientIp(req);

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


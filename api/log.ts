import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const ALLOWED_IP = '201.55.183.70';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseServer = supabaseUrl && supabaseServiceRoleKey
  ? createClient(supabaseUrl, supabaseServiceRoleKey, {
      db: { schema: 'portfolio' },
      auth: { autoRefreshToken: false, persistSession: false }
    })
  : null;

const isSupabaseServerConfigured = () => {
  return !!supabaseUrl && !!supabaseServiceRoleKey;
};

const IP_NAMES: Record<string, string> = {
  "201.55.183.70": "Samuel",
  "131.100.63.23": "Íttalo",
  "187.109.205.55": "José",
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  try {
    const forwarded = req.headers['x-forwarded-for'];
    const ip = Array.isArray(forwarded)
      ? forwarded[0]
      : forwarded?.split(',')[0] || (req.socket as any)?.remoteAddress;

    if (ip !== ALLOWED_IP) {
      return res.status(403).json({ error: 'Not allowed' });
    }

    if (!isSupabaseServerConfigured() || !supabaseServer) {
      return res.status(500).json({ 
        error: 'Supabase not configured' 
      });
    }

    const { data, error } = await supabaseServer
      .from('visits')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(1000);

    if (error) {
      console.error('Error fetching visits:', error);
      return res.status(500).json({ 
        error: 'Error fetching visits from database' 
      });
    }

    const visitsWithNames = (data || []).map((visit: any) => ({
      ...visit,
      name: IP_NAMES[visit.ip] ?? null
    }));

    return res.status(200).json({
      total: visitsWithNames.length,
      visits: visitsWithNames
    });
  } catch (error: any) {
    console.error('Error in /api/log:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error?.message || 'Unknown error'
    });
  }
}


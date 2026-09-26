import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
// Inline on purpose: Vercel does not bundle relative imports inside api/, and the
// function dies with FUNCTION_INVOCATION_FAILED.
const firstHeader = (value: string | string[] | undefined): string | null => {
  if (!value) return null;
  const raw = Array.isArray(value) ? value[0] : value;
  return raw.split(',')[0].trim() || null;
};

// Only x-vercel-forwarded-for: Vercel always sets and overwrites it.
// Falling back to x-real-ip would accept a header forged by the client.
const getClientIp = (request: VercelRequest): string | null =>
  firstHeader(request.headers['x-vercel-forwarded-for']);

// The IP and the name map are personal data and the repo is public: both come from env.
// Without ADMIN_IP the gate denies everyone.
const ALLOWED_IP = process.env.ADMIN_IP;

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

// VISITOR_NAMES: JSON {"<ip>":"<nome>"}. Ausente = nenhum nome resolvido.
const IP_NAMES: Record<string, string> = (() => {
  try {
    return JSON.parse(process.env.VISITOR_NAMES || '{}');
  } catch {
    console.error('VISITOR_NAMES nao e um JSON valido; ignorando');
    return {};
  }
})();

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  try {
    const ip = getClientIp(req);

    if (!ALLOWED_IP || ip !== ALLOWED_IP) {
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

    const visitsWithNames = ((data ?? []) as Array<{ ip: string }>).map((visit) => ({
      ...visit,
      name: IP_NAMES[visit.ip] ?? null
    }));

    return res.status(200).json({
      total: visitsWithNames.length,
      visits: visitsWithNames
    });
  } catch (error) {
    console.error('Error in /api/log:', error);
    // never echo the upstream message: this endpoint talks to the database with the
    // service role, so its errors are information disclosure.
    return res.status(500).json({ error: 'Internal server error' });
  }
}


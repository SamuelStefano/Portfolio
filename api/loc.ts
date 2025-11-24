import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

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

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  try {
    const forwardedFor = request.headers['x-forwarded-for'];
    const ip = forwardedFor 
      ? (Array.isArray(forwardedFor) ? forwardedFor[0] : String(forwardedFor).split(',')[0].trim())
      : (request.headers['x-real-ip'] ? String(request.headers['x-real-ip']) : 'unknown');

    let gpsLocation: { lat: number; lon: number; accuracy?: number } | null = null;
    if (request.method === 'POST') {
      try {
        let body: any = {};
        if (typeof request.body === 'string') {
          body = JSON.parse(request.body);
        } else if (request.body) {
          body = request.body;
        }
        
        if (body.lat && body.lon && body.source === 'gps') {
          gpsLocation = {
            lat: parseFloat(String(body.lat)),
            lon: parseFloat(String(body.lon)),
            accuracy: body.accuracy ? parseFloat(String(body.accuracy)) : undefined
          };
        }
      } catch (e) {
      }
    }

    let location: {
      lat: string | number;
      lon: string | number;
      city: string;
      region: string;
      country: string;
      accuracy?: number;
      source: 'gps' | 'ip';
    } | null = null;
    
    let locationData = {
      city: 'UNKNOWN_LOCATION',
      region: 'UNKNOWN_LOCATION',
      country: 'UNKNOWN_LOCATION',
      lat: 'UNKNOWN_LOCATION',
      lon: 'UNKNOWN_LOCATION',
      accuracy: 'N/A',
      source: 'ip'
    };
    if (gpsLocation) {
      locationData = {
        lat: String(gpsLocation.lat),
        lon: String(gpsLocation.lon),
        city: 'GPS_LOCATION',
        region: 'GPS_LOCATION',
        country: 'GPS_LOCATION',
        accuracy: gpsLocation.accuracy ? `${gpsLocation.accuracy.toFixed(2)}m` : 'N/A',
        source: 'gps'
      };
      
      location = {
        lat: gpsLocation.lat,
        lon: gpsLocation.lon,
        city: 'GPS_LOCATION',
        region: 'GPS_LOCATION',
        country: 'GPS_LOCATION',
        accuracy: gpsLocation.accuracy,
        source: 'gps'
      };
    } else {
      try {
        const apiResponse = await fetch(
          `http://ip-api.com/json/${ip}?fields=status,message,lat,lon,city,region,country`,
          {
            headers: {
              'User-Agent': 'Mozilla/5.0'
            }
          }
        );

        if (apiResponse.ok) {
          const data = await apiResponse.json() as {
            status: string;
            lat?: number;
            lon?: number;
            city?: string;
            region?: string;
            country?: string;
          };
          
          if (data.status === 'success') {
            location = {
              lat: data.lat ?? 'UNKNOWN_LOCATION',
              lon: data.lon ?? 'UNKNOWN_LOCATION',
              city: data.city ?? 'UNKNOWN_LOCATION',
              region: data.region ?? 'UNKNOWN_LOCATION',
              country: data.country ?? 'UNKNOWN_LOCATION',
              source: 'ip'
            };
            locationData = {
              city: String(location.city),
              region: String(location.region),
              country: String(location.country),
              lat: String(location.lat),
              lon: String(location.lon),
              accuracy: 'N/A',
              source: 'ip'
            };
          }
        }
      } catch (error) {
        console.error('Error fetching location from ip-api.com:', error);
      }
    }
    
    const timestamp = new Date().toISOString();
    const logLine = `${timestamp} | ${ip} | ${locationData.source.toUpperCase()} | ${locationData.city} | ${locationData.region} | ${locationData.country} | ${locationData.lat} | ${locationData.lon} | Accuracy: ${locationData.accuracy}`;
    
    console.log('VISIT_LOG:', logLine);
    
    if (isSupabaseServerConfigured() && supabaseServer) {
      console.log('Using SERVICE_ROLE_KEY for Supabase (bypasses RLS)');
      
      try {
        const { error: insertError } = await supabaseServer
          .from('visits')
          .insert({
            timestamp: timestamp,
            ip: ip,
            source: locationData.source,
            city: locationData.city === 'UNKNOWN_LOCATION' || locationData.city === 'GPS_LOCATION' ? null : locationData.city,
            region: locationData.region === 'UNKNOWN_LOCATION' || locationData.region === 'GPS_LOCATION' ? null : locationData.region,
            country: locationData.country === 'UNKNOWN_LOCATION' || locationData.country === 'GPS_LOCATION' ? null : locationData.country,
            lat: locationData.lat === 'UNKNOWN_LOCATION' ? null : parseFloat(String(locationData.lat)),
            lon: locationData.lon === 'UNKNOWN_LOCATION' ? null : parseFloat(String(locationData.lon)),
            accuracy: locationData.accuracy === 'N/A' ? null : parseFloat(String(locationData.accuracy).replace('m', ''))
          });

        if (insertError) {
          console.error('Error saving to Supabase:', insertError);
        } else {
          console.log('Visit saved to Supabase successfully (portfolio.visits)');
        }
      } catch (supabaseError) {
        console.error('Error connecting to Supabase:', supabaseError);
      }
    } else {
      console.warn('Supabase server credentials not configured. SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.');
    }

    return response.status(200).json({
      ip,
      location: location || {
        lat: null,
        lon: null,
        city: null,
        region: null,
        country: null,
        source: 'ip'
      },
      source: location?.source || 'ip'
    });
  } catch (error: any) {
    console.error('Error in /api/loc:', error);
    return response.status(500).json({ 
      error: 'Internal server error',
      message: error?.message || 'Unknown error'
    });
  }
}

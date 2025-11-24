import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  try {
    const forwardedFor = request.headers['x-forwarded-for'];
    const ip = forwardedFor 
      ? (Array.isArray(forwardedFor) ? forwardedFor[0] : String(forwardedFor).split(',')[0].trim())
      : (request.headers['x-real-ip'] ? String(request.headers['x-real-ip']) : 'unknown');

    let location: {
      lat: string | number;
      lon: string | number;
      city: string;
      region: string;
      country: string;
    } | null = null;
    
    let locationData = {
      city: 'UNKNOWN_LOCATION',
      region: 'UNKNOWN_LOCATION',
      country: 'UNKNOWN_LOCATION',
      lat: 'UNKNOWN_LOCATION',
      lon: 'UNKNOWN_LOCATION'
    };

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
            country: data.country ?? 'UNKNOWN_LOCATION'
          };
          locationData = {
            city: String(location.city),
            region: String(location.region),
            country: String(location.country),
            lat: String(location.lat),
            lon: String(location.lon)
          };
        }
      }
    } catch (error) {
      console.error('Error fetching location from ip-api.com:', error);
    }
    
    const timestamp = new Date().toISOString();
    const logLine = `${timestamp} | ${ip} | ${locationData.city} | ${locationData.region} | ${locationData.country} | ${locationData.lat} | ${locationData.lon}`;
    
    console.log('VISIT_LOG:', logLine);

    return response.status(200).json({
      ip,
      location: location || {
        lat: null,
        lon: null,
        city: null,
        region: null,
        country: null
      }
    });
  } catch (error) {
    console.error('Error in /api/loc:', error);
    return response.status(500).json({ error: 'Internal server error' });
  }
}

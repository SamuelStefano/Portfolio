import { NextRequest, NextResponse } from 'next/server';
import { appendFile } from 'fs/promises';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    // Pegar o IP do header x-forwarded-for (primeiro IP da lista)
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor 
      ? forwardedFor.split(',')[0].trim() 
      : request.headers.get('x-real-ip') || 
        request.ip || 
        'unknown';

    let location = null;
    let locationData = {
      city: 'UNKNOWN_LOCATION',
      region: 'UNKNOWN_LOCATION',
      country: 'UNKNOWN_LOCATION',
      lat: 'UNKNOWN_LOCATION',
      lon: 'UNKNOWN_LOCATION'
    };

    try {
      // Fazer requisição ao ip-api.com
      const response = await fetch(
        `http://ip-api.com/json/${ip}?fields=status,message,lat,lon,city,region,country`,
        {
          headers: {
            'User-Agent': 'Mozilla/5.0'
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        
        if (data.status === 'success') {
          location = {
            lat: data.lat || 'UNKNOWN_LOCATION',
            lon: data.lon || 'UNKNOWN_LOCATION',
            city: data.city || 'UNKNOWN_LOCATION',
            region: data.region || 'UNKNOWN_LOCATION',
            country: data.country || 'UNKNOWN_LOCATION'
          };
          locationData = location;
        }
      }
    } catch (error) {
      console.error('Error fetching location from ip-api.com:', error);
    }

    // Salvar no arquivo visits.log
    const timestamp = new Date().toISOString();
    const logLine = `${timestamp} | ${ip} | ${locationData.city} | ${locationData.region} | ${locationData.country} | ${locationData.lat} | ${locationData.lon}\n`;
    
    const logPath = path.join(process.cwd(), 'visits.log');
    
    try {
      await appendFile(logPath, logLine, 'utf8');
    } catch (error) {
      console.error('Error writing to visits.log:', error);
    }

    return NextResponse.json({
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
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


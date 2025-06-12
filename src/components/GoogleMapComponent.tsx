'use client';

import { FC, useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface GoogleMapComponentProps {
  address: string;
  height?: string;
  width?: string;
  zoom?: number;
}

// Hardcoded coordinates for Schatzbogen 33, 81829 München
// In a production app, you would use a geocoding service to convert the address to coordinates
const COORDINATES = {
  lat: 48.12671,
  lng: 11.65577
};

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '0.5rem',
};

const GoogleMapComponent: FC<GoogleMapComponentProps> = ({
  address,
  height = '250px',
  width = '100%',
  zoom = 15
}) => {
  // Store the map instance
  const [map, setMap] = useState<google.maps.Map | null>(null);
  
  // Google Maps API key from environment variables
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
  
  // Callback when the map is loaded
  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);
  
  // Callback when the map is unmounted
  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);
  
  // If no API key is provided, show a static fallback
  if (!googleMapsApiKey || googleMapsApiKey === 'YOUR_GOOGLE_MAPS_API_KEY') {
    return (
      <div 
        style={{ height, width }} 
        className="flex items-center justify-center bg-blue-900/20 border border-blue-300/30 rounded-lg text-center p-4"
      >
        <div>
          <div className="text-sm text-blue-100">
            <a 
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-white transition-colors"
            >
              Auf Google Maps ansehen
            </a>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div style={{ height, width, overflow: 'hidden' }} className="border border-blue-300/30 rounded-lg shadow-inner">
      <LoadScript googleMapsApiKey={googleMapsApiKey}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={COORDINATES}
          zoom={zoom}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            zoomControl: true,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
          }}
        >
          <Marker position={COORDINATES} title={address} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default GoogleMapComponent;
'use client';

import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useCallback, useState } from 'react';

import { cn } from '@/shared/lib/utils';

import type { ComponentProps } from 'react';

interface MapProps extends Omit<ComponentProps<'div'>, 'children'> {
  latitude: number;
  longitude: number;
  zoom?: number;
  markerTitle?: string;
}

export default function Map({ latitude, longitude, zoom = 15, markerTitle, className, ...props }: MapProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  const [, setMap] = useState<google.maps.Map | null>(null);

  const center = { lat: latitude, lng: longitude };

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  if (!isLoaded) {
    return <div className={cn('bg-muted h-full w-full animate-pulse rounded-lg', className)} {...props} />;
  }

  return (
    <div className={cn('h-full w-full overflow-hidden rounded-lg', className)} {...props}>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          scrollwheel: false,
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: true,
        }}
      >
        <Marker position={center} title={markerTitle} />
      </GoogleMap>
    </div>
  );
}

'use client';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import { cn } from '@/shared/lib/utils';

import type { ComponentProps } from 'react';

// Fix for default marker icon in Next.js
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

interface MapProps extends Omit<ComponentProps<'div'>, 'children'> {
  latitude: number;
  longitude: number;
  zoom?: number;
  markerTitle?: string;
}

export default function Map({ latitude, longitude, zoom = 15, markerTitle, className, ...props }: MapProps) {
  // Unique key prevents "Map container is being reused" error in React StrictMode
  const mapKey = `map-${latitude}-${longitude}`;

  return (
    <div className={cn('h-full w-full overflow-hidden rounded-lg', className)} {...props}>
      <MapContainer
        key={mapKey}
        center={[latitude, longitude]}
        zoom={zoom}
        scrollWheelZoom={false}
        className='h-full w-full'
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Marker position={[latitude, longitude]}>{markerTitle && <Popup>{markerTitle}</Popup>}</Marker>
      </MapContainer>
    </div>
  );
}

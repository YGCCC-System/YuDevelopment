'use client';

import { useEffect, useRef } from 'react';
import type { Map as MapboxMap } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

// The four delivered communities (matches the project grid below the map).
const SITES = [
  { name: 'Platform Douglas', sub: '126 units · Douglas, GA', lng: -82.8499, lat: 31.5085 },
  { name: 'Platform Flint River', sub: '192 units · Bainbridge, GA', lng: -84.5755, lat: 30.9038 },
  { name: 'Platform Dothan', sub: '208 units · Dothan, AL', lng: -85.3905, lat: 31.2232 },
  { name: 'Platform Americus', sub: '80 units · Americus, GA', lng: -84.2326, lat: 32.0724 },
];

export default function ProjectMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapboxMap | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    if (!TOKEN) {
      console.warn('NEXT_PUBLIC_MAPBOX_TOKEN is not set — map cannot load.');
      return;
    }

    let cancelled = false;

    (async () => {
      // Dynamic import keeps mapbox-gl (and its window/WebGL access) client-only.
      const mapboxgl = (await import('mapbox-gl')).default;
      if (cancelled || !containerRef.current) return;

      mapboxgl.accessToken = TOKEN;
      const map = new mapboxgl.Map({
        container: containerRef.current,
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        center: [-84.0, 31.4],
        zoom: 5.6,
        cooperativeGestures: true,
        attributionControl: true,
      });
      mapRef.current = map;

      map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right');

      const bounds = new mapboxgl.LngLatBounds();
      for (const s of SITES) {
        const popup = new mapboxgl.Popup({ offset: 18, closeButton: false }).setHTML(
          `<strong>${s.name}</strong><br/>${s.sub}`,
        );
        new mapboxgl.Marker({ color: '#1F3A5C' })
          .setLngLat([s.lng, s.lat])
          .setPopup(popup)
          .addTo(map);
        bounds.extend([s.lng, s.lat]);
      }

      map.on('load', () => {
        map.fitBounds(bounds, { padding: 72, maxZoom: 8, duration: 0 });
      });
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return <div ref={containerRef} className="mapbox-canvas" style={{ width: '100%', height: '100%' }} />;
}

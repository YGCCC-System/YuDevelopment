'use client';

// Interactive project-locations map. Uses Leaflet (loaded from CDN) with Esri
// satellite imagery + place labels — no Mapbox account or API token required.
// Olive pins mark each delivered community; click one for a popup.
import { useEffect, useRef } from 'react';

const SITES = [
  { name: 'Platform Douglas', sub: '126 units · Douglas, GA', lat: 31.5085, lng: -82.8499, image: '/media/project-douglas.png', link: 'https://www.apartments.com/platform-douglas-douglas-ga/m0s6cwh/' },
  { name: 'Platform Dothan', sub: '208 units · Dothan, AL', lat: 31.2232, lng: -85.3905, image: '/media/project-dothan.png', link: 'https://www.apartments.com/platform-dothan-dothan-al/xc8d3rp/' },
  { name: 'Platform at Osigian Way', sub: '120 units · Warner Robins, GA', lat: 32.6130, lng: -83.6247, image: '/media/platform-osigian-way.jpg', link: 'https://www.apartments.com/the-platform-at-osigian-way-warner-robins-ga/0xxj2c1/' },
  { name: 'Platform Flint River', sub: '192 units · Bainbridge, GA', lat: 30.9038, lng: -84.5755, image: '/media/project-flint-river.png', link: 'https://www.apartments.com/platform-flint-river-bainbridge-ga/vy9r43f/' },
  { name: 'Platform Americus', sub: '80 units · Americus, GA', lat: 32.0724, lng: -84.2326, image: '/media/project-americus.png', link: 'https://www.apartments.com/platform-americus-americus-ga/vmg3fke/' },
  { name: 'Platform Dublin', sub: 'Dublin, GA', lat: 32.5404, lng: -82.9037, image: '/media/platform-dublin.jpg', link: 'https://www.apartments.com/platform-dublin-dublin-ga/jepvnm4/' },
];

const PIN_SVG =
  '<svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">' +
  '<path d="M15 0C6.7 0 0 6.7 0 15c0 10.7 15 25 15 25s15-14.3 15-25C30 6.7 23.3 0 15 0z" fill="#6E7B43" stroke="#F7F8FA" stroke-width="1.5"/>' +
  '<circle cx="15" cy="15" r="5.4" fill="#F7F8FA"/></svg>';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare global { interface Window { L?: any } }

function loadLeaflet(): Promise<any> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') return;
    if (window.L) return resolve(window.L);
    if (!document.querySelector('link[data-leaflet]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      link.setAttribute('data-leaflet', '');
      document.head.appendChild(link);
    }
    const existing = document.querySelector('script[data-leaflet]') as HTMLScriptElement | null;
    if (existing) { existing.addEventListener('load', () => resolve(window.L)); return; }
    const s = document.createElement('script');
    s.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    s.async = true;
    s.setAttribute('data-leaflet', '');
    s.onload = () => resolve(window.L);
    document.body.appendChild(s);
  });
}

export default function ProjectMap() {
  const ref = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;
    loadLeaflet().then((L) => {
      if (cancelled || !ref.current || mapRef.current || !L) return;

      const map = L.map(ref.current, { scrollWheelZoom: false, zoomControl: true });
      mapRef.current = map;

      // Esri satellite imagery
      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        { attribution: 'Tiles &copy; Esri', maxZoom: 18 },
      ).addTo(map);
      // Place / road labels on top
      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
        { maxZoom: 18, opacity: 0.9 },
      ).addTo(map);

      const icon = L.divIcon({
        className: 'yu-pin',
        html: PIN_SVG,
        iconSize: [30, 40],
        iconAnchor: [15, 40],
        popupAnchor: [0, -34],
      });

      const pts: [number, number][] = [];
      for (const s of SITES) {
        const html =
          `<a class="yu-pop" href="${s.link}" target="_blank" rel="noopener noreferrer">` +
          `<span class="yu-pop-img" style="background-image:url('${s.image}')"></span>` +
          `<span class="yu-pop-body">` +
          `<span class="yu-pop-name">${s.name}</span>` +
          `<span class="yu-pop-sub">${s.sub}</span>` +
          `<span class="yu-pop-cta">View listing &rarr;</span>` +
          `</span></a>`;
        L.marker([s.lat, s.lng], { icon })
          .addTo(map)
          .bindPopup(html, { maxWidth: 240, minWidth: 220, closeButton: true });
        pts.push([s.lat, s.lng]);
      }
      map.fitBounds(pts, { padding: [48, 48], maxZoom: 8 });
    });

    return () => {
      cancelled = true;
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }
    };
  }, []);

  return <div ref={ref} className="mapbox-canvas" style={{ width: '100%', height: '100%' }} />;
}

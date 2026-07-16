import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import CookieConsent from '@/components/CookieConsent';

const SITE_URL = 'https://yudevelopment.com';
const SITE_DESC =
  'A private development firm building attainable rental housing across the Southeast United States.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Yu Development',
  description: SITE_DESC,
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Yu Development',
    title: 'Yu Development',
    description: SITE_DESC,
    images: [
      {
        url: '/media/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Yu Development — attainable rental housing across the Southeast',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yu Development',
    description: SITE_DESC,
    images: ['/media/og-home.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&family=Newsreader:ital,opsz,wght@0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <CookieConsent />
        {/* Custom <image-slot> element + Sanity CMS hydration (and the
            Ctrl+Alt+. admin hotkey) — shared across every page. */}
        <Script src="/image-slot.js" strategy="afterInteractive" />
        <Script src="/site-data.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}

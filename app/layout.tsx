import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Yu Development',
  description:
    'A private development firm building attainable rental housing across the Southeast United States.',
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
        {/* Custom <image-slot> element + Sanity CMS hydration (and the
            Ctrl+Alt+. admin hotkey) — shared across every page. */}
        <Script src="/image-slot.js" strategy="afterInteractive" />
        <Script src="/site-data.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}

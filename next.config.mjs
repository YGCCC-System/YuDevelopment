/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // Serve the static admin SPA (public/admin/index.html) at a clean /admin URL.
      { source: '/admin', destination: '/admin/index.html' },
    ];
  },
  async redirects() {
    return [
      // Permanent Zoom meeting room (recurring, no fixed time, waiting room on).
      {
        source: '/zoom',
        destination:
          'https://us02web.zoom.us/j/84247742461?pwd=yaE9V9q0FGhq7ESWG3JfDXmUH7IiYb.1',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

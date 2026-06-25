/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // Serve the static admin SPA (public/admin/index.html) at a clean /admin URL.
      { source: '/admin', destination: '/admin/index.html' },
    ];
  },
};

export default nextConfig;

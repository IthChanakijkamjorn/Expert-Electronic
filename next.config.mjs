/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  // Printed QR codes still point at the old PHP site under /new/
  async redirects() {
    return [
      { source: '/new', destination: '/', permanent: true },
      { source: '/new/:path*', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;

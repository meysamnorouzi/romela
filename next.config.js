/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static hosting (cPanel): generate a fully static site in /out
  output: 'export',
  // Use folder-style URLs so Apache can serve index.html
  trailingSlash: true,
  images: {
    // next/image optimization requires a Node server; disable for static export
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig


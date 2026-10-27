/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Old Laravel URLs have no trailing slash (the old .htaccess 301s them away).
  trailingSlash: false,
  images: { unoptimized: true },
  reactStrictMode: true,
};
export default nextConfig;

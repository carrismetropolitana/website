/** @type {import('next').NextConfig} */

module.exports = {
  output: 'standalone',
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/paragens',
        destination: '/stops',
        permanent: true,
      },
    ];
  },
};

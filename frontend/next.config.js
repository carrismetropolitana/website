/** @type {import('next').NextConfig} */

module.exports = {
  output: 'standalone',
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/horarios',
        destination: '/lines',
        permanent: true,
      },
      {
        source: '/paragens',
        destination: '/stops',
        permanent: true,
      },
    ];
  },
};

/** @type {import('next').NextConfig} */

module.exports = {
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

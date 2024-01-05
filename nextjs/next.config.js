/* * */

const withNextIntl = require('next-intl/plugin')();

/* * */

module.exports = withNextIntl({
  output: 'standalone',
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.carrismetropolitana.pt',
        port: '',
      },
    ],
  },
  async redirects() {
    return [
      //
      { source: '/alerts', destination: '/alerts/all', permanent: true },
      { source: '/alertas', destination: '/alerts/all', permanent: true },
      //
      { source: '/', destination: '/stops', permanent: false },
      { source: '/stops', destination: '/stops/all', permanent: true },
      { source: '/paragens', destination: '/stops/all', permanent: true },
      //
      { source: '/lines', destination: '/lines/all', permanent: true },
      { source: '/horarios', destination: '/lines/all', permanent: true },
      //
      { source: '/vehicles', destination: '/vehicles/all', permanent: true },
      //
      { source: '/espacos-navegante', destination: '/encm', permanent: true },
      //
    ];
  },
});

/* * */

const withNextIntl = require('next-intl/plugin')();

/* * */

module.exports = withNextIntl({
  images: {
    remotePatterns: [
      {
        hostname: 'www.carrismetropolitana.pt',
        port: '',
        protocol: 'https',
      },
    ],
  },
  output: 'standalone',
  reactStrictMode: true,
  async redirects() {
    return [
      //
      { destination: '/alerts', permanent: true, source: '/alertas' },
      //
      { destination: '/stops/all', permanent: true, source: '/stops' },
      { destination: '/stops/all', permanent: true, source: '/paragens' },
      //
      { destination: '/lines/all', permanent: true, source: '/lines' },
      { destination: '/lines/all', permanent: true, source: '/horarios' },
      //
      { destination: '/vehicles/all', permanent: true, source: '/vehicles' },
      //
      { destination: '/encm', permanent: true, source: '/espacos-navegante' },
      //
      { destination: '/', permanent: true, source: '/pip' },
      //
    ]
  },
});

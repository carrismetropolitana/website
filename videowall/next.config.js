/* * */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNextIntl = require('next-intl/plugin')();

/* * */

module.exports = withNextIntl({
	output: 'standalone',
	reactStrictMode: true,
	async redirects() {
		return [
			{ destination: '/internal', permanent: true, source: '/' },
		];
	},
});

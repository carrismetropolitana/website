/* * */

import { withPayload } from '@payloadcms/next/withPayload';
import { type NextConfig } from 'next';

/* * */

const nextConfig: NextConfig = {
	basePath: '/admin',
	experimental: {
		serverActions: {
			bodySizeLimit: '4gb',
		},
	},
	async rewrites() {
		return [
			{
				destination: '/api/feeds/news',
				source: '/api/news.rss',
			},
		];
	},
	images: {
		remotePatterns: [
			{
				hostname: 'localhost',
				pathname: '/**',
				port: '49001',
				protocol: 'http',
			},
			{
				hostname: 'carrismetropolitana.pt',
				pathname: '/**',
				protocol: 'https',
			},
			{
				hostname: 'staging.carrismetropolitana.pt',
				pathname: '/**',
				protocol: 'https',
			},
			{
				hostname: '*.carrismetropolitana.pt',
				pathname: '/**',
				protocol: 'https',
			},
			{
				hostname: '*.oraclecloud.com',
				pathname: '/**',
				port: '',
				protocol: 'https',
			},
		],
	},
	output: 'standalone',
	reactStrictMode: true,
};

/* * */

export default withPayload(nextConfig);

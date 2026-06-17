/* * */

import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { type NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

/* * */

const nextConfig: NextConfig = {
	async headers() {
		return [
			{
				// Match everything except paths that contain a dot (e.g., .js, .png, .xml)
				// Also ignore _next/ and api/ paths. This essentially tries to match only regular pages (HTML and RSC).
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=60, stale-while-revalidate=120',
					},
				],
				source: '/((?!_next/|api/|.*\\..*).*)',
			},
			{
				// This matches static assets from the /public/assets directory. It is used to serve
				// images, fonts, and other static assets that are manually placed in the folder.
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=3600, stale-while-revalidate=120',
					},
				],
				source: '/assets/:path*',
			},
		];
	},

	images: {
		remotePatterns: [
			{
				hostname: '*.oraclecloud.com',
				port: '',
				protocol: 'https',
			},
			{
				hostname: 'backoffice.carrismetropolitana.pt',
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

			{
				// BACKOFFICE API
				// Please keep this block here as it is used to redirect requests
				// from the frontend to the backoffice API. This is only used while in development.
				// In production, since the API is hosted in the same domain, it is Nginx that handles
				// the actual redirection based on the /admin path.
				destination: `${getPublicVariable('server_url_backoffice')}/admin/:path*`,
				permanent: false,
				source: '/admin/:path*',
			},

			/* * */
			/* SCHEDULES */

			{ destination: '/lines', permanent: true, source: '/linhas' },
			{ destination: '/lines', permanent: true, source: '/horarios' },

			{ destination: '/stops', permanent: true, source: '/paragens' },

			{ destination: '/planner', permanent: true, source: '/planeador' },
			{ destination: '/planner', permanent: true, source: '/planear-viagem' },

			{ destination: '/alerts', permanent: true, source: '/alertas' },
			{ destination: '/alerts', permanent: true, source: '/avisos' },

			/* * */
			/* FARES */

			{ destination: '/tickets', permanent: true, source: '/tarifarios' },
			{ destination: '/tickets', permanent: true, source: '/bilhetes' },

			{ destination: '/cards', permanent: true, source: '/cartoes' },
			{ destination: '/cards', permanent: true, source: '/passes' },

			{ destination: '/helpdesks', permanent: true, source: '/comprar' },
			{ destination: '/helpdesks', permanent: true, source: '/onde-comprar' },

			/* * */
			/* SUPPORT */

			{ destination: '/faq', permanent: true, source: '/perguntas' },
			{ destination: '/faq', permanent: true, source: '/perguntas-frequentes' },

			{
				destination: '/lost-and-found',
				permanent: true,
				source: '/perdidos-e-achados',
			},

			{ destination: '/stores', permanent: true, source: '/encm' },
			{ destination: '/stores', permanent: true, source: '/lojas' },
			{ destination: '/stores', permanent: true, source: '/espacos-navegante' },

			{ destination: '/contacts', permanent: true, source: '/contactos' },
			{ destination: '/contacts', permanent: true, source: '/apoio' },

			/* * */
			/* MORE */

			{ destination: '/news', permanent: true, source: '/noticias' },

			{ destination: '/metrics', permanent: true, source: '/metricas' },

			{ destination: '/open-data', permanent: true, source: '/opendata' },
			{ destination: '/open-data', permanent: true, source: '/dados-abertos' },

			{ destination: '/about', permanent: true, source: '/sobre' },

			{ destination: '/vehicles', permanent: true, source: '/veiculos' },
			{ destination: '/vehicles', permanent: true, source: '/frota' },
			{ destination: '/news/inquerito-de-satisfaçao-ao-passageiro', permanent: true, source: '/resultados-inquerito-2025' },
			/* * */
			/* UNLISTED */

			{ destination: '/survey', permanent: true, source: '/inquerito' },

			{ destination: '/viagem-2024', permanent: true, source: '/viagem2024' },
			{ destination: '/retrospectiva-2025', permanent: true, source: '/retroespectiva-2025' },

			/* * */
			/* SCHOOLS */

			{
				destination: '/schools/:path*',
				permanent: false,
				source: '/escolas/:path*',
			},

			/* * */
			/* EXTERNAL */

			{
				destination:
					'https://open.spotify.com/user/31zy3uavd2sad4ozlwoze2usqmku',
				permanent: false,
				source: '/spotify',
			},

			{
				destination: 'https://forms.office.com/e/f6bs15vZYD',
				permanent: false,
				source: '/volley',
			},

			/* * */
			/* LEGACY */

			{
				destination: 'https://backoffice.carrismetropolitana.pt/imprensa',
				permanent: false,
				source: '/imprensa',
			},
			{
				destination: 'https://backoffice.carrismetropolitana.pt/embreveform',
				permanent: false,
				source: '/embreveform',
			},
			{
				destination: 'https://backoffice.carrismetropolitana.pt/knowledgebase',
				permanent: false,
				source: '/knowledgebase',
			},
			{
				destination: 'https://backoffice.carrismetropolitana.pt/viagemvirtual',
				permanent: false,
				source: '/viagemvirtual',
			},
			{
				destination: 'https://backoffice.carrismetropolitana.pt/participe',
				permanent: false,
				source: '/participe',
			},
			{
				destination: 'https://backoffice.carrismetropolitana.pt/motoristas',
				permanent: false,
				source: '/drivers',
			},
			{
				destination: 'https://backoffice.carrismetropolitana.pt/motoristas',
				permanent: false,
				source: '/motoristas',
			},
			{
				destination: 'https://backoffice.carrismetropolitana.pt/motoristas',
				permanent: false,
				source: '/recrutamento',
			},
			{
				destination: 'https://backoffice.carrismetropolitana.pt/novobanco',
				permanent: false,
				source: '/novobanco',
			},
			{
				destination: 'https://backoffice.carrismetropolitana.pt/praias-area1',
				permanent: false,
				source: '/praias-area1',
			},
			{
				destination: 'https://backoffice.carrismetropolitana.pt/praias-area2',
				permanent: false,
				source: '/praias-area2',
			},
			{
				destination: 'https://backoffice.carrismetropolitana.pt/praias-area3',
				permanent: false,
				source: '/praias-area3',
			},
			{
				destination: 'https://backoffice.carrismetropolitana.pt/praias-area4',
				permanent: false,
				source: '/praias-area4',
			},
			{
				destination: 'https://backoffice.carrismetropolitana.pt/freeport-pt',
				permanent: false,
				source: '/freeport-pt',
			},
			{
				destination: 'https://backoffice.carrismetropolitana.pt/freeport-en',
				permanent: false,
				source: '/freeport-en',
			},
			{
				destination:
					'https://backoffice.carrismetropolitana.pt/notasdeimprensa',
				permanent: false,
				source: '/notasdeimprensa',
			},
			{
				destination: 'https://backoffice.carrismetropolitana.pt/wtclisboa',
				permanent: false,
				source: '/wtclisboa',
			},
			{
				destination: 'https://backoffice.carrismetropolitana.pt/taguspark',
				permanent: false,
				source: '/taguspark',
			},
		];
	},
	async rewrites() {
		return [

			{
				destination: '/campaigns/:slug',
				source: '/:slug',
			},

		];
	},
};

/* * */

export default createNextIntlPlugin()(nextConfig);

/* * */

import { type NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

/* * */

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: 'carrismetropolitana.pt',
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
			{ destination: '/lines', permanent: true, source: '/linhas' },
			{ destination: '/lines', permanent: true, source: '/horarios' },
			//
			{ destination: '/stops', permanent: true, source: '/paragens' },
			//
			{ destination: '/vehicles', permanent: true, source: '/veiculos' },
			{ destination: '/vehicles', permanent: true, source: '/frota' },
			//
			{ destination: '/news', permanent: true, source: '/noticias' },
			//
			{ destination: '/planner', permanent: true, source: '/planeador' },
			//
			{ destination: '/open-data', permanent: true, source: '/opendata' },
			{ destination: '/open-data', permanent: true, source: '/dados-abertos' },
			//
			{ destination: '/stores', permanent: true, source: '/encm' },
			{ destination: '/stores', permanent: true, source: '/lojas' },
			{ destination: '/stores', permanent: true, source: '/espacos-navegante' },
			//
			{ destination: '/tickets', permanent: true, source: '/tarifarios' },
			//
			{ destination: '/cards', permanent: true, source: '/cartoes' },
			//
			{ destination: '/contacts', permanent: true, source: '/contactos' },
			{ destination: '/contacts', permanent: true, source: '/apoio' },
			//
			{ destination: '/viagem-2024', permanent: true, source: '/viagem2024' },
			//
			{ destination: 'https://backoffice.carrismetropolitana.pt/imprensa', permanent: false, source: '/imprensa' },
			{ destination: 'https://backoffice.carrismetropolitana.pt/embreveform', permanent: false, source: '/embreveform' },
			{ destination: 'https://backoffice.carrismetropolitana.pt/knowledgebase', permanent: false, source: '/knowledgebase' },
			{ destination: 'https://backoffice.carrismetropolitana.pt/viagemvirtual', permanent: false, source: '/viagemvirtual' },
			{ destination: 'https://backoffice.carrismetropolitana.pt/participe', permanent: false, source: '/participe' },
			{ destination: 'https://backoffice.carrismetropolitana.pt/motoristas', permanent: false, source: '/drivers' },
			{ destination: 'https://backoffice.carrismetropolitana.pt/motoristas', permanent: false, source: '/motoristas' },
			{ destination: 'https://backoffice.carrismetropolitana.pt/motoristas', permanent: false, source: '/recrutamento' },
			{ destination: 'https://backoffice.carrismetropolitana.pt/novobanco', permanent: false, source: '/novobanco' },
			{ destination: 'https://backoffice.carrismetropolitana.pt/mini-passageiros', permanent: false, source: '/mini-passageiros' },
			{ destination: 'https://backoffice.carrismetropolitana.pt/praias-area1', permanent: false, source: '/praias-area1' },
			{ destination: 'https://backoffice.carrismetropolitana.pt/praias-area2', permanent: false, source: '/praias-area2' },
			{ destination: 'https://backoffice.carrismetropolitana.pt/praias-area3', permanent: false, source: '/praias-area3' },
			{ destination: 'https://backoffice.carrismetropolitana.pt/praias-area4', permanent: false, source: '/praias-area4' },
			{ destination: 'https://backoffice.carrismetropolitana.pt/freeport-pt', permanent: false, source: '/freeport-pt' },
			{ destination: 'https://backoffice.carrismetropolitana.pt/freeport-en', permanent: false, source: '/freeport-en' },
			{ destination: 'https://backoffice.carrismetropolitana.pt/notasdeimprensa', permanent: false, source: '/notasdeimprensa' },
			{ destination: 'https://backoffice.carrismetropolitana.pt/wtclisboa', permanent: false, source: '/wtclisboa' },
			{ destination: 'https://backoffice.carrismetropolitana.pt/taguspark', permanent: false, source: '/taguspark' },
			//
		];
	},
};

/* * */

export default createNextIntlPlugin()(nextConfig);

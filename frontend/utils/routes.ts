export const AppRoutes = Object.freeze({
	ANDROID_BETA: 'https://play.google.com/store/apps/details?id=pt.carrismetropolitana.mobile',
	ANDROID_PROD: 'https://play.google.com/store/apps/details?id=pt.carrismetropolitana.mobile',
	APPLE_BETA: 'https://testflight.apple.com/join/KXz5ZVH8',
	APPLE_PROD: 'https://apps.apple.com/app/carris-metropolitana/id6553675889',
});

export const RoutesSupport = Object.freeze({
	COMPLAINTS: {
		intl: {
			'pt-PT': '/reclamacoes',
		},
		route: '/complaints',
	},
	CONTACTS: {
		intl: {
			'pt-PT': '/contactos',
		},
		route: '/contacts',
	},
	FAQ: {
		intl: {
			'pt-PT': '/faq',
		},
		route: '/faq',
	},
	LOST_AND_FOUND: {
		intl: {
			'pt-PT': '/perdidos-e-achados',
		},
		route: '/lost-and-found',
	},
	STORES: {
		intl: {
			'pt-PT': '/espacos-navegante',
		},
		route: '/stores',
	},
});

export const RoutesSchedule = Object.freeze({
	ALERTS: {
		intl: {
			'pt-PT': '/alertas',
		},
		route: '/alerts',
	},
	LINES: {
		intl: {
			'pt-PT': '/linhas',
		},
		route: '/lines',
	},
	LINES_DETAIL: {
		intl: {
			'pt-PT': '/linhas/[line_id]',
		},
		route: '/lines/[line_id]',
	},
	PLANNER: {
		intl: {
			'pt-PT': '/planeador',
		},
		route: '/planner',
	},
	SCHOOLS: 'https://escolas.carrismetropolitana.pt',
	STOPS: {
		intl: {
			'pt-PT': '/paragens',
		},
		route: '/stops',
	},
	STOPS_DETAIL: {
		intl: {
			'pt-PT': '/paragens/[stop_id]',
		},
		route: '/stops/[stop_id]',
	},
});

export const RoutesPricing = Object.freeze({
	CARDS: {
		intl: {
			'pt-PT': '/passe',
		},
		route: '/cards',
	},
	HELPDESKS: {
		intl: {
			'pt-PT': '/onde-comprar',
		},
		route: '/helpdesks',
	},
	TICKETS: {
		intl: {
			'pt-PT': '/bilhetes',
		},
		route: '/tickets',
	},
});

export const RoutesSocial = Object.freeze({
	GITHUB: 'https://www.github.com/carrismetropolitana',
	INSTAGRAM: 'https://www.instagram.com/carrismetropolitana',
	WHATSAPP: 'https://whatsapp.com/channel/0029Va9z9d2JP2184daqbX0K',
});

export const RoutesLostAndFound = Object.freeze({
	ALSA: 'mailto:passageiros@alsa.pt',
	RODOVIARIA_LISBOA: 'https://www.rodoviariadelisboa.pt/perdidoAchado',
	TST: 'https://www.tsuldotejo.pt/index.php?page=perdidos',
	VIACAO_ALVORADA: 'mailto:passageiro@viacaoalvorada.pt',
});

export const RoutesFooter = Object.freeze({
	ABOUT: {
		intl: {
			'pt-PT': '/sobre',
		},
		route: '/about',
	},
	CONDITIONS: {
		intl: {
			'pt-PT': '/condicoes',
		},
		route: '/conditions',
	},
	COOKIES: {
		intl: {
			'pt-PT': '/cookies',
		},
		route: '/cookies',
	},
	LEGAL: {
		intl: {
			'pt-PT': '/legal',
		},
		route: '/legal',
	},
	OPEN_DATA: {
		intl: {
			'pt-PT': '/dados-abertos',
		},
		route: '/open-data',
	},
	PRIVACY: {
		intl: {
			'pt-PT': '/privacidade',
		},
		route: '/privacy',
	},
	STATUS: 'https://status.carrismetropolitana.pt/',
});

export const RoutesProfile = Object.freeze({
	CONFIGS: {
		intl: {
			'pt-PT': '/perfil/configuracoes',
		},
		route: '/profile/configs',
	},
	FAVORITES: {
		intl: {
			'pt-PT': '/perfil/favoritos',
		},
		route: '/profile/favorites',
	},
	PROFILE: {
		intl: {
			'pt-PT': '/perfil',
		},
		route: '/profile',
	},
});

export const RoutesAccount = Object.freeze({
	...RoutesProfile,
});

export const Routes = Object.freeze({
	...AppRoutes,
	...RoutesSupport,
	...RoutesSchedule,
	...RoutesPricing,
	...RoutesSocial,
	...RoutesLostAndFound,
	...RoutesFooter,

	API: process.env.NEXT_PUBLIC_API_URL ?? 'https://api.carrismetropolitana.pt',
	API_ACCOUNTS: process.env.ACCOUNTS_API_URL ?? 'https://accounts.carrismetropolitana.pt',
	NAVEGANTE: 'https://www.navegante.pt',
	// Other routes
	NEWS: {
		intl: {
			'pt-PT': '/noticias',
		},
		route: '/news',
	},
	NEWS_DETAIL: {
		intl: {
			'pt-PT': '/noticias/[news_id]',
		},
		route: '/news/[news_id]',
	},
	SCHOOLS: 'https://escolas.carrismetropolitana.pt/',
	STORAGE: 'https://storage.carrismetropolitana.pt',
});

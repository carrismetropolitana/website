export const AppRoutes = Object.freeze({
	ANDROID_BETA: 'https://play.google.com/store/apps/details?id=pt.carrismetropolitana.mobile',
	ANDROID_PROD: 'https://play.google.com/store/apps/details?id=pt.carrismetropolitana.mobile',
	APPLE_BETA: 'https://testflight.apple.com/join/KXz5ZVH8',
	APPLE_PROD: 'https://apps.apple.com/app/carris-metropolitana/id6553675889',
});

export const RoutesSupport = Object.freeze({
	COMPLAINTS: {
		intl: {
			pt: '/reclamacoes',
		},
		route: '/complaints',
	},
	CONTACTS: {
		intl: {
			pt: '/contactos',
		},
		route: '/contacts',
	},
	FAQ: {
		intl: {
			pt: '/faq',
		},
		route: '/faq',
	},
	LOST_AND_FOUND: {
		intl: {
			pt: '/perdidos-e-achados',
		},
		route: '/lost-and-found',
	},
	STORES: {
		intl: {
			pt: '/lojas',
		},
		route: '/stores',
	},
});

export const RoutesSchedule = Object.freeze({
	ALERTS: {
		intl: {
			pt: '/alertas',
		},
		route: '/alerts',
	},
	LINES: {
		intl: {
			pt: '/linhas',
		},
		route: '/lines',
	},
	LINES_DETAIL: {
		intl: {
			pt: '/linhas/[line_id]',
		},
		route: '/lines/[line_id]',
	},
	PLANNER: {
		intl: {
			pt: '/planeador',
		},
		route: '/planner',
	},
	SCHOOLS: 'https://escolas.carrismetropolitana.pt',
	STOPS: {
		intl: {
			pt: '/paragens',
		},
		route: '/stops',
	},
	STOPS_DETAIL: {
		intl: {
			pt: '/paragens/[stop_id]',
		},
		route: '/stops/[stop_id]',
	},
});

export const RoutesPricing = Object.freeze({
	CARDS: {
		intl: {
			pt: '/passe',
		},
		route: '/cards',
	},
	HELPDESKS: {
		intl: {
			pt: '/onde-comprar',
		},
		route: '/helpdesks',
	},
	TICKETS: {
		intl: {
			pt: '/bilhetes',
		},
		route: '/tickets',
	},
});

export const RoutesSocial = Object.freeze({
	FACEBOOK: 'https://www.facebook.com/carrismetropolitana',
	GITHUB: 'https://www.github.com/carrismetropolitana',
	INSTAGRAM: 'https://www.instagram.com/carrismetropolitana',
	WHATSAPP: 'https://whatsapp.com/channel/0029Va9z9d2JP2184daqbX0K',
	X: 'https://x.com/CMetropolitana_',
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
			pt: '/sobre',
		},
		route: '/about',
	},
	CONDITIONS: {
		intl: {
			pt: '/condicoes',
		},
		route: '/conditions',
	},
	COOKIES: {
		intl: {
			pt: '/cookies',
		},
		route: '/cookies',
	},
	LEGAL: {
		intl: {
			pt: '/legal',
		},
		route: '/legal',
	},
	OPEN_DATA: {
		intl: {
			pt: '/dados-abertos',
		},
		route: '/open-data',
	},
	PRIVACY: {
		intl: {
			pt: '/privacidade',
		},
		route: '/privacy',
	},
	STATUS: 'https://status.carrismetropolitana.pt/',
});

export const RoutesProfile = Object.freeze({
	CONFIGS: {
		intl: {
			pt: '/perfil/configuracoes',
		},
		route: '/profile/configs',
	},
	FAVORITES: {
		intl: {
			pt: '/perfil/favoritos',
		},
		route: '/profile/favorites',
	},
	PROFILE: {
		intl: {
			pt: '/perfil',
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

	API: process.env.NEXT_PUBLIC_API_URL ?? 'https://api.cmet.pt/v2',
	API_ACCOUNTS: process.env.ACCOUNTS_API_URL ?? 'https://accounts.carrismetropolitana.pt',
	METRICS: {
		intl: {
			pt: '/metricas',
		},
		route: '/metrics',
	},
	NAVEGANTE: 'https://www.navegante.pt',
	// Other routes
	NEWS: {
		intl: {
			pt: '/noticias',
		},
		route: '/news',
	},
	NEWS_DETAIL: {
		intl: {
			pt: '/noticias/[news_id]',
		},
		route: '/news/[news_id]',
	},
	SCHOOLS: 'https://escolas.carrismetropolitana.pt/',
	STORAGE: 'https://storage.carrismetropolitana.pt',
});

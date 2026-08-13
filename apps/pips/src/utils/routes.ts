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

export const RoutesLostAndFound = Object.freeze({
	ALSA: 'mailto:passageiros@alsa.com',
	RODOVIARIA_LISBOA: 'https://www.rodoviariadelisboa.pt/perdidoAchado',
	TST: 'https://www.tsuldotejo.pt/index.php?page=perdidos',
	VIACAO_ALVORADA: 'mailto:passageiro@viacaoalvorada.pt',
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
	...RoutesSupport,
	...RoutesLostAndFound,

	API: process.env.NEXT_PUBLIC_API_URL ?? 'https://api.carrismetropolitana.pt/v2',
	API_ACCOUNTS: process.env.ACCOUNTS_API_URL ?? 'https:://accounts.carrismetropolitana.pt',
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

export const AppRoutes = Object.freeze({
	ANDROID_BETA: 'https://play.google.com/store/apps/details?id=pt.carrismetropolitana.mobile',
	ANDROID_PROD: 'https://play.google.com/store/apps/details?id=pt.carrismetropolitana.mobile',
	APPLE_BETA: 'https://testflight.apple.com/join/KXz5ZVH8',
	APPLE_PROD: 'https://apps.apple.com/app/carris-metropolitana/id6553675889',
});

export const RoutesSupport = Object.freeze({
	COMPLAINTS: '/complaints',
	CONTACTS: '/contacts',
	FAQ: '/faq',
	LOST_AND_FOUND: '/lost-and-found',
	STORES: '/stores',
});

export const RoutesSchedule = Object.freeze({
	ALERTS: '/alerts',
	LINES: '/lines',
	PLANNER: '/planner',
	SCHOOLS: 'https://escolas.carrismetropolitana.pt',
	STOPS: '/stops',
});

export const RoutesPricing = Object.freeze({
	CARDS: '/cards',
	HELPDESKS: '/helpdesks',
	TICKETS: '/tickets',
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
	ABOUT: '/about',
	CONDITIONS: '/conditions',
	COOKIES: '/cookies',
	LEGAL: '/legal',
	OPEN_DATA: '/open-data',
	PRIVACY: '/privacy',
	STATUS: 'https://status.carrismetropolitana.pt/',
});

export const RoutesProfile = Object.freeze({
	CONFIGS: '/profile/configs',
	FAVORITES: '/profile/favorites',
	PROFILE: '/profile',
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

	// Other routes
	API: process.env.ACCOUNTS_API ?? 'https://api.carrismetropolitana.pt',
	API_ACCOUNTS: process.env.ACCOUNTS_API_URL ?? 'https://accounts.carrismetropolitana.pt',
	NAVEGANTE: 'https://www.navegante.pt',
	NEWS: '/news',
	SCHOOLS: 'https://escolas.carrismetropolitana.pt/',
	STORAGE: 'https://storage.carrismetropolitana.pt',
});

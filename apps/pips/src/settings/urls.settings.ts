/* * */

export const URLS = Object.freeze({

	/**
	 * URLs for CMET's native app in different stores and environments.
	 */
	app: {
		android_standalone: {
			prod: 'https://play.google.com/store/apps/details?id=pt.carrismetropolitana.mobile',
		},
		apple_app_store: {
			beta: 'https://testflight.apple.com/join/KXz5ZVH8',
			prod: 'https://apps.apple.com/pt/app/carris-metropolitana/id6553675889',
		},
		google_play_store: {
			beta: 'https://play.google.com/store/apps/details?id=pt.carrismetropolitana.mobile',
			prod: 'https://play.google.com/store/apps/details?id=pt.carrismetropolitana.mobile',
		},
	},

	/**
	 * URLs for navegante's native app in different stores and environments.
	 */
	app_navegante: {
		android_standalone: {
			prod: 'https://play.google.com/store/apps/details?id=pt.card4b.navegante',
		},
		apple_app_store: {
			prod: 'https://apps.apple.com/pt/app/navegante/id6484591306',
		},
		google_play_store: {
			prod: 'https://play.google.com/store/apps/details?id=pt.card4b.navegante',
		},
	},

	/**
	 * URLs for CMET's Open Data partner platforms.
	 */
	open_data_partners: {
		dados_gov: 'https://dados.gov.pt/pt/datasets/gtfs-carris-metropolitana/',
		github: 'https://github.com/carrismetropolitana',
		nap_pt: 'https://nap-portugal.imt-ip.pt/nap/multimodalsupplydetail/159',
	},

	/**
	 * URLs for CMET's Github Repos.
	 */
	repos: {
		api: 'https://github.com/carrismetropolitana/api',
		datasets: 'https://github.com/carrismetropolitana/datasets',
		gtfs: 'https://github.com/carrismetropolitana/gtfs',
		tts: 'https://github.com/carrismetropolitana/tts',
		website: 'https://github.com/carrismetropolitana/website',
	},

	/**
	 * URLs for CMET's social connections.
	 */
	socials: {
		facebook: 'https://www.facebook.com/carrismetropolitana',
		github: 'https://www.github.com/carrismetropolitana',
		instagram: 'https://www.instagram.com/carrismetropolitana',
		twitter: 'https://twitter.com/cmetropolitana_',
		whatsapp: 'https://whatsapp.com/channel/0029Va9z9d2JP2184daqbX0K',
	},

});

/* * */

export const audioTtsUrl = 'https://storage.carrismetropolitana.pt/static/tts/live';

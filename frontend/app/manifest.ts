/* * */

import { IconsMobile } from '@/settings/assets.settings';

export default function manifest() {
	return {
		background_color: '#ffffff',
		description: 'Horários em Tempo Real da Carris Metropolitana',
		display: 'standalone',
		icons: [
			{
				sizes: '192x192',
				src: IconsMobile.MOBILE_ANDROID_192,
				type: 'image/png',
			},
			{
				sizes: '512x512',
				src: IconsMobile.MOBILE_ANDROID_512,
				type: 'image/png',
			},
		],
		name: 'Carris Metropolitana',
		short_name: 'Horários',
		start_url: '/',
	};
}

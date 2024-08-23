/* * */

export default function manifest() {
	return {
		background_color: '#ffffff',
		description: 'Horários em Tempo Real da Carris Metropolitana',
		display: 'standalone',
		icons: [
			{
				sizes: '192x192',
				src: '/android-chrome-192x192.png',
				type: 'image/png',
			},
			{
				sizes: '512x512',
				src: '/android-chrome-512x512.png',
				type: 'image/png',
			},
		],
		name: 'Carris Metropolitana',
		short_name: 'Horários',
		start_url: '/',
	};
}

export default function manifest() {
  return {
    name: 'Carris Metropolitana',
    short_name: 'Horários',
    description: 'Horários em Tempo Real da Carris Metropolitana',
    start_url: '/',
    theme_color: '#ffffff',
    background_color: '#000000',
    display: 'standalone',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}

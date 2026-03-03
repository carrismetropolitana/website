/* * */

import dynamic from 'next/dynamic';

export const LottiePlayer = dynamic(() => {
	return import('react-lottie-player');
}, { ssr: false });

/* * */

import { getImageBase64 } from '@/utils/get-image-base64';

/* * */

export function OpenGraphReview2024Default() {
	const imageData = getImageBase64('public/assets/review-2024/images/viagem-2024-logo.png');
	return (
		<div style={{ backgroundColor: '#fff', display: 'flex', height: '100%', width: '100%' }}>
			<img alt="Viagem 2024" src={`data:image/png;base64,${imageData}`} />
		</div>
	);
}

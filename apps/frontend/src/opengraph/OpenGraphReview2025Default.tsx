/* * */

import { getImageBase64 } from '@/utils/get-image-base64';

/* * */

export function OpenGraphReview2025Default() {
	const imageData = getImageBase64('public/assets/review-2025/CampanhaDados_BannerWeb.png');
	return (
		<div style={{ backgroundColor: '#fff', display: 'flex', height: '100%', width: '100%' }}>
			<img alt="Retrospectiva 2025" src={`data:image/png;base64,${imageData}`} />
		</div>
	);
}

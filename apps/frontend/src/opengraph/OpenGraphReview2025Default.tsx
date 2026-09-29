/* * */

import fs from 'node:fs';
import path from 'node:path';

/* * */

export function OpenGraphReview2025Default() {
	const imagePath = path.join(process.cwd(), 'public/assets/review-2025/CampanhaDados_BannerWeb.png');
	const imageBuffer = fs.readFileSync(imagePath);
	const imageData = imageBuffer.toString('base64');
	return (
		<div style={{ backgroundColor: '#fff', display: 'flex', height: '100%', width: '100%' }}>
			<img alt="Retrospectiva 2025" src={`data:image/png;base64,${imageData}`} />
		</div>
	);
}

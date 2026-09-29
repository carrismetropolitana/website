/* * */

import fs from 'node:fs';
import path from 'node:path';

/* * */

export function OpenGraphReview2024Default() {
	const imagePath = path.join(process.cwd(), 'public/assets/review-2024/images/viagem-2024-logo.png');
	const imageBuffer = fs.readFileSync(imagePath);
	const imageData = imageBuffer.toString('base64');
	return (
		<div style={{ backgroundColor: '#fff', display: 'flex', height: '100%', width: '100%' }}>
			<img alt="Viagem 2024" src={`data:image/png;base64,${imageData}`} />
		</div>
	);
}

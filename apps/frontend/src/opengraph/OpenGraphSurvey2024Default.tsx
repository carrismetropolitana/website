/* * */

import fs from 'node:fs';
import path from 'node:path';

/* * */

export function OpenGraphSurvey2024Default() {
	const imagePath = path.join(process.cwd(), 'public/assets/survey-2024/images/survey-2024-logo.png');
	const imageBuffer = fs.readFileSync(imagePath);
	const imageData = imageBuffer.toString('base64');
	return (
		<div style={{ backgroundColor: '#fff', display: 'flex', height: '100%', width: '100%' }}>
			<img alt="Inquérito 2024" src={`data:image/png;base64,${imageData}`} />
		</div>
	);
}

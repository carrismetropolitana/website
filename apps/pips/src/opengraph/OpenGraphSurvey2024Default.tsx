import { getImageBase64 } from '@/utils/get-image-base64';

/* * */

export function OpenGraphSurvey2024Default() {
	const imageData = getImageBase64('public/assets/survey-2024/images/survey-2024-logo.png');
	return (
		<div style={{ backgroundColor: '#fff', display: 'flex', height: '100%', width: '100%' }}>
			<img alt="Inquérito 2024" src={`data:image/png;base64,${imageData}`} />
		</div>
	);
}

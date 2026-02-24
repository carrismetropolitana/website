/* * */

import { createServerFeature } from '@payloadcms/richtext-lexical';

/* * */

export const LayoutFeature = createServerFeature({
	feature: () => ({
		ClientFeature: '@/lexical/layout/feature.client#LayoutFeatureClient',
	}),
	key: 'layoutSlashMenu',
});

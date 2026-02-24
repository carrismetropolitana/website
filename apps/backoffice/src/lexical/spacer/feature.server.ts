/* * */

import { createServerFeature } from '@payloadcms/richtext-lexical';

/* * */

export const SpacerFeature = createServerFeature({
	feature: () => ({
		ClientFeature: '@/lexical/spacer/feature.client#SpacerFeatureClient',
	}),
	key: 'spacerSlashMenu',
});

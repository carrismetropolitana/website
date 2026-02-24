/* * */

import { createServerFeature } from '@payloadcms/richtext-lexical';

/* * */

/**
 * Adds the spacer block to the common (basic) slash menu group.
 * The spacer block itself is defined in BlocksFeature.
 */
export const SpacerFeature = createServerFeature({
	feature: () => ({
		ClientFeature: '@/lexical/spacer/feature.client#SpacerFeatureClient',
	}),
	key: 'spacerSlashMenu',
});

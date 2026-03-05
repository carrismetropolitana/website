import { createServerFeature } from '@payloadcms/richtext-lexical';

export const BackgroundColorFeature = createServerFeature({
	feature: () => ({
		ClientFeature: '@/lexical/backgroundColor/feature.client#BackgroundColorFeatureClient',
	}),
	key: 'backgroundColor',
});

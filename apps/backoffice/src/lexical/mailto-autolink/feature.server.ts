import { createServerFeature } from '@payloadcms/richtext-lexical';

export const MailtoAutoLinkFeature = createServerFeature({
	feature: () => ({
		ClientFeature: '@/lexical/mailto-autolink/feature.client#MailtoAutoLinkFeatureClient',
	}),
	key: 'mailtoAutoLink',
});

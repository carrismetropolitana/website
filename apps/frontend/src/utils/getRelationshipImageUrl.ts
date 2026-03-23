export function getRelationshipImageUrl(value: unknown): string | undefined {
	if (!value || typeof value !== 'object') return undefined;
	const v = value as {
		file?: { url?: string }
		url?: string
		value?: {
			file?: { url?: string }
			url?: string
		}
	};
	return v.url ?? v.value?.url ?? v.file?.url ?? v.value?.file?.url;
}

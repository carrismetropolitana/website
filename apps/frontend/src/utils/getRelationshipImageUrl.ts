import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';

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

export function getResolvedRelationshipImageUrl(value: unknown): string | undefined {
	const raw = getRelationshipImageUrl(value);
	if (!raw) return undefined;
	if (/^https?:\/\//i.test(raw)) return raw;
	const base = getPublicVariable('server_url_backoffice').replace(/\/$/, '');
	if (raw.startsWith('/')) return `${base}${raw}`;
	return raw;
}

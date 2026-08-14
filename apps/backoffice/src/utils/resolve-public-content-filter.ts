import type { Where } from 'payload';

type DateBoundary = 'end' | 'start';

const ISO_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
const PORTUGUESE_DATE_PATTERN = /^(\d{2})\/(\d{2})\/(\d{2}|\d{4})$/;
const SEARCH_TERM_MAX_LENGTH = 120;

export function resolvePublicContentFilter(searchParams: URLSearchParams): Where {
	const query = resolveSearchQuery(searchParams.get('q'));
	const startDate = resolveDateBoundary(searchParams.get('startDate'), 'start');
	const endDate = resolveDateBoundary(searchParams.get('endDate'), 'end');

	return {
		...(query && {
			or: [{ title: { like: query } }, { description: { like: query } }],
		}),
		...((startDate || endDate) && {
			publishDate: {
				...(startDate && { greater_than_equal: startDate }),
				...(endDate && { less_than_equal: endDate }),
			},
		}),
	};
}

function resolveSearchQuery(value: null | string): string | undefined {
	const query = value?.trim().slice(0, SEARCH_TERM_MAX_LENGTH);
	return query || undefined;
}

function resolveDateBoundary(
	value: null | string,
	boundary: DateBoundary,
): string | undefined {
	if (!value) return undefined;

	const match = value.trim().match(ISO_DATE_PATTERN) ?? value.trim().match(PORTUGUESE_DATE_PATTERN);
	if (!match) return undefined;

	const [, first, second, third] = match;
	const [year, month, day] = value.includes('-')
		? [Number(first), Number(second), Number(third)]
		: [Number(third.length === 2 ? `20${third}` : third), Number(second), Number(first)];
	const date = new Date(Date.UTC(year, month - 1, day));

	if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) {
		return undefined;
	}

	if (boundary === 'end') date.setUTCHours(23, 59, 59, 999);

	return date.toISOString();
}

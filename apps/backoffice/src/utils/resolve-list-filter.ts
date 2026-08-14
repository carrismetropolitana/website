export function resolveListFilter(value: null | string): string[] {
	if (!value) return [];

	return value
		.split(',')
		.map(item => item.trim())
		.filter(Boolean);
}

export function normalizeReferenceId(referenceId: null | number | string | undefined): string {
	return String(referenceId ?? '').trim().replace(/^(\[[^\]]+\])+/, '');
}

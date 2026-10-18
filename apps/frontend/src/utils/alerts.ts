import type { HubV1ApiAlert } from '@tmlmobilidade/go-types-hub';

/* * */

export function normalizeReferenceId(referenceId: null | number | string | undefined): string {
	return String(referenceId ?? '').trim().replace(/^\[[^\]]+\]/, '');
}

export function alertReferencesLineId(alert: HubV1ApiAlert, lineId: string): boolean {
	const normalizedLineId = normalizeReferenceId(lineId);

	return alert.references.some((reference) => {
		if (alert.reference_type === 'lines') {
			return normalizeReferenceId(reference.parent_id) === normalizedLineId;
		}
		if (alert.reference_type === 'stops') {
			return reference.child_ids.some(childId => normalizeReferenceId(childId) === normalizedLineId);
		}
		return false;
	});
}

export function alertReferencesStopId(alert: HubV1ApiAlert, stopId: string): boolean {
	const normalizedStopId = normalizeReferenceId(stopId);

	return alert.references.some((reference) => {
		if (alert.reference_type === 'stops') {
			return normalizeReferenceId(reference.parent_id) === normalizedStopId;
		}
		if (alert.reference_type === 'lines') {
			return reference.child_ids.some(childId => normalizeReferenceId(childId) === normalizedStopId);
		}
		return false;
	});
}

export function getCauseSeverityLevel(cause?: HubV1ApiAlert['cause']): number {
	switch (cause) {
		case 'ACCIDENT':
		case 'CONSTRUCTION':
		case 'DEMONSTRATION':
		case 'MEDICAL_EMERGENCY':
		case 'POLICE_ACTIVITY':
		case 'STRIKE':
		case 'TECHNICAL_ISSUE':
		case 'WEATHER':
			return 3;
		default:
			return 2;
	}
}

export function getEffectSeverityLevel(effect?: HubV1ApiAlert['effect']): number {
	switch (effect) {
		case 'ACCESSIBILITY_ISSUE':
		case 'MODIFIED_SERVICE':
			return 0;
		case 'ADDITIONAL_SERVICE':
			return 1;
		case 'NO_SERVICE':
		case 'SIGNIFICANT_DELAYS':
			return 3;
		default:
			return 2;
	}
}

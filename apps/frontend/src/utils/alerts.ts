import type { HubV1ApiAlert } from '@tmlmobilidade/go-types-hub';

/* * */

export function normalizeReferenceId(referenceId: null | number | string | undefined): string {
	return String(referenceId ?? '').trim().replace(/^\[[^\]]+\]/, '');
}

export function getCauseSeverityLevel(cause?: HubV1ApiAlert['cause']): number {
	switch (cause) {
		case 'ABUSIVE_PARKING':
		case 'ACCIDENT':
		case 'CONSTRUCTION':
		case 'DEMONSTRATION':
		case 'DRIVER_ABSENCE':
		case 'DRIVER_ISSUE':
		case 'HIGH_PASSENGER_LOAD':
		case 'MEDICAL_EMERGENCY':
		case 'NETWORK_UPDATE':
		case 'POLICE_ACTIVITY':
		case 'PUBLIC_DISORDER':
		case 'ROAD_ISSUE':
		case 'STRIKE':
		case 'TECHNICAL_ISSUE':
		case 'TRAFFIC_JAM':
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

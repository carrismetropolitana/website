/* * */

import { AlertCause, AlertEffect } from '@/types/alerts.types';

// Helper function to get severity level for a cause
export function getCauseSeverityLevel(cause: AlertCause): number {
	switch (cause) {
		case 'ACCIDENT':
		case 'CONSTRUCTION':
		case 'DEMONSTRATION':
		case 'DRIVER_ABSENCE':
		case 'DRIVER_ISSUE':
		case 'HIGH_PASSENGER_LOAD':
		case 'MAINTENANCE':
		case 'MEDICAL_EMERGENCY':
		case 'POLICE_ACTIVITY':
		case 'ROAD_INCIDENT':
		case 'STRIKE':
		case 'SYSTEM_FAILURE':
		case 'TECHNICAL_PROBLEM':
		case 'TRAFFIC_JAM':
		case 'WEATHER':
			return 3;
		case 'HOLIDAY':
			return 0;
		default:
			return 2;
	}
}

// Helper function to get severity level for an effect
export function getEffectSeverityLevel(effect: AlertEffect): number {
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

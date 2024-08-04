/* * */

import { EntitySelector, TimeRange, TranslatedImage, TranslatedString } from '@/types/gtfsrt.types.js';

/* * */

export enum AlertCause {
	ACCIDENT = 'ACCIDENT',
	CONSTRUCTION = 'CONSTRUCTION',
	DEMONSTRATION = 'DEMONSTRATION',
	HOLIDAY = 'HOLIDAY',
	MAINTENANCE = 'MAINTENANCE',
	MEDICAL_EMERGENCY = 'MEDICAL_EMERGENCY',
	OTHER_CAUSE = 'OTHER_CAUSE',
	POLICE_ACTIVITY = 'POLICE_ACTIVITY',
	STRIKE = 'STRIKE',
	TECHNICAL_PROBLEM = 'TECHNICAL_PROBLEM',
	UNKNOWN_CAUSE = 'UNKNOWN_CAUSE',
	WEATHER = 'WEATHER',
}

export enum AlertEffect {
	ACCESSIBILITY_ISSUE = 'ACCESSIBILITY_ISSUE',
	ADDITIONAL_SERVICE = 'ADDITIONAL_SERVICE',
	DETOUR = 'DETOUR',
	MODIFIED_SERVICE = 'MODIFIED_SERVICE',
	NO_EFFECT = 'NO_EFFECT',
	NO_SERVICE = 'NO_SERVICE',
	OTHER_EFFECT = 'OTHER_EFFECT',
	REDUCED_SERVICE = 'REDUCED_SERVICE',
	SIGNIFICANT_DELAYS = 'SIGNIFICANT_DELAYS',
	STOP_MOVED = 'STOP_MOVED',
	UNKNOWN_EFFECT = 'UNKNOWN_EFFECT',
}

/* * */

export interface Alert {
	_id: string
	activePeriod: TimeRange[]
	cause: AlertCause
	descriptionText: TranslatedString
	effect: AlertEffect
	headerText: TranslatedString
	image: TranslatedImage
	informedEntity: EntitySelector[]
	url: TranslatedString
}

/* * */

export interface AlertGroupByDate {
	alerts: Alert[]
	start_date: string
}

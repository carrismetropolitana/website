/* * */

import { EntitySelector, TimeRange, TranslatedImage, TranslatedString } from '@/types/gtfsrt.types.js';
import { HubAlert } from '@tmlmobilidade/types';

/* * */

export enum AlertCause {
	ABUSIVE_PARKING = 'ABUSIVE_PARKING',
	ACCIDENT = 'ACCIDENT',
	CONSTRUCTION = 'CONSTRUCTION',
	DEMONSTRATION = 'DEMONSTRATION',
	DRIVER_ABSENCE = 'DRIVER_ABSENCE',
	DRIVER_ISSUE = 'DRIVER_ISSUE',
	HIGH_PASSENGER_LOAD = 'HIGH_PASSENGER_LOAD',
	MEDICAL_EMERGENCY = 'MEDICAL_EMERGENCY',
	NETWORK_UPDATE = 'NETWORK_UPDATE',
	POLICE_ACTIVITY = 'POLICE_ACTIVITY',
	PUBLIC_DISORDER = 'PUBLIC_DISORDER',
	ROAD_ISSUE = 'ROAD_ISSUE',
	STRIKE = 'STRIKE',
	TECHNICAL_ISSUE = 'TECHNICAL_ISSUE',
	TRAFFIC_JAM = 'TRAFFIC_JAM',
	VEHICLE_ISSUE = 'VEHICLE_ISSUE',
	WEATHER = 'WEATHER',
}

export enum AlertEffect {
	ACCESSIBILITY_ISSUE = 'ACCESSIBILITY_ISSUE',
	ADDITIONAL_SERVICE = 'ADDITIONAL_SERVICE',
	DETOUR = 'DETOUR',
	MODIFIED_SERVICE = 'MODIFIED_SERVICE',
	NO_SERVICE = 'NO_SERVICE',
	ON_BOARD_SALE_ISSUE = 'ON_BOARD_SALE_ISSUE',
	REALTIME_INFO_ISSUE = 'REALTIME_INFO_ISSUE',
	REDUCED_SERVICE = 'REDUCED_SERVICE',
	SIGNIFICANT_DELAYS = 'SIGNIFICANT_DELAYS',
	STOP_MOVED = 'STOP_MOVED',
}

/* * */

/**
 * An Alert is the JSON equivalent of a GTFS-RT Service Alert message.
 * Please use a SimplifiedAlert as many convenience operations are already correctly applied.
 */
export interface Alert {
	active_period: TimeRange
	alert_id: string
	cause: AlertCause
	coordinates: [number, number]
	description_text: TranslatedString
	effect: AlertEffect
	header_text: TranslatedString
	image: TranslatedImage
	informed_entity: EntitySelector[]
	url: TranslatedString
}

/* * */

/**
 * A Simplified Alert is the same as an Alert, but with the following differences:
 * - The description is a string instead of a TranslatedString
 * - The image URL is a string instead of a TranslatedImage
 * - The URL is a string instead of a TranslatedString
 * - The start_date and end_date are Date objects instead of TimeRange objects
 * - All fields with translatable content are returned in the current app locale
 */
export interface SimplifiedAlert {
	alert_id: string
	cause: AlertCause
	coordinates?: [number, number]
	description: string
	effect: AlertEffect
	end_date?: Date
	image_url: null | string
	informed_entity: EntitySelector[]
	locale: string
	start_date: Date
	title: string
	url: null | string
}

/* * */

export interface AlertGroupByDate {
	items: HubAlert[]
	label?: string
	title: string
	value: string
}

/* * */

export interface Timetable {
	exceptions: Exception[]
	hours: Hour[]
}

/* * */

export interface Hour {
	hour_label: string
	hour_value: number
	minutes: Minute[]
}

/* * */

export interface Minute {
	exception_ids: string[]
	minute_label: string
	minute_value: number
	trip_ids: string[]
}

/* * */

interface ExceptionTemplate {
	exception_id: string
	pattern_headsign: string
	pattern_id: string
	pattern_version_id: string
	route_long_name: string
}

interface ExceptionExtensionSchedule {
	calendar_desc: string
	type: 'schedule'
}

interface ExceptionExtensionVariant {
	calendar_desc?: null
	type: 'variant'
}

export type Exception = ((ExceptionExtensionSchedule | ExceptionExtensionVariant) & ExceptionTemplate);

/* * */

export interface NextArrival {
	type: 'realtime' | 'scheduled'
	unixTs: number
}

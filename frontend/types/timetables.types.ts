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
}

/* * */

interface ExceptionTemplate {
	exception_id: string
	pattern_group_id: string
	pattern_headsign: string
	pattern_id: string
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
/* * */
/* * */
/* * */
/* * */
/* * */
/* * */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const example: TimetableDayStop = {
	exceptions: [
		{
			calendar_desc: null,
			exception_id: 'a',
			pattern_headsign: 'Moita - Lisboa (Oriente)',
			pattern_id: '1006_0_2',
			trip_ids: ['1006_0_2_1'],
			type: 'variant',
		},
		{
			calendar_desc: 'Não se faz aos domingos de tarde',
			exception_id: 'b',
			pattern_headsign: 'Moita - Lisboa (Base)',
			pattern_id: '1006_0_1',
			trip_ids: ['1006_0_1_1'],
			type: 'schedule',
		},

	],
	hours: [
		{
			hour: 8,
			minutes: [
				{
					min: 2,
				},
				{
					min: 12,
				},
				{
					min: 22,
				},
			],
		},
		{
			hour: 9,
			minutes: [
				{
					exceptions_ids: ['a', 'b'],
					min: 2,
				},
				{
					min: 12,
				},
				{
					min: 22,
				},
			],
		},

	],
};

export interface TimetableDayStop {
	exceptions: (({
		calendar_desc: null
		type: 'variant'
	} | {
		calendar_desc: string
		type: 'schedule'
	}) & {
		exception_id: string
		pattern_headsign: string
		pattern_id: string
		trip_ids: string[]
	})[]
	hours: {
		hour: number
		minutes: ({
			// If this is the main pattern exception ids will be undefined
			// We can have up to two entries for the same minute,
			// one for the main pattern and one for the variants with exceptions
			exceptions_ids?: string[]
			min: number
		})[]
	}[]
}

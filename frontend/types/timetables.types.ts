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
					exceptions_ids: [],
					min: 2,
				},
				{
					exceptions_ids: [],
					min: 12,
				},
				{
					exceptions_ids: [],
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
					exceptions_ids: [],
					min: 12,
				},
				{
					exceptions_ids: [],
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
			exceptions_ids: string[]
			min: number
		})[]
	}[]
}

export interface Notification {
	_id: string
	distance: number
	distance_unit: 'meters' | 'min'
	end_time: number
	pattern_id: string
	start_time: number
	stop_id: string
	week_days: string[]
}

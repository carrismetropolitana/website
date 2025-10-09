export interface PatternRealtime {
	estimated_arrival: null | string
	estimated_arrival_unix: null | number
	headsign: string
	line_id: string
	observed_arrival: null | string
	observed_arrival_unix: null | number
	pattern_id: string
	route_id: string
	scheduled_arrival: string
	scheduled_arrival_unix: number
	stop_id: string
	stop_sequence: number
	trip_id: string
	vehicle_id: null | string
};

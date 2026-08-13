/* * */

export interface Vehicle {
	bearing: number
	block_id: string
	current_status: 'IN_TRANSIT_TO' | 'INCOMING_AT' | 'STOPPED_AT'
	id: string
	lat: number
	line_id: string
	lon: number
	pattern_id: string
	route_id: string
	schedule_relationship: 'DUPLICATED' | 'SCHEDULED'
	shift_id: string
	speed: number
	stop_id: string
	timestamp: number
	trip_id: string
};

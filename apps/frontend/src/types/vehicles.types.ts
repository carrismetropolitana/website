/* * */

export interface HubVehicleMetadata {
	_id: string
	agency_id: string
	available_seats: number
	available_standing: number
	bicycles: boolean
	climatization: boolean
	consumption_meter: boolean
	contactless: boolean
	corridor: boolean
	created_by: string
	emission: string
	external_sound: boolean
	folding_system: boolean
	front_display: boolean
	internal_sound: boolean
	is_locked: boolean
	kneeling: boolean
	license_plate: string
	lowered_floor: boolean
	make: string
	model: string
	onboard_monitor: boolean
	owner: string
	passenger_counting: boolean
	propulsion: string
	ramp: boolean
	rear_display: boolean
	registration_date: string
	side_display: boolean
	start_date: string
	static_information: boolean
	typology: string
	updated_by: string
	vehicle_id: string
	wheelchair: boolean
}

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

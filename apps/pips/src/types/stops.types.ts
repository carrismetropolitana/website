/* * */

export enum Facility {
	AIRPORT = 'airport',
	BIKE_PARKING = 'bike_parking',
	BIKE_SHARING = 'bike_sharing',
	BOAT = 'boat',
	CAR_PARKING = 'car_parking',
	LIGHT_RAIL = 'light_rail',
	NEAR_FIRE_STATION = 'near_fire_station',
	NEAR_HEALTH_CLINIC = 'near_health_clinic',
	NEAR_HISTORIC_BUILDING = 'near_historic_building',
	NEAR_HOSPITAL = 'near_hospital',
	NEAR_POLICE_STATION = 'near_police_station',
	NEAR_SCHOOL = 'school',
	NEAR_SHOPPING = 'shopping',
	NEAR_TRANSIT_OFFICE = 'transit_office',
	NEAR_UNIVERSITY = 'near_university',
	SUBWAY = 'subway',
	TRAIN = 'train',
}

/* * */

export type OperationalStatus = 'active' | 'inactive' | 'provisional' | 'seasonal' | 'voided';

/* * */

export interface Arrival {
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
	stop_sequence: number
	trip_id: string
	vehicle_id: null | string
};

export type ArrivalStatus = 'canceled' | 'passed' | 'realtime' | 'scheduled';

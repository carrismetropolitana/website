/* * */

export interface Stop {
	district_id: string
	district_name: string
	facilities: Facility[]
	id: string
	lat: string
	lines: string[]
	locality: string
	lon: string
	municipality_id: string
	municipality_name: string
	name: string
	operational_status: OperationalStatus
	parish_id: null
	parish_name: null
	patterns: string[]
	region_id: string
	region_name: string
	routes: string[]
	short_name: string
	tts_name: string
	wheelchair_boarding: string
};

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

export enum OperationalStatus {
	Active = 'ACTIVE',
	Inactive = 'INACTIVE',
	Provisional = 'PROVISIONAL',
	Seasonal = 'SEASONAL',
	Voided = 'VOIDED',
}

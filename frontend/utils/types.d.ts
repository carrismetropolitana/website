import type { FeatureCollection } from 'geojson';
export interface Line {
	color: string
	facilities: string[]
	id: string
	localities: string[]
	long_name: string
	municipalities: string[]
	patterns: string[]
	routes: string[]
	short_name: string
	text_color: string
};

export interface Route {
	color: string
	facilities: string[]
	id: string
	line_id: string
	localities: string[]
	long_name: string
	municipalities: string[]
	patterns: string[]
	short_name: string
	text_color: string
}

export interface AlertDTO {
	entity: Entity[]
	header: Header
};

export interface Entity {
	alert: Alert
	id: string
};

export interface Alert {
	activePeriod: ActivePeriod[]
	cause: Cause
	descriptionText: DescriptionText
	effect: Effect
	headerText: DescriptionText
	image: Image
	informedEntity: InformedEntity[]
	url: DescriptionText
};

export interface ActivePeriod {
	end: number
	start: number
};

export enum Cause {
	Construction = 'CONSTRUCTION',
	Demonstration = 'DEMONSTRATION',
	UnknownCause = 'UNKNOWN_CAUSE',
}

export interface DescriptionText {
	translation: Translation[]
};

export interface Translation {
	language: Language
	text: string
};

export enum Language {
	Pt = 'pt',
}

export enum Effect {
	AdditionalService = 'ADDITIONAL_SERVICE',
	Detour = 'DETOUR',
	ModifiedService = 'MODIFIED_SERVICE',
	NoService = 'NO_SERVICE',
	SignificantDelays = 'SIGNIFICANT_DELAYS',
	StopMoved = 'STOP_MOVED',
}

export interface Image {
	localizedImage: LocalizedImage[]
};

export interface LocalizedImage {
	language: Language
	mediaType: MediaType
	url: string
};

export enum MediaType {
	Empty = '',
	ImageJPEG = 'image/jpeg',
	ImagePNG = 'image/png',
}

export interface InformedEntity {
	routeId?: string
	stopId?: string
};

export interface Header {
	gtfsRealtimeVersion: string
	incrementality: string
	timestamp: number
};

export interface Pattern {
	color: string
	direction: number
	facilities: string[]
	headsign: string
	line_id: string
	localities: string[]
	municipality_ids: string[]
	path: Path[]
	pattern_group_id: string
	pattern_id: string
	route_id: string
	shape_id: string
	short_name: string
	text_color: string
	trips: Trip[]
	valid_on: string[]
}

export interface Path {
	allow_drop_off: boolean
	allow_pickup: boolean
	distance_delta: number
	stop: Stop
	stop_sequence: number
};

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

export enum OperationalStatus {
	Active = 'ACTIVE',
}

export interface Trip {
	dates: string[]
	schedule: Schedule[]
	trip_ids: string[]
};

export interface Schedule {
	arrival_time: string
	arrival_time_24h: string
	stop_id: string
	stop_sequence: number
};

export interface Shape {
	extension: number
	geojson: FeatureCollection<Geometry, GeoJsonProperties>
	id: string
	points: Point[]
};

export interface Point {
	shape_dist_traveled: number
	shape_pt_lat: number
	shape_pt_lon: number
	shape_pt_sequence: number
};

export interface VehiclePosition {
	bearing: number
	block_id: string
	current_status: CurrentStatus
	id: string
	lat: number
	line_id: string
	lon: number
	pattern_id: string
	route_id: string
	schedule_relationship: ScheduleRelationship
	shift_id: string
	speed: number
	stop_id: string
	timestamp: number
	trip_id: string
};

export enum CurrentStatus {
	InTransitTo = 'IN_TRANSIT_TO',
	IncomingAt = 'INCOMING_AT',
	StoppedAt = 'STOPPED_AT',
}

export enum ScheduleRelationship {
	Scheduled = 'SCHEDULED',
}

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

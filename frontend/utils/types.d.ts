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
	id: string
	line_id: string
	localities: string[]
	municipalities: string[]
	path: Path[]
	route_id: string
	shape_id: string
	short_name: string
	text_color: string
	trips: Trip[]
	valid_on: string[]
};

export interface Path {
	allow_drop_off: boolean
	allow_pickup: boolean
	distance_delta: number
	stop: Stop
	stop_sequence: number
};

export interface Stop {
	district_id: string
	district_name: DistrictName
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
	region_id: RegionID
	region_name: RegionName
	routes: string[]
	short_name: ShortName
	tts_name: string
	wheelchair_boarding: string
};

export enum DistrictName {
	Lisboa = 'Lisboa',
}

export enum Facility {
	School = 'school',
	Train = 'train',
	TransitOffice = 'transit_office',
}

export enum OperationalStatus {
	Active = 'ACTIVE',
}

export enum RegionID {
	Pt170 = 'PT170',
}

export enum RegionName {
	Aml = 'AML',
}

export enum ShortName {
	ADefinir = 'a definir',
	HospitalAmadoraSintraP1 = 'Hospital Amadora-Sintra P1',
	RLuísCamõesFtCTT = 'R. Luís Camões (Ft. CTT)',
}

export interface Trip {
	calendar_description: string
	calendar_id: string
	dates: string[]
	id: string
	schedule: Schedule[]
};

export interface Schedule {
	arrival_time: string
	arrival_time_operation: string
	stop_id: string
	stop_sequence: number
	travel_time: string
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

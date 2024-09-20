/* * */

import type { Stop } from '@/types/stops.types.js';
import type { FeatureCollection } from 'geojson';

/* * */

export interface Line {
	color: string
	facilities: string[]
	line_id: string
	localities: string[]
	long_name: string
	municipality_ids: string[]
	pattern_ids: string[]
	route_ids: string[]
	short_name: string
	text_color: string
	tts_name: string
}

/* * */

export interface Route {
	color: string
	facilities: string[]
	line_id: string
	localities: string[]
	long_name: string
	municipalities: string[]
	patterns: string[]
	route_id: string
	short_name: string
	text_color: string
}

/* * */

export interface PatternGroup {
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
	route_long_name: string
	route_short_name: string
	shape_id: string
	short_name: string
	text_color: string
	trips: Trip[]
	valid_on: string[]
}

export type Pattern = PatternGroup[];

/* * */

export interface Path {
	allow_drop_off: boolean
	allow_pickup: boolean
	distance_delta: number
	stop: Stop
	stop_sequence: number
};

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
	geojson: FeatureCollection
	id: string
	points: Point[]
};

export interface Point {
	shape_dist_traveled: number
	shape_pt_lat: number
	shape_pt_lon: number
	shape_pt_sequence: number
};

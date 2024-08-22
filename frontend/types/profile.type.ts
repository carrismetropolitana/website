/* * */

import { Device } from './device.type';
import { Line } from './lines.types';
import { Stop } from './stops.types';

/* * */

export interface Profile {
	devices: Device[]
	email?: string
	favorite_lines: Line[]
	favorite_stops: Stop[]
	first_name?: string
	last_name?: string
}

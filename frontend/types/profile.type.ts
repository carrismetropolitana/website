/* * */

import { Device } from './device.type';

/* * */

export interface Profile {
	devices: Device[]
	email?: string
	favorite_lines: string[]
	favorite_stops: string[]
	first_name?: string
	last_name?: string
}

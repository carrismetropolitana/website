/* * */

import { Device } from './device.type';

/* * */

export interface Profile {
	activity?: 'other' | 'retired' | 'student' | 'university' | 'working'
	avatar?: string
	date_of_birth?: Date
	devices: Device[]
	email: string
	favorite_lines?: string[]
	favorite_stops?: string[]
	first_name?: string
	gender?: 'female' | 'male'
	home_municipality?: string
	last_name?: string
	notification_preferences?: {
		company: boolean
		events: boolean
		network: boolean
	}
	phone?: string
	role?: 'admin' | 'owner' | 'user'
	utilization_type: 'frequent' | 'occasional'
	work_municipality?: string
	work_setting: 'hybrid' | 'office' | 'remote'
}

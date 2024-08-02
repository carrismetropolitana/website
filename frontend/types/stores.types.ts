/* * */

export interface Store {
	active_counters: number
	address: string
	brand_name: string
	current_status: 'busy' | 'closed' | 'open' | 'unknown'
	currently_waiting: number
	expected_wait_time: number
	google_place_id: string
	hours_friday: string[]
	hours_monday: string[]
	hours_saturday: string[]
	hours_special: string
	hours_sunday: string[]
	hours_thursday: string[]
	hours_tuesday: string[]
	hours_wednesday: string[]
	id: string
	lat: number
	locality: string
	lon: number
	municipality_id: string
	municipality_name: string
	name: string
	parish_id: string
	parish_name: string
	phone: string
	postal_code: string
	region_id: string
	region_name: string
	short_name: string
}

/* * */

export interface StoreGroupByMunicipality {
	municipality_id: string
	municipality_name: string
	stores: Store[]
}

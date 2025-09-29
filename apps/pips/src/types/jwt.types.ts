export interface IJwtSync {
	device_id: string
	device_id_2: string
	exp: number
	iat: number
}

export interface IJwt {
	device_id: string
	exp: number
	iat: number
}

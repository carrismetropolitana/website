export interface GoApiResponse<T> {
	data: T
	error: string
	status_code: string
}

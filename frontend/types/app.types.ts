/* * */

export interface StartupMessage {
	max_build: null | number
	min_build: null | number
	presentation_type: 'breaking' | 'changelog'
	url_host: string
	url_path: string
}

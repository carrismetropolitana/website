/* * */

export interface StartupMessage {
	build_max: null | number
	build_min: null | number
	message_id: string
	message_url?: string
	presentation_type: 'breaking' | 'changelog'
	url_host?: string
	url_path?: string
}

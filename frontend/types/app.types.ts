/* * */

export interface StartupMessage {
	max_build: number
	min_build: number
	presentation_type: 'breaking' | 'changelog'
	url: string
}

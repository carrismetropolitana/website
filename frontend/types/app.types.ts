/* * */

export interface StartupMessage {
	android: BuildSpan
	ios: BuildSpan
	presentation_type: 'breaking' | 'changelog'
	url: string
}

/* * */

export interface BuildSpan {
	max_build: number
	min_build: number
}

/**
 * General Status messages are used to display information about
 * the status of the application, or for very urgent messages.
 * They are displayed in the header of the application.
 * For example, if the application is down, or if there is a
 * major incident in a primary artery of the city.
 */
export interface GeneralStatusMessage {

	/**
	 * The ID of the status message.
	 */
	_id: string

	/**
	 * The title of the status.
	 */
	end_date?: number

	/**
	 * When true, the message only shows while site debug mode is active.
	 */
	is_debug?: boolean

	/**
	 * The title of the status.
	 */
	is_enabled: boolean

	/**
	 * The more info link of the status.
	 */
	more_info_url?: string

	/**
	 * The status of the application.
	 */
	severity: 'danger' | 'info' | 'ok' | 'warning'

	/**
	 * The title of the status.
	 */
	start_date?: number

	/**
	 * The title of the status.
	 */
	title: string

}

/**
 * Converts the given number of seconds to a formatted time string.
 *
 * @param seconds - The number of seconds to convert.
 * @returns The formatted time string in the format "mm:ss".
 */
export function secondsToTime(seconds) {
	// Calculate the minutes and seconds
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);

	// Pad minutes and seconds with leading zero if they are less than 10
	const hoursStr = String(hours).padStart(2, '0');
	const minutesStr = String(minutes).padStart(2, '0');

	if (hoursStr === '24') {
		return '23:59';
	}

	// Return the formatted time string
	return `${hoursStr}:${minutesStr}`;
}

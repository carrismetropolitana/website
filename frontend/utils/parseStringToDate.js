/* * */

export default function parseStringToDate(dateString = '' /* YYYYMMDD */) {
	if (!dateString.length === 8) return null;
	// Extract year, month, and day from the string
	const year = parseInt(dateString.slice(0, 4), 10);
	const month = parseInt(dateString.slice(4, 6), 10) - 1; // Subtract 1 because months are zero-indexed in JavaScript
	const day = parseInt(dateString.slice(6, 8), 10);
	// Create a new Date object with the extracted components
	return new Date(year, month, day);
}

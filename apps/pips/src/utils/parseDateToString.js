/* * */

export default function parseDateToString(dateObject) {
	// Get date components
	const year = dateObject.getFullYear().toString();
	const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
	const day = dateObject.getDate().toString().padStart(2, '0');
	// Return string in the 'YYYYMMDD' format
	return `${year}${month}${day}`;
}

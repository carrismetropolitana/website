/**
 * Sorts weekdays in the correct order.
 * @param weekdays An array of weekdays to sort.
 * @returns The sorted array of weekdays.
*/
export function weekdaySort(weekdays) {
	const weekdaysOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
	return weekdays.sort((a, b) => weekdaysOrder.indexOf(a.toLowerCase()) - weekdaysOrder.indexOf(b.toLowerCase()));
}

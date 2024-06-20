/* * */

import { DateTime } from 'luxon';

/* * */

export default function getOperationalDateStringForCurrentMonth() {
	//

	const now = DateTime.now();

	if (now.hour < 4) {
		return {
			end_date: now.minus({ days: 1 }).endOf('month').set({ hour: 3, minute: 59, second: 59 }).toFormat('yyyyLLdd'),
			start_date: now.minus({ days: 1 }).startOf('month').set({ hour: 4, minute: 0, second: 0 }).toFormat('yyyyLLdd'),
		};
	}
	else {
		return {
			end_date: now.endOf('month').set({ hour: 3, minute: 59, second: 59 }).toFormat('yyyyLLdd'),
			start_date: now.startOf('month').set({ hour: 4, minute: 0, second: 0 }).toFormat('yyyyLLdd'),
		};
	}

	//
}

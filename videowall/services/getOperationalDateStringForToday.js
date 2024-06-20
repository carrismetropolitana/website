/* * */

import { DateTime } from 'luxon';

/* * */

export default function getOperationalDateStringForToday() {
	//

	const now = DateTime.now();

	if (now.hour < 4) return now.minus({ days: 1 }).toFormat('yyyyLLdd');
	else return now.toFormat('yyyyLLdd');

	//
}

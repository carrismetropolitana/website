/* * */

import { DateTime } from 'luxon';

/* * */

export default function getOperationalDateStringForTodayMinusOneWeek() {
  //

  const now = DateTime.now();

  if (now.hour < 4) return now.minus({ days: 1, week: 1 }).toFormat('yyyyLLdd');
  else return now.minus({ week: 1 }).toFormat('yyyyLLdd');

  //
}

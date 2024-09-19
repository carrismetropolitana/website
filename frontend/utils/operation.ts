import { DateTime } from 'luxon';

export const Operators = Object.freeze({
	41: {
		area: 1,
		name: 'Operator 1',
	},
	42: {
		area: 2,
		name: 'Operator 2',
	},
	43: {
		area: 3,
		name: 'Operator 3',
	},
	44: {
		area: 4,
		name: 'Operator 4',
	},
});

export default function getOperationalDay(timestamp?: string, format?: string): string {
	//

	// Parse the transaction date using the provided format
	let transactionDate: DateTime;

	if (!timestamp || !format) {
		transactionDate = DateTime.now();
	}
	else {
		transactionDate = DateTime.fromFormat(timestamp, format);
	}

	// Check if the time is between 00:00 and 03:59
	if (transactionDate.hour < 4) {
		// If true, return the previous day in the yyyyLLdd format
		const previousDay = transactionDate.minus({ days: 1 });
		return previousDay.toFormat('yyyyLLdd');
	}
	else {
		// Else, return the current day in the yyyyLLdd format
		return transactionDate.toFormat('yyyyLLdd');
	}

	//
}

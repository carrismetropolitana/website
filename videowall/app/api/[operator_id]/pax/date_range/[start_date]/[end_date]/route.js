/* * */

import { ValidationOptions } from '@/schemas/Validation/options';
import PCGIDB from '@/services/PCGIDB';
import { DateTime } from 'luxon';

/* * */

export async function GET(req, { params }) {
	//

	// 1.
	// Refuse if method is not GET

	if (req.method !== 'GET') {
		throw new Error('Request method not allowed.');
	}

	// 2.
	// Setup Operator ID

	if (!params.operator_id || params.operator_id.length !== 2) return Response.json({ message: 'Invalid operator_id param.' }, { status: 400 });

	const operatorIdString = params.operator_id === 'cm' ? ['41', '42', '43', '44'] : [params.operator_id];

	// 3.
	// Setup timestamp boundaries

	if (!params.start_date || params.start_date.length !== 8) return Response.json({ message: 'Invalid start_date param.' }, { status: 400 });
	if (!params.end_date || params.end_date.length !== 8) return Response.json({ message: 'Invalid end_date param.' }, { status: 400 });

	const startDateObject = DateTime.fromFormat(params.start_date, 'yyyyLLdd').set({ hour: 4, minute: 0, second: 0 });
	const startDateString = startDateObject.toFormat('yyyy-LL-dd\'T\'HH\':\'mm\':\'ss');

	const endDateObject = DateTime.fromFormat(params.end_date, 'yyyyLLdd').plus({ day: 1 }).set({ hour: 3, minute: 59, second: 59 });
	const endDateString = endDateObject.toFormat('yyyy-LL-dd\'T\'HH\':\'mm\':\'ss');

	// 4.
	// Setup the response JSON object

	const responseResult = {
		//
		data: [],
		//
		end_date: endDateString,
		//
		start_date: startDateString,
		//
		timestamp: new Date().toISOString(),
		//
	};

	// 5.
	// Connect to PCGIDB

	try {
		await PCGIDB.connect();
	}
	catch (err) {
		console.log(err);
		return Response.json({ message: 'Could not connect to PCGIDB.' }, { status: 500 });
	}

	// 6.
	// Perform database searches

	console.log('Starting aggregation');

	try {
		//

		const monthlyCounts = {};

		const searchResult = PCGIDB.ValidationEntity.find(
			{
				'transaction.operatorLongID': { $in: operatorIdString },
				'transaction.transactionDate': { $gte: startDateString, $lte: endDateString },
				'transaction.validationStatus': { $in: ValidationOptions.allowed_validation_status },
			},
			'transaction.operatorLongID transaction.transactionDate transaction.validationStatus',
			{ allowDiskUse: true, maxTimeMS: 180000 },
		)
			.project({ 'transaction.transactionDate': 1 })
			.stream();

		for await (const doc of searchResult) {
			//

			let transactionDate = DateTime.fromFormat(doc.transaction.transactionDate, 'yyyy-LL-dd\'T\'HH\':\'mm\':\'ss');

			if (transactionDate.hour < 4) {
				// If the time is between 00:00:00 and 03:59:59 subtract one day
				transactionDate = transactionDate.minus({ day: 1 });
			}

			const key = transactionDate.toFormat('yyyy-LL-dd');

			if (!monthlyCounts[key]) {
				monthlyCounts[key] = 0;
			}

			monthlyCounts[key]++;
		}

		responseResult.data = Object.entries(monthlyCounts).map(([date, count]) => ({ label: date, value: count }));

		//
	}
	catch (err) {
		console.log(err);
		return Response.json({ message: 'Cannot count value.' }, { status: 500 });
	}

	// 7.
	// Send response

	try {
		return Response.json(responseResult);
	}
	catch (err) {
		console.log(err);
		return Response.json({ message: 'Cannot send response.' }, { status: 500 });
	}

	//
}

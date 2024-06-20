/* * */

import { ValidationOptions } from '@/schemas/Validation/options';
import PCGIDB from '@/services/PCGIDB';
import { DateTime } from 'luxon';

/* * */

export async function GET(req, { params }) {
	//

	return Response.json({});

	// 1.
	// Refuse if method is not GET

	if (req.method !== 'GET') {
		throw new Error('Request method not allowed.');
	}

	// 2.
	// Setup Operator ID

	if (!params.operator_id || params.operator_id.length !== 2) return Response.json({ message: 'Invalid "operator_id" param.' }, { status: 400 });

	const operatorIdString = params.operator_id === 'cm' ? ['41', '42', '43', '44'] : [params.operator_id];

	// 3.
	// Setup timestamp boundaries

	if (!params.date || params.date.length !== 8) return Response.json({ message: 'Invalid "date" param.' }, { status: 400 });

	const dateObject = DateTime.fromFormat(params.date, 'yyyyLLdd');
	const startDateString = dateObject.set({ hour: 4, minute: 0, second: 0 }).toFormat('yyyy-LL-dd\'T\'HH\':\'mm\':\'ss');
	const endDateString = dateObject.plus({ day: 1 }).set({ hour: 3, minute: 59, second: 59 }).toFormat('yyyy-LL-dd\'T\'HH\':\'mm\':\'ss');

	// 4.
	// Setup the response JSON object

	const responseResult = {
		end_date: endDateString,
		//
		start_date: startDateString,
		//
		timestamp: new Date().toISOString(),
		//
		value: -1,
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

	try {
		const searchResult = await PCGIDB.ValidationEntity.aggregate(
			[
				{ $match: { 'transaction.operatorLongID': { $in: operatorIdString }, 'transaction.transactionDate': { $gte: startDateString, $lte: endDateString }, 'transaction.validationStatus': { $in: ValidationOptions.allowed_validation_status } } },
				{ $group: { _id: '$transaction.cardSerialNumber', count: { $sum: 1 } } },
				{ $count: 'totalUnique' },
			],
			{ allowDiskUse: true, maxTimeMS: 180000 },
		).toArray();
		responseResult.value = searchResult[0]?.totalUnique || -1;
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

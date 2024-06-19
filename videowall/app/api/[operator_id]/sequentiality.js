/* * */

import PCGIDB from '@/services/PCGIDB';
import { DateTime } from 'luxon';

/* * */

export default async function GET(req) {
	//

	// 1.
	// Refuse if method is not GET

	if (req.method !== 'GET') {
		throw new Error('Request method not allowed.');
	}

	// 2.
	// Setup Operator ID

	if (!req.query.operator_id || req.query.operator_id.length !== 2) return Response.json({ message: 'Invalid "operator_id" param.' }, { status: 400 });

	// 3.
	// Setup timestamp boundaries

	const startDateString = DateTime.now().minus({ day: 10 }).set({ hour: 4, minute: 0, second: 0 }).toFormat('yyyy-LL-dd\'T\'HH\':\'mm\':\'ss');
	const endDateString = DateTime.now().minus({ day: 5 }).toFormat('yyyy-LL-dd\'T\'HH\':\'mm\':\'ss');

	//   const startDateString = DateTime.now().minus({ month: 6, day: 2 }).set({ hour: 4, minute: 0, second: 0 }).toFormat("yyyy-LL-dd'T'HH':'mm':'ss");
	//   const endDateString = DateTime.now().minus({ month: 6 }).set({ hour: 3, minute: 59, second: 59 }).toFormat("yyyy-LL-dd'T'HH':'mm':'ss");

	// 4.
	// Setup the response JSON object

	const responseResult = {
		end_date: endDateString,
		//
		operator_id: req.query.operator_id,
		//
		sam_breakdown: [],
		sam_complete_qty: 0,
		sam_incomplete_qty: 0,
		//
		sam_qty: 0,
		//
		start_date: startDateString,
		//
		timestamp: new Date().toISOString(),
		//
		transactions_expected_qty: 0,
		transactions_found_qty: 0,
		transactions_missing_qty: 0,
		//
	};

	//   return Response.json(responseResult);

	// 5.
	// Connect to PCGIDB

	try {
		await PCGIDB.connect();
	}
	catch (err) {
		console.log(err);
		return Response.json({ message: 'Could not connect to PCGIDB.' }, { status: 500	});
	}

	// 5.
	// Perform database searches

	try {
		//

		// let counter = 0;

		// SETUP MAPS

		const samSerialNumberMap = {};

		// SETUP STREAMS
		const salesStream = PCGIDB.SalesEntity.find({ 'transaction.operatorLongID': { $eq: req.query.operator_id }, 'transaction.transactionDate': { $gte: startDateString, $lte: endDateString } }, { allowDiskUse: true, maxTimeMS: 180000 })
			.project({ '_id': true, 'transaction.macDataFields.aseCounterValue': true, 'transaction.macDataFields.samSerialNumber': true, 'transaction.transactionDate': true, 'transaction.transactionId': true })
			.stream();

		const validationsStream = PCGIDB.ValidationEntity.find({ 'transaction.operatorLongID': { $eq: req.query.operator_id }, 'transaction.transactionDate': { $gte: startDateString, $lte: endDateString } }, { allowDiskUse: true, maxTimeMS: 180000 })
			.project({ '_id': true, 'transaction.macDataFields.aseCounterValue': true, 'transaction.macDataFields.samSerialNumber': true, 'transaction.transactionDate': true, 'transaction.transactionId': true })
			.stream();

		const locationsStream = PCGIDB.LocationEntity.find({ 'transaction.operatorLongID': { $eq: req.query.operator_id }, 'transaction.transactionDate': { $gte: startDateString, $lte: endDateString } }, { allowDiskUse: true, maxTimeMS: 180000 })
			.project({ '_id': true, 'transaction.macDataFields.aseCounterValue': true, 'transaction.macDataFields.samSerialNumber': true, 'transaction.transactionDate': true, 'transaction.transactionId': true })
			.stream();

		for await (const doc of salesStream) {
			//

			//   counter++;
			//   console.log('sales', counter);

			if (!samSerialNumberMap[doc.transaction.macDataFields?.samSerialNumber]) {
				samSerialNumberMap[doc.transaction.macDataFields?.samSerialNumber] = [];
			}

			samSerialNumberMap[doc.transaction.macDataFields?.samSerialNumber].push({
				_id: doc._id,
				aseCounterValue: doc.transaction?.macDataFields?.aseCounterValue || 'N/A',
				samSerialNumber: doc.transaction?.macDataFields?.samSerialNumber || 'N/A',
				transactionDate: doc.transaction?.transactionDate || 'N/A',
				transactionId: doc.transaction?.transactionId || 'N/A',
				type: 'SalesEntity',
			});

			//
		}

		for await (const doc of validationsStream) {
			//

			//   counter++;
			//   console.log('validations', counter);

			if (!samSerialNumberMap[doc.transaction.macDataFields?.samSerialNumber]) {
				samSerialNumberMap[doc.transaction.macDataFields?.samSerialNumber] = [];
			}

			samSerialNumberMap[doc.transaction.macDataFields?.samSerialNumber].push({
				_id: doc._id,
				aseCounterValue: doc.transaction?.macDataFields?.aseCounterValue || 'N/A',
				samSerialNumber: doc.transaction?.macDataFields?.samSerialNumber || 'N/A',
				transactionDate: doc.transaction?.transactionDate || 'N/A',
				transactionId: doc.transaction?.transactionId || 'N/A',
				type: 'ValidationEntity',
			});

			//
		}

		for await (const doc of locationsStream) {
			//

			//   counter++;
			//   console.log('location', counter);

			if (!samSerialNumberMap[doc.transaction.macDataFields?.samSerialNumber]) {
				samSerialNumberMap[doc.transaction.macDataFields?.samSerialNumber] = [];
			}

			samSerialNumberMap[doc.transaction.macDataFields?.samSerialNumber].push({
				_id: doc._id,
				aseCounterValue: doc.transaction?.macDataFields?.aseCounterValue || 'N/A',
				samSerialNumber: doc.transaction?.macDataFields?.samSerialNumber || 'N/A',
				transactionDate: doc.transaction?.transactionDate || 'N/A',
				transactionId: doc.transaction?.transactionId || 'N/A',
				type: 'LocationEntity',
			});

			//
		}

		// COUNT RESULTS

		for (const samSerialNumber of Object.keys(samSerialNumberMap)) {
			//

			const allTransactionsForThisSamSorted = samSerialNumberMap[samSerialNumber].sort((a, b) => a.aseCounterValue - b.aseCounterValue);

			const samTransactionsExpectedQty = allTransactionsForThisSamSorted[allTransactionsForThisSamSorted.length - 1].aseCounterValue - allTransactionsForThisSamSorted[0].aseCounterValue + 1;
			const samTransactionsMissingQty = samTransactionsExpectedQty - allTransactionsForThisSamSorted.length;

			const samBreakdown = {
				sam_complete: allTransactionsForThisSamSorted.length === samTransactionsExpectedQty ? true : false,
				sam_serial_number: samSerialNumber,
				transactions_expected_qty: samTransactionsExpectedQty,
				transactions_found_qty: allTransactionsForThisSamSorted.length,
				transactions_missing_qty: samTransactionsMissingQty,
			};

			responseResult.sam_qty++;
			if (samBreakdown.sam_complete) responseResult.sam_complete_qty++;
			else if (!samBreakdown.sam_complete) responseResult.sam_incomplete_qty++;

			responseResult.transactions_expected_qty = responseResult.transactions_expected_qty + samTransactionsExpectedQty;
			responseResult.transactions_found_qty = responseResult.transactions_found_qty + allTransactionsForThisSamSorted.length;
			responseResult.transactions_missing_qty = responseResult.transactions_missing_qty + samTransactionsMissingQty;

			responseResult.sam_breakdown.push(samBreakdown);

			console.log(`[${req.query.operator_id}] SAM ${samSerialNumber} | Expected Tx Qty: ${samTransactionsExpectedQty} | Found Tx Qty: ${allTransactionsForThisSamSorted.length} | Missing Tx Qty: ${samTransactionsMissingQty} [${samBreakdown.sam_complete ? 'OK' : 'NOT OK'}] | Period: ${startDateString} - ${endDateString}`);

			//
		}

		//
	}
	catch (err) {
		console.log(err);
		return Response.json({ message: 'Cannot list sequentiality.' }, { status: 500 });
	}

	// 6.
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

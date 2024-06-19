/* * */

import { DateTime } from 'luxon';
import PCGIDB from '@/services/PCGIDB';
import { ValidationOptions } from '@/schemas/Validation/options';

/* * */

export default async function handler(req, res) {
  //

  // 1.
  // Refuse if method is not GET

  if (req.method !== 'GET') {
    throw new Error('Request method not allowed.');
  }

  //   return await res.json({});

  // 2.
  // Setup Operator ID

  if (!req.query.operator_id || req.query.operator_id.length !== 2) return await res.status(500).json({ message: 'Invalid "operator_id" param.' });

  const operatorIdString = req.query.operator_id === 'cm' ? ['41', '42', '43', '44'] : [req.query.operator_id];

  // 3.
  // Setup timestamp boundaries

  if (!req.query.date || req.query.date.length !== 8) return await res.status(500).json({ message: 'Invalid "date" param.' });

  const dateObject = DateTime.fromFormat(req.query.date, 'yyyyLLdd');
  const startDateString = dateObject.set({ hour: 4, minute: 0, second: 0 }).toFormat("yyyy-LL-dd'T'HH':'mm':'ss");
  const endDateString = dateObject.plus({ day: 1 }).set({ hour: 3, minute: 59, second: 59 }).toFormat("yyyy-LL-dd'T'HH':'mm':'ss");

  // 4.
  // Setup the response JSON object

  const responseResult = {
    //
    timestamp: new Date().toISOString(),
    //
    start_date: startDateString,
    end_date: endDateString,
    //
    value: -1,
    //
  };

  // 5.
  // Connect to PCGIDB

  try {
    await PCGIDB.connect();
  } catch (err) {
    console.log(err);
    return await res.status(500).json({ message: 'Could not connect to PCGIDB.' });
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
      { allowDiskUse: true, maxTimeMS: 180000 }
    ).toArray();
    responseResult.value = searchResult[0]?.totalUnique || -1;
  } catch (err) {
    console.log(err);
    return await res.status(500).json({ message: 'Cannot count value.' });
  }

  // 7.
  // Send response

  try {
    return await res.status(200).json(responseResult);
  } catch (err) {
    console.log(err);
    return await res.status(500).json({ message: 'Cannot send response.' });
  }

  //
}

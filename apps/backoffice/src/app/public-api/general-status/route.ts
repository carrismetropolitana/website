/* * */

import payloadConfig from '@/payload-config';
import { getPublicHeaders } from '@/utils/get-public-headers';
import { type GeneralStatusMessage } from '@carrismetropolitana/website-shared-types';
import { getPayload } from 'payload';

/* * */

export const GET = async () => {
	//

	//
	// Setup Payload and other necessary variables for handling requests.

	const currentTimestamp = Date.now();
	const payload = await getPayload({ config: payloadConfig });

	//
	// Retrieve all General Status messages from the database.

	const foundGeneralStatusMessages = await payload.findGlobal({ slug: 'general-status' });
	const allGeneralStatusMessages = foundGeneralStatusMessages?.messages.length ? foundGeneralStatusMessages.messages : null;

	if (!allGeneralStatusMessages) return Response.json([], {
		headers: getPublicHeaders(60),
	});

	//
	// Filter messages that are not intended to be public,
	// and format the remaining messages to be returned in the response.

	const publicMessages: GeneralStatusMessage[] = allGeneralStatusMessages
		?.filter((item) => {
			// The message should be enabled
			if (!item.is_enabled) return false;
			// If the message has a start date, it should be after the current date
			const startDate = item.start_date ? Date.parse(item.start_date) : null;
			if (startDate && startDate > currentTimestamp) return false;
			// If the message has an end date, it should be before the current date
			const endDate = item.end_date ? Date.parse(item.end_date) : null;
			if (endDate && endDate < currentTimestamp) return false;
			// The message should have at least one letter for the title
			if (!item.title?.length) return false;
			// If all validations passed return true
			return true;
		})
		.map((item) => {
			return {
				_id: item.id,
				end_date: item.end_date ? Date.parse(item.end_date) : null,
				is_debug: Boolean(item.is_debug),
				is_enabled: item.is_enabled,
				more_info_url: item.more_info_url,
				severity: item.severity,
				start_date: item.start_date ? Date.parse(item.start_date) : null,
				title: item.title,
			};
		});

	//
	// Return the filtered and formatted messages as a JSON response.

	return Response.json(publicMessages, {
		headers: getPublicHeaders(30),
	});

	//
};

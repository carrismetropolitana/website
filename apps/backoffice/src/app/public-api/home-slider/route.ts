/* * */

import payloadConfig from '@/payload-config';
import { getPublicHeaders } from '@/utils/get-public-headers';
import { type HomeSliderSlide } from '@carrismetropolitana/website-shared-types';
import { Dates } from '@tmlmobilidade/dates';
import { getPayload } from 'payload';

/* * */

export const GET = async () => {
	//

	//
	// Setup Payload and other necessary variables for handling requests.

	const currentDate = Dates.now('utc');
	const payload = await getPayload({ config: payloadConfig });

	//
	// Retrieve all Home Slider slides from the database.

	const foundHomeSliderSlides = await payload.findGlobal({ slug: 'home-slider' });
	const allHomeSliderSlides = foundHomeSliderSlides?.slides.length ? foundHomeSliderSlides.slides : null;

	//
	// Filter slides that are not intended to be public,
	// and format the remaining slides to be returned in the response.

	const publicSlides: HomeSliderSlide[] = allHomeSliderSlides
		.filter((item) => {
			// The message should be enabled
			if (!item.is_enabled) return false;
			// The message should have a cover image
			if (!item.image || typeof item.image !== 'object' || !item.image.url) return false;
			// If the message has a start date, it should be after the current date
			const startDate = item.start_date ? Dates.fromISO(item.start_date) : null;
			if (startDate && startDate.unix_timestamp > currentDate.unix_timestamp) return false;
			// If the message has an end date, it should be before the current date
			const endDate = item.end_date ? Dates.fromISO(item.end_date) : null;
			if (endDate && endDate.unix_timestamp < currentDate.unix_timestamp) return false;
			// The message should have at least one letter for the title
			if (!item.title?.length) return false;
			// If all validations passed return true
			return true;
		})
		.map((item) => {
			return {
				_id: item.id,
				end_date: item.end_date ? Dates.fromISO(item.end_date).unix_timestamp : null,
				image_url: typeof item.image !== 'string' ? item.image.url : null,
				is_enabled: item.is_enabled,
				more_info_url: item.more_info_url,
				start_date: item.start_date ? Dates.fromISO(item.start_date).unix_timestamp : null,
				title: item.title,
			};
		});

	//
	// Return the filtered and formatted slides as a JSON response.

	return Response.json(publicSlides, {
		headers: getPublicHeaders(60),
	});

	//
};

/* * */

import type { Alert, SimplifiedAlert } from '@/types/alerts.types.js';

import { DateTime } from 'luxon';

/* * */

export default (alertData: Alert, currentLocale = 'pt'): SimplifiedAlert => {
	//
	// Find the localized header text
	let localizedHeaderText: string;
	const headerTextLocaleMatch = alertData.header_text.translation.find(item => item.language === currentLocale.split('-')[0]);
	if (!headerTextLocaleMatch) localizedHeaderText = alertData.header_text.translation[0].text;
	else localizedHeaderText = headerTextLocaleMatch.text;
	// Find the localized description text
	let localizedDescriptionText: string;
	const descriptionTextLocaleMatch = alertData.description_text.translation.find(item => item.language === currentLocale.split('-')[0]);
	if (!descriptionTextLocaleMatch) localizedDescriptionText = alertData.description_text.translation[0].text;
	else localizedDescriptionText = descriptionTextLocaleMatch.text;
	// Find the localized image URL
	let localizedImageUrl: null | string = null;
	if (alertData.image && alertData.image.localizedImage?.length) {
		const imageLocaleMatch = alertData.image.localizedImage.find(item => item.language === currentLocale.split('-')[0]);
		if (!imageLocaleMatch) localizedImageUrl = alertData.image.localizedImage[0].url.length > 0 ? alertData.image.localizedImage[0].url : null;
		else localizedImageUrl = imageLocaleMatch.url.length > 0 ? imageLocaleMatch.url : null;
	}
	// Start date
	const startDate = alertData.active_period.start ? alertData.active_period.start : -Infinity;
	const startDateObject = DateTime.fromSeconds(startDate).toJSDate();
	// End date
	const endDate = alertData.active_period.end ? alertData.active_period.end : +Infinity;
	const endDateObject = DateTime.fromSeconds(endDate).toJSDate();
	//
	return {
		alert_id: alertData.alert_id,
		cause: alertData.cause,
		description: localizedDescriptionText,
		effect: alertData.effect,
		end_date: endDateObject,
		image_url: localizedImageUrl,
		informed_entity: alertData.informed_entity,
		locale: currentLocale,
		start_date: startDateObject,
		title: localizedHeaderText,
		url: null,
	};
	//
};

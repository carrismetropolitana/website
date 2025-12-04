import { Dates } from '@tmlmobilidade/dates';
import { DateTime } from 'luxon';

/**
 * Formats a day object into a localized string representation
 * with holiday and notes indications
 *
 * @param date - The day object to format
 * @param date.day_group - The ISO date string
 * @param date.day_type - The type of day ('1', '2', or '3')
 * @param date.holiday - Flag indicating if the day is a holiday ('0' or '1')
 * @param date.notes - Optional notes about the day
 * @param t - Translation function for internationalization
 * @returns A formatted string representing the day, with holiday information if applicable
 *
 */
export function formatDay(date: { day_group: string, day_type?: '1' | '2' | '3', holiday?: '0' | '1', notes?: string }, t) {
	const dt = Dates.fromISO(date.day_group);
	const formattedDate = t('days.formatted', { date: dt.js_date });
	const capitalized = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

	if (date.holiday === '1') {
		const holidayText = date.notes?.length > 0 ? date.notes : t('weekdays.holiday');
		return `${capitalized} (${holidayText})`;
	}

	return capitalized;
}

/**
 * Formats a month string into a localized month name and year.
 * @param monthStr - A string representing a month in 'yyyy-LL' format
 * @param t - Translation function to convert month keys to localized month names
 * @returns A formatted string with capitalized month name and year (e.g., "January, 2023")
 *
 */
export function formatMonth(monthStr: string, t) {
	const dateTime = DateTime.fromFormat(monthStr, 'yyyy-LL');
	const monthKey = [
		'january', 'february', 'march', 'april', 'may', 'june',
		'july', 'august', 'september', 'october', 'november', 'december',
	][dateTime.month - 1];
	const monthName = t(`month.${monthKey}`);
	return `${monthName.charAt(0).toUpperCase() + monthName.slice(1)}, ${dateTime.year}`;
}
